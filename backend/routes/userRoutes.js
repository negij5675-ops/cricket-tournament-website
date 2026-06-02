const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Admin routes
router.get('/', protect, authorize('admin'), userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/:id/role', protect, authorize('admin'), userController.updateUserRole);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

// User profile routes
router.get('/profile/me', protect, userController.getProfile);
router.put('/profile/update', protect, userController.updateUserProfile);

module.exports = router;
