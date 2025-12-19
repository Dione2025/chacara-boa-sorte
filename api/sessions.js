const {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  updatePayment,
  deleteSession
} = require('../routes/sessions');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder OPTIONS para preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id, sessionId, residentId } = req.query;

    switch (req.method) {
      case 'GET':
        if (id) {
          req.params = { id };
          return await getSessionById(req, res);
        }
        return await getSessions(req, res);
      
      case 'POST':
        return await createSession(req, res);
      
      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'ID não fornecido' });
        }
        req.params = { id };
        return await updateSession(req, res);
      
      case 'PATCH':
        if (!sessionId || !residentId) {
          return res.status(400).json({ error: 'SessionId ou ResidentId não fornecido' });
        }
        req.params = { sessionId, residentId };
        return await updatePayment(req, res);
      
      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'ID não fornecido' });
        }
        req.params = { id };
        return await deleteSession(req, res);
      
      default:
        res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
};
