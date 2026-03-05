import React from "react";
import Badge from "./Badge";

export default function ItemCard({
  value = "",
  price = 0,
  oldPrice = 0,
  description = "",
  selected = false,
  onClick,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full md:w-1/3 bg-[#313637] border-2 rounded-3xl relative px-6 py-8 flex flex-col text-left cursor-pointer ${
        selected ? "border-[#FDB056] ring-2 ring-[#FDB056]/50" : "border-[#484D4E]"
      }`}
    >
      <Badge value={value} />

      <div className="flex flex-col items-center text-center mt-6">
        <div className="text-[26px] text-white mb-4">
          3 месяца
        </div>
        <div
          className={`text-[50px] font-bold ${selected ? "text-[#FDB056]" : "text-white"}`}
        >
          {price} ₽
        </div>
      </div>

      <div className="text-[29px] text-[#8C8C8C] line-through text-right mt-1">
        {oldPrice} ₽
      </div>

      <div className="text-[16px] text-[#B3B3B3] mt-8 leading-snug">
        <div>{description}</div>
        <div>в порядок</div>
      </div>
    </button>
  );
}
