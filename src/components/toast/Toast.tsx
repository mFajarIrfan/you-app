"use client";

import React from "react";
import useToast from "./useToast";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`w-fit h-fit flex flex-row items-center justify-center p-4 gap-6 bg-white/[.08] rounded-lg text-white shadow-lg mb-4 ${
              toast.type === "success"
                ? "shadow-green-300/[.3]"
                : "shadow-red-500/[.3]"
            }`}
          >
            <span>{toast.message}</span>
            <span onClick={() => removeToast(toast.id)}>
              <FiX />
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
