import React, { useState } from "react";
import CustomImage from "../base/CustomImage";
import Badge from "../base/Badge";
import ItemCard from "../base/ItemCard";
import Button from "../base/Button";

const PLAN_FOREVER = "forever";
const PLAN_1990 = "1990";
const PLAN_990 = "990";
const PLAN_690 = "690";

export default function Main() {
  const [selectedPlan, setSelectedPlan] = useState(PLAN_FOREVER);

  return (
    <div className="bg-[#232829] flex justify-center min-h-screen px-4 md:px-12 pt-24 pb-10">

      <div className="max-w-[1218px] w-full">

        {/* Title */}
        <div className="flex flex-col sm:flex-row py-8 gap-2 sm:gap-4">
          <div className="text-3xl sm:text-4xl text-white font-semibold">
            Выбери подходящий для себя
          </div>
          <div className="text-3xl sm:text-4xl text-[#FDB056] font-semibold">
            тариф
          </div>
        </div>

        {/* Image + Content */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <CustomImage
              src="/images/img.png"
              className="max-w-[380px] w-full"
            />
          </div>

          {/* Right content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">

            {/* Main price card */}
            <button
              type="button"
              onClick={() => setSelectedPlan(PLAN_FOREVER)}
              className={`w-full relative rounded-3xl bg-[#313637] border-2 text-left cursor-pointer ${
                selectedPlan === PLAN_FOREVER
                  ? "border-[#FDB056] ring-2 ring-[#FDB056]/50"
                  : "border-[#FDB056]"
              }`}
            >
              <Badge value={70} />

              <div className="absolute top-4 right-6 text-lg text-[#FDB056]">
                хит!
              </div>

              <div className="flex flex-col md:flex-row px-10 md:px-16 py-10 gap-6 items-center">
                <div className="md:w-1/3 flex flex-col justify-center items-center text-center">
                  <div className="text-white text-xl md:text-2xl mb-2">
                    Навсегда
                  </div>
                  <div
                    className={`text-4xl md:text-5xl font-bold leading-none ${
                      selectedPlan === PLAN_FOREVER ? "text-[#FDB056]" : "text-[#FDB056]"
                    }`}
                  >
                    5990 ₽
                  </div>
                  <div className="text-[#7E7E7E] text-lg line-through mt-1">
                    18 990 ₽
                  </div>
                </div>
                <div className="md:w-2/3 flex text-[#CFCFCF] text-sm md:text-lg leading-relaxed items-center text-center md:text-left">
                  Для тех, кто хочет всегда быть в форме
                  <br />
                  и поддерживать здоровье
                </div>
              </div>
            </button>

            {/* Item cards */}
            <div className="flex flex-col sm:flex-row gap-6">
              <ItemCard
                price={1990}
                oldPrice={3990}
                description="asdfasdf"
                value={50}
                selected={selectedPlan === PLAN_1990}
                onClick={() => setSelectedPlan(PLAN_1990)}
              />
              <ItemCard
                price={990}
                oldPrice={1690}
                description="asdfasdf"
                value={50}
                selected={selectedPlan === PLAN_990}
                onClick={() => setSelectedPlan(PLAN_990)}
              />
              <ItemCard
                price={690}
                oldPrice={990}
                description="asdfasdf"
                value={50}
                selected={selectedPlan === PLAN_690}
                onClick={() => setSelectedPlan(PLAN_690)}
              />
            </div>

            {/* Info message */}
            <div className="mt-3 flex items-start gap-3 rounded-[22px] bg-[#2F3436] px-4 py-4 w-full">

              <span className="mt-[6px] text-[#FDB056] text-xl">
                !
              </span>

              <p className="text-sm md:text-base text-[#C9C9C9] leading-[1.5]">
                Следуя плану на 3 месяца и более, люди получают
                <br/>
                в 2 раза лучший результат, чем за 1 месяц
              </p>

            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none w-full">

              <input type="checkbox" className="peer sr-only"/>

              <div className="w-[24px] h-[24px] border border-gray-400 rounded-sm flex items-center justify-center peer-checked:[&>svg]:opacity-100">

                <svg
                  className="w-[14px] h-[14px] text-[#FDB056] opacity-0 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12"/>
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
            <Button>
              Купить
            </Button>

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
        <div className="flex flex-col  px-6 py-8 rounded-2xl border border-white/10 bg-[#232829] gap-5 mt-14">

          <div className="flex items-center justify-center w-[420px] h-[60px] rounded-full border border-green-500">
            <p className="text-[#81FE95] text-xl">
              гарантия возврата 30 дней
            </p>
          </div>

          <p className="text-[#A5A5A5] text-sm md:text-lg leading-relaxed ">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты
            уже через 4 недели! Мы даже готовы полностью вернуть тебе деньги в течение
            30 дней с момента покупки, если ты не получишь видимых результатов.
          </p>

        </div>

      </div>
    </div>
  );
}