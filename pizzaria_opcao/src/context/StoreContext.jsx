import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [professional_list, setProfessionalList] = useState([]);
  const url = 'https://project-server-vlsp.onrender.com'; // URL do seu backend
  const [token, setToken] = useState('');

  const fetchProfessionalList = async () => {
    try {
      const response = await axios.get(`${url}/api/professional/list`);
      setProfessionalList(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar a lista de profissionais:', error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProfessionalList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    professional_list,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;