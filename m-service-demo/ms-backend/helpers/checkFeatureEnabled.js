import dotenv from "dotenv";
import axios from "axios";

dotenv.config(); // esto debe ir antes de acceder a process.env

const { MFF_API_URL, MFF_API_KEY } = process.env;

export const checkFeatureEnabled = async (flagName) => {
  try {
    const res = await axios.get(`${MFF_API_URL}/feature-flags`, {
      headers: {
        Authorization: `Bearer ${MFF_JWT}`,
        apikey: MFF_API_KEY,
      },
    });

    const flag = res.data.find((f) => f.name === flagName);
    return flag?.enabled === true;
  } catch (err) {
    console.error("❌ Error consulting MFF:", err.message);
    return false;
  }
};
