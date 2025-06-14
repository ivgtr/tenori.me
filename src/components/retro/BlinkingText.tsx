"use client";

import { ReactNode } from "react";

interface BlinkingTextProps {
  children: ReactNode;
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export const BlinkingText = ({ children, speed = "normal", className = "" }: BlinkingTextProps) => {
  const speeds = {
    slow: "animate-pulse",
    normal: "animate-pulse",
    fast: "animate-pulse"
  };

  const customStyle = {
    animationDuration: speed === "slow" ? "2s" : speed === "fast" ? "0.5s" : "1s"
  };

  return (
    <span 
      className={`${speeds[speed]} ${className}`}
      style={customStyle}
    >
      {children}
    </span>
  );
};