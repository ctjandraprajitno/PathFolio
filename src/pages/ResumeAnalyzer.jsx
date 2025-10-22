import { useState, useEffect } from 'react';
import { chatGPTAPICall } from "../lib/chatGPTAPICallResume";
import '../styles/ResumeAnalyzer.css';

function ResumeAnalyzer({ userInfo: propUserInfo }) {

  // safe read from localStorage
  function readUserInfoFromStorage() {
    try {
      const raw = localStorage.getItem('userInfo');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Invalid userInfo in localStorage:', e);
      return null;
    }
  }

  // Prefer the prop (when App passes data). Otherwise fall back to localStorage or defaults.
  function resolveUserInfo() {
    if (propUserInfo && Object.keys(propUserInfo).some(function(key) { return propUserInfo[key]; })) {
      return propUserInfo;
    }
    return readUserInfoFromStorage() || {
      targetJob: '',
      summary: '',
      experiences: '',
      skills: '',
      educations: ''
    };
  }

  const userInfo = resolveUserInfo();

  // Create a state to hold the analysis results. It starts as an empty object.
  const [analysisResults, setAnalysisResults] = useState({});

  // Start as not loading; we'll set to true when an API call is made.
  const [isLoading, setIsLoading] = useState(false);

  // useEffect runs code after the component has rendered.
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
  }, [propUserInfo]); // run on mount and whenever the prop changes

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

        <hr /><br />

        <h2>AI Analysis & Suggestions</h2>
        {/* Show a loading message while the AI is working. */}
        {isLoading && <p>Analyzing your resume...</p>}

        {/* Check if the array has items to decide if we should show the results */}
        {!isLoading && Object.keys(analysisResults).length > 0 && (
          <div className="analysis-results">

            {Object.entries(analysisResults).map(function (entry) {
              // entry is a two-item array: [sectionName, suggestionsArray]
              var section = entry[0];
              var suggestions = entry[1];

              return (
                <section key={section}>
                  {/* capitalized first letter */}
                  <h3>{section.charAt(0).toUpperCase() + section.slice(1)} Suggestions</h3>
                  {suggestions.map(function (suggestion, index) {
                    return (
                      <SuggestionCard key={index} suggestion={suggestion} />
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

// Simple presentational card for suggestions. Keep it local to this file.
function SuggestionCard({ suggestion }) {
  // Store info and check if present assume the AI returns these fields.
  var title = (suggestion && suggestion.title) ? suggestion.title : 'Miscellaneous';
  var suggestionText = (suggestion && suggestion.suggestion) ? suggestion.suggestion : '';
  var justification = (suggestion && suggestion.justification) ? suggestion.justification : '';

  return (
    <div className="suggestion-card">
      <h4 className="suggestion-title">{title}</h4>
      <p className="suggestion-text"><strong>Suggestion:</strong> {suggestionText}</p>
      <p className="suggestion-justification"><strong>Justification:</strong> {justification}</p>
    </div>
  );
}

export default ResumeAnalyzer;