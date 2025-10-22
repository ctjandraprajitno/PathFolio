import ResumeForm from '../components/ResumeForm';

function ResumeConfirm({ onFormSubmit }) {
  const initialData = JSON.parse(localStorage.getItem('userInfo')) || {
    targetJob: '',
    summary: '',
    experiences: '',
    skills: '',
    educations: ''
  };
  return <ResumeForm onFormSubmit={onFormSubmit} initialData={initialData} />;
}

export default ResumeConfirm;