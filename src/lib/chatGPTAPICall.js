export async function chatGPTAPICall(userInfo) {
  // Send only the minimal payload to the serverless proxy. The server will
  // attach your OpenAI key from process.env and forward the request.
  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          "You are an assistant that analyzes a resume and provides suggestions for improvement. The user will provide their full resume content (summary, experiences, skills, education) and a target job. Your task is to analyze each section of the resume against the target job and return a single JSON object. The keys of this object should be the section names ('summary', 'experiences', 'skills', 'educations'), and the value for each key should be an array of suggestion objects. Each suggestion object must have three properties: 'title', 'suggestion', and 'justification'. For 'experiences' and 'educations', the content is a string with entries separated by semicolons ';', where each entry has three parts separated by commas ',': title/role, company/school, and description. Provide up to five relevant suggestions per section. Format your response strictly as a single JSON object without any additional text or explanation.",
      },
      {
        role: 'user',
        content: `Analyze the following resume for the target job "${userInfo.targetJob}":\n\nSummary: ${userInfo.summary}\n\nExperiences: ${userInfo.experiences}\n\nSkills: ${userInfo.skills}\n\nEducation: ${userInfo.educations}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 1000,
  };

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const raw = await res.text();

    if (!res.ok) {
      console.error('Serverless proxy error', { status: res.status, raw });
      return { error: true, status: res.status, message: raw || res.statusText };
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error('Invalid JSON from serverless proxy', { err, raw });
      return { error: true, message: 'Invalid JSON from analysis service', raw };
    }

    const assistantContent = data?.choices?.[0]?.message?.content;
    if (!assistantContent) {
      console.error('No assistant content', { data });
      return { error: true, message: 'No assistant content in response', data };
    }

    try {
      return JSON.parse(assistantContent);
    } catch (parseErr) {
      console.error('Assistant returned invalid JSON', { parseErr, assistantContent });
      return { error: true, message: 'Assistant returned invalid JSON', assistantContent };
    }
  } catch (error) {
    console.error('Error contacting analysis proxy:', error);
    return { error: true, message: error?.message ?? String(error) };
  }
}
