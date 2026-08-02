import { Plan, CoverageLocation } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Broadband',
    speedMbps: 30,
    priceBdt: 999,
    features: [
      '30 Mbps High-Speed Fiber Connection',
      'Unlimited Monthly Data (No FUP)',
      'Free Standard Fiber Installation',
      '24/7 Local Customer Support',
      'Low Latency for HD Streaming'
    ],
    recommendedFor: 'Home users, social media, & HD video streaming'
  },
  {
    id: 'business',
    name: 'Business Fiber',
    speedMbps: 100,
    priceBdt: 2499,
    popular: true,
    features: [
      '100 Mbps Dedicated Speed',
      'Unlimited High-Speed Data',
      'Static IPv4 Address Included',
      'Priority Support Desk Access',
      'Free Wi-Fi Router Setup',
      'Symmetric Up/Down Speeds'
    ],
    recommendedFor: 'Small offices, cyber cafes, & heavy power users'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Leased Line',
    speedMbps: 500,
    priceBdt: 5999,
    features: [
      '500 Mbps Dedicated Managed Port',
      'Guaranteed SLA (99.9% Uptime)',
      'Dedicated Dual Fiber Path',
      '24/7 Corporate Account Manager',
      'Static IP Subnet & DDoS Guard',
      'Direct Point-to-Point Link'
    ],
    recommendedFor: 'Corporates, educational institutes, & call centers'
  }
];

export const COVERAGE_LOCATIONS: CoverageLocation[] = [
  { id: '1', name: 'Boldipukur Bazaar (Akmal Market)', areaType: 'Primary Hub', status: 'Operational', latPct: 48, lngPct: 52 },
  { id: '2', name: 'Mithapukur Sadar Town', areaType: 'High-Speed Fiber', status: 'Operational', latPct: 35, lngPct: 45 },
  { id: '3', name: 'Pairaband Area', areaType: 'High-Speed Fiber', status: 'Operational', latPct: 62, lngPct: 38 },
  { id: '4', name: 'Ranipukur Union', areaType: 'High-Speed Fiber', status: 'Operational', latPct: 28, lngPct: 65 },
  { id: '5', name: 'Gopalpur Sector', areaType: 'Wireless Line', status: 'Expanding', latPct: 75, lngPct: 60 },
  { id: '6', name: 'Durga Pur Area', areaType: 'High-Speed Fiber', status: 'Operational', latPct: 42, lngPct: 25 },
  { id: '7', name: 'Mirzapur Sector', areaType: 'Wireless Line', status: 'Expanding', latPct: 58, lngPct: 78 }
];

export const BRANCH_INFO = {
  name: 'Delta Mithapukur Branch',
  tagline: 'সবার ইন্টারনেট (Internet for Everyone)',
  manager: 'Mahamudul Hasan',
  designation: 'Branch Manager',
  phone: '0171-9394430',
  email: 'sminternet.wifi@gmail.com',
  linkedin: 'https://linkedin.com/in/mahamudul-hasan-delta',
  facebook: 'https://facebook.com/mahamudul.hasan.delta',
  telegramNumber: '01719394430',
  telegramDirectLink: 'https://t.me/+8801719394430',
  telegramBotUsername: '@DeltaMithapukurBot',
  telegramBotLink: 'https://t.me/DeltaMithapukurBot',
  telegramChannelLink: 'https://t.me/DeltaInternetMithapukur',
  address: 'Boldipukur Bazaar Akmal Market, Mithapukur, Rangpur - 5460, Bangladesh',
  hours: 'Sat - Thu: 8:00 AM - 10:00 PM | Fri: 24/7 Support Line',
};
