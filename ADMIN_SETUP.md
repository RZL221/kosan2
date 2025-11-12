# 🔐 Cara Membuat Admin (Security-First)

## ⚠️ PENTING: Admin Hanya Dibuat via SQL!

Admin **TIDAK PUNYA** halaman register atau login khusus. Admin dibuat langsung dari database menggunakan SQL.

---

## 📋 Langkah-Langkah:

### **1. Daftar Akun User Biasa**
1. Buka http://localhost:3000/register
2. Isi:
   - **Nama**: Nama admin (misal: "Rizal Admin")
   - **HP**: Nomor HP admin (misal: "081234567890")
3. Klik **Register**

### **2. Buat Admin via SQL (phpMyAdmin)**
1. Buka http://localhost/phpmyadmin
2. Pilih database `kosan_db`
3. Klik tab **SQL**
4. Jalankan SQL ini:

```sql
UPDATE users 
SET role = 'admin' 
WHERE phone = '081234567890';
```

Ganti `081234567890` dengan nomor HP yang tadi didaftar.

5. Klik **Go**

✅ **Selesai! User itu sekarang jadi admin.**

---

### **3. Login sebagai Admin**
1. Buka http://localhost:3000/login
2. Masukkan nomor HP yang sudah dijadikan admin
3. Klik **Login**
4. Akan otomatis redirect ke `/admin/dashboard` 👑

---

## 🔒 Keamanan:

- ❌ **Tidak ada halaman** `/admin/register` — tidak bisa daftar admin dari web
- ❌ **Tidak ada halaman** `/admin/login` — admin login dari page login biasa (`/login`)
- ✅ **Admin hanya dibuat via SQL** — lebih aman dan terkontrol
- ✅ **Dashboard otomatis cek role** — jika bukan admin, redirect ke home (`/`)

---

## 📊 Contoh Query untuk Admin:

### **Lihat semua admin:**
```sql
SELECT id, name, phone, role FROM users WHERE role = 'admin';
```

### **Lihat semua user (non-admin):**
```sql
SELECT id, name, phone, role FROM users WHERE role = 'user';
```

### **Ubah user menjadi admin:**
```sql
UPDATE users SET role = 'admin' WHERE phone = '081234567890';
```

### **Ubah admin menjadi user:**
```sql
UPDATE users SET role = 'user' WHERE phone = '081234567890';
```

---

## 🚀 Testing Admin Features:

1. Setelah admin login, akan otomatis ke `/admin/dashboard`
2. Di sana admin bisa:
   - ✅ **Lihat** daftar semua kosan
   - ✅ **Tambah** kosan baru (dengan form modal)
   - ✅ **Edit** kosan yang ada
   - ✅ **Hapus** kosan
   - ✅ **Logout** (top navbar)

---

**Ingat: Admin hanya dibuat via SQL, tidak ada halaman untuk register/login admin!** 🔐
