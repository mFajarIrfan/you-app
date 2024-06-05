"use client";

import { createContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  type: string;
  message: string;
}

interface ToastContext {
  toasts: Toast[];
  addToast: (type: string, message: string) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContext>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: string, message: string) => {
    const id = Math.floor(Math.random() * 10000000);
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
