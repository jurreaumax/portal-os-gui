import { request } from '../api/api';

export const TOKEN_KEY = 'portal_os_token';

export const UAL_EVENTS = [
  'auth.changed', 'session.expired', 'worker.offline', 'worker.online',
  'identity.updated', 'kernel.updated', 'umbrella.updated', 'sim.updated', 'health.updated',
];

class UALCore {
  state = {
    token: typeof localStorage === 'undefined' ? null : localStorage.getItem(TOKEN_KEY),
    workerOnline: true,
    sessionValid: true,
  };

  listeners = new Map();
  pollInterval = null;

  getState() { return this.state; }

  on(event, listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event).add(listener);
    return () => this.listeners.get(event)?.delete(listener);
  }

  emit(event) { this.listeners.get(event)?.forEach((listener) => listener(this.state)); }

  setToken(value) {
    const token = value?.trim().replace(/^Bearer\s+/i, '') || null;
    this.state = { ...this.state, token, sessionValid: Boolean(token) };
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
    this.emit('auth.changed');
    if (!token) this.emit('session.expired');
  }

  can() { return Boolean(this.state.token && this.state.sessionValid); }

  async call(method, path, body) {
    if (!this.state.token) throw new Error('Authentication required');
    return request(method, path, { token: this.state.token, body });
  }

  startPolling() {
    if (this.pollInterval) return;
    this.pollInterval = setInterval(() => this.syncAll(), 10000);
    this.syncAll();
  }

  stopPolling() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  async safe(method, path, body) {
    try { return await this.call(method, path, body); }
    catch (error) { return { ok: false, status: error.status || 0, error: error.message }; }
  }

  async syncAll() {
    if (!this.state.token) {
      this.state = { ...this.state, sessionValid: false };
      this.emit('session.expired');
      return;
    }
    const [identity, kernel, umbrella, sim, health] = await Promise.all([
      this.safe('POST', '/umbrella/identity/license', { tier: 'basic', input: {} }),
      this.safe('GET', '/universe/state'),
      this.safe('GET', '/universe/umbrella'),
      this.safe('POST', '/umbrella/sim/pack', { tier: 'basic', input: {} }),
      this.safe('GET', '/health'),
    ]);
    const results = [identity, kernel, umbrella, sim, health];
    const workerOnline = results.some((result) => result.status !== 0);
    const sessionValid = !results.some((result) => result.status === 401);
    this.state = { ...this.state, identity: identity.data, kernel: kernel.data, umbrella: umbrella.data, sim: sim.data, health: health.data, workerOnline, sessionValid };
    this.emit(workerOnline ? 'worker.online' : 'worker.offline');
    ['identity', 'kernel', 'umbrella', 'sim', 'health'].forEach((name) => this.emit(`${name}.updated`));
    if (!sessionValid) this.emit('session.expired');
  }
}

export const UAL = new UALCore();
