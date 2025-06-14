"use client";

import { useState, useEffect } from "react";

export const DigitalClock = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("ja-JP", { 
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      const dateString = now.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short"
      });
      
      setTime(timeString);
      setDate(dateString);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border-2 border-red-400 p-3 font-mono text-center">
      <div className="text-red-400 text-sm mb-1">⏰ DIGITAL CLOCK ⏰</div>
      <div className="bg-gray-900 border border-red-400 p-2 mb-1">
        <div className="text-red-400 text-lg font-bold">{time}</div>
      </div>
      <div className="text-red-400 text-xs">{date}</div>
    </div>
  );
};