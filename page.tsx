'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !phone) {
      setError('Nama dan nomor HP wajib diisi.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || 'Registrasi gagal.');
      } else {
        setSuccess('Registrasi berhasil. Anda dapat langsung login.');
        setTimeout(() => {
          router.replace('/login');
        }, 1000);
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Daftar Akun Baru</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
              placeholder="Nama lengkapmu"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor HP</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:outline-none"
              placeholder="08xxxxxxxxxx"
              autoComplete="tel"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?{' '}
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Masuk sekarang
          </a>
        </p>
      </div>
    </div>
  );
}

