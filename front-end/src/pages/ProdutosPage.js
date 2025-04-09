import React, { useState, useEffect } from 'react';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../api/produtoApi';
import ProdutoForm from '../components/Produtos/ProdutoForm';
import ProdutoList from '../components/Produtos/ProdutoList';
import './ProdutosPage.css';

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [currentProduto, setCurrentProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Estado para a mensagem de sucesso

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
      console.error(err);
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
      setCurrentProduto(null); // Limpa o produto atual
      setTimeout(() => setSuccessMessage(null), 3000); // Remove a mensagem após 3 segundos
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar produto. Verifique os dados e tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduto(id);
      fetchProdutos();
      setSuccessMessage('Produto excluído com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000); // Remove a mensagem após 3 segundos
    } catch (err) {
      console.error(err);
      setError('Erro ao excluir produto. Tente novamente.');
    }
  };

  return (
    <div className="produtos-page">
      {/* Mensagem de sucesso no topo centralizado */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

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

export default ProdutosPage;