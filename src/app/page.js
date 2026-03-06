import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

      {/* Logo / Marca */}
      <div className="absolute top-8 left-10 text-3xl font-bold text-red-950 tracking-wide">
         Dulce Sensación
      </div>

      {/* Tarjeta principal */}
      <div className="bg-cyan-300 p-12 rounded-3xl shadow-2xl text-center max-w-md">

        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Bienvenidos
        </h1>

        <p className="text-gray-600 mb-8">
          Sistema Full Stack de gestión de joyas
        </p>

        <Link href="/login">
          <button className="bg-pink-500 hover:bg-pink-600 text-zinc-950 px-8 py-3 rounded-xl shadow-lg transition duration-300">
            Iniciar Sesión
          </button>
        </Link>

      </div>

    </main>
  );
}