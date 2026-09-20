import { useEffect, useState } from 'react';
import { useUAL } from '../umbrella/UALProvider';

export default function StatusBar() {
  const { state } = useUAL();
  const status = !state.token ? 'auth' : !state.workerOnline ? 'offline' : state.sessionValid ? 'connected' : 'auth';
  const labels = { connected: 'Connected', auth: 'Auth Required', offline: 'Worker Offline' };
  return <div className={`status-bar ${status}`}><span className="status-dot" />{labels[status]}</div>;
}
