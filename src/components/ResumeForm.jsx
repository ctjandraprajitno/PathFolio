import Button from './Button';

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
        <textarea type="text" id="summary" name="summary" defaultValue={initialData.summary || ''} />
      </div>
      <div>
        <label htmlFor="experiences">Experience(s):</label>
        <textarea type="text" id="experiences" name="experiences" defaultValue={initialData.experiences || ''} />
      </div>
      <div>
        <label htmlFor="skills">Skill(s):</label>
        <textarea type="text" id="skills" name="skills" defaultValue={initialData.skills || ''} />
      </div>
      <div>
        <label htmlFor="educations">Education(s):</label>
        <textarea type="text" id="educations" name="educations" defaultValue={initialData.educations || ''} />
      </div>
      <Button typeInfo="submit">Save</Button>
    </form>
  )
}

export default ResumeForm