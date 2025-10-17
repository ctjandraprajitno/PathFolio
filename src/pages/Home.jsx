import Overview from '../components/Overview.jsx';
import ResumeAnalyzer from '../components/ResumeAnalyzer.jsx';
import CareerPathway from '../components/CareerPathway.jsx';
import HomePic from '../components/HomePic.jsx';
import '../styles/Home.css';

function Home() {
  const placeholderImageUrl = 'https://picsum.photos/seed/react-app/600/400';

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
        <ResumeAnalyzer />
        <CareerPathway />
      </div>
    </>
  );
}

export default Home;
