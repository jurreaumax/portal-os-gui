const env = import.meta.env || {};

export const API_BASE_URL = (env.VITE_API_BASE_URL || env.API_BASE_URL || 'https://planetary-max.jurreaumax.workers.dev').replace(/\/$/, '');

async function request(method, path, { token, body, signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token.replace(/^Bearer\s+/i, '')}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  let data;
  try { data = await response.json(); } catch { data = null; }
  if (!response.ok) {
    const error = new Error(data?.message || data?.error || `${method} ${path} failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
}

export const API = {
  base: API_BASE_URL,
  get: (path, options) => request('GET', path, options),
  post: (path, body, options = {}) => request('POST', path, { ...options, body }),
  authenticated: (path, options = {}) => request(options.method || 'GET', path, options),
};

export { request };
