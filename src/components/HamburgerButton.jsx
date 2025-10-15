import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/HamburgerButton.module.css';
const HamburgerButton = ({ onClick }) => {
  return (
    <button className={styles.hamburger} onClick={onClick} aria-label="Open menu">
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </button>
  );
};
HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default HamburgerButton;