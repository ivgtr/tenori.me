"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export const Marquee = ({ 
  children, 
  direction = "left", 
  speed = "normal", 
  className = "" 
}: MarqueeProps) => {
  const speeds = {
    slow: "animate-[marquee_20s_linear_infinite]",
    normal: "animate-[marquee_10s_linear_infinite]",
    fast: "animate-[marquee_5s_linear_infinite]"
  };

  const directions = {
    left: speeds[speed],
    right: speeds[speed].replace("marquee", "marquee-reverse")
  };

  return (
    <div className={`overflow-hidden whitespace-nowrap bg-black text-green-400 py-1 ${className}`}>
      <div className={`inline-block ${directions[direction]}`}>
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};