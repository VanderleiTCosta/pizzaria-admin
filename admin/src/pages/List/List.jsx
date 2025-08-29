import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Importe o Link
import { assets } from '../../assets/assets'; // Importe os assets

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/professional/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Erro ao buscar a lista de profissionais');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  const removeProfessional = async (professionalId) => {
    try {
      const response = await axios.post(`${url}/api/professional/remove`, {
        id: professionalId
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Erro ao remover o profissional');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Todos os Profissionais</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Imagem</b>
          <b>Nome</b>
          <b>Categoria</b>
          <b>Telefone</b>
          <b>Ação</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.phone}</p>
              <div className='action-icons'>
                <Link to={`/edit/${item._id}`}>
                    <img src="https://img.icons8.com/?size=100&id=6697&format=png&color=ffffff" alt="Editar" className='cursor action-icon' />
                </Link>
                <p onClick={() => removeProfessional(item._id)} className="cursor">
                  <img src="https://img.icons8.com/?size=100&id=11201&format=png&color=ffffff" alt="Delete" />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;