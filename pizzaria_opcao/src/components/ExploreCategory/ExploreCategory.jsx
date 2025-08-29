import React, { useContext } from 'react';
import './ExploreCategory.css';
import { StoreContext } from '../../context/StoreContext';

const ExploreCategory = ({ category, setCategory }) => {
  const { professional_list } = useContext(StoreContext);

  // Extrai categorias únicas da lista de profissionais
  const uniqueCategories = [
    'All',
    ...new Set(professional_list.map((item) => item.category))
  ];

  return (
    <div className="category-filter"> {/* Mudamos a classe principal */}
      <label htmlFor="category-select">Filtrar por Categoria:</label>
      <select
        id="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {uniqueCategories.map((item, index) => (
          <option key={index} value={item}>
            {item === 'All' ? 'Todas' : item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExploreCategory;