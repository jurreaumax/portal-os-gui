import { useEffect, useState } from 'react';
import { fetchIdentity } from '../api/identity';
import { useAuth } from '../state/auth';

export default function IdentityViewer() { const { token } = useAuth(); const [state, setState] = useState({ loading: true });
  const refresh = () => { setState({ loading: true }); fetchIdentity(token).then((data) => setState({ data })).catch((error) => setState({ error: error.status === 401 ? 'Token rejected. Please save a valid token.' : error.message })); };
  useEffect(refresh, [token]);
  if (state.loading) return <p>Loading identity license…</p>; if (state.error) return <div><p className="error">{state.error}</p><button onClick={refresh}>Retry</button></div>;
  return <div><button onClick={refresh}>Refresh Identity</button><pre>{JSON.stringify(state.data, null, 2)}</pre></div>;
}
