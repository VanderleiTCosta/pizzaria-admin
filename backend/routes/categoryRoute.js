import express from 'express';
import { addCategory, listCategories, removeCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/add', addCategory);
categoryRouter.get('/list', listCategories);
categoryRouter.post('/remove', removeCategory);

export default categoryRouter;