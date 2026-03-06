import React from "react";
import Badge from "./Badge";
import useMediaQuery from "@mui/material/useMediaQuery";

const mainPriceFontClasses =
  "font-bold leading-tight tracking-tight text-[42px]";

export default function ItemCard({
  value = "",
  price = 0,
  oldPrice = 0,
  description = "",
  period = "",
  title,
  selected = false,
  onClick,
  discountActive = true,
  isHit = false,
  featured = false,
}) {
  const titleLabel = title ?? period;
  const isMobile = useMediaQuery("(max-width:600px)");

  const badgeWrap = (
    <div
      className={`absolute top-0 ${
        !isMobile ? "left-7" : "right-20"
      } transition-all ${
        discountActive
          ? "opacity-100 scale-100"
          : "pointer-events-none opacity-0 scale-95"
      }`}
    >
      <Badge value={value} />
    </div>
  );

  const hitLabel =
    isHit && discountActive ? (
      <div
        className={`text-[#FDB056] font-semibold ${
          !isMobile ? "text-xl" : "text-base"
        } ${
          featured
            ? "absolute top-3 right-4 sm:top-4 sm:right-6"
            : "absolute top-3 right-3 sm:top-4 sm:right-4"
        }`}
      >
        хит!
      </div>
    ) : null;

  const baseCardClasses = `w-full relative rounded-3xl text-left cursor-pointer overflow-hidden ${
    selected
      ? "border-2 border-[#FDB056] ring-2 ring-[#FDB056]/50"
      : "border-2 border-[#484D4E]"
  }`;

  /* ================= FEATURED CARD ================= */

  if (featured) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseCardClasses} bg-[#2d3234]`}
      >
        {badgeWrap}
        {hitLabel}

        <div className="flex flex-col md:flex-row px-5 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10 gap-6 sm:gap-8 md:gap-12 items-center">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-white text-xl mb-1">{titleLabel}</div>

            <div
              className={`${mainPriceFontClasses} ${
                selected ? "text-[#FDB056]" : "text-white"
              }`}
            >
              {price} ₽
            </div>

            <div className="text-[#919191] text-xl line-through">
              {oldPrice} ₽
            </div>
          </div>

          <div
            className={`line-clamp-2 w-full md:w-2/3 text-[#CFCFCF] ${
              isMobile ? "text-base" : "text-xl"
            } leading-relaxed text-center md:text-left whitespace-pre-line px-2 sm:px-0`}
          >
            {description}
          </div>
        </div>
      </button>
    );
  }

  /* ================= NORMAL CARD ================= */

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseCardClasses} bg-[#313637] min-w-0 flex-1 flex flex-col px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8`}
    >
      {badgeWrap}
      {hitLabel}

      {/* period */}
      <div
        className={`text-white text-center mt-8 sm:mt-10 mb-3 sm:mb-4 font-medium ${
          isMobile ? "text-xl" : "text-[28px]"
        }`}
      >
        {period}
      </div>

      {/* MOBILE LAYOUT */}
      {isMobile ? (
        <div className="flex items-center justify-between w-full mt-2 p-[10px] gap-2">
  
  {/* price */}
  <div className="flex flex-col text-right shrink-0">
    <div
      className={`${selected ? "text-[#FDB056]" : "text-white"} 
      font-bold leading-tight tracking-tight
      text-[28px] sm:text-[32px]`}
    >
      {price} ₽
    </div>

    <div className="text-[#919191] text-xs sm:text-sm line-through">
      {oldPrice} ₽
    </div>
  </div>

  {/* description */}
  <div className="text-[#CFCFCF] text-xs sm:text-sm text-left flex-1 leading-snug line-clamp-2 break-words">
    {description}
  </div>

</div>
      ) : (
        <>
          {/* DESKTOP PRICE */}
          <div className="flex flex-col items-center">
            <div
              className={`${mainPriceFontClasses} ${
                selected ? "text-[#FDB056]" : "text-white"
              }`}
            >
              {price} ₽
            </div>

            <div className="text-[#919191] text-xl line-through mt-1">
              {oldPrice} ₽
            </div>
          </div>

          <div className="text-[#B3B3B3] mt-6 leading-snug text-left text-[20px] line-clamp-2">
            {description}
          </div>
        </>
      )}
    </button>
  );
}