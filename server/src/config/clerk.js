const { clerkClient, verifyToken } = require('@clerk/clerk-sdk-node');

// Function to verify a Clerk JWT token
const verifyClerkToken = async (token) => {
  try {
    const payload = await verifyToken(token);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Function to get a user from Clerk by their userId
const getUser = async (userId) => {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user;
  } catch (error) {
    throw new Error('User not found');
  }
};

// Export everything you need
module.exports = {
  clerkClient,
  verifyClerkToken,
  getUser
};
