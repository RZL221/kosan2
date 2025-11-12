# 📖 Panduan Penggunaan Website Kosan Batam

## 🔧 Cara Mengubah Nomor WhatsApp Bisnis

### Langkah 1: Buka File Cart
Buka file `app/cart/page.tsx` di editor Anda.

### Langkah 2: Cari Baris Nomor WhatsApp
Cari baris berikut (sekitar baris 11):

```typescript
const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp bot Anda
```

### Langkah 3: Ganti Nomor WhatsApp
Ganti `'6281234567890'` dengan nomor WhatsApp bisnis Anda.

**Format nomor WhatsApp:**
- ✅ **Benar**: `6281234567890` (tanpa +, tanpa spasi, tanpa strip)
- ✅ **Benar**: `628123456789` (minimal 10 digit)
- ❌ **Salah**: `+6281234567890` (jangan pakai +)
- ❌ **Salah**: `081234567890` (jangan pakai 0 di depan)
- ❌ **Salah**: `62 812 3456 7890` (jangan pakai spasi)

**Contoh:**
```typescript
const WHATSAPP_NUMBER = '6281234567890'; // Nomor WhatsApp bisnis Anda
```

### Langkah 4: Simpan dan Test
1. Simpan file
2. Refresh browser
3. Coba fitur "Tanya Stock" untuk test apakah nomor sudah benar

---

## 🏠 Cara Mengubah Data Kosan

### Langkah 1: Buka File Data
Buka file `lib/data.ts` di editor Anda.

### Langkah 2: Edit Data Kosan
Anda akan melihat array `kosanData` yang berisi semua data kosan. Setiap kosan memiliki struktur seperti ini:

```typescript
{
  id: '1',                    // ID unik (jangan duplikat)
  name: 'Nama Kosan',         // Nama kosan
  price: 1500000,             // Harga per bulan (dalam rupiah, tanpa koma)
  location: 'Sei Panas',      // Lokasi spesifik
  area: 'Batu Ampar',         // Daerah/kecamatan
  image: 'URL_GAMBAR',        // URL gambar kosan
  facilities: [                // Array fasilitas
    'AC',
    'WiFi',
    'Kamar Mandi Dalam',
    // ... tambahkan lebih banyak
  ],
  description: 'Deskripsi kosan...', // Deskripsi lengkap
  available: true,            // Status ketersediaan
}
```

### Langkah 3: Mengubah Informasi Kosan

#### Mengubah Nama, Harga, Lokasi:
```typescript
{
  id: '1',
  name: 'Kosan Baru Saya',           // Ubah nama
  price: 2000000,                     // Ubah harga (dalam rupiah)
  location: 'Nagoya Baru',            // Ubah lokasi
  area: 'Lubuk Baja',                 // Ubah daerah
  // ...
}
```

#### Mengubah Deskripsi:
```typescript
{
  // ...
  description: 'Kosan baru dengan fasilitas lengkap, dekat pusat kota dan akses mudah.',
  // ...
}
```

#### Mengubah Fasilitas:
```typescript
{
  // ...
  facilities: [
    'AC',
    'WiFi',
    'Kamar Mandi Dalam',
    'Kasur',
    'Lemari',
    'Meja Belajar',
    'Parkir Motor',
    'Dapur Bersama',  // Tambahkan fasilitas baru
  ],
  // ...
}
```

### Langkah 4: Menambah Kosan Baru
Tambahkan object baru di dalam array `kosanData`:

```typescript
export const kosanData: Kosan[] = [
  // ... kosan yang sudah ada
  {
    id: '9',  // ID baru (jangan duplikat dengan yang lain)
    name: 'Kosan Baru',
    price: 1200000,
    location: 'Lokasi Baru',
    area: 'Daerah Baru',
    image: 'https://images.unsplash.com/photo-...', // URL gambar
    facilities: ['AC', 'WiFi', 'Kamar Mandi Dalam'],
    description: 'Deskripsi kosan baru',
    available: true,
  },
];
```

### Langkah 5: Menghapus Kosan
Hapus object kosan dari array `kosanData`.

---

## 🖼️ Cara Mengubah Gambar Kosan

### Opsi 1: Menggunakan URL Gambar Online (Paling Mudah)

#### Menggunakan Unsplash (Gratis):
1. Kunjungi https://unsplash.com
2. Cari gambar yang sesuai (misal: "room", "bedroom", "apartment")
3. Klik gambar yang diinginkan
4. Klik tombol "Download" atau klik kanan → "Copy image address"
5. Salin URL gambar
6. Paste di field `image`:

```typescript
{
  image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
}
```

#### Menggunakan URL Gambar Sendiri:
Jika Anda sudah upload gambar ke hosting (Google Drive, Imgur, dll), gunakan URL-nya:

```typescript
{
  image: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID',
}
```

### Opsi 2: Menggunakan Gambar Lokal (Lebih Kompleks)

#### Langkah 1: Buat Folder Images
Buat folder `public/images` di root project:
```
kosan2/
  public/
    images/
      kosan1.jpg
      kosan2.jpg
      ...
```

#### Langkah 2: Masukkan Gambar
Copy gambar kosan Anda ke folder `public/images/`

#### Langkah 3: Update Data
Gunakan path relatif:

```typescript
{
  image: '/images/kosan1.jpg',
}
```

**Catatan:** 
- Format gambar yang didukung: `.jpg`, `.jpeg`, `.png`, `.webp`
- Ukuran gambar disarankan: 800x600px atau lebih besar
- Optimalkan gambar agar website lebih cepat

---

## 📍 Cara Mengubah Daerah dan Lokasi

### Mengubah Daftar Daerah
Buka file `lib/data.ts`, cari bagian:

```typescript
export const areas = ['Semua Daerah', 'Batu Ampar', 'Lubuk Baja', ...];
```

Tambahkan atau ubah daerah sesuai kebutuhan:

```typescript
export const areas = [
  'Semua Daerah',
  'Batu Ampar',
  'Lubuk Baja',
  'Batam Center',
  'Bengkong',
  'Sekupang',
  'Nongsa',
  'Daerah Baru',  // Tambahkan daerah baru
];
```

### Mengubah Daftar Lokasi
Cari bagian:

```typescript
export const locations = ['Semua Lokasi', 'Sei Panas', 'Nagoya', ...];
```

Tambahkan atau ubah lokasi:

```typescript
export const locations = [
  'Semua Lokasi',
  'Sei Panas',
  'Nagoya',
  'Lokasi Baru',  // Tambahkan lokasi baru
];
```

---

## ✅ Checklist Setelah Mengubah Data

1. ✅ Nomor WhatsApp sudah diubah
2. ✅ Data kosan sudah diupdate
3. ✅ Gambar kosan sudah diubah (jika perlu)
4. ✅ Daerah dan lokasi sudah disesuaikan
5. ✅ Test di browser untuk memastikan semua berfungsi

---

## 🚀 Tips

1. **Backup Data**: Sebelum mengubah banyak data, copy file `lib/data.ts` sebagai backup
2. **Test Setelah Perubahan**: Setelah mengubah data, refresh browser dan test semua fitur
3. **Gambar Berkualitas**: Gunakan gambar dengan kualitas baik untuk tampilan yang menarik
4. **ID Unik**: Pastikan setiap kosan memiliki ID yang berbeda
5. **Harga Realistis**: Masukkan harga yang realistis untuk Batam

---

## 📞 Bantuan

Jika ada masalah atau pertanyaan, pastikan:
- Format nomor WhatsApp sudah benar (tanpa +, tanpa spasi)
- ID kosan tidak duplikat
- URL gambar valid dan bisa diakses
- Syntax JavaScript/TypeScript sudah benar (tanda koma, kurung kurawal, dll)

---

**Selamat menggunakan website Kosan Batam! 🎉**



