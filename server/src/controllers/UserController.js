const asyncHandler = require('express-async-handler');
const { getUser, clerk } = require('../config/clerk');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await getUser(req.user.id);
  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.publicMetadata?.role || 'user',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  
  const user = await clerk.users.updateUser(req.user.id, {
    firstName,
    lastName
  });

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.publicMetadata?.role || 'user'
    }
  });
});

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await clerk.users.getUserList();
  
  const formattedUsers = users.map(user => ({
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.publicMetadata?.role || 'user',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }));

  res.status(200).json({
    success: true,
    data: formattedUsers
  });
});

// @desc    Update user role (admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const userId = req.params.id;

  if (!['user', 'admin', 'manager'].includes(role)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid role'
    });
  }

  const user = await clerk.users.updateUser(userId, {
    publicMetadata: { role }
  });

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.publicMetadata?.role || 'user'
    }
  });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUserRole
};