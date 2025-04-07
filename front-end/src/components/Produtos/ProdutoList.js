import React from 'react';
import PropTypes from 'prop-types';
import './Produtos.css';

const ProdutoList = ({ produtos, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  if (produtos.length === 0) {
    return <div className="no-data">Nenhum produto encontrado</div>;
  }

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
                <button 
                  onClick={() => onEdit(produto)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(produto.id)}
                  className="btn-delete"
                >
                  Excluir
                </button>
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

export default ProdutoList;