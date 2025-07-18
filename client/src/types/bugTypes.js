// Bug status types
export const BUG_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
};

// Bug priority types
export const BUG_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// User role types
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

// Bug sort options
export const BUG_SORT_OPTIONS = {
  CREATED_DESC: 'createdAt_desc',
  CREATED_ASC: 'createdAt_asc',
  UPDATED_DESC: 'updatedAt_desc',
  UPDATED_ASC: 'updatedAt_asc',
  PRIORITY_DESC: 'priority_desc',
  PRIORITY_ASC: 'priority_asc',
  STATUS: 'status'
};

// Bug filter types
export const BUG_FILTERS = {
  ALL: 'all',
  MY_BUGS: 'my_bugs',
  ASSIGNED_TO_ME: 'assigned_to_me',
  RECENT: 'recent'
};

// Form validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};

// API response types
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
};

// Theme types
export const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Bug default values
export const BUG_DEFAULTS = {
  status: BUG_STATUS.OPEN,
  priority: BUG_PRIORITY.MEDIUM,
  tags: []
};

// Form field types
export const FORM_FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file'
};

// Date format types
export const DATE_FORMATS = {
  FULL: 'full',
  SHORT: 'short',
  RELATIVE: 'relative',
  TIME_ONLY: 'time'
};

// Permission types
export const PERMISSIONS = {
  CREATE_BUG: 'create_bug',
  UPDATE_BUG: 'update_bug',
  DELETE_BUG: 'delete_bug',
  ASSIGN_BUG: 'assign_bug',
  VIEW_ALL_BUGS: 'view_all_bugs',
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics'
};

// Error types
export const ERROR_TYPES = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization',
  NOT_FOUND: 'not_found',
  SERVER: 'server'
};

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};