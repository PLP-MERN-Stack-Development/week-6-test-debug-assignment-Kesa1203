const asyncHandler = require('express-async-handler');
const bugService = require('../services/bugService');

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Private
const getBugs = asyncHandler(async (req, res) => {
  const result = await bugService.getBugs({}, req.query);
  res.status(200).json({
    success: true,
    data: result.bugs,
    pagination: result.pagination
  });
});

// @desc    Get single bug
// @route   GET /api/bugs/:id
// @access  Private
const getBug = asyncHandler(async (req, res) => {
  const bug = await bugService.getBugById(req.params.id);
  res.status(200).json({
    success: true,
    data: bug
  });
});

// @desc    Create new bug
// @route   POST /api/bugs
// @access  Private
const createBug = asyncHandler(async (req, res) => {
  const bugData = {
    ...req.body,
    reporter: req.user.id
  };

  const bug = await bugService.createBug(bugData);
  res.status(201).json({
    success: true,
    data: bug
  });
});

// @desc    Update bug
// @route   PUT /api/bugs/:id
// @access  Private
const updateBug = asyncHandler(async (req, res) => {
  const bug = await bugService.updateBug(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: bug
  });
});

// @desc    Delete bug
// @route   DELETE /api/bugs/:id
// @access  Private
const deleteBug = asyncHandler(async (req, res) => {
  await bugService.deleteBug(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Bug deleted successfully'
  });
});

// @desc    Add comment to bug
// @route   POST /api/bugs/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const commentData = {
    ...req.body,
    author: req.user.id
  };

  const bug = await bugService.addComment(req.params.id, commentData);
  res.status(201).json({
    success: true,
    data: bug
  });
});

// @desc    Get bug statistics
// @route   GET /api/bugs/stats
// @access  Private
const getStatistics = asyncHandler(async (req, res) => {
  const stats = await bugService.getStatistics();
  res.status(200).json({
    success: true,
    data: stats
  });
});

module.exports = {
  getBugs,
  getBug,
  createBug,
  updateBug,
  deleteBug,
  addComment,
  getStatistics
};