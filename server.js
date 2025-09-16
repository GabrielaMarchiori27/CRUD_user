require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-usuarios', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🍃 MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error.message);
    // Fallback para dados em memória se não conseguir conectar
    console.log('⚠️  Usando armazenamento em memória como fallback');
    global.useMemoryStorage = true;
  }
};

// Conectar ao banco
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Mudou de 'public' para 'dist'

// Fallback para armazenamento em memória
let usuarios = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', idade: 30 },
  { id: 2, nome: 'Maria Santos', email: 'maria@email.com', idade: 25 },
  { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', idade: 35 }
];
let proximoId = 4;

// Rotas CRUD

// GET - Listar todos os usuários
app.get('/api/usuarios', async (req, res) => {
  try {
    if (global.useMemoryStorage) {
      return res.json({
        success: true,
        data: usuarios,
        total: usuarios.length
      });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: users,
      total: users.length
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// GET - Buscar usuário por ID
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (global.useMemoryStorage) {
      const usuario = usuarios.find(u => u.id === parseInt(id));
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      return res.json({
        success: true,
        data: usuario
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// POST - Criar novo usuário
app.post('/api/usuarios', async (req, res) => {
  console.log('🚀 Rota POST /api/usuarios chamada!');
  try {
    const { nome, email, idade } = req.body;
    console.log('🔍 useMemoryStorage:', global.useMemoryStorage);
    console.log('🔍 Dados recebidos:', { nome, email, idade });

    if (global.useMemoryStorage) {
      // Validação básica
      if (!nome || !email || !idade) {
        return res.status(400).json({
          success: false,
          message: 'Nome, email e idade são obrigatórios'
        });
      }

      // Verificar se email já existe
      const emailExiste = usuarios.find(u => u.email === email);
      if (emailExiste) {
        return res.status(400).json({
          success: false,
          message: 'Email já está em uso'
        });
      }

      const novoUsuario = {
        id: proximoId++,
        nome,
        email,
        idade: parseInt(idade)
      };

      usuarios.push(novoUsuario);

      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: novoUsuario
      });
    }

    console.log('🔍 Tentando salvar usuário no MongoDB:', { nome, email, idade });
    const user = new User({ nome, email, idade });
    console.log('🔍 Usuário criado:', user);
    const savedUser = await user.save();
    console.log('✅ Usuário salvo no MongoDB:', savedUser);

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: savedUser
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: errors[0] || 'Dados inválidos'
      });
    }

    if (error.message === 'Email já está em uso') {
      return res.status(400).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT - Atualizar usuário
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, idade } = req.body;

    if (global.useMemoryStorage) {
      const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(id));

      if (usuarioIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Verificar se email já existe (exceto para o próprio usuário)
      if (email) {
        const emailExiste = usuarios.find(u => u.email === email && u.id !== parseInt(id));
        if (emailExiste) {
          return res.status(400).json({
            success: false,
            message: 'Email já está em uso'
          });
        }
      }

      // Atualizar apenas os campos fornecidos
      if (nome) usuarios[usuarioIndex].nome = nome;
      if (email) usuarios[usuarioIndex].email = email;
      if (idade) usuarios[usuarioIndex].idade = parseInt(idade);

      return res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuarios[usuarioIndex]
      });
    }

    const updateData = {};
    if (nome) updateData.nome = nome;
    if (email) updateData.email = email;
    if (idade) updateData.idade = idade;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: user
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: errors[0] || 'Dados inválidos'
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE - Remover usuário
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (global.useMemoryStorage) {
      const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(id));

      if (usuarioIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const usuarioRemovido = usuarios.splice(usuarioIndex, 1)[0];

      return res.json({
        success: true,
        message: 'Usuário removido com sucesso',
        data: usuarioRemovido
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuário removido com sucesso',
      data: user
    });
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota para servir o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/usuarios`);
});

module.exports = app;
