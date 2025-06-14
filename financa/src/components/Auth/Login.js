// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    try {
      // Endpoint de login (este endpoint precisa ser implementado na sua API Elixir)
      // O PDF menciona JWT, mas não um endpoint de login específico para o User.
      // Assumimos que sua API terá algo como POST /api/login que retorna o JWT.
      const response = await api.post('/login', { // Altere '/login' para o endpoint real da sua API
        email,
        password,
      });

      const { jwt_token } = response.data; // Adapte para o nome do campo retornado pela sua API
      localStorage.setItem('jwt_token', jwt_token);
      navigate('/transactions'); // Redireciona para a tela de transações após o login
    } catch (err) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
      console.error('Erro no login:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
      </p>
    </div>
  );
}

export default Login;