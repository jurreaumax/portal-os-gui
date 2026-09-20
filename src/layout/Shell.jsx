import React, { useEffect, useState } from 'react';
import { createWindowManager } from '../windowing/WindowManager';
import WindowLayer from '../windowing/WindowLayer';
import Dock from './Dock';
import { fetchIdentity } from '../api/identity';
import '../windowing/window.css';

const manager = createWindowManager();
export default function Shell() {
  const [windows, setWindows] = useState([]);
  useEffect(() => manager.subscribe(setWindows), []);
  const renderApp = (id) => id === 'identity' ? <Identity /> : <p>{id} app</p>;
  return <main className="desktop-shell"><header className="desktop-header"><strong>PORTAL-OS</strong><span>UMBRELLA CONSOLE</span></header><Dock onLaunch={(id) => manager.openWindow(id, id[0].toUpperCase() + id.slice(1))} openWindows={windows} /><WindowLayer windows={windows} manager={manager} renderApp={renderApp} /></main>;
}
function Identity() {
  const [state, setState] = useState({ loading: true });
  useEffect(() => { fetchIdentity().then((data) => setState({ data })).catch((error) => setState({ error: error.message })); }, []);
  if (state.loading) return <p>Loading identity…</p>;
  if (state.error) return <p className="error">{state.error}</p>;
  return <pre>{JSON.stringify(state.data, null, 2)}</pre>;
}
