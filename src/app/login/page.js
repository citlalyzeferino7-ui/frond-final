'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';
import { getToken, setToken } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace('/productos');
    }
  }, [router]);

  const login = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || 'Credenciales incorrectas');
        return;
      }

      setToken(data.token);
      setSuccess('Login Correcto');
      router.replace('/productos');
    } catch (err) {
      setError('Error de red / API no disponible');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Iniciar Sesión</h2>
        <p className="italic text-indigo-600 mb-6">
          ¡Bienvenido a Dulce Sensación! Inicia sesión para ver nuestros productos.
        </p>

        <form onSubmit={login} className="flex flex-col text-left">
          <label className="mb-1 font-medium text-gray-800" htmlFor="email">
            Correo
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="mb-1 font-medium text-gray-800" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mb-6 px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {(error || success) && (
          <div className={`mt-4 p-2 rounded-md text-white ${error ? 'bg-red-500' : 'bg-green-500'}`}>
            {error || success}
          </div>
        )}
      </div>
    </main>
  );
}