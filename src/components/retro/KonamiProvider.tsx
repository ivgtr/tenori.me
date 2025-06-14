"use client";

import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useEffect } from 'react';

interface KonamiProviderProps {
  children: React.ReactNode;
}

export const KonamiProvider = ({ children }: KonamiProviderProps) => {
  const { isActivated } = useKonamiCode();

  useEffect(() => {
    if (isActivated) {
      // Check if notification was already shown this session
      const notificationShown = sessionStorage.getItem('konami-notification-shown');
      
      if (!notificationShown) {
        // Show notification only once per session
        const notification = document.createElement('div');
        notification.textContent = '🎮 Konami Code Activated! 🌈 (Permanent until reload)';
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.9);
          color: #00ff00;
          padding: 12px 18px;
          border: 2px solid #00ff00;
          border-radius: 8px;
          font-family: monospace;
          font-size: 14px;
          z-index: 10000;
          animation: fade-in-out 6s ease-in-out forwards;
          box-shadow: 0 0 20px rgba(0,255,0,0.3);
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
          @keyframes fade-in-out {
            0% { opacity: 0; transform: translateX(100%) scale(0.8); }
            15%, 85% { opacity: 1; transform: translateX(0) scale(1); }
            100% { opacity: 0; transform: translateX(100%) scale(0.8); }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Mark notification as shown for this session
        sessionStorage.setItem('konami-notification-shown', 'true');
        
        // Clean up after animation
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        }, 6000);
      }
    }
  }, [isActivated]);

  return <>{children}</>;
};