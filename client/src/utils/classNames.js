/**
 * Utility function to conditionally join class names
 * @param {...(string|object|Array)} classes - Class names to join
 * @returns {string} Joined class names
 */
export const classNames = (...classes) => {
  return classes
    .flat()
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') {
        return cls;
      }
      if (typeof cls === 'object' && cls !== null) {
        return Object.keys(cls).filter(key => cls[key]).join(' ');
      }
      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Utility function for conditional classes
 * @param {string} baseClasses - Base classes to always include
 * @param {string} conditionalClasses - Classes to include if condition is true
 * @param {boolean} condition - Condition to evaluate
 * @returns {string} Joined class names
 */
export const conditionalClasses = (baseClasses, conditionalClasses, condition) => {
  return classNames(baseClasses, condition && conditionalClasses);
};

/**
 * Utility function for variant-based classes
 * @param {string} baseClasses - Base classes
 * @param {object} variants - Object mapping variant names to classes
 * @param {string} variant - Current variant
 * @returns {string} Joined class names
 */
export const variantClasses = (baseClasses, variants, variant) => {
  return classNames(baseClasses, variants[variant] || variants.default);
};

/**
 * Utility function for size-based classes
 * @param {string} baseClasses - Base classes
 * @param {object} sizes - Object mapping size names to classes
 * @param {string} size - Current size
 * @returns {string} Joined class names
 */
export const sizeClasses = (baseClasses, sizes, size) => {
  return classNames(baseClasses, sizes[size] || sizes.default);
};