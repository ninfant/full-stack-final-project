import axiosInstance from "./axiosInstance";
import type { FeatureFlag } from "../types/featureFlag";

export const fetchFeatureFlags = async (
  jwtToken: string
): Promise<FeatureFlag[]> => {
  const response = await axiosInstance.get<FeatureFlag[]>("/feature-flags", {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response.data;
};
