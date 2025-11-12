# 📱 Cara Mengakses Website Secara Offline & Membagikan ke Handphone

## 🏠 Metode 1: Menggunakan Jaringan Lokal (LAN) - Paling Mudah

### Langkah 1: Pastikan Komputer dan Handphone di Jaringan WiFi yang Sama

1. **Komputer**: Hubungkan ke WiFi
2. **Handphone**: Hubungkan ke WiFi yang sama
3. Pastikan keduanya terhubung ke router yang sama

### Langkah 2: Cari IP Address Komputer Anda

#### Windows:
1. Buka **Command Prompt** (cmd) atau **PowerShell**
2. Ketik: `ipconfig`
3. Cari **IPv4 Address** (biasanya seperti `192.168.1.100` atau `192.168.0.100`)
4. **Copy IP address ini**

#### Mac:
1. Buka **Terminal**
2. Ketik: `ifconfig | grep "inet "`
3. Cari IP address (biasanya dimulai dengan `192.168.`)

#### Linux:
1. Buka **Terminal**
2. Ketik: `hostname -I` atau `ip addr show`
3. Cari IP address

### Langkah 3: Jalankan Website dengan IP Address

1. Buka **Command Prompt** atau **Terminal** di folder project
2. Ketik perintah berikut (ganti `YOUR_IP` dengan IP address Anda):

```bash
npm run dev -- -H YOUR_IP
```

**Contoh:**
```bash
npm run dev -- -H 192.168.1.100
```

Atau edit file `package.json` dan ubah script dev:

```json
"scripts": {
  "dev": "next dev -H 0.0.0.0",
  ...
}
```

Kemudian jalankan:
```bash
npm run dev
```

### Langkah 4: Akses dari Handphone

1. Buka browser di handphone (Chrome, Safari, dll)
2. Ketik di address bar:
   ```
   http://YOUR_IP:3000
   ```
   
   **Contoh:**
   ```
   http://192.168.1.100:3000
   ```

3. Website akan muncul di handphone!

### Langkah 5: Bagikan ke Teman

1. Berikan IP address dan port ke teman
2. Pastikan teman terhubung ke WiFi yang sama
3. Teman akses: `http://YOUR_IP:3000`

---

## 🌐 Metode 2: Deploy Online (Gratis) - Akses dari Mana Saja

### Opsi A: Menggunakan Vercel (Paling Mudah & Gratis)

#### Langkah 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Langkah 2: Login ke Vercel
```bash
vercel login
```

#### Langkah 3: Deploy
```bash
vercel
```

Ikuti instruksi di terminal. Website akan dapat URL seperti:
```
https://kosan-batam.vercel.app
```

#### Langkah 4: Bagikan URL
Bagikan URL tersebut ke siapa saja, bisa diakses dari mana saja!

**Keuntungan:**
- ✅ Gratis
- ✅ URL permanen
- ✅ Akses dari mana saja (tidak perlu WiFi yang sama)
- ✅ Auto-update saat push code

---

### Opsi B: Menggunakan Netlify (Gratis)

#### Langkah 1: Build Project
```bash
npm run build
```

#### Langkah 2: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Langkah 3: Deploy
```bash
netlify deploy --prod
```

Atau drag & drop folder `.next` ke [netlify.com](https://netlify.com)

---

## 📲 Metode 3: Menggunakan ngrok (Tunnel ke Internet)

### Langkah 1: Install ngrok
Download dari: https://ngrok.com/download

### Langkah 2: Jalankan Website
```bash
npm run dev
```

### Langkah 3: Jalankan ngrok
Buka terminal baru, ketik:
```bash
ngrok http 3000
```

### Langkah 4: Copy URL ngrok
Anda akan dapat URL seperti:
```
https://abc123.ngrok.io
```

Bagikan URL ini ke teman (bisa akses dari mana saja, tapi URL berubah setiap restart)

**Catatan:** Versi gratis ngrok URL berubah setiap restart. Versi berbayar dapat URL permanen.

---

## 🔧 Troubleshooting

### Problem: Handphone tidak bisa akses

**Solusi 1: Matikan Firewall Windows**
1. Buka **Windows Defender Firewall**
2. Klik **Allow an app through firewall**
3. Izinkan **Node.js** atau **npm**

**Solusi 2: Gunakan IP 0.0.0.0**
Edit `package.json`:
```json
"dev": "next dev -H 0.0.0.0"
```

**Solusi 3: Cek Port**
Pastikan port 3000 tidak digunakan aplikasi lain

### Problem: IP Address berubah

**Solusi:** Set IP static di router atau gunakan deploy online (Vercel/Netlify)

### Problem: Website lambat di handphone

**Solusi:** 
- Pastikan WiFi kuat
- Gunakan deploy online untuk performa lebih baik

---

## 📋 Quick Reference

### Akses Lokal (Jaringan Sama):
```
http://YOUR_IP:3000
```

### Akses Online (Vercel):
```
https://your-project.vercel.app
```

### Akses Online (Netlify):
```
https://your-project.netlify.app
```

---

## 💡 Rekomendasi

**Untuk Testing Lokal:**
- ✅ Gunakan **Metode 1** (LAN) - cepat dan mudah

**Untuk Production/Share ke Banyak Orang:**
- ✅ Gunakan **Vercel** - gratis, mudah, dan profesional
- ✅ URL permanen
- ✅ Auto-deploy dari GitHub (opsional)

---

## 🚀 Langkah Cepat (Vercel - Recommended)

1. **Install Vercel:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Selesai!** Dapat URL seperti: `https://kosan-batam.vercel.app`

5. **Bagikan URL** ke teman/handphone - bisa akses dari mana saja!

---

**Selamat! Website Anda sekarang bisa diakses dari handphone dan dibagikan ke teman! 🎉**



