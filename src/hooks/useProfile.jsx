import { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_PROFILE } from '../data/questionnaireConfig';

const ProfileContext = createContext(null);

/**
 * Context provider for sharing questionnaire profile and results across pages.
 */
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [recommendations, setRecommendations] = useState([]);
  const [analysisMeta, setAnalysisMeta] = useState(null);

  const saveProfile = useCallback((data) => {
    setProfile(data);
  }, []);

  const saveRecommendations = useCallback((data, meta) => {
    setRecommendations(data);
    setAnalysisMeta(meta);
  }, []);

  const resetAll = useCallback(() => {
    setProfile(INITIAL_PROFILE);
    setRecommendations([]);
    setAnalysisMeta(null);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        recommendations,
        analysisMeta,
        saveProfile,
        saveRecommendations,
        resetAll,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
