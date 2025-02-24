import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
