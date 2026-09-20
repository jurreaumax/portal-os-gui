import React from 'react';
const apps = [{ id: 'dashboard', icon: '🏠' }, { id: 'identity', icon: '🧬' }, { id: 'console', icon: '⌨️' }, { id: 'beesim', icon: '🐝' }];
export default function Dock({ onLaunch, openWindows = [] }) { return <nav className="dock" aria-label="Applications">{apps.map((app) => <button key={app.id} className={`dock-icon ${openWindows.some((window) => window.appId === app.id) ? 'active' : ''}`} onClick={() => onLaunch(app.id)} title={`Open ${app.id}`}>{app.icon}</button>)}</nav>; }
