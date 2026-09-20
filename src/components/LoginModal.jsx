import React, { useState } from 'react';

export default function LoginModal({ onSave }) {
  const [token, setToken] = useState('');
  return <div className="auth-overlay"><form className="auth-modal" onSubmit={(event) => { event.preventDefault(); if (token.trim()) onSave(token); }}>
    <p className="eyebrow">UMBRELLA ACCESS</p><h1>Sign in to Portal OS</h1><p>Enter your Bearer token to connect to the Worker.</p>
    <label htmlFor="bearer-token">Bearer token</label><input id="bearer-token" type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Bearer …" autoFocus />
    <button className="primary" type="submit">Save token</button>
  </form></div>;
}
