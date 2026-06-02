const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.get('/category/:category', newsController.getNewsByCategory);

// Admin routes
router.post('/', protect, authorize('admin'), newsController.createNews);
router.put('/:id', protect, authorize('admin'), newsController.updateNews);
router.post('/:id/publish', protect, authorize('admin'), newsController.publishNews);
router.delete('/:id', protect, authorize('admin'), newsController.deleteNews);

// User routes
router.post('/:id/view', newsController.incrementNewsView);

module.exports = router;
