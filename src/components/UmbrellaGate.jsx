import React from 'react';
import { useUAL } from '../umbrella/UALProvider';
import LoginModal from './LoginModal';

export default function UmbrellaGate({ children }) {
  const { state, setToken } = useUAL();
  if (!state.token || !state.sessionValid) return <LoginModal onSave={setToken} />;
  if (!state.workerOnline) return <div className="auth-overlay"><div className="auth-modal"><h2>Portal-OS</h2><p>Worker offline. Try again later.</p><button onClick={() => window.location.reload()}>Retry</button></div></div>;
  return children;
}
