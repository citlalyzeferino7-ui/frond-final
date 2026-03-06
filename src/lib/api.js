import { API } from '@/config';

export async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const err = new Error(error.error || 'Error');
    err.status = res.status;
    throw err;
  }

  return res.json();
}