import { API } from '@/config';

export async function getProductoPorID(id) {
  const res = await fetch(`${API}/joyas/${id}`);
  if (!res.ok) throw new Error('Error al obtener producto');
  return res.json();
}