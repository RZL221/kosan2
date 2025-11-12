# Dokumentasi Table Database Kosan

## Penjelasan Structure Database

### 1. Table `users` (sudah ada dari migration 000)
- `id`: Primary key
- `name`: Nama user
- `phone`: Nomor HP (unique)
- `role`: 'user' atau 'admin'
- `created_at`, `updated_at`: Timestamp

### 2. Table `kosan` (daftar kosan)
Menyimpan informasi dasar setiap properti kosan.

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | BIGINT UNSIGNED | Primary key |
| name | VARCHAR(191) | Nama kosan |
| description | TEXT | Deskripsi panjang kosan |
| location | VARCHAR(191) | Lokasi/alamat kosan |
| area | VARCHAR(100) | Wilayah/kecamatan |
| price | DECIMAL(12,2) | Harga sewa |
| capacity | INT | Jumlah kamar/unit |
| featured | BOOLEAN | Apakah ditampilkan di featured |
| created_by | BIGINT UNSIGNED (FK) | User admin yang membuat |
| created_at, updated_at | TIMESTAMP | Waktu buat/update |

### 3. Table `kosan_images` (gambar kosan)
Menyimpan URL gambar untuk setiap kosan (1 kosan bisa punya multiple images).

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | BIGINT UNSIGNED | Primary key |
| kosan_id | BIGINT UNSIGNED (FK) | Foreign key ke tabel kosan |
| image_url | VARCHAR(500) | URL gambar (local atau S3) |
| alt_text | VARCHAR(191) | Text alternatif untuk gambar |
| is_primary | BOOLEAN | Gambar utama/cover |
| created_at | TIMESTAMP | Waktu upload |

### 4. Table `facilities` (daftar fasilitas)
Master data untuk fasilitas yang bisa ada di kosan (WiFi, Parkir, AC, dll).

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | BIGINT UNSIGNED | Primary key |
| name | VARCHAR(191) UNIQUE | Nama fasilitas (misal: WiFi, AC) |
| icon | VARCHAR(100) | Nama icon (misal: wifi, fan) |
| description | TEXT | Deskripsi fasilitas |
| created_at | TIMESTAMP | Waktu dibuat |

### 5. Table `kosan_facilities` (relasi many-to-many)
Menghubungkan kosan dengan fasilitas yang dimilikinya.

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | BIGINT UNSIGNED | Primary key |
| kosan_id | BIGINT UNSIGNED (FK) | Foreign key ke kosan |
| facility_id | BIGINT UNSIGNED (FK) | Foreign key ke facilities |
| created_at | TIMESTAMP | Waktu relasi dibuat |

**Contoh:**
- Kosan ID 1 memiliki fasilitas WiFi, AC, Parkir
- Kosan ID 2 memiliki fasilitas WiFi, Kasur Premium

### 6. Table `inquiries` (pertanyaan/inquiry calon pengguna)
Menyimpan inquiry/pertanyaan dari calon pengguna tentang ketersediaan kosan.

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | BIGINT UNSIGNED | Primary key |
| user_id | BIGINT UNSIGNED (FK) | User yang bertanya (nullable jika tidak login) |
| name | VARCHAR(191) | Nama penanya |
| phone | VARCHAR(32) | Nomor HP penanya |
| email | VARCHAR(191) | Email (opsional) |
| message | TEXT | Isi pertanyaan |
| kosan_ids | JSON | Array ID kosan yang ditanyakan |
| status | ENUM | pending, responded, closed |
| created_at, updated_at | TIMESTAMP | Waktu inquiry/update |

## Cara Import File Migration ke phpMyAdmin

1. Buka http://localhost/phpmyadmin
2. Pilih database `kosan_db`
3. Klik tab **SQL**
4. Buka file `migrations/002-create-kosan-tables.sql` dengan text editor
5. Copy seluruh isi file SQL
6. Paste ke text area di phpMyAdmin
7. Klik **Go**

Atau jika ingin import file langsung:
1. Klik tab **Import**
2. Pilih file `migrations/002-create-kosan-tables.sql`
3. Klik **Go**

## Contoh Data Insert (untuk testing)

```sql
-- Insert sample facilities
INSERT INTO facilities (name, icon, description) VALUES
('WiFi', 'wifi', 'WiFi gratis 24 jam'),
('Parking', 'car', 'Tempat parkir tersedia'),
('AC', 'fan', 'Pendingin ruangan'),
('Kasur Premium', 'bed', 'Kasur berkualitas tinggi'),
('Kamar Mandi Privat', 'shower', 'Kamar mandi di dalam kamar');

-- Insert sample kosan
INSERT INTO kosan (name, description, location, area, price, capacity, featured, created_by) VALUES
('Kosan Batam Pusat', 'Kosan nyaman di tengah kota', 'Jl. Ahmad Yani No 123', 'Batam Pusat', 500000, 5, TRUE, 1),
('Kosan Tanjung Pinang', 'Kosan dekat dengan pusat bisnis', 'Jl. Sudirman No 456', 'Tanjung Pinang', 450000, 3, TRUE, 1);

-- Insert sample kosan images
INSERT INTO kosan_images (kosan_id, image_url, alt_text, is_primary) VALUES
(1, '/images/kosan1.jpg', 'Depan Kosan Batam Pusat', TRUE),
(1, '/images/kosan1-ruang.jpg', 'Ruang Kosan Batam Pusat', FALSE),
(2, '/images/kosan2.jpg', 'Depan Kosan Tanjung Pinang', TRUE);

-- Link kosan dengan facilities
INSERT INTO kosan_facilities (kosan_id, facility_id) VALUES
(1, 1), -- Kosan 1 punya WiFi
(1, 2), -- Kosan 1 punya Parking
(1, 3), -- Kosan 1 punya AC
(2, 1), -- Kosan 2 punya WiFi
(2, 3); -- Kosan 2 punya AC
```

## Next Steps

Setelah import migration ini:
1. Buat API endpoint untuk CRUD kosan (create, read, update, delete)
2. Buat API endpoint untuk upload gambar
3. Buat halaman admin dashboard untuk mengelola kosan
4. Update halaman homepage untuk menampilkan kosan dari database
