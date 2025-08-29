import React, { useContext } from 'react';
import './StateFilter.css';
import { StoreContext } from '../../context/StoreContext';

const StateFilter = ({ stateFilter, setStateFilter }) => {
  const { professional_list } = useContext(StoreContext);

  // Extrai estados únicos da lista de profissionais, removendo valores vazios ou nulos
  const uniqueStates = [
    'Todos',
    ...new Set(
      professional_list
        .map((item) => item.address?.state)
        .filter(state => state) // Garante que o estado não seja nulo ou vazio
    )
  ];

  return (
    <div className="state-filter">
      <label htmlFor="state-select">Filtrar por Estado:</label>
      <select
        id="state-select"
        value={stateFilter}
        onChange={(e) => setStateFilter(e.target.value)}
      >
        {uniqueStates.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateFilter;