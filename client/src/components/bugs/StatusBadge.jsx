import React from 'react';
import { classNames } from '../../utils/classNames';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    open: {
      label: 'Open',
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    },
    resolved: {
      label: 'Resolved',
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    closed: {
      label: 'Closed',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    },
  };

  const config = statusConfig[status] || statusConfig.open;

  return (
    <span className={classNames(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config.color
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;