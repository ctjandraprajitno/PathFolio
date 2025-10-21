import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../styles/FeatureCard.css';
import '../styles/Button.css';


function FeatureCard({ title, description, destination, children }) {
  return (
    <section className="feature-card">
      <h2 className="feature-card-title">{title}</h2>
      <p className="feature-card-description">{description}</p>
      <Link className="btn" to={destination}>{children}</Link>
    </section>
  );
}

// Ensure props have the correct datatype and are required.
FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;