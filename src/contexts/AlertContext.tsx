import React, { createContext, useContext, useState, ReactNode } from 'react';
import Alert, { AlertType } from '../components/atomos/Alerts';

interface AlertContextProps {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<{ type: AlertType; message: string }[]>([]);

  const showAlert = (type: AlertType, message: string) => {
    setAlerts((prev) => [...prev, { type, message }]);
    setTimeout(() => {
      setAlerts((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2">
        {alerts.map((alert, idx) => (
          <Alert key={idx} type={alert.type} message={alert.message} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
