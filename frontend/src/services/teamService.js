import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const teamService = {
  getAllTeams: () => axios.get(`${API_URL}/teams`),
  getTeamById: (id) => axios.get(`${API_URL}/teams/${id}`),
  createTeam: (data) => axios.post(`${API_URL}/teams`, data),
  updateTeam: (id, data) => axios.put(`${API_URL}/teams/${id}`, data),
  deleteTeam: (id) => axios.delete(`${API_URL}/teams/${id}`),
  getTeamPlayers: (id) => axios.get(`${API_URL}/teams/${id}/players`),
  addPlayerToTeam: (id, playerId) => axios.post(`${API_URL}/teams/${id}/add-player`, { playerId }),
  removePlayerFromTeam: (id, playerId) => axios.post(`${API_URL}/teams/${id}/remove-player`, { playerId }),
  setTeamCaptain: (id, captainId, vice_captainId) =>
    axios.post(`${API_URL}/teams/${id}/set-captain`, { captainId, vice_captainId }),
  getTeamStatistics: (id) => axios.get(`${API_URL}/teams/${id}/statistics`)
};

export default teamService;
