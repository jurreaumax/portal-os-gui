import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() { if (this.state.error) return <div className="fatal-error"><h2>Portal OS encountered an error</h2><p>{this.state.error.message}</p><button onClick={() => this.setState({ error: null })}>Try again</button></div>; return this.props.children; }
}
