import db from "../config/db.js";

// Get all feature flags
const _getAllFeatureFlags = () => {
  return db("feature_flag").select("id", "name", "enabled").orderBy("id");
};

// Create a feature flag and link to customers & regions
const _createFeatureFlag = async (name, customerIds = [], regionIds = []) => {
  const trx = await db.transaction();
  try {
    const [flag] = await trx("feature_flag").insert({ name, enabled: false }, [
      "id",
    ]);

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
  return db("feature_flag")
    .where({ id })
    .update({ enabled }, ["id", "name", "enabled"]);
};

// to add customer/region relationships
const _addFlagRelations = async (flagId, customerIds = [], regionIds = []) => {
  const trx = await db.transaction();
  try {
    if (customerIds.length) {
      const customerLinks = customerIds.map((customer_id) => ({
        feature_flag_id: flagId,
        customer_id,
      }));
      await trx("feature_flag_customer")
        .insert(customerLinks)
        .onConflict(["feature_flag_id", "customer_id"])
        .ignore();
    }

    if (regionIds.length) {
      const regionLinks = regionIds.map((region_id) => ({
        feature_flag_id: flagId,
        region_id,
      }));
      await trx("feature_flag_region")
        .insert(regionLinks)
        .onConflict(["feature_flag_id", "region_id"])
        .ignore();
    }

    await trx.commit();
    return { message: "Relations added" };
  } catch (err) {
    await trx.rollback(); //  undo all DB operations safely
    throw err;
  }
};

// to delete a feature flag
const _deleteFeatureFlag = (id) => {
  return db("feature_flag").where({ id }).del();
};

export {
  _getAllFeatureFlags,
  _createFeatureFlag,
  _toggleFeatureFlag,
  _addFlagRelations,
  _deleteFeatureFlag,
};
