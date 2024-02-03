// Button.tsx

import React from "react";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`border border-white hover:bg-gray-600 hover:scale-105 text-white font-bold py-2 px-4 rounded mr-3 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
