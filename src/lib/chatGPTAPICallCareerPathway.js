export async function chatGPTAPICall() {
  var userInfo = {};
  var currentJobTitle = '';

  try {
    const rawUser = localStorage.getItem('userInfo');
    if (rawUser) {
      try { userInfo = JSON.parse(rawUser); } catch (e) { userInfo = {}; }
    }
  } catch (e) {
    console.error('Unable to read userInfo from localStorage:', e);
    return { error: 'Unable to read userInfo from localStorage.' };
  }

  try {
    const rawCur = localStorage.getItem('currentJob');
    if (rawCur) {
      const parsed = JSON.parse(rawCur);
      currentJobTitle = parsed?.title || '';
    }
  } catch (e) {
    console.error('Unable to read currentJob from localStorage:', e);
    return { error: 'Unable to read currentJob from localStorage.' };
  }

  const targetJob = (userInfo && userInfo.targetJob) || '';
  const summary = (userInfo && userInfo.summary) || '';
  const experiences = (userInfo && userInfo.experiences) || '';
  const skills = (userInfo && userInfo.skills) || '';
  const educations = (userInfo && userInfo.educations) || '';

  if (!targetJob) {
    return { error: 'Missing target job in userInfo (localStorage userInfo.targetJob).' };
  }
  if (!currentJobTitle) {
    return { error: 'Missing current job in localStorage (currentJob).' };
  }

  const systemPrompt = `
You are an AI assistant that generates a structured and realistic career pathway plan.

The user will provide:
- CURRENT job title
- TARGET job title
- Optional resume sections (skills, education, experience, etc.)

Your task:
Return a **single valid JSON object only** (no explanations, no markdown, no extra text).

The JSON must have exactly two top-level keys:
{
  "overview": { ... },
  "timeline": [ ... ]
}

### Overview Schema (object)
{
  "targetJob": string, // The target job title with capitalization as appropriate
  "minSalary": String, // Minimum typical annual salary (use USD currency format, e.g., "$50,000")
  "meanSalary": String, // Average annual salary (use USD currency format, e.g., "$50,000")
  "maxSalary": String, // Maximum typical annual salary (use USD currency format, e.g., "$50,000")
  "topSkills": [string, string, string, string, string] // Top 5 skills needed for the target job, ordered by importance
}

### Timeline Schema (array)
An ordered array of career progression steps starting from the CURRENT job and ending at the TARGET job.

Each element must be an object:
{
  "job": string, // Job title for this step (start with CURRENT job, end with TARGET job)
  "requiredSkills": [string, ...] or ["-"], // Skills to acquire or strengthen to move to the next job; use ["-"] if none are needed
  "notes": string // At least 3 full sentences of guidance on how to succeed in this role, focusing on skills and preparation for the next step
}

Guidelines:
- Always start the timeline with the CURRENT job (exact title given by the user).
- Always end the timeline with the TARGET job.
- Include as many intermediate jobs as needed to create a logical progression.
- Ensure realistic salaries and skills based on current job market data.
- Output must be strictly valid JSON — no comments, markdown, or additional text.
`;

  const userPrompt = `Current job: ${currentJobTitle}\nTarget job: ${targetJob}\n\nResume sections:\nSummary: ${summary}\n\nExperiences: ${experiences}\n\nSkills: ${skills}\n\nEducations: ${educations}\n\nProduce the JSON object as described.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.9,
        max_tokens: 3000,
      }),
    });

    const data = await response.json();
    return (
      JSON.parse(data?.choices?.[0]?.message?.content) ?? {error: "No response received."}
    );
  } catch (error) {
    console.error('Error during ChatGPT API call:', error);
    return { error: 'An error occurred while processing your request.' };
  }
}
