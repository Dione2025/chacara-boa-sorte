const connectDB = require('../config/database');
const Resident = require('../models/Resident');

exports.getResidents = async (req, res) => {
  try {
    await connectDB();
    const residents = await Resident.find().sort({ lot: 1 });
    res.status(200).json(residents);
  } catch (error) {
    console.error('Erro ao buscar residentes:', error);
    res.status(500).json({ error: 'Erro ao buscar residentes' });
  }
};

exports.createResident = async (req, res) => {
  try {
    await connectDB();
    const resident = new Resident(req.body);
    await resident.save();
    res.status(201).json(resident);
  } catch (error) {
    console.error('Erro ao criar residente:', error);
    res.status(500).json({ error: 'Erro ao criar residente' });
  }
};

exports.updateResident = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const resident = await Resident.findByIdAndUpdate(id, req.body, { new: true });
    if (!resident) return res.status(404).json({ error: 'Residente não encontrado' });
    res.status(200).json(resident);
  } catch (error) {
    console.error('Erro ao atualizar residente:', error);
    res.status(500).json({ error: 'Erro ao atualizar residente' });
  }
};

exports.deleteResident = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const resident = await Resident.findByIdAndDelete(id);
    if (!resident) return res.status(404).json({ error: 'Residente não encontrado' });
    res.status(200).json({ message: 'Residente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar residente:', error);
    res.status(500).json({ error: 'Erro ao deletar residente' });
  }
};
