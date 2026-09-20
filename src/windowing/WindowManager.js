export function createWindowManager() {
  let windows = [];
  let listeners = [];
  const notify = () => listeners.forEach((listener) => listener([...windows]));
  return {
    subscribe(listener) {
      listeners.push(listener); listener([...windows]);
      return () => { listeners = listeners.filter((item) => item !== listener); };
    },
    openWindow(appId, title) {
      windows = [...windows, { id: crypto.randomUUID(), appId, title, x: 120, y: 90, w: 520, h: 340 }]; notify();
    },
    closeWindow(id) { windows = windows.filter((window) => window.id !== id); notify(); },
  };
}
