# ClearPath

**Your next step toward the support you qualify for.**

ClearPath is an AI-powered Student Education Benefits Navigator that helps students discover scholarships, grants, fee waivers, and educational support programs they may qualify for.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deploy to Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — no extra configuration needed
4. Add environment variables in Vercel project settings (for live AI):
   - `VITE_AI_API_KEY` — Your Gemini or OpenAI API key
   - `VITE_AI_PROVIDER` — `gemini` or `openai`
   - `VITE_GEMINI_MODEL` — optional, defaults to `gemini-2.0-flash`

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

## AI Integration

The mock AI service in `src/services/aiService.js` provides rule-based matching when no API key is configured. To enable Gemini or OpenAI:

1. Create a `.env` file:
   ```
   VITE_AI_API_KEY=your_api_key_here
   VITE_AI_PROVIDER=gemini
   ```

2. Implement the API call in `callGeminiAPI()` or `callOpenAIAPI()` in `aiService.js` (already implemented)

3. The `getRecommendations()` function automatically uses the API when both `VITE_AI_API_KEY` and `VITE_AI_PROVIDER` are set; otherwise it uses the rule-based demo engine

## Responsible AI

ClearPath never claims users definitely qualify. All results use language like "may qualify" and "based on available information." Users are always directed to verify through official sources.
