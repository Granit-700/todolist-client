import type React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    onClick,
    variant = "primary",
    size = "md",
  } = props;

  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant} btn-${size}`}
    >
      {children}
    </button>
  );
};
