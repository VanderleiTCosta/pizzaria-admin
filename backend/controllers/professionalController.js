import professionalModel from '../models/professionalModel.js';
import fs from 'fs';

// Adicionar um novo profissional
const addProfessional = async (req, res) => {
  try {
    const { name, description, category, phone, email, whatsapp, instagram, linkedin, street, city, state, zip } = req.body;

    if (!req.files || !req.files.image) {
      return res.json({ success: false, message: 'A imagem de perfil é obrigatória.' });
    }

    const image_filename = req.files.image[0].filename;
    const portfolio_filenames = req.files.portfolio_images ? req.files.portfolio_images.map(file => file.filename) : [];

    const professional = new professionalModel({
      name, description, category, phone, email, whatsapp, instagram, linkedin,
      image: image_filename,
      portfolio_images: portfolio_filenames,
      address: { street, city, state, zip }
    });

    await professional.save();
    res.json({ success: true, message: 'Profissional Adicionado' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao adicionar profissional' });
  }
};

// Listar todos os profissionais
const listProfessionals = async (req, res) => {
  try {
    const professionals = await professionalModel.find({});
    res.json({ success: true, data: professionals });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao listar profissionais' });
  }
};

// Buscar profissional por ID (NOVA FUNÇÃO)
const getProfessionalById = async (req, res) => {
  try {
    const professional = await professionalModel.findById(req.params.id);
    if (professional) {
      res.json({ success: true, data: professional });
    } else {
      res.json({ success: false, message: 'Profissional não encontrado.' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao buscar dados do profissional.' });
  }
};

// Atualizar profissional (NOVA FUNÇÃO)
const updateProfessional = async (req, res) => {
  try {
    const professional = await professionalModel.findById(req.params.id);
    if (!professional) {
      return res.json({ success: false, message: 'Profissional não encontrado para atualizar.' });
    }

    // Atualiza os campos de texto
    const fieldsToUpdate = [
      'name', 'description', 'category', 'phone', 'email', 'whatsapp',
      'instagram', 'linkedin', 'street', 'city', 'state', 'zip'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field]) {
        if (['street', 'city', 'state', 'zip'].includes(field)) {
          professional.address[field] = req.body[field];
        } else {
          professional[field] = req.body[field];
        }
      }
    });

    // Atualiza a imagem de perfil se uma nova foi enviada
    if (req.files.image) {
      // Opcional: remover a imagem antiga do storage
      fs.unlink(`uploads/${professional.image}`, () => {});
      professional.image = req.files.image[0].filename;
    }

    // A lógica para atualizar o portfólio pode ser mais complexa
    // Por simplicidade, vamos pular a atualização do portfólio por enquanto.

    await professional.save();
    res.json({ success: true, message: 'Profissional atualizado com sucesso!' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao atualizar o profissional.' });
  }
};

// Remover um profissional
const removeProfessional = async (req, res) => {
  try {
    const professional = await professionalModel.findById(req.body.id);
    fs.unlink(`uploads/${professional.image}`, () => {});
    if (professional.portfolio_images && professional.portfolio_images.length > 0) {
        professional.portfolio_images.forEach(img => fs.unlink(`uploads/${img}`, () => {}));
    }
    await professionalModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Profissional Removido' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao remover profissional' });
  }
};

export { addProfessional, listProfessionals, removeProfessional, getProfessionalById, updateProfessional };