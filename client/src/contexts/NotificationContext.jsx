import React, { createContext, useContext, useCallback } from 'react'
import toast from 'react-hot-toast'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const showSuccess = useCallback((message, options = {}) => {
    toast.success(message, {
      duration: 3000,
      ...options,
    })
  }, [])

  const showError = useCallback((message, options = {}) => {
    toast.error(message, {
      duration: 5000,
      ...options,
    })
  }, [])

  const showInfo = useCallback((message, options = {}) => {
    toast(message, {
      duration: 4000,
      icon: 'ℹ️',
      ...options,
    })
  }, [])

  const showWarning = useCallback((message, options = {}) => {
    toast(message, {
      duration: 4000,
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#fff',
      },
      ...options,
    })
  }, [])

  const showLoading = useCallback((message, options = {}) => {
    return toast.loading(message, {
      ...options,
    })
  }, [])

  const dismiss = useCallback((toastId) => {
    toast.dismiss(toastId)
  }, [])

  const dismissAll = useCallback(() => {
    toast.dismiss()
  }, [])

  const value = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
    dismissAll,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}