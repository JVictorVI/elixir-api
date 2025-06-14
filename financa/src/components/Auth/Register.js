// src/components/Auth/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await api.post('/users', {
        // Agora, os parâmetros do usuário são aninhados sob a chave 'user'
        user: { // <-- ADICIONADO ESTE OBJETO
          name,
          email,
          password,
        },
      });
      setSuccess('Usuário registrado com sucesso! Faça login.');
      console.log('Usuário registrado:', response.data);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar. Tente novamente.');
      console.error('Erro no registro:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar</h2>
      <div>
        <label>Nome Completo:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
          onChange={(e) => setPassword(e.target.value)} // <-- Deve ser setPassword
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;