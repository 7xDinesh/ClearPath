import { Link } from 'react-router-dom';
import Button from '../components/Button';

/**
 * 404 page for unknown routes.
 */
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="mb-2 text-6xl font-bold text-primary-600">404</h1>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Page Not Found</h2>
      <p className="mb-8 max-w-md text-slate-600">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
