import db from "../config/db.js";

// Get all feature flags
const _getAllFeatureFlags = () => {
  return db("feature_flag").select("id", "name", "enabled").orderBy("id");
};

// Create a feature flag and link to customers & regions
const _createFeatureFlag = async (
  name,
  enabled,
  customerIds = [],
  regionIds = []
) => {
  console.log("Creating with:", name, enabled, customerIds, regionIds);

  const trx = await db.transaction();
  try {
    const [flag] = await trx("feature_flag").insert({ name, enabled }, [
      "id",
      "name",
    ]);
    if (!flag) throw new Error("Insert failed or no data returned");

    console.log("Inserted flag:", flag); // debug
    const flagId = flag.id;

    if (customerIds.length) {
      const customerLinks = customerIds.map((customer_id) => ({
        feature_flag_id: flagId,
        customer_id,
      }));
      await trx("feature_flag_customer").insert(customerLinks);
    }

    if (regionIds.length) {
      const regionLinks = regionIds.map((region_id) => ({
        feature_flag_id: flagId,
        region_id,
      }));
      await trx("feature_flag_region").insert(regionLinks);
    }

    await trx.commit();
    return { id: flagId };
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

// toggle feature flag's enabled status
const _toggleFeatureFlag = (id, enabled) => {
  console.log("Updating feature_flag:", id, "to", enabled);
  return db("feature_flag")
    .where({ id })
    .update({ enabled }, ["id", "name", "enabled"]);
};

// to delete a feature flag
const _deleteFeatureFlag = (id) => {
  return db("feature_flag").where({ id }).del();
};

export {
  _getAllFeatureFlags,
  _createFeatureFlag,
  _toggleFeatureFlag,
  _deleteFeatureFlag,
};
