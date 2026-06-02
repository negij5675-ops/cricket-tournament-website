import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const newsService = {
  getAllNews: () => axios.get(`${API_URL}/news`),
  getNewsById: (id) => axios.get(`${API_URL}/news/${id}`),
  getNewsByCategory: (category) => axios.get(`${API_URL}/news/category/${category}`),
  createNews: (data) => axios.post(`${API_URL}/news`, data),
  updateNews: (id, data) => axios.put(`${API_URL}/news/${id}`, data),
  publishNews: (id) => axios.post(`${API_URL}/news/${id}/publish`),
  deleteNews: (id) => axios.delete(`${API_URL}/news/${id}`),
  incrementView: (id) => axios.post(`${API_URL}/news/${id}/view`)
};

export default newsService;
