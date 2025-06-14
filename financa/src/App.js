// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importe seus componentes
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TransactionList from './components/Transactions/TransactionList';
import TransactionForm from './components/Transactions/TransactionForm';
import TagManagement from './components/Tags/TagManagement';
// Componente para proteger rotas autenticadas
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwt_token'); // Verifica se há um token
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Rotas de Autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas Protegidas (exigem autenticação) */}
          <Route path="/transactions" element={<PrivateRoute><TransactionList /></PrivateRoute>} />
          <Route path="/transactions/new" element={<PrivateRoute><TransactionForm /></PrivateRoute>} />
          <Route path="/transactions/edit/:id" element={<PrivateRoute><TransactionForm /></PrivateRoute>} />
          <Route path="/tags" element={<PrivateRoute><TagManagement /></PrivateRoute>} />

          {/* Rota inicial que redireciona para a listagem de transações (se logado) ou login (se não) */}
          <Route
            path="/"
            element={
              localStorage.getItem('jwt_token') ? (
                <Navigate to="/transactions" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;