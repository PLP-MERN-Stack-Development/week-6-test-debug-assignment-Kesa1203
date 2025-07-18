import api from './api';

export const userService = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Get all users (admin only)
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user role (admin only)
  updateUserRole: async (userId, role) => {
    const response = await api.patch(`/users/${userId}/role`, { role });
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },

  // Get user's bugs
  getUserBugs: async (userId) => {
    const response = await api.get(`/users/${userId}/bugs`);
    return response.data;
  },

  // Get user activity
  getUserActivity: async (userId) => {
    const response = await api.get(`/users/${userId}/activity`);
    return response.data;
  },

  // Sync user with Clerk
  syncUser: async (clerkData) => {
    const response = await api.post('/users/sync', clerkData);
    return response.data;
  },

  // Get user preferences
  getPreferences: async () => {
    const response = await api.get('/users/preferences');
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  // Verify email with code
  verifyEmail: async (verificationData) => {
    const response = await api.post('/users/verify-email', verificationData);
    return response.data;
  },

  // Resend verification email
  resendVerificationEmail: async (userId) => {
    const response = await api.post('/users/resend-verification', { userId });
    return response.data;
  }
};

// Export individual functions for convenience
export const {
  getProfile,
  updateProfile,
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getUserBugs,
  getUserActivity,
  syncUser,
  getPreferences,
  updatePreferences,
  verifyEmail,
  resendVerificationEmail
} = userService;