import React from "react";
import Badge from "./Badge";

export default function ItemCard({
  value = "",
  price = 0,
  oldPrice = 0,
  description = "",
  period = "3 месяца",
  selected = false,
  onClick,
  discountActive = true,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full md:w-1/3 bg-[#313637] border-2 rounded-3xl relative px-6 py-8 flex flex-col text-left cursor-pointer overflow-hidden ${
        selected ? "border-[#FDB056] ring-2 ring-[#FDB056]/50" : "border-[#484D4E]"
      }`}
    >
      <div
        className={`absolute top-0 left-12 transition-all duration-300 ease-out ${
          discountActive ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        <Badge value={value} />
      </div>

      <div className="flex flex-col items-center text-center mt-6 relative min-h-[140px]">
        <div className="text-[26px] text-white mb-4">{period}</div>
        <div
          className={`absolute left-0 right-0 flex flex-col items-center transition-all duration-300 ease-out ${
            discountActive ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
          }`}
        >
          <div className={`text-[50px] font-bold ${selected ? "text-[#FDB056]" : "text-white"}`}>
            {price} ₽
          </div>
        </div>
        <div
          className={`absolute left-0 right-0 flex flex-col items-center transition-all duration-300 ease-out ${
            discountActive ? "pointer-events-none opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className={`text-[50px] font-bold ${selected ? "text-[#FDB056]" : "text-white"}`}>
            {oldPrice} ₽
          </div>
        </div>
      </div>

      <div
        className={`text-[29px] text-[#8C8C8C] text-right mt-1 transition-all duration-300 ease-out ${
          discountActive ? "line-through opacity-100" : "opacity-0"
        }`}
      >
        {oldPrice} ₽
      </div>

      <div className="text-[16px] text-[#B3B3B3] mt-8 leading-snug">
        <div>{description}</div>
        <div>в порядок</div>
      </div>
    </button>
  );
}
