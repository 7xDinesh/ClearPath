/**
 * Full-screen overlay shown while eligibility analysis runs.
 */
export default function AnalyzingOverlay({ step }) {
  const steps = [
    'Reviewing your profile',
    'Comparing eligibility rules',
    'Generating recommendations',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Analyzing eligibility"
    >
      <div className="mx-4 max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Analyzing Your Profile</h2>
        <p className="mb-6 text-sm text-slate-600">
          Comparing your responses against program eligibility rules using responsible AI reasoning.
        </p>
        <ul className="space-y-2 text-left text-sm">
          {steps.map((label, index) => {
            const isActive = index === step;
            const isDone = index < step;
            return (
              <li
                key={label}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  isActive ? 'bg-primary-50 text-primary-800' : 'text-slate-500'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                    isDone
                      ? 'bg-green-100 text-green-700'
                      : isActive
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : index + 1}
                </span>
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
