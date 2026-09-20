import React from 'react';

export default function WindowLayer({ windows, manager, renderApp }) {
  return <div className="window-layer">{windows.map((window) => (
    <section className="window" key={window.id} style={{ left: window.x, top: window.y, width: window.w, height: window.h }}>
      <header className="window-titlebar"><span>{window.title}</span><button onClick={() => manager.closeWindow(window.id)} aria-label="Close">×</button></header>
      <div className="window-content">{renderApp(window.appId)}</div>
    </section>
  ))}</div>;
}
