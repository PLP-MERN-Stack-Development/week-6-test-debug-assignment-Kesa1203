import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { ThemeProvider } from './contexts/ThemeContext'
import { NotificationProvider } from './contexts/NotificationContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  const { isLoaded, isSignedIn, user } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // You can add any additional auth logic here
      console.log('User signed in:', user?.emailAddresses?.[0]?.emailAddress)
    }
  }, [isLoaded, isSignedIn, user])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <AppRoutes />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App