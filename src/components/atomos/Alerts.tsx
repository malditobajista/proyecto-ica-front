import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export type AlertType = 'success' | 'error' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const alertClasses = {
    success: 'bg-secondary border-primary bg-opacity-10 text-primary',
    error: 'bg-error bg-opacity-10 border-error text-error',
    info: 'bg-blue-200 bg-opacity-90 border-background-neutral text-primary',
  };

  const iconMap = {
    success: <FaCheckCircle className="w-5 h-5" />,
    error: <FaExclamationCircle className="w-5 h-5" />,
    info: <FaInfoCircle className="w-5 h-5" />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 justify-end items-end pointer-events-none">
      <div className={`max-w-sm w-[350px] mt-16 shadow-md rounded-lg pointer-events-auto ${alertClasses[type]} border-l-4`}>
        <div className="p-4 flex items-start">
          <div className="flex-shrink-0">
            {iconMap[type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              onClick={() => {
                setIsVisible(false);
                if (onClose) onClose();
            }}
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;

