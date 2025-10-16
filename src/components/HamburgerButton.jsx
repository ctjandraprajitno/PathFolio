import PropTypes from 'prop-types';
import '../styles/HamburgerButton.css';
const HamburgerButton = ({ onClick }) => {
  return (
    <button className="hamburger" onClick={onClick} aria-label="Open menu">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
};
HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default HamburgerButton;