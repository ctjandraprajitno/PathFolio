import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './sideMenu.css';

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay that closes the menu when clicked */}
      <div
        className={clsx('overlay', { 'overlayOpen': isOpen })}
        onClick={onClose}
      />
      {/* Menu container */}
      <nav className={clsx('menuContainer', { 'menuOpen': isOpen })}>
        <button className="closeButton" onClick={onClose} aria-label="Close menu">
          &times;
        </button>
        <ul className="menuLinks">
          <li>
            <Link to="/" onClick={onClose}>Home</Link>
          </li>
          <li>
            <Link to="/careerPathway" onClick={onClose}>Career Pathway</Link>
          </li>
          <li>
            <Link to="/resumeAnalyzer" onClick={onClose}>Resume Analyzer</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

SideMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;