const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.get('/:id/players', teamController.getTeamPlayers);
router.get('/:id/statistics', teamController.getTeamStatistics);

// Team Manager routes
router.post('/', protect, authorize('team-manager', 'admin'), teamController.createTeam);
router.put('/:id', protect, authorize('team-manager', 'admin'), teamController.updateTeam);
router.post('/:id/add-player', protect, authorize('team-manager', 'admin'), teamController.addPlayerToTeam);
router.post('/:id/remove-player', protect, authorize('team-manager', 'admin'), teamController.removePlayerFromTeam);
router.post('/:id/set-captain', protect, authorize('team-manager', 'admin'), teamController.setTeamCaptain);
router.delete('/:id', protect, authorize('team-manager', 'admin'), teamController.deleteTeam);

module.exports = router;
