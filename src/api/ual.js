import { request } from './api';

export function post(path, body, token) { return request('POST', path, { body, token }); }
export function get(path, token) { return request('GET', path, { token }); }
