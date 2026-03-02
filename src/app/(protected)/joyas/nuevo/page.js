'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import StatusBox from '@/components/StatusBox';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AuthGuard from '@/components/AuthGuard';

export default function NuevaJoyaPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function validar() {
    if (!nombre.trim()) return 'Nombre requerido';
    if (!precio || Number(precio) <= 0) return 'Precio inválido';
    if (!stock || Number(stock) < 0) return 'Stock inválido';
    return '';
  }

  const crear = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');

    const v = validar();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      await apiFetch('/joyas', {
        method: 'POST',
        body: JSON.stringify({
          nombre: nombre.trim(),
          precio: Number(precio),
          stock: Number(stock)
        })
      });
      setSuccess('Joya creada correctamente');
      setNombre('');
      setPrecio('');
      setStock('');
    } catch (err) {
      if (err.status === 403) {
        setError('No autorizado, necesitas rol de admin');
        return;
      }
      if (err.status === 401) {
        clearToken();
        router.replace('/login');
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <main className="p-4 flex flex-col">
        <h1>Nueva Joya - Dulce Sensación</h1>
        <form onSubmit={crear}>
          <Input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <Input placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
          <Input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</Button>
        </form>
        <StatusBox loading={loading} error={error} success={success} />
      </main>
    </AuthGuard>
  );
}