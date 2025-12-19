const connectDB = require('../config/database');
const BillSession = require('../models/BillSession');

exports.getSessions = async (req, res) => {
  try {
    await connectDB();
    const sessions = await BillSession.find().sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Erro ao buscar sessões:', error);
    res.status(500).json({ error: 'Erro ao buscar sessões' });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const session = await BillSession.findById(id);
    if (!session) return res.status(404).json({ error: 'Sessão não encontrada' });
    res.status(200).json(session);
  } catch (error) {
    console.error('Erro ao buscar sessão:', error);
    res.status(500).json({ error: 'Erro ao buscar sessão' });
  }
};

exports.createSession = async (req, res) => {
  try {
    await connectDB();
    const session = new BillSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    res.status(500).json({ error: 'Erro ao criar sessão' });
  }
};

exports.updateSession = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const session = await BillSession.findByIdAndUpdate(id, req.body, { new: true });
    if (!session) return res.status(404).json({ error: 'Sessão não encontrada' });
    res.status(200).json(session);
  } catch (error) {
    console.error('Erro ao atualizar sessão:', error);
    res.status(500).json({ error: 'Erro ao atualizar sessão' });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    await connectDB();
    const { sessionId, residentId } = req.params;
    const session = await BillSession.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Sessão não encontrada' });
    
    const readingIndex = session.readings.findIndex(r => r.residentId === residentId);
    if (readingIndex === -1) return res.status(404).json({ error: 'Leitura não encontrada' });
    
    session.readings[readingIndex] = { ...session.readings[readingIndex].toObject(), ...req.body };
    await session.save();
    res.status(200).json(session);
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar pagamento' });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.params;
    const session = await BillSession.findByIdAndDelete(id);
    if (!session) return res.status(404).json({ error: 'Sessão não encontrada' });
    res.status(200).json({ message: 'Sessão deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar sessão:', error);
    res.status(500).json({ error: 'Erro ao deletar sessão' });
  }
};
