import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]); // <-- Novo estado para os estados
  const [data, setData] = useState({
    name: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    whatsapp: '',
    instagram: '',
    linkedin: '',
    street: '',
    city: '',
    state: '', // <-- Inicialmente vazio
    zip: ''
  });

  const fetchData = async () => {
    try {
      const [categoryRes, stateRes] = await Promise.all([
        axios.get(`${url}/api/category/list`),
        axios.get(`${url}/api/state/list`)
      ]);

      if (categoryRes.data.success) {
        setCategories(categoryRes.data.data);
        if (categoryRes.data.data.length > 0) {
          setData(prev => ({...prev, category: categoryRes.data.data[0].name}));
        }
      }

      if (stateRes.data.success) {
        setStates(stateRes.data.data);
        if (stateRes.data.data.length > 0) {
          setData(prev => ({...prev, state: stateRes.data.data[0].name}));
        }
      }
    } catch (error) {
      toast.error("Erro ao carregar dados iniciais");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handlePortfolioChange = (event) => {
    setPortfolioImages([...event.target.files]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append('image', image);
    portfolioImages.forEach(file => formData.append('portfolio_images', file));

    try {
      const response = await axios.post(`${url}/api/professional/add`, formData);
      if (response.data.success) {
        setData({
          name: '', description: '', 
          category: categories.length > 0 ? categories[0].name : '', 
          phone: '', email: '', whatsapp: '', instagram: '', linkedin: '',
          street: '', city: '', 
          state: states.length > 0 ? states[0].name : '', 
          zip: ''
        });
        setImage(false);
        setPortfolioImages([]);
        event.target.reset();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Informações Básicas */}
        <div className="add-section">
          <h3>Informações Básicas</h3>
          <div className="add-img-upload flex-col">
            <p>Upload da Imagem de Perfil</p>
            <label htmlFor="image"><img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" /></label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Nome do Profissional</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Digite o nome completo" required />
          </div>
          <div className="add-product-description flex-col">
            <p>Descrição dos Serviços</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Descreva os serviços" required></textarea>
          </div>
          <div className="add-category flex-col">
            <p>Categoria</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contato e Redes Sociais */}
        <div className="add-section">
          <h3>Contato e Redes Sociais</h3>
          <div className="add-form-group">
            <div className="add-form-item">
              <p>Telefone</p>
              <input onChange={onChangeHandler} value={data.phone} type="text" name="phone" placeholder="(XX) XXXXX-XXXX" required />
            </div>
            <div className="add-form-item">
              <p>Email</p>
              <input onChange={onChangeHandler} value={data.email} type="email" name="email" placeholder="contato@exemplo.com" required />
            </div>
          </div>
          <div className="add-form-group">
            <div className="add-form-item">
              <p>WhatsApp (com DDD)</p>
              <input onChange={onChangeHandler} value={data.whatsapp} type="text" name="whatsapp" placeholder="55XX9XXXXXXXX" />
            </div>
            <div className="add-form-item">
              <p>Instagram (usuário)</p>
              <input onChange={onChangeHandler} value={data.instagram} type="text" name="instagram" placeholder="exemplo_user" />
            </div>
          </div>
          <div className="add-form-item">
            <p>LinkedIn (URL)</p>
            <input onChange={onChangeHandler} value={data.linkedin} type="text" name="linkedin" placeholder="https://linkedin.com/in/usuario" />
          </div>
        </div>

        {/* Endereço */}
        <div className="add-section">
          <h3>Endereço</h3>
          <div className="add-form-item">
            <p>Rua / Logradouro</p>
            <input onChange={onChangeHandler} value={data.street} type="text" name="street" />
          </div>
          <div className="add-form-group">
            <div className="add-form-item">
              <p>Cidade</p>
              <input onChange={onChangeHandler} value={data.city} type="text" name="city" />
            </div>
            <div className="add-form-item">
              <p>Estado</p>
              <select onChange={onChangeHandler} name="state" value={data.state}>
                {states.map(s => (
                  <option key={s._id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="add-form-item">
            <p>CEP</p>
            <input onChange={onChangeHandler} value={data.zip} type="text" name="zip" />
          </div>
        </div>

        {/* Portfólio */}
        <div className="add-section">
          <h3>Portfólio</h3>
          <div className="add-img-upload flex-col">
            <p>Upload de Imagens do Portfólio (até 8)</p>
            <input onChange={handlePortfolioChange} type="file" id="portfolio_images" multiple required />
          </div>
        </div>

        <button type="submit" className="add-btn">ADICIONAR PROFISSIONAL</button>
      </form>
    </div>
  );
};

export default Add;