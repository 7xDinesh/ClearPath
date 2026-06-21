import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import ProgressIndicator from '../components/ProgressIndicator';
import FormStep from '../components/FormStep';
import Button from '../components/Button';
import AnalyzingOverlay from '../components/AnalyzingOverlay';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { useProfile } from '../hooks/useProfile';
import { getRecommendations } from '../services/aiService';
import { validateStep } from '../utils/validation';

/**
 * Multi-step questionnaire page.
 * Collects student profile data across 4 steps.
 */
export default function QuestionnairePage() {
  const navigate = useNavigate();
  const { saveProfile, saveRecommendations } = useProfile();
  const {
    profile,
    currentStep,
    totalSteps,
    currentStepConfig,
    updateField,
    goNext,
    goBack,
    isStepValid,
    isFirstStep,
    isLastStep,
  } = useQuestionnaire();

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  useEffect(() => {
    if (!submitting) return undefined;

    const timers = [
      setTimeout(() => setAnalysisStep(1), 400),
      setTimeout(() => setAnalysisStep(2), 900),
    ];

    return () => timers.forEach(clearTimeout);
  }, [submitting]);

  const validateCurrentStep = () => {
    const stepErrors = validateStep(currentStep, profile);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setErrors({});
    goNext();
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setSubmitting(true);
    setAnalysisStep(0);

    try {
      saveProfile(profile);
      const { recommendations, analysisMeta } = await getRecommendations(profile);
      saveRecommendations(recommendations, analysisMeta);
      navigate('/results');
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      setErrors({ _form: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 sm:py-14">
      {submitting && <AnalyzingOverlay step={analysisStep} />}

      <div className="container-app mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Eligibility Questionnaire
          </h1>
          <p className="text-slate-600">
            Help us understand your profile to find programs you may qualify for.
          </p>
        </div>

        <Disclaimer className="mb-8" />

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepTitle={currentStepConfig.title}
          />

          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            {currentStepConfig.title}
          </h2>

          <FormStep
            fields={currentStepConfig.fields}
            profile={profile}
            onChange={updateField}
            errors={errors}
          />

          {errors._form && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {errors._form}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="secondary"
              onClick={goBack}
              disabled={isFirstStep || submitting}
              className={`w-full sm:w-auto ${isFirstStep ? 'invisible' : ''}`}
            >
              Back
            </Button>

            {isLastStep ? (
              <Button
                className="w-full sm:w-auto"
                onClick={handleSubmit}
                disabled={submitting || !isStepValid(currentStep)}
              >
                {submitting ? 'Analyzing...' : 'Submit & View Results'}
              </Button>
            ) : (
              <Button
                className="w-full sm:w-auto"
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
