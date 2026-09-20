import { API } from './api';

export function fetchIdentity(token) {
  return API.post('/umbrella/identity/license', {}, { token });
}
