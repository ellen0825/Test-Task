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
  const isNarrow = useMediaQuery("(max-width:1000px)"); // price + description side by side below 1000px

  const badgeWrap = (
    <div
      className={`absolute top-0 ${
        isMobile ? "right-3 top-3 flex flex-col gap-1 items-end" : "left-7"
      } transition-all ${
        discountActive
          ? "opacity-100 scale-100"
          : "pointer-events-none opacity-0 scale-95"
      }`}
    >
      {discountActive && <Badge value={value} />}
      {isMobile && isHit && discountActive && (
        <span className="text-[#FDB056] font-semibold text-base">хит!</span>
      )}
    </div>
  );

  const hitLabel =
    !isMobile && isHit && discountActive ? (
      <div className="text-[#FDB056] font-semibold text-xl absolute top-3 right-4 sm:top-4 sm:right-6">
        хит!
      </div>
    ) : null;

  const baseCardClasses = `w-full relative rounded-3xl text-left cursor-pointer overflow-hidden ${
    selected
      ? "border-2 border-[#FDB056] ring-2 ring-[#FDB056]/50"
      : "border-2 border-[#484D4E]"
  }`;
  const narrowPaddingLeft = isMobile ? "pl-5" : "pl-20";
  const narrowPaddingRight = isMobile ? "pr-24" : "pr-20";
  const narrowPaddingTop = "pt-14";

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

        {isNarrow ? (
          <div className={`flex flex-col items-start w-full text-left ${narrowPaddingLeft} ${narrowPaddingRight} ${narrowPaddingTop} pb-6`}>
            <div className="text-white text-xl font-medium mb-3">{titleLabel}</div>
            <div className="flex items-start gap-4 w-full min-w-0">
              <div className="flex flex-col shrink-0 max-w-[45%]">
                <div
                  className={`${mainPriceFontClasses} ${
                    selected ? "text-[#FDB056]" : "text-white"
                  } text-[28px] sm:text-[34px]`}
                >
                  {price} ₽
                </div>
                <div className="text-[#919191] text-base sm:text-lg line-through mt-0.5">
                  {oldPrice} ₽
                </div>
              </div>
              <div className="text-[#CFCFCF] text-sm sm:text-base leading-relaxed flex-1 min-w-0">
                {description}
              </div>
            </div>
          </div>
        ) : (
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
            <div className="line-clamp-2 w-full md:w-2/3 text-[#CFCFCF] text-xl leading-relaxed text-center md:text-left whitespace-pre-line px-2 sm:px-0">
              {description}
            </div>
          </div>
        )}
      </button>
    );
  }

  /* ================= NORMAL CARD ================= */

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseCardClasses} bg-[#313637] min-w-0 flex-1 flex flex-col ${isNarrow ? `${narrowPaddingLeft} ${narrowPaddingRight} py-5` : "px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8"}`}
    >
      {badgeWrap}
      {hitLabel}

      {isNarrow ? (
        <>
          <div className={`text-white font-medium text-xl mb-2 text-left pt-14`}>
            {period}
          </div>
          <div className="flex items-start gap-3 w-full mt-2 min-w-0">
            <div className="flex flex-col shrink-0 text-left max-w-[42%]">
              <div
                className={`${mainPriceFontClasses} ${
                  selected ? "text-[#FDB056]" : "text-white"
                } text-[26px] sm:text-[30px]`}
              >
                {price} ₽
              </div>
              <div className="text-[#919191] text-xs sm:text-sm line-through mt-0.5">
                {oldPrice} ₽
              </div>
            </div>
            <div className="text-[#CFCFCF] text-xs sm:text-sm text-left flex-1 min-w-0 leading-relaxed">
              {description}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-white font-medium text-center mt-8 sm:mt-10 mb-3 sm:mb-4 text-[28px]">
            {period}
          </div>
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