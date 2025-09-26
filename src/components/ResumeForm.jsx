function ResumeForm({onFormSubmit }) {

  return (
    <form onSubmit={onFormSubmit}>
      Target Job : <input type="text" name="targetJob" />
      Summary : <input type="text" name="summary" />
      Experience(s) : <input type="text" name="experiences" />
      Skill(s) : <input type="text" name="skills" />
      Education(s) : <input type="text" name="educations" />
      <button type="submit">Save</button>
    </form>
  )
}

export default ResumeForm