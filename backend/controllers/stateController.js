import stateModel from '../models/stateModel.js';

// Adicionar estado
const addState = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.json({ success: false, message: 'O nome do estado é obrigatório.' });
  }

  try {
    const existingState = await stateModel.findOne({ name });
    if (existingState) {
      return res.json({ success: false, message: 'Este estado já existe.' });
    }

    const state = new stateModel({ name });
    await state.save();
    res.json({ success: true, message: 'Estado adicionado com sucesso!' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao adicionar estado.' });
  }
};

// Listar estados
const listStates = async (req, res) => {
  try {
    const states = await stateModel.find({}).sort({ name: 1 }); // Ordena alfabeticamente
    res.json({ success: true, data: states });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao listar estados.' });
  }
};

// Remover estado
const removeState = async (req, res) => {
  try {
    await stateModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Estado removido com sucesso!' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Erro ao remover estado.' });
  }
};

export { addState, listStates, removeState };