import express from 'express';
import {
  addProfessional,
  listProfessionals,
  removeProfessional,
  getProfessionalById,
  updateProfessional
} from '../controllers/professionalController.js';
import multer from 'multer';

const professionalRouter = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Rota para adicionar
professionalRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'portfolio_images', maxCount: 8 }]), addProfessional);

// Rota para listar
professionalRouter.get('/list', listProfessionals);

// Rota para remover
professionalRouter.post('/remove', removeProfessional);

// Novas rotas para editar
professionalRouter.get('/:id', getProfessionalById); // Busca um profissional
professionalRouter.put('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }]), updateProfessional); // Atualiza um profissional

export default professionalRouter;