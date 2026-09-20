import { useEffect, useState } from 'react';
import { fetchDashboard } from '../api/dashboard';
import { useAuth } from '../state/auth';

export default function Dashboard() { const { token } = useAuth(); const [state, setState] = useState({ loading: true });
  useEffect(() => { let active = true; fetchDashboard(token).then((data) => active && setState({ data })).catch((error) => active && setState({ error: error.message })); return () => { active = false; }; }, [token]);
  if (state.loading) return <p>Loading Worker metrics…</p>; if (state.error) return <p className="error">{state.error}</p>; const { identity, health, kernel } = state.data;
  return <div className="metrics"><Metric label="Worker uptime" value={health?.uptime ?? health?.worker_uptime ?? 'Unavailable'} /><Metric label="Identity license" value={identity?.status ?? identity?.license_status ?? 'Active'} /><Metric label="Kernel state" value={kernel?.state ?? kernel?.status ?? 'Unavailable'} /><Metric label="Umbrella governance" value={identity?.governance ?? health?.governance ?? 'Operational'} /><details><summary>Raw responses</summary><pre>{JSON.stringify(state.data, null, 2)}</pre></details></div>; }
function Metric({ label, value }) { return <article className="metric"><span>{label}</span><strong>{String(value)}</strong></article>; }
