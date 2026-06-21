# ClearPath

**Your next step toward the support you qualify for.**

ClearPath is an AI-powered scholarship eligibility navigator that helps students discover scholarships they may qualify for through transparent, explainable, and responsible AI analysis.

Built for the **USAII Global AI Hackathon 2026**, ClearPath addresses a common challenge faced by students: scholarship opportunities are often scattered across multiple sources, eligibility criteria can be difficult to understand, and many students miss opportunities they are qualified for.

Instead of forcing students to manually search through dozens of websites and eligibility documents, ClearPath provides a guided experience that analyzes a student's profile and highlights relevant scholarship opportunities along with clear reasoning and verification guidance.

---

## Problem

Millions of students miss scholarships, grants, and educational support programs because:

- Eligibility requirements are difficult to understand.
- Information is spread across multiple websites.
- Students do not know where to begin searching.
- Manually comparing eligibility criteria is time-consuming.
- Many opportunities remain undiscovered by eligible students.

As a result, students often miss financial assistance that could significantly reduce the cost of education.

---

## Solution

ClearPath acts as an intelligent scholarship discovery assistant.

Students complete a short eligibility questionnaire, and the platform:

1. Collects relevant profile information.
2. Analyzes eligibility criteria.
3. Uses AI-assisted reasoning to evaluate potential matches.
4. Generates personalized scholarship recommendations.
5. Explains why recommendations were made.
6. Provides verification guidance and next steps.

Most importantly, ClearPath never guarantees eligibility. Instead, it identifies opportunities that a student **may qualify for** and encourages verification through official scholarship sources.

---

## Features

### AI-Powered Scholarship Matching

ClearPath uses Google's Gemini API to analyze user profiles and generate personalized recommendation reasoning.

### Explainable Recommendations

Unlike traditional search tools, ClearPath explains:

- Why a scholarship was recommended
- Which eligibility factors matched
- What information should be verified

### Responsible AI Design

The platform includes safeguards that:

- Avoid making definitive eligibility claims
- Encourage verification through official sources
- Provide transparent reasoning
- Reduce overconfidence in AI-generated recommendations

### Real Scholarship Dataset

ClearPath includes real scholarship opportunities instead of placeholder programs, making recommendations more meaningful and realistic.

### Guided Questionnaire

A simple multi-step questionnaire collects:

- Academic information
- Income information
- Educational background
- Location information
- Additional eligibility factors

### Professional User Experience

- Responsive design
- AI analysis loading screen
- Progress indicators
- Mobile-friendly interface
- Accessible navigation

### Fallback Recommendation Engine

If AI services become unavailable, ClearPath automatically falls back to a rule-based recommendation system to ensure the platform remains functional.

---

## How It Works

```text
Student Questionnaire
          ↓
 Profile Generation
          ↓
 Eligibility Analysis
          ↓
 Gemini AI Reasoning
          ↓
 Scholarship Matching
          ↓
 Recommendation Results
          ↓
 Verification Guidance
```

---

## Technology Stack

### Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- HTML5
- CSS3

### AI

- Google Gemini API

### Deployment

- Vercel

### Development Tools

- Git
- GitHub

---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.jsx
│   ├── Disclaimer.jsx
│   ├── Footer.jsx
│   ├── FormStep.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   ├── ProgressIndicator.jsx
│   └── ScholarshipCard.jsx
├── pages/            # Route-level page components
│   ├── LandingPage.jsx
│   ├── QuestionnairePage.jsx
│   └── ResultsPage.jsx
├── data/             # Local scholarship database
│   └── scholarships.json
├── services/         # AI integration layer
│   └── aiService.js
├── hooks/            # Custom React hooks
│   ├── useQuestionnaire.js
│   └── useProfile.jsx
├── utils/            # Shared validation helpers
│   └── validation.js
├── assets/           # Static assets (images, icons)
├── App.jsx           # Root component with routing
├── main.jsx          # Application entry point
└── index.css         # Tailwind CSS imports
```
---

## Installation

Clone the repository:

```bash
git clone https://github.com/7xDinesh/ClearPath.git
```

Move into the project directory:

```bash
cd ClearPath
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```env
VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Environment Variables

Required:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Obtain an API key from:

https://aistudio.google.com

---

## Responsible AI Principles

ClearPath was designed around responsible AI practices.

### Transparency

Users receive explanations for recommendations.

### Human Verification

Recommendations are informational only and do not guarantee eligibility.

### Reliability

A fallback rule-based engine ensures continued operation when AI services are unavailable.

### User Trust

The platform prioritizes clarity and explainability over opaque AI decision-making.

---

## Challenges We Faced

### Balancing AI and Reliability

Scholarship eligibility rules can vary significantly. We needed a system that could leverage AI while remaining transparent and understandable.

### Handling API Limitations

AI services may experience quota limits or outages. To address this, we implemented a rule-based fallback recommendation engine.

### User Experience

We invested significant effort in:

- Loading states
- Progress indicators
- Recommendation clarity
- Mobile responsiveness
- Accessibility

---

## Accomplishments

- Built a complete end-to-end scholarship recommendation platform.
- Integrated AI-assisted recommendation reasoning.
- Implemented responsible AI safeguards.
- Created a responsive and polished user experience.
- Deployed a live production application.
- Added real scholarship opportunities.
- Developed fallback analysis capabilities.

---

## Future Improvements

### Scholarship Expansion

- Additional national scholarships
- State-specific opportunities
- Institution-specific programs

### Opportunity Expansion

- Grants
- Fellowships
- Internships
- Educational benefits

### AI Enhancements

- Improved eligibility modeling
- Better recommendation explanations
- Confidence calibration

### Accessibility

- Multilingual support
- Enhanced accessibility features
- Regional customization

### Student Assistance

- Application guidance
- Deadline tracking
- Document preparation support

---

## Live Demo

🌐 https://clearpath-scholarships.vercel.app

---

## Repository

📂 https://github.com/7xDinesh/ClearPath

---

## Hackathon

Built for:

**USAII Global AI Hackathon 2026**

Challenge Theme:

**Build the Second Brain for Real Life**

---

## Team ClearPath

Creating a more accessible path to educational opportunities through responsible AI.

**ClearPath**
*Your next step toward the support you qualify for.*
