import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Welcome back to Bug Tracker
          </p>
        </div>

        <div className="flex justify-center">
          <SignIn 
            routing="path"
            path="/login"
            signUpUrl="/register"
            fallbackRedirectUrl="/dashboard" // ✅ modern prop
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white dark:bg-gray-800 shadow-lg",
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Login
