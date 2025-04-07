import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Ajuste para sua URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;