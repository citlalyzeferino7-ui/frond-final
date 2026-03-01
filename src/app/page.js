"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    fetch("postgresql://postgres:Citlaly_joyeria@db.tqachuzztnpagpaczyzy.supabase.co:5432/postgres")
      .then(res => res.json())
      .then(data => setClima(data.current_weather));
  }, []);

  return (
    <div>
      <h1>Tienda de Joyería</h1>
      {clima && (
        <p>Temperatura actual: {clima.temperature}°C</p>
      )}
    </div>
  );
}
