import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './SideMenu.module.css';

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay that closes the menu when clicked */}
      <div
        className={clsx(styles.overlay, { [styles.overlayOpen]: isOpen })}
        onClick={onClose}
      />
      <nav className={clsx(styles.menuContainer, { [styles.menuOpen]: isOpen })}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
          &times;
        </button>
        <ul className={styles.menuLinks}>
          <li>
            <Link to="/" onClick={onClose}>Home</Link>
          </li>
          <li>
            <Link to="/career-pathway" onClick={onClose}>Career Pathway</Link>
          </li>
          <li>
            <Link to="/resume-analyzer" onClick={onClose}>Resume Analyzer</Link>
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