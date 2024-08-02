import './features.css'
import { PropTypes } from "prop-types";



const Features = ({ image, alt, title, description }) => {
    return (
      <div className="feature-item">
        <img src= {image} alt={alt} className="feature-icon" />
        <h3 className="feature-item-title">{title}</h3>
        <p className='feature-item-description'>{description}</p>
      </div>
    );
  };

Features.prototype = {
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    alt:PropTypes.string.isRequired,
};

export default Features