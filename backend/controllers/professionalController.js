import professionalModel from "../models/professionalModel.js";
import fs from "fs";

// Adicionar um profissional
const addProfessional = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const professional = new professionalModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        state: req.body.state,
        image: image_filename,
    });
    try {
        await professional.save();
        // Emite o evento para todos os clientes conectados
        req.io.emit('data_updated');
        res.json({ success: true, message: "Profissional Adicionado" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Ocorreu um erro" });
    }
};

// Listar todos os profissionais
const listProfessional = async (req, res) => {
    try {
        const professionals = await professionalModel.find({});
        res.json({ success: true, data: professionals });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Ocorreu um erro" });
    }
};

// Remover um profissional
const removeProfessional = async (req, res) => {
    try {
        const professional = await professionalModel.findById(req.body.id);
        fs.unlink(`uploads/${professional.image}`, () => { });
        await professionalModel.findByIdAndDelete(req.body.id);
        // Emite o evento para todos os clientes conectados
        req.io.emit('data_updated');
        res.json({ success: true, message: "Profissional Removido" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Ocorreu um erro" });
    }
};

// Buscar um profissional por ID
const getProfessionalById = async (req, res) => {
    try {
        const professional = await professionalModel.findById(req.params.id);
        if (professional) {
            res.json({ success: true, data: professional });
        } else {
            res.json({ success: false, message: "Profissional não encontrado" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Ocorreu um erro" });
    }
};

// Atualizar um profissional
const updateProfessional = async (req, res) => {
    try {
        let professional = await professionalModel.findById(req.params.id);
        if (!professional) {
            return res.json({ success: false, message: "Profissional não encontrado" });
        }

        let image_filename = professional.image;
        if (req.file) {
            image_filename = req.file.filename;
            fs.unlink(`uploads/${professional.image}`, () => {});
        }

        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            state: req.body.state,
            image: image_filename,
        };

        await professionalModel.findByIdAndUpdate(req.params.id, updatedData);
        // Emite o evento para todos os clientes conectados
        req.io.emit('data_updated');
        res.json({ success: true, message: "Profissional Atualizado" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Ocorreu um erro" });
    }
};


export { addProfessional, listProfessional, removeProfessional, getProfessionalById, updateProfessional };