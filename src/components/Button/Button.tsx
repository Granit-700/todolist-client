import type React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "text";
};

export const Button = ({ children, onClick, variant="primary" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={variant}
    >
      {children}
    </button>
  );
};
