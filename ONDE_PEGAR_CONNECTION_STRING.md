# 🎯 Onde Pegar a Connection String - MongoDB Atlas

## Passo a Passo Visual

### 1. Acesse MongoDB Atlas
- URL: https://cloud.mongodb.com
- Faça login na sua conta

### 2. Vá para Database
- No menu lateral esquerdo, clique em **"Database"**
- Você verá seu cluster listado (ex: Cluster0)

### 3. Clique em "Connect"
- No seu cluster, procure o botão **"Connect"**
- É um botão cinza/azul ao lado do nome do cluster
- Clique nele

### 4. Escolha "Connect your application"
- Aparecerá uma janela com 3 opções
- Clique em **"Connect your application"**
- (NÃO clique em "MongoDB Compass" ou "MongoDB Shell")

### 5. Configurar Driver
- **Driver:** Selecione **"Node.js"**
- **Version:** Deixe **"4.1 or later"** (padrão)

### 6. Copiar Connection String
- Aparecerá uma caixa com o código
- Clique no botão **"Copy"** ao lado da string
- A string será algo assim:

```
mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 🔧 O que fazer com a Connection String

### Antes de usar, você precisa:
1. **Substituir `<password>`** pela senha real do usuário
2. **Adicionar nome do banco** antes do `?`

### Exemplo de transformação:
**Original:**
```
mongodb+srv://cruduser:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**Após editar:**
```
mongodb+srv://cruduser:minhasenha123@cluster0.abc123.mongodb.net/cruduser?retryWrites=true&w=majority
```

**Mudanças:**
- `<password>` → `minhasenha123` (sua senha real)
- Adicionado `/cruduser` antes do `?` (nome do banco)

## 🚨 Não encontra o botão "Connect"?

### Se não vê o cluster:
1. Verifique se está na aba **"Database"** (menu lateral)
2. Se não tem cluster, clique **"Build a Database"**
3. Escolha **"M0 Sandbox"** (gratuito)

### Se o cluster está sendo criado:
- Aguarde alguns minutos
- Status deve mudar de "Creating" para "Active"
- Só então aparece o botão "Connect"

## 📱 Próximo Passo

Após copiar a connection string:
1. Edite substituindo `<password>` e adicionando `/cruduser`
2. Cole no arquivo `.env` local
3. Use a mesma no Render (Environment Variables)
