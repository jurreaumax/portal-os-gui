import { useUAL } from '../umbrella/UALProvider';

export default function IdentityViewer() {
  const { state } = useUAL();
  if (!state.identity) return <p>Loading identity…</p>;
  return <div><h3>Identity License</h3><pre>{JSON.stringify(state.identity, null, 2)}</pre></div>;
}
