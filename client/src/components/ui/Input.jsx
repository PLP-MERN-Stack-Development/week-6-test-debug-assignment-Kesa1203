import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { classNames } from '../../utils/classNames'

const Input = forwardRef(({
  label,
  error,
  helper,
  type = 'text',
  placeholder,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const stateClasses = error 
    ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:text-red-400'
    : 'border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:text-white'

  const bgClasses = 'bg-white dark:bg-gray-700'

  const classes = classNames(
    baseClasses,
    stateClasses,
    bgClasses,
    className
  )

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <motion.input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
        whileFocus={{ scale: 1.01 }}
        {...props}
      />
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
      
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helper}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input