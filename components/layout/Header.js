import React, { useState, useEffect } from "react";

const TOTAL_SECONDS = 2 * 60; // 2 minutes
const WARNING_THRESHOLD = 30;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function Header() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const isWarning = secondsLeft <= WARNING_THRESHOLD && secondsLeft > 0;

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed w-full bg-[#1D5B43] z-50 py-2 px-0 md:px-20">
      <div className="flex flex-col justify-center items-center">
        <div className="text-white text-2xl text-center">
          Успейте открыть пробную неделю
        </div>
        <div
          className={`font-bold text-3xl text-center text-[40px] ${
            isWarning
              ? "text-red-500 animate-blink"
              : "text-[#FFBB00]"
          }`}
        >
          + {formatTime(secondsLeft)} +
        </div>
      </div>
    </div>
  );
}
