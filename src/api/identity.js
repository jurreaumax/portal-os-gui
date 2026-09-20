import { API } from './client';

export function fetchIdentity() {
  return API.get('/api/umbrella/identity');
}
