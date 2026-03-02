'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('token', data.token);
      router.push('/joyas');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}