import Overview from '../components/Overview.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import HomePic from '../components/HomePic.jsx';
import '../styles/Home.css';
import '../styles/Button.css';

function Home() {
  return (
    <>
      <div className="home-container">
        <Overview
          title="Carve your career path with PathFolio"
          description="Build and visualize your career journey effortlessly."
          imageSlot={
            <HomePic />
          }
        />
      </div>
      <div className="feature-container">
        <FeatureCard
          title="Resume Analyzer"
          description="Your personal career journey assistant. Navigate through different sections using the side menu."
          destination="/ResumeConfirm"
          children="Analyze my resume!"
        />
        <FeatureCard
          title="Career Pathway"
          description="Your personal career journey assistant. Navigate through different sections using the side menu."
          destination="/CareerPathwayMain"
          children="Find my pathway!"
        />
      </div>
    </>
  );
}

export default Home;
