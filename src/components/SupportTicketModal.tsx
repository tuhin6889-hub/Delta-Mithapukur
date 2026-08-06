import React, { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';
import { useLanguage } from '../context/LanguageContext';

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
}

const UNIONS_LIST = [
  'Mithapukur Sadar',
  'Boldipukur Market',
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

const DEMO_TECHNICIANS = [
  'Mithapukur Emergency Line Squad (Akmal Market Hub)',
  'Boldipukur Field Tech Team B',
  'Ranipukur Fiber Splicing Specialist',
  'Sadar Central NOC Engineer (Sharif)',
  'Payraband Local Support Lineman'
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

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose,
  initialCategory = ''
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'create' | 'track' | 'client_portal' | 'admin_portal' | 'ai_diagnostics'>('create');
  const [isMobileAppMode, setIsMobileAppMode] = useState<boolean>(false);

  // Form State
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [union, setUnion] = useState(UNIONS_LIST[0]);
  const [category, setCategory] = useState(initialCategory || ISSUE_CATEGORIES[0].label);
  const [priority, setPriority] = useState<'normal' | 'medium' | 'high' | 'emergency'>('high');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  // Submitted ticket state
  const [lastCreatedTicket, setLastCreatedTicket] = useState<SupportTicket | null>(null);
  const [copiedTicketId, setCopiedTicketId] = useState(false);

  // Tickets storage
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  // Client Login State
  const [clientPhoneInput, setClientPhoneInput] = useState('');
  const [loggedInClient, setLoggedInClient] = useState<{ phone: string; name: string; customerId: string; rxPower?: string; package?: string } | null>(null);
  const [clientError, setClientError] = useState('');

  // Admin Edit Ticket Modal / Form State
  const [adminNoteText, setAdminNoteText] = useState('');
  const [assignedTechInput, setAssignedTechInput] = useState('');

  // Client Note Input
  const [clientNoteText, setClientNoteText] = useState('');

  // AI Diagnostic State
  const [aiCidInput, setAiCidInput] = useState('DF-MITH-1024');
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

  // Email Alert State
  const [emailAlertStatus, setEmailAlertStatus] = useState<string | null>(null);

  // Load tickets on mount / open
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('delta_support_tickets');
        if (saved) {
          setTickets(JSON.parse(saved));
        } else {
          const sampleTickets: SupportTicket[] = [
            {
              id: 'TK-DELTA-98421',
              customerId: 'DF-MITH-1024',
              name: 'Md. Abdul Karim',
              phone: '01712001122',
              union: 'Mithapukur Sadar',
              category: '🔴 Red Light (LOS) / Fiber Line Cut',
              priority: 'emergency',
              subject: 'Optical fiber cable damaged by tree trimming in Akmal Market',
              description: 'ONU LOS red light blinking since 2:30 PM today.',
              status: 'IN_PROGRESS',
              createdAt: new Date(Date.now() - 3600000 * 2).toLocaleString(),
              updatedAt: new Date(Date.now() - 1800000).toLocaleString(),
              assignedTechnician: 'Mithapukur Emergency Line Squad (Akmal Market Hub)',
              updates: [
                {
                  text: 'Lineman dispatched to Akmal Market optical splitter hub.',
                  time: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  author: 'Branch Manager (Mahamudul Hasan)'
                },
                {
                  text: 'Ticket created and registered in local fiber log.',
                  time: new Date(Date.now() - 3600000 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  author: 'Customer System'
                }
              ]
            },
            {
              id: 'TK-DELTA-74129',
              customerId: 'DF-MITH-2055',
              name: 'Dr. Shahinur Rahman',
              phone: '01819887766',
              union: 'Boldipukur Market',
              category: '🐌 Slow Speed / High Ping & Latency',
              priority: 'medium',
              subject: 'Latency high during evening peak hours in pharmacy wifi',
              description: 'Speed drops from 40Mbps to 10Mbps around 8:00 PM.',
              status: 'OPEN',
              createdAt: new Date(Date.now() - 3600000 * 5).toLocaleString(),
              updatedAt: new Date(Date.now() - 3600000 * 5).toLocaleString(),
              assignedTechnician: 'Boldipukur Field Tech Team B',
              updates: [
                {
                  text: 'Ticket created by customer via online portal.',
                  time: new Date(Date.now() - 3600000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  author: 'Customer System'
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

      let techAssigned = 'Mithapukur Rapid Field Response Team';
      if (priority === 'emergency') {
        techAssigned = 'Mithapukur Emergency Line Squad (Akmal Market Hub)';
      }

      const newTicket: SupportTicket = {
        id: newTicketId,
        customerId: customerId.trim() || `DF-MITH-${Math.floor(1000 + Math.random() * 9000)}`,
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
            text: 'Ticket registered successfully. Assigned to ' + techAssigned,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            author: 'System Auto-Dispatcher'
          }
        ]
      };

      const updatedList = [newTicket, ...tickets];
      saveTicketsToStorage(updatedList);

      setLastCreatedTicket(newTicket);
      setSelectedTicket(newTicket);

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

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((adminUser === 'admin' || adminUser === '') && (adminPass === 'admin' || adminPass === 'delta2026' || adminPass === '')) {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Invalid Admin credentials. Use admin / admin for demo access.');
    }
  };

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
              text: `Status updated to ${newStatus} by Branch Manager.`,
              time: timeStr,
              author: 'Branch Manager (Mahamudul Hasan)'
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
              text: `Priority changed to ${newPriority.toUpperCase()} by NOC Desk.`,
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
              author: 'Branch Manager'
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
  };

  const handleAddClientNote = (ticketId: string) => {
    if (!clientNoteText.trim()) return;
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatesList = t.updates || [];
        return {
          ...t,
          updatedAt: new Date().toLocaleString(),
          updates: [
            {
              text: clientNoteText.trim(),
              time: timeStr,
              author: `${t.name} (Client)`
            },
            ...updatesList
          ]
        };
      }
      return t;
    });
    saveTicketsToStorage(updated);
    setClientNoteText('');
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(updated.find(x => x.id === ticketId) || null);
    }
  };

  const handleDeleteTicket = (ticketId: string) => {
    if (confirm('Are you sure you want to delete this support ticket?')) {
      const updated = tickets.filter(t => t.id !== ticketId);
      saveTicketsToStorage(updated);
      setSelectedTicket(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Customer ID', 'Name', 'Phone', 'Union', 'Category', 'Priority', 'Status', 'Technician', 'Created At'];
    const rows = tickets.map(t => [
      t.id,
      t.customerId,
      `"${t.name}"`,
      t.phone,
      `"${t.union}"`,
      `"${t.category}"`,
      t.priority,
      t.status,
      `"${t.assignedTechnician || 'Unassigned'}"`,
      `"${t.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mithapukur_support_tickets_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <h2>Mithapukur Delta Broadband — Fiber Field Work Order</h2>
            <p>Akmal Market Branch | Hotline: ${BRANCH_INFO.phone}</p>
          </div>
          <div class="box">
            <span class="badge">Ticket ID: ${ticket.id}</span>
            <span class="badge" style="background:#fee2e2; color:#991b1b;">Priority: ${ticket.priority.toUpperCase()}</span>
            <table>
              <tr><td class="bold">Customer Name:</td><td>${ticket.name}</td></tr>
              <tr><td class="bold">Customer ID:</td><td>${ticket.customerId}</td></tr>
              <tr><td class="bold">Mobile Number:</td><td>${ticket.phone}</td></tr>
              <tr><td class="bold">Union / Area:</td><td>${ticket.union}</td></tr>
              <tr><td class="bold">Issue Category:</td><td>${ticket.category}</td></tr>
              <tr><td class="bold">Subject:</td><td>${ticket.subject}</td></tr>
              <tr><td class="bold">Description:</td><td>${ticket.description}</td></tr>
              <tr><td class="bold">Assigned Lineman/Tech:</td><td>${ticket.assignedTechnician || 'Mithapukur Field Unit'}</td></tr>
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

  // WhatsApp Alert Trigger
  const handleOpenWhatsAppAlert = (t: SupportTicket) => {
    const rawPhone = t.phone.replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('88') ? rawPhone : `88${rawPhone}`;
    const msg = `*DELTA MITHAPUKUR SUPPORT ALERT*\n\nTicket ID: ${t.id}\nCustomer: ${t.name} (${t.customerId})\nArea: ${t.union}\nStatus: ${t.status}\nAssigned: ${t.assignedTechnician || 'Dispatch Desk'}\nIssue: ${t.subject}\n\nFor assistance call: ${BRANCH_INFO.phone}`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Email Alert Trigger Simulator
  const handleTriggerEmailAlert = (t: SupportTicket) => {
    setEmailAlertStatus(`Email alert dispatched for Ticket ${t.id} to NOC Manager & ${t.name}!`);
    setTimeout(() => setEmailAlertStatus(null), 4000);
  };

  // AI Diagnostic Run
  const handleRunAiDiagnostic = () => {
    setIsDiagnosing(true);
    setAiReport(null);
    setTimeout(() => {
      setIsDiagnosing(false);
      if (aiCidInput.toLowerCase().includes('1024') || aiCidInput.toLowerCase().includes('cut')) {
        setAiReport({
          status: 'CRITICAL',
          rxPower: '-28.4 dBm (High Attenuation)',
          latency: 'Timeout / Packet Loss 84%',
          lossDb: '11.2 dB extra loss detected',
          bKashStatus: 'Active Paid (Expires in 22 days)',
          summary: 'Severe Optical Power Loss detected at 1310nm wavelength on fiber drop loop.',
          recommendation: 'Direct lineman to check local Akmal Market optical splitter box or splice broken fiber drop line near client residence.'
        });
      } else {
        setAiReport({
          status: 'OPTIMAL',
          rxPower: '-18.2 dBm (Excellent Optical Signal)',
          latency: '1.8 ms to BDIX IX Central Router',
          lossDb: '0.4 dB (Optimal)',
          bKashStatus: 'Active Paid (Expires in 18 days)',
          summary: 'ONU optical power, laser diode temperature, and BDIX peering link operating in prime parameters.',
          recommendation: 'Line signal is healthy. If experiencing wifi slowdown, restart the 5GHz router or verify connected mobile client band.'
        });
      }
    }, 1200);
  };

  // Client login handler
  const handleClientLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = clientPhoneInput.trim();
    if (!query) {
      setClientError('Please enter your mobile phone number or Customer ID.');
      return;
    }

    const matchedTicket = tickets.find(
      t => t.phone.includes(query) || t.customerId.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedTicket) {
      setLoggedInClient({
        phone: matchedTicket.phone,
        name: matchedTicket.name,
        customerId: matchedTicket.customerId,
        rxPower: '-18.5 dBm',
        package: 'Mithapukur 50 Mbps BDIX Ultimate'
      });
      setClientError('');
    } else {
      setLoggedInClient({
        phone: query.startsWith('01') ? query : '01712001122',
        name: 'Md. Abdul Karim',
        customerId: query.startsWith('DF') ? query : 'DF-MITH-1024',
        rxPower: '-18.2 dBm',
        package: 'Mithapukur 40 Mbps Express Fiber'
      });
      setClientError('');
    }
  };

  // Filtering tickets logic
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
    ? tickets.filter(t => t.phone === loggedInClient.phone || t.customerId === loggedInClient.customerId)
    : [];

  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status === 'OPEN').length;
  const progressCount = tickets.filter(t => t.status === 'IN_PROGRESS').length;
  const resolvedCount = tickets.filter(t => t.status === 'RESOLVED').length;
  const emergencyCount = tickets.filter(t => t.priority === 'emergency').length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-6 overflow-y-auto">
      <div className={`relative w-full ${isMobileAppMode ? 'max-w-md' : 'max-w-4xl'} rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh] transition-all duration-300`}>
        
        {/* Top App Mode & Modal Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 p-3 sm:px-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 via-orange-600 to-amber-500 text-white shadow-lg shadow-rose-500/20">
              <LifeBuoy className="h-5 w-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Delta Mithapukur Ticket Portal
                </h2>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  NOC 24/7
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Client CID Login, NOC Control, WhatsApp Alerts & AI Diagnostics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle Button (Desktop Dashboard vs Android App Mode) */}
            <button
              onClick={() => setIsMobileAppMode(!isMobileAppMode)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                isMobileAppMode
                  ? 'bg-emerald-600 text-white border-emerald-400/50 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Toggle Mobile App Mode vs Dashboard View"
            >
              {isMobileAppMode ? <Smartphone className="h-3.5 w-3.5 text-emerald-300" /> : <Laptop className="h-3.5 w-3.5 text-blue-400" />}
              <span className="hidden sm:inline">{isMobileAppMode ? 'Android App View' : 'App Mode'}</span>
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

        {/* Email Alert Banner Toast */}
        {emailAlertStatus && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{emailAlertStatus}</span>
            </div>
            <button onClick={() => setEmailAlertStatus(null)} className="text-white hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Mobile App Header Bar (Shown in Android Mobile App Mode) */}
        {isMobileAppMode && (
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">12:45 PM</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                5G ONLINE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Signal className="h-3.5 w-3.5 text-emerald-400" />
              <Wifi className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-slate-300">98%</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-800 px-3 sm:px-6 bg-slate-950/80 overflow-x-auto">
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
            onClick={() => setActiveTab('client_portal')}
            className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'client_portal'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Client CID</span>
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
            <span>Branch Manager</span>
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
            <span>AI Diagnostics</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`flex items-center gap-1.5 py-2.5 px-3 font-bold text-xs border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'track'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="h-3.5 w-3.5 text-blue-400" />
            <span>Track ({tickets.length})</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* TAB 1: CREATE SUPPORT TICKET */}
          {activeTab === 'create' && (
            lastCreatedTicket ? (
              <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 text-center space-y-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">
                    {language === 'bn' ? 'সাপোর্ট টিকিট সফলভাবে তৈরি হয়েছে!' : 'Support Ticket Successfully Generated!'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {language === 'bn'
                      ? 'আমাদের মিঠাপুকুর টেকনিক্যাল টিম আপনার টিকিটটি গ্রহণ করেছে।'
                      : 'Our local Mithapukur engineering desk has logged your issue.'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-xs">
                  <span className="text-slate-400">Ticket ID:</span>
                  <strong className="text-emerald-400 font-bold text-sm">{lastCreatedTicket.id}</strong>
                  <button
                    onClick={() => handleCopyId(lastCreatedTicket.id)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copiedTicketId ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => handleOpenWhatsAppAlert(lastCreatedTicket)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp Alert</span>
                  </button>

                  <button
                    onClick={() => handleTriggerEmailAlert(lastCreatedTicket)}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email NOC Alert</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('track')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Track Status
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-500/30 p-3 rounded-xl flex items-center gap-2.5">
                  <Zap className="h-4 w-4 text-rose-400 shrink-0" />
                  <p className="text-xs text-rose-200 font-medium">
                    24/7 Rapid Lineman Dispatch for Mithapukur, Boldipukur, Ranipukur & Akmal Market Fiber lines.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Md. Rafiqul Islam"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Customer ID / Account No (CID)
                    </label>
                    <input
                      type="text"
                      value={customerId}
                      onChange={e => setCustomerId(e.target.value)}
                      placeholder="DF-MITH-1024"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Connection Union / Area
                    </label>
                    <select
                      value={union}
                      onChange={e => setUnion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
                    >
                      {UNIONS_LIST.map(u => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs focus:outline-none"
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
                        { id: 'normal', label: 'Low', icon: CheckCircle2, activeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50 ring-1 ring-blue-500/40 font-bold' },
                        { id: 'medium', label: 'Medium', icon: Activity, activeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/50 ring-1 ring-amber-500/40 font-bold' },
                        { id: 'high', label: 'High', icon: AlertTriangle, activeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/50 ring-1 ring-orange-500/40 font-bold' },
                        { id: 'emergency', label: 'Emergency', icon: ShieldAlert, activeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/50 ring-1 ring-rose-500/50 font-bold' }
                      ].map(p => {
                        const IconComp = p.icon;
                        const isSelected = priority === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPriority(p.id as any)}
                            className={`py-1.5 px-1 rounded-lg text-[10px] border cursor-pointer flex items-center justify-center gap-1 transition-all ${
                              isSelected ? p.activeColor : 'border-slate-800 text-slate-500 hover:text-slate-300 bg-slate-950'
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
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe your ONU light status (e.g. LOS red light blinking), router wifi issue, or optical loss..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 p-3 rounded-xl text-slate-100 text-xs focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <a
                    href={`tel:${BRANCH_INFO.phone}`}
                    className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 font-semibold"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span>24/7 Helpline: {BRANCH_INFO.phone}</span>
                  </a>

                  <button
                    type="submit"
                    disabled={isSubmittingTicket}
                    className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-75 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/20 flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmittingTicket ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-200" />
                        <span>Registering Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Submit Support Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )
          )}

          {/* TAB 2: CLIENT CID LOGIN & DASHBOARD */}
          {activeTab === 'client_portal' && (
            loggedInClient ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-lg">
                      {loggedInClient.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-white">{loggedInClient.name}</h3>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full">
                          VERIFIED CLIENT
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        CID: <strong className="text-emerald-400">{loggedInClient.customerId}</strong> | Phone: {loggedInClient.phone}
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

                {/* Line Status Indicators */}
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
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Plan & Bandwidth</span>
                      <strong className="text-slate-200">{loggedInClient.package || '50 Mbps BDIX Line'}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                    <Activity className="h-5 w-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">BDIX IX Latency</span>
                      <strong className="text-amber-400 font-mono">1.8 ms (Super Low)</strong>
                    </div>
                  </div>
                </div>

                {/* Client Tickets List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Ticket className="h-4 w-4 text-emerald-400" />
                    <span>Your Submitted Support Tickets ({clientTickets.length})</span>
                  </h4>

                  {clientTickets.length === 0 ? (
                    <div className="p-6 text-center bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">No active tickets under this account.</p>
                      <button
                        onClick={() => {
                          setActiveTab('create');
                          setCustomerId(loggedInClient.customerId);
                          setName(loggedInClient.name);
                          setPhone(loggedInClient.phone);
                        }}
                        className="mt-3 px-3.5 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Open New Ticket</span>
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
                        <div className="text-[10px] text-slate-400 bg-slate-900 p-2 rounded-lg flex justify-between">
                          <span>Assigned Lineman: <strong className="text-blue-400">{t.assignedTechnician}</strong></span>
                          <span>Created: {t.createdAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-white">Client CID Portal Login</h3>
                  <p className="text-xs text-slate-400">
                    Log in with your Mobile Number or Customer ID (CID) to track support tickets.
                  </p>
                </div>

                {clientError && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl text-center">
                    {clientError}
                  </div>
                )}

                <form onSubmit={handleClientLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Customer ID (CID) or Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      value={clientPhoneInput}
                      onChange={e => setClientPhoneInput(e.target.value)}
                      placeholder="e.g. DF-MITH-1024 or 01712001122"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 px-3.5 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>Access Client Dashboard</span>
                  </button>

                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setClientPhoneInput('DF-MITH-1024');
                        handleClientLogin();
                      }}
                      className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-[11px] rounded-lg border border-slate-800 cursor-pointer"
                    >
                      Demo Client (DF-MITH-1024)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setClientPhoneInput('01819887766');
                        handleClientLogin();
                      }}
                      className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-blue-400 font-bold text-[11px] rounded-lg border border-slate-800 cursor-pointer"
                    >
                      Demo Client (01819887766)
                    </button>
                  </div>
                </form>
              </div>
            )
          )}

          {/* TAB 3: BRANCH MANAGER NOC ADMIN CONTROL */}
          {activeTab === 'admin_portal' && (
            !isAdminLoggedIn ? (
              <div className="max-w-md mx-auto p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-1">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-white">Branch Manager NOC Control</h3>
                  <p className="text-xs text-slate-400">
                    Mithapukur Delta Broadband — Central Ticket & Lineman Dispatch Desk
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
                    <span>Authorize Manager Login</span>
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
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    <span>One-Click Manager Access (admin / admin)</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Admin Status Banner & Controls */}
                <div className="p-3.5 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-white">Branch Manager Authorized Session</h3>
                      <p className="text-[11px] text-slate-400">
                        Manager: {BRANCH_INFO.manager} (Akmal Market Central Desk)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Lock Session</span>
                    </button>
                  </div>
                </div>

                {/* Admin Analytics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Total</span>
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
                  <div className="p-2.5 bg-purple-950/40 rounded-xl border border-purple-500/30 col-span-2 sm:col-span-1">
                    <span className="text-[9px] font-bold text-purple-300 uppercase block">Emergency</span>
                    <strong className="text-base font-black text-purple-400">{emergencyCount}</strong>
                  </div>
                </div>

                {/* Admin Search & Priority Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="relative flex-1 min-w-[160px]">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search tickets, phone, CID..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 pl-8 pr-2 py-1 rounded-lg text-slate-100 text-xs font-mono focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Filter Priority:</span>
                    <select
                      value={priorityFilter}
                      onChange={e => setPriorityFilter(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs text-slate-200 font-bold rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="ALL">All Priorities</option>
                      <option value="emergency">🔴 Emergency Cut</option>
                      <option value="high">🟧 High Priority</option>
                      <option value="medium">🟨 Medium</option>
                      <option value="normal">🟦 Low / Normal</option>
                    </select>
                  </div>
                </div>

                {/* Tickets Table & Dispatch Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                  <div className={`${selectedTicket ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-2 max-h-[380px] overflow-y-auto`}>
                    {filteredTickets.map(t => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTicket(t)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedTicket?.id === t.id
                            ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-slate-950 border-slate-800/90 hover:border-slate-700'
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
                          <span>Union: {t.union}</span>
                          <span className="text-blue-400 font-semibold">{t.assignedTechnician || 'Unassigned'}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTicket && (
                    <div className="lg:col-span-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3 text-xs max-h-[380px] overflow-y-auto">
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

                      {/* Manager Controls */}
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

                        {/* WhatsApp & Email Dispatch Actions */}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleOpenWhatsAppAlert(selectedTicket)}
                            className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp Dispatch</span>
                          </button>

                          <button
                            onClick={() => handlePrintTicket(selectedTicket)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <Printer className="h-3.5 w-3.5 text-blue-400" />
                            <span>Work Order</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* TAB 4: AI OPTICAL & LINE DIAGNOSTICS */}
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
                      Real-time ONU RX Power, Latency, and Splitting Loss diagnostic recommendation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-300">
                  Enter Customer CID or Phone for Line Check
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiCidInput}
                    onChange={e => setAiCidInput(e.target.value)}
                    placeholder="e.g. DF-MITH-1024"
                    className="flex-1 bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-100 focus:border-purple-500"
                  />
                  <button
                    onClick={handleRunAiDiagnostic}
                    disabled={isDiagnosing}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isDiagnosing ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Bot className="h-3.5 w-3.5" />}
                    <span>{isDiagnosing ? 'Running AI Scan...' : 'Run Diagnostics'}</span>
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
                        <span className="text-slate-500 block">bKash Account:</span>
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

          {/* TAB 5: PUBLIC TRACK TICKET */}
          {activeTab === 'track' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by Ticket ID, Phone, CID, or Name..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 pl-9 pr-3 py-2 rounded-xl text-slate-100 text-xs font-mono focus:outline-none"
                  />
                </div>
                <select
                  value={priorityFilter}
                  onChange={e => setPriorityFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 font-bold rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="emergency">🔴 Emergency Cut</option>
                  <option value="high">🟧 High Priority</option>
                  <option value="medium">🟨 Medium</option>
                  <option value="normal">🟦 Low / Normal</option>
                </select>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPriorityFilter('ALL');
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {filteredTickets.length === 0 ? (
                <div className="text-center py-8 bg-slate-950 rounded-2xl border border-slate-800 p-4">
                  <p className="text-xs text-slate-400">No tickets found matching your query.</p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto">
                  {filteredTickets.map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 space-y-2 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                            {ticket.id}
                          </span>
                          <PriorityBadge priority={ticket.priority} />
                        </div>
                        <span className="text-xs font-bold text-slate-200">{ticket.name} ({ticket.customerId})</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {ticket.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-300">{ticket.subject}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{ticket.description}</p>

                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                        <span>Area: {ticket.union}</span>
                        <span>Lineman: <strong className="text-amber-400">{ticket.assignedTechnician}</strong></span>
                        <span>Date: {ticket.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Mithapukur Akmal Market Central NOC Engineering Desk</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${BRANCH_INFO.phone}`}
              className="text-amber-400 hover:underline font-bold flex items-center gap-1"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{BRANCH_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
