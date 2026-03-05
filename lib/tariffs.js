/**
 * Получение тарифов с сервиса Fit Hub.
 * API: period, price, full_price, is_best, text.
 * Процент скидки вычисляется: (1 - price / full_price) * 100.
 */

const TARIFFS_API_URL = "https://t-core.fit-hub.pro/Test/GetTariffs";

/**
 * @param {number} price - цена со скидкой
 * @param {number} fullPrice - полная цена
 * @returns {number} процент скидки (0–100), округлённый
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
  const id = rawId ? `${rawId}-${period || index}` : `tariff-${index}`;
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

/** Дефолтный список при ошибке или отсутствии данных */
export const DEFAULT_TARIFFS = [];

function fetchViaHttps(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? require("https") : require("http");
    const req = lib.get(url, { headers: { Accept: "application/json" } }, (res) => {
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
  try {
    let data;
    if (typeof fetch === "function") {
      const response = await fetch(serviceUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Tariffs API error: ${response.status}`);
      data = await response.json();
    } else {
      data = await fetchViaHttps(serviceUrl);
    }
    const rawList = Array.isArray(data) ? data : data.tariffs || data.items || [];
    return rawList.map((raw, index) => mapTariffFromApi(raw, index));
  } catch (err) {
    console.error("Tariffs service error:", err);
    try {
      const data = await fetchViaHttps(serviceUrl);
      const rawList = Array.isArray(data) ? data : data.tariffs || data.items || [];
      return rawList.map((raw, index) => mapTariffFromApi(raw, index));
    } catch (fallbackErr) {
      console.error("Tariffs fallback fetch failed:", fallbackErr);
      return DEFAULT_TARIFFS;
    }
  }
}
