import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreCategory from '../../components/ExploreCategory/ExploreCategory';
import ProfessionalDisplay from '../../components/ProfessionalDisplay/ProfessionalDisplay';
import StateFilter from '../../components/StateFilter/StateFilter';

const Home = () => {
  const [category, setCategory] = useState('All');
  const [stateFilter, setStateFilter] = useState('Todos');

  return (
    <div>
      <Header />
      <div id="filters-container" className="filters-container">
        <ExploreCategory category={category} setCategory={setCategory} />
        <StateFilter stateFilter={stateFilter} setStateFilter={setStateFilter} />
      </div>
      <hr/>
      <ProfessionalDisplay category={category} stateFilter={stateFilter} />
    </div>
  );
};

export default Home;