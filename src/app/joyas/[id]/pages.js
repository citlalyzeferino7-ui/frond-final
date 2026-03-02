import { API } from '@/config';

async function getJoya(id) {
  const res = await fetch(`${API}/joyas/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Joya no encontrada');
  }

  return res.json();
}

export default async function JoyaDetalle({ params }) {
  const joya = await getJoya(params.id);

  return (
    <main className="min-h-screen bg-pink-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden grid md:grid-cols-2">
        
        <img
          src={joya.imagen || "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1"}
          alt={joya.nombre}
          className="w-full h-72 object-cover rounded-t-lg"
        />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-pink-700">
            {joya.nombre}
          </h1>

          <p className="text-2xl text-pink-600 font-semibold mt-4">
            ${joya.precio} MXN
          </p>

          <p className="mt-6 text-gray-600">
            {joya.descripcion}
          </p>

          <p className="mt-6 font-medium">
            Stock disponible: {joya.stock}
          </p>
        </div>

      </div>
    </main>
  );
}