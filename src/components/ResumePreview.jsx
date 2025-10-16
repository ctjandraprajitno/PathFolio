function ResumePreview({ userInfo }) {
  return (
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
        {userInfo.experiences?.length > 0 ? <ul>{userInfo.experiences.map((exp, i) => <li key={i}>{exp}</li>)}</ul> : <p>No experiences provided.</p>}
      </section>
      <section>
        <h3>Skills</h3>
        {userInfo.skills?.length > 0 ? <ul>{userInfo.skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul> : <p>No skills provided.</p>}
      </section>
      <section>
        <h3>Education</h3>
        {userInfo.educations?.length > 0 ? <ul>{userInfo.educations.map((edu, i) => <li key={i}>{edu}</li>)}</ul> : <p>No education provided.</p>}
      </section>
    </div>
  );
}

export default ResumePreview;
