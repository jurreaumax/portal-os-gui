import { useUAL } from '../umbrella/UALProvider';

export default function BeeSim() {
  const { state } = useUAL(); const sim = state.sim?.data ?? state.sim;
  if (!sim) return <p>Loading BeeSim…</p>;
  return <div><h3>Simulation Pack</h3><pre>{JSON.stringify(sim, null, 2)}</pre><p>Simulation state is managed by the Unified Access Layer.</p></div>;
}
