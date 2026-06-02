const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', tournamentController.getAllTournaments);
router.get('/:id', tournamentController.getTournamentById);
router.get('/:id/matches', tournamentController.getTournamentMatches);
router.get('/:id/leaderboard', tournamentController.getTournamentLeaderboard);

// Admin only routes
router.post('/', protect, authorize('admin'), tournamentController.createTournament);
router.put('/:id', protect, authorize('admin'), tournamentController.updateTournament);
router.delete('/:id', protect, authorize('admin'), tournamentController.deleteTournament);
router.post('/:id/add-team', protect, authorize('admin'), tournamentController.addTeamToTournament);
router.post('/:id/remove-team', protect, authorize('admin'), tournamentController.removeTeamFromTournament);
router.post('/:id/start', protect, authorize('admin'), tournamentController.startTournament);
router.post('/:id/end', protect, authorize('admin'), tournamentController.endTournament);

module.exports = router;
