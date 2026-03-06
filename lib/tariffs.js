/**
 * Test task: React, Next.js, Tailwind.
 * Data from: https://t-core.fit-hub.pro/Test/GetTariffs
 *
 * Required API fields:
 *   period     - Plan period
 *   price      - Plan price with discount applied
 *   full_price - Plan price without discount applied
 *   is_best    - Default selected on first load; plan banner shown large on desktop
 *   text       - Rate plan description
 * Discount is not provided by the API: it must be calculated manually as
 * (1 - price / full_price) * 100 (then clamped 0–100 and rounded).
 */

const TARIFFS_API_URL = "https://t-core.fit-hub.pro/Test/GetTariffs";
export { TARIFFS_API_URL };

/**
 * Discount is calculated manually from price and full_price (never from API).
 * @param {number} price - plan price with discount (from API)
 * @param {number} fullPrice - plan price without discount (full_price from API)
 * @returns {number} discount percent 0–100, rounded
 */
function calcDiscountPercent(price, fullPrice) {
  if (!fullPrice || fullPrice <= 0) return 0;
  const percent = (1 - price / fullPrice) * 100;
  return Math.round(Math.max(0, Math.min(100, percent)));
}

/**
 * Маппинг записи с API в формат приложения.
 * Использует id + period для уникальности (API может вернуть один id для разных периодов).
 * @param {Object} raw - { id, period, price, full_price, is_best, text }
 * @param {number} index - индекс в массиве
 * @returns {Object} { id, period, title, price, oldPrice, description, discountPercent, featured }
 */
function mapTariffFromApi(raw, index) {
  const fullPrice = Number(raw.full_price) || 0;
  const price = Number(raw.price) ?? 0;
  const discountPercent = calcDiscountPercent(price, fullPrice);
  const period = String(raw.period ?? "").trim();
  const rawId = String(raw.id ?? "").trim();
  const id = rawId ? `${rawId}-${period || index}-${index}` : `tariff-${index}`;
  return {
    id,
    period,
    title: period,
    price,
    oldPrice: fullPrice,
    description: String(raw.text ?? "").trim(),
    discountPercent,
    featured: Boolean(raw.is_best),
    isHit: Boolean(raw.is_best),
  };
}

/** Запасные тарифы при ошибке сети / пустом ответе (по формату API) */
const FALLBACK_RAW = [
  { id: "fallback-0", period: "1 неделя", price: 149, full_price: 999, is_best: false, text: "Чтобы просто начать" },
  { id: "fallback-1", period: "1 месяц", price: 399, full_price: 1690, is_best: false, text: "Чтобы получить первые результаты" },
  { id: "fallback-2", period: "3 месяца", price: 990, full_price: 3990, is_best: false, text: "Привести тело в порядок" },
  { id: "fallback-3", period: "Навсегда", price: 5990, full_price: 18990, is_best: true, text: "Для тех, кто хочет всегда быть в форме и поддерживать здоровье" },
];
export const DEFAULT_TARIFFS = FALLBACK_RAW.map((raw, index) => mapTariffFromApi(raw, index));

function fetchViaHttps(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? require("https") : require("http");
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Next.js-Tariffs-Fetch",
      },
    };
    const req = lib.get(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Tariffs API error: ${res.statusCode}`));
        return;
      }
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
  });
}

export async function getTariffs() {
  const serviceUrl = process.env.TARIFFS_SERVICE_URL || TARIFFS_API_URL;
  const isNode = typeof window === "undefined";

  const parseList = (data) => {
    const rawList = Array.isArray(data)
      ? data
      : (data?.tariffs || data?.items || data?.data || []);
    return rawList.map((raw, index) => mapTariffFromApi(raw, index));
  };

  // In Node (getServerSideProps, API route) always use https to avoid fetch/polyfill issues
  if (isNode) {
    try {
      const data = await fetchViaHttps(serviceUrl);
      const list = parseList(data);
      if (list.length) return list;
    } catch (err) {
      console.error("Tariffs service error:", err);
    }
    return DEFAULT_TARIFFS;
  }

  // In browser (client-side fetch) use fetch
  try {
    const response = await fetch(serviceUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Tariffs API error: ${response.status}`);
    const data = await response.json();
    const list = parseList(data);
    if (list.length) return list;
  } catch (err) {
    console.error("Tariffs service error:", err);
  }
  return DEFAULT_TARIFFS;
}
