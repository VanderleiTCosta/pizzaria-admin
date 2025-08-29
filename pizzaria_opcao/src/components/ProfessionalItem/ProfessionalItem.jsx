import React from 'react';
import './ProfessionalItem.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom'; // Importe o Link

const ProfessionalItem = ({ id, name, description, category, image, url }) => {
  return (
    <Link to={`/professional/${id}`} className="professional-item">
      <div className="professional-item-img-container">
        <img
          className="professional-item-image"
          src={`${url}/images/${image}`}
          alt={name}
        />
      </div>
      <div className="professional-item-info">
        <div className="professional-item-name-category">
          <p>{name}</p>
        </div>
        <p className="professional-item-desc">{description.substring(0, 100)}...</p>
        <p className="professional-item-category">Categoria: {category}</p>
      </div>
    </Link>
  );
};

export default ProfessionalItem;