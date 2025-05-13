import db from "../config/db.js";

export const getFlagsOverview = async (req, res) => {
  try {
    const rows = await db("feature_flag as ff")
      .leftJoin("feature_flag_customer as ffc", "ffc.feature_flag_id", "ff.id") // nos permite saber qué clientes están asociados a esta flag
      .leftJoin("customer as c", "ffc.customer_id", "c.id")
      .leftJoin("feature_flag_region as ffr", "ffr.feature_flag_id", "ff.id")
      .leftJoin("region as r", "ffr.region_id", "r.id")
      .select(
        "ff.id",
        "ff.name",
        "ff.enabled",
        db.raw("COALESCE(c.name, '') as customer"), //Usa COALESCE para evitar null y reemplazar con cadena vacía.
        db.raw("COALESCE(r.name, '') as region")
      )
      .orderBy("ff.id");

    res.json(rows);
  } catch (err) {
    console.error("Error building dashboard:", err);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
};
