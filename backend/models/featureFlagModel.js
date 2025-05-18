import db from "../config/db.js";

// Get all feature flags
const _getAllFeatureFlags = () => {
  return db("feature_flag").select("id", "name", "enabled").orderBy("id");
};

const _findFeatureFlagByName = async (name) => {
  try {
    return db("feature_flag").where({ name }).first();
  } catch (error) {
    console.error("Error checking feature flag existence:", error);
    throw error;
  }
};

const _customerHasFeatureFlag = async (feature_flag_id, customer_id) => {
  try {
    const existing = await db("feature_flag_customer")
      .where({ feature_flag_id, customer_id })
      .first();
    return !!existing; //parse to explicit boolean
  } catch (error) {
    console.error(
      `Error checking if customer ${customer_id} has the feature flag ${feature_flag_id}:`,
      error
    );
    throw error;
  }
};

const _regionHasFeatureFlag = async (feature_flag_id, region_id) => {
  try {
    const existing = await db("feature_flag_region")
      .where({ feature_flag_id, region_id })
      .first();
    return !!existing; //parse to explicit boolean
  } catch (error) {
    console.error(
      `Error checking if region ${region_id} has the feature flag ${feature_flag_id}:`,
      error
    );
    throw error;
  }
};

// helper to prepare feature flag dependencies if they don't exist
const _buildFeatureFlagDependencies = async (
  ids,
  checkerFn,
  featureFlagId,
  keyName
) => {
  const data = [];

  for (const id of ids) {
    const exists = await checkerFn(featureFlagId, id);
    if (!exists) {
      data.push({ feature_flag_id: featureFlagId, [keyName]: id });
    }
  }

  return data;
};

//insert feature flags dependencies (if any)
const _insertFeatureFlagDependencies = async (trx, tableName, data) => {
  if (data.length) {
    await trx(tableName).insert(data);
  }
};

// Create a feature flag and link to customers & regions
const _createFeatureFlag = async (
  name,
  enabled,
  customerIds = [],
  regionIds = []
) => {
  const trx = await db.transaction();
  try {
    let featureFlag = await _findFeatureFlagByName(name);

    if (!featureFlag) {
      const [inserted] = await trx("feature_flag").insert({ name, enabled }, [
        "id",
        "name",
      ]);
      if (!inserted) throw new Error("Insert failed or no data returned");
      featureFlag = inserted;
      // console.log("Inserted flag:", inserted);
    }

    const featureFlagId = featureFlag.id;

    // Build and insert customer dependencies
    const customerDependencies = await _buildFeatureFlagDependencies(
      customerIds,
      _customerHasFeatureFlag,
      featureFlagId,
      "customer_id"
    );
    await _insertFeatureFlagDependencies(
      trx,
      "feature_flag_customer",
      customerDependencies
    );

    // Build and insert region dependencies
    const regionDependencies = await _buildFeatureFlagDependencies(
      regionIds,
      _regionHasFeatureFlag,
      featureFlagId,
      "region_id"
    );
    await _insertFeatureFlagDependencies(
      trx,
      "feature_flag_region",
      regionDependencies
    );

    await trx.commit();
    console.log(
      `Feature flag: ${name} and its dependencies were created successfully`
    );
    return { id: featureFlagId };
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
