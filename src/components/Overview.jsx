import PropTypes from 'prop-types';
import '../styles/Overview.css';


// A modular two-column overview component with a text section and an image slot.
const Overview = ({ title, description, imageSlot }) => {
  return (
    <section className="container">
      <div className="textColumn">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
      </div>
      <div className="imageColumn">{imageSlot}</div>
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