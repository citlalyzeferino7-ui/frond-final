import React from "react";

export default function ProductCard({ producto }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover mb-2 rounded"/>
      <h2 className="text-lg font-bold">{producto.nombre}</h2>
      <p className="text-gray-700">${producto.precio}</p>
    </div>
  );
}