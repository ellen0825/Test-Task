/**
 * Общая логика получения тарифов: с внешнего сервиса (TARIFFS_SERVICE_URL) или дефолтный набор.
 * Используется в API и в getServerSideProps.
 */
export const DEFAULT_TARIFFS = [
  {
    id: "forever",
    title: "Навсегда",
    period: null,
    price: 5990,
    oldPrice: 18990,
    description: "Для тех, кто хочет всегда быть в форме\nи поддерживать здоровье",
    discountPercent: 70,
    featured: true,
    isHit: true,
  },
  {
    id: "1990",
    title: "3 месяца",
    period: "3 месяца",
    price: 1990,
    oldPrice: 3990,
    description: "asdfasdf",
    discountPercent: 50,
    featured: false,
    isHit: false,
  },
  {
    id: "990",
    title: "3 месяца",
    period: "3 месяца",
    price: 990,
    oldPrice: 1690,
    description: "asdfasdf",
    discountPercent: 50,
    featured: false,
    isHit: false,
  },
  {
    id: "690",
    title: "3 месяца",
    period: "3 месяца",
    price: 690,
    oldPrice: 990,
    description: "asdfasdf",
    discountPercent: 50,
    featured: false,
    isHit: false,
  },
];

export async function getTariffs() {
  const serviceUrl = process.env.TARIFFS_SERVICE_URL;
  if (serviceUrl) {
    try {
      const response = await fetch(serviceUrl);
      if (!response.ok) throw new Error(`Service error: ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : data.tariffs || data.items || DEFAULT_TARIFFS;
    } catch (err) {
      console.error("Tariffs service error:", err);
    }
  }
  return DEFAULT_TARIFFS;
}
