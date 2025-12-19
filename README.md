# 🏡 Chácaras Energy Manager

Sistema de gerenciamento de contas de energia para condomínio de chácaras.

## 📋 Estrutura do Projeto

```
chacara-system/
├── api/              # Serverless Functions (Vercel)
│   ├── residents.js  # API de residentes
│   └── sessions.js   # API de sessões de cobrança
├── config/           # Configurações
│   └── database.js   # Conexão MongoDB
├── models/           # Modelos Mongoose
│   ├── Resident.js
│   └── BillSession.js
├── routes/           # Lógica das rotas
│   ├── residents.js
│   └── sessions.js
├── public/           # Frontend estático
│   ├── assets/       # JavaScript bundled
│   └── index.html
├── package.json
├── vercel.json       # Configuração Vercel
└── .env.example      # Exemplo de variáveis de ambiente
```

## 🚀 Deploy na Vercel

### 1. Configurar MongoDB

Certifique-se de ter um cluster MongoDB (pode usar MongoDB Atlas - gratuito):
- Acesse https://www.mongodb.com/cloud/atlas
- Crie um cluster gratuito
- Obtenha a connection string

### 2. Deploy

**Opção A: Via CLI**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
cd chacara-system
vercel --prod
```

**Opção B: Via GitHub**
1. Faça push do código para GitHub
2. Acesse https://vercel.com
3. Importe o repositório
4. Configure as variáveis de ambiente

### 3. Configurar Variáveis de Ambiente na Vercel

No painel da Vercel, adicione:
- `MONGODB_URI` = sua connection string do MongoDB
- `NODE_ENV` = production

**⚠️ IMPORTANTE:** A variável `MONGODB_URI` deve estar configurada na Vercel para o banco funcionar!

## 🔍 Verificar se está Funcionando

Após o deploy, teste as APIs:

```bash
# Testar API de residentes
curl https://seu-projeto.vercel.app/api/residents

# Testar API de sessões
curl https://seu-projeto.vercel.app/api/sessions
```

## 🐛 Troubleshooting

### Erro: "Cannot read properties of undefined"
- Verifique se `MONGODB_URI` está configurada nas variáveis de ambiente da Vercel

### Erro: "CORS"
- As APIs já estão configuradas com CORS
- Se persistir, verifique se está acessando pela URL correta da Vercel

### Dados não salvam
- Verifique os logs no painel Vercel → seu projeto → Logs
- Confirme que a connection string do MongoDB está correta
- Teste a conexão localmente com `vercel dev`

### Como ver os logs
1. Acesse https://vercel.com
2. Vá em seu projeto
3. Clique em "Logs" no menu
4. Veja os erros em tempo real

## 🧪 Teste Local

```bash
# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
# Edite .env e adicione sua MONGODB_URI

# Rodar localmente
vercel dev
```

Acesse: http://localhost:3000

## 📝 APIs Disponíveis

### Residentes
- `GET /api/residents` - Listar todos
- `POST /api/residents` - Criar novo
- `PUT /api/residents?id=ID` - Atualizar
- `DELETE /api/residents?id=ID` - Deletar

### Sessões
- `GET /api/sessions` - Listar todas
- `GET /api/sessions?id=ID` - Buscar por ID
- `POST /api/sessions` - Criar nova
- `PUT /api/sessions?id=ID` - Atualizar
- `PATCH /api/sessions?sessionId=SID&residentId=RID` - Atualizar pagamento
- `DELETE /api/sessions?id=ID` - Deletar
