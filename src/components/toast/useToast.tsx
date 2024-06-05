"use client";

import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "./context/toastContext";

export default function useToast() {
  const { toasts, addToast, removeToast } = useContext(ToastContext);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 3000);
      setTimerId(timer);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [toasts]);

  return { toasts, addToast, removeToast };
}
