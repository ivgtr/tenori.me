import { ReactNode, ButtonHTMLAttributes } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "neon";
  size?: "small" | "medium" | "large";
}

export const RetroButton = ({ 
  children, 
  variant = "primary", 
  size = "medium", 
  className = "",
  ...props 
}: RetroButtonProps) => {
  const variants = {
    primary: "bg-gray-300 border-gray-400 hover:bg-gray-200 text-black shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.3)] active:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.3)]",
    secondary: "bg-blue-600 hover:bg-blue-500 text-white border-blue-800 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-2px_4px_rgba(0,0,0,0.5)]",
    neon: "bg-black border-2 border-cyan-400 text-cyan-400 shadow-[0_0_10px_#00ffff] hover:shadow-[0_0_20px_#00ffff] hover:text-white"
  };

  const sizes = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        border-2 font-bold cursor-pointer transition-all duration-150
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};