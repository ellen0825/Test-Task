import { getTariffs } from "../../lib/tariffs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const tariffs = await getTariffs();
    return res.status(200).json({ tariffs });
  } catch (err) {
    console.error("Tariffs API error:", err);
    const { DEFAULT_TARIFFS } = await import("../../lib/tariffs");
    return res.status(200).json({ tariffs: DEFAULT_TARIFFS });
  }
}
