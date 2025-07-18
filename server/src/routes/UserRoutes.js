const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUserRole
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.put('/:id/role', authorize('admin'), updateUserRole);

module.exports = router;