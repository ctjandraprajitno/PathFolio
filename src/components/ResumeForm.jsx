import Button from './Button';
import '../styles/ResumeForm.css';

function ResumeForm({
  onFormSubmit,
  initialData
}) {

  // Data Entry View: The original form with pre-filled data.
  return (
    <form className="resume-form" onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="targetJob">Target Job:</label>
        <input type="text" id="targetJob" name="targetJob" defaultValue={initialData.targetJob || ''} />
      </div>
      <div>
        <label htmlFor="summary">Summary:</label>
        <textarea className="full-width" type="text" id="summary" name="summary" defaultValue={initialData.summary || ''} />
      </div>
      <div>
        <label htmlFor="experiences">Experience(s):</label>
        <p className="input-hint">Format: Role, Company, Description. Separate multiple entries with a semicolon (;).</p>
        <textarea className="full-width" type="text" id="experiences" name="experiences" defaultValue={initialData.experiences || ''} />
      </div>
      <div>
        <label htmlFor="skills">Skill(s):</label>
        <textarea type="text" id="skills" name="skills" defaultValue={initialData.skills || ''} />
      </div>
      <div>
        <label htmlFor="educations">Education(s):</label>
        <p className="input-hint">Format: Degree, School, Description. Separate multiple entries with a semicolon (;).</p>
        <textarea className="full-width" type="text" id="educations" name="educations" defaultValue={initialData.educations || ''} />
      </div>
      <Button typeInfo="submit">Save</Button>
    </form>
  )
}

export default ResumeForm