import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { jwtVerify } from 'jose';
import pool from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key-32-chars-min!!!';
const secret = new TextEncoder().encode(JWT_SECRET);

// POST /api/kosan/[id]/images - Upload gambar kosan
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify auth
    const authToken = request.cookies.get('auth_token')?.value;
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(authToken, secret);
    const userId = payload.id as number;
    const role = payload.role as string;

    if (role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can upload images' },
        { status: 403 }
      );
    }

    const kosanId = parseInt(params.id);

    // Verify kosan ownership
    const connection = await pool.getConnection();
    const [existing] = await connection.execute(
      'SELECT created_by FROM kosan WHERE id = ?',
      [kosanId]
    );

    if ((existing as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Kosan not found' },
        { status: 404 }
      );
    }

    if ((existing as any[])[0].created_by !== userId) {
      connection.release();
      return NextResponse.json(
        { error: 'You can only upload images for your own kosan' },
        { status: 403 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      connection.release();
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      connection.release();
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'kosan');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${kosanId}-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filepath = join(uploadDir, filename);
    const imageUrl = `/uploads/kosan/${filename}`;

    await writeFile(filepath, buffer);

    // Save to database
    await connection.execute(
      'INSERT INTO kosan_images (kosan_id, image_url) VALUES (?, ?)',
      [kosanId, imageUrl]
    );
    connection.release();

    return NextResponse.json(
      { 
        message: 'Image uploaded successfully',
        imageUrl
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// GET /api/kosan/[id]/images - Get all images for a kosan
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kosanId = parseInt(params.id);

    const connection = await pool.getConnection();
    const [images] = await connection.execute(
      'SELECT * FROM kosan_images WHERE kosan_id = ? ORDER BY created_at DESC',
      [kosanId]
    );
    connection.release();

    return NextResponse.json(images);
  } catch (error: any) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// DELETE /api/kosan/[id]/images - Delete image
export async function DELETE(
  request: NextRequest
) {
  try {
    // Verify auth
    const authToken = request.cookies.get('auth_token')?.value;
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(authToken, secret);
    const userId = payload.id as number;
    const role = payload.role as string;

    if (role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can delete images' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');

    if (!imageId) {
      return NextResponse.json(
        { error: 'Missing imageId' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    // Verify ownership
    const [image] = await connection.execute(
      'SELECT kosan_images.image_url FROM kosan_images JOIN kosan ON kosan_images.kosan_id = kosan.id WHERE kosan_images.id = ? AND kosan.created_by = ?',
      [imageId, userId]
    );

    if ((image as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Image not found or access denied' },
        { status: 404 }
      );
    }

    await connection.execute(
      'DELETE FROM kosan_images WHERE id = ?',
      [imageId]
    );
    connection.release();

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}
