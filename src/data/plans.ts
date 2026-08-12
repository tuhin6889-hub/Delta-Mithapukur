import { Plan, CoverageLocation } from '../types';
import managerAvatar from '../assets/images/regenerated_image_1786009739201.jpg';
import supportManagerAvatar from '../assets/images/support_manager_avatar_1786007253596.jpg';
import marketingOfficerAvatar from '../assets/images/marketing_officer_avatar_1786007271529.jpg';

export const PLANS: Plan[] = [
  {
    id: 'student',
    name: 'STUDENT',
    speedMbps: 20,
    priceBdt: 525,
    features: [
      '20 Mbps Speed',
      'Unlimited Data',
      '24/7 Support',
      'Fiber Optic'
    ],
    recommendedFor: 'Students, basic web browsing & online study'
  },
  {
    id: 'bachelor',
    name: 'BACHELOR',
    speedMbps: 30,
    priceBdt: 630,
    features: [
      '30 Mbps Speed',
      'Unlimited Data',
      '24/7 Support',
      'Fiber Optic'
    ],
    recommendedFor: 'Bachelor sharing, social media & HD streaming'
  },
  {
    id: 'couple',
    name: 'COUPLE',
    speedMbps: 40,
    priceBdt: 735,
    features: [
      '40 Mbps Speed',
      'Unlimited Data',
      '24/7 Support',
      'Fiber Optic'
    ],
    recommendedFor: 'Couples & small homes, dual-screen streaming'
  },
  {
    id: 'family',
    name: 'FAMILY',
    speedMbps: 50,
    priceBdt: 840,
    popular: true,
    features: [
      '50 Mbps Speed',
      'Unlimited Data',
      '24/7 Support',
      'Fiber Optic'
    ],
    recommendedFor: 'Family home, multi-device 4K streaming & smart TV'
  },
  {
    id: 'joint_family',
    name: 'JOINT FAMILY',
    speedMbps: 60,
    priceBdt: 1050,
    features: [
      '60 Mbps Speed',
      'Unlimited Data',
      '24/7 Support',
      'Fiber Optic'
    ],
    recommendedFor: 'Joint families, gaming & high-bandwidth usage'
  },
  {
    id: 'grand_family',
    name: 'GRAND FAMILY',
    speedMbps: 80,
    priceBdt: 1260,
    features: [
      '80 Mbps Speed',
      'Unlimited Data',
      '24/7 Support',
      'Fiber Optic'
    ],
    recommendedFor: 'Grand family, ultra-fast downloads & power users'
  }
];

export const COVERAGE_LOCATIONS: CoverageLocation[] = [
  {
    id: '1',
    name: 'Boldipukur Bazaar (Akmal Market)',
    bengaliName: 'বলদিপুকুর বাজার (আকমল মার্কেট)',
    unionSector: 'Main Branch Operations Hub',
    areaType: 'Primary Hub',
    status: 'Operational',
    latPct: 48,
    lngPct: 52,
    maxSpeedMbps: 500,
    availablePorts: 14,
    totalPorts: 96,
    estInstallTime: 'Same-Day (2-4 Hours)',
    avgPingBdixMs: 2,
    avgPingGamingMs: 14,
    signalStrengthDbm: '-17.2 dBm (Optimal)',
    coveragePercentage: 100,
    coveredLandmarks: ['Akmal Market', 'Boldipukur High School', 'College Road', 'Station Mor', 'Bazaar Central Mosque'],
    description: 'Direct main transmission OLT center with dual-ring backup. Ultra-low latency and immediate line drops.',
    oltNodeName: 'OLT-NODE-01 (Akmal Main Core)'
  },
  {
    id: '2',
    name: 'Mithapukur Sadar Town',
    bengaliName: 'মিঠাপুকুর সদর শহর',
    unionSector: 'Mithapukur Sadar Union',
    areaType: 'High-Speed Fiber',
    status: 'Operational',
    latPct: 35,
    lngPct: 45,
    maxSpeedMbps: 300,
    availablePorts: 22,
    totalPorts: 128,
    estInstallTime: 'Same-Day (4-6 Hours)',
    avgPingBdixMs: 3,
    avgPingGamingMs: 16,
    signalStrengthDbm: '-18.5 dBm (Strong)',
    coveragePercentage: 98,
    coveredLandmarks: ['Upazila Parishad Complex', 'Mithapukur Hospital Road', 'Mithapukur Degree College', 'Thana Road'],
    description: 'High-density fiber optic backbone deployed with FTTH drop cables to government offices and residences.',
    oltNodeName: 'OLT-NODE-02 (Sadar Central)'
  },
  {
    id: '3',
    name: 'Pairaband Area',
    bengaliName: 'পায়রাবন্দ এলাকা',
    unionSector: 'Pairaband Union',
    areaType: 'High-Speed Fiber',
    status: 'Operational',
    latPct: 62,
    lngPct: 38,
    maxSpeedMbps: 100,
    availablePorts: 18,
    totalPorts: 64,
    estInstallTime: 'Within 24 Hours',
    avgPingBdixMs: 4,
    avgPingGamingMs: 18,
    signalStrengthDbm: '-19.1 dBm (Good)',
    coveragePercentage: 92,
    coveredLandmarks: ['Begum Rokeya Smriti Centre', 'Pairaband Bazaar', 'Ghoraghat Road', 'Primary School Chowrasta'],
    description: 'Dedicated fiber link running along Rangpur-Bogra highway with excellent stability for home & school connections.',
    oltNodeName: 'OLT-NODE-03 (Pairaband Sub-Loop)'
  },
  {
    id: '4',
    name: 'Ranipukur Union',
    bengaliName: 'রাণীপুকুর ইউনিয়ন',
    unionSector: 'Ranipukur Union',
    areaType: 'High-Speed Fiber',
    status: 'Operational',
    latPct: 28,
    lngPct: 65,
    maxSpeedMbps: 100,
    availablePorts: 11,
    totalPorts: 48,
    estInstallTime: 'Within 24 Hours',
    avgPingBdixMs: 4,
    avgPingGamingMs: 19,
    signalStrengthDbm: '-20.3 dBm (Good)',
    coveragePercentage: 88,
    coveredLandmarks: ['Ranipukur High School', 'Unions Parishad Office', 'Health Complex Road', 'Bazaar Road'],
    description: 'Optical distribution network with active splitter boxes supporting local merchants and household packages.',
    oltNodeName: 'OLT-NODE-04 (Ranipukur Branch)'
  },
  {
    id: '5',
    name: 'Gopalpur Sector',
    bengaliName: 'গোপালপুর সেক্টর',
    unionSector: 'Gopalpur Union',
    areaType: 'Wireless Line',
    status: 'Expanding',
    latPct: 75,
    lngPct: 60,
    maxSpeedMbps: 50,
    availablePorts: 8,
    totalPorts: 32,
    estInstallTime: '1-2 Days (Line Extension)',
    avgPingBdixMs: 6,
    avgPingGamingMs: 24,
    signalStrengthDbm: '-22.1 dBm (Fair - Upgrade in Progress)',
    coveragePercentage: 70,
    coveredLandmarks: ['Gopalpur Bazaar', 'Dakhil Madrasa Road', 'New Market Square'],
    description: 'Hybrid optical wireless sector currently undergoing full fiber optic cable deployment to expand capacity.',
    oltNodeName: 'OLT-EXP-05 (Gopalpur South)'
  },
  {
    id: '6',
    name: 'Durga Pur Area',
    bengaliName: 'দুর্গাপুর এলাকা',
    unionSector: 'Durgapur Union',
    areaType: 'High-Speed Fiber',
    status: 'Operational',
    latPct: 42,
    lngPct: 25,
    maxSpeedMbps: 100,
    availablePorts: 15,
    totalPorts: 48,
    estInstallTime: 'Within 24 Hours',
    avgPingBdixMs: 3,
    avgPingGamingMs: 17,
    signalStrengthDbm: '-18.9 dBm (Strong)',
    coveragePercentage: 85,
    coveredLandmarks: ['Durgapur High School', 'Pukur Par Road', 'Durgapur Union Parishad', 'Bazaar Road'],
    description: 'Reliable fiber loop offering fast downloads, low gaming ping, and smooth 4K video streaming.',
    oltNodeName: 'OLT-NODE-06 (Durgapur Loop)'
  },
  {
    id: '7',
    name: 'Mirzapur Sector',
    bengaliName: 'মির্জাপুর সেক্টর',
    unionSector: 'Mirzapur Union',
    areaType: 'Wireless Line',
    status: 'Expanding',
    latPct: 58,
    lngPct: 78,
    maxSpeedMbps: 50,
    availablePorts: 6,
    totalPorts: 24,
    estInstallTime: '1-2 Days (On-Demand)',
    avgPingBdixMs: 7,
    avgPingGamingMs: 26,
    signalStrengthDbm: '-23.0 dBm (Fair)',
    coveragePercentage: 65,
    coveredLandmarks: ['Mirzapur Bazaar', 'Union Health Centre', 'Station Road'],
    description: 'Radio wireless link with planned fiber cable drop scheduled for completion this quarter.',
    oltNodeName: 'OLT-EXP-07 (Mirzapur East)'
  }
];

export const BRANCH_INFO = {
  name: 'Delta Mithapukur Branch',
  tagline: 'সবার ইন্টারনেট (Internet for Everyone)',
  manager: 'Mahamudul Hasan',
  designation: 'Branch Manager',
  phone: '0171-9394430',
  email: 'info@deltamithapukur.net.bd',
  website: 'https://www.deltamithapukur.net.com',
  domain: 'www.deltamithapukur.net.com',
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
  whatsapp?: string;
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

