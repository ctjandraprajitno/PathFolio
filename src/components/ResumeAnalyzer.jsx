import FeatureCard from './FeatureCard';
import '../styles/Button.css';

function ResumeAnalyzer() {
  const placeholderImageUrl = 'https://picsum.photos/seed/career-pathway/600/400';

  return (
      <FeatureCard
        title="Resume Analyzer"
        description="Your personal career journey assistant. Navigate through different sections using the side menu."
        destination="/ResumeConfirm"
        children="Analyze my resume!"
      />
  );
}

export default ResumeAnalyzer;