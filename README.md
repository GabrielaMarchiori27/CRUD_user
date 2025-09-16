# CRUD de Usuários - React + Chakra UI + Node.js + Express

Um projeto completo de CRUD (Create, Read, Update, Delete) para gerenciamento de usuários, desenvolvido com React, Chakra UI, Node.js, Express e Axios.

## 🚀 Funcionalidades

- ✅ **Criar** novos usuários
- ✅ **Listar** todos os usuários
- ✅ **Buscar** usuário por ID
- ✅ **Atualizar** dados do usuário
- ✅ **Excluir** usuários
- ✅ Interface web moderna e responsiva
- ✅ Validação de dados
- ✅ Tratamento de erros

## 🛠️ Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Express.js
  - CORS

- **Frontend:**
  - React 18
  - Chakra UI (Sistema de Design)
  - Emotion (CSS-in-JS)
  - Framer Motion (Animações)
  - JavaScript (ES6+)
  - Axios para requisições HTTP
  - React Icons

- **Build Tools:**
  - Webpack 5
  - Babel
  - CSS Loader
  - Style Loader

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação e Execução

1. **Clone ou baixe o projeto**
   ```bash
   cd crud-usuario-nodejs
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor**
   ```bash
   npm start
   ```
   
   Ou para desenvolvimento com auto-reload:
   ```bash
   npm run dev
   ```

4. **Execute o projeto**
   
   **Para desenvolvimento:**
   ```bash
   # Terminal 1 - Backend (API)
   npm start
   
   # Terminal 2 - Frontend (React)
   npm run watch
   ```
   
   **Para produção:**
   ```bash
   npm run build
   npm start
   ```

5. **Acesse a aplicação**
   - Frontend React: `http://localhost:3001` (desenvolvimento)
   - Backend API: `http://localhost:3000/api/usuarios`
   - Produção: `http://localhost:3000` (após build)

## 📡 Endpoints da API

### GET /api/usuarios
Lista todos os usuários
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "idade": 30
    }
  ],
  "total": 1
}
```

### GET /api/usuarios/:id
Busca um usuário específico por ID
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "idade": 30
  }
}
```

### POST /api/usuarios
Cria um novo usuário
```json
// Requisição
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "idade": 25
}

// Resposta
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@email.com",
    "idade": 25
  }
}
```

### PUT /api/usuarios/:id
Atualiza um usuário existente
```json
// Requisição
{
  "nome": "João Silva Santos",
  "email": "joao.santos@email.com",
  "idade": 31
}

// Resposta
{
  "success": true,
  "message": "Usuário atualizado com sucesso",
  "data": {
    "id": 1,
    "nome": "João Silva Santos",
    "email": "joao.santos@email.com",
    "idade": 31
  }
}
```

### DELETE /api/usuarios/:id
Remove um usuário
```json
{
  "success": true,
  "message": "Usuário removido com sucesso",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "idade": 30
  }
}
```

## 🎨 Interface com Chakra UI

A aplicação React com Chakra UI inclui:

- **Componentes modulares** e acessíveis do Chakra UI
- **Design System** consistente e profissional
- **Tema customizado** com cores e estilos personalizados
- **Responsividade** nativa dos componentes
- **Animações suaves** com Framer Motion
- **Toast notifications** integradas
- **Modal de confirmação** para exclusões
- **Estados de loading** e feedback visual
- **Formulários controlados** com validação em tempo real
- **Arquitetura escalável** com separação de responsabilidades

## 📁 Estrutura do Projeto

```
crud-usuario-react/
├── src/
│   ├── components/
│   │   ├── UserForm.js     # Componente de formulário
│   │   ├── UserList.js     # Componente de lista
│   │   └── Alert.js        # Componente de alertas
│   ├── services/
│   │   └── userService.js  # Serviços da API
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos da aplicação
│   ├── index.js            # Ponto de entrada React
│   └── index.html          # Template HTML
├── dist/                   # Build de produção
├── server.js               # Servidor Express
├── webpack.config.js       # Configuração Webpack
├── package.json            # Dependências e scripts
└── README.md              # Documentação
```

## 🔒 Validações

- **Nome:** obrigatório
- **Email:** obrigatório e único
- **Idade:** obrigatório, número entre 1 e 120

## 🚦 Tratamento de Erros

A API retorna códigos de status HTTP apropriados:

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Usuário não encontrado
- `500` - Erro interno do servidor

## 🔄 Armazenamento

Os dados são armazenados em memória durante a execução do servidor. Para persistência permanente, você pode integrar com bancos de dados como:

- MongoDB
- PostgreSQL
- MySQL
- SQLite

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões, sinta-se à vontade para abrir uma issue no repositório.

---

**Desenvolvido com ❤️ usando React, Chakra UI, Node.js e Express**
