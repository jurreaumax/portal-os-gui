import { useAuth } from './state/auth';
import LoginModal from './components/LoginModal';
import ErrorBoundary from './components/ErrorBoundary';
import Shell from './layout/Shell';
import './layout/desktop.css'; import './layout/dock.css';
export default function App() { const { isValid } = useAuth(); return <ErrorBoundary>{isValid ? <Shell /> : <LoginModal />}</ErrorBoundary>; }
