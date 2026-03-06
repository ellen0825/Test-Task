import React from "react";
import Badge from "./Badge";
import useMediaQuery from "@mui/material/useMediaQuery";

const priceBlockClasses = "transition-all duration-300 ease-out";
const discountHideClasses = "pointer-events-none opacity-0 scale-95";
const discountShowClasses = "opacity-100 scale-100";
/** Single source of truth so price font is identical with and without discount */
const mainPriceFontClasses = "font-bold leading-tight tracking-tight text-[42px]";

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
      className={`absolute top-0 ${!isMobile ? "left-7" : "right-20"} transition-all duration-300 ease-out ${discountActive ? "opacity-100 scale-100" : discountHideClasses
        }`}
    >
      <Badge value={value} />
    </div>
  );

  const hitLabel =
    isHit && discountActive ? (
      <div
        className={`text-[#FDB056] font-semibold text-xl  ${featured ? "absolute top-3 right-4 sm:top-4 sm:right-6" : "absolute top-3 right-3 sm:top-4 sm:right-4"
          }`}
      >
        хит!
      </div>
    ) : null;

  const priceContent = (showTitle) => (
    <>
      {showTitle && (
        <div className="text-white mb-1 sm:mb-2 text-xl font-medium">
          {titleLabel}
        </div>
      )}
      <div
        className={`${mainPriceFontClasses} ${selected ? "text-[#FDB056]" : "text-white"}`}
      >
        {price} ₽
      </div>
      <div className="w-full text-xl text-[#919191] line-through text-right mt-0.5 sm:mt-1">
        {oldPrice} ₽
      </div>
    </>
  );

  const priceContentFull = (showTitle) => (
    <>
      {showTitle && (
        <div className="text-white mb-1 sm:mb-2 text-xl font-medium">
          {titleLabel}
        </div>
      )}
      <div
        className={`${mainPriceFontClasses} ${selected ? "text-[#FDB056]" : "text-white"}`}
      >
        {oldPrice} ₽
      </div>
      {/* Invisible spacer so layout matches discount state and price position stays fixed */}
      <div className="w-full text-xl text-transparent line-through text-right mt-0.5 sm:mt-1 select-none" aria-hidden="true">
        0 ₽
      </div>
    </>
  );

  const priceBlock = (
    <div
      className={`flex flex-col justify-center items-center text-center relative min-h-[100px] sm:min-h-[120px] ${featured ? "w-full md:w-1/3" : ""
        }`}
    >
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center ${priceBlockClasses} ${discountActive ? discountShowClasses : discountHideClasses
          }`}
      >
        {priceContent(featured)}
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center ${priceBlockClasses} ${discountActive ? discountHideClasses : discountShowClasses
          }`}
      >
        {priceContentFull(featured)}
      </div>
    </div>
  );

  const baseCardClasses = `w-full relative rounded-3xl text-left cursor-pointer overflow-hidden ${selected ? "border-2 border-[#FDB056] ring-2 ring-[#FDB056]/50" : "border-2 border-[#484D4E]"
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
          {priceBlock}
          <div className="w-full md:w-2/3 text-[#CFCFCF] text-[15px]  leading-relaxed text-center md:text-left whitespace-pre-line px-2 sm:px-0">
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
      <div
        className={`absolute top-0 ${!isMobile ? "left-6" : "right-8"} ${priceBlockClasses} ${discountActive ? discountShowClasses : discountHideClasses
          }`}
      >
        <Badge value={value} />
      </div>
      {hitLabel}
      <div className="text-[28px] text-white text-center mt-8 sm:mt-10 mb-3 sm:mb-4 font-medium">
        {period}
      </div>
      {priceBlock}
      <div className="text-[13px] text-[#B3B3B3] mt-4 sm:mt-6 leading-snug text-left">
        <div>{description}</div>
        <div className="text-[#9a9a9a]">в порядок</div>
      </div>
    </button>
  );
}