import FeatureCard from './FeatureCard';

function CareerPathway() {
  return (
    <FeatureCard
      title="Career Pathway"
      description="Your personal career journey assistant. Navigate through different sections using the side menu."
      destination="/CareerPathwayMain"
      children="Find my pathway!"
    />
  );
}

export default CareerPathway;