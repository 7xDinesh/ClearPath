import { Link } from 'react-router-dom';
import Button from '../components/Button';

/**
 * Landing page with hero section, impact narrative, and CTA.
 */
export default function LandingPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24">
        <div className="container-app text-center">
          <div className="mx-auto max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
              USAII Global AI Hackathon · Student Education Benefits Navigator
            </span>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
              ClearPath
            </h1>

            <p className="mb-6 text-xl font-medium text-primary-700 sm:text-2xl">
              Your next step toward support you may qualify for.
            </p>

            <p className="mb-10 text-base leading-relaxed text-slate-600 sm:text-lg">
              Millions of students miss scholarships, grants, and fee waivers because eligibility
              rules are scattered and hard to understand. ClearPath uses AI reasoning to compare
              your profile against program rules — transparently, responsibly, and without
              guaranteeing outcomes.
            </p>

            <Link to="/questionnaire">
              <Button className="px-8 py-3.5 text-base">
                Check Eligibility
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="container-app">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { stat: '$3B+', label: 'In unclaimed aid annually (U.S. estimates)' },
              { stat: '1 in 4', label: 'Students who never apply for available aid' },
              { stat: '100+', label: 'Eligibility criteria across typical programs' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold text-primary-700">{item.stat}</p>
                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            The Problem We Solve
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">Scattered Information</h3>
              <p className="text-sm text-slate-600">
                Scholarship and grant eligibility rules are spread across dozens of websites,
                making discovery overwhelming.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">Complex Rules</h3>
              <p className="text-sm text-slate-600">
                Income limits, academic thresholds, and category requirements are hard to
                compare against your own profile.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">Missed Opportunities</h3>
              <p className="text-sm text-slate-600">
                Students leave money on the table simply because they never knew a program
                existed or thought they wouldn&apos;t qualify.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-app">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            How ClearPath Works
          </h2>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { step: '1', title: 'Answer Questions', desc: 'Complete a guided questionnaire about your background and academics.' },
              { step: '2', title: 'AI Analysis', desc: 'AI compares your profile against structured eligibility rules with explainable reasoning.' },
              { step: '3', title: 'Discover Options', desc: 'Review programs you may qualify for, see criterion-by-criterion evaluation, and verify officially.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-1 font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/questionnaire">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Built for Responsible AI
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Never guarantees qualification', desc: 'Uses "may qualify" and "based on available information" — never "eligible" or "approved".' },
              { title: 'Explainable reasoning', desc: 'Every result shows criterion-by-criterion evaluation, gaps, and missing information.' },
              { title: 'Official source verification', desc: 'Every recommendation links to official program sources for human verification.' },
              { title: 'Privacy-first', desc: 'Profile data stays in your browser session — nothing is stored on a server.' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-primary-100 bg-primary-50 p-4">
                <h3 className="font-semibold text-primary-900">{item.title}</h3>
                <p className="mt-1 text-sm text-primary-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
