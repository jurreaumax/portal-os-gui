import { useEffect, useState } from 'react';
import { API } from '../api/api';
import { useAuth } from '../state/auth';

export default function StatusBar() {
  const { token } = useAuth(); const [status, setStatus] = useState(token ? 'checking' : 'auth');
  useEffect(() => { if (!token) { setStatus('auth'); return undefined; } let active = true; API.post('/umbrella/identity/license', {}, { token }).then(() => active && setStatus('connected')).catch((error) => active && setStatus(error.status === 401 ? 'auth' : 'offline')); return () => { active = false; }; }, [token]);
  const labels = { checking: 'Checking Worker…', connected: 'Connected', auth: 'Auth Required', offline: 'Worker Offline' };
  return <div className={`status-bar ${status}`}><span className="status-dot" />{labels[status]}</div>;
}
