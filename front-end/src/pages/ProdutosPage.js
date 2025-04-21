import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../api/produtoApi';
import './styles/ProdutosPage.css'; // Estilo global

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [currentProduto, setCurrentProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const data = await getProdutos();
      setProdutos(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (produtoData) => {
    try {
      if (currentProduto) {
        await updateProduto(currentProduto.id, produtoData);
        setSuccessMessage('Produto atualizado com sucesso!');
      } else {
        await createProduto(produtoData);
        setSuccessMessage('Produto adicionado com sucesso!');
      }
      fetchProdutos();
      setCurrentProduto(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar produto. Você já adicionou um produto tente novamente mais tarde.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduto(id);
      fetchProdutos();
      setSuccessMessage('Produto excluído com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Erro ao excluir produto. Você já adicionou um produto tente novamente mais tarde.');
    }
  };

  return (
    <div className="produtos-page">
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="page-header">
        <h1>Gerenciamento de Produtos</h1>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="page-content">
        <ProdutoForm 
          produto={currentProduto} 
          onSubmit={handleSubmit}
          onCancel={() => setCurrentProduto(null)}
        />
        <ProdutoList 
          produtos={produtos} 
          onEdit={setCurrentProduto}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

// === COMPONENTES INTERNOS ===

const ProdutoForm = ({ produto, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ nome: '', descricao: '', preco: '' });

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        preco: produto.preco || ''
      });
    } else {
      setFormData({ nome: '', descricao: '', preco: '' });
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, preco: parseFloat(formData.preco) });
    setFormData({ nome: '', descricao: '', preco: '' });
  };

  return (
    <div className="form-container">
      <h2>{produto ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="4" required />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço (R$)</label>
          <input type="number" id="preco" name="preco" value={formData.preco} onChange={handleChange} min="0" step="0.01" required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">{produto ? 'Atualizar' : 'Salvar'}</button>
          {produto && <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>}
        </div>
      </form>
    </div>
  );
};

ProdutoForm.propTypes = {
  produto: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};

const ProdutoList = ({ produtos, onEdit, onDelete, loading }) => {
  if (loading) return <div className="loading">Carregando produtos...</div>;
  if (produtos.length === 0) return <div className="no-data">Nenhum produto encontrado</div>;

  return (
    <div className="table-container">
      <h2>Lista de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>R$ {Number(produto.preco).toFixed(2)}</td>
              <td>
                <button onClick={() => onEdit(produto)} className="btn-edit">Editar</button>
                <button onClick={() => onDelete(produto.id)} className="btn-delete">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProdutoList.propTypes = {
  produtos: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default ProdutosPage;
