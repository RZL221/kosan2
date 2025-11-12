# 📸 Cara Memasukkan Gambar Sendiri ke Website

## 🎯 Metode 1: Menggunakan Gambar Lokal (Paling Mudah)

### Langkah 1: Siapkan Gambar Anda

1. **Pindahkan foto kamar** dari handphone ke komputer
2. **Rename gambar** dengan nama yang mudah (contoh: `kamar1.jpg`, `kamar2.jpg`)
3. **Format yang didukung**: `.jpg`, `.jpeg`, `.png`, `.webp`
4. **Ukuran disarankan**: Maksimal 2MB per gambar (untuk performa lebih baik)

### Langkah 2: Buat Folder Images

1. Di folder project `kosan2`, buat folder baru:
   ```
   kosan2/
     public/
       images/
   ```

2. **Cara membuat folder:**
   - Klik kanan di folder `public`
   - Pilih "New Folder"
   - Beri nama: `images`

### Langkah 3: Copy Gambar ke Folder

1. **Copy gambar kamar** Anda ke folder `public/images/`
2. Struktur folder akan seperti ini:
   ```
   kosan2/
     public/
       images/
         kamar1.jpg
         kamar2.jpg
         kamar3.jpg
   ```

### Langkah 4: Edit Data Kosan

1. Buka file `lib/data.ts`
2. Cari kosan yang ingin Anda ubah gambarnya
3. Ubah field `image` dengan path gambar Anda:

**Sebelum:**
```typescript
{
  id: '1',
  name: 'Kosan Modern Sei Panas',
  image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  // ...
}
```

**Sesudah:**
```typescript
{
  id: '1',
  name: 'Kosan Modern Sei Panas',
  image: '/images/kamar1.jpg',  // Path ke gambar lokal
  // ...
}
```

### Langkah 5: Test

1. Simpan file `lib/data.ts`
2. Refresh browser
3. Gambar kamar Anda akan muncul!

---

## 🌐 Metode 2: Upload ke Google Drive (Alternatif)

Jika Anda ingin gambar bisa diakses dari mana saja tanpa menyimpan di project:

### Langkah 1: Upload ke Google Drive

1. Upload foto kamar ke Google Drive
2. Klik kanan gambar → "Get link"
3. Pilih "Anyone with the link"
4. Copy link

### Langkah 2: Convert Link

Ubah link Google Drive menjadi format yang bisa digunakan:

**Link asli:**
```
https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
```

**Link yang digunakan:**
```
https://drive.google.com/uc?export=view&id=1ABC123xyz
```

Ganti `1ABC123xyz` dengan ID file dari link asli.

### Langkah 3: Gunakan di Data

```typescript
{
  id: '1',
  name: 'Kosan Modern Sei Panas',
  image: 'https://drive.google.com/uc?export=view&id=1ABC123xyz',
  // ...
}
```

---

## 📱 Metode 3: Upload ke Imgur (Paling Praktis)

### Langkah 1: Upload ke Imgur

1. Kunjungi https://imgur.com
2. Klik "New post"
3. Upload foto kamar Anda
4. Klik kanan gambar → "Copy image address"

### Langkah 2: Gunakan di Data

```typescript
{
  id: '1',
  name: 'Kosan Modern Sei Panas',
  image: 'https://i.imgur.com/abc123.jpg',  // URL dari Imgur
  // ...
}
```

---

## 🎨 Tips Optimasi Gambar

### 1. Resize Gambar (Penting!)

Gambar yang terlalu besar akan membuat website lambat. Gunakan tool online:

- **TinyPNG**: https://tinypng.com (compress gambar)
- **Squoosh**: https://squoosh.app (resize & compress)

**Ukuran yang disarankan:**
- Width: 800-1200px
- Format: JPG (untuk foto) atau WebP (untuk kualitas lebih baik)
- File size: Maksimal 500KB per gambar

### 2. Nama File yang Baik

Gunakan nama yang jelas:
- ✅ `kamar-kosan-sei-panas.jpg`
- ✅ `kamar1-nagoya.jpg`
- ❌ `IMG_20240101_123456.jpg` (tidak jelas)
- ❌ `photo.jpg` (bisa bentrok)

### 3. Format Gambar

- **JPG/JPEG**: Untuk foto kamar (ukuran lebih kecil)
- **PNG**: Untuk gambar dengan transparansi
- **WebP**: Format modern, ukuran lebih kecil (disarankan)

---

## 📝 Contoh Lengkap

### Contoh 1: Menggunakan Gambar Lokal

```typescript
export const kosanData: Kosan[] = [
  {
    id: '1',
    name: 'Kosan Modern Sei Panas',
    price: 1500000,
    location: 'Sei Panas',
    area: 'Batu Ampar',
    image: '/images/kamar-sei-panas.jpg',  // Gambar lokal
    facilities: ['AC', 'WiFi', 'Kamar Mandi Dalam'],
    description: 'Kosan nyaman dengan fasilitas lengkap.',
    available: true,
  },
  {
    id: '2',
    name: 'Kosan Nyaman Nagoya',
    price: 1200000,
    location: 'Nagoya',
    area: 'Lubuk Baja',
    image: '/images/kamar-nagoya.jpg',  // Gambar lokal
    facilities: ['AC', 'WiFi'],
    description: 'Lokasi strategis di jantung Nagoya.',
    available: true,
  },
];
```

### Contoh 2: Menggunakan Google Drive

```typescript
{
  id: '1',
  name: 'Kosan Modern Sei Panas',
  image: 'https://drive.google.com/uc?export=view&id=1ABC123xyz',
  // ...
}
```

### Contoh 3: Menggunakan Imgur

```typescript
{
  id: '1',
  name: 'Kosan Modern Sei Panas',
  image: 'https://i.imgur.com/abc123.jpg',
  // ...
}
```

---

## 🔍 Troubleshooting

### Problem: Gambar tidak muncul

**Solusi 1: Cek path**
- Pastikan path dimulai dengan `/images/` (bukan `images/`)
- Pastikan nama file sesuai (case-sensitive di Linux/Mac)

**Solusi 2: Cek lokasi file**
- Pastikan gambar ada di folder `public/images/`
- Struktur: `public/images/kamar1.jpg` ✅
- Bukan: `images/kamar1.jpg` ❌

**Solusi 3: Restart server**
```bash
# Stop server (Ctrl + C)
npm run dev
```

### Problem: Gambar terlalu besar/lambat

**Solusi:**
1. Compress gambar di https://tinypng.com
2. Resize gambar ke maksimal 1200px width
3. Gunakan format WebP jika memungkinkan

### Problem: Gambar terpotong

**Solusi:**
- Pastikan gambar dalam format landscape (lebar > tinggi)
- Ukuran disarankan: 16:9 atau 4:3
- Crop gambar sebelum upload

---

## ✅ Checklist

Sebelum menggunakan gambar:

- [ ] Gambar sudah di-resize (maksimal 1200px width)
- [ ] Gambar sudah di-compress (maksimal 500KB)
- [ ] Nama file jelas dan tidak ada spasi
- [ ] Gambar sudah di-copy ke folder `public/images/`
- [ ] Path di `lib/data.ts` sudah benar: `/images/nama-file.jpg`
- [ ] Server sudah di-restart (jika perlu)

---

## 🚀 Quick Start (Paling Cepat)

1. **Copy foto kamar** ke folder `public/images/`
2. **Rename** menjadi nama yang jelas (contoh: `kamar1.jpg`)
3. **Edit** `lib/data.ts`, ubah `image: '/images/kamar1.jpg'`
4. **Save** dan **refresh browser**

**Selesai!** 🎉

---

**Selamat! Sekarang Anda bisa menggunakan foto kamar sendiri di website! 📸**



