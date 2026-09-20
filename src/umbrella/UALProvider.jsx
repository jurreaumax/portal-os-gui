import React, { createContext, useContext, useEffect, useState } from 'react';
import { UAL, UAL_EVENTS } from './UAL';

const UALContext = createContext(null);

export function UALProvider({ children }) {
  const [state, setState] = useState({ ...UAL.getState() });
  useEffect(() => {
    const unsubscribers = UAL_EVENTS.map((event) => UAL.on(event, (next) => setState({ ...next })));
    UAL.startPolling();
    return () => { unsubscribers.forEach((unsubscribe) => unsubscribe()); UAL.stopPolling(); };
  }, []);
  return <UALContext.Provider value={{ state, setToken: (token) => UAL.setToken(token), can: (permission) => UAL.can(permission), call: UAL.call.bind(UAL) }}>{children}</UALContext.Provider>;
}

export function useUAL() {
  const context = useContext(UALContext);
  if (!context) throw new Error('useUAL must be used inside UALProvider');
  return context;
}
