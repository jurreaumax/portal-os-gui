import { useEffect, useState } from 'react';
import WindowLayer from '../windowing/WindowLayer';
import Dock from './Dock';
import { createWindowManager } from '../windowing/WindowManager';
import Dashboard from '../apps/Dashboard'; import IdentityViewer from '../apps/IdentityViewer'; import ConsoleApp from '../apps/Console'; import BeeSim from '../apps/BeeSim';
import StatusBar from '../components/StatusBar'; import { useAuth } from '../state/auth';
import '../windowing/window.css';

const manager = createWindowManager();
export default function Shell() { const { logout } = useAuth(); const [windows, setWindows] = useState([]); useEffect(() => manager.subscribe(setWindows), []);
  const open = (id, title = id) => manager.openWindow(id, title); const renderApp = (id) => ({ dashboard: <Dashboard />, identity: <IdentityViewer />, console: <ConsoleApp onWindows={() => setWindows(manager.getWindows())} />, beesim: <BeeSim /> }[id] || <p>Unknown app</p>);
  return <main className="desktop-shell"><header className="desktop-header"><strong>PORTAL-OS</strong><span>UMBRELLA CONSOLE</span><div className="header-actions"><button onClick={() => open('identity', 'Identity Viewer')}>Refresh Identity</button><button onClick={logout}>Clear Token</button><button onClick={() => open('console', 'Console')}>Open Console</button><button onClick={() => open('dashboard', 'Dashboard')}>Open Dashboard</button></div></header><StatusBar /><WindowLayer windows={windows} manager={manager} renderApp={renderApp} /><Dock onLaunch={(id) => open(id, id[0].toUpperCase() + id.slice(1))} openWindows={windows} /></main>; }
