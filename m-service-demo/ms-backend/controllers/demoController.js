import { checkFeatureEnabled } from "../helpers/checkFeatureEnabled.js";

export const demo1Handler = async (req, res) => {
  const isEnabled = await checkFeatureEnabled("demo1");

  if (isEnabled) {
    res.send("Hola Mundo from Feature Flag 'demo1'");
  } else {
    res.send("❌ Feature 'demo1' is disabled");
  }
};
