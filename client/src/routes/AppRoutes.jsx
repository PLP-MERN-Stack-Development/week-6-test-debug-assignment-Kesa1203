import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import ProtectedRoute from './ProtectedRoute'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'

// Pages
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import VerifyEmail from '../pages/VerifyEmail'
import BugDetails from '../pages/BugDetails'
import CreateBug from '../pages/CreateBug'
import Settings from '../pages/Settings'

const AppRoutes = () => {
  const { isSignedIn } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bug/:id" element={<BugDetails />} />
          <Route path="/create-bug" element={<CreateBug />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
            <a 
              href={isSignedIn ? "/dashboard" : "/"} 
              className="btn-primary"
            >
              {isSignedIn ? "Go to Dashboard" : "Go Home"}
            </a>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default AppRoutes