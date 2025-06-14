// src/components/Tags/TagManagement.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function TagManagement() {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState(null); // Tag being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTags = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Endpoint para buscar todas as tags - Aplicação de Controle Financeiro (1).pdf]
      const response = await api.get('/tags');
      setTags(response.data);
    } catch (err) {
      setError('Erro ao carregar categorias.');
      console.error('Erro ao buscar categorias:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleAddOrUpdateTag = async (e) => {
    e.preventDefault();
    setError('');
    if (!newTagName.trim()) {
      setError('O nome da categoria não pode ser vazio.');
      return;
    }

    try {
      if (editingTag) {
        // Atualizar tag - Aplicação de Controle Financeiro (1).pdf]
        await api.put(`/tags/${editingTag.id}`, { name: newTagName });
        alert('Categoria atualizada com sucesso!');
        setEditingTag(null);
      } else {
        // Criar tag - Aplicação de Controle Financeiro (1).pdf]
        await api.post('/tags', { name: newTagName });
        alert('Categoria adicionada com sucesso!');
      }
      setNewTagName('');
      fetchTags(); // Recarrega a lista
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar categoria.');
      console.error('Erro ao salvar categoria:', err.response ? err.response.data : err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        // Excluir tag - Aplicação de Controle Financeiro (1).pdf]
        await api.delete(`/tags/${id}`);
        alert('Categoria excluída com sucesso!');
        fetchTags(); // Recarrega a lista
      } catch (err) {
        setError('Erro ao excluir categoria.');
        console.error('Erro ao excluir categoria:', err.response ? err.response.data : err.message);
      }
    }
  };

  const handleEditClick = (tag) => {
    setEditingTag(tag);
    setNewTagName(tag.name);
  };

  if (loading) return <div>Carregando categorias...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Gerenciar Categorias</h2>
      <Link to="/transactions">Voltar para Transações</Link>

      <form onSubmit={handleAddOrUpdateTag}>
        <h3>{editingTag ? 'Editar Categoria' : 'Adicionar Nova Categoria'}</h3>
        <div>
          <label>Nome da Categoria:</label>
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{editingTag ? 'Salvar Edição' : 'Adicionar Categoria'}</button>
        {editingTag && (
          <button type="button" onClick={() => { setEditingTag(null); setNewTagName(''); }} style={{ marginLeft: '10px' }}>
            Cancelar Edição
          </button>
        )}
      </form>

      <h3>Categorias Existentes</h3>
      <ul>
        {tags.length > 0 ? (
          tags.map((tag) => (
            <li key={tag.id} style={{ border: '1px solid #eee', margin: '5px 0', padding: '5px' }}>
              {tag.name}
              <button onClick={() => handleEditClick(tag)} style={{ marginLeft: '10px' }}>
                Editar
              </button>
              <button onClick={() => handleDelete(tag.id)} style={{ marginLeft: '10px' }}>
                Excluir
              </button>
            </li>
          ))
        ) : (
          <p>Nenhuma categoria encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default TagManagement;