import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl bg-[#FDB056]
        w-[352px] h-[66px]
        text-[20px]
        text-black font-semibold hover:bg-[#f6a03f] animate-blink ${className}`}
    >
      {children}
    </button>
  );
}
