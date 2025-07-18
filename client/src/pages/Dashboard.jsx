import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBugs } from '../hooks/useBugs';
import BugList from '../components/bugs/BugList';
import { PlusIcon, ChartBarIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const { bugs, loading, error, fetchBugs } = useBugs();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    critical: 0
  });

  useEffect(() => {
    fetchBugs();
  }, []);

  useEffect(() => {
    if (bugs.length > 0) {
      const newStats = {
        total: bugs.length,
        open: bugs.filter(bug => bug.status === 'open').length,
        inProgress: bugs.filter(bug => bug.status === 'in-progress').length,
        resolved: bugs.filter(bug => bug.status === 'resolved').length,
        critical: bugs.filter(bug => bug.priority === 'critical').length
      };
      setStats(newStats);
    }
  }, [bugs]);

  const statCards = [
    {
      title: 'Total Bugs',
      value: stats.total,
      icon: ChartBarIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Open',
      value: stats.open,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: ChartBarIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || 'Developer'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Here's what's happening with your projects today.
            </p>
          </div>
          <Link
            to="/create-bug"
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Report Bug
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor} dark:text-white`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recent Bugs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Bugs
            </h2>
          </div>
          <div className="p-6">
            {error ? (
              <div className="text-center py-8 text-red-600">
                <p>Error loading bugs: {error}</p>
              </div>
            ) : bugs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No bugs reported yet. Start by creating your first bug report!</p>
              </div>
            ) : (
              <BugList bugs={bugs.slice(0, 5)} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;