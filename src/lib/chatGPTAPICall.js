export async function chatGPTAPICall(userInfo) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an assistant that analyzes a resume and provides suggestions for improvement. The user will provide their full resume content (summary, experiences, skills, education) and a target job. Your task is to analyze each section of the resume against the target job and return a single JSON object. The keys of this object should be the section names ('summary', 'experiences', 'skills', 'educations'), and the value for each key should be an array of suggestion objects. Each suggestion object must have three properties: 'title', 'suggestion', and 'justification'. For 'experiences' and 'educations', the content is a string with entries separated by semicolons ';', where each entry has three parts separated by commas ',': title/role, company/school, and description. Provide up to five relevant suggestions per section. Format your response strictly as a single JSON object without any additional text or explanation."
          },
          {
            role: "user",
            content: `Analyze the following resume for the target job "${userInfo.targetJob}":\n\nSummary: ${userInfo.summary}\n\nExperiences: ${userInfo.experiences}\n\nSkills: ${userInfo.skills}\n\nEducation: ${userInfo.educations}`
          },
        ],
        temperature: 0.5,
        max_tokens: 3000
      }),
    });
    const data = await response.json();
    return (
      JSON.parse(data?.choices?.[0]?.message?.content) ?? "No response received."
    );
  } catch (error) {
    console.error("Error during ChatGPT API call:", error);
    return "An error occurred while processing your request.";
  }
}
