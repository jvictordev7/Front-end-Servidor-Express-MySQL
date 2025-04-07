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
      } else {
        await createProduto(produtoData);
      }
      fetchProdutos();
      setCurrentProduto(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar produto. Verifique os dados e tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduto(id);
        fetchProdutos();
      } catch (err) {
        console.error(err);
        setError('Erro ao excluir produto. Tente novamente.');
      }
    }
  };

  return (
    <div className="produtos-page">
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