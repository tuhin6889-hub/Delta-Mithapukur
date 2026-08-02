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
  areaType: 'Primary Hub' | 'High-Speed Fiber' | 'Wireless Line';
  status: 'Operational' | 'Expanding';
  latPct: number;
  lngPct: number;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  selectedPlan: string;
  locality: string;
  requirements: string;
}
