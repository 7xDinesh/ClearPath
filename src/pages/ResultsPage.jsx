import { Link, Navigate } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import AnalysisSummary from '../components/AnalysisSummary';
import ScholarshipCard from '../components/ScholarshipCard';
import Button from '../components/Button';
import { useProfile } from '../hooks/useProfile';

/**
 * Results page displaying scholarship recommendations.
 * Uses responsible AI language throughout.
 */
export default function ResultsPage() {
  const { profile, recommendations, analysisMeta, resetAll } = useProfile();

  if (!profile.fullName) {
    return <Navigate to="/questionnaire" replace />;
  }

  const handleStartOver = () => {
    resetAll();
  };

  return (
    <div className="py-10 sm:py-14">
      <div className="container-app">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Your Potential Matches
          </h1>
          <p className="text-slate-600">
            Based on the information provided, here are programs you may qualify for.
            Please verify through official sources.
          </p>
        </div>

        <Disclaimer className="mx-auto mb-6 max-w-4xl" />
        <AnalysisSummary analysisMeta={analysisMeta} />

        <div className="mx-auto mb-10 max-w-4xl rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Profile Summary
          </h2>
          <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <p><span className="font-medium text-slate-700">Name:</span> {profile.fullName}</p>
            <p><span className="font-medium text-slate-700">Age:</span> {profile.age}</p>
            <p><span className="font-medium text-slate-700">Location:</span> {profile.state}, {profile.country}</p>
            <p><span className="font-medium text-slate-700">Degree:</span> {profile.degreeLevel}</p>
            <p><span className="font-medium text-slate-700">Field:</span> {profile.fieldOfStudy}</p>
            <p><span className="font-medium text-slate-700">Score:</span> {profile.academicScore}%</p>
          </div>
        </div>

        {recommendations.length > 0 ? (
          <div className="mx-auto grid max-w-4xl gap-6">
            <p className="text-center text-sm text-slate-600">
              Found {recommendations.length} program{recommendations.length !== 1 ? 's' : ''} you may potentially qualify for — ranked by confidence
            </p>
            {recommendations.map((rec, index) => (
              <ScholarshipCard
                key={rec.scholarshipId || rec.scholarshipName}
                recommendation={rec}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-lg text-center">
            <div className="mb-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                No Potential Matches Found
              </h3>
              <p className="text-sm text-slate-600">
                Based on available information, we could not identify programs you may qualify
                for. This does not mean you are ineligible — many programs have criteria not
                captured in this questionnaire. We recommend exploring official government and
                institutional scholarship portals directly.
              </p>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/questionnaire" onClick={handleStartOver}>
            <Button variant="secondary">Start New Search</Button>
          </Link>
          <Link to="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
