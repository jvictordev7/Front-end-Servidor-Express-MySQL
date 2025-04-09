import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Clientes.css';

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
      setFormData({ nome: '', sobrenome: '', email: '', idade: '' }); // Limpa os campos se não houver cliente
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nome: '', sobrenome: '', email: '', idade: '' }); // Limpa os campos após o envio
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

export default ClienteForm;