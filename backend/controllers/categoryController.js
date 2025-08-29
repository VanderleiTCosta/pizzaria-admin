import categoryModel from '../models/categoryModel.js';

// Adicionar categoria
const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.json({ success: false, message: 'O nome da categoria é obrigatório.' });
  }

  try {
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.json({ success: false, message: 'Esta categoria já existe.' });
    }

    const category = new categoryModel({ name });
    await category.save();
    res.json({ success: true, message: 'Categoria adicionada com sucesso!' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao adicionar categoria.' });
  }
};

// Listar categorias
const listCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao listar categorias.' });
  }
};

// Remover categoria
const removeCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Categoria removida com sucesso!' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao remover categoria.' });
  }
};

export { addCategory, listCategories, removeCategory };