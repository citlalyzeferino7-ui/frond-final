export const API = 'http://localhost:3001';

export function getToken() {
  return localStorage.getItem('token');
}

export function clearToken() {
  localStorage.removeItem('token');
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.error || `Error HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}