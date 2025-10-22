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

  const systemPrompt = `You are an assistant that produces a structured career plan. The user will provide their CURRENT job and a TARGET job plus resume sections. Your job is to return a single JSON object (no extra text) with two top-level keys: "overview" and "timeline".\n\n

  Overview schema (object):\n
  - minSalary: number (minimum typical annual salary for the target job, in USD if possible)\n
  - meanSalary: number (average annual salary)\n
  - maxSalary: number (maximum typical annual salary)\n
  - topSkills: array of 5 strings (the top 5 skills needed for the target job, ordered by importance)\n\n

  Timeline schema (array): an ordered array of steps from the current job toward the target job. Each step must be an object with these fields:\n
  - job: string (the job title for this step)\n
  - requiredSkills: array of strings (skills to acquire or strengthen to move from this step to the next)\n
  - notes: optional short string with guidance (optional)\n\n

  The timeline should start with the CURRENT job (use the exact current job title provided) and end with the TARGET job. Produce as many intermediate steps as needed. Do NOT include any explanation or non-JSON text. Format the entire response as a single valid JSON object only.`;

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
        temperature: 0.3,
        max_tokens: 2000,
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
