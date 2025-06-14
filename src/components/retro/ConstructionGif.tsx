"use client";

import { BlinkingText } from "./BlinkingText";

interface ConstructionGifProps {
  message?: string;
  className?: string;
}

export const ConstructionGif = ({ 
  message = "🚧 このページは工事中です 🚧", 
  className = "" 
}: ConstructionGifProps) => {
  return (
    <div className={`flex items-center justify-center gap-2 bg-yellow-300 border-2 border-black p-2 ${className}`}>
      <div className="text-2xl animate-bounce">🚧</div>
      <BlinkingText className="font-bold text-black text-center">
        {message}
      </BlinkingText>
      <div className="text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>🚧</div>
    </div>
  );
};