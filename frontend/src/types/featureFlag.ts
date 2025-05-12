export interface FeatureFlag {
  id: number;
  name: string;
  enabled: boolean;
  // Opcionales, para casos como el dashboard
  customer?: string;
  region?: string;
}
