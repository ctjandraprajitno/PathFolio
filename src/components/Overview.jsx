import PropTypes from 'prop-types';
import styles from '../styles/Overview.module.css';


// A modular two-column overview component with a text section and an image slot.
const Overview = ({ title, description, imageSlot }) => {
  return (
    <section className={styles.container}>
      <div className={styles.textColumn}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.imageColumn}>{imageSlot}</div>
    </section>
  );
};

// Ensure props have the correct datatype and are required.
Overview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSlot: PropTypes.node.isRequired, //can be anything renderable
};

export default Overview;