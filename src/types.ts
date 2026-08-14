export interface Plan {
  id: string;
  name: string;
  speedMbps: number;
  priceBdt: number;
  popular?: boolean;
  features: string[];
  recommendedFor: string;
}

export interface CoverageLocation {
  id: string;
  name: string;
  bengaliName?: string;
  unionSector?: string;
  areaType: 'Primary Hub' | 'High-Speed Fiber' | 'Wireless Line' | 'Main Regional PoP' | 'Sub PoP Node' | 'Primary Core Hub' | 'Wireless & Fiber';
  status: 'Operational' | 'Expanding';
  latPct: number;
  lngPct: number;
  maxSpeedMbps: number;
  availablePorts: number;
  totalPorts: number;
  estInstallTime: string;
  avgPingBdixMs: number;
  avgPingGamingMs: number;
  signalStrengthDbm: string;
  coveragePercentage: number;
  coveredLandmarks: string[];
  description: string;
  oltNodeName: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  selectedPlan: string;
  locality: string;
  requirements: string;
}
