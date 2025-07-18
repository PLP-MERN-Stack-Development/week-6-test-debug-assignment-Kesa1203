import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { classNames } from '../../utils/classNames'

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white border-transparent focus:ring-primary-500',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent focus:ring-gray-500',
  outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 focus:ring-primary-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent focus:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-700',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500',
  success: 'bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500',
  warning: 'bg-yellow-600 hover:bg-yellow-700 text-white border-transparent focus:ring-yellow-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const classes = classNames(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  )

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button