const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.get('/:id/statistics', playerController.getPlayerStatistics);
router.get('/:id/matches', playerController.getPlayerMatches);

// Protected routes
router.post('/', protect, playerController.createPlayer);
router.put('/:id', protect, playerController.updatePlayer);
router.delete('/:id', protect, playerController.deletePlayer);

module.exports = router;
