'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/config';
import { getToken } from '@/lib/auth';

export default function Catalogo() {
  const router = useRouter();
  const [productos, setProductos] = useState([]);  // Asegúrate de que productos empiece como un array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API}/productos/visible`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          setProductos([]); // En caso de que la respuesta no sea un array
        }
      } catch (err) {
        setError('Error al cargar los productos');
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {productos.length === 0 ? (
        <p>No se encontraron productos</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-bold">{producto.nombre}</h2>
              <p className="text-gray-700">${producto.precio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}