import { FIELD_CONFIG, QUESTIONNAIRE_STEPS } from '../data/questionnaireConfig';

/**
 * Validates a single questionnaire field value.
 * @returns {string|null} Error message or null if valid
 */
export function validateField(field, value) {
  const config = FIELD_CONFIG[field];
  if (!config) return null;

  if (config.required && (value === '' || value === null || value === undefined)) {
    return 'This field is required';
  }

  if (config.type === 'number' && value !== '') {
    const num = Number(value);
    if (Number.isNaN(num)) return 'Please enter a valid number';
    if (config.min !== undefined && num < config.min) {
      return `Minimum value is ${config.min}`;
    }
    if (config.max !== undefined && num > config.max) {
      return `Maximum value is ${config.max}`;
    }
  }

  return null;
}

/**
 * Validates all fields in a questionnaire step.
 * @returns {{ [field: string]: string }} Map of field errors
 */
export function validateStep(stepIndex, profile) {
  const step = QUESTIONNAIRE_STEPS[stepIndex];
  const errors = {};

  step.fields.forEach((field) => {
    const error = validateField(field, profile[field]);
    if (error) errors[field] = error;
  });

  return errors;
}
