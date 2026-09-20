import { useUAL } from '../umbrella/UALProvider';

export default function Dashboard() {
  const { state } = useUAL();
  return <div className="metrics"><Metric label="Worker" value={state.workerOnline ? 'Online' : 'Offline'} /><Metric label="Session" value={state.sessionValid ? 'Valid' : 'Expired'} /><Metric label="Identity license" value={state.identity?.tier ?? 'Unavailable'} /><Metric label="Kernel state" value={state.kernel?.data?.started ? 'Started' : state.kernel?.started ? 'Started' : 'Available'} /><Metric label="Umbrella governance" value={state.umbrella?.governance ?? 'Operational'} /><details><summary>UAL state</summary><pre>{JSON.stringify(state, null, 2)}</pre></details></div>;
}
function Metric({ label, value }) { return <article className="metric"><span>{label}</span><strong>{String(value)}</strong></article>; }
