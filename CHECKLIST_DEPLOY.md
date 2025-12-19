# ✅ CHECKLIST DE DEPLOY - SIGA PASSO A PASSO

## 📋 ANTES DE COMEÇAR

- [ ] Tenho conta no MongoDB Atlas (ou vou criar)
- [ ] Tenho conta no Vercel (ou vou criar)
- [ ] Tenho Git instalado

---

## 🗄️ PARTE 1: CONFIGURAR MONGODB (10 minutos)

### 1.1 Criar Conta e Cluster
- [ ] Acessar: https://www.mongodb.com/cloud/atlas/register
- [ ] Criar conta gratuita
- [ ] Escolher: "Build a Database"
- [ ] Selecionar: **M0 FREE** (0$)
- [ ] Provider: AWS
- [ ] Region: Mais próxima (ex: São Paulo sa-east-1)
- [ ] Cluster Name: deixar padrão ou "ChacarasDB"
- [ ] Clicar: "Create Cluster"
- [ ] ⏱️ Aguardar 3-5 minutos criar

### 1.2 Configurar Acesso
- [ ] Menu lateral: "Database Access"
- [ ] Clicar: "Add New Database User"
- [ ] Username: `adminchacara` (ou qualquer)
- [ ] Password: **COPIE E GUARDE** (ou gere uma)
- [ ] Database User Privileges: "Read and write to any database"
- [ ] Clicar: "Add User"

### 1.3 Configurar Rede
- [ ] Menu lateral: "Network Access"
- [ ] Clicar: "Add IP Address"
- [ ] Clicar: "Allow Access from Anywhere"
- [ ] IP: `0.0.0.0/0` (preenchido automaticamente)
- [ ] Clicar: "Confirm"

### 1.4 Obter Connection String
- [ ] Menu lateral: "Database"
- [ ] No seu cluster, clicar: "Connect"
- [ ] Escolher: "Connect your application"
- [ ] Driver: Node.js (versão 5.5 or later)
- [ ] **COPIAR** a connection string (começa com mongodb+srv://)
- [ ] Exemplo: `mongodb+srv://adminchacara:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
- [ ] **SUBSTITUIR** `<password>` pela senha que você criou
- [ ] **ADICIONAR** nome do database no final: `/chacaras`
- [ ] String final: `mongodb+srv://adminchacara:SuaSenha123@cluster0.xxxxx.mongodb.net/chacaras?retryWrites=true&w=majority`
- [ ] ✅ **GUARDAR** essa string, você vai precisar!

---

## 🚀 PARTE 2: FAZER DEPLOY NA VERCEL (15 minutos)

### 2.1 Preparar Código
- [ ] Baixar o ZIP do projeto corrigido
- [ ] Extrair para uma pasta (ex: `chacara-system`)
- [ ] Abrir terminal na pasta

### 2.2 Subir para GitHub
```bash
# Na pasta do projeto:
cd chacara-system

# Inicializar Git
git init
git add .
git commit -m "Sistema de chácaras - corrigido"

# Criar repositório no GitHub e conectar
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

- [ ] Executei os comandos acima
- [ ] Criei repositório no GitHub
- [ ] Código está no GitHub

### 2.3 Deploy no Vercel - Interface Web

- [ ] Acessar: https://vercel.com/new
- [ ] Fazer login (pode usar GitHub)
- [ ] Clicar: "Import Git Repository"
- [ ] Selecionar: seu repositório `chacara-system`
- [ ] **NÃO CLICAR EM DEPLOY AINDA!**

### 2.4 Configurar Variável de Ambiente (CRÍTICO!)

- [ ] Na tela de deploy, expandir: "Environment Variables"
- [ ] Name: `MONGODB_URI`
- [ ] Value: **COLAR** sua connection string completa
- [ ] ✅ Marcar: **Production**
- [ ] ✅ Marcar: **Preview**
- [ ] ✅ Marcar: **Development**
- [ ] Clicar: "Add"
- [ ] Verificar que apareceu na lista

### 2.5 Fazer Deploy

- [ ] Agora sim, clicar: "Deploy"
- [ ] ⏱️ Aguardar 2-3 minutos
- [ ] Quando aparecer: "Congratulations!" → Deploy ok!
- [ ] **COPIAR** a URL do projeto (ex: `https://chacara-system.vercel.app`)

---

## 🔍 PARTE 3: TESTAR SE FUNCIONOU (5 minutos)

### 3.1 Teste Básico - Health Check
- [ ] Abrir no navegador: `https://SEU-PROJETO.vercel.app/api/health`
- [ ] Deve retornar JSON com:
```json
{
  "status": "OK",
  "database": {
    "status": "connected",    ← 👀 DEVE SER "connected"
    "connected": true,        ← 👀 DEVE SER true
    "uri": "Configurada ✅"   ← 👀 DEVE TER ✅
  }
}
```

❌ **Se aparecer "NÃO CONFIGURADA":**
- Voltar para 2.4 e adicionar MONGODB_URI
- Aguardar 1-2 minutos para Vercel aplicar
- Testar novamente

### 3.2 Teste - API de Residentes
- [ ] Abrir: `https://SEU-PROJETO.vercel.app/api/residents`
- [ ] Deve retornar: `[]` (array vazio é normal no início)

❌ **Se retornar erro:**
- Verificar Parte 4 (Logs)

### 3.3 Teste - Frontend
- [ ] Abrir: `https://SEU-PROJETO.vercel.app`
- [ ] Interface deve carregar
- [ ] Tentar adicionar um residente
- [ ] Ver se salva

✅ **Se salvou = FUNCIONOU!**

---

## 🔍 PARTE 4: VER LOGS (se algo der errado)

### 4.1 Acessar Logs
- [ ] Ir para: https://vercel.com
- [ ] Clicar no seu projeto
- [ ] Menu lateral: "Logs"
- [ ] Fazer uma ação no sistema
- [ ] Ver erro em tempo real

### 4.2 Erros Comuns

| Se aparecer... | Fazer... |
|----------------|----------|
| `MONGODB_URI não configurada` | Adicionar em Environment Variables |
| `bad auth` | Senha do MongoDB incorreta |
| `getaddrinfo ENOTFOUND` | Connection string incorreta |
| `buffering timed out` | IP não liberado no MongoDB |

---

## 📊 PARTE 5: VERIFICAR NO MONGODB

### 5.1 Ver se Dados Foram Salvos
- [ ] Voltar para MongoDB Atlas
- [ ] Menu: "Database"
- [ ] Clicar: "Browse Collections"
- [ ] Deve ter database: `chacaras`
- [ ] Deve ter collections: `residents` e `billsessions`
- [ ] Clicar e ver documentos

✅ **Se tem documentos = ESTÁ SALVANDO!**

---

## 🎉 PARTE 6: TUDO FUNCIONANDO!

Parabéns! Seu sistema está no ar e salvando dados. Agora você pode:

- [ ] Compartilhar URL com equipe
- [ ] Configurar domínio customizado (opcional)
- [ ] Adicionar autenticação (futuro)

---

## 📞 PRECISA DE AJUDA?

Se travou em algum passo:

1. **Verificar os logs:** Parte 4
2. **Testar localmente:**
   ```bash
   cd chacara-system
   npm install
   # Criar .env com MONGODB_URI
   vercel dev
   ```
3. **Documentação:**
   - Ler: `GUIA_DEPLOY.md`
   - Ler: `EXPLICACAO_MUDANCAS.md`

---

## ⏱️ TEMPO TOTAL ESTIMADO

- MongoDB: 10 min
- Deploy: 15 min  
- Testes: 5 min
- **Total: ~30 minutos**

---

## 🔒 SEGURANÇA

⚠️ **IMPORTANTE:**
- [ ] Nunca compartilhe sua MONGODB_URI
- [ ] Nunca faça commit do arquivo .env
- [ ] Use senhas fortes no MongoDB
