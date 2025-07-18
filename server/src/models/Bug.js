const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'testing', 'closed'],
    default: 'open'
  },
  severity: {
    type: String,
    enum: ['minor', 'major', 'critical'],
    default: 'minor'
  },
  type: {
    type: String,
    enum: ['bug', 'feature', 'enhancement', 'task'],
    default: 'bug'
  },
  reporter: {
    type: String,
    required: [true, 'Reporter is required']
  },
  assignee: {
    type: String,
    default: null
  },
  project: {
    type: String,
    required: [true, 'Project is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  dueDate: {
    type: Date,
    default: null
  },
  comments: [{
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  attachments: [{
    filename: String,
    url: String,
    uploadedBy: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for better performance
bugSchema.index({ reporter: 1 });
bugSchema.index({ assignee: 1 });
bugSchema.index({ status: 1 });
bugSchema.index({ priority: 1 });
bugSchema.index({ project: 1 });
bugSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Bug', bugSchema);