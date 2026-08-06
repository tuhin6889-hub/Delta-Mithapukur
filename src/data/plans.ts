import { Plan, CoverageLocation } from '../types';
import managerAvatar from '../assets/images/regenerated_image_1786009739201.jpg';
import supportManagerAvatar from '../assets/images/support_manager_avatar_1786007253596.jpg';
import marketingOfficerAvatar from '../assets/images/marketing_officer_avatar_1786007271529.jpg';

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
  messengerLink: 'https://m.me/mahamudul.hasan.delta',
  facebookPageLink: 'https://facebook.com/mahamudul.hasan.delta',
  facebookPageName: 'Delta Internet Mithapukur',
  telegramNumber: '01719394430',
  telegramDirectLink: 'https://t.me/+8801719394430',
  telegramBotUsername: '@DeltaMithapukurBot',
  telegramBotLink: 'https://t.me/DeltaMithapukurBot',
  telegramChannelLink: 'https://t.me/DeltaInternetMithapukur',
  address: 'Boldipukur Bazaar Akmal Market, Mithapukur, Rangpur - 5460, Bangladesh',
  hours: 'Sat - Thu: 8:00 AM - 10:00 PM | Fri: 24/7 Support Line',
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  status: string;
  badge: string;
  image?: string;
  description: string;
}

export const OUR_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Mahamudul Hasan',
    role: 'Branch Manager',
    department: 'Branch Operations & Strategic Leadership',
    phone: '0171-9394430',
    status: 'Online & Available',
    badge: 'Branch Executive Lead',
    image: managerAvatar,
    description: 'Leading Delta Mithapukur branch operations, corporate fiber line deployment, and overall customer satisfaction across Mithapukur Upazila.',
  },
  {
    id: 'team-sm',
    name: 'MD. Jion Hasan',
    role: 'Support Manager',
    department: 'Customer Care & Helpdesk Operations',
    phone: '01944455176',
    whatsapp: '01944455176',
    status: '24/7 Desk Active',
    badge: 'Support Manager Lead',
    image: supportManagerAvatar,
    description: 'Managing 24/7 technical helpdesk, customer query resolutions, and ticket dispatch for Delta Mithapukur Branch.',
  },
  {
    id: 'team-mo',
    name: 'Habibur Rahman',
    role: 'Marketing Officer',
    department: 'Corporate Outreach & Broadband Marketing',
    phone: '01944455176',
    whatsapp: '01944455176',
    status: 'Field Outreach',
    badge: 'Marketing Lead',
    image: marketingOfficerAvatar,
    description: 'Promoting high-speed optical fiber packages, student connection deals, and corporate line connections across Mithapukur unions.',
  },
  {
    id: 'team-2',
    name: 'Sharif Hossain',
    role: 'Senior NOC Engineer',
    department: 'Network Operations & OLT Maintenance',
    phone: '01712-001122',
    status: 'Active NOC Desk',
    badge: 'MikroTik & Fiber Specialist',
    description: 'Managing central BDIX routing, bandwidth distribution, OLT optical power monitoring, and server infrastructure.',
  },
  {
    id: 'team-3',
    name: 'Akmal Hossain',
    role: 'Chief Fiber Splicer & Field Lead',
    department: 'Optical Cable Splicing & Maintenance',
    phone: '01819-887766',
    status: 'Field Active',
    badge: 'Akmal Market Hub Splicer',
    description: 'Specializing in fusion splicing, optical OTDR testing, and immediate fiber breakage repair across Boldipukur & Sadar areas.',
  },
  {
    id: 'team-4',
    name: 'Rafiqul Islam',
    role: 'Customer Care & Billing Lead',
    department: 'bKash Auto Renewal & Support',
    phone: '01912-334455',
    status: 'Support Desk Active',
    badge: 'Client Satisfaction Lead',
    description: 'Handling client CID account verification, bKash auto-renewal setup, tariff billing, and phone support.',
  },
  {
    id: 'team-5',
    name: 'Mithapukur Rapid Lineman Squad',
    role: '24/7 Emergency Line Response',
    department: 'Field On-Call Support',
    phone: '0171-9394430',
    status: '24/7 Standby',
    badge: 'Emergency Response Squad',
    description: 'Dedicated 24/7 rapid response unit for red light (LOS) blinking fixes, pole fiber drops, and router setup.',
  },
];

