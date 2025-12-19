const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Usando conexão existente');
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI não configurada no .env');
    }

    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB conectado!');
  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;
