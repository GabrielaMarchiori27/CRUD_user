import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const userService = {
  // Listar todos os usuários
  getAllUsers: async () => {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar usuários');
    }
  },

  // Buscar usuário por ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar usuário');
    }
  },

  // Criar novo usuário
  createUser: async (userData) => {
    try {
      const response = await api.post('/usuarios', userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro ao criar usuário');
    }
  },

  // Atualizar usuário
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/usuarios/${id}`, userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro ao atualizar usuário');
    }
  },

  // Deletar usuário
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro ao deletar usuário');
    }
  },
};

export default userService;
