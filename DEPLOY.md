# 🚀 Guia de Deploy - Hospedagem Gratuita

## 📊 Opções de Banco de Dados Gratuito

### 🍃 MongoDB Atlas (Recomendado)
- **Limite:** 512MB gratuito
- **Setup:** 
  1. Acesse [mongodb.com/atlas](https://www.mongodb.com/atlas)
  2. Crie conta gratuita
  3. Crie cluster (M0 Sandbox - FREE)
  4. Configure usuário e senha
  5. Adicione IP 0.0.0.0/0 (permitir todos)
  6. Copie connection string

### 🐘 Supabase (PostgreSQL)
- **Limite:** 500MB gratuito
- **Vantagens:** Interface admin, auth integrado

### 🔥 Firebase Firestore
- **Limite:** 1GB gratuito
- **Vantagens:** Real-time, Google Cloud

### 🌍 PlanetScale (MySQL)
- **Limite:** 5GB gratuito
- **Vantagens:** Branching de banco

## 🌐 Opções de Hospedagem Gratuita

### 🎯 Render (Recomendado para Full-Stack)
- **Vantagens:** 
  - Deploy automático via Git
  - SSL gratuito
  - Logs em tempo real
  - Suporte a Node.js nativo

**Como fazer deploy:**
1. Conecte GitHub ao Render
2. Selecione repositório
3. Configure variáveis de ambiente:
   ```
   MONGODB_URI=sua_connection_string_aqui
   NODE_ENV=production
   ```
4. Deploy automático!

### 🚂 Railway
- **Vantagens:**
  - Deploy super simples
  - $5 crédito gratuito/mês
  - Banco integrado

### ⚡ Vercel (Frontend)
- **Ideal para:** React/Next.js
- **Limitações:** Serverless functions

### 🌊 Netlify (Frontend + Functions)
- **Ideal para:** JAMstack
- **Vantagens:** CDN global

## 🔧 Configuração do Projeto

### 1. Variáveis de Ambiente
Crie arquivo `.env`:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crud-usuarios
NODE_ENV=production
PORT=3000
```

### 2. Scripts de Build
Já configurado no `package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "webpack --mode production",
    "dev": "nodemon server.js"
  }
}
```

### 3. Arquivos de Deploy
- `render.yaml` - Configuração Render
- `.env.example` - Template de variáveis

## 📋 Checklist de Deploy

- [ ] Criar conta MongoDB Atlas
- [ ] Configurar cluster gratuito
- [ ] Obter connection string
- [ ] Fazer push do código para GitHub
- [ ] Conectar repositório ao Render
- [ ] Configurar variáveis de ambiente
- [ ] Fazer primeiro deploy
- [ ] Testar aplicação online

## 🔗 URLs Úteis

- **MongoDB Atlas:** https://www.mongodb.com/atlas
- **Render:** https://render.com
- **Railway:** https://railway.app
- **Vercel:** https://vercel.com
- **Netlify:** https://netlify.com

## 💡 Dicas Importantes

1. **Sempre use HTTPS** em produção
2. **Configure CORS** adequadamente
3. **Use variáveis de ambiente** para dados sensíveis
4. **Monitore logs** após deploy
5. **Teste todas as funcionalidades** online

## 🆘 Troubleshooting

**Erro de conexão MongoDB:**
- Verifique connection string
- Confirme IP whitelist (0.0.0.0/0)
- Teste credenciais

**Build falha:**
- Verifique dependências no package.json
- Confirme scripts de build
- Veja logs de erro no Render

**App não carrega:**
- Verifique PORT environment variable
- Confirme arquivos estáticos (dist/)
- Teste rotas da API
