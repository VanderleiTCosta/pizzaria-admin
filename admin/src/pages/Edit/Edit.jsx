import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import '../Add/Add.css'; // Reutilizando o estilo da página de Adicionar

const Edit = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
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
    state: '',
    zip: ''
  });

  // Busca as categorias e estados
  const fetchDropdownData = async () => {
    try {
      const [categoryRes, stateRes] = await Promise.all([
        axios.get(`${url}/api/category/list`),
        axios.get(`${url}/api/state/list`)
      ]);
      if (categoryRes.data.success) setCategories(categoryRes.data.data);
      if (stateRes.data.success) setStates(stateRes.data.data);
    } catch (error) {
      toast.error("Erro ao carregar categorias ou estados");
    }
  };

  // Busca os dados do profissional específico
  const fetchProfessionalData = async () => {
    try {
      const response = await axios.get(`${url}/api/professional/${id}`);
      if (response.data.success) {
        const professional = response.data.data;
        setData({
          name: professional.name || '',
          description: professional.description || '',
          category: professional.category || '',
          phone: professional.phone || '',
          email: professional.email || '',
          whatsapp: professional.whatsapp || '',
          instagram: professional.instagram || '',
          linkedin: professional.linkedin || '',
          street: professional.address?.street || '',
          city: professional.address?.city || '',
          state: professional.address?.state || '',
          zip: professional.address?.zip || ''
        });
        setCurrentImage(`${url}/images/${professional.image}`);
      } else {
        toast.error(response.data.message);
        navigate('/list');
      }
    } catch (error) {
      toast.error("Erro ao buscar dados do profissional.");
      navigate('/list');
    }
  };

  useEffect(() => {
    fetchDropdownData();
    fetchProfessionalData();
  }, [id]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`${url}/api/professional/update/${id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list');
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
        <h2>Editar Profissional</h2>
        {/* ... o resto do formulário é igual ao de 'Add.jsx' ... */}
        <div className="add-section">
          <h3>Informações Básicas</h3>
          <div className="add-img-upload flex-col">
            <p>Upload da Imagem de Perfil (opcional)</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : currentImage || assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </div>
          <div className="add-product-name flex-col">
            <p>Nome do Profissional</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" required />
          </div>
          <div className="add-product-description flex-col">
            <p>Descrição dos Serviços</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" required></textarea>
          </div>
          <div className="add-category flex-col">
            <p>Categoria</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
            </select>
          </div>
        </div>

        <div className="add-section">
          <h3>Contato e Redes Sociais</h3>
          <div className="add-form-group">
            <div className="add-form-item">
              <p>Telefone</p>
              <input onChange={onChangeHandler} value={data.phone} type="text" name="phone" required />
            </div>
            <div className="add-form-item">
              <p>Email</p>
              <input onChange={onChangeHandler} value={data.email} type="email" name="email" required />
            </div>
          </div>
          <div className="add-form-group">
              <div className="add-form-item"><p>WhatsApp</p><input onChange={onChangeHandler} value={data.whatsapp} type="text" name="whatsapp" /></div>
              <div className="add-form-item"><p>Instagram</p><input onChange={onChangeHandler} value={data.instagram} type="text" name="instagram" /></div>
          </div>
          <div className="add-form-item"><p>LinkedIn</p><input onChange={onChangeHandler} value={data.linkedin} type="text" name="linkedin" /></div>
        </div>

        <div className="add-section">
            <h3>Endereço</h3>
            <div className="add-form-item"><p>Rua</p><input onChange={onChangeHandler} value={data.street} type="text" name="street" /></div>
            <div className="add-form-group">
                <div className="add-form-item"><p>Cidade</p><input onChange={onChangeHandler} value={data.city} type="text" name="city" /></div>
                <div className="add-form-item">
                    <p>Estado</p>
                    <select onChange={onChangeHandler} name="state" value={data.state}>
                        {states.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="add-form-item"><p>CEP</p><input onChange={onChangeHandler} value={data.zip} type="text" name="zip" /></div>
        </div>

        <button type="submit" className="add-btn">SALVAR ALTERAÇÕES</button>
      </form>
    </div>
  );
};

export default Edit;