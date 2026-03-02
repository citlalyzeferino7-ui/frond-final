'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function JoyasPage() {
  const [joyas, setJoyas] = useState([]);

  useEffect(() => {
    async function fetchJoyas() {
      try {
        const data = await apiFetch('/joyas');
        setJoyas(data);
      } catch (err) {
        console.error(err);
        alert('No se pudieron cargar las joyas');
      }
    }
    fetchJoyas();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {joyas.map(j => (
        <div key={j.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
          <img src={j.imagen} alt={j.nombre} style={{ width: '100%' }} />
          <h3>{j.nombre}</h3>
          <p>${j.precio}</p>
        </div>
      ))}
    </div>
  );
}