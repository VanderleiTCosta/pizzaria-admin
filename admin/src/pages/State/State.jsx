import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './State.css'; // Usaremos o mesmo estilo da página de categoria

const State = ({ url }) => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  const fetchStates = async () => {
    const response = await axios.get(`${url}/api/state/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Erro ao buscar estados');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}/api/state/add`, { name });
    if (response.data.success) {
      toast.success(response.data.message);
      setName('');
      await fetchStates();
    } else {
      toast.error(response.data.message);
    }
  };

  const removeState = async (stateId) => {
    const response = await axios.post(`${url}/api/state/remove`, { id: stateId });
    if (response.data.success) {
        toast.success(response.data.message);
        await fetchStates();
    } else {
        toast.error("Erro ao remover estado");
    }
  }

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div className="category-page"> {/* Reutilizando a classe de estilo */}
      <form onSubmit={onSubmitHandler} className="category-form">
        <h2>Adicionar Estado (UF)</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())} // Deixa a sigla em maiúsculo
          placeholder="Ex: CE"
          maxLength="2"
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="category-list">
        <h2>Lista de Estados</h2>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Nome do Estado (UF)</b>
            <b>Ação</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <p>{item.name}</p>
              <p onClick={() => removeState(item._id)} className='cursor'>X</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default State;