import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToFilters = () => {
    document.getElementById('filters-container').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Encontre o Profissional Certo para Você</h2>
        <p>
          Navegue por categorias e localidades para encontrar especialistas
          qualificados perto de você. Comece sua busca agora mesmo!
        </p>
        <button onClick={scrollToFilters}>Buscar Profissionais</button>
      </div>
    </div>
  );
};

export default Header;