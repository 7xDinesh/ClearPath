import { useState, useCallback } from 'react';
import { INITIAL_PROFILE, QUESTIONNAIRE_STEPS } from '../data/questionnaireConfig';
import { validateField } from '../utils/validation';

export { INITIAL_PROFILE, QUESTIONNAIRE_STEPS, FIELD_CONFIG } from '../data/questionnaireConfig';

/**
 * Custom hook for managing questionnaire state and navigation.
 */
export function useQuestionnaire() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [currentStep, setCurrentStep] = useState(0);

  const updateField = useCallback((field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, QUESTIONNAIRE_STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const isStepValid = useCallback((stepIndex) => {
    const step = QUESTIONNAIRE_STEPS[stepIndex];
    return step.fields.every((field) => !validateField(field, profile[field]));
  }, [profile]);

  return {
    profile,
    currentStep,
    totalSteps: QUESTIONNAIRE_STEPS.length,
    currentStepConfig: QUESTIONNAIRE_STEPS[currentStep],
    updateField,
    goNext,
    goBack,
    isStepValid,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === QUESTIONNAIRE_STEPS.length - 1,
  };
}
