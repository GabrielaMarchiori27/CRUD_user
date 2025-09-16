const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  idade: {
    type: Number,
    required: [true, 'Idade é obrigatória'],
    min: [1, 'Idade deve ser maior que 0'],
    max: [120, 'Idade deve ser menor que 121']
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Índice para melhor performance nas consultas por email
userSchema.index({ email: 1 });

// Middleware para tratar erro de email duplicado
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email já está em uso'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
