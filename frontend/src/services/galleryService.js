import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const galleryService = {
  getAllGallery: () => axios.get(`${API_URL}/gallery`),
  getGalleryById: (id) => axios.get(`${API_URL}/gallery/${id}`),
  uploadMedia: (formData) => axios.post(`${API_URL}/gallery`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateGallery: (id, data) => axios.put(`${API_URL}/gallery/${id}`, data),
  deleteMedia: (id) => axios.delete(`${API_URL}/gallery/${id}`),
  getMatchGallery: (matchId) => axios.get(`${API_URL}/gallery/match/${matchId}`),
  getTournamentGallery: (tournamentId) => axios.get(`${API_URL}/gallery/tournament/${tournamentId}`),
  getTeamGallery: (teamId) => axios.get(`${API_URL}/gallery/team/${teamId}`),
  likeMedia: (id) => axios.post(`${API_URL}/gallery/${id}/like`),
  addComment: (id, text) => axios.post(`${API_URL}/gallery/${id}/comment`, { text })
};

export default galleryService;
