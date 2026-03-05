import React from "react";
import Badge from "./Badge";

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

  const badgeWrap = (
    <div
      className={`absolute top-0 left-12 transition-all duration-300 ease-out ${
        discountActive ? "opacity-100 scale-100" : discountHideClasses
      }`}
    >
      <Badge value={value} />
    </div>
  );

  const hitLabel = isHit && discountActive && (
    <div className={`text-[#FDB056] text-lg ${featured ? "absolute top-4 right-6" : "absolute top-4 right-4"}`}>
      хит!
    </div>
  );

  const priceContent = (showTitle) => (
    <>
      {showTitle && (
        <div className={`text-white mb-2 ${featured ? "text-xl md:text-2xl" : ""}`}>
          {titleLabel}
        </div>
      )}
      <div
        className={`font-bold leading-none ${selected ? "text-[#FDB056]" : "text-white"} ${
          featured ? "text-4xl md:text-5xl" : "text-[50px] font-[Montserrat]"
        }`}
      >
        {price} ₽
      </div>
      <div className={`line-through mt-1 ${featured ? "text-[#7E7E7E] text-lg" : "w-full text-[24px] text-[#919191] font-[Montserrat] text-right"}`}>
        {oldPrice} ₽
      </div>
    </>
  );

  const priceContentFull = (showTitle) => (
    <>
      {showTitle && (
        <div className={`text-white mb-2 ${featured ? "text-xl md:text-2xl" : ""}`}>
          {titleLabel}
        </div>
      )}
      <div
        className={`font-bold leading-none ${selected ? "text-[#FDB056]" : "text-white"} ${
          featured ? "text-4xl md:text-5xl" : "text-[50px] font-[Montserrat]"
        }`}
      >
        {oldPrice} ₽
      </div>
    </>
  );

  const priceBlock = (
    <div className={`flex flex-col justify-center items-center text-center relative min-h-[120px] ${featured ? "md:w-1/3" : ""}`}>
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

  if (featured) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-full relative rounded-3xl bg-[#313637] border-2 text-left cursor-pointer overflow-hidden ${
          selected ? "border-[#FDB056] ring-2 ring-[#FDB056]/50" : "border-[#484D4E]"
        }`}
      >
        {badgeWrap}
        {hitLabel}
        <div className="flex flex-col md:flex-row px-10 md:px-16 py-10 gap-6 items-center">
          {priceBlock}
          <div className="md:w-2/3 flex text-[#CFCFCF] text-sm md:text-lg leading-relaxed items-center text-center md:text-left whitespace-pre-line">
            {description}
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full md:w-1/3 bg-[#313637] border-2 rounded-3xl relative px-6 py-8 flex flex-col text-left cursor-pointer overflow-hidden ${
        selected ? "border-[#FDB056] ring-2 ring-[#FDB056]/50" : "border-[#484D4E]"
      }`}
    >
      <div
        className={`absolute top-0 left-6 ${priceBlockClasses} ${
          discountActive ? discountShowClasses : discountHideClasses
        }`}
      >
        <Badge value={value} />
      </div>
      {hitLabel}
      <div className="text-[31px] text-white text-center mt-6 mb-4 font-[Montserrat]">
        {period}
      </div>
      {priceBlock}
      <div className="text-[15px] text-[#B3B3B3] mt-6 leading-snug text-left">
        <div>{description}</div>
        <div>в порядок</div>
      </div>
    </button>
  );
}