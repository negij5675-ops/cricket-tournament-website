import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const matchService = {
  getAllMatches: () => axios.get(`${API_URL}/matches`),
  getMatchById: (id) => axios.get(`${API_URL}/matches/${id}`),
  createMatch: (data) => axios.post(`${API_URL}/matches`, data),
  updateMatch: (id, data) => axios.put(`${API_URL}/matches/${id}`, data),
  deleteMatch: (id) => axios.delete(`${API_URL}/matches/${id}`),
  startMatch: (id, data) => axios.post(`${API_URL}/matches/${id}/start`, data),
  endMatch: (id, data) => axios.post(`${API_URL}/matches/${id}/end`, data),
  updateScore: (id, data) => axios.post(`${API_URL}/matches/${id}/update-score`, data),
  recordWicket: (id, data) => axios.post(`${API_URL}/matches/${id}/record-wicket`, data),
  setManOfTheMatch: (id, playerId) => axios.post(`${API_URL}/matches/${id}/set-man-of-match`, { playerId }),
  getMatchScorecard: (id) => axios.get(`${API_URL}/matches/${id}/scorecard`),
  getMatchStatistics: (id) => axios.get(`${API_URL}/matches/${id}/statistics`)
};

export default matchService;
