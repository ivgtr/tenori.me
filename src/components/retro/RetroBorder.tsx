import { ReactNode } from "react";

interface RetroBorderProps {
  children: ReactNode;
  variant?: "gradient" | "neon" | "classic" | "double";
  className?: string;
}

export const RetroBorder = ({ children, variant = "classic", className = "" }: RetroBorderProps) => {
  const variants = {
    gradient: "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-1",
    neon: "shadow-[0_0_10px_#00ffff,inset_0_0_10px_#00ffff] border-2 border-cyan-400",
    classic: "border-4 border-gray-400 bg-gray-200 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.3)]",
    double: "border-4 border-gray-300 shadow-[0_0_0_2px_gray]"
  };

  if (variant === "gradient") {
    return (
      <div className={`${variants[variant]} ${className}`}>
        <div className="bg-gray-900 p-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`${variants[variant]} p-4 ${className}`}>
      {children}
    </div>
  );
};