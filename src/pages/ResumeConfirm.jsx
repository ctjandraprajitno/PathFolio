import ResumeForm from '../components/ResumeForm';

function ResumeConfirm({ onFormSubmit, userInfo }) {
  return <ResumeForm onFormSubmit={onFormSubmit} initialData={userInfo} />;
}

export default ResumeConfirm;