import api from './api';

export const bugService = {
  // Get all bugs with optional filters
  getBugs: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    const response = await api.get(`/bugs?${params}`);
    return response.data;
  },

  // Get bug by ID
  getBugById: async (id) => {
    const response = await api.get(`/bugs/${id}`);
    return response.data;
  },

  // Create new bug
  createBug: async (bugData) => {
    const response = await api.post('/bugs', bugData);
    return response.data;
  },

  // Update bug
  updateBug: async (id, bugData) => {
    const response = await api.put(`/bugs/${id}`, bugData);
    return response.data;
  },

  // Delete bug
  deleteBug: async (id) => {
    const response = await api.delete(`/bugs/${id}`);
    return response.data;
  },

  // Get bug statistics
  getBugStats: async () => {
    const response = await api.get('/bugs/stats');
    return response.data;
  },

  // Assign bug to user
  assignBug: async (bugId, userId) => {
    const response = await api.patch(`/bugs/${bugId}/assign`, { assignedTo: userId });
    return response.data;
  },

  // Update bug status
  updateBugStatus: async (bugId, status) => {
    const response = await api.patch(`/bugs/${bugId}/status`, { status });
    return response.data;
  },

  // Add comment to bug
  addComment: async (bugId, comment) => {
    const response = await api.post(`/bugs/${bugId}/comments`, { comment });
    return response.data;
  },

  // Get comments for bug
  getComments: async (bugId) => {
    const response = await api.get(`/bugs/${bugId}/comments`);
    return response.data;
  }
};

// Export individual functions for convenience
export const {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug,
  getBugStats,
  assignBug,
  updateBugStatus,
  addComment,
  getComments
} = bugService;