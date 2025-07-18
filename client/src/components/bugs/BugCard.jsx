import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, UserIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/formatDate';

const BugCard = ({ bug }) => {
  const navigate = useNavigate();

  const priorityColors = {
    low: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    high: 'text-red-600 dark:text-red-400',
    critical: 'text-red-800 dark:text-red-300'
  };

  const handleClick = () => {
    navigate(`/bugs/${bug._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {bug.title}
          </h3>
          <StatusBadge status={bug.status} />
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {bug.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
              <span className={`font-medium ${priorityColors[bug.priority]}`}>
                {bug.priority}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <UserIcon className="h-4 w-4 mr-1" />
              <span>{bug.assignedTo || 'Unassigned'}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(bug.createdAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BugCard;