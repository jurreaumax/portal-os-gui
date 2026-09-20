import { useState } from 'react';
import { useUAL } from '../umbrella/UALProvider';

const commands = { '/identity': ['POST', '/umbrella/identity/license', { tier: 'basic', input: {} }], '/kernel': ['GET', '/universe/state'], '/umbrella': ['GET', '/universe/umbrella'], '/health': ['GET', '/health'], '/sim': ['POST', '/umbrella/sim/pack', { tier: 'basic', input: {} }] };
export default function ConsoleApp({ onWindows }) {
  const { call } = useUAL(); const [input, setInput] = useState(''); const [lines, setLines] = useState(['Portal OS console ready. Try /identity, /kernel, /umbrella, /health, /sim, or /windows.']);
  const run = async (event) => { event.preventDefault(); const command = input.trim(); if (!command) return; setInput(''); setLines((old) => [...old, `$ ${command}`]); if (command === '/windows') return onWindows?.(); if (!commands[command]) return setLines((old) => [...old, `Unknown command: ${command}`]); try { const [method, path, body] = commands[command]; const data = await call(method, path, body); setLines((old) => [...old, JSON.stringify(data, null, 2)]); } catch (error) { setLines((old) => [...old, `Error: ${error.message}`]); } };
  return <div className="terminal"><div className="terminal-output">{lines.map((line, index) => <pre key={index}>{line}</pre>)}</div><form onSubmit={run}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a command…" /></form></div>;
}
