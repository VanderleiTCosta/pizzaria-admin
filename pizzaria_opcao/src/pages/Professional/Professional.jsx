import React, { useContext } from 'react';
import './Professional.css';
import { useParams, useNavigate } from 'react-router-dom'; // Importe o useNavigate
import { StoreContext } from '../../context/StoreContext';

const Professional = () => {
  const { professional_list, url } = useContext(StoreContext);
  const { id } = useParams();
  const navigate = useNavigate(); // Inicialize o hook de navegação

  const professional = professional_list.find((p) => p._id === id);

  if (!professional) {
    return <div className="professional-not-found">Profissional não encontrado.</div>;
  }

  return (
    <div className="professional-profile">
      {/* Botão de Voltar adicionado aqui */}
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Voltar
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <img
            className="profile-image"
            src={`${url}/images/${professional.image}`}
            alt={professional.name}
          />
          <div className="profile-header-info">
            <h1>{professional.name}</h1>
            <p className="profile-category">{professional.category}</p>
          </div>
        </div>

        <div className="profile-body">
          <h2>Sobre os Serviços</h2>
          <p className="profile-description">{professional.description}</p>

          <hr className="profile-divider" />

          <h2>Contato</h2>
          <div className="profile-contact">
            <p><strong>Telefone:</strong> {professional.phone}</p>
            <p><strong>Email:</strong> {professional.email}</p>
            {professional.whatsapp && <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${professional.whatsapp}`} target="_blank" rel="noopener noreferrer">{professional.whatsapp}</a></p>}
            {professional.instagram && <p><strong>Instagram:</strong> <a href={`https://instagram.com/${professional.instagram}`} target="_blank" rel="noopener noreferrer">@{professional.instagram}</a></p>}
            {professional.linkedin && <p><strong>LinkedIn:</strong> <a href={`https://www.linkedin.com/in/${professional.linkedin}`} target="_blank" rel="noopener noreferrer">Ver Perfil</a></p>}
          </div>

          {professional.address && professional.address.street && (
            <div className="profile-address">
              <hr className="profile-divider" />
              <h2>Endereço</h2>
              <p>{`${professional.address.street}, ${professional.address.city} - ${professional.address.state}, ${professional.address.zip}`}</p>
            </div>
          )}

          {professional.portfolio_images && professional.portfolio_images.length > 0 && (
            <>
              <hr className="profile-divider" />
              <h2>Portfólio</h2>
              <div className="portfolio-gallery">
                {professional.portfolio_images.map((img, index) => (
                  <img key={index} src={`${url}/images/${img}`} alt={`Portfolio ${index + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Professional;