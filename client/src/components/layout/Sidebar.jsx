import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HomeIcon, 
  BugAntIcon, 
  PlusIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
  FolderIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { classNames } from '../../utils/classNames'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'All Bugs', href: '/bugs', icon: BugAntIcon },
  { name: 'Create Bug', href: '/create-bug', icon: PlusIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <BugAntIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
            Bug Tracker
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  isActive
                    ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors duration-200'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={classNames(
                    isActive
                      ? 'text-primary-500 dark:text-primary-300'
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                    'mr-3 h-6 w-6 transition-colors duration-200'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar