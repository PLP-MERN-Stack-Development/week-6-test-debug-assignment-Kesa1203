const express = require('express');
const {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
  addComment,
  getStatistics
} = require('../controllers/bugController');
const { protect, authorize } = require('../middleware/auth');
const { validateCreateBug, validateUpdateBug, validateComment } = require('../utils/validators');

const router = express.Router();

// All routes are protected
router.use(protect);

// Statistics route (must be before /:id)
router.get('/stats', getStatistics);

router.route('/')
  .get(getBugs)
  .post(validateCreateBug, createBug);

router.route('/:id')
  .get(getBug)
  .put(validateUpdateBug, updateBug)
  .delete(authorize('admin', 'manager'), deleteBug);

router.post('/:id/comments', validateComment, addComment);

module.exports = router;