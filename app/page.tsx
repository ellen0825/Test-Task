import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#232829] text-slate-100">
      <header className="flex justify-center bg-[#1D5B43]">
        <div className="w-[1920px] h-[103px] flex flex-col items-center justify-center px-6">
          <p className="font-montserrat font-bold text-[24px] leading-tight text-white/80">
            Успейте открыть пробную неделю
          </p>
          <p className="mt-1 text-lg font-semibold tracking-[0.35em] text-[#FFBB00] text-[40px] font-bold font-Raleway">
            15:59
          </p>
        </div>
      </header>

      <main className="flex flex-col items-center px-4 pb-16 pt-10">
        <section className=" w-[826px] h-[44px]">
          <h1 className="font-montserrat font-bold text-[40px] leading-[110%] tracking-[0.01em] text-white">
            Выбери подходящий для себя{" "}
            <span className="text-[#FDB056] font-montserrat font-bold text-[40px] leading-[110%] tracking-[0.01em]">
              тариф
            </span>
          </h1>
        </section>

        <section className="mt-10 flex w-full justify-center">
          <div className="relative flex w-[1218px] max-w-full rounded-[32px]  px-10 py-10 h-[867px] ">
            {/* Left: man illustration */}
            <div className="flex w-[380.73px] items-end justify-center">
              <Image
                src="/man.svg"
                alt="Мужчина"
                width={381}
                height={767}
                priority
              />
            </div>

            {/* Right: pricing cards */}
            <div className="ml-10 flex-1">
              {/* Main (Forever) tariff */}
              <div className="relative w-[748px] h-[182px] rounded-[32px] border border-[#FDB056] bg-[#313637] px-10 py-8">
                <span className="absolute -top-[0px] 
                left-[40px] flex h-[39px] w-[66px] items-center justify-center rounded-b-[8px]
                 bg-[#FD5656] font-Gilroy text-[22px] leading-none text-white">
                  -70%
                </span>
                <span className="absolute top-[10px] right-[40px] font-montserrat text-[22px] font-bold leading-none text-[#FDB056]">
                  хит!
                </span>
                <div className="mt-1 flex w-[550px] h-[126px] items-center display-flex justify-between ml-[65px]">
                  <div>
                    <p className="font-Montserrat text-[26px] text-white">Навсегда</p>
                    <p className="mt-2 font-montserrat text-[50px] font-semibold leading-none text-[#FDB056]">
                      5990 ₽
                    </p>
                    <p className="mt-1 text-sm text-white/40 line-through">
                      18 990 ₽
                    </p>
                  </div>
                  <p className="max-w-[326px] text-[16px] leading-snug text-white/40 ">
                    Для тех, кто хочет всегда быть в форме
                    <br />
                    и поддерживать здоровье
                  </p>
                </div>
              </div>

              {/* Other tariffs */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                {/* 3 месяца */}
                <div className="relative rounded-[24px] bg-[#313637] h-[335px] w-[240px] p-[24px]">
                      <div className="absolute top-0 left-[16px]">
                        <span className="flex h-[39px] w-[66px] items-center justify-center rounded-b-[8px]
                        bg-[#FD5656] font-montserrat text-[22px] font-bold leading-none text-white">
                          -50%
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-[24px] text-white/80">3 месяца</p>

                        <p className="mt-3 text-[50px] font-semibold text-white">
                          1990 ₽
                        </p>

                        <p className="mt-1 w-full text-[22px] text-white/40 line-through text-right">
                          3990 ₽
                        </p>

                        <p className="mt-4 w-full text-[13px] text-white/70 leading-snug text-left">
                          Привести тело
                          <br />
                          в порядок
                        </p>
                      </div>
                </div>
                {/* 1 месяц */}
                <div className="relative rounded-[24px] bg-[#313637] h-[335px] w-[240px] p-[24px]">
                      <div className="absolute top-0 left-[16px]">
                        <span className="flex h-[39px] w-[66px] items-center justify-center rounded-b-[8px]
                        bg-[#FD5656] font-montserrat text-[22px] font-bold leading-none text-white">
                          -50%
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-[24px] text-white/80">3 месяца</p>

                        <p className="mt-3 text-[50px] font-semibold text-white">
                          1990 ₽
                        </p>

                        <p className="mt-1 w-full text-[22px] text-white/40 line-through text-right">
                          3990 ₽
                        </p>

                        <p className="mt-4 w-full text-[13px] text-white/70 leading-snug text-left">
                          Привести тело
                          <br />
                          в порядок
                        </p>
                      </div>
                </div>

                {/* 1 неделя */}
                <div className="relative rounded-[24px] bg-[#313637] h-[335px] w-[240px] p-[24px]">
                      <div className="absolute top-0 left-[16px]">
                        <span className="flex h-[39px] w-[66px] items-center justify-center rounded-b-[8px]
                        bg-[#FD5656] font-montserrat text-[22px] font-bold leading-none text-white">
                          -50%
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-[24px] text-white/80">3 месяца</p>

                        <p className="mt-3 text-[50px] font-semibold text-white">
                          1990 ₽
                        </p>

                        <p className="mt-1 w-full text-[22px] text-white/40 line-through text-right">
                          3990 ₽
                        </p>

                        <p className="mt-4 w-full text-[13px] text-white/70 leading-snug text-left">
                          Привести тело
                          <br />
                          в порядок
                        </p>
                      </div>
                </div>
              </div>

              {/* Details and CTA */}
              <div className="mt-5 space-y-3 text-xs text-white/80">
                    <div className="mt-5 w-[499px] rounded-[20px] bg-[#2F3436] px-5 py-4 flex items-start gap-3">
  
                      <span className="mt-2 text-[#FFB347] text-[24px]">!</span>

                      <p className="text-[16px] text-white/70 leading-relaxed">
                        Следуя плану на 3 месяца и более, люди получают <br />
                        в 2 раза лучший результат, чем за 1 месяц
                      </p>

                    </div>
                    <div className="flex items-start gap-3 px-3 py-2">
  <input
    type="checkbox"
    className="mt-[3px] w-[18px] h-[18px] accent-[#FFB347] border border-[#FFB347] rounded-sm bg-transparent"
  />

  <p className="text-[14px] text-[#9CA3AF] leading-snug">
    Я согласен(а) с{" "}
    <span className="text-[#FFB347] underline underline-offset-2 cursor-pointer">
      офертой рекуррентных платежей
    </span>{" "}
    и{" "}
    <span className="text-[#FFB347] underline underline-offset-2 cursor-pointer">
      Политикой конфиденциальности
    </span>.
  </p>
</div>
              </div>

              <button className="mt-5 w-full rounded-[999px] bg-[#FFB347] py-3 text-sm font-semibold text-[#2C2F30]  hover:bg-[#FFC765]">
                Купить
              </button>
            </div>
          </div>
        </section>

        {/* Guarantee block */}
        <section className="mt-10 flex w-full justify-center">
          <div className="w-[980px] max-w-full rounded-[24px]  px-8 py-7 shadow-lg shadow-black/50">
            <div className="inline-flex rounded-full bg-[#1D5B43] px-6 py-2 text-sm font-semibold text-white">
              гарантия возврата 30 дней
            </div>
            <p className="mt-4 text-xs text-white/80 sm:text-sm">
              Мы уверены, что наш план сработает для тебя и ты увидишь видимые
              результаты уже через 4 недели! Мы даже готовы полностью вернуть
              твои деньги в течение 30 дней с момента покупки, если ты не
              получишь видимых результатов.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
