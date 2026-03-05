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
 * @param {Object} raw - { id, period, price, full_price, is_best, text }
 * @returns {Object} { id, period, title, price, oldPrice, description, discountPercent, featured }
 */
function mapTariffFromApi(raw) {
  const fullPrice = Number(raw.full_price) || 0;
  const price = Number(raw.price) ?? 0;
  const discountPercent = calcDiscountPercent(price, fullPrice);
  return {
    id: String(raw.id ?? ""),
    period: String(raw.period ?? ""),
    title: String(raw.period ?? ""),
    price,
    oldPrice: fullPrice,
    description: String(raw.text ?? ""),
    discountPercent,
    featured: Boolean(raw.is_best),
    isHit: Boolean(raw.is_best),
  };
}

/** Дефолтный список при ошибке или отсутствии данных */
export const DEFAULT_TARIFFS = [];

export async function getTariffs() {
  const serviceUrl = process.env.TARIFFS_SERVICE_URL || TARIFFS_API_URL;
  try {
    const response = await fetch(serviceUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Tariffs API error: ${response.status}`);
    const data = await response.json();
    const rawList = Array.isArray(data) ? data : data.tariffs || data.items || [];
    return rawList.map(mapTariffFromApi);
  } catch (err) {
    console.error("Tariffs service error:", err);
    return DEFAULT_TARIFFS;
  }
}
