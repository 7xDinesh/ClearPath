/**
 * Confidence level badge with accessible color coding.
 */
function ConfidenceBadge({ level }) {
  const styles = {
    high: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const labels = {
    high: 'Higher potential match',
    medium: 'Moderate potential match',
    low: 'Lower potential match',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles[level] || styles.low}`}
    >
      {labels[level] || level} confidence
    </span>
  );
}

const RULE_STATUS_STYLES = {
  match: { icon: '✓', color: 'text-green-700', bg: 'bg-green-50' },
  gap: { icon: '–', color: 'text-amber-700', bg: 'bg-amber-50' },
  unknown: { icon: '?', color: 'text-slate-600', bg: 'bg-slate-50' },
};

function RuleCheckItem({ check }) {
  const style = RULE_STATUS_STYLES[check.status] || RULE_STATUS_STYLES.unknown;
  const statusLabel = {
    match: 'May align',
    gap: 'May not align',
    unknown: 'Needs verification',
  };

  return (
    <li className={`rounded-lg px-3 py-2 text-sm ${style.bg}`}>
      <div className="flex items-center gap-2">
        <span className={`font-bold ${style.color}`} aria-hidden="true">{style.icon}</span>
        <span className="font-medium text-slate-800">{check.criterion}</span>
        <span className={`ml-auto text-xs font-medium ${style.color}`}>{statusLabel[check.status]}</span>
      </div>
      <p className="mt-1 pl-5 text-xs text-slate-600">{check.detail}</p>
    </li>
  );
}

/**
 * Scholarship recommendation card with transparent rule-by-rule reasoning.
 */
export default function ScholarshipCard({ recommendation, rank }) {
  const {
    scholarshipName,
    confidence,
    reasoning,
    matchedRules,
    missingInformation,
    ruleChecks,
    considerations,
    nextStep,
    officialSource,
    description,
  } = recommendation;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          {rank && (
            <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-wide text-primary-600">
              Potential Match #{rank}
            </span>
          )}
          <h3 className="text-lg font-semibold text-slate-900">{scholarshipName}</h3>
          {description && (
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          )}
        </div>
        <ConfidenceBadge level={confidence} />
      </div>

      <section className="mb-4" aria-labelledby={`reasoning-${scholarshipName}`}>
        <h4
          id={`reasoning-${scholarshipName}`}
          className="mb-2 text-sm font-semibold text-primary-800"
        >
          AI Reasoning
        </h4>
        <p className="text-sm leading-relaxed text-slate-700">{reasoning}</p>
      </section>

      {ruleChecks?.length > 0 && (
        <section className="mb-4" aria-labelledby={`checks-${scholarshipName}`}>
          <h4
            id={`checks-${scholarshipName}`}
            className="mb-2 text-sm font-semibold text-primary-800"
          >
            Criterion-by-Criterion Evaluation
          </h4>
          <ul className="space-y-2">
            {ruleChecks.map((check, index) => (
              <RuleCheckItem key={index} check={check} />
            ))}
          </ul>
        </section>
      )}

      {matchedRules?.length > 0 && (
        <section className="mb-4" aria-labelledby={`matched-${scholarshipName}`}>
          <h4
            id={`matched-${scholarshipName}`}
            className="mb-2 text-sm font-semibold text-primary-800"
          >
            Matched Eligibility Rules
          </h4>
          <ul className="space-y-1.5">
            {matchedRules.map((rule, index) => (
              <li key={index} className="flex gap-2 text-sm text-slate-700">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {rule}
              </li>
            ))}
          </ul>
        </section>
      )}

      {considerations?.length > 0 && (
        <section className="mb-4" aria-labelledby={`considerations-${scholarshipName}`}>
          <h4
            id={`considerations-${scholarshipName}`}
            className="mb-2 text-sm font-semibold text-primary-800"
          >
            Considerations
          </h4>
          <ul className="space-y-1.5">
            {considerations.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm text-slate-600">
                <span className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true">!</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {missingInformation?.length > 0 && (
        <section className="mb-4" aria-labelledby={`missing-${scholarshipName}`}>
          <h4
            id={`missing-${scholarshipName}`}
            className="mb-2 text-sm font-semibold text-primary-800"
          >
            Missing Information
          </h4>
          <ul className="space-y-1.5">
            {missingInformation.map((info, index) => (
              <li key={index} className="flex gap-2 text-sm text-slate-600">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {info}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-4 rounded-lg bg-primary-50 p-4" aria-labelledby={`next-${scholarshipName}`}>
        <h4
          id={`next-${scholarshipName}`}
          className="mb-1 text-sm font-semibold text-primary-800"
        >
          Next Step
        </h4>
        <p className="text-sm text-primary-900">{nextStep}</p>
      </section>

      {officialSource && (
        <a
          href={officialSource}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline"
        >
          Verify through official source
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </article>
  );
}
