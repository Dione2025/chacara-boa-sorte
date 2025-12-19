const connectDB = require('../config/database');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    // Conectar ao banco
    await connectDB();
    
    // Verificar estado da conexão
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    res.status(200).json({
      status: 'OK',
      message: 'API funcionando',
      database: {
        status: states[dbState],
        connected: dbState === 1,
        uri: process.env.MONGODB_URI ? 'Configurada ✅' : 'NÃO CONFIGURADA ❌'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Erro na API',
      error: error.message,
      database: {
        status: 'error',
        connected: false,
        uri: process.env.MONGODB_URI ? 'Configurada mas com erro' : 'NÃO CONFIGURADA ❌'
      }
    });
  }
};
