# Kosan Batam - Website Pencarian Kosan

Website modern untuk mencari kosan di Batam dengan fitur filter, detail kosan, dan integrasi WhatsApp.

## Fitur

- 🏠 **Homepage dengan Filter**: Filter berdasarkan harga, lokasi, dan daerah
- 🖼️ **Kosan Card**: Tampilan kosan dengan gambar dan harga
- 📋 **Detail Modal**: Informasi lengkap kosan dengan fasilitas
- 🛒 **Add to Cart**: Tambahkan kosan ke cart (min 3, max 5)
- 💬 **Tanya Stock via WhatsApp**: Integrasi langsung ke WhatsApp bot
- 🎨 **UI Modern**: Desain yang menarik untuk Gen Z

## Teknologi

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Setup database MySQL dan environment variable dengan mengikuti `DATABASE_SETUP.md`.

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000)

## Fitur Admin & Autentikasi

- Halaman register umum: `/register`
- Halaman login umum: `/login`
- Setelah login berhasil, langsung diarahkan ke homepage
- Role pengguna ditentukan dari database (`users.role`)
  - Default `user`, ubah ke `admin` via phpMyAdmin untuk akses halaman admin
- Halaman dashboard admin (khusus role `admin`): `/admin/dashboard`
- Endpoint API: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`

## Konfigurasi WhatsApp

Edit file `app/cart/page.tsx` dan ubah `WHATSAPP_NUMBER` dengan nomor WhatsApp bot Anda:

```typescript
const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor Anda
```

## Struktur Project

```
kosan2/
├── app/
│   ├── cart/
│   │   └── page.tsx      # Halaman cart
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── CartProvider.tsx  # Context untuk cart
│   ├── FilterSection.tsx # Komponen filter
│   ├── KosanCard.tsx     # Card kosan
│   ├── KosanModal.tsx    # Modal detail kosan
│   ├── DataDiriModal.tsx # Modal form data diri
│   └── Navbar.tsx        # Navigation bar
└── lib/
    └── data.ts           # Data kosan sample
```

## Fitur Detail

### Filter
- Filter harga (min & max) dengan format koma
- Filter daerah (Batu Ampar, Lubuk Baja, dll)
- Filter lokasi (Sei Panas, Nagoya, dll)

### Cart
- Minimal 3 kosan untuk bisa tanya stock
- Maksimal 5 kosan
- Validasi otomatis
- Form data diri sebelum kirim ke WhatsApp
- Integrasi WhatsApp dengan pesan otomatis

### UI/UX
- Responsive design (Desktop & Mobile)
- Animasi smooth
- Gradient background yang menarik
- Hover effects
- Mobile-friendly
