import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api/clientesApi';
import './styles/ClientesPage.css'; // Importando o CSS para a página de clientes
// import './ClienteList.css';
// import './ClienteForm.css';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientes();
      setClientes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar clientes. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (clienteData) => {
    try {
      if (currentCliente) {
        await updateCliente(currentCliente.id, clienteData);
        setSuccessMessage('Cliente atualizado com sucesso!');
      } else {
        await createCliente(clienteData);
        setSuccessMessage('Cliente adicionado com sucesso!');
      }
      fetchClientes();
      setCurrentCliente(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar cliente. Verifique os dados, ou se já adicionou um cliente tente novamente mais tarde.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      fetchClientes();
      setSuccessMessage('Cliente excluído com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Erro ao excluir cliente. Você já excluiu um cliente tente novamente mais tarde.');
    }
  };

  const ClienteForm = ({ cliente, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      nome: '',
      sobrenome: '',
      email: '',
      idade: ''
    });

    useEffect(() => {
      if (cliente) {
        setFormData({
          nome: cliente.nome || '',
          sobrenome: cliente.sobrenome || '',
          email: cliente.email || '',
          idade: cliente.idade || ''
        });
      } else {
        setFormData({ nome: '', sobrenome: '', email: '', idade: '' });
      }
    }, [cliente]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      setFormData({ nome: '', sobrenome: '', email: '', idade: '' });
    };

    return (
      <div className="form-container">
        <h2>{cliente ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
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
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade</label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {cliente ? 'Atualizar' : 'Salvar'}
            </button>
            {cliente && (
              <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };

  ClienteForm.propTypes = {
    cliente: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };

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
        <div className="table-scroll">
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
                <button onClick={() => onEdit(cliente)} className="btn-edit">Editar</button>
                <button onClick={() => onDelete(cliente.id)} className="btn-delete">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    );
  };

  ClienteList.propTypes = {
    clientes: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  return (
    <div className="clientes-page">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="page-header">
        <h1>Gerenciamento de Clientes</h1>
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="page-content">
        <ClienteForm 
          cliente={currentCliente} 
          onSubmit={handleSubmit}
          onCancel={() => setCurrentCliente(null)}
        />

        <ClienteList 
          clientes={clientes} 
          onEdit={setCurrentCliente}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ClientesPage;
