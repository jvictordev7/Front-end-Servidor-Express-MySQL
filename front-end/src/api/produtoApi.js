import api from './apiClient';

export const getProdutos = async () => {
  const response = await api.get('/produtos');
  return response.data;
};

export const getProduto = async (id) => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const createProduto = async (produtoData) => {
  const response = await api.post('/produtos', produtoData);
  return response.data;
};

export const updateProduto = async (id, produtoData) => {
  const response = await api.put(`/produtos/${id}`, produtoData);
  return response.data;
};

export const deleteProduto = async (id) => {
  const response = await api.delete(`/produtos/${id}`);
  return response.data;
};