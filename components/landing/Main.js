import React, { useState, useMemo } from "react";
import CustomImage from "../base/CustomImage";
import ItemCard from "../base/ItemCard";
import ItemCardMobile from "../base/ItemCardMobile";
import Button from "../base/Button";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Main({ tariffs = [], timerEnded = false }) {
  const { featuredTariff, listTariffs, defaultSelectedId, allTariffs } = useMemo(() => {
    const list = Array.isArray(tariffs) ? [...tariffs] : [];
    const featured = list.find((t) => t.featured) || list[0] || null;
    // All except the featured one (compare by id so we never exclude by reference)
    const rest = featured != null
      ? list.filter((t) => String(t?.id) !== String(featured?.id))
      : list;
    const defaultId = featured?.id ?? list[0]?.id ?? null;
    const all = featured != null ? [featured, ...rest] : rest;
    return { featuredTariff: featured, listTariffs: rest, defaultSelectedId: defaultId, allTariffs: all };
  }, [tariffs]);

  const [selectedPlan, setSelectedPlan] = useState(defaultSelectedId);
  const [agreed, setAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [purchaseSubmitted, setPurchaseSubmitted] = useState(false);
  const isMobile = useMediaQuery("(max-width:380px)");
  const useMobileCard = useMediaQuery("(max-width:960px)");
  const CardComponent = useMobileCard ? ItemCardMobile : ItemCard;
  const selectedTariff = useMemo(
    () => allTariffs.find((t) => String(t?.id) === String(selectedPlan)),
    [allTariffs, selectedPlan]
  );
  return (
    <div className="bg-[#232829] flex justify-center min-h-screen px-4 md:px-12 pt-24 pb-10">

      <div className="max-w-[1000px] w-full mx-auto">

        {/* Title */}
        <div className="py-12" >
          <p className={` ${isMobile ? "text-base":"text-2xl"}  text-white text-Montserrat sm:text-4xl `} >
            Выбери подходящий для себя тариф
            <span className="text-[#FDB056] px-8 text-Montserrat">тариф</span>
          </p>
        </div>

        {/* List of rates offered by the service */}
        {allTariffs.length > 0 && (
          <div className="mb-6 sm:mb-8 rounded-xl bg-[#2F3436] border border-[#484D4E] px-4 sm:px-6 py-3 sm:py-4">
            <p className="text-[#9AA0A6] text-sm sm:text-base mb-2">Тарифы сервиса:</p>
            <ul className="flex flex-wrap gap-2 sm:gap-3">
              {allTariffs.map((t) => (
                <li
                  key={t.id}
                  className="text-white text-sm sm:text-base font-medium px-3 py-1.5 rounded-lg bg-[#3a3f41] border border-[#484D4E]"
                >
                  {t.period || t.title}
                  {t.description ? (
                    <span className="text-[#919191] font-normal text-xs sm:text-sm ml-1.5 block sm:inline">
                      — {t.description}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Image + Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-14 items-start lg:items-center">

          {/* Image */}
          <div className="w-full lg:w-1/3 flex justify-center shrink-0">
            <CustomImage
              src="/images/img.png"
              className="max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] w-full rounded-2xl overflow-hidden"
            />
          </div>

          {/* Right content: side margins on mobile, full width on desktop */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4 sm:gap-6 min-w-0 mx-3 md:mx-0">

            {!featuredTariff && listTariffs.length === 0 && (
              <div className="rounded-3xl bg-[#2F3436] border border-[#484D4E] px-8 py-12 text-center">
                <p className="text-[#B3B3B3] text-lg">Загрузка тарифов...</p>
              </div>
            )}

            {/* Главный (featured) тариф */}
            {featuredTariff && (
              <CardComponent
                price={featuredTariff.price}
                oldPrice={featuredTariff.oldPrice}
                description={featuredTariff.description}
                period={featuredTariff.period}
                title={featuredTariff.title}
                value={featuredTariff.discountPercent ?? 0}
                selected={selectedPlan === featuredTariff.id}
                onClick={() => setSelectedPlan(featuredTariff.id)}
                discountActive={!timerEnded}
                isHit={featuredTariff.isHit}
                featured
              />
            )}

            {/* Остальные тарифы: колонка на малых экранах, ряд из трёх на MD/LG */}
            <div className="flex flex-col md:flex-row md:flex-nowrap gap-4 sm:gap-5 md:gap-6">
              {listTariffs.map((t) => (
                <CardComponent
                  key={t.id}
                  price={t.price}
                  oldPrice={t.oldPrice}
                  description={t.description}
                  period={t.period || t.title}
                  value={t.discountPercent ?? 0}
                  selected={selectedPlan === t.id}
                  onClick={() => setSelectedPlan(t.id)}
                  discountActive={!timerEnded}
                  isHit={t.isHit}
                />
              ))}
            </div>

            {/* Info message */}
            <div className="mt-2 sm:mt-4 flex items-start sm:items-center gap-3 sm:gap-4 rounded-xl sm:rounded-[18px] bg-[#2F3436] px-4 sm:px-6 py-3 sm:py-4 w-full max-w-[520px]">

              <span className="text-[#FDB056] text-2xl  font-bold leading-none shrink-0 mt-0.5 sm:mt-0">
                !
              </span>

              <p className="text-sm sm:text-[15px] text-[#C9C9C9] leading-relaxed">
                Следуя плану на 3 месяца и более, люди получают
                <br />
                в 2 раза лучший результат, чем за 1 месяц
              </p>

            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none w-full">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setCheckboxError(false);
                }}
              />
              <div
                className={`w-[24px] h-[24px] border rounded-sm flex items-center justify-center flex-shrink-0 peer-checked:[&>svg]:opacity-100 ${checkboxError ? "border-red-500 bg-red-500/10" : "border-gray-400"
                  }`}
              >
                <svg
                  className="w-[20px] h-[24px] text-[#FDB056] opacity-0 transition "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
             
                  <p className="text-sm md:text-base text-[#9AA0A6] leading-snug">
                    Я согласен(а) с{" "}
                    <Link
                      href="/offer"
                      className="text-gray-300 underline underline-offset-2"
                    >
                      офертой рекуррентных платежей
                    </Link>{" "}
                    и{" "}
                    <Link
                      href="/privacy"
                      className="text-gray-300 underline underline-offset-2"
                    >
                      Политикой конфиденциальности
                    </Link>
                    .
                  </p>

            </label>

            {/* Button: при нажатии без флажка выделяется красным */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-center sm:justify-start">
                <Button
                  onClick={() => {
                    if (!agreed) {
                      setCheckboxError(true);
                    } else {
                      setPurchaseSubmitted(true);
                    }
                  }}
                  className="w-full sm:w-[352px]"
                  error={checkboxError}
                >
                  Купить
                </Button>
              </div>
              {purchaseSubmitted && selectedTariff && (
                <p className="text-[#81FE95] text-sm sm:text-base font-medium">
                  Спасибо! Выбран тариф: {selectedTariff.period}.
                </p>
              )}
            </div>

            {/* Legal text */}
            <p className="text-[#9B9B9B] text-xs md:text-sm leading-relaxed">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств
              для получения пожизненного доступа к приложению. Пользователь соглашается, что данные
              кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг
              сервиса в случае желания пользователя.
            </p>

          </div>
        </div>

        {/* Guarantee section */}
        <div className="flex flex-col items-start px-6 py-8 rounded-2xl border border-white/10 bg-[#232829] gap-5 mt-14">

          <div className="flex items-center justify-center w-full max-w-[420px] h-[60px] rounded-full border border-green-500">
            <p className="text-[#81FE95] text-base md:text-xl text-left">
              гарантия возврата 30 дней
            </p>
          </div>

          <p className="text-[#A5A5A5] text-sm md:text-lg leading-relaxed text-left">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты
            уже через 4 недели! Мы даже готовы полностью вернуть тебе деньги в течение
            30 дней с момента покупки, если ты не получишь видимых результатов.
          </p>

        </div>

      </div>
    </div>
  );
}