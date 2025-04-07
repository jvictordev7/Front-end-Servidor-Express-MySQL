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

    const response = await api.post('/clientes', clienteData);
    console.log('POST /clientes - Sucesso:', response.data);

    return response.data;
  } catch (error) {
    console.error('POST /clientes - Erro:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCliente = async (id, clienteData) => {
  try {
    console.log(`PUT /clientes/${id} - Dados enviados:`, clienteData);
    const response = await api.put(`/clientes/${id}`, clienteData);
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