# Panduan Setup Database & phpMyAdmin

## 1. Buat database di phpMyAdmin

1. Buka phpMyAdmin (biasanya di `http://localhost/phpmyadmin` atau URL hosting kamu).
2. Klik tab **Databases** → buat database baru, contoh `kosan_db` (charset `utf8mb4_general_ci`).
3. Setelah database dibuat, klik database tersebut.
4. Buka tab **SQL** dan jalankan perintah berikut untuk membuat tabel `users`:

```sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

> Opsional: masukkan akun admin awal secara manual
>
> ```sql
> INSERT INTO users (name, email, password_hash, role)
> VALUES ('Admin Utama', 'admin@kos.com', '$2a$10$1Cr7fnzu9LQJWw7wHNsl2efhEkb0ndmH4HQm5pFnaEKcE1GTtC/Sm', 'admin');
> ```
>
> Password hash di atas setara dengan `admin123` (gunakan hanya untuk testing, segera ganti di production).

## 2. Siapkan environment variable

Buat file `.env.local` di root project Next.js dan isi variabel berikut (sesuaikan dengan konfigurasi database kamu):

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=kosan_db

JWT_SECRET=your_super_secret_jwt_key
```

> **Catatan penting:**
> - Jangan commit `.env.local` ke repository publik.
> - `JWT_SECRET` harus nilai unik dan sulit ditebak.

## 3. Install dependencies

Setelah mengubah `package.json`, jalankan kembali

```bash
npm install
```

agar paket `mysql2`, `bcryptjs`, dan `jsonwebtoken` terpasang.

## 4. Jalankan Next.js

```bash
npm run dev
```

Pastikan terminal tidak menampilkan error koneksi database.

## 5. Menghubungkan ke phpMyAdmin (hosting)

Jika menggunakan hosting cPanel:

1. Login ke cPanel → buka **MySQL Databases** → buat database dan user.
2. Tambahkan user ke database dengan hak akses **All Privileges**.
3. Catat host, nama database, user, dan password.
   - Host seringkali `localhost`, kadang bisa berupa URL/IP (cek dokumentasi hosting).
4. Update `.env.local` dengan konfigurasi tersebut.
5. Upload project Next.js / jalankan deployment (Vercel/Netlify) lalu set environment var yang sama di dashboard hosting frontend.

## 6. Testing endpoint auth

Setelah server jalan, coba akses via REST client (Postman/Thunder Client) atau `curl`:

### Register user baru
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Pengguna Baru","email":"user@kos.com","password":"user123"}'
```

### Login user
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@kos.com","password":"user123"}' -i
```

Jika ingin menjadikan akun sebagai admin, ubah kolom `role` di phpMyAdmin menjadi `admin`:

```sql
UPDATE users SET role = 'admin' WHERE email = 'user@kos.com';
```

Setelah login sebagai admin, buka `http://localhost:3000/admin/dashboard` di browser untuk melihat halaman admin (halaman ini hanya untuk role `admin`).

---

Dengan langkah di atas, aplikasi sudah terhubung ke MySQL/phpMyAdmin dan mendukung login/register umum dengan role yang dapat diubah langsung dari database.
