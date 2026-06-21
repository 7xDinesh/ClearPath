import { useEffect, useState } from 'react';

/**
 * Full-screen overlay shown while eligibility analysis runs.
 */
export default function AnalyzingOverlay({ step }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const progressInterval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 99) return current;
        return Math.min(current + 0.25 + Math.random() * 0.35, 99);
      });
    }, 150);

    return () => {
      window.clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (step >= 2) {
      setProgress(100);
    }
  }, [step]);

  const statusMessage =
    progress === 100
      ? 'Analysis complete'
      : progress <= 20
      ? 'Analyzing profile'
      : progress <= 40
      ? 'Checking eligibility rules'
      : progress <= 60
      ? 'Evaluating financial criteria'
      : progress <= 85
      ? 'Generating recommendations'
      : 'Finalizing results';

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

        <p className="mb-4 text-base font-medium text-slate-700">
          {statusMessage}
        </p>

        <div className="mb-4 rounded-full bg-slate-100 h-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-2xl font-semibold text-slate-900">
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}