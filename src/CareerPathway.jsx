import Overview from './components/Overview';

function CareerPathway() {
  const placeholderImageUrl = 'https://picsum.photos/seed/career-pathway/600/400';

  return (
    <div className="careerPathwayContainer">
      <Overview
        title="Career Pathway"
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

export default CareerPathway;