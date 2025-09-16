# 🚨 Fix: querySrv ENOTFOUND MongoDB Error

## O Problema
```
Erro ao conectar com MongoDB: querySrv ENOTFOUND _mongodb._tcp.cluster0.xxxxx.mongodb.net
```

Este erro significa que você está usando uma **connection string de exemplo** em vez da **connection string real** do seu cluster.

## ✅ Solução

### 1. Pegar a Connection String REAL
1. Acesse https://cloud.mongodb.com
2. Database → Seu cluster → **Connect**
3. **Connect your application**
4. **Copie a string REAL** (não use exemplos)

### 2. Verificar se a String está Correta
**❌ ERRADO (exemplo genérico):**
```
mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**✅ CORRETO (string real):**
```
mongodb+srv://cruduser:senha123@cluster0.abc123.mongodb.net/cruduser?retryWrites=true&w=majority
```

### 3. Identificar String Real vs Exemplo
**String real tem:**
- Números/letras específicos após cluster0 (ex: `abc123`, `def456`)
- Não tem `xxxxx` genérico

**String exemplo tem:**
- `xxxxx` ou `<password>` ou outros placeholders
- Texto genérico de documentação

## 🔧 Como Corrigir

### 1. Verificar seu arquivo .env
```env
# ❌ Se está assim (com xxxxx):
MONGODB_URI=mongodb+srv://cruduser:senha@cluster0.xxxxx.mongodb.net/cruduser?retryWrites=true&w=majority

# ✅ Deve estar assim (com código real):
MONGODB_URI=mongodb+srv://cruduser:senha@cluster0.abc123.mongodb.net/cruduser?retryWrites=true&w=majority
```

### 2. Pegar a String Correta no MongoDB Atlas
1. **Database** (menu lateral)
2. Clique **Connect** no seu cluster
3. **Connect your application**
4. **Node.js** driver
5. **Copie a string que aparece**

### 3. Editar a String Copiada
**Antes:**
```
mongodb+srv://username:<password>@cluster0.CODIGO_REAL.mongodb.net/?retryWrites=true&w=majority
```

**Depois:**
```
mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.CODIGO_REAL.mongodb.net/cruduser?retryWrites=true&w=majority
```

**Mudanças:**
- `username` → seu usuário real
- `<password>` → sua senha real  
- Adicionar `/cruduser` antes do `?`
- Manter o `CODIGO_REAL` (não é xxxxx)

## 🎯 Teste Rápido

Após corrigir o .env:
```bash
cd C:\Users\User\CRUD_user
npm start
```

**Sucesso:**
```
✅ MongoDB connected successfully
```

**Ainda com erro:**
- Verifique se copiou a string do SEU cluster (não exemplo)
- Confirme usuário e senha corretos
- Verifique se cluster está ativo (não "Creating")
