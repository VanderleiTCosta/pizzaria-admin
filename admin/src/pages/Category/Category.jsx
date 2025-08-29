import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Category.css';

const Category = ({ url }) => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get(`${url}/api/category/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Erro ao buscar categorias');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${url}/api/category/add`, { name });
    if (response.data.success) {
      toast.success(response.data.message);
      setName('');
      await fetchCategories();
    } else {
      toast.error(response.data.message);
    }
  };

  const removeCategory = async (categoryId) => {
    const response = await axios.post(`${url}/api/category/remove`, {id: categoryId});
    if(response.data.success){
        toast.success(response.data.message);
        await fetchCategories();
    } else {
        toast.error("Erro ao remover categoria")
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      <form onSubmit={onSubmitHandler} className="category-form">
        <h2>Adicionar Categoria</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da Categoria"
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="category-list">
        <h2>Lista de Categorias</h2>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Nome da Categoria</b>
            <b>Ação</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <p>{item.name}</p>
              <p onClick={()=>removeCategory(item._id)} className='cursor'>X</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;