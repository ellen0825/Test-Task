import React, { useState } from "react";

export default function Header() {
  return (
    <div
      className="fixed w-full bg-[#1D5B43] z-50 py-2 px-0 md:px-20"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="text-white text-2xl text-center">Успейте открыть пробную неделю</div>
        <div className="text-red-700 font-bold text-3xl text-center text-[#FFBB00] text-[40px]">+ 00:00 +</div>
      </div>

    </div>
  );
}
