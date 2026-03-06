import React, { useState, useMemo } from "react";
import CustomImage from "../base/CustomImage";
import ItemCard from "../base/ItemCard";
import Button from "../base/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function Main({ tariffs = [], timerEnded = false }) {
  const { featuredTariff, listTariffs, defaultSelectedId } = useMemo(() => {
    const list = Array.isArray(tariffs) ? [...tariffs] : [];
    const featured = list.find((t) => t.featured) || list[0] || null;
    // All except the featured one (compare by id so we never exclude by reference)
    const rest = featured != null
      ? list.filter((t) => String(t?.id) !== String(featured?.id))
      : list;
    const defaultId = featured?.id ?? list[0]?.id ?? null;
    return { featuredTariff: featured, listTariffs: rest, defaultSelectedId: defaultId };
  }, [tariffs]);

  const [selectedPlan, setSelectedPlan] = useState(defaultSelectedId);
  const [agreed, setAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const isMobile = useMediaQuery("(max-width:330px)");
  return (
    <div className="bg-[#232829] flex justify-center min-h-screen px-4 md:px-12 pt-24 pb-10">

      <div className="max-w-[1218px] w-full">

        {/* Title */}
        <div className="py-12" >
          <p className={` ${isMobile ? "text-base":"text-2xl"}  text-white text-Montserrat sm:text-4xl `} >
            Выбери подходящий для себя тариф
            <span className="text-[#FDB056] px-8 text-Montserrat">тариф</span>
          </p>
        </div>

        {/* Image + Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-14 items-start lg:items-center">

          {/* Image */}
          <div className="w-full lg:w-1/3 flex justify-center shrink-0">
            <CustomImage
              src="/images/img.png"
              className="max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] w-full rounded-2xl overflow-hidden"
            />
          </div>

          {/* Right content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4 sm:gap-6 min-w-0">

            {!featuredTariff && listTariffs.length === 0 && (
              <div className="rounded-3xl bg-[#2F3436] border border-[#484D4E] px-8 py-12 text-center">
                <p className="text-[#B3B3B3] text-lg">Загрузка тарифов...</p>
              </div>
            )}

            {/* Главный (featured) тариф */}
            {featuredTariff && (
              <ItemCard
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

            {/* Остальные тарифы */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 flex-wrap">
              {listTariffs.map((t) => (
                <ItemCard
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

              <span className="text-[#FDB056] text-base sm:text-lg leading-none shrink-0 mt-0.5 sm:mt-0">
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
                  className="w-[14px] h-[14px] text-[#FDB056] opacity-0 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <p className="text-sm md:text-base text-[#9AA0A6] leading-snug">
                Я согласен(а) с{" "}
                <span className="text-gray-300 underline underline-offset-2">
                  офертой рекуррентных платежей
                </span>{" "}
                и{" "}
                <span className="text-gray-300 underline underline-offset-2">
                  Политикой конфиденциальности
                </span>.
              </p>

            </label>

            {/* Button */}
            <div className="flex justify-center sm:justify-start">
              <Button
                onClick={() => {
                  if (!agreed) {
                    setCheckboxError(true);
                  } else {
                    // покупка
                  }
                }}
                className="w-full sm:w-[352px]"
              >
                Купить
              </Button>
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