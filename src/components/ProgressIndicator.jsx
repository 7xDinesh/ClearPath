/**
 * Multi-step form progress indicator.
 */
export default function ProgressIndicator({ currentStep, totalSteps, stepTitle }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8" aria-label={`Step ${currentStep + 1} of ${totalSteps}`}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-slate-500">{stepTitle}</span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
