import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { 
  Bars3Icon, 
  BellIcon, 
  MagnifyingGlassIcon,
  PlusIcon 
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { classNames } from '../../utils/classNames'

const Header = ({ setSidebarOpen }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Search */}
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search bugs
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search bugs..."
                    type="search"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Create Bug Button */}
            <Link
              to="/create-bug"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Bug
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                    userButtonPopoverCard: "dark:bg-gray-800",
                    userButtonPopoverActionButton: "dark:text-gray-200 dark:hover:bg-gray-700",
                  },
                }}
                afterSignOutUrl="/"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header