import ResumeForm from '../components/ResumeForm';

function ResumeConfirm({ onFormSubmit, initialData }) {
  return <ResumeForm onFormSubmit={onFormSubmit} initialData={initialData} />;
}

export default ResumeConfirm;