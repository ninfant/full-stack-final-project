import {
  _getAllFeatureFlags,
  _createFeatureFlag,
  _toggleFeatureFlag,
  _addFlagRelations,
  _deleteFeatureFlag,
} from "../models/featureFlagModel.js";

// GET /feature-flags
const getAllFeatureFlags = async (req, res) => {
  try {
    const flags = await _getAllFeatureFlags();
    res.json(flags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch feature flags" });
  }
};

// POST /feature-flags
const addFeatureFlag = async (req, res) => {
  const { name, customer = [], region = [] } = req.body;
  try {
    const result = await _createFeatureFlag(name, customer, region);
    res.status(201).json({ id: result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create feature flag" });
  }
};

// PUT /feature-flags/:id/toggle
const toggleFeature = async (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;

  if (typeof enabled !== "boolean") {
    return res.status(400).json({ error: "enabled must be true or false" });
  }

  try {
    const result = await _toggleFeatureFlag(id, enabled);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle feature flag" });
  }
};

// PUT /feature-flags/:id/add-relations
const addRelations = async (req, res) => {
  const { id } = req.params;
  const { customer = [], region = [] } = req.body;

  try {
    const result = await _addFlagRelations(id, customer, region);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add relations" });
  }
};

// DELETE /feature-flags/:id
const deleteFlag = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await _deleteFeatureFlag(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete feature flag" });
  }



  
};

export {
  getAllFeatureFlags,
  addFeatureFlag,
  toggleFeature,
  addRelations,
  deleteFlag,
};
