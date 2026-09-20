import React from 'react';
import { UALProvider } from './umbrella/UALProvider';
import UmbrellaGate from './components/UmbrellaGate';
import ErrorBoundary from './components/ErrorBoundary';
import Shell from './layout/Shell';
import './layout/desktop.css'; import './layout/dock.css';

export default function App() { return <ErrorBoundary><UALProvider><UmbrellaGate><Shell /></UmbrellaGate></UALProvider></ErrorBoundary>; }
