import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post('/auth/validate', {token});
    return response.data;
  },
  signin: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', {email, password});
    return response;
  },
  register: async (email: string, password: string, username: string) => {
    const response = await api.post('/auth/signup', {email, password, username});
    return response;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  fetchWords: async (page: number) => {
    const response = await api.get(`/entries/en`, {
      params: {
        page
      }
    });
    return response.data;
  },  
  fetchWord: async (word: string) => {
    const response = await api.get(`/entries/en/${word}`);
    return response.data;
  }, 
  fetchHistory: async () => {
    const response = await api.get(`/user/me/history`);
    return response.data;
  }, 
  fetchFavorites: async () => {
    const response = await api.get(`/user/me/favorites`);
    return response.data;
  }, 
  removeFavorite: async (word: string) => {
    const response = await api.delete(`/entries/en/${word}/unfavorite`);
    return response.data;
  }, 
  favoriteWord: async (word: string) => {
    const response = await api.post(`/entries/en/${word}/favorite`);
    return response.data;
  }, 
  fetchTitle: async () => {
    const response = await api.get('/');
    return response.data;
  }, 
})