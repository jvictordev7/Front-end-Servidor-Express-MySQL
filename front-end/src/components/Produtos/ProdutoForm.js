import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Produtos.css';

const ProdutoForm = ({ produto, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: ''
  });

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        preco: produto.preco || ''
      });
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      preco: parseFloat(formData.preco)
    });
  };

  return (
    <div className="form-container">
      <h2>{produto ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço (R$)</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {produto ? 'Atualizar' : 'Salvar'}
          </button>
          {produto && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
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

export default ProdutoForm;