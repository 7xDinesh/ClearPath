import { FIELD_CONFIG } from '../data/questionnaireConfig';

/**
 * Renders a single form field based on field configuration.
 */
function FormField({ fieldName, value, onChange, error }) {
  const config = FIELD_CONFIG[fieldName];
  if (!config) return null;

  const id = `field-${fieldName}`;

  const label = (
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
      {config.label}
      {config.required && <span className="text-red-500"> *</span>}
    </label>
  );

  const errorMessage = error && (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {error}
    </p>
  );

  if (config.type === 'select') {
    return (
      <div>
        {label}
        <select
          id={id}
          name={fieldName}
          value={value}
          onChange={(e) => onChange(fieldName, e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {config.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errorMessage}
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        id={id}
        name={fieldName}
        type={config.type}
        inputMode={config.type === 'number' ? 'decimal' : undefined}
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        placeholder={config.placeholder}
        min={config.min}
        max={config.max}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {errorMessage}
    </div>
  );
}

/**
 * Renders all fields for a questionnaire step.
 */
export default function FormStep({ fields, profile, onChange, errors = {} }) {
  return (
    <div className="space-y-5">
      {fields.map((fieldName) => (
        <FormField
          key={fieldName}
          fieldName={fieldName}
          value={profile[fieldName]}
          onChange={onChange}
          error={errors[fieldName]}
        />
      ))}
    </div>
  );
}
