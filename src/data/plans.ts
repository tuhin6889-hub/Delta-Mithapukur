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
    name: 'Boldipukur Bazzar (Delta Mithapukur Brach)',
    bengaliName: 'বলদিপুকুর বাজার (ডেল্টা মিঠাপুকুর ব্রাঞ্চ)',
    unionSector: 'Central Branch Core PoP',
    areaType: 'Primary Core Hub',
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
    coveredLandmarks: ['Akmal Market', 'Boldipukur High School', 'College Road', 'Station Mor', 'Branch Operations Office'],
    description: 'Central transmission core OLT node with dual-fiber ring backup. Ultra-low latency transmission across Mithapukur.',
    oltNodeName: 'OLT-MAIN-01 (Delta Central Core)'
  },
  {
    id: '2',
    name: 'Borogorga PoP',
    bengaliName: 'বড়দরগাহ্‌ পিওপি',
    unionSector: 'Borogorga Regional PoP Sector',
    areaType: 'Main Regional PoP',
    status: 'Operational',
    latPct: 35,
    lngPct: 65,
    maxSpeedMbps: 300,
    availablePorts: 22,
    totalPorts: 128,
    estInstallTime: 'Same-Day (4-6 Hours)',
    avgPingBdixMs: 3,
    avgPingGamingMs: 16,
    signalStrengthDbm: '-18.5 dBm (Strong)',
    coveragePercentage: 98,
    coveredLandmarks: ['Borogorga Highway Mor', 'Borogorga High School', 'High School Road', 'Bazaar Square'],
    description: 'Main regional optical transmission PoP feeding surrounding unions, commercial hubs, and high-density fiber lines.',
    oltNodeName: 'OLT-POP-02 (Borogorga Regional Hub)'
  },
  {
    id: '3',
    name: 'Molonghat Sub PoP',
    bengaliName: 'মোলংহাট সাব-পিওপি',
    unionSector: 'Molonghat Sub PoP Sector',
    areaType: 'Sub PoP Node',
    status: 'Operational',
    latPct: 62,
    lngPct: 38,
    maxSpeedMbps: 200,
    availablePorts: 18,
    totalPorts: 64,
    estInstallTime: 'Within 24 Hours',
    avgPingBdixMs: 4,
    avgPingGamingMs: 18,
    signalStrengthDbm: '-19.1 dBm (Good)',
    coveragePercentage: 92,
    coveredLandmarks: ['Molonghat Bazaar', 'Pairaband Road', 'Begum Rokeya Smriti Centre', 'Primary School Chowrasta'],
    description: 'Sub PoP distribution node providing direct FTTH optical fiber drop lines to local households and schools.',
    oltNodeName: 'OLT-SUBPOP-03 (Molonghat Node)'
  },
  {
    id: '4',
    name: 'Shalaipur Sub PoP',
    bengaliName: 'শালাইপুর সাব-পিওপি',
    unionSector: 'Shalaipur Sub PoP Sector',
    areaType: 'Sub PoP Node',
    status: 'Operational',
    latPct: 28,
    lngPct: 25,
    maxSpeedMbps: 200,
    availablePorts: 16,
    totalPorts: 64,
    estInstallTime: 'Within 24 Hours',
    avgPingBdixMs: 4,
    avgPingGamingMs: 19,
    signalStrengthDbm: '-19.5 dBm (Good)',
    coveragePercentage: 90,
    coveredLandmarks: ['Shalaipur Bazaar', 'Shalaipur High School', 'Health Complex Road', 'Union Road Chowrasta'],
    description: 'Sub PoP optical distribution center equipped with active gigabit splitter boxes for residential & gaming lines.',
    oltNodeName: 'OLT-SUBPOP-04 (Shalaipur Node)'
  },
  {
    id: '5',
    name: 'Mithapukur Sadar Sector',
    bengaliName: 'মিঠাপুকুর সদর শহর সেক্টর',
    unionSector: 'Boldipukur Bazzar (Delta Mithapukur Brach)',
    areaType: 'High-Speed Fiber',
    status: 'Operational',
    latPct: 40,
    lngPct: 45,
    maxSpeedMbps: 300,
    availablePorts: 20,
    totalPorts: 96,
    estInstallTime: 'Same-Day (2-4 Hours)',
    avgPingBdixMs: 3,
    avgPingGamingMs: 15,
    signalStrengthDbm: '-18.0 dBm (Strong)',
    coveragePercentage: 98,
    coveredLandmarks: ['Upazila Parishad Complex', 'Mithapukur Hospital Road', 'Mithapukur Degree College', 'Thana Road'],
    description: 'Urban fiber distribution backbone directly backhauled to Boldipukur Branch Core PoP.',
    oltNodeName: 'OLT-SEC-05 (Sadar Core Feeder)'
  },
  {
    id: '6',
    name: 'Ranipukur Sector',
    bengaliName: 'রাণীপুকুর সেক্টর',
    unionSector: 'Borogorga PoP',
    areaType: 'High-Speed Fiber',
    status: 'Operational',
    latPct: 75,
    lngPct: 60,
    maxSpeedMbps: 100,
    availablePorts: 12,
    totalPorts: 48,
    estInstallTime: 'Within 24 Hours',
    avgPingBdixMs: 4,
    avgPingGamingMs: 19,
    signalStrengthDbm: '-20.1 dBm (Good)',
    coveragePercentage: 88,
    coveredLandmarks: ['Ranipukur High School', 'Unions Parishad Office', 'Bazaar Road'],
    description: 'Feeder sector connected to Borogorga PoP providing low-ping broadband for merchants and students.',
    oltNodeName: 'OLT-SEC-06 (Borogorga Feeder)'
  },
  {
    id: '7',
    name: 'Gopalpur & Mirzapur Sector',
    bengaliName: 'গোপালপুর ও মির্জাপুর সেক্টর',
    unionSector: 'Shalaipur Sub PoP',
    areaType: 'Wireless & Fiber',
    status: 'Expanding',
    latPct: 58,
    lngPct: 78,
    maxSpeedMbps: 50,
    availablePorts: 8,
    totalPorts: 32,
    estInstallTime: '1-2 Days (Line Extension)',
    avgPingBdixMs: 6,
    avgPingGamingMs: 24,
    signalStrengthDbm: '-22.5 dBm (Fair - Upgrade in Progress)',
    coveragePercentage: 72,
    coveredLandmarks: ['Gopalpur Bazaar', 'Mirzapur Health Centre', 'Station Road'],
    description: 'Sub-PoP sector undergoing optical fiber line expansion from Shalaipur Sub PoP.',
    oltNodeName: 'OLT-EXP-07 (Shalaipur Extension)'
  }
];

export const BRANCH_INFO = {
  name: 'Delta Mithapukur Branch',
  tagline: 'সবার ইন্টারনেট (Internet for Everyone)',
  manager: 'Mahamudul Hasan',
  designation: 'Branch Manager',
  phone: '0171-9394430',
  email: 'info@deltamithapukur.net.bd',
  website: 'https://tuhin6889-hub.github.io/deltamithapukur.net/',
  domain: 'tuhin6889-hub.github.io/deltamithapukur.net',
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

