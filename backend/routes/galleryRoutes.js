const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', galleryController.getAllGallery);
router.get('/:id', galleryController.getGalleryById);
router.get('/match/:matchId', galleryController.getMatchGallery);
router.get('/tournament/:tournamentId', galleryController.getTournamentGallery);
router.get('/team/:teamId', galleryController.getTeamGallery);

// Protected routes
router.post('/', protect, upload.single('media'), galleryController.uploadMedia);
router.put('/:id', protect, galleryController.updateGallery);
router.post('/:id/like', protect, galleryController.likeMedia);
router.post('/:id/comment', protect, galleryController.addComment);
router.delete('/:id', protect, galleryController.deleteMedia);

module.exports = router;
