import React from "react";
import Badge from "./Badge";
import useMediaQuery from "@mui/material/useMediaQuery";

const priceBlockClasses = "transition-all duration-300 ease-out";
const discountHideClasses = "pointer-events-none opacity-0 scale-95";
const discountShowClasses = "opacity-100 scale-100";

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
  const isMobile = useMediaQuery("(max-width:350px)");

  const badgeWrap = (
    <div
      className={`absolute top-0 left-4 sm:left-6 transition-all duration-300 ease-out ${
        discountActive ? "opacity-100 scale-100" : discountHideClasses
      }`}
    >
      <Badge value={value} />
    </div>
  );

  const hitLabel =
    isHit && discountActive ? (
      <div
        className={`text-[#FDB056] font-semibold text-xs sm:text-sm ${
          featured
            ? "absolute top-3 right-4 sm:top-4 sm:right-6"
            : "absolute top-3 right-3 sm:top-4 sm:right-4"
        }`}
      >
        хит!
      </div>
    ) : null;

  const priceContent = (showTitle) => (
    <>
      {showTitle && (
        <div className="text-white mb-1 sm:mb-2 text-sm font-medium">
          {titleLabel}
        </div>
      )}

      {/* PRICE + OLD PRICE: main price then discount price right-aligned below */}
      <div className="w-full">
        <div
          className={`font-bold leading-tight tracking-tight ${
            selected ? "text-[#FDB056]" : "text-white"
          } text-xl md:text-[40px]`}
        >
          {price} ₽
        </div>
        {/* OLD PRICE — right below the price, aligned right; slightly larger text */}
        <div className="w-full text-sm sm:text-base md:text-lg text-[#919191] line-through text-right mt-0.5 sm:mt-1 md:pr-[40px] lg:pr-[0px]">
          {oldPrice} ₽
        </div>
      </div>
    </>
  );

  const priceContentFull = (showTitle) => (
    <>
      {showTitle && (
        <div className="text-white mb-1 sm:mb-2 text-sm sm:text-base font-medium">
          {titleLabel}
        </div>
      )}

      <div
        className={`font-bold leading-tight tracking-tight ${
          selected ? "text-[#FDB056]" : "text-white"
        } text-xl md:text-[18px]`}
      >
        {oldPrice} ₽
      </div>
    </>
  );

  const priceBlock = (
    <div
      className={`flex flex-col justify-center items-center text-center relative min-h-[72px] sm:min-h-[90px] ${
        featured ? "w-full md:w-1/3" : ""
      }`}
    >
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center ${priceBlockClasses} ${
          discountActive ? discountShowClasses : discountHideClasses
        }`}
      >
        {priceContent(featured)}
      </div>

      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center ${priceBlockClasses} ${
          discountActive ? discountHideClasses : discountShowClasses
        }`}
      >
        {priceContentFull(featured)}
      </div>
    </div>
  );

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

        <div className="flex flex-col md:flex-row px-5 sm:px-6 md:px-12 lg:px-16 py-5 sm:py-6 md:py-8 gap-4 sm:gap-6 md:gap-8 items-center">
          {priceBlock}

          <div className="w-full md:w-2/3 text-[#CFCFCF] text-xs sm:text-sm lg:text-[13px] md:text-[16px] leading-relaxed text-center md:text-left whitespace-pre-line px-2 sm:px-0">
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
      className={`${baseCardClasses} bg-[#313637] min-w-0 flex-1 flex flex-col px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6`}
    >
      <div
        className={`absolute top-0 ${
          !isMobile ? "left-5" : "right-10"
        } ${priceBlockClasses} ${
          discountActive ? discountShowClasses : discountHideClasses
        }`}
      >
        <Badge value={value} />
      </div>

      {hitLabel}

      <div className="text-base sm:text-lg md:text-xl lg:text-[17px] text-white text-center mt-6 sm:mt-8 mb-2 sm:mb-3 font-medium">
        {period}
      </div>

      {priceBlock}

      {/* DESCRIPTION */}
      <div className="lg:text-[12px] md:text-[16px] text-[#B3B3B3] mt-3 sm:mt-4 leading-snug text-left">
        <div>{description}</div>
        <div className="text-[#9a9a9a]">в порядок</div>
      </div>
    </button>
  );
}