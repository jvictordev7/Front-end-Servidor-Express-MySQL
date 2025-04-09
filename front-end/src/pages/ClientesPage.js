import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api/clientesApi';
import ClienteForm from '../components/Clientes/ClienteForm';
import ClienteList from '../components/Clientes/ClienteList';
import './ClientesPage.css';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Estado para a mensagem de sucesso

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
      setCurrentCliente(null); // Limpa o cliente atual
      setTimeout(() => setSuccessMessage(null), 3000); // Remove a mensagem após 3 segundos
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar cliente. Verifique os dados e tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      fetchClientes();
      setSuccessMessage('Cliente excluído com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000); // Remove a mensagem após 3 segundos
    } catch (err) {
      console.error(err);
      setError('Erro ao excluir cliente. Tente novamente.');
    }
  };

  return (
    <div className="clientes-page">
      {/* Mensagem de sucesso no topo centralizado */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
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