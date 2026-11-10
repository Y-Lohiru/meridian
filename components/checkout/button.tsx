// components/checkout/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "py-4 px-6 text-sm tracking-button uppercase transition-colors duration-200 font-medium cursor-pointer disabled:opacity-50";

  const variants = {
    primary: "bg-brand text-on-brand hover:bg-[#443023]",
    secondary: "bg-surface-cream text-[#332218] hover:bg-[#E8E3DA]",
    outline:
      "border border-brand text-[#332218] hover:bg-brand hover:text-on-brand",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
