import React from "react";
import Badge from "./Badge";

const priceBlockClasses = "transition-all duration-300 ease-out";
const discountHideClasses = "pointer-events-none opacity-0 scale-95";
const discountShowClasses = "opacity-100 scale-100";

/**
 * Mobile-optimized ItemCard. Same props as ItemCard, layout tuned for small screens.
 */
export default function ItemCardMobile({
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

  const baseCardClasses = `w-full relative rounded-2xl cursor-pointer overflow-hidden ${
    selected
      ? "border-2 border-[#FDB056] ring-2 ring-[#FDB056]/50"
      : "border-2 border-[#484D4E]"
  }`;

  /* Top-right: discount % slightly to the left, "хит!" attached to the right edge (8px in) */
  const topRightBadges = (
    <div className="absolute top-0 right-8 z-10 flex flex-row items-center gap-2 pr-2">
      <div className={`transition-all duration-300 ease-out ${discountActive ? "opacity-100 scale-100" : discountHideClasses}`}>
        <Badge value={value} />
      </div>
      {isHit && discountActive && (
        <span className="text-[#FDB056] font-semibold text-xs sm:text-base whitespace-nowrap">хит!</span>
      )}
    </div>
  );

  const priceContent = (showTitle) => (
    <>
      {showTitle && (
        <div className="text-white mb-1 text-sm sm:text-lg font-medium">{titleLabel}</div>
      )}
      <div className="relative">
        <div
          className={`font-bold leading-tight tracking-tight ${
            selected ? "text-[#FDB056]" : "text-white"
          } text-[2rem] sm:text-[2.5rem]`}
        >
          {price} ₽
        </div>
        <div className="text-xs sm:text-sm text-[#919191] line-through mt-0.5 text-right">
          {oldPrice} ₽
        </div>
      </div>
    </>
  );

  const priceContentFull = (showTitle) => (
    <>
      {showTitle && (
        <div className="text-white mb-1 text-sm sm:text-lg font-medium">{titleLabel}</div>
      )}
      <div
        className={`font-bold leading-tight tracking-tight ${
          selected ? "text-[#FDB056]" : "text-white"
        } text-xl sm:text-2xl`}
      >
        {oldPrice} ₽
      </div>
    </>
  );

  const priceBlock = (
    <div className="flex flex-col justify-center items-start text-left relative min-h-[70px]">
      <div
        className={`flex flex-col justify-center items-start text-left ${priceBlockClasses} ${
          discountActive ? discountShowClasses : discountHideClasses
        }`}
      >
        {priceContent(featured)}
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-center items-start text-left ${priceBlockClasses} ${
          discountActive ? discountHideClasses : discountShowClasses
        }`}
      >
        {priceContentFull(featured)}
      </div>
    </div>
  );

  /* Right column: description aligned to top (same height as period), left-aligned text */
  const descriptionBlock = (
    <div className="flex flex-col items-start justify-start gap-2 min-w-0 flex-1">
      <div className="w-full text-left text-white text-sm sm:text-base leading-snug min-w-0">
        <p className="text-[#CFCFCF] line-clamp-2 break-words">
          {description}
        </p>
        {!featured && (
          <p className="text-[#9a9a9a] text-xs sm:text-sm mt-0.5">в порядок</p>
        )}
      </div>
    </div>
  );

  /* Shared two-column grid: 50/50; symmetric padding so content isn’t tilted */
  const cardGridClasses = "grid grid-cols-2 gap-4 sm:gap-6 px-5 sm:px-8 pt-14 sm:pt-20 pb-5 sm:pb-6 items-start min-h-[100px]";

  /* ================= FEATURED CARD (MOBILE) ================= */
  if (featured) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseCardClasses} bg-[#2d3234] ${cardGridClasses}`}
      >
        {topRightBadges}
        <div className="min-w-0 flex flex-col items-start justify-center text-left">
          {priceBlock}
        </div>
        <div className="flex flex-col items-start justify-start gap-2 min-w-0">
          <p className="text-[#CFCFCF] text-sm sm:text-base text-left leading-snug w-full line-clamp-2 break-words">
            {description}
          </p>
        </div>
      </button>
    );
  }

  /* ================= NORMAL CARD (MOBILE) ================= */
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseCardClasses} bg-[#313637] min-w-0 ${cardGridClasses}`}
    >
      {topRightBadges}
      <div className="min-w-0 flex flex-col items-start justify-center text-left">
        <div className="text-sm sm:text-base text-white font-medium mb-0.5">{period}</div>
        {priceBlock}
      </div>
      {descriptionBlock}
    </button>
  );
}
