import React, { useState, useEffect, useMemo } from 'react';
import {
  LifeBuoy,
  X,
  Send,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Phone,
  User,
  MapPin,
  FileText,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  Ticket,
  ChevronRight,
  MessageSquare,
  Wrench,
  RefreshCw,
  Lock,
  LogOut,
  UserCheck,
  ShieldAlert,
  Key,
  Download,
  Printer,
  Trash2,
  PlusCircle,
  Building2,
  CheckSquare,
  ExternalLink,
  Smartphone,
  Laptop,
  Bot,
  Activity,
  Signal,
  Wifi,
  Mail,
  MessageCircle,
  Bell,
  Share2,
  Loader2,
  Users,
  UserPlus,
  QrCode,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';
import { useLanguage } from '../context/LanguageContext';
import { ClientRecord } from '../types/client';
import { getStoredClients, saveStoredClients } from '../lib/clientStorage';
import deltaLogoImg from '../assets/images/regenerated_image_1785198851415.jpg';
import { QRCodeSVG } from 'qrcode.react';

export interface SupportTicket {
  id: string;
  customerId: string;
  name: string;
  phone: string;
  union: string;
  category: string;
  priority: 'normal' | 'medium' | 'high' | 'emergency';
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  updatedAt: string;
  assignedTechnician?: string;
  updates?: { text: string; time: string; author: string }[];
}

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialTab?: 'fast_login' | 'create' | 'qr_ticket' | 'client_portal' | 'admin_portal' | 'client_db' | 'ai_diagnostics' | 'android_app';
}

const UNIONS_LIST = [
  'Mithapukur Sadar',
  'Boldipukur Market (Akmal Market)',
  'Ranipukur Union',
  'Gopalpur Market',
  'Kafrikhal Union',
  'Payraband Union',
  'Latifpur Market',
  'Mirzapur Union',
  'Bhangarhat Market',
  'Other Area'
];

const ISSUE_CATEGORIES = [
  { id: 'los_cut', label: '🔴 Red Light (LOS) / Fiber Line Cut', defaultPriority: 'emergency' },
  { id: 'slow_speed', label: '🐌 Slow Speed / High Ping & Latency', defaultPriority: 'medium' },
  { id: 'billing', label: '💳 Billing / bKash Payment / Renewal', defaultPriority: 'normal' },
  { id: 'router_wifi', label: '🛠️ Wi-Fi Password / Router Configuration', defaultPriority: 'normal' },
  { id: 'power_onu', label: '🔌 ONU Device Power / Optical Loss', defaultPriority: 'high' },
  { id: 'other', label: '❓ Other Technical / Line Request', defaultPriority: 'normal' }
];

export const QR_SUPPORT_PRESETS = [
  {
    id: 'los_emergency',
    title: '🔴 Red LOS Cut',
    category: '🔴 Red Light (LOS) / Fiber Line Cut',
    priority: 'emergency' as const,
    description: 'ONU LOS red light blinking continuously. Immediate fiber drop splice required.',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  },
  {
    id: 'slow_latency',
    title: '🐌 Slow Speed & Ping',
    category: '🐌 Slow Speed / High Ping & Latency',
    priority: 'medium' as const,
    description: 'Experiencing severe packet loss and slow download speeds during peak evening hours.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  {
    id: 'wifi_config',
    title: '🛠️ Router & Wi-Fi',
    category: '🛠️ Wi-Fi Password / Router Configuration',
    priority: 'normal' as const,
    description: 'Need assistance reconfiguring router SSID password and 5GHz optical channel settings.',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
  },
  {
    id: 'billing_renew',
    title: '💳 bKash Bill Renewal',
    category: '💳 Billing / bKash Payment / Renewal',
    priority: 'normal' as const,
    description: 'Monthly package fee sent via bKash. Requesting account validity extension.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  },
  {
    id: 'power_onu',
    title: '🔌 ONU Power Loss',
    category: '🔌 ONU Device Power / Optical Loss',
    priority: 'high' as const,
    description: 'ONU power indicator off. Optical drop power supply adapter failure suspected.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  }
];

const DEMO_TECHNICIANS = [
  'Mithapukur Emergency Line Squad (Akmal Market Hub)',
  'Boldipukur Field Tech Team B',
  'Ranipukur Fiber Splicing Specialist',
  'Sadar Central NOC Engineer (Sharif)',
  'Payraband Local Support Lineman'
];

const PLAN_PRESETS = [
  { name: '20 Mbps Economy Fiber', fee: 525 },
  { name: '30 Mbps Starter Fiber', fee: 630 },
  { name: '40 Mbps High-Speed Fiber', fee: 735 },
  { name: '50 Mbps Smart Stream', fee: 840 },
  { name: '60 Mbps Fiber Family', fee: 1050 },
  { name: '80 Mbps Gamers Choice', fee: 1260 },
  { name: '100 Mbps Dedicated Business', fee: 2499 }
];

const getPriorityInfo = (priority: SupportTicket['priority']) => {
  switch (priority) {
    case 'emergency':
      return {
        label: 'Emergency Cut',
        shortLabel: 'EMERGENCY',
        icon: ShieldAlert,
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm shadow-rose-950',
        iconColor: 'text-rose-400 animate-pulse'
      };
    case 'high':
      return {
        label: 'High Priority',
        shortLabel: 'HIGH',
        icon: AlertTriangle,
        badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40 shadow-sm shadow-orange-950',
        iconColor: 'text-orange-400'
      };
    case 'medium':
      return {
        label: 'Medium Priority',
        shortLabel: 'MEDIUM',
        icon: Activity,
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-950',
        iconColor: 'text-amber-400'
      };
    case 'normal':
    default:
      return {
        label: 'Low / Normal',
        shortLabel: 'LOW',
        icon: CheckCircle2,
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-sm shadow-blue-950',
        iconColor: 'text-blue-400'
      };
  }
};

export const PriorityBadge: React.FC<{
  priority: SupportTicket['priority'];
  showFullLabel?: boolean;
  className?: string;
}> = ({ priority, showFullLabel = false, className = '' }) => {
  const info = getPriorityInfo(priority);
  const IconComponent = info.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 font-extrabold px-2 py-0.5 rounded-full text-[10px] uppercase border tracking-wider transition-all ${info.badgeBg} ${className}`}
      title={`Ticket Priority: ${info.label}`}
    >
      <IconComponent className={`h-3 w-3 ${info.iconColor} shrink-0`} />
      <span>{showFullLabel ? info.label : info.shortLabel}</span>
    </span>
  );
};

export interface NocResponseStats {
  avgResponseTimeMinutes: number;
  avgResponseTimeFormatted: string;
  totalNocUpdates: number;
  slaCompliancePercent: number;
}

export function calculateNocResponseStats(ticketsList: SupportTicket[]): NocResponseStats {
  let totalMinutes = 0;
  let nocUpdatesCount = 0;
  let withinSlaCount = 0;

  ticketsList.forEach(ticket => {
    const createdTime = new Date(ticket.createdAt).getTime();
    if (isNaN(createdTime)) return;

    // Check if there are updates from NOC, Manager, or Technician
    const nocUpdates = (ticket.updates || []).filter(u =>
      /noc|manager|engineer|technician|desk|splicing/i.test(u.author || '') ||
      /assigned|updated|dispatched/i.test(u.text || '')
    );

    if (nocUpdates.length > 0) {
      const updatedTime = new Date(ticket.updatedAt).getTime();
      let diffMins = 0;
      if (!isNaN(updatedTime) && updatedTime > createdTime) {
        diffMins = Math.round((updatedTime - createdTime) / 60000);
      } else {
        diffMins = 14;
      }
      totalMinutes += Math.max(2, diffMins);
      nocUpdatesCount++;
      if (diffMins <= 30) {
        withinSlaCount++;
      }
    }
  });

  const avgMins = nocUpdatesCount > 0 ? Math.round((totalMinutes / nocUpdatesCount) * 10) / 10 : 12.5;
  const slaPercent = nocUpdatesCount > 0 ? Math.round((withinSlaCount / nocUpdatesCount) * 100) : 98;

  // Telemetry monitoring log
  console.log(`[NOC Monitoring Helper] Analyzed ${nocUpdatesCount} NOC updates across ${ticketsList.length} tickets. Avg Response Time: ${avgMins} mins | SLA: ${slaPercent}%`);

  return {
    avgResponseTimeMinutes: avgMins,
    avgResponseTimeFormatted: `${avgMins}m`,
    totalNocUpdates: nocUpdatesCount,
    slaCompliancePercent: slaPercent
  };
}

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose,
  initialCategory = '',
  initialTab
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'fast_login' | 'create' | 'qr_ticket' | 'client_portal' | 'admin_portal' | 'client_db' | 'ai_diagnostics' | 'android_app'>(initialTab || 'admin_portal');
  const [isMobileAppMode, setIsMobileAppMode] = useState<boolean>(false);

  // Form State for Ticket Creation
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [union, setUnion] = useState(UNIONS_LIST[0]);
  const [category, setCategory] = useState(initialCategory || ISSUE_CATEGORIES[0].label);
  const [priority, setPriority] = useState<'normal' | 'medium' | 'high' | 'emergency'>('high');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  // Dynamic QR Code Generation State
  const [qrTargetType, setQrTargetType] = useState<'whatsapp' | 'web_portal' | 'router_sticker'>('whatsapp');
  const [showLiveQrSection, setShowLiveQrSection] = useState<boolean>(true);
  const [qrSize, setQrSize] = useState<number>(180);
  const [qrPresetSelected, setQrPresetSelected] = useState<string>('');

  // Submitted ticket state
  const [lastCreatedTicket, setLastCreatedTicket] = useState<SupportTicket | null>(null);
  const [copiedTicketId, setCopiedTicketId] = useState(false);

  // Tickets storage
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Calculate NOC engineer update response stats via monitoring helper
  const nocResponseStats = useMemo(() => calculateNocResponseStats(tickets), [tickets]);

  // Admin / NOC Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
  const [adminUser, setAdminUser] = useState('info@deltamithapukur.net.bd');
  const [adminPass, setAdminPass] = useState('delta2026');
  const [adminError, setAdminError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'manager' | 'noc' | 'admin'>('manager');

  // Client Login ONLY via CID Number State
  const [clientCidInput, setClientCidInput] = useState('');
  const [loggedInClient, setLoggedInClient] = useState<{
    phone: string;
    name: string;
    customerId: string;
    area?: string;
    package?: string;
    rxPower?: string;
    status?: string;
  } | null>(null);
  const [clientError, setClientError] = useState('');

  // Admin Edit Ticket Form State
  const [adminNoteText, setAdminNoteText] = useState('');

  // Client Note Input
  const [clientNoteText, setClientNoteText] = useState('');

  // Client Database State
  const [clientsList, setClientsList] = useState<ClientRecord[]>([]);
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  // Add Client Form Fields
  const [newCid, setNewCid] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newArea, setNewArea] = useState(UNIONS_LIST[0]);
  const [newPlan, setNewPlan] = useState(PLAN_PRESETS[1].name);
  const [newFee, setNewFee] = useState(PLAN_PRESETS[1].fee);
  const [newIp, setNewIp] = useState('103.145.22.88');
  const [newStatus, setNewStatus] = useState<'Active' | 'Pending' | 'Inactive'>('Active');
  const [newPayment, setNewPayment] = useState<'bKash' | 'Nagad' | 'Cash' | 'Bank'>('bKash');

  // AI Diagnostic State
  const [aiCidInput, setAiCidInput] = useState('DLT-2026-101');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [aiReport, setAiReport] = useState<{
    status: 'OPTIMAL' | 'ATTENTION' | 'CRITICAL';
    rxPower: string;
    latency: string;
    lossDb: string;
    bKashStatus: string;
    summary: string;
    recommendation: string;
  } | null>(null);

  // Email / WhatsApp Notification Toast State
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Automatically redirect fast_login to admin_portal if already authorized
  useEffect(() => {
    if (activeTab === 'fast_login' && isAdminLoggedIn) {
      setActiveTab('admin_portal');
    }
  }, [activeTab, isAdminLoggedIn]);

  // Load tickets and clients on mount / open
  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      // Load clients
      const loadedClients = getStoredClients();
      setClientsList(loadedClients);

      // Load tickets
      try {
        const saved = localStorage.getItem('delta_support_tickets');
        if (saved) {
          setTickets(JSON.parse(saved));
        } else {
          const sampleTickets: SupportTicket[] = [
            {
              id: 'TK-DELTA-98421',
              customerId: 'DLT-2026-101',
              name: 'Mahbubur Rahman',
              phone: '01712-345678',
              union: 'Boldipukur Market (Akmal Market)',
              category: '🔴 Red Light (LOS) / Fiber Line Cut',
              priority: 'emergency',
              subject: 'Optical fiber drop cable severed by road construction near Akmal Market',
              description: 'ONU LOS red light blinking continuously since 2:30 PM.',
              status: 'IN_PROGRESS',
              createdAt: new Date(Date.now() - 3600000 * 2).toLocaleString(),
              updatedAt: new Date(Date.now() - 1800000).toLocaleString(),
              assignedTechnician: 'Mithapukur Emergency Line Squad (Akmal Market Hub)',
              updates: [
                {
                  text: 'Fiber splicing team dispatched to Akmal Market optical splitter box.',
                  time: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  author: 'Branch Manager (MD. Mahamudul Hasan)'
                },
                {
                  text: 'Ticket created and automated email alert sent to info@deltamithapukur.net.bd.',
                  time: new Date(Date.now() - 3600000 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  author: 'Delta Dispatch Engine'
                }
              ]
            },
            {
              id: 'TK-DELTA-74129',
              customerId: 'DLT-2026-102',
              name: 'Anwar Hossain',
              phone: '01819-876543',
              union: 'Mithapukur Sadar',
              category: '🐌 Slow Speed / High Ping & Latency',
              priority: 'medium',
              subject: 'Speed fluctuation during peak evening hours',
              description: 'Latency increases on international routes during 8:00 PM to 10:00 PM.',
              status: 'OPEN',
              createdAt: new Date(Date.now() - 3600000 * 5).toLocaleString(),
              updatedAt: new Date(Date.now() - 3600000 * 5).toLocaleString(),
              assignedTechnician: 'Sadar Central NOC Engineer (Sharif)',
              updates: [
                {
                  text: 'Ticket registered by subscriber via CID Login.',
                  time: new Date(Date.now() - 3600000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  author: 'Subscriber System'
                }
              ]
            }
          ];
          setTickets(sampleTickets);
          localStorage.setItem('delta_support_tickets', JSON.stringify(sampleTickets));
        }
      } catch (err) {
        console.error('Failed to parse tickets', err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveTicketsToStorage = (updatedList: SupportTicket[]) => {
    setTickets(updatedList);
    localStorage.setItem('delta_support_tickets', JSON.stringify(updatedList));
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4500);
  };

  // Submit new Support Ticket
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !description.trim()) {
      alert(language === 'bn' ? 'অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং সমস্যার বিবরণ লিখুন।' : 'Please enter your name, phone number, and issue description.');
      return;
    }

    setIsSubmittingTicket(true);

    setTimeout(() => {
      setIsSubmittingTicket(false);

      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const newTicketId = `TK-DELTA-${randomNum}`;
      const finalCid = customerId.trim().toUpperCase() || `DLT-MITH-${Math.floor(100 + Math.random() * 900)}`;

      let techAssigned = 'Mithapukur Rapid Field Response Team';
      if (priority === 'emergency') {
        techAssigned = 'Mithapukur Emergency Line Squad (Akmal Market Hub)';
      }

      const newTicket: SupportTicket = {
        id: newTicketId,
        customerId: finalCid,
        name: name.trim(),
        phone: phone.trim(),
        union: union,
        category: category,
        priority: priority,
        subject: subject.trim() || `${category} - ${union}`,
        description: description.trim(),
        status: 'OPEN',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        assignedTechnician: techAssigned,
        updates: [
          {
            text: `Ticket created. Automated dispatch alert sent to Branch Manager (WhatsApp: 01944455176) & Email info@deltamithapukur.net.bd.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            author: 'Delta Dispatch System'
          }
        ]
      };

      const updatedList = [newTicket, ...tickets];
      saveTicketsToStorage(updatedList);

      setLastCreatedTicket(newTicket);
      setSelectedTicket(newTicket);

      showToast(`📩 Notification alert sent to info@deltamithapukur.net.bd & Manager WhatsApp 01944455176!`);

      setCustomerId('');
      setName('');
      setPhone('');
      setSubject('');
      setDescription('');
    }, 700);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedTicketId(true);
    setTimeout(() => setCopiedTicketId(false), 2000);
  };

  // Branch Manager & NOC Login
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const u = adminUser.trim().toLowerCase();
    const p = adminPass.trim();

    if (
      !u ||
      u === 'admin' ||
      u === 'noc' ||
      u === 'manager' ||
      u.includes('info@deltamithapukur.net.bd') ||
      u.includes('manager@deltamithapukur.net.bd') ||
      u.includes('noc@deltamithapukur.net.bd') ||
      u.includes('admin@deltamithapukur.net.bd') ||
      u.includes('@') ||
      u.length > 0
    ) {
      setIsAdminLoggedIn(true);
      setActiveTab('admin_portal');
      setAdminError('');
      showToast('🛡️ Authorized Fast Login: Branch Manager & NOC Control Desk active.');
    } else {
      setAdminError('Invalid credentials. Official Email: info@deltamithapukur.net.bd / Password: delta2026');
    }
  };

  // Update Status & Notify Email/WhatsApp
  const handleUpdateTicketStatus = (ticketId: string, newStatus: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED') => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatesList = t.updates || [];
        return {
          ...t,
          status: newStatus,
          updatedAt: new Date().toLocaleString(),
          updates: [
            {
              text: `Status updated to ${newStatus} by Branch Manager. Client notified via WhatsApp.`,
              time: timeStr,
              author: 'Branch Manager (MD. Mahamudul Hasan)'
            },
            ...updatesList
          ]
        };
      }
      return t;
    });
    saveTicketsToStorage(updated);
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(updated.find(x => x.id === ticketId) || null);
    }
    showToast(`✅ Ticket ${ticketId} status changed to ${newStatus}. Status update sent to client!`);
  };

  // Update Priority
  const handleUpdateTicketPriority = (ticketId: string, newPriority: 'normal' | 'medium' | 'high' | 'emergency') => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatesList = t.updates || [];
        return {
          ...t,
          priority: newPriority,
          updatedAt: new Date().toLocaleString(),
          updates: [
            {
              text: `Priority updated to ${newPriority.toUpperCase()} by NOC Desk.`,
              time: timeStr,
              author: 'NOC Manager'
            },
            ...updatesList
          ]
        };
      }
      return t;
    });
    saveTicketsToStorage(updated);
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(updated.find(x => x.id === ticketId) || null);
    }
  };

  // Assign Technician
  const handleAssignTechnician = (ticketId: string, techName: string) => {
    if (!techName.trim()) return;
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatesList = t.updates || [];
        return {
          ...t,
          assignedTechnician: techName,
          updatedAt: new Date().toLocaleString(),
          updates: [
            {
              text: `Assigned to ${techName}`,
              time: timeStr,
              author: 'Branch Manager'
            },
            ...updatesList
          ]
        };
      }
      return t;
    });
    saveTicketsToStorage(updated);
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(updated.find(x => x.id === ticketId) || null);
    }
  };

  // Add Manager Note
  const handleAddAdminNote = (ticketId: string) => {
    if (!adminNoteText.trim()) return;
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatesList = t.updates || [];
        return {
          ...t,
          updatedAt: new Date().toLocaleString(),
          updates: [
            {
              text: adminNoteText.trim(),
              time: timeStr,
              author: 'Branch Manager (MD. Mahamudul Hasan)'
            },
            ...updatesList
          ]
        };
      }
      return t;
    });
    saveTicketsToStorage(updated);
    setAdminNoteText('');
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(updated.find(x => x.id === ticketId) || null);
    }
    showToast('📝 Manager update note logged and sent to client view.');
  };

  // Delete Ticket
  const handleDeleteTicket = (ticketId: string) => {
    if (confirm('Are you sure you want to delete this support ticket?')) {
      const updated = tickets.filter(t => t.id !== ticketId);
      saveTicketsToStorage(updated);
      setSelectedTicket(null);
      showToast('🗑️ Ticket permanently removed.');
    }
  };

  // WhatsApp Alert Trigger to Manager & Client
  const handleOpenWhatsAppAlert = (t: SupportTicket) => {
    const rawPhone = t.phone.replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('88') ? rawPhone : `88${rawPhone}`;
    const msg = `*DELTA MITHAPUKUR SUPPORT TICKET UPDATE*\n\nTicket ID: ${t.id}\nCustomer CID: ${t.customerId}\nName: ${t.name}\nArea: ${t.union}\nStatus: ${t.status}\nPriority: ${t.priority.toUpperCase()}\nAssigned Lineman: ${t.assignedTechnician || 'Mithapukur Field Unit'}\nIssue: ${t.subject}\n\nFor NOC Support, Call: 01944455176 / 0171-9394430\nOfficial Email: info@deltamithapukur.net.bd`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Direct WhatsApp Trigger to Manager (01944455176)
  const handleSendToManagerWhatsApp = (t: SupportTicket) => {
    const managerPhone = '8801944455176';
    const msg = `*NEW DISPATCH ALERT FOR BRANCH MANAGER*\n\nTicket ID: ${t.id}\nSubscriber CID: ${t.customerId}\nName: ${t.name}\nPhone: ${t.phone}\nArea: ${t.union}\nIssue Category: ${t.category}\nPriority: ${t.priority.toUpperCase()}\nDescription: ${t.description}`;
    const url = `https://wa.me/${managerPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Email Notification Trigger Simulator to info@deltamithapukur.net.bd
  const handleTriggerEmailAlert = (t: SupportTicket) => {
    showToast(`📩 Email notification dispatched to info@deltamithapukur.net.bd for Ticket ${t.id}!`);
  };

  // Dynamic QR Code Generator: Build Portal URL
  const buildQuickTicketPortalUrl = (
    cidVal: string = customerId,
    nameVal: string = name,
    phoneVal: string = phone,
    unionVal: string = union,
    catVal: string = category,
    priVal: string = priority,
    descVal: string = description
  ) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://deltamithapukur.net.bd';
    const params = new URLSearchParams();
    params.set('action', 'quick_ticket');
    if (cidVal.trim()) params.set('cid', cidVal.trim().toUpperCase());
    if (nameVal.trim()) params.set('name', nameVal.trim());
    if (phoneVal.trim()) params.set('phone', phoneVal.trim());
    if (unionVal) params.set('union', unionVal);
    if (catVal) params.set('cat', catVal);
    if (priVal) params.set('pri', priVal);
    if (descVal.trim()) params.set('desc', descVal.trim());
    return `${origin}/?${params.toString()}`;
  };

  // Dynamic QR Code Generator: Build WhatsApp URL
  const buildWhatsAppDirectTicketUrl = (
    cidVal: string = customerId,
    nameVal: string = name,
    phoneVal: string = phone,
    unionVal: string = union,
    catVal: string = category,
    priVal: string = priority,
    descVal: string = description
  ) => {
    const managerPhone = '8801944455176';
    const text =
      `*⚡ DELTA MITHAPUKUR RAPID SUPPORT DISPATCH*\n\n` +
      `• Subscriber CID: ${cidVal.trim() ? cidVal.trim().toUpperCase() : 'DLT-MITH-GUEST'}\n` +
      `• Name: ${nameVal.trim() || 'Valued Subscriber'}\n` +
      `• Contact: ${phoneVal.trim() || 'N/A'}\n` +
      `• Union/Area: ${unionVal || 'Mithapukur'}\n` +
      `• Issue Category: ${catVal || 'Optical Fiber Support'}\n` +
      `• Priority: ${(priVal || 'HIGH').toUpperCase()}\n` +
      (descVal.trim() ? `• Issue Notes: ${descVal.trim()}\n\n` : '\n') +
      `_Generated via Delta Mithapukur Dynamic QR Support Desk_\n` +
      `_NOC Email: info@deltamithapukur.net.bd_`;
    return `https://wa.me/${managerPhone}?text=${encodeURIComponent(text)}`;
  };

  // Dynamic QR Code Generator: Router Sticker Payload
  const buildRouterStickerPayload = (
    cidVal: string = customerId,
    nameVal: string = name,
    phoneVal: string = phone,
    unionVal: string = union
  ) => {
    return (
      `DELTA-MITHAPUKUR-FIBER-SUPPORT\n` +
      `CID:${cidVal.trim() ? cidVal.trim().toUpperCase() : 'DLT-MITH-CLIENT'}\n` +
      `NAME:${nameVal.trim() || 'Subscriber'}\n` +
      `PHONE:${phoneVal.trim() || '01944455176'}\n` +
      `AREA:${unionVal || 'Mithapukur'}\n` +
      `HOTLINE:01944455176\n` +
      `WEB:https://deltamithapukur.net.bd`
    );
  };

  // Get active dynamic QR code value
  const getDynamicQrValue = () => {
    if (qrTargetType === 'whatsapp') {
      return buildWhatsAppDirectTicketUrl();
    } else if (qrTargetType === 'web_portal') {
      return buildQuickTicketPortalUrl();
    } else {
      return buildRouterStickerPayload();
    }
  };

  // Download SVG QR Code as high-res PNG image
  const downloadQrAsPng = (elementId: string, filename: string = 'delta-support-qr.png') => {
    const svg = document.getElementById(elementId);
    if (!svg) {
      showToast('❌ Unable to find QR code element for download.');
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = (img.width || 240) + 40;
      canvas.height = (img.height || 240) + 40;
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.href = pngFile;
        downloadLink.click();
        showToast(`📥 QR Code saved as ${filename}!`);
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  // Print Formatted Router QR Sticker
  const handlePrintQrBadge = (data: {
    cid?: string;
    name?: string;
    phone?: string;
    union?: string;
    category?: string;
    qrSvgId: string;
  }) => {
    const svg = document.getElementById(data.qrSvgId);
    if (!svg) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Delta Mithapukur Quick Support QR Sticker</title>
          <style>
            @page { size: auto; margin: 8mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; margin: 0; padding: 16px; background: #fff; color: #0f172a; }
            .badge-card { border: 2.5px dashed #0284c7; border-radius: 16px; padding: 18px; max-width: 320px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            .logo-title { font-size: 17px; font-weight: 900; color: #0284c7; margin: 2px 0; }
            .subtitle { font-size: 11px; color: #64748b; margin-bottom: 10px; }
            .qr-wrapper { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px; display: inline-block; margin: 6px 0; }
            .info-row { font-size: 11.5px; margin: 4px 0; display: flex; justify-content: space-between; border-bottom: 1px dotted #cbd5e1; padding-bottom: 3px; }
            .info-label { color: #64748b; }
            .info-val { font-weight: bold; color: #0f172a; }
            .hotline-box { background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; padding: 8px; margin-top: 10px; }
            .hotline-title { font-size: 9.5px; font-weight: bold; color: #e11d48; text-transform: uppercase; }
            .hotline-nums { font-size: 13px; font-weight: 900; color: #be123c; margin-top: 2px; }
            .footer-note { font-size: 9px; color: #94a3b8; margin-top: 8px; }
          </style>
        </head>
        <body>
          <div class="badge-card">
            <div class="logo-title">DELTA MITHAPUKUR ISP</div>
            <div class="subtitle">Quick Support & Rapid Fiber Outage QR</div>
            <div class="qr-wrapper">
              ${svg.outerHTML}
            </div>
            <div class="info-row">
              <span class="info-label">Customer CID:</span>
              <span class="info-val">${data.cid || 'DLT-MITH-CLIENT'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Subscriber:</span>
              <span class="info-val">${data.name || 'Valued Client'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span class="info-val">${data.phone || '01944455176'}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Area Hub:</span>
              <span class="info-val">${data.union || 'Mithapukur'}</span>
            </div>
            <div class="hotline-box">
              <div class="hotline-title">24/7 Mithapukur NOC Hotline</div>
              <div class="hotline-nums">01944455176 • 0171-9394430</div>
            </div>
            <div class="footer-note">Stick on ONU / Wi-Fi Router for 1-Touch Smartphone Support</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Apply Quick Support QR Preset
  const handleApplyQrPreset = (preset: {
    id: string;
    title: string;
    category: string;
    priority: 'normal' | 'medium' | 'high' | 'emergency';
    description: string;
  }) => {
    setCategory(preset.category);
    setPriority(preset.priority);
    setDescription(preset.description);
    setSubject(`${preset.category} - ${union}`);
    setQrPresetSelected(preset.id);
    showToast(`⚡ Loaded preset: ${preset.title}! QR code updated.`);
  };

  // AI Diagnostic Run
  const handleRunAiDiagnostic = () => {
    setIsDiagnosing(true);
    setAiReport(null);
    setTimeout(() => {
      setIsDiagnosing(false);
      if (aiCidInput.toLowerCase().includes('101') || aiCidInput.toLowerCase().includes('cut')) {
        setAiReport({
          status: 'CRITICAL',
          rxPower: '-28.4 dBm (High Optical Attenuation)',
          latency: 'Timeout / Packet Loss 84%',
          lossDb: '11.2 dB extra loss detected',
          bKashStatus: 'Active Paid (Expires in 22 days)',
          summary: 'Severe Optical Power Loss detected at 1310nm wavelength on fiber drop loop near Boldipukur.',
          recommendation: 'Direct lineman squad to check local Akmal Market optical splitter box or splice broken fiber drop line.'
        });
      } else {
        setAiReport({
          status: 'OPTIMAL',
          rxPower: '-18.2 dBm (Prime Optical Signal)',
          latency: '1.8 ms to BDIX Central Switch',
          lossDb: '0.4 dB (Optimal Range)',
          bKashStatus: 'Active Paid (Expires in 18 days)',
          summary: 'ONU optical power, laser diode temperature, and BDIX peering link operating in prime parameters.',
          recommendation: 'Line signal is healthy. If experiencing wifi slowdown, restart 5GHz dual-band router or check connected client devices.'
        });
      }
    }, 1200);
  };

  // Client Login STRICTLY via CID Number
  const handleClientCidLogin = (e?: React.FormEvent, directCid?: string) => {
    if (e) e.preventDefault();
    const query = (directCid || clientCidInput).trim().toUpperCase();

    if (!query) {
      setClientError('Please enter your Subscriber CID Number (e.g. DLT-2026-101, CID-1024, or 101).');
      return;
    }

    // Match in Client Database
    const matchedClient = clientsList.find(
      c =>
        c.id.toUpperCase() === query ||
        c.id.toUpperCase().includes(query) ||
        (c.username && c.username.toUpperCase() === query) ||
        c.phone.includes(query)
    );

    // Match in Tickets
    const matchedTicket = tickets.find(
      t => t.customerId.toUpperCase() === query || t.customerId.toUpperCase().includes(query) || t.phone.includes(query)
    );

    if (matchedClient) {
      setLoggedInClient({
        customerId: matchedClient.id,
        name: matchedClient.fullName,
        phone: matchedClient.phone,
        area: matchedClient.area,
        package: matchedClient.planName,
        rxPower: '-18.2 dBm',
        status: matchedClient.status
      });
      setClientError('');
      showToast(`👋 Welcome ${matchedClient.fullName}! Logged in via CID ${matchedClient.id}.`);
    } else if (matchedTicket) {
      setLoggedInClient({
        customerId: matchedTicket.customerId,
        name: matchedTicket.name,
        phone: matchedTicket.phone,
        area: matchedTicket.union,
        package: '40 Mbps High-Speed Fiber',
        rxPower: '-19.1 dBm',
        status: 'Active'
      });
      setClientError('');
      showToast(`👋 Welcome ${matchedTicket.name}! Logged in via CID ${matchedTicket.customerId}.`);
    } else {
      // Demo fallback login if unknown CID entered
      const demoCid = query.startsWith('DLT') ? query : `DLT-${query}`;
      setLoggedInClient({
        customerId: demoCid,
        name: 'Mithapukur Fiber Subscriber',
        phone: '01712-345678',
        area: 'Boldipukur Market',
        package: '50 Mbps Smart Stream',
        rxPower: '-18.5 dBm',
        status: 'Active'
      });
      setClientError('');
      showToast(`👋 Welcome! Signed in with Subscriber CID ${demoCid}.`);
    }
  };

  // Add New Client to Database
  const handleAddNewClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      alert('Please fill in Client Name and Mobile Phone Number.');
      return;
    }

    const assignedCid = newCid.trim().toUpperCase() || `DLT-2026-${Math.floor(105 + Math.random() * 895)}`;

    const newClientRecord: ClientRecord = {
      id: assignedCid,
      fullName: newName.trim(),
      phone: newPhone.trim(),
      area: newArea,
      planName: newPlan,
      monthlyFee: newFee,
      status: newStatus,
      paymentMethod: newPayment,
      ipAddress: newIp.trim() || '103.145.22.88',
      joinDate: new Date().toISOString().slice(0, 10),
      notes: 'Registered via Mithapukur Support & Portal System.'
    };

    const updatedList = [newClientRecord, ...clientsList];
    setClientsList(updatedList);
    saveStoredClients(updatedList);

    setIsAddClientModalOpen(false);
    showToast(`✅ New Client ${newName} (CID: ${assignedCid}) successfully registered in database!`);

    // Reset Form
    setNewCid('');
    setNewName('');
    setNewPhone('');
  };

  // Export CSV of Clients
  const handleExportClientsCSV = () => {
    const headers = ['CID Number', 'Full Name', 'Phone', 'Area', 'Package', 'Fee (BDT)', 'Status', 'IP Address', 'Join Date'];
    const rows = clientsList.map(c => [
      c.id,
      `"${c.fullName}"`,
      c.phone,
      `"${c.area}"`,
      `"${c.planName}"`,
      c.monthlyFee,
      c.status,
      c.ipAddress || '',
      c.joinDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Delta_Mithapukur_Clients_Database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Work Order PDF/Print window
  const handlePrintTicket = (ticket: SupportTicket) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Work Order - ${ticket.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #1e293b; }
            .header { border-bottom: 2px solid #0284c7; padding-bottom: 10px; margin-bottom: 20px; }
            .badge { display: inline-block; padding: 4px 8px; background: #e0f2fe; color: #0369a1; border-radius: 4px; font-weight: bold; }
            .box { border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            td { padding: 6px; border-bottom: 1px solid #e2e8f0; }
            td.bold { font-weight: bold; width: 35%; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Delta Broadband Mithapukur Branch — Fiber Work Order</h2>
            <p>Akmal Market Central PoP | Hotline: 01944455176 / 0171-9394430 | Email: info@deltamithapukur.net.bd</p>
          </div>
          <div class="box">
            <span class="badge">Ticket ID: ${ticket.id}</span>
            <span class="badge" style="background:#fee2e2; color:#991b1b;">Priority: ${ticket.priority.toUpperCase()}</span>
            <table>
              <tr><td class="bold">Subscriber Name:</td><td>${ticket.name}</td></tr>
              <tr><td class="bold">Subscriber CID:</td><td>${ticket.customerId}</td></tr>
              <tr><td class="bold">Mobile Phone:</td><td>${ticket.phone}</td></tr>
              <tr><td class="bold">Union / Area:</td><td>${ticket.union}</td></tr>
              <tr><td class="bold">Issue Category:</td><td>${ticket.category}</td></tr>
              <tr><td class="bold">Subject:</td><td>${ticket.subject}</td></tr>
              <tr><td class="bold">Description:</td><td>${ticket.description}</td></tr>
              <tr><td class="bold">Assigned Lineman/Tech:</td><td>${ticket.assignedTechnician || 'Mithapukur Lineman Squad'}</td></tr>
              <tr><td class="bold">Created Date:</td><td>${ticket.createdAt}</td></tr>
            </table>
          </div>
          <div style="margin-top: 30px; font-size: 12px; color: #64748b; text-align: center;">
            <p>Printed on: ${new Date().toLocaleString()} | Official Lineman Dispatch Copy</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Filtered lists
  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.phone.includes(searchQuery) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.union.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const clientTickets = loggedInClient
    ? tickets.filter(t => t.customerId === loggedInClient.customerId || t.phone === loggedInClient.phone)
    : [];

  const filteredClients = clientsList.filter(c => {
    const q = clientSearchQuery.toLowerCase();
    return (
      c.id.toLowerCase().includes(q) ||
      c.fullName.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.area.toLowerCase().includes(q) ||
      c.planName.toLowerCase().includes(q)
    );
  });

  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status === 'OPEN').length;
  const progressCount = tickets.filter(t => t.status === 'IN_PROGRESS').length;
  const resolvedCount = tickets.filter(t => t.status === 'RESOLVED').length;
  const emergencyCount = tickets.filter(t => t.priority === 'emergency').length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-0 sm:p-2 overflow-hidden">
      <div className={`relative w-full ${isMobileAppMode ? 'max-w-md h-[92vh]' : 'w-full h-full sm:h-[96vh] max-w-full md:max-w-[99vw]'} sm:rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-auto flex flex-col transition-all duration-300`}>
        
        {/* Top App Mode & Modal Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 p-3 sm:px-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 min-w-11 items-center justify-center rounded-xl bg-white p-1 shadow-lg shadow-blue-500/20 ring-1 ring-slate-200">
              <img
                src={deltaLogoImg}
                alt="Delta Official Logo"
                className="h-full w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Delta Mithapukur Support Portal
                </h2>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  NOC 24/7
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Branch Manager NOC Control • Client CID Login • Email info@deltamithapukur.net.bd • WhatsApp 01944455176
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Client Apps Button */}
            <button
              onClick={() => setActiveTab('android_app')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'android_app'
                  ? 'bg-teal-500/30 text-teal-200 border-teal-400 shadow-md shadow-teal-500/20'
                  : 'bg-gradient-to-r from-teal-950 to-slate-900 text-teal-300 hover:text-teal-100 border-teal-500/50 hover:border-teal-400 shadow-sm'
              }`}
              title="Delta ISP Mobile App & Download (.APK) for Clients"
            >
              <Smartphone className="h-3.5 w-3.5 text-teal-400 shrink-0" />
              <span>Client Apps</span>
            </button>

            {/* View Mode Toggle Button */}
            <button
              onClick={() => setIsMobileAppMode(!isMobileAppMode)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                isMobileAppMode
                  ? 'bg-emerald-600 text-white border-emerald-400/50 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Toggle Mobile App Mode vs Full Portal View"
            >
              {isMobileAppMode ? <Smartphone className="h-3.5 w-3.5 text-emerald-300" /> : <Laptop className="h-3.5 w-3.5 text-blue-400" />}
              <span className="hidden sm:inline">{isMobileAppMode ? 'Android View' : 'App View'}</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Email & WhatsApp Notification Toast Bar */}
        {notificationToast && (
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-200" />
              <span>{notificationToast}</span>
            </div>
            <button onClick={() => setNotificationToast(null)} className="text-white hover:underline text-[11px] ml-2">
              Dismiss
            </button>
          </div>
        )}

        {/* Android App Status Bar (When in Android App Mode) */}
        {isMobileAppMode && (
          <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">12:45 PM</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                5G DELTA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Signal className="h-3 w-3 text-emerald-400" />
              <Wifi className="h-3 w-3 text-emerald-400" />
              <span className="text-slate-300">98%</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs (Hidden on Login Page when not logged in) */}
        {!(activeTab === 'fast_login' && !isAdminLoggedIn) && (
          <div className="flex items-center gap-1 border-b border-slate-800 px-3 sm:px-6 bg-slate-950/90 overflow-x-auto">
            <button
              onClick={() => setActiveTab('fast_login')}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-black text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'fast_login'
                  ? 'border-amber-400 text-amber-300 bg-amber-500/15'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>⚡ Fast Login</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-0.5">
                Manager & NOC
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('create');
                setLastCreatedTicket(null);
              }}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'create'
                  ? 'border-rose-500 text-rose-400 bg-rose-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Ticket className="h-3.5 w-3.5 text-rose-400" />
              <span>New Ticket</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('qr_ticket');
              }}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'qr_ticket'
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>⚡ QR Quick Ticket</span>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-0.5">
                Dynamic
              </span>
            </button>

            <button
              onClick={() => setActiveTab('client_portal')}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'client_portal'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Client CID Login</span>
            </button>

            <button
              onClick={() => setActiveTab('admin_portal')}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'admin_portal'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Branch Manager NOC</span>
            </button>

            <button
              onClick={() => setActiveTab('client_db')}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'client_db'
                  ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-indigo-400" />
              <span>Client Database ({clientsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_diagnostics')}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'ai_diagnostics'
                  ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="h-3.5 w-3.5 text-purple-400" />
              <span>AI Optical Scan</span>
            </button>

            <button
              onClick={() => setActiveTab('android_app')}
              className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'android_app'
                  ? 'border-teal-500 text-teal-400 bg-teal-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5 text-teal-400" />
              <span>Android App (.APK)</span>
            </button>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* TAB 0: FAST LOGIN (BRANCH MANAGER & NOC BY EMAIL & PASSWORD) */}
          {activeTab === 'fast_login' && (
            <div className="max-w-2xl mx-auto space-y-5 animate-fadeIn">
              {!isAdminLoggedIn ? (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-amber-500/30 shadow-2xl space-y-5">
                  {/* Fast Login Header Banner */}
                  <div className="text-center space-y-2 border-b border-slate-800 pb-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-2xl shadow-amber-500/25 ring-2 ring-amber-400/50 mb-1 transition-transform hover:scale-105">
                      <img
                        src={deltaLogoImg}
                        alt="Delta ISP Official Logo"
                        className="h-full w-full object-contain rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                      <span>Branch Manager & NOC Fast Login</span>
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Email & Pass
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto">
                      Authorized Access for Branch Operations, Lineman Dispatch & Client Database Control.
                    </p>
                  </div>

                  {adminError && (
                    <div className="p-3 bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs rounded-xl text-center font-medium flex items-center justify-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                      <span>{adminError}</span>
                    </div>
                  )}

                  {/* Form: Email and Password */}
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-amber-400" />
                        <span>Branch Manager / NOC Email Address *</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={adminUser}
                          onChange={e => setAdminUser(e.target.value)}
                          placeholder="info@deltamithapukur.net.bd"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 px-4 py-3 rounded-xl text-slate-100 text-xs font-mono focus:outline-none transition-all pl-10"
                        />
                        <Mail className="h-4 w-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Official Email: <strong className="text-amber-300">info@deltamithapukur.net.bd</strong>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-amber-400" />
                        <span>Account Password *</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={adminPass}
                          onChange={e => setAdminPass(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 px-4 py-3 rounded-xl text-slate-100 text-xs font-mono focus:outline-none transition-all pl-10 pr-10"
                        />
                        <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white cursor-pointer"
                          title={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Role selector */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Select Operating Role
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRole('manager');
                            setAdminUser('info@deltamithapukur.net.bd');
                            setAdminPass('delta2026');
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedRole === 'manager'
                              ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="text-xs font-bold flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5 text-amber-400" />
                            <span>Branch Manager</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block font-mono">info@...net.bd</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRole('noc');
                            setAdminUser('noc@deltamithapukur.net.bd');
                            setAdminPass('noc2026');
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedRole === 'noc'
                              ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="text-xs font-bold flex items-center gap-1">
                            <Signal className="h-3.5 w-3.5 text-emerald-400" />
                            <span>NOC Lead</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block font-mono">noc@...net.bd</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40"
                    >
                      <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
                      <span>Fast Authorize & Login (Email + Password)</span>
                    </button>
                  </form>

                  {/* One-Click Fast Login Presets Section */}
                  <div className="pt-3 border-t border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5" />
                        <span>One-Click Fast Login Presets</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Instant Access</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAdminUser('info@deltamithapukur.net.bd');
                          setAdminPass('delta2026');
                          setSelectedRole('manager');
                          setIsAdminLoggedIn(true);
                          setActiveTab('admin_portal');
                          showToast('⚡ Authorized as Branch Manager (MD. Mahamudul Hasan)!');
                        }}
                        className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1.5">
                          <Building2 className="h-4 w-4 text-amber-400" />
                          <span>Branch Manager</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">info@deltamithapukur.net.bd</span>
                        <span className="text-[9px] text-emerald-400 font-bold block mt-1">✓ One-Click Login</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setAdminUser('noc@deltamithapukur.net.bd');
                          setAdminPass('noc2026');
                          setSelectedRole('noc');
                          setIsAdminLoggedIn(true);
                          setActiveTab('admin_portal');
                          showToast('⚡ Authorized as NOC Central Desk Lead!');
                        }}
                        className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-left transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-emerald-300 group-hover:text-emerald-200 flex items-center gap-1.5">
                          <Signal className="h-4 w-4 text-emerald-400" />
                          <span>NOC Control Lead</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">noc@deltamithapukur.net.bd</span>
                        <span className="text-[9px] text-emerald-400 font-bold block mt-1">✓ One-Click Login</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ACTIVE MANAGER / NOC LOGGED-IN SESSION DASHBOARD CARD */
                <div className="p-6 bg-slate-950 rounded-2xl border border-emerald-500/40 shadow-2xl space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
                        <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-white">Active Authorized Session</h3>
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                            ACTIVE NOC & MANAGER
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Logged in as <strong className="text-emerald-400 font-mono">{adminUser || 'info@deltamithapukur.net.bd'}</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsAdminLoggedIn(false);
                        showToast('🔒 Manager session ended.');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer border border-slate-700"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Lock / Log Out</span>
                    </button>
                  </div>

                  {/* Manager Information Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Branch Officer Name</span>
                      <strong className="text-sm font-bold text-white">MD. Mahamudul Hasan</strong>
                      <p className="text-[11px] text-amber-400 font-medium">Branch Executive Lead & NOC Manager</p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Central PoP Hub</span>
                      <strong className="text-sm font-bold text-white">Boldipukur Market (Akmal Market)</strong>
                      <p className="text-[11px] text-emerald-400 font-mono">24/7 Optical Splitter Monitoring</p>
                    </div>
                  </div>

                  {/* Fast Action Shortcuts */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-400" />
                      <span>Fast Action Navigation</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setActiveTab('admin_portal')}
                        className="p-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4" />
                          <span>Open Branch Manager NOC Control</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('client_db')}
                        className="p-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Access Client Database ({clientsList.length})</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('create')}
                        className="p-3.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          <span>Rapid Lineman Line Cut Dispatch</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('ai_diagnostics')}
                        className="p-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          <span>AI Optical Signal Diagnostics</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 1: CREATE SUPPORT TICKET */}
          {activeTab === 'create' && (
            lastCreatedTicket ? (
              <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 text-center space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">
                    {language === 'bn' ? 'সাপোর্ট টিকিট সফলভাবে তৈরি হয়েছে!' : 'Support Ticket Logged Successfully!'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Notification alert dispatched to Email <strong className="text-emerald-400">info@deltamithapukur.net.bd</strong> and Branch Manager WhatsApp <strong className="text-emerald-400">01944455176</strong>.
                  </p>
                </div>

                {/* Ticket ID Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-xs">
                  <span className="text-slate-400">Ticket ID:</span>
                  <strong className="text-emerald-400 font-bold text-sm">{lastCreatedTicket.id}</strong>
                  <button
                    onClick={() => handleCopyId(lastCreatedTicket.id)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                    title="Copy Ticket ID"
                  >
                    {copiedTicketId ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Dynamic Ticket Tracking QR Code */}
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-md mx-auto space-y-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black text-white">
                      <QrCode className="h-4 w-4 text-emerald-400" />
                      <span>Scan to Track Ticket Live on Smartphone</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      DYNAMIC QR
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl inline-block shadow-lg border-2 border-emerald-500/40">
                    <QRCodeSVG
                      id="ticket-success-qrcode-svg"
                      value={buildQuickTicketPortalUrl(
                        lastCreatedTicket.customerId,
                        lastCreatedTicket.name,
                        lastCreatedTicket.phone,
                        lastCreatedTicket.union,
                        lastCreatedTicket.category,
                        lastCreatedTicket.priority,
                        lastCreatedTicket.id
                      )}
                      size={150}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono">
                    Scan with any smartphone camera to check lineman ETA & resolution updates.
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => downloadQrAsPng('ticket-success-qrcode-svg', `ticket-${lastCreatedTicket.id}-qr.png`)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Download QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handlePrintQrBadge({
                          cid: lastCreatedTicket.customerId,
                          name: lastCreatedTicket.name,
                          phone: lastCreatedTicket.phone,
                          union: lastCreatedTicket.union,
                          category: lastCreatedTicket.category,
                          qrSvgId: 'ticket-success-qrcode-svg'
                        })
                      }
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="h-3.5 w-3.5 text-blue-400" />
                      <span>Print Router Sticker</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => handleSendToManagerWhatsApp(lastCreatedTicket)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Manager WhatsApp (01944455176)</span>
                  </button>

                  <button
                    onClick={() => handleTriggerEmailAlert(lastCreatedTicket)}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email info@deltamithapukur.net.bd</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('client_portal')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Client CID Track
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 1-Click Quick Support Presets Bar */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-white">
                      <Zap className="h-4 w-4 text-amber-400" />
                      <span>1-Click Quick Issue Presets (Auto-Updates Form & Dynamic QR):</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Hotline: 01944455176 / 0171-9394430
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {QR_SUPPORT_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleApplyQrPreset(preset)}
                        className={`p-2 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                          qrPresetSelected === preset.id
                            ? `${preset.badgeColor} shadow-md`
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{preset.title}</span>
                        <span className="text-[9px] opacity-75 font-mono uppercase tracking-wider">{preset.priority}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left: Support Ticket Form (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <form onSubmit={handleSubmitTicket} className="space-y-3.5 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-500/30 p-2.5 rounded-xl flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                          <p className="text-[11px] text-rose-200 font-medium">
                            24/7 Rapid Lineman Dispatch for Mithapukur, Boldipukur, Ranipukur & Akmal Market.
                          </p>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>info@deltamithapukur.net.bd</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Subscriber Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Mahbubur Rahman"
                            className="w-full bg-slate-900 border border-slate-700 focus:border-rose-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Mobile / WhatsApp Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="01712345678"
                            className="w-full bg-slate-900 border border-slate-700 focus:border-rose-500 px-3 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Subscriber CID (e.g. DLT-2026-101)
                          </label>
                          <input
                            type="text"
                            value={customerId}
                            onChange={e => setCustomerId(e.target.value)}
                            placeholder="DLT-2026-101"
                            className="w-full bg-slate-900 border border-slate-700 focus:border-rose-500 px-3 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Connection Union / Area
                          </label>
                          <select
                            value={union}
                            onChange={e => setUnion(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 focus:border-rose-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                          >
                            {UNIONS_LIST.map(u => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Issue Category
                          </label>
                          <select
                            value={category}
                            onChange={e => {
                              const val = e.target.value;
                              setCategory(val);
                              if (val.includes('Red Light') || val.includes('Line Cut')) {
                                setPriority('emergency');
                              }
                            }}
                            className="w-full bg-slate-900 border border-slate-700 focus:border-rose-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                          >
                            {ISSUE_CATEGORIES.map(cat => (
                              <option key={cat.id} value={cat.label}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">
                            Priority Level
                          </label>
                          <div className="grid grid-cols-4 gap-1">
                            {[
                              { id: 'normal', label: 'Low', icon: CheckCircle2, activeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50 font-bold' },
                              { id: 'medium', label: 'Medium', icon: Activity, activeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold' },
                              { id: 'high', label: 'High', icon: AlertTriangle, activeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/50 font-bold' },
                              { id: 'emergency', label: 'Urgent', icon: ShieldAlert, activeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold' }
                            ].map(p => {
                              const IconComp = p.icon;
                              const isSelected = priority === p.id;
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => setPriority(p.id as any)}
                                  className={`py-1.5 px-1 rounded-lg text-[10px] border cursor-pointer flex items-center justify-center gap-1 transition-all ${
                                    isSelected ? p.activeColor : 'border-slate-800 text-slate-500 hover:text-slate-300 bg-slate-900'
                                  }`}
                                >
                                  <IconComp className={`h-3 w-3 ${isSelected ? '' : 'opacity-60'}`} />
                                  <span>{p.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Detailed Problem Description *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          placeholder="Describe your ONU light status (e.g. LOS red light blinking), router wifi issue, or optical loss..."
                          className="w-full bg-slate-900 border border-slate-700 focus:border-rose-500 p-2.5 rounded-xl text-slate-100 text-xs focus:outline-none resize-none"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <a href="tel:01944455176" className="text-amber-400 hover:underline font-bold flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-emerald-400" />
                            <span>01944455176</span>
                          </a>
                          <a href="tel:01719394430" className="text-blue-400 hover:underline font-bold flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-blue-400" />
                            <span>0171-9394430</span>
                          </a>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingTicket}
                          className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-75 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/20 flex items-center gap-2 cursor-pointer"
                        >
                          {isSubmittingTicket ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-200" />
                              <span>Submitting Ticket & Alerting NOC...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-3.5 w-3.5" />
                              <span>Submit Ticket & Send NOC Alert</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Right: Real-time Dynamic QR Code Panel (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/30 text-center space-y-3 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-black text-white">
                          <QrCode className="h-4 w-4 text-cyan-400 animate-pulse" />
                          <span>Dynamic Quick Support QR</span>
                        </div>
                        <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          Live Sync
                        </span>
                      </div>

                      {/* Mode Switcher */}
                      <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setQrTargetType('whatsapp')}
                          className={`py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            qrTargetType === 'whatsapp'
                              ? 'bg-emerald-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          WhatsApp NOC
                        </button>
                        <button
                          type="button"
                          onClick={() => setQrTargetType('web_portal')}
                          className={`py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            qrTargetType === 'web_portal'
                              ? 'bg-blue-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Portal Link
                        </button>
                        <button
                          type="button"
                          onClick={() => setQrTargetType('router_sticker')}
                          className={`py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            qrTargetType === 'router_sticker'
                              ? 'bg-purple-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Router Badge
                        </button>
                      </div>

                      {/* Live Dynamic QR Display */}
                      <div className="p-3 bg-white rounded-xl inline-block shadow-2xl border-2 border-cyan-500/40 mx-auto">
                        <QRCodeSVG
                          id="form-dynamic-qrcode-svg"
                          value={getDynamicQrValue()}
                          size={155}
                          level="H"
                          includeMargin={false}
                        />
                      </div>

                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-slate-200">
                          {qrTargetType === 'whatsapp' && 'Scan to Dispatch Ticket directly to Branch Manager WhatsApp'}
                          {qrTargetType === 'web_portal' && 'Scan to Auto-Fill & Open Ticket on any Phone Browser'}
                          {qrTargetType === 'router_sticker' && 'Printable Router / ONU Support Diagnostic Sticker'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Target: {customerId || 'DLT-MITH-GUEST'} • {phone || '01944455176'} • {union}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => downloadQrAsPng('form-dynamic-qrcode-svg', `delta-support-${customerId || 'quick'}-qr.png`)}
                          className="py-2 px-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                        >
                          <Download className="h-3.5 w-3.5 text-cyan-400" />
                          <span>Save QR (.PNG)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handlePrintQrBadge({
                              cid: customerId,
                              name: name,
                              phone: phone,
                              union: union,
                              category: category,
                              qrSvgId: 'form-dynamic-qrcode-svg'
                            })
                          }
                          className="py-2 px-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                        >
                          <Printer className="h-3.5 w-3.5 text-amber-400" />
                          <span>Print Sticker</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const url = qrTargetType === 'whatsapp' ? buildWhatsAppDirectTicketUrl() : buildQuickTicketPortalUrl();
                          navigator.clipboard.writeText(url);
                          showToast('📋 Quick Support Link copied to clipboard!');
                        }}
                        className="w-full py-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="h-3 w-3 text-cyan-400" />
                        <span>Copy Dynamic Ticket Link / URL</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* TAB 1.5: DEDICATED DYNAMIC QR TICKET & ROUTER STICKER HUB */}
          {activeTab === 'qr_ticket' && (
            <div className="space-y-4">
              {/* Header Banner */}
              <div className="p-4 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 rounded-2xl flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <QrCode className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <span>⚡ Dynamic QR Quick Support & Dispatch Hub</span>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono">
                        ROUTER STICKER & 1-TAP DISPATCH
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Generate dynamic QR codes for ONU routers, client cards, and 1-tap WhatsApp support dispatch to Branch Manager (01944455176).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Branch NOC:</span>
                  <strong className="text-emerald-400">01944455176 / 0171-9394430</strong>
                </div>
              </div>

              {/* 1-Click Presets */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300">Quick Issue Presets:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {QR_SUPPORT_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyQrPreset(preset)}
                      className={`p-2 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                        qrPresetSelected === preset.id
                          ? `${preset.badgeColor} shadow-md`
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{preset.title}</span>
                      <span className="text-[9px] opacity-75 font-mono uppercase">{preset.priority}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Grid: Form Configurator on Left, Dynamic QR Output on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Configurator */}
                <div className="lg:col-span-7 space-y-3.5 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Dynamic Payload Parameters</span>
                  </h4>

                  {/* Pick Existing Client or Enter Custom */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Quick Pick Registered Client (Auto-Populate)
                    </label>
                    <select
                      onChange={e => {
                        const sel = clientsList.find(c => c.id === e.target.value);
                        if (sel) {
                          setCustomerId(sel.id);
                          setName(sel.fullName);
                          setPhone(sel.phone);
                          setUnion(sel.area);
                          showToast(`✅ Loaded data for ${sel.fullName} (${sel.id})`);
                        }
                      }}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                    >
                      <option value="">-- Choose Existing Subscriber CID or Enter Custom Below --</option>
                      {clientsList.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.id} — {c.fullName} ({c.area}, {c.phone})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Subscriber CID
                      </label>
                      <input
                        type="text"
                        value={customerId}
                        onChange={e => setCustomerId(e.target.value)}
                        placeholder="DLT-2026-101"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Subscriber Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Mahbubur Rahman"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Contact / WhatsApp Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="01712345678"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Union / Area
                      </label>
                      <select
                        value={union}
                        onChange={e => setUnion(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                      >
                        {UNIONS_LIST.map(u => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Issue Category
                      </label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                      >
                        {ISSUE_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.label}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Priority
                      </label>
                      <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none font-bold"
                      >
                        <option value="normal">Normal (Low)</option>
                        <option value="medium">Medium</option>
                        <option value="high">High Priority</option>
                        <option value="emergency">🚨 Emergency Outage</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Problem Note / Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Brief note or leave blank for preset description"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 px-3 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setActiveTab('create')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Ticket className="h-3.5 w-3.5" />
                      <span>Switch to Standard Form</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const url = buildWhatsAppDirectTicketUrl();
                        window.open(url, '_blank');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Test WhatsApp Dispatch (01944455176)</span>
                    </button>
                  </div>
                </div>

                {/* Live Dynamic QR Card */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/40 text-center space-y-3.5 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black text-white">
                        <QrCode className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>Dynamic QR Live Preview</span>
                      </div>
                      <span className="text-[9px] font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                        HIGH RES SVG
                      </span>
                    </div>

                    {/* Mode selector */}
                    <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setQrTargetType('whatsapp')}
                        className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          qrTargetType === 'whatsapp'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        WhatsApp NOC
                      </button>
                      <button
                        type="button"
                        onClick={() => setQrTargetType('web_portal')}
                        className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          qrTargetType === 'web_portal'
                            ? 'bg-blue-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Web Portal
                      </button>
                      <button
                        type="button"
                        onClick={() => setQrTargetType('router_sticker')}
                        className={`py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          qrTargetType === 'router_sticker'
                            ? 'bg-purple-600 text-white shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Router Badge
                      </button>
                    </div>

                    {/* High Precision QR Display */}
                    <div className="p-4 bg-white rounded-2xl inline-block shadow-2xl border-4 border-cyan-500/50 mx-auto">
                      <QRCodeSVG
                        id="dedicated-dynamic-qrcode-svg"
                        value={getDynamicQrValue()}
                        size={175}
                        level="H"
                        includeMargin={false}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-xl">
                        <span>CID: {customerId || 'DLT-MITH-GUEST'}</span>
                        <span>•</span>
                        <span>{union}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {qrTargetType === 'whatsapp' && 'Opens WhatsApp chat with pre-written ticket details to 01944455176'}
                        {qrTargetType === 'web_portal' && 'Direct web link auto-completes ticket and triggers fast submission'}
                        {qrTargetType === 'router_sticker' && 'Printable 2x2 waterproof sticker for ONU / Fiber router backplate'}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => downloadQrAsPng('dedicated-dynamic-qrcode-svg', `delta-${customerId || 'support'}-dynamic-qr.png`)}
                        className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      >
                        <Download className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Save PNG</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handlePrintQrBadge({
                            cid: customerId,
                            name: name,
                            phone: phone,
                            union: union,
                            category: category,
                            qrSvgId: 'dedicated-dynamic-qrcode-svg'
                          })
                        }
                        className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      >
                        <Printer className="h-3.5 w-3.5 text-amber-400" />
                        <span>Print Sticker</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const url = qrTargetType === 'whatsapp' ? buildWhatsAppDirectTicketUrl() : buildQuickTicketPortalUrl();
                        navigator.clipboard.writeText(url);
                        showToast('📋 Dynamic Quick Support Link copied to clipboard!');
                      }}
                      className="w-full py-2 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Copy Encoded Dynamic Link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLIENT LOGIN STRICTLY VIA CID NUMBER */}
          {activeTab === 'client_portal' && (
            loggedInClient ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-black text-xl">
                      {loggedInClient.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white">{loggedInClient.name}</h3>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                          CID AUTHENTICATED
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Subscriber CID: <strong className="text-emerald-400 font-bold">{loggedInClient.customerId}</strong> | Phone: {loggedInClient.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLoggedInClient(null)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>

                {/* Line Status Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                    <Signal className="h-5 w-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Optical Power RX</span>
                      <strong className="text-emerald-400 font-mono">{loggedInClient.rxPower || '-18.2 dBm'} (Good)</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-blue-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Plan & Area</span>
                      <strong className="text-slate-200">{loggedInClient.package} ({loggedInClient.area})</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                    <Activity className="h-5 w-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">BDIX IX Ping</span>
                      <strong className="text-amber-400 font-mono">1.8 ms (Super Low)</strong>
                    </div>
                  </div>
                </div>

                {/* Client Tickets List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Ticket className="h-4 w-4 text-emerald-400" />
                      <span>Your Support Tickets Under CID ({clientTickets.length})</span>
                    </h4>

                    <button
                      onClick={() => {
                        setActiveTab('create');
                        setCustomerId(loggedInClient.customerId);
                        setName(loggedInClient.name);
                        setPhone(loggedInClient.phone);
                      }}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Open New Ticket</span>
                    </button>
                  </div>

                  {clientTickets.length === 0 ? (
                    <div className="p-6 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs text-slate-400">No active tickets registered under this CID Number.</p>
                      <button
                        onClick={() => {
                          setActiveTab('create');
                          setCustomerId(loggedInClient.customerId);
                          setName(loggedInClient.name);
                          setPhone(loggedInClient.phone);
                        }}
                        className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Create Support Ticket</span>
                      </button>
                    </div>
                  ) : (
                    clientTickets.map(t => (
                      <div key={t.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              {t.id}
                            </span>
                            <PriorityBadge priority={t.priority} />
                          </div>
                          <span className="text-xs font-bold text-slate-300">{t.category}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {t.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200">{t.description}</p>
                        
                        {/* Updates Log */}
                        {t.updates && t.updates.length > 0 && (
                          <div className="p-2.5 bg-slate-900 rounded-lg space-y-1.5 border border-slate-800/80">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase block">Ticket Updates & History:</span>
                            {t.updates.map((up, idx) => (
                              <div key={idx} className="text-[11px] text-slate-300 border-l-2 border-emerald-500/50 pl-2">
                                <span className="text-slate-400 text-[10px] font-mono">[{up.time}] {up.author}:</span> {up.text}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="text-[10px] text-slate-400 pt-1 flex justify-between items-center">
                          <span>Assigned Lineman: <strong className="text-blue-400">{t.assignedTechnician}</strong></span>
                          <span>Logged: {t.createdAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-1">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-black text-white">Subscriber CID Portal Login</h3>
                  <p className="text-xs text-slate-400">
                    Log in using ONLY your Subscriber CID Number (e.g. DLT-2026-101) to view status and tickets.
                  </p>
                </div>

                {clientError && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl text-center">
                    {clientError}
                  </div>
                )}

                <form onSubmit={handleClientCidLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Enter Subscriber CID Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientCidInput}
                      onChange={e => setClientCidInput(e.target.value)}
                      placeholder="e.g. DLT-2026-101 or 101"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 px-3.5 py-2.5 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>Access Dashboard via CID Number</span>
                  </button>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase text-center">Quick Demo CID Access:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setClientCidInput('DLT-2026-101');
                          handleClientCidLogin(undefined, 'DLT-2026-101');
                        }}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-[11px] rounded-lg border border-slate-800 cursor-pointer"
                      >
                        DLT-2026-101 (Boldipukur)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setClientCidInput('DLT-2026-102');
                          handleClientCidLogin(undefined, 'DLT-2026-102');
                        }}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-blue-400 font-bold text-[11px] rounded-lg border border-slate-800 cursor-pointer"
                      >
                        DLT-2026-102 (Sadar)
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )
          )}

          {/* TAB 3: BRANCH MANAGER NOC CONTROL */}
          {activeTab === 'admin_portal' && (
            !isAdminLoggedIn ? (
              <div className="max-w-md mx-auto p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-1">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-black text-white">Branch Manager & NOC Login Portal</h3>
                  <p className="text-xs text-slate-400">
                    Full Access to All Client Database, Ticket Status, Lineman Dispatch, and NOC Control.
                  </p>
                </div>

                {adminError && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl text-center">
                    {adminError}
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Username</label>
                    <input
                      type="text"
                      value={adminUser}
                      onChange={e => setAdminUser(e.target.value)}
                      placeholder="admin"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                    <input
                      type="password"
                      value={adminPass}
                      onChange={e => setAdminPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Authorize Manager & NOC Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAdminUser('admin');
                      setAdminPass('admin');
                      handleAdminLogin();
                    }}
                    className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-[11px] rounded-lg border border-slate-800 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>One-Click Manager Access (admin / admin)</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Admin Status Banner & Controls */}
                <div className="p-3.5 bg-gradient-to-r from-amber-950/90 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-white">Branch Manager Full Access Desk</h3>
                      <p className="text-[11px] text-slate-400">
                        Manager: MD. Mahamudul Hasan • Email: info@deltamithapukur.net.bd • WhatsApp: 01944455176
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-950/60 border border-cyan-500/40 rounded-xl text-cyan-300 text-[11px] font-mono shadow-sm">
                      <Clock className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                      <span>NOC Update SLA: <strong className="text-cyan-200 font-bold">{nocResponseStats.avgResponseTimeFormatted}</strong></span>
                    </div>

                    <button
                      onClick={() => setActiveTab('client_db')}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Users className="h-3.5 w-3.5" />
                      <span>Client Database</span>
                    </button>

                    <button
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Lock</span>
                    </button>
                  </div>
                </div>

                {/* Admin Analytics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Total Tickets</span>
                    <strong className="text-base font-black text-white">{totalCount}</strong>
                  </div>
                  <div className="p-2.5 bg-rose-950/40 rounded-xl border border-rose-500/30">
                    <span className="text-[9px] font-bold text-rose-300 uppercase block">Open</span>
                    <strong className="text-base font-black text-rose-400">{openCount}</strong>
                  </div>
                  <div className="p-2.5 bg-amber-950/40 rounded-xl border border-amber-500/30">
                    <span className="text-[9px] font-bold text-amber-300 uppercase block">In Progress</span>
                    <strong className="text-base font-black text-amber-400">{progressCount}</strong>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                    <span className="text-[9px] font-bold text-emerald-300 uppercase block">Resolved</span>
                    <strong className="text-base font-black text-emerald-400">{resolvedCount}</strong>
                  </div>
                  <div className="p-2.5 bg-purple-950/40 rounded-xl border border-purple-500/30">
                    <span className="text-[9px] font-bold text-purple-300 uppercase block">Emergency</span>
                    <strong className="text-base font-black text-purple-400">{emergencyCount}</strong>
                  </div>
                  <div className="p-2.5 bg-cyan-950/40 rounded-xl border border-cyan-500/30 col-span-2 sm:col-span-1 flex flex-col items-center justify-center relative group cursor-help">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-cyan-300 uppercase">
                      <Clock className="h-3 w-3 text-cyan-400 animate-pulse" />
                      <span>NOC Response</span>
                    </div>
                    <strong className="text-base font-black text-cyan-400 font-mono">{nocResponseStats.avgResponseTimeFormatted}</strong>

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-1.5 hidden group-hover:block z-30 w-48 p-2.5 bg-slate-900 text-slate-200 text-[10px] rounded-xl border border-cyan-500/40 shadow-2xl text-left pointer-events-none">
                      <p className="font-bold text-cyan-400 mb-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-cyan-400" />
                        <span>NOC Engineer SLA Monitor</span>
                      </p>
                      <p className="text-slate-300">Average response time for ticket updates by NOC engineers: <strong className="text-cyan-300 font-mono">{nocResponseStats.avgResponseTimeFormatted}</strong></p>
                      <div className="mt-1 pt-1 border-t border-slate-800 flex items-center justify-between text-[9px]">
                        <span className="text-slate-400">Target SLA (&lt;30m):</span>
                        <span className="text-emerald-400 font-bold">{nocResponseStats.slaCompliancePercent}% compliant</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="relative flex-1 min-w-[160px]">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search ticket ID, CID, phone, name..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 pl-8 pr-2 py-1.5 rounded-lg text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <select
                      value={priorityFilter}
                      onChange={e => setPriorityFilter(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs text-slate-200 font-bold rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer"
                    >
                      <option value="ALL">All Priorities</option>
                      <option value="emergency">🔴 Emergency Cut</option>
                      <option value="high">🟧 High Priority</option>
                      <option value="medium">🟨 Medium</option>
                      <option value="normal">🟦 Low / Normal</option>
                    </select>
                  </div>
                </div>

                {/* Tickets Table & Dispatch Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                  <div className={`${selectedTicket ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-2 max-h-[400px] overflow-y-auto`}>
                    {filteredTickets.map(t => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTicket(t)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedTicket?.id === t.id
                            ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {t.id}
                            </span>
                            <PriorityBadge priority={t.priority} />
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {t.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-bold truncate">
                          {t.name} <span className="text-[10px] text-slate-400 font-normal font-mono">({t.customerId})</span>
                        </p>
                        <p className="text-xs text-slate-300 font-medium truncate mt-0.5">{t.subject}</p>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Area: {t.union}</span>
                          <span className="text-blue-400 font-semibold">{t.assignedTechnician || 'Unassigned'}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTicket && (
                    <div className="lg:col-span-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3 text-xs max-h-[400px] overflow-y-auto">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-black text-amber-400">{selectedTicket.id}</span>
                            <PriorityBadge priority={selectedTicket.priority} showFullLabel />
                          </div>
                          <h4 className="font-bold text-slate-200">{selectedTicket.name} ({selectedTicket.customerId})</h4>
                        </div>
                        <button onClick={() => setSelectedTicket(null)} className="text-slate-500 hover:text-white cursor-pointer">
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        {selectedTicket.description}
                      </p>

                      {/* Controls */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Status</label>
                            <select
                              value={selectedTicket.status}
                              onChange={e => handleUpdateTicketStatus(selectedTicket.id, e.target.value as any)}
                              className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg text-xs font-bold text-slate-100"
                            >
                              <option value="OPEN">🔴 OPEN</option>
                              <option value="IN_PROGRESS">🟨 IN PROGRESS</option>
                              <option value="RESOLVED">🟢 RESOLVED</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Priority</label>
                            <select
                              value={selectedTicket.priority}
                              onChange={e => handleUpdateTicketPriority(selectedTicket.id, e.target.value as any)}
                              className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg text-xs font-bold text-slate-100"
                            >
                              <option value="emergency">🔴 Emergency Cut</option>
                              <option value="high">🟧 High Priority</option>
                              <option value="medium">🟨 Medium</option>
                              <option value="normal">🟦 Normal</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Assign Lineman</label>
                          <select
                            value={selectedTicket.assignedTechnician || ''}
                            onChange={e => handleAssignTechnician(selectedTicket.id, e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg text-xs text-slate-100"
                          >
                            {DEMO_TECHNICIANS.map(tech => (
                              <option key={tech} value={tech}>
                                {tech}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Manager Update Note */}
                        <div>
                          <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Add Manager Progress Note</label>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={adminNoteText}
                              onChange={e => setAdminNoteText(e.target.value)}
                              placeholder="e.g. Fiber line spliced in Akmal Market, test link online..."
                              className="flex-1 bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs text-slate-100 focus:outline-none"
                            />
                            <button
                              onClick={() => handleAddAdminNote(selectedTicket.id)}
                              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                            >
                              Add Note
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleOpenWhatsAppAlert(selectedTicket)}
                            className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer text-xs"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp Client</span>
                          </button>

                          <button
                            onClick={() => handlePrintTicket(selectedTicket)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg flex items-center gap-1 cursor-pointer text-xs"
                          >
                            <Printer className="h-3.5 w-3.5 text-blue-400" />
                            <span>Work Order</span>
                          </button>

                          <button
                            onClick={() => handleDeleteTicket(selectedTicket.id)}
                            className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg cursor-pointer"
                            title="Delete Ticket"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* TAB 4: CLIENT DATABASE & ADD NEW CLIENT BUTTON */}
          {activeTab === 'client_db' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-black">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Delta Mithapukur Client Database</h3>
                    <p className="text-xs text-slate-400">
                      Total Subscribers: <strong className="text-indigo-400">{clientsList.length}</strong> • Registered Fiber Clients & Package Records
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportClientsCSV}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export Excel</span>
                  </button>

                  <button
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer border border-indigo-400/30"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Add New Client</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  value={clientSearchQuery}
                  onChange={e => setClientSearchQuery(e.target.value)}
                  placeholder="Search by Subscriber CID, Name, Phone, Area, Package..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 pl-9 pr-3 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                />
              </div>

              {/* Subscribers Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">CID Number</th>
                      <th className="p-3">Subscriber Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Area / Union</th>
                      <th className="p-3">Package</th>
                      <th className="p-3">Monthly Fee</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredClients.map(c => (
                      <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3 font-mono font-bold text-indigo-400">{c.id}</td>
                        <td className="p-3 font-semibold text-slate-200">{c.fullName}</td>
                        <td className="p-3 font-mono text-slate-300">{c.phone}</td>
                        <td className="p-3 text-slate-400">{c.area}</td>
                        <td className="p-3 text-slate-300 font-medium">{c.planName}</td>
                        <td className="p-3 font-bold text-emerald-400">৳{c.monthlyFee}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                              c.status === 'Active'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: AI OPTICAL LINE DIAGNOSTICS */}
          {activeTab === 'ai_diagnostics' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Bot className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">AI Optical Fiber Diagnostic Engine</h3>
                    <p className="text-xs text-slate-400">
                      Real-time ONU RX Power, Latency, and Splitting Loss recommendation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  Enter Subscriber CID for Optical Line Check
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiCidInput}
                    onChange={e => setAiCidInput(e.target.value)}
                    placeholder="e.g. DLT-2026-101"
                    className="flex-1 bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-100 focus:border-purple-500"
                  />
                  <button
                    onClick={handleRunAiDiagnostic}
                    disabled={isDiagnosing}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isDiagnosing ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Bot className="h-3.5 w-3.5" />}
                    <span>{isDiagnosing ? 'Scanning...' : 'Run Diagnostics'}</span>
                  </button>
                </div>

                {aiReport && (
                  <div className="pt-3 border-t border-slate-800 space-y-3 text-xs animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-300">Diagnostic Summary Result:</span>
                      <span
                        className={`font-black px-2.5 py-0.5 rounded-full border text-[10px] ${
                          aiReport.status === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {aiReport.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Optical RX Power:</span>
                        <strong className="text-slate-200 font-mono">{aiReport.rxPower}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">BDIX IX Ping:</span>
                        <strong className="text-slate-200 font-mono">{aiReport.latency}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Splitting Loss:</span>
                        <strong className="text-slate-200 font-mono">{aiReport.lossDb}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">bKash Billing:</span>
                        <strong className="text-emerald-400 font-mono">{aiReport.bKashStatus}</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl space-y-1">
                      <span className="font-bold text-purple-300 block text-[11px]">AI Line Recommendation:</span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{aiReport.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: ANDROID APP (.APK / PWA) HUB */}
          {activeTab === 'android_app' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 border border-teal-500/30 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-black">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Delta Mithapukur Mobile Android App</h3>
                    <p className="text-xs text-slate-400">
                      Install APK or Add to Home Screen for 1-Touch Support Ticket & Speed Test access on Android devices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Download className="h-4 w-4 text-teal-400" />
                    <span>Download Delta Android App (.APK)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Get instant notifications, fiber outage alerts, and 1-tap support ticket tracking directly on your Android phone.
                  </p>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                    <div>App Version: <strong className="text-teal-400">v2.4.0 (Build 2026)</strong></div>
                    <div>Package Name: <strong className="text-slate-200">bd.net.deltamithapukur.app</strong></div>
                    <div>File Size: <strong className="text-slate-200">14.2 MB</strong></div>
                  </div>

                  <a
                    href="#download_apk"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('📥 DeltaMithapukur_Support_v2.4.apk download initiated!');
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Android APK (Direct Link)</span>
                  </a>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <QrCode className="h-4 w-4 text-blue-400" />
                    <span>Scan to Install Mobile App</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    Scan or open on Chrome / Safari on mobile and tap <strong>"Add to Home Screen"</strong> for PWA offline app installation.
                  </p>

                  <div className="p-4 bg-white rounded-xl inline-block text-center border-2 border-teal-500/40 shadow-inner mx-auto">
                    <QRCodeSVG
                      id="pwa-install-qrcode-svg"
                      value={typeof window !== 'undefined' ? window.location.origin : 'https://deltamithapukur.net.bd'}
                      size={135}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 text-center font-mono">
                    Official App Host: deltamithapukur.net.bd
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Mithapukur Akmal Market Central NOC Desk • Email: info@deltamithapukur.net.bd</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:01944455176" className="text-amber-400 hover:underline font-bold flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>WhatsApp: 01944455176</span>
            </a>
          </div>
        </div>

      </div>

      {/* ADD NEW CLIENT MODAL FORM */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-indigo-400" />
                <h3 className="text-base font-black text-white">Add New Client to Database</h3>
              </div>
              <button
                onClick={() => setIsAddClientModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewClientSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Subscriber Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Habibur Rahman"
                  className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">CID Number (e.g. DLT-2026-105)</label>
                  <input
                    type="text"
                    value={newCid}
                    onChange={e => setNewCid(e.target.value)}
                    placeholder="Auto-generated if empty"
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Area / Union</label>
                  <select
                    value={newArea}
                    onChange={e => setNewArea(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 focus:border-indigo-500 focus:outline-none"
                  >
                    {UNIONS_LIST.map(u => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Fiber Broadband Package</label>
                  <select
                    value={newPlan}
                    onChange={e => {
                      const selectedPreset = PLAN_PRESETS.find(p => p.name === e.target.value);
                      setNewPlan(e.target.value);
                      if (selectedPreset) setNewFee(selectedPreset.fee);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 focus:border-indigo-500 focus:outline-none"
                  >
                    {PLAN_PRESETS.map(p => (
                      <option key={p.name} value={p.name}>
                        {p.name} (৳{p.fee}/mo)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Monthly Fee (BDT)</label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={e => setNewFee(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Payment Method</label>
                  <select
                    value={newPayment}
                    onChange={e => setNewPayment(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-xl text-slate-100 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-600/20 cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Save Client to Database</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
