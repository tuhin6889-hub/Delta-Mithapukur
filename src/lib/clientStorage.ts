import { ClientRecord, MarketingCampaign } from '../types/client';

export const DEFAULT_CLIENTS: ClientRecord[] = [
  {
    id: 'DLT-2026-101',
    fullName: 'Mahbubur Rahman (মাহবুবুর রহমান)',
    username: 'mahbub_dlt',
    password: '●●●●●●',
    phone: '01712-345678',
    gender: 'Male',
    area: 'Boldipukur Bazzar (Delta Mithapukur Brach)',
    popName: 'Boldipukur Bazzar (Delta Mithapukur Brach)',
    zoneName: 'Zone A - Boldipukur Core',
    planName: '60 Mbps Fiber Family',
    monthlyFee: 1050,
    status: 'Active',
    joinDate: '2026-01-15',
    paymentMethod: 'bKash',
    ipAddress: '103.145.22.14',
    onuMac: 'BC:54:36:9F:81:4A',
    routerMac: '74:83:C2:5E:2B:10',
    nidNumber: '19882691234567890',
    nidPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    latitude: '25.5801',
    longitude: '89.2815',
    notes: 'Branch Operations Core Fiber Line. High gain GEPON ONU.'
  },
  {
    id: 'DLT-2026-102',
    fullName: 'Anwar Hossain (আনওয়ার হোসেন)',
    username: 'anwar_mitha',
    password: '●●●●●●',
    phone: '01819-876543',
    gender: 'Male',
    area: 'Borogorga Bazaar',
    popName: 'Borogorga PoP',
    zoneName: 'Zone B - Borogorga',
    planName: '40 Mbps High-Speed',
    monthlyFee: 735,
    status: 'Active',
    joinDate: '2026-02-01',
    paymentMethod: 'Nagad',
    ipAddress: '103.145.22.28',
    onuMac: 'E0:67:B3:7A:41:8C',
    routerMac: 'D8:07:B6:33:91:FA',
    nidNumber: '19922691876543210',
    latitude: '25.5785',
    longitude: '89.2740',
    notes: 'Borogorga regional commercial line.'
  },
  {
    id: 'DLT-2026-103',
    fullName: 'Dr. Rafiqul Islam (ড. রফিকুল ইসলাম)',
    username: 'dr_rafiq',
    password: '●●●●●●',
    phone: '01711-112233',
    gender: 'Male',
    area: 'Molonghat Bazaar',
    popName: 'Molonghat Sub PoP',
    zoneName: 'Zone C - Molonghat',
    planName: '80 Mbps Gamers Choice',
    monthlyFee: 1260,
    status: 'Active',
    joinDate: '2026-02-10',
    paymentMethod: 'Bank',
    ipAddress: '103.145.22.35',
    onuMac: '48:8D:36:A2:7D:99',
    routerMac: 'C4:6E:1F:8B:40:E5',
    nidNumber: '19792691098765432',
    latitude: '25.5920',
    longitude: '89.2950',
    notes: 'Sub PoP optical fiber connection.'
  },
  {
    id: 'DLT-2026-104',
    fullName: 'Farhana Sultana (ফারহানা সুলতানা)',
    username: 'farhana_s',
    password: '●●●●●●',
    phone: '01722-667788',
    gender: 'Female',
    area: 'Shalaipur Area',
    popName: 'Shalaipur Sub PoP',
    zoneName: 'Zone D - Shalaipur',
    planName: '30 Mbps Starter',
    monthlyFee: 630,
    status: 'Active',
    joinDate: '2026-05-01',
    paymentMethod: 'bKash',
    ipAddress: '103.145.22.42',
    onuMac: 'F4:8E:38:12:AA:77',
    routerMac: '98:48:27:0B:4D:1C',
    nidNumber: '19952691567890123',
    latitude: '25.5640',
    longitude: '89.2610',
    notes: 'Shalaipur Sub PoP fiber connection.'
  }
];

export const DEFAULT_CAMPAIGNS: MarketingCampaign[] = [
  {
    id: 'CMP-01',
    campaignName: 'Mithapukur Akmal Market Leaflet Campaign',
    source: 'Flyer / Leaflet',
    targetArea: 'Boldipukur & Akmal Market',
    leadsCount: 120,
    conversionsCount: 38,
    budgetBdt: 3500,
    startDate: '2026-06-01'
  },
  {
    id: 'CMP-02',
    campaignName: 'Village Fiber Promotion - Free Cable Offer',
    source: 'Local Agent',
    targetArea: 'Ranipukur & Pairaband',
    leadsCount: 85,
    conversionsCount: 29,
    budgetBdt: 5000,
    startDate: '2026-06-15'
  },
  {
    id: 'CMP-03',
    campaignName: 'Mithapukur Facebook Local Ads',
    source: 'Facebook Page',
    targetArea: 'Mithapukur Sadar',
    leadsCount: 210,
    conversionsCount: 54,
    budgetBdt: 4200,
    startDate: '2026-07-01'
  }
];

const CLIENT_STORAGE_KEY = 'delta_mithapukur_client_db_v1';
const CAMPAIGN_STORAGE_KEY = 'delta_mithapukur_campaigns_v1';

export function getStoredClients(): ClientRecord[] {
  try {
    const raw = localStorage.getItem(CLIENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CLIENTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CLIENTS;
  } catch (err) {
    console.error('Error reading client storage:', err);
    return DEFAULT_CLIENTS;
  }
}

export function saveStoredClients(clients: ClientRecord[]): void {
  try {
    localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clients));
  } catch (err) {
    console.error('Error saving clients:', err);
  }
}

export function getStoredCampaigns(): MarketingCampaign[] {
  try {
    const raw = localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!raw) return DEFAULT_CAMPAIGNS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_CAMPAIGNS;
  } catch {
    return DEFAULT_CAMPAIGNS;
  }
}

export function saveStoredCampaigns(campaigns: MarketingCampaign[]): void {
  try {
    localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaigns));
  } catch (err) {
    console.error('Error saving campaigns:', err);
  }
}

// Export Client Database to Excel CSV file with UTF-8 BOM so Excel opens Bengali text & formatting correctly
export function exportClientsToExcel(clients: ClientRecord[], filename = 'Delta_Mithapukur_Clients_Database.csv'): void {
  const headers = [
    'Client ID',
    'Full Name',
    'User Name',
    'Password',
    'Phone Number',
    'Gender',
    'Area / Locality',
    'PoP Name',
    'Zone Name',
    'Package / Plan',
    'Monthly Fee (BDT)',
    'Status',
    'Join Date',
    'Payment Method',
    'IP Address',
    'ONU MAC',
    'Router MAC',
    'NID Number',
    'Latitude',
    'Longitude',
    'Notes'
  ];

  const rows = clients.map(c => [
    c.id,
    c.fullName,
    c.username || '',
    c.password || '',
    c.phone,
    c.gender || 'Male',
    c.area,
    c.popName || '',
    c.zoneName || '',
    c.planName,
    c.monthlyFee.toString(),
    c.status,
    c.joinDate,
    c.paymentMethod,
    c.ipAddress || '',
    c.onuMac || '',
    c.routerMac || '',
    c.nidNumber || '',
    c.latitude || '',
    c.longitude || '',
    (c.notes || '').replace(/"/g, '""')
  ]);

  const csvLines = [
    headers.map(h => `"${h}"`).join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ];

  const csvString = csvLines.join('\n');
  
  // UTF-8 BOM prefix (\uFEFF) forces Microsoft Excel to recognize UTF-8 encoding
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export sample Excel template
export function downloadSampleExcelTemplate(): void {
  const sampleData: ClientRecord[] = [
    {
      id: 'DLT-SAMPLE-01',
      fullName: 'Sample Customer Name (কাস্টমারের নাম)',
      username: 'sample_user',
      password: 'SamplePassword123',
      phone: '01700-000000',
      gender: 'Male',
      area: 'Boldipukur Bazaar',
      popName: 'Akmal Market PoP-01',
      zoneName: 'Zone A - Boldipukur',
      planName: '30 Mbps Starter',
      monthlyFee: 630,
      status: 'Active',
      joinDate: '2026-07-28',
      paymentMethod: 'bKash',
      ipAddress: '103.145.22.100',
      onuMac: 'BC:54:36:11:22:33',
      routerMac: '74:83:C2:44:55:66',
      nidNumber: '19882691234567890',
      latitude: '25.5801',
      longitude: '89.2815',
      notes: 'Sample note description'
    }
  ];
  exportClientsToExcel(sampleData, 'Delta_Client_Import_Template.csv');
}

// Parse imported CSV / Excel exported file
export function parseCSVToClients(csvText: string): ClientRecord[] {
  // Remove BOM if present
  const cleanText = csvText.replace(/^\uFEFF/, '').trim();
  const lines = cleanText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const parsedClients: ClientRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    const matches = rawLine.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || rawLine.split(',');
    
    const cleanCells = matches.map(m => m.replace(/^"|"$/g, '').trim());

    if (cleanCells.length >= 4) {
      const id = cleanCells[0] || `DLT-IMP-${Math.floor(100 + Math.random() * 900)}`;
      const fullName = cleanCells[1] || 'Imported Client';
      const username = cleanCells[2] || '';
      const password = cleanCells[3] || '';
      const phone = cleanCells[4] || '01700-000000';
      const genderRaw = (cleanCells[5] || 'Male').toLowerCase();
      let gender: ClientRecord['gender'] = 'Male';
      if (genderRaw.includes('female')) gender = 'Female';
      else if (genderRaw.includes('other')) gender = 'Other';

      const area = cleanCells[6] || 'Mithapukur Area';
      const popName = cleanCells[7] || '';
      const zoneName = cleanCells[8] || '';
      const planName = cleanCells[9] || '30 Mbps Starter';
      const monthlyFee = parseFloat(cleanCells[10]) || 630;
      const statusRaw = (cleanCells[11] || 'Active').toLowerCase();
      
      let status: ClientRecord['status'] = 'Active';
      if (statusRaw.includes('pending')) status = 'Pending';
      else if (statusRaw.includes('suspend')) status = 'Suspended';
      else if (statusRaw.includes('inactive')) status = 'Inactive';

      const joinDate = cleanCells[12] || new Date().toISOString().slice(0, 10);
      const paymentMethodRaw = cleanCells[13] || 'bKash';
      let paymentMethod: ClientRecord['paymentMethod'] = 'bKash';
      if (paymentMethodRaw.toLowerCase().includes('nagad')) paymentMethod = 'Nagad';
      else if (paymentMethodRaw.toLowerCase().includes('cash')) paymentMethod = 'Cash';
      else if (paymentMethodRaw.toLowerCase().includes('bank')) paymentMethod = 'Bank';

      const ipAddress = cleanCells[14] || '';
      const onuMac = cleanCells[15] || '';
      const routerMac = cleanCells[16] || '';
      const nidNumber = cleanCells[17] || '';
      const latitude = cleanCells[18] || '';
      const longitude = cleanCells[19] || '';
      const notes = cleanCells[20] || cleanCells[17] || '';

      parsedClients.push({
        id,
        fullName,
        username,
        password,
        phone,
        gender,
        area,
        popName,
        zoneName,
        planName,
        monthlyFee,
        status,
        joinDate,
        paymentMethod,
        ipAddress,
        onuMac,
        routerMac,
        nidNumber,
        latitude,
        longitude,
        notes
      });
    }
  }

  return parsedClients;
}
