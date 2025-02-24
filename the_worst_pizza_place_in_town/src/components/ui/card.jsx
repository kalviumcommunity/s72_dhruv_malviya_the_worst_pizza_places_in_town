import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`p-4 border rounded-xl shadow-md bg-gray-800 text-white ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export { Card, CardContent };
