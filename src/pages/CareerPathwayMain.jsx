import React, { useState, useEffect } from 'react';
import { chatGPTAPICall } from '../lib/chatGPTAPICallCareerPathway';
import '../styles/CareerPathway.css';

function CareerPathwayMain() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState(null);

  async function loadCareerPlan() {
    setLoading(true);
    try {
      const result = await chatGPTAPICall();
      setData(result);
    } catch (e) {
      setData({ error: String(e) });
    } finally {
      setLoading(false);
    }
  }

  useEffect(function() {
    loadCareerPlan();

    function handleSavedEvent() {
      loadCareerPlan();
    }

    window.addEventListener('singleInputSaved', handleSavedEvent);

    return function() {
      window.removeEventListener('singleInputSaved', handleSavedEvent);
    };
  }, []);

  function handleCardClick(step) {
    setSelectedStep(step);
  }

  function closeModal() {
    setSelectedStep(null);
  }

  const overview = data ? data.overview : {};
  const timeline = data ? data.timeline : [];

  function renderTimelineStep(step, idx, totalTimeline) {
    const isLastStep = idx === totalTimeline.length - 1;

    return (
      <div className="timeline-step" key={idx} onClick={function(){ handleCardClick(step); }}>
        <div className="timeline-card">
          <div className="timeline-job">{step.job}</div>
          <div className="timeline-skills">{(step.requiredSkills || []).slice(0,3).join(', ')}</div>
        </div>
        {!isLastStep ? <div className="timeline-connector" aria-hidden>→</div> : null}
      </div>
    );
  }

  function renderSkill(skill, i) {
    return <li key={i}>{skill}</li>;
  }

  return (
    <div className="career-pathway-page">
      <h1>Career Pathway</h1>

      {loading ? (
        <div className="cp-loading">Loading career plan…</div>
      ) : !data || data.error ? (
        <div className="cp-error">{data && data.error ? 'Error: ' + data.error : 'No career plan available.'}</div>
      ) : (
        <div>
          <section className="cp-overview">
            <h2>Overview: {overview.targetJob || data.targetJob || ''}</h2>
            <div className="cp-overview-row">
              <div className="cp-target"></div>
              <div className="cp-salary">
                <span className="salary-min">{overview.minSalary}</span>
                <span className="salary-arrow">→</span>
                <span className="salary-mean">{overview.meanSalary}</span>
                <span className="salary-arrow">→</span>
                <span className="salary-max">{overview.maxSalary}</span>
              </div>
              <div className="cp-skills">
                <strong>Skills:</strong>
                <span className="cp-skills-list">{(overview.topSkills || []).join(', ')}</span>
              </div>
            </div>
          </section>

          {/* print timeline */}
          <section className="cp-timeline">
            <h2>Timeline</h2>
            <div className="timeline-row">
              {timeline.map(function(step, idx) {
                return renderTimelineStep(step, idx, timeline);
              })}
            </div>
          </section>

          {/* to show specific step/job in timeline*/}
          {selectedStep ? (
            <div className="cp-modal-overlay" onClick={closeModal}>
              {/* onclick under cp-modal is to prevent modal from closing */}
              <div className="cp-modal" onClick={function(e){ e.stopPropagation(); }}>
                <h3>{selectedStep.job}</h3>
                <p><strong>Required skills:</strong></p>
                <ul>
                  {(selectedStep.requiredSkills || []).map(renderSkill)}
                </ul>
                {selectedStep.notes ? <p className="cp-notes">{selectedStep.notes}</p> : null}
                <div className="cp-modal-actions">
                  <button onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default CareerPathwayMain;