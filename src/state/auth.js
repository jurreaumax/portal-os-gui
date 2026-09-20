import { useSyncExternalStore } from 'react';

const KEY = 'portal-os-bearer-token';
let token = localStorage.getItem(KEY) || '';
const listeners = new Set();
const notify = () => listeners.forEach((listener) => listener());

export const auth = {
  get token() { return token; },
  get isValid() { return Boolean(token); },
  login(value) { token = value.trim().replace(/^Bearer\s+/i, ''); if (token) localStorage.setItem(KEY, token); notify(); },
  logout() { token = ''; localStorage.removeItem(KEY); notify(); },
  subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
};

export function useAuth() {
  const current = useSyncExternalStore(auth.subscribe, () => auth.token, () => '');
  return { token: current, isValid: Boolean(current), login: auth.login, logout: auth.logout };
}
