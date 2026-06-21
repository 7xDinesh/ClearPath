import { Link } from 'react-router-dom';

/**
 * Site header with navigation and branding.
 */
export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white"
            aria-hidden="true"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="text-lg font-bold text-primary-800 sm:text-xl">ClearPath</span>
        </Link>

        <nav aria-label="Main navigation">
          <Link
            to="/questionnaire"
            className="rounded-lg px-3 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50 sm:px-4"
          >
            Check Eligibility
          </Link>
        </nav>
      </div>
    </header>
  );
}
