import db from "../config/db.js";

// POST /customers
export const addCustomer = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: "Customer name is required" });

  try {
    const [customer] = await db("customer")
      .insert({ name })
      .returning(["id", "name"]);
    res.status(201).json(customer);
  } catch (err) {
    console.error("Error adding customer:", err);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

// GET /customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await db("customer").select("id", "name").orderBy("id");
    res.json(customers);
  } catch (err) {
    console.error("Error getting customers:", err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

// POST /regions
export const addRegion = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Region name is required" });

  try {
    const [region] = await db("region")
      .insert({ name })
      .returning(["id", "name"]);
    res.status(201).json(region);
  } catch (err) {
    console.error("Error adding region:", err);
    res.status(500).json({ error: "Failed to create region" });
  }
};

// GET /regions
export const getRegions = async (req, res) => {
  try {
    const regions = await db("region").select("id", "name").orderBy("id");
    res.json(regions);
  } catch (err) {
    console.error("Error getting regions:", err);
    res.status(500).json({ error: "Failed to fetch regions" });
  }
};
