import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const authService = {
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
  logout: () => axios.post(`${API_URL}/auth/logout`),
  getCurrentUser: () => axios.get(`${API_URL}/auth/me`),
  updateProfile: (userData) => axios.put(`${API_URL}/auth/update-profile`, userData),
  changePassword: (currentPassword, newPassword) =>
    axios.post(`${API_URL}/auth/change-password`, { currentPassword, newPassword })
};

export default authService;
