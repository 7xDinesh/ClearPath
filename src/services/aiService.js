import scholarships from '../data/scholarships.json';

/**
 * AI Service — ClearPath Scholarship Matching
 *
 * Modes:
 * - gemini / openai: live LLM reasoning when VITE_AI_API_KEY is set
 * - rule-based: transparent criterion matching (default demo mode)
 */

const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'mock';
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';

const VALID_CONFIDENCE = ['high', 'medium', 'low'];
const VALID_RULE_STATUS = ['match', 'gap', 'unknown'];

const PROVIDER_LABELS = {
  gemini: 'Google Gemini',
  openai: 'OpenAI',
  mock: 'Rule-Based Analysis Engine',
};

/**
 * Builds a structured prompt for the AI model.
 */
function buildPrompt(userProfile, scholarshipRules) {
  return `
You are a responsible education benefits navigator assistant for ClearPath.

IMPORTANT RULES:
- NEVER claim a user definitely qualifies for any program
- Always use language like "may qualify", "potentially eligible", "based on available information"
- NEVER use words: eligible, approved, guaranteed
- Always recommend verifying through official sources

User Profile:
${JSON.stringify(userProfile, null, 2)}

Available Scholarship Programs:
${JSON.stringify(scholarshipRules, null, 2)}

Analyze the user profile against each scholarship's eligibility rules.
Return ONLY valid JSON with this shape:
{
  "recommendations": [
    {
      "scholarshipName": "name",
      "confidence": "high",
      "reasoning": "explanation using responsible language",
      "matchedRules": ["rule1", "rule2"],
      "missingInformation": ["info needed to confirm"],
      "ruleChecks": [
        { "criterion": "Family Income", "status": "match", "detail": "explanation" }
      ],
      "considerations": ["criteria that may not align"],
      "nextStep": "what the user should do next"
    }
  ]
}

For ruleChecks, status must be one of: "match", "gap", "unknown".
confidence must be one of: "high", "medium", "low".
Only include scholarships where there is at least some potential match.
If no scholarships match, return { "recommendations": [] }.
`.trim();
}

/**
 * Parse JSON from LLM response text, tolerating markdown fences.
 */
function parseAIResponse(text) {
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  const parsed = JSON.parse(cleaned);
  return Array.isArray(parsed) ? parsed : parsed.recommendations || [];
}

/**
 * Normalize and validate AI recommendation objects.
 */
function sanitizeRecommendations(results) {
  if (!Array.isArray(results)) return [];

  return results
    .filter((rec) => rec && typeof rec.scholarshipName === 'string' && rec.scholarshipName.trim())
    .map((rec) => ({
      scholarshipName: rec.scholarshipName.trim(),
      confidence: VALID_CONFIDENCE.includes(rec.confidence) ? rec.confidence : 'low',
      reasoning: typeof rec.reasoning === 'string' ? rec.reasoning : 'Based on available information, further review is recommended.',
      matchedRules: Array.isArray(rec.matchedRules) ? rec.matchedRules.filter(Boolean) : [],
      missingInformation: Array.isArray(rec.missingInformation) ? rec.missingInformation.filter(Boolean) : [],
      ruleChecks: Array.isArray(rec.ruleChecks)
        ? rec.ruleChecks
            .filter((check) => check && check.criterion && check.detail)
            .map((check) => ({
              criterion: String(check.criterion),
              status: VALID_RULE_STATUS.includes(check.status) ? check.status : 'unknown',
              detail: String(check.detail),
            }))
        : [],
      considerations: Array.isArray(rec.considerations) ? rec.considerations.filter(Boolean) : [],
      nextStep: typeof rec.nextStep === 'string' ? rec.nextStep : 'Review official program requirements.',
    }));
}

/**
 * Google Gemini API integration.
 */
async function callGeminiAPI(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();

  if (data.promptFeedback?.blockReason) {
    throw new Error(`Gemini blocked the request: ${data.promptFeedback.blockReason}`);
  }

  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    const reason = candidate?.finishReason || 'NO_CONTENT';
    throw new Error(`Gemini returned no content (finishReason: ${reason})`);
  }

  return sanitizeRecommendations(parseAIResponse(text));
}

/**
 * OpenAI API integration.
 */
async function callOpenAIAPI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a responsible education benefits navigator. Return only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenAI returned an empty response');
  return sanitizeRecommendations(parseAIResponse(text));
}

function formatAmount(amount) {
  return Number(amount).toLocaleString('en-US');
}

/**
 * Evaluate a single criterion and return a ruleCheck entry.
 */
function checkCriterion(criterion, status, detail) {
  return { criterion, status, detail };
}

/**
 * Rule-based analysis engine with transparent criterion-by-criterion evaluation.
 */
function getMockRecommendations(userProfile, scholarshipRules) {
  const recommendations = [];

  for (const scholarship of scholarshipRules) {
    const matchedRules = [];
    const missingInformation = [];
    const considerations = [];
    const ruleChecks = [];
    let matchScore = 0;
    let maxScore = 0;

    // Income check
    maxScore += 2;
    const income = Number(userProfile.familyIncome);
    if (!isNaN(income) && income > 0) {
      if (income <= scholarship.incomeLimit) {
        const detail = `Reported income (${formatAmount(income)}) may fall within the program threshold (up to ${formatAmount(scholarship.incomeLimit)})`;
        matchedRules.push(`Based on available information, your reported family income may fall within the program's income threshold`);
        ruleChecks.push(checkCriterion('Family Income', 'match', detail));
        matchScore += 2;
      } else {
        ruleChecks.push(checkCriterion(
          'Family Income',
          'gap',
          `Reported income (${formatAmount(income)}) may exceed the program limit of ${formatAmount(scholarship.incomeLimit)}`
        ));
        considerations.push('Income may exceed this program\'s stated threshold — verify exceptions on the official site');
      }
    } else {
      ruleChecks.push(checkCriterion('Family Income', 'unknown', 'Income not provided or invalid'));
      missingInformation.push('Verified family income documentation');
    }

    // Academic score check
    maxScore += 2;
    const score = Number(userProfile.academicScore);
    if (!isNaN(score) && score > 0) {
      if (score >= scholarship.minimumScore) {
        const detail = `Score of ${score}% may meet the minimum requirement of ${scholarship.minimumScore}%`;
        matchedRules.push(detail);
        ruleChecks.push(checkCriterion('Academic Score', 'match', detail));
        matchScore += 2;
      } else {
        ruleChecks.push(checkCriterion(
          'Academic Score',
          'gap',
          `Score of ${score}% may be below the minimum requirement of ${scholarship.minimumScore}%`
        ));
        considerations.push('Academic score may be below the stated minimum — some programs allow appeals');
      }
    } else {
      ruleChecks.push(checkCriterion('Academic Score', 'unknown', 'Academic score not provided'));
      missingInformation.push('Official academic transcripts');
    }

    // Degree level
    maxScore += 1;
    if (userProfile.degreeLevel) {
      if (scholarship.degreeLevels?.includes(userProfile.degreeLevel)) {
        const detail = `Degree level (${userProfile.degreeLevel}) may align with accepted levels`;
        matchedRules.push(detail);
        ruleChecks.push(checkCriterion('Degree Level', 'match', detail));
        matchScore += 1;
      } else {
        ruleChecks.push(checkCriterion(
          'Degree Level',
          'gap',
          `${userProfile.degreeLevel} may not be listed among accepted levels for this program`
        ));
        considerations.push('Your degree level may not be covered — confirm with the program administrator');
      }
    } else {
      ruleChecks.push(checkCriterion('Degree Level', 'unknown', 'Degree level not provided'));
      missingInformation.push('Degree level confirmation');
    }

    // Field of study
    maxScore += 1;
    if (userProfile.fieldOfStudy) {
      if (
        scholarship.fieldsOfStudy?.includes('any') ||
        scholarship.fieldsOfStudy?.includes(userProfile.fieldOfStudy)
      ) {
        matchedRules.push('Your field of study may be covered by this program');
        ruleChecks.push(checkCriterion('Field of Study', 'match', `${userProfile.fieldOfStudy} may be an accepted field`));
        matchScore += 1;
      } else {
        ruleChecks.push(checkCriterion(
          'Field of Study',
          'gap',
          `${userProfile.fieldOfStudy} may not be among targeted fields`
        ));
      }
    }

    // First generation
    if (scholarship.firstGenerationPreferred) {
      maxScore += 1;
      if (userProfile.firstGeneration === 'yes') {
        matchedRules.push('As a first-generation student, you may potentially qualify for additional consideration');
        ruleChecks.push(checkCriterion('First-Generation Status', 'match', 'First-generation student — may receive preference'));
        matchScore += 1;
      } else if (userProfile.firstGeneration === 'no') {
        ruleChecks.push(checkCriterion('First-Generation Status', 'gap', 'Program prefers first-generation students'));
      } else {
        ruleChecks.push(checkCriterion('First-Generation Status', 'unknown', 'First-generation status not confirmed'));
        missingInformation.push('First-generation student status confirmation');
      }
    }

    // Disability support
    if (scholarship.disabilitySupport) {
      maxScore += 1;
      if (userProfile.disabilityStatus === 'yes') {
        matchedRules.push('This program offers support for students with disabilities — you may qualify based on available information');
        ruleChecks.push(checkCriterion('Disability Support', 'match', 'Program provides disability-specific support'));
        matchScore += 1;
      } else if (userProfile.disabilityStatus === 'no') {
        ruleChecks.push(checkCriterion('Disability Support', 'gap', 'Program is designed for students with disabilities'));
      } else {
        ruleChecks.push(checkCriterion('Disability Support', 'unknown', 'Disability status not confirmed'));
        missingInformation.push('Disability status documentation if applicable');
      }
    }

    // Category
    maxScore += 1;
    if (userProfile.category) {
      if (scholarship.categories?.includes(userProfile.category)) {
        matchedRules.push(`Your category (${userProfile.category}) may be included in this program's target groups`);
        ruleChecks.push(checkCriterion('Category / Social Group', 'match', `${userProfile.category} may be a targeted group`));
        matchScore += 1;
      } else {
        ruleChecks.push(checkCriterion('Category / Social Group', 'gap', `${userProfile.category} may not be a listed target group`));
      }
    }

    // Gender
    if (scholarship.genders) {
      maxScore += 1;
      if (scholarship.genders.includes(userProfile.gender)) {
        matchedRules.push('Based on available information, you may meet this program\'s demographic criteria');
        ruleChecks.push(checkCriterion('Demographic Criteria', 'match', 'Profile may align with program demographic requirements'));
        matchScore += 1;
      } else if (userProfile.gender === 'prefer-not-to-say') {
        ruleChecks.push(checkCriterion('Demographic Criteria', 'unknown', 'Gender not specified — cannot assess demographic fit'));
        missingInformation.push('Demographic criteria confirmation if applicable');
      } else {
        ruleChecks.push(checkCriterion('Demographic Criteria', 'gap', 'Profile may not align with program demographic requirements'));
        considerations.push('This program has specific demographic criteria — review official requirements');
      }
    }

    const hasMatch = matchedRules.length > 0 && matchScore >= 2;
    if (hasMatch) {
      const ratio = matchScore / maxScore;
      let confidence = 'low';
      if (ratio >= 0.7) confidence = 'high';
      else if (ratio >= 0.45) confidence = 'medium';

      const matchCount = ruleChecks.filter((r) => r.status === 'match').length;
      const gapCount = ruleChecks.filter((r) => r.status === 'gap').length;

      const reasoning =
        `Based on the information you provided, you may qualify for ${scholarship.name}. ` +
        `Our analysis evaluated ${ruleChecks.length} criteria: ${matchCount} may align, ` +
        `${gapCount} may not align, and ${ruleChecks.filter((r) => r.status === 'unknown').length} need verification. ` +
        `This is not a guarantee — please verify all requirements through official sources before applying.`;

      recommendations.push({
        scholarshipId: scholarship.id,
        scholarshipName: scholarship.name,
        confidence,
        reasoning,
        matchedRules,
        missingInformation,
        ruleChecks,
        considerations,
        nextStep: scholarship.nextStep,
        officialSource: scholarship.website,
        description: scholarship.description,
      });
    }
  }

  const confidenceOrder = { high: 0, medium: 1, low: 2 };
  recommendations.sort(
    (a, b) => confidenceOrder[a.confidence] - confidenceOrder[b.confidence]
  );

  return recommendations;
}

function enrichRecommendations(results, scholarshipRules) {
  return results.map((rec) => {
    const scholarship = scholarshipRules.find((s) => s.name === rec.scholarshipName);
    return {
      ruleChecks: [],
      considerations: [],
      ...rec,
      scholarshipId: scholarship?.id ?? rec.scholarshipId,
      officialSource: scholarship?.website || rec.officialSource || '',
      description: scholarship?.description || rec.description || '',
      nextStep: rec.nextStep || scholarship?.nextStep || 'Review official program requirements.',
      confidence: VALID_CONFIDENCE.includes(rec.confidence) ? rec.confidence : 'low',
    };
  });
}

function buildAnalysisMeta(mode, programsScreened) {
  return {
    mode,
    programsScreened,
    analyzedAt: new Date().toISOString(),
    providerLabel: PROVIDER_LABELS[mode] || PROVIDER_LABELS.mock,
  };
}

/**
 * Main entry point — returns recommendations and analysis metadata.
 */
export async function getRecommendations(userProfile, scholarshipRules = scholarships) {
  const programsScreened = scholarshipRules.length;

  if (AI_API_KEY && AI_PROVIDER !== 'mock') {
    const prompt = buildPrompt(userProfile, scholarshipRules);

    try {
      let results;
      if (AI_PROVIDER === 'gemini') {
        results = await callGeminiAPI(prompt);
      } else if (AI_PROVIDER === 'openai') {
        results = await callOpenAIAPI(prompt);
      } else {
        throw new Error(`Unknown provider: ${AI_PROVIDER}`);
      }

      return {
        recommendations: enrichRecommendations(results, scholarshipRules),
        analysisMeta: buildAnalysisMeta(AI_PROVIDER, programsScreened),
      };
    } catch (error) {
      console.warn('AI API unavailable, falling back to rule-based analysis:', error.message);
      return {
        recommendations: getMockRecommendations(userProfile, scholarshipRules),
        analysisMeta: {
          ...buildAnalysisMeta('mock', programsScreened),
          fallbackReason: error.message,
        },
      };
    }
  }

  // Simulate brief analysis time so UX feels intentional
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    recommendations: getMockRecommendations(userProfile, scholarshipRules),
    analysisMeta: buildAnalysisMeta('mock', programsScreened),
  };
}

export { buildPrompt, getMockRecommendations };
