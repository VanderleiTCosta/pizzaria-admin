import React, { useContext } from 'react';
import './ProfessionalDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import ProfessionalItem from '../ProfessionalItem/ProfessionalItem';

const ProfessionalDisplay = ({ category, stateFilter }) => { // Recebe o stateFilter
  const { professional_list, url } = useContext(StoreContext);

  return (
    <div className="professional-display" id="professional-display">
      <h2>Profissionais disponíveis</h2>
      <div className="professional-display-list">
        {professional_list.map((item, index) => {
          const categoryMatch = category === 'All' || category === item.category;
          const stateMatch = stateFilter === 'Todos' || stateFilter === item.address?.state;

          // O profissional só será exibido se corresponder a AMBOS os filtros
          if (categoryMatch && stateMatch) {
            return (
              <ProfessionalItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                category={item.category}
                image={item.image}
                url={url}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProfessionalDisplay;