import api from './apiClient';

export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    console.log('GET /clientes - Sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('GET /clientes - Erro:', error.response?.data || error.message);
    throw error;
  }
};

export const getCliente = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
    console.log(`GET /clientes/${id} - Sucesso:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`GET /clientes/${id} - Erro:`, error.response?.data || error.message);
    throw error;
  }
};

export const createCliente = async (clienteData) => {
  try {
    // Validação local para garantir que os dados obrigatórios estão presentes
    const { nome, sobrenome, email, idade } = clienteData;
    if (!nome || !sobrenome || !email || idade === undefined) {
      throw new Error('Todos os campos (nome, sobrenome, email, idade) são obrigatórios.');
    }

    console.log('POST /clientes - Dados enviados:', clienteData);

    // Envia os dados para o backend
    const response = await api.post('/clientes', {
      nome,
      sobrenome,
      email,
      idade: parseInt(idade, 10), // Certifique-se de que idade é um número
    });

    console.log('POST /clientes - Sucesso:', response.data);

    return response.data;
  } catch (error) {
    if (error.response?.data?.includes('O email fornecido já está em uso')) {
      console.error('POST /clientes - Erro: Email duplicado.');
      throw new Error('O email fornecido já está em uso. Por favor, use outro email.');
    }
    console.error('POST /clientes - Erro:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCliente = async (id, clienteData) => {
  try {
    // Validação local para garantir que os dados obrigatórios estão presentes
    const { nome, sobrenome, email, idade } = clienteData;
    if (!nome || !sobrenome || !email || idade === undefined) {
      throw new Error('Todos os campos (nome, sobrenome, email, idade) são obrigatórios.');
    }

    console.log(`PUT /clientes/${id} - Dados enviados:`, clienteData);

    const response = await api.put(`/clientes/${id}`, {
      nome,
      sobrenome,
      email,
      idade: parseInt(idade, 10), // Certifique-se de que idade é um número
    });

    console.log(`PUT /clientes/${id} - Sucesso:`, response.data);

    return response.data;
  } catch (error) {
    console.error(`PUT /clientes/${id} - Erro:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`/clientes/${id}`);
    console.log(`DELETE /clientes/${id} - Sucesso:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`DELETE /clientes/${id} - Erro:`, error.response?.data || error.message);
    throw error;
  }
};