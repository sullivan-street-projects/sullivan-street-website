import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-6xl text-charcoal mb-4">404</h1>
        <p className="font-sans text-body text-muted mb-8">
          This page doesn't exist.
        </p>
        <Link
          to="/"
          className="font-sans text-body-sm text-charcoal underline underline-offset-4 hover:text-muted transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
