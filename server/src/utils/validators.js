const Joi = require('joi');

const createBugSchema = Joi.object({
  title: Joi.string().required().trim().max(100),
  description: Joi.string().required().trim().max(1000),
  priority: Joi.string().valid('low', 'medium', 'high', 'critical').default('medium'),
  severity: Joi.string().valid('minor', 'major', 'critical').default('minor'),
  type: Joi.string().valid('bug', 'feature', 'enhancement', 'task').default('bug'),
  assignee: Joi.string().allow(null, ''),
  project: Joi.string().required().trim(),
  tags: Joi.array().items(Joi.string().trim()),
  dueDate: Joi.date().allow(null)
});

const updateBugSchema = Joi.object({
  title: Joi.string().trim().max(100),
  description: Joi.string().trim().max(1000),
  priority: Joi.string().valid('low', 'medium', 'high', 'critical'),
  status: Joi.string().valid('open', 'in-progress', 'testing', 'closed'),
  severity: Joi.string().valid('minor', 'major', 'critical'),
  type: Joi.string().valid('bug', 'feature', 'enhancement', 'task'),
  assignee: Joi.string().allow(null, ''),
  project: Joi.string().trim(),
  tags: Joi.array().items(Joi.string().trim()),
  dueDate: Joi.date().allow(null)
});

const commentSchema = Joi.object({
  content: Joi.string().required().trim().max(500)
});

const validateCreateBug = (req, res, next) => {
  const { error } = createBugSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUpdateBug = (req, res, next) => {
  const { error } = updateBugSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateCreateBug,
  validateUpdateBug,
  validateComment
};