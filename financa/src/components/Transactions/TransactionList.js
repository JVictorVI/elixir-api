// src/components/Transactions/TransactionList.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Endpoint para buscar todas as transações - Aplicação de Controle Financeiro (1).pdf]
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (err) {
      setError('Erro ao carregar transações.');
      console.error('Erro ao buscar transações:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        // Endpoint para excluir transação - Aplicação de Controle Financeiro (1).pdf]
        await api.delete(`/transactions/${id}`);
        alert('Transação excluída com sucesso!');
        fetchTransactions(); // Recarrega a lista
      } catch (err) {
        setError('Erro ao excluir transação.');
        console.error('Erro ao excluir transação:', err.response ? err.response.data : err.message);
      }
    }
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, trans) => {
      const value = parseFloat(trans.value);
      return trans.type === 'RECEITA' ? acc + value : acc - value;
    }, 0);
  };

  if (loading) return <div>Carregando transações...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Minhas Transações</h2>
      <p>Saldo Atual: R$ {calculateBalance().toFixed(2)}</p>
      <Link to="/transactions/new">Adicionar Nova Transação</Link> | <Link to="/tags">Gerenciar Categorias</Link>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((trans) => (
            <li key={trans.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <strong>Descrição:</strong> {trans.description} <br />
              <strong>Valor:</strong> R$ {parseFloat(trans.value).toFixed(2)} <br />
              <strong>Tipo:</strong> {trans.type} <br />
              <strong>Data:</strong> {new Date(trans.data).toLocaleDateString()} <br />
              {/* O ID da categoria (Tag) também pode ser exibido se você buscar os detalhes da tag */}
              {/* <strong>Categoria:</strong> {trans.tag_id} */}
              <Link to={`/transactions/edit/${trans.id}`}>Editar</Link>
              <button onClick={() => handleDelete(trans.id)} style={{ marginLeft: '10px' }}>
                Excluir
              </button>
            </li>
          ))
        ) : (
          <p>Nenhuma transação encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default TransactionList;