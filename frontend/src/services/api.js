import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access'); // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem('refresh');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post(`${API_URL}/token/refresh/`, {
    refresh: refreshToken,
  });

  localStorage.setItem('access', response.data.access);
  return response.data.access;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshAuthToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config); // Thử lại yêu cầu với token mới
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Xử lý logout nếu cần
      }
    }
    return Promise.reject(error);
  }
);

export const productApi = {
  getAll: () => api.get('/products/'),
  getById: (id) => api.get(`/products/${id}/`),
  create: (data) => api.post('/products/', data),
  update: (id, data) => api.put(`/products/${id}/`, data),
  delete: (id) => api.delete(`/products/${id}/`),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  getProfile: () => api.get('/auth/profile/'),
};

export const cartApi = {
  addItem: (data) => api.post('/cart/', data),
};

export default api;