import { useState } from 'react';
import { API } from '../api/api';
import { useAuth } from '../state/auth';

const commands = { '/identity': '/umbrella/identity/license', '/kernel': '/umbrella/kernel/state', '/umbrella': '/umbrella/system/health' };
export default function ConsoleApp({ onWindows }) { const { token } = useAuth(); const [input, setInput] = useState(''); const [lines, setLines] = useState(['Portal OS console ready. Try /identity, /kernel, /umbrella, /sim, or /windows.']);
  const run = async (event) => { event.preventDefault(); const command = input.trim(); if (!command) return; setInput(''); setLines((old) => [...old, `$ ${command}`]); if (command === '/sim') return setLines((old) => [...old, 'BeeSim placeholder ready.']); if (command === '/windows') return onWindows ? onWindows() : undefined; if (!commands[command]) return setLines((old) => [...old, `Unknown command: ${command}`]); try { const data = command === '/identity' ? await API.post(commands[command], {}, { token }) : await API.get(commands[command], { token }); setLines((old) => [...old, JSON.stringify(data, null, 2)]); } catch (error) { setLines((old) => [...old, `Error: ${error.message}`]); } };
  return <div className="terminal"><div className="terminal-output">{lines.map((line, index) => <pre key={index}>{line}</pre>)}</div><form onSubmit={run}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a command…" /></form></div>; }
