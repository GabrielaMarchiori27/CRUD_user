# ⚡ Configuração Rápida - Render Web Service

## 🎯 Você está aqui: Criar Web Service

### Passo 1: Criar Web Service
1. No dashboard do Render, clique **"New +"**
2. Selecione **"Web Service"**
3. Escolha seu repositório **CRUD_user** da lista

### Passo 2: Configurações Básicas
```
Name: crud-user-app
Environment: Node
Region: Oregon (US West)
Branch: main
```

### Passo 3: Build & Deploy Settings
```
Build Command: npm install && npm run build
Start Command: npm start
```

### Passo 4: Configurações Avançadas
```
Plan: Free
Auto-Deploy: Yes (recomendado)
```

### Passo 5: Environment Variables
Clique em **"Advanced"** e adicione:

```
NODE_ENV = production
PORT = 10000
MONGODB_URI = [SUA_CONNECTION_STRING_AQUI]
```

**Formato da MONGODB_URI:**
```
mongodb+srv://usuario:senha@cluster.mongodb.net/crud-user?retryWrites=true&w=majority
```

### Passo 6: Deploy
1. Clique **"Create Web Service"**
2. Aguarde o build (2-5 minutos)
3. Acompanhe os logs na aba "Logs"

## ✅ Sinais de Sucesso
Procure estas mensagens nos logs:
```
✅ Build successful
✅ Server running on port 10000
✅ MongoDB connected successfully
```

## 🌐 Sua URL será:
`https://crud-user-app.onrender.com`

## 🆘 Se der erro:
1. **Build Error:** Verifique se package.json tem os scripts corretos
2. **Start Error:** Confirme se server.js usa `process.env.PORT || 3000`
3. **MongoDB Error:** Verifique connection string e IP liberado (0.0.0.0/0)
