import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="font-serif text-3xl mb-4 text-[#1a1a1a]">Something went wrong</h1>
            <p className="font-sans text-[#404040] mb-8">
              We're sorry, but something unexpected happened. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-sans text-[12px] font-bold uppercase tracking-[0.25em] px-6 py-3 bg-[#1a1a1a] text-[#FAFAF8] rounded hover:opacity-80 transition-opacity"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
