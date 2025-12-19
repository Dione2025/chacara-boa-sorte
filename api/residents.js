const {
  getResidents,
  createResident,
  updateResident,
  deleteResident
} = require('../routes/residents');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder OPTIONS para preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id } = req.query;

    switch (req.method) {
      case 'GET':
        return await getResidents(req, res);
      
      case 'POST':
        return await createResident(req, res);
      
      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'ID não fornecido' });
        }
        req.params = { id };
        return await updateResident(req, res);
      
      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'ID não fornecido' });
        }
        req.params = { id };
        return await deleteResident(req, res);
      
      default:
        res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
};
