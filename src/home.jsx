import React from 'react';
import Overview from './components/Overview';
import './Home.css';

function Home() {
  const placeholderImageUrl = 'https://picsum.photos/seed/react-app/600/400';

  return (
    <div className="home-container">
      <Overview
        title="Welcome to PathFolio"
        description="Your personal career journey assistant. Navigate through different sections using the side menu."
        imageSlot={
          <img
            src={placeholderImageUrl}
            alt="A random placeholder image representing a project"
            className="overview-image"
          />
        }
      />
    </div>
  );
}

export default Home;
