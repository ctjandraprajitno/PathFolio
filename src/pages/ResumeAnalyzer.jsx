import { useState, useEffect } from 'react';
import { chatGPTAPICall } from "../lib/chatGPTAPICall";

function ResumeAnalyzer({ userInfo }) {
  // Create a "box" (state) to hold the analysis results. It starts as an empty object.
  const [analysisResults, setAnalysisResults] = useState({});
  // Create another "box" to know when we are waiting for the AI to respond.
  const [isLoading, setIsLoading] = useState(true); // Start loading immediately

  // useEffect runs code after the component has rendered.
  // By passing [userInfo], this code will run once when the component first appears,
  // and again only if the userInfo prop changes.
  useEffect(function() {
    // This is an "async" function because it needs to "await" the API call.
    async function getAnalysis() {
      // Don't do anything if we don't have user info to analyze.
      if (!userInfo || !userInfo.targetJob) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      // "await" tells our function to pause here and wait for the AI to finish.
      // We make a single call with all the user info.
      const results = await chatGPTAPICall(userInfo);
      setAnalysisResults(results);
      setIsLoading(false);
    }

    getAnalysis(); // Call the function to start the analysis.
  }, [userInfo]); // The dependency array.

  return (
    <>
      <div className="resume-preview">
        <h2>Resume Preview</h2>
        <section>
          <h3>Target Job</h3>
          <p>{userInfo.targetJob || 'Not provided'}</p>
        </section>
        <section>
          <h3>Summary</h3>
          <p>{userInfo.summary || 'Not provided'}</p>
        </section>
        <section>
          <h3>Experiences</h3>
          <p>{userInfo.experiences || 'No experiences provided.'}</p>
        </section>
        <section>
          <h3>Skills</h3>
          <p>{userInfo.skills || 'No skills provided.'}</p>
        </section>
        <section>
          <h3>Education</h3>
          <p>{userInfo.educations || 'No education provided.'}</p>
        </section>

        <hr />

        <h2>AI Analysis & Suggestions</h2>
        {/* Show a loading message while the AI is working. */}
        {isLoading && <p>Analyzing your resume...</p>}

        {/*
          Object.keys(analysisResults) gives us an array of the keys (e.g., ['summary', 'experiences']).
          We check if the array has items to decide if we should show the results.
        */}
        {!isLoading && Object.keys(analysisResults).length > 0 && (
          <div className="analysis-results">
            {/*
              We loop through our analysisResults object.
              For each entry (like 'summary': [suggestions...]), we create a section.
            */}
            {Object.entries(analysisResults).map(function ([section, suggestions]) {
              // The API might not return a valid array, so we check for that.
              if (!Array.isArray(suggestions) || suggestions.length === 0) {
                return null; // Don't render anything if suggestions aren't in the expected format.
              }
              return (
                <section key={section}>
                  <h4>{section.charAt(0).toUpperCase() + section.slice(1)} Suggestions</h4>
                  {suggestions.map(function (suggestion, index) {
                    return (
                      <div key={index} className="suggestion-card">
                        <h5>{suggestion.title}</h5>
                        <p><strong>Suggestion:</strong> {suggestion.suggestion}</p>
                        <p><strong>Justification:</strong> {suggestion.justification}</p>
                      </div>
                    );
                  })}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ResumeAnalyzer;