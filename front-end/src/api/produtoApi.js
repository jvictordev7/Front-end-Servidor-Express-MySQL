import api from './apiClient';

export const getProdutos = async () => {
  try {
    const response = await api.get('/produtos');
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error('GET /produtos - Limite de requisições excedido:', error.response?.data?.mensagem || error.message);
      throw new Error(error.response?.data?.mensagem || 'Limite de requisições excedido. Tente novamente mais tarde.');
    }
    console.error('GET /produtos - Erro:', error.response?.data || error.message);
    throw error;
  }
};

export const getProduto = async (id) => {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error(`GET /produtos/${id} - Limite de requisições excedido:`, error.response?.data?.mensagem || error.message);
      throw new Error(error.response?.data?.mensagem || 'Limite de requisições excedido. Tente novamente mais tarde.');
    }
    console.error(`GET /produtos/${id} - Erro:`, error.response?.data || error.message);
    throw error;
  }
};

export const createProduto = async (produtoData) => {
  try {
    const response = await api.post('/produtos', produtoData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error('POST /produtos - Limite de requisições excedido:', error.response?.data?.mensagem || error.message);
      throw new Error(error.response?.data?.mensagem || 'Limite de requisições excedido. Tente novamente mais tarde.');
    }
    console.error('POST /produtos - Erro:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProduto = async (id, produtoData) => {
  try {
    const response = await api.put(`/produtos/${id}`, produtoData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error(`PUT /produtos/${id} - Limite de requisições excedido:`, error.response?.data?.mensagem || error.message);
      throw new Error(error.response?.data?.mensagem || 'Limite de requisições excedido. Tente novamente mais tarde.');
    }
    console.error(`PUT /produtos/${id} - Erro:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await api.delete(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error(`DELETE /produtos/${id} - Limite de requisições excedido:`, error.response?.data?.mensagem || error.message);
      throw new Error(error.response?.data?.mensagem || 'Limite de requisições excedido. Tente novamente mais tarde.');
    }
    console.error(`DELETE /produtos/${id} - Erro:`, error.response?.data || error.message);
    throw error;
  }
};
