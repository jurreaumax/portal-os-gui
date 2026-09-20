import { API } from './api';

const optional = (path, token) => API.get(path, { token }).catch((error) => {
  if ([404, 405].includes(error.status)) return null;
  throw error;
});

export function fetchDashboard(token) {
  return Promise.all([
    API.post('/umbrella/identity/license', {}, { token }),
    optional('/umbrella/system/health', token),
    optional('/umbrella/kernel/state', token),
  ]).then(([identity, health, kernel]) => ({ identity, health, kernel }));
}
