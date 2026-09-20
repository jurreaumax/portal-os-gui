export const API = {
  base: (import.meta.env.VITE_API_BASE_URL || import.meta.env.API_BASE_URL || 'https://planetary-max.jurreaumax.workers.dev').replace(/\/$/, ''),
  async get(path) {
    const response = await fetch(`${API.base}${path}`);
    if (!response.ok) throw new Error(`GET ${path} failed (${response.status})`);
    return response.json();
  },
};
