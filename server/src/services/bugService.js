const Bug = require('../models/Bug');

class BugService {
  async createBug(bugData) {
    try {
      const bug = new Bug(bugData);
      return await bug.save();
    } catch (error) {
      throw error;
    }
  }

  async getBugs(filters = {}, options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        status,
        priority,
        assignee,
        reporter,
        project,
        search
      } = options;

      const query = {};

      // Apply filters
      if (status) query.status = status;
      if (priority) query.priority = priority;
      if (assignee) query.assignee = assignee;
      if (reporter) query.reporter = reporter;
      if (project) query.project = project;

      // Search functionality
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

      const bugs = await Bug.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Bug.countDocuments(query);

      return {
        bugs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async getBugById(id) {
    try {
      const bug = await Bug.findById(id);
      if (!bug) {
        throw new Error('Bug not found');
      }
      return bug;
    } catch (error) {
      throw error;
    }
  }

  async updateBug(id, updateData) {
    try {
      const bug = await Bug.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
      });
      if (!bug) {
        throw new Error('Bug not found');
      }
      return bug;
    } catch (error) {
      throw error;
    }
  }

  async deleteBug(id) {
    try {
      const bug = await Bug.findByIdAndDelete(id);
      if (!bug) {
        throw new Error('Bug not found');
      }
      return bug;
    } catch (error) {
      throw error;
    }
  }

  async addComment(bugId, commentData) {
    try {
      const bug = await Bug.findById(bugId);
      if (!bug) {
        throw new Error('Bug not found');
      }

      bug.comments.push(commentData);
      return await bug.save();
    } catch (error) {
      throw error;
    }
  }

  async getStatistics() {
    try {
      const stats = await Bug.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            open: { $sum: { $cond: [{ $eq: ['$status', 'open'] }, 1, 0] } },
            inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] } },
            testing: { $sum: { $cond: [{ $eq: ['$status', 'testing'] }, 1, 0] } },
            closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } },
            critical: { $sum: { $cond: [{ $eq: ['$priority', 'critical'] }, 1, 0] } },
            high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
            medium: { $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] } },
            low: { $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] } }
          }
        }
      ]);

      return stats[0] || {
        total: 0,
        open: 0,
        inProgress: 0,
        testing: 0,
        closed: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BugService();