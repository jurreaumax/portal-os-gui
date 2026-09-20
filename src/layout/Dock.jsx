import React from 'react';
const apps = [{ id: 'dashboard', icon: '🏠' }, { id: 'identity', icon: '🧬' }, { id: 'console', icon: '⌨️' }, { id: 'beesim', icon: '��' }];
export default function Dock({ onLaunch, openWindows }) { return <nav className="dock" aria-label="Applications">{apps.map((app) => <button key={app.id} className={`dock-icon ${openWindows.some((w) => w.appId === app.id) ? 'open' : ''}`} onClick={() => onLaunch(app.id)}>{app.icon}</button>)}</nav>; }
