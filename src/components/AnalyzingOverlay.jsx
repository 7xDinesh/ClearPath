import { useEffect, useState } from 'react';

/**
 * Full-screen overlay shown while eligibility analysis runs.
 */
export default function AnalyzingOverlay({ step }) {
  const steps = [
    'Reviewing your profile',
    'Comparing eligibility rules',
    'Generating recommendations',
  ];

  const statusMessages = [
    'Analyzing profile',
    'Checking eligibility rules',
    'Evaluating financial criteria',
    'Comparing scholarship requirements',
    'Generating recommendations',
    'Finalizing results',
  ];

  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    setProgress(0);
    setStatusIndex(0);

    const progressInterval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 95) return current;
        return Math.min(current + 1 + Math.random() * 2, 95);
      });
    }, 180);

    const statusInterval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % statusMessages.length);
    }, 3200);

    return () => {
      window.clearInterval(progressInterval);
      window.clearInterval(statusInterval);
    };
  }, []);

  useEffect(() => {
    if (step >= steps.length - 1) {
      setProgress(100);
    }
  }, [step, steps.length]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Analyzing eligibility"
    >
      <div className="mx-4 max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Finding your best scholarship matches
        </h2>
        <p className="mb-6 text-sm text-slate-600">
          ClearPath is analyzing your profile and comparing it against scholarship eligibility criteria.
        </p>

        <div className="mb-4 rounded-full bg-slate-100 h-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-4 text-2xl font-semibold text-slate-900">
          {Math.floor(progress)}%
        </div>

        <p className="mb-6 text-base font-medium text-slate-700">
          {statusMessages[statusIndex]}
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