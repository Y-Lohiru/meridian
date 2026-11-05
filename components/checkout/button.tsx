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
    "py-4 px-6 text-sm tracking-wider uppercase transition-colors duration-200 font-medium cursor-pointer disabled:opacity-50";

  const variants = {
    primary: "bg-[#332218] text-white hover:bg-[#443023]",
    secondary: "bg-[#F2EFE9] text-[#332218] hover:bg-[#E8E3DA]",
    outline:
      "border border-[#332218] text-[#332218] hover:bg-[#332218] hover:text-white",
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
