import React from "react";

export default function Button({ children, onClick, className = "", error = false, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl
        w-[352px] h-[66px]
        text-[20px]
        font-semibold animate-blink transition-none
        ${error
          ? "bg-red-500/90 text-white ring-2 ring-red-400 ring-offset-2 ring-offset-[#232829] hover:bg-red-600"
          : "bg-[#FDB056] text-black hover:bg-[#f6a03f]"
        }
        ${disabled && !error ? "opacity-60 cursor-not-allowed" : ""}
        ${className}`}
    >
      {children}
    </button>
  );
}
