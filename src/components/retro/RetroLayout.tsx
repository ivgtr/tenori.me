import { ReactNode } from "react";
import { RetroBackground } from "./RetroBackground";
import { Marquee } from "./Marquee";

interface RetroLayoutProps {
  children: ReactNode;
  showBackground?: boolean;
  marqueeText?: string;
  className?: string;
}

export const RetroLayout = ({ 
  children, 
  showBackground = true,
  marqueeText = "🌟 ようこそ個人サイトへ 🌟 リンクフリー 🌟",
  className = ""
}: RetroLayoutProps) => {
  return (
    <div className={`retro-layout min-h-screen ${className}`}>
      {showBackground && <RetroBackground />}
      {marqueeText && (
        <Marquee className="mb-4">
          {marqueeText}
        </Marquee>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};