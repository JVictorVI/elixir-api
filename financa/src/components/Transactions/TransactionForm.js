// src/components/Transactions/TransactionForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

function TransactionForm() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('DESPESA'); // 'RECEITA' ou 'DESPESA' - Aplicação de Controle Financeiro (1).pdf]
  const [date, setDate] = useState('');
  const [tags, setTags] = useState([]); // Para popular o select de categorias
  const [selectedTagId, setSelectedTagId] = useState(''); // ID da tag selecionada
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Para edição

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        // Busca as tags para o dropdown - Aplicação de Controle Financeiro (1).pdf]
        const tagsResponse = await api.get('/tags');
        setTags(tagsResponse.data);

        if (id) { // Se for edição, busca os dados da transação
          const transResponse = await api.get(`/transactions/${id}`)
          const transaction = transResponse.data;
          setDescription(transaction.description);
          setValue(transaction.value);
          setType(transaction.type);
          // Formata a data para o input type="date"
          setDate(new Date(transaction.data).toISOString().split('T')[0]);
          setSelectedTagId(transaction.tag_id || ''); // Assumindo que a transação tem tag_id
        }
      } catch (err) {
        setError('Erro ao carregar dados do formulário.');
        console.error('Erro ao buscar dados do formulário:', err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const transactionData = {
        description,
        value: parseFloat(value), // Certifique-se de enviar como número
        type,
        data: date, // A API espera a data neste formato YYYY-MM-DD
        // user_id virá do JWT na API
        tag_id: selectedTagId ? parseInt(selectedTagId) : null, // Envia o ID da tag (se selecionada)
      };

      if (id) {
        // Atualizar transação - Aplicação de Controle Financeiro (1).pdf]
        await api.put(`/transactions/${id}`, transactionData);
        alert('Transação atualizada com sucesso!');
      } else {
        // Criar transação - Aplicação de Controle Financeiro (1).pdf]
        await api.post('/transactions', transactionData);
        alert('Transação adicionada com sucesso!');
      }
      navigate('/transactions');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar transação.');
      console.error('Erro ao salvar transação:', err.response ? err.response.data : err.message);
    }
  };

  if (loading) return <div>Carregando formulário...</div>;

  return (
    <div>
      <h2>{id ? 'Editar Transação' : 'Adicionar Nova Transação'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="RECEITA">RECEITA</option>
            <option value="DESPESA">DESPESA</option>
          </select>
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select value={selectedTagId} onChange={(e) => setSelectedTagId(e.target.value)}>
            <option value="">Nenhuma Categoria</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{id ? 'Salvar Alterações' : 'Adicionar Transação'}</button>
        <button type="button" onClick={() => navigate('/transactions')} style={{ marginLeft: '10px' }}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;