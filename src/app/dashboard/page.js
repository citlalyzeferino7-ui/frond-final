'use client';

import { useEffect, useState } from 'react';

const API = "http://localhost:3001/api/products";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error('Error al obtener productos');

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Productos</h1>

      {error && <p className="text-red-500">{error}</p>}

      {products.length === 0 && !error && <p>No hay productos</p>}

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4">
            <h2 className="font-bold">{p.nombre}</h2>
            <p>{p.descripcion}</p>
            <p className="font-semibold">${p.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}