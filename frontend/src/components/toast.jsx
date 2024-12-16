import React, { useEffect } from "react";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Cleanup timeout
  }, [duration, onClose]);

  const toastStyles = {
    base: "fixed bottom-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white",
    types: {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
      warning: "bg-yellow-500",
    },
  };

  return (
    <div
      className={`${toastStyles.base} ${
        toastStyles.types[type] || toastStyles.types.info
      }`}
    >
      <p>{message}</p>
      <button
        className="ml-4 bg-transparent text-white font-bold"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
