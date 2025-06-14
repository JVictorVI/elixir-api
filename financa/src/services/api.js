// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Verifique se esta é a URL correta da sua API Elixir
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT em todas as requisições autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas de erro, ex: token expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se for um erro 401 (Não Autorizado), redirecione para o login
      localStorage.removeItem('jwt_token');
      window.location.href = '/login'; // Ou use useNavigate se estiver dentro de um componente
    }
    return Promise.reject(error);
  }
);

export default api;