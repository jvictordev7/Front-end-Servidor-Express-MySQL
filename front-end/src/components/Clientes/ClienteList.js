import React from 'react';
import PropTypes from 'prop-types';
import './Clientes.css';

const ClienteList = ({ clientes, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Carregando clientes...</div>;
  }

  if (clientes.length === 0) {
    return <div className="no-data">Nenhum cliente encontrado</div>;
  }

  return (
    <div className="table-container">
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome} {cliente.sobrenome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.idade}</td>
              <td>
                <button 
                  onClick={() => onEdit(cliente)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(cliente.id)}
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

ClienteList.propTypes = {
  clientes: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default ClienteList;