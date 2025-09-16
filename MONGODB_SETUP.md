# 🍃 Conectar CRUD_user ao MongoDB Atlas

## Passo 1: Acessar MongoDB Atlas

1. Acesse [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Faça login na sua conta
3. Você verá o dashboard principal

## Passo 2: Criar Cluster (se não tiver)

### Se não tem cluster ainda:
1. Clique **"Build a Database"**
2. Escolha **"M0 Sandbox"** (FREE)
3. Provider: **AWS**
4. Region: **N. Virginia (us-east-1)** (mais próximo)
5. Nome do cluster: `Cluster0` (padrão)
6. Clique **"Create"**

## Passo 3: Configurar Database Access (Usuário)

1. No menu lateral, clique **"Database Access"**
2. Clique **"Add New Database User"**
3. Configurações:
   ```
   Authentication Method: Password
   Username: crud_user
   Password: [Clique "Autogenerate Secure Password" OU crie uma senha forte]
   ```
4. **Database User Privileges:** 
   - Selecione **"Built-in Role"**
   - Escolha **"Read and write to any database"**
5. Clique **"Add User"**

**⚠️ IMPORTANTE:** Copie e salve a senha gerada!

## Passo 4: Configurar Network Access (IP)

1. No menu lateral, clique **"Network Access"**
2. Clique **"Add IP Address"**
3. Escolha **"Allow Access from Anywhere"**
   - Isso adiciona `0.0.0.0/0`
   - Necessário para Render funcionar
4. Clique **"Confirm"**

## Passo 5: Obter Connection String

1. Volte para **"Database"** (menu lateral)
2. No seu cluster, clique **"Connect"**
3. Escolha **"Connect your application"**
4. Configurações:
   ```
   Driver: Node.js
   Version: 4.1 or later
   ```
5. Copie a **Connection String**

**Exemplo da string:**
```
mongodb+srv://crud_user:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

## Passo 6: Configurar Localmente

### 1. Criar arquivo .env
No diretório `C:\Users\User\CRUD_user\`, crie o arquivo `.env`:

```env
MONGODB_URI=mongodb+srv://crud_user:SUA_SENHA_AQUI@cluster0.abc123.mongodb.net/crud-user?retryWrites=true&w=majority
NODE_ENV=development
PORT=3000
```

**⚠️ Substitua:**
- `SUA_SENHA_AQUI` pela senha do usuário
- `cluster0.abc123.mongodb.net` pelo seu cluster real
- Adicione `/crud-user` antes do `?` para especificar o nome do banco

### 2. Testar conexão local
```bash
cd C:\Users\User\CRUD_user
npm start
```

**Procure por esta mensagem:**
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

## Passo 7: Configurar no Render

No Render, na seção **Environment Variables**, adicione:
```
MONGODB_URI=mongodb+srv://crud_user:SUA_SENHA@cluster0.abc123.mongodb.net/crud-user?retryWrites=true&w=majority
```

## ✅ Checklist Final

- [ ] Cluster MongoDB criado (M0 FREE)
- [ ] Usuário de banco criado com senha
- [ ] IP 0.0.0.0/0 liberado no Network Access
- [ ] Connection string copiada
- [ ] Arquivo .env criado localmente
- [ ] Testado conexão local (npm start)
- [ ] Variável MONGODB_URI configurada no Render

## 🆘 Troubleshooting

### Erro: "MongoNetworkError"
- Verifique se IP está liberado (0.0.0.0/0)
- Confirme se connection string está correta

### Erro: "Authentication failed"
- Verifique usuário e senha
- Confirme se usuário tem permissões corretas

### Erro: "Database not found"
- Adicione nome do banco na connection string: `/crud-user`

## 📱 Próximo Passo

Após conectar com sucesso:
1. Teste criar um usuário na aplicação
2. Verifique no MongoDB Atlas se os dados aparecem
3. Faça deploy no Render com a MONGODB_URI configurada
