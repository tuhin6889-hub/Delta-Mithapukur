export type ClientStatus = 'Active' | 'Pending' | 'Suspended' | 'Inactive';
export type PaymentMethod = 'bKash' | 'Nagad' | 'Cash' | 'Bank';
export type ClientGender = 'Male' | 'Female' | 'Other';

export interface ClientRecord {
  id: string;
  fullName: string;
  username?: string;
  password?: string;
  phone: string;
  gender?: ClientGender;
  area: string;
  popName?: string;
  zoneName?: string;
  planName: string;
  monthlyFee: number; // in BDT
  status: ClientStatus;
  joinDate: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  ipAddress?: string;
  onuMac?: string;
  routerMac?: string;
  nidNumber?: string;
  nidPhotoUrl?: string;
  latitude?: string;
  longitude?: string;
  notes?: string;
}

export interface MarketingCampaign {
  id: string;
  campaignName: string;
  source: string;
  targetArea: string;
  leadsCount: number;
  conversionsCount: number;
  budgetBdt: number;
  startDate: string;
}
