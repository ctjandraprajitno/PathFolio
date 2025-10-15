import Overview from './Overview';
import ResumeForm from './ResumeForm';

function ResumeAnalyzer({ onFormSubmit }) {
  const placeholderImageUrl = 'https://picsum.photos/seed/career-pathway/600/400';

  return (
    <div className="resumeAnalyzerContainer">
      <Overview
        title="Resume Analyzer"
        description="Your personal career journey assistant. Navigate through different sections using the side menu."
        imageSlot={
          <img
            src={placeholderImageUrl}
            alt="A random placeholder image representing a project"
            className="overview-image"
          />
        }
      />
      <ResumeForm onFormSubmit={onFormSubmit} />
    </div>
  );
}

export default ResumeAnalyzer;