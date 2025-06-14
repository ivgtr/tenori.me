"use client";

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export const useKonamiCode = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(() => {
    // Check if already activated from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('konami-activated') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Apply the class on mount if already activated
    if (isActivated) {
      document.body.classList.add('konami-activated');
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setSequence(prev => {
        const newSequence = [...prev, event.code];
        
        // Keep only the last 10 keys (length of Konami code)
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        // Check if the sequence matches Konami code
        if (newSequence.length === KONAMI_CODE.length) {
          const matches = newSequence.every((key, index) => key === KONAMI_CODE[index]);
          if (matches && !isActivated) {
            setIsActivated(true);
            // Persist the activation state
            localStorage.setItem('konami-activated', 'true');
            // Add visual feedback
            document.body.classList.add('konami-activated');
            // Play a sound effect if possible
            try {
              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUaATmE2O/FdykCJ3nI8duQSQsJU6bl62hVFAlEnN3vxHkpACR8yO7bjkMIFGCy5e2qXBELTKLh8bhqHAQ9i9n0w3iobTWIwI7hg5IWfKuEpf1iUstmKeBfNtTBo3R1K2kydQzCPDEtaCoOd5mI1r+GVu9fN7K8c7t2OlK8wG9Ew6JqLGx5N4GEz4hjaD8PU7C8b7x3QEbLz48zE5+eTJGWP1B6j4VmMy0EFG6qgJNdgQ==');
              audio.play().catch(() => {}); // Ignore errors if audio can't play
            } catch {}
          }
        }
        
        return newSequence;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActivated]);

  const resetKonami = () => {
    setIsActivated(false);
    setSequence([]);
    localStorage.removeItem('konami-activated');
    document.body.classList.remove('konami-activated');
  };

  return { isActivated, resetKonami };
};