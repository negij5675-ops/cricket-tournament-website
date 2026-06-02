const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchById);
router.get('/:id/scorecard', matchController.getMatchScorecard);
router.get('/:id/statistics', matchController.getMatchStatistics);

// Admin routes
router.post('/', protect, authorize('admin'), matchController.createMatch);
router.put('/:id', protect, authorize('admin'), matchController.updateMatch);
router.post('/:id/start', protect, authorize('admin'), matchController.startMatch);
router.post('/:id/end', protect, authorize('admin'), matchController.endMatch);
router.post('/:id/update-score', protect, authorize('admin'), matchController.updateScore);
router.post('/:id/record-wicket', protect, authorize('admin'), matchController.recordWicket);
router.post('/:id/set-man-of-match', protect, authorize('admin'), matchController.setManOfTheMatch);
router.delete('/:id', protect, authorize('admin'), matchController.deleteMatch);

module.exports = router;
