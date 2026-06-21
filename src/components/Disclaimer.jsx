/**
 * Prominent responsible AI disclaimer banner.
 * Displayed on results and questionnaire pages.
 */
export default function Disclaimer({ className = '' }) {
  return (
    <div
      role="note"
      aria-label="Important disclaimer"
      className={`rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 ${className}`}
    >
      <div className="flex gap-3">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-amber-900">
          <strong className="font-semibold">Important:</strong> Results are informational only
          and do not guarantee eligibility. Always verify requirements through official sources.
        </p>
      </div>
    </div>
  );
}
