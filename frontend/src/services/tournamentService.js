import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const tournamentService = {
  getAllTournaments: () => axios.get(`${API_URL}/tournaments`),
  getTournamentById: (id) => axios.get(`${API_URL}/tournaments/${id}`),
  createTournament: (data) => axios.post(`${API_URL}/tournaments`, data),
  updateTournament: (id, data) => axios.put(`${API_URL}/tournaments/${id}`, data),
  deleteTournament: (id) => axios.delete(`${API_URL}/tournaments/${id}`),
  addTeamToTournament: (id, teamId) => axios.post(`${API_URL}/tournaments/${id}/add-team`, { teamId }),
  removeTeamFromTournament: (id, teamId) => axios.post(`${API_URL}/tournaments/${id}/remove-team`, { teamId }),
  getTournamentMatches: (id) => axios.get(`${API_URL}/tournaments/${id}/matches`),
  getTournamentLeaderboard: (id) => axios.get(`${API_URL}/tournaments/${id}/leaderboard`),
  startTournament: (id) => axios.post(`${API_URL}/tournaments/${id}/start`),
  endTournament: (id) => axios.post(`${API_URL}/tournaments/${id}/end`)
};

export default tournamentService;
