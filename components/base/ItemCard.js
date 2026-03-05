import React from "react";
import Badge from "./Badge";

export default function ItemCard({
  value = "",
  price = 0,
  oldPrice = 0,
  description = "",
  period = "",
  selected = false,
  onClick,
  discountActive = true,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full md:w-1/3 bg-[#313637] border-2 rounded-3xl relative px-6 py-8 flex flex-col text-left cursor-pointer overflow-hidden transition ${
        selected
          ? "border-[#FDB056] ring-2 ring-[#FDB056]/50"
          : "border-[#484D4E]"
      }`}
    >
      
      {/* Discount badge */}
      <div
        className={`absolute top-0 left-6 transition-all duration-300 ${
          discountActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Badge value={value} />
      </div>

      {/* Period */}
      <div className="text-[31px] text-white text-center mt-6 mb-4 font-[Montserrat]">
        {period}
      </div>

      {/* Price */}
      <div className="flex flex-col items-center">
        {discountActive ? (
          <>
            <div
              className={`text-[50px] font-bold font-[Montserrat]  ${
                selected ? "text-[#FDB056]" : "text-white"
              }`}
            >
              {price} ₽
            </div>

            <div className="w-full text-[24px] text-[#919191] font-[Montserrat] line-through text-right">
              {oldPrice} ₽
            </div>
          </>
        ) : (
          <div
            className={`text-[24px] font-bold font-[Montserrat] ${
              selected ? "text-[#FDB056]" : "text-white"
            }`}
          >
            {oldPrice} ₽
          </div>
        )}
      </div>

      {/* Description */}
      <div className="text-[15px] text-[#B3B3B3] mt-6 leading-snug text-left">
        <div>{description}</div>
        <div>в порядок</div>
      </div>

    </button>
  );
}