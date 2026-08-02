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
  CheckSquare
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
  { id: 'other', label: '❓ Other Technical / Line Request', defaultPriority: 'normal' },
];

const DEMO_TECHNICIANS = [
  'Mithapukur Emergency Line Squad (Akmal Market Hub)',
  'Boldipukur Field Tech Team B',
  'Ranipukur Fiber Splicing Specialist',
  'Sadar Central NOC Engineer (Sharif)',
  'Payraband Local Support Lineman'
];

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose,
  initialCategory = ''
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'create' | 'track' | 'client_portal' | 'admin_portal'>('create');

  // Form State
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
  const [loggedInClient, setLoggedInClient] = useState<{ phone: string; name: string; customerId: string } | null>(null);
  const [clientError, setClientError] = useState('');

  // Admin Edit Ticket Modal / Form State
  const [adminNoteText, setAdminNoteText] = useState('');
  const [assignedTechInput, setAssignedTechInput] = useState('');

  // Client Note Input
  const [clientNoteText, setClientNoteText] = useState('');

  // Load tickets on mount / open
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = localStorage.getItem('delta_support_tickets');
        if (saved) {
          setTickets(JSON.parse(saved));
        } else {
          // Add default sample tickets for demo
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

  // Mark selected ticket as read in localStorage when user views it
  useEffect(() => {
    if (selectedTicket && selectedTicket.updates && selectedTicket.updates.length > 0) {
      try {
        const readUpdates = JSON.parse(localStorage.getItem('delta_read_ticket_updates') || '{}');
        const latestText = selectedTicket.updates[0].text;
        if (readUpdates[selectedTicket.id] !== latestText) {
          readUpdates[selectedTicket.id] = latestText;
          localStorage.setItem('delta_read_ticket_updates', JSON.stringify(readUpdates));
          window.dispatchEvent(new Event('storage'));
        }
      } catch (err) {
        console.error('Error marking ticket as read', err);
      }
    }
  }, [selectedTicket]);

  if (!isOpen) return null;

  // Save tickets helper
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

    // Reset form fields
    setCustomerId('');
    setName('');
    setPhone('');
    setSubject('');
    setDescription('');
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedTicketId(true);
    setTimeout(() => setCopiedTicketId(false), 2000);
  };

  // Admin actions
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
              text: `Status changed to ${newStatus} by Branch Manager.`,
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
              text: `Priority updated to ${newPriority.toUpperCase()} by Branch Manager.`,
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
        customerId: matchedTicket.customerId
      });
      setClientError('');
    } else {
      // Allow demo login
      setLoggedInClient({
        phone: query.startsWith('01') ? query : '01712001122',
        name: 'Md. Abdul Karim',
        customerId: query.startsWith('DF') ? query : 'DF-MITH-1024'
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

  // Client tickets
  const clientTickets = loggedInClient
    ? tickets.filter(t => t.phone === loggedInClient.phone || t.customerId === loggedInClient.customerId)
    : [];

  // Summary counts
  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status === 'OPEN').length;
  const progressCount = tickets.filter(t => t.status === 'IN_PROGRESS').length;
  const resolvedCount = tickets.filter(t => t.status === 'RESOLVED').length;
  const emergencyCount = tickets.filter(t => t.priority === 'emergency').length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4 sm:px-6 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 via-orange-600 to-amber-500 text-white shadow-lg shadow-rose-500/20">
              <LifeBuoy className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {language === 'bn' ? 'মিঠাপুকুর ফাইবার সাপোর্ট টিকিট অ্যান্ড সাপোর্ট পোর্টাল' : 'Mithapukur Support Ticket Portal'}
                </h2>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  24/7 Priority Desk
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'কাস্টমার টিকিটিং, ক্লায়েন্ট লগইন ও ব্রাঞ্চ ম্যানেজার অ্যাডমিন ম্যানেজমেন্ট'
                  : 'Submit tickets, client portal login, and branch manager admin operations'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 sm:px-6 bg-slate-950/80 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('create');
              setLastCreatedTicket(null);
            }}
            className={`flex items-center gap-2 py-3 px-3.5 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'create'
                ? 'border-rose-500 text-rose-400 bg-rose-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Ticket className="h-4 w-4 text-rose-400" />
            <span>{language === 'bn' ? 'নতুন টিকিট জমা দিন' : 'Create Ticket'}</span>
          </button>

          <button
            onClick={() => setActiveTab('client_portal')}
            className={`flex items-center gap-2 py-3 px-3.5 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'client_portal'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="h-4 w-4 text-emerald-400" />
            <span>{language === 'bn' ? 'ক্লায়েন্ট পোর্টাল লগইন' : 'Client Login'}</span>
            {loggedInClient && (
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('admin_portal')}
            className={`flex items-center gap-2 py-3 px-3.5 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'admin_portal'
                ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>{language === 'bn' ? 'ব্রাঞ্চ ম্যানেজার অ্যাডমিন' : 'Branch Manager Admin'}</span>
            {isAdminLoggedIn && (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-1.5 py-0.2 rounded font-bold">
                AUTH
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`flex items-center gap-2 py-3 px-3.5 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'track'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="h-4 w-4 text-blue-400" />
            <span>
              {language === 'bn' ? 'টিকিট খুঁজুন' : 'Track Ticket'} ({tickets.length})
            </span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: CREATE TICKET */}
          {activeTab === 'create' && (
            lastCreatedTicket ? (
              <div className="p-6 bg-slate-950 rounded-2xl border border-emerald-500/30 text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-500/10 mb-1">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">
                    {language === 'bn' ? 'সাপোর্ট টিকিট সফলভাবে তৈরি হয়েছে!' : 'Support Ticket Successfully Generated!'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {language === 'bn'
                      ? 'আমাদের মিঠাপুকুর টেকনিক্যাল টিম আপনার টিকিটটি গ্রহণ করেছে। অতি দ্রুত আমাদের টেকনিশিয়ান টিম আপনার সাথে যোগাযোগ করবে।'
                      : 'Our local Mithapukur engineering desk has logged your issue. A technician has been assigned.'}
                  </p>
                </div>

                <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl font-mono text-sm">
                  <span className="text-slate-400 font-sans text-xs">Ticket ID:</span>
                  <strong className="text-emerald-400 font-bold text-base">{lastCreatedTicket.id}</strong>
                  <button
                    onClick={() => handleCopyId(lastCreatedTicket.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Ticket ID"
                  >
                    {copiedTicketId ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block">Name & Customer ID:</span>
                    <strong className="text-slate-200">{lastCreatedTicket.name} ({lastCreatedTicket.customerId})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Assigned Unit:</span>
                    <strong className="text-blue-400">{lastCreatedTicket.assignedTechnician}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Area / Union:</span>
                    <strong className="text-slate-200">{lastCreatedTicket.union}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Est. Resolution:</span>
                    <strong className="text-amber-400">
                      {lastCreatedTicket.priority === 'emergency' ? '30-60 Minutes (Fiber Cut)' : '2-4 Hours'}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('track');
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 cursor-pointer flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    <span>{language === 'bn' ? 'টিকিট স্ট্যাটাস ও লগ দেখুন' : 'Track Ticket Status'}</span>
                  </button>

                  <a
                    href={`tel:${BRANCH_INFO.phone}`}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{language === 'bn' ? 'জরুরি প্রয়োজনে আকমল মার্কেট হটলাইনে কল দিন' : 'Call Emergency Line'}</span>
                  </a>

                  <button
                    onClick={() => setLastCreatedTicket(null)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    {language === 'bn' ? 'আরেকটি টিকিট তৈরি করুন' : 'Submit Another Ticket'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-amber-500/10 border border-rose-500/30 p-3.5 rounded-xl flex items-center gap-3">
                  <Zap className="h-5 w-5 text-rose-400 shrink-0" />
                  <p className="text-xs text-rose-200">
                    {language === 'bn'
                      ? 'মিঠাপুকুর আকমল মার্কেট ইঞ্জিনিয়ারিং টিম অপটিক্যাল ফাইবার লাইন কাটা বা স্পিড সমস্যা দ্রুত সমাধানে নিয়োজিত রয়েছে।'
                      : 'Direct line dispatch available for Mithapukur optical drop line cable cuts & signal issues.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-blue-400" />
                      {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: মোঃ রফিকুল ইসলাম' : 'e.g. Md. Rafiqul Islam'}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" />
                      {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-sm font-mono focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Ticket className="h-3.5 w-3.5 text-amber-400" />
                      {language === 'bn' ? 'কাস্টমার আইডেন্টিটি (ঐচ্ছিক)' : 'Customer ID / Account No (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={customerId}
                      onChange={e => setCustomerId(e.target.value)}
                      placeholder="DF-MITH-XXXX"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-sm font-mono focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                      {language === 'bn' ? 'সংযোগের এলাকা / ইউনিয়ন' : 'Connection Union / Location Area'}
                    </label>
                    <select
                      value={union}
                      onChange={e => setUnion(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-sm focus:outline-none transition-colors"
                    >
                      {UNIONS_LIST.map(u => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                      {language === 'bn' ? 'সমস্যার ধরন (Category)' : 'Issue Category'}
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
                      className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-sm focus:outline-none transition-colors"
                    >
                      {ISSUE_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.label}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      {language === 'bn' ? 'জরুরি মাত্রা (Priority)' : 'Priority Level'}
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                      {[
                        { id: 'normal', label: 'Normal', color: 'border-slate-700 bg-slate-900 text-slate-300' },
                        { id: 'medium', label: 'Medium', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' },
                        { id: 'high', label: 'High', color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
                        { id: 'emergency', label: 'Emergency', color: 'border-rose-500/50 bg-rose-500/20 text-rose-300 font-bold' }
                      ].map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriority(p.id as any)}
                          className={`py-1.5 px-1 rounded-lg text-[11px] text-center border cursor-pointer transition-all ${
                            priority === p.id ? `${p.color} ring-2 ring-rose-500/30 scale-105` : 'border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-blue-400" />
                    {language === 'bn' ? 'সংক্ষিপ্ত বিষয় (Subject)' : 'Ticket Subject'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: ক্যাবল কেটে যাওয়াতে ইন্টারনেট সম্পূর্ণ বন্ধ' : 'e.g. Optical fiber drop cable cut after tree trimming'}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 px-3.5 py-2 rounded-xl text-slate-100 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
                    {language === 'bn' ? 'সমস্যার বিস্তারিত বিবরণ *' : 'Detailed Description *'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder={
                      language === 'bn'
                        ? 'অনুগ্রহ করে আপনার ONU ডিভাইসের বাতির অবস্থা (যেমন LOS লাল বাতি), বা রাউটারের অবস্থা বিস্তারিত লিখুন...'
                        : 'Describe your ONU indicator lights, optical loss details or router issue...'
                    }
                    className="w-full bg-slate-950 border border-slate-700 focus:border-rose-500 p-3.5 rounded-xl text-slate-100 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <a
                    href={`tel:${BRANCH_INFO.phone}`}
                    className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 font-semibold transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span>24/7 Hotline: {BRANCH_INFO.phone}</span>
                  </a>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-rose-600/25 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" />
                    <span>{language === 'bn' ? 'সাপোর্ট টিকিট সাবমিট করুন' : 'Submit Support Ticket'}</span>
                  </button>
                </div>
              </form>
            )
          )}

          {/* TAB 2: CLIENT PORTAL LOGIN & DASHBOARD */}
          {activeTab === 'client_portal' && (
            loggedInClient ? (
              <div className="space-y-5">
                {/* Client Profile Header */}
                <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-xl">
                      {loggedInClient.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-white">{loggedInClient.name}</h3>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          VERIFIED CLIENT
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Customer ID: <strong className="text-emerald-400">{loggedInClient.customerId}</strong> | Phone: {loggedInClient.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTab('create');
                        setCustomerId(loggedInClient.customerId);
                        setName(loggedInClient.name);
                        setPhone(loggedInClient.phone);
                      }}
                      className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>{language === 'bn' ? 'নতুন টিকিট খুলুন' : 'New Ticket'}</span>
                    </button>
                    <button
                      onClick={() => setLoggedInClient(null)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>

                {/* Client's Submitted Tickets */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-emerald-400" />
                    <span>Your Submitted Support Tickets ({clientTickets.length})</span>
                  </h4>

                  {clientTickets.length === 0 ? (
                    <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800">
                      <LifeBuoy className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">No tickets submitted yet under this phone or account number.</p>
                      <button
                        onClick={() => {
                          setActiveTab('create');
                          setCustomerId(loggedInClient.customerId);
                          setName(loggedInClient.name);
                          setPhone(loggedInClient.phone);
                        }}
                        className="mt-3 px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Submit Ticket Now</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {clientTickets.map(t => (
                        <div key={t.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                {t.id}
                              </span>
                              <span className="text-xs font-bold text-slate-300">{t.category}</span>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                t.status === 'RESOLVED'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                  : t.status === 'IN_PROGRESS'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              }`}
                            >
                              {t.status}
                            </span>
                          </div>

                          <p className="text-xs text-slate-200 font-medium">{t.description}</p>

                          <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                            <span>Assigned Lineman: <strong className="text-blue-400">{t.assignedTechnician}</strong></span>
                            <span>Created: {t.createdAt}</span>
                          </div>

                          {/* Client Comment / Reply Section */}
                          <div className="pt-2 border-t border-slate-800 space-y-2">
                            <span className="text-[11px] font-bold text-slate-400 block">Ticket Updates & Responses:</span>
                            {t.updates && t.updates.length > 0 && (
                              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                                {t.updates.map((u, idx) => (
                                  <div key={idx} className="p-2 bg-slate-900 rounded-lg text-xs space-y-0.5">
                                    <div className="flex items-center justify-between text-[10px]">
                                      <span className="font-bold text-indigo-400">{u.author}</span>
                                      <span className="text-slate-500">{u.time}</span>
                                    </div>
                                    <p className="text-slate-300 text-[11px]">{u.text}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Client Add Reply Input */}
                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                value={selectedTicket?.id === t.id ? clientNoteText : ''}
                                onChange={e => {
                                  setSelectedTicket(t);
                                  setClientNoteText(e.target.value);
                                }}
                                placeholder="Write a response or update to engineering team..."
                                className="flex-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                              />
                              <button
                                onClick={() => {
                                  setSelectedTicket(t);
                                  handleAddClientNote(t.id);
                                }}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Client Login Form */
              <div className="max-w-md mx-auto p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
                <div className="text-center space-y-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-white">Client Portal Login</h3>
                  <p className="text-xs text-slate-400">
                    Log in with your Mobile Phone Number or Customer ID to manage your fiber tickets.
                  </p>
                </div>

                {clientError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl text-center">
                    {clientError}
                  </div>
                )}

                <form onSubmit={handleClientLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Mobile Number or Customer ID
                    </label>
                    <input
                      type="text"
                      required
                      value={clientPhoneInput}
                      onChange={e => setClientPhoneInput(e.target.value)}
                      placeholder="e.g. 01712001122 or DF-MITH-1024"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 px-3.5 py-2.5 rounded-xl text-slate-100 text-sm font-mono placeholder-slate-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>Access Client Dashboard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setClientPhoneInput('01712001122');
                      handleClientLogin();
                    }}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>One-Click Demo Client Access (01712001122)</span>
                  </button>
                </form>
              </div>
            )
          )}

          {/* TAB 3: BRANCH MANAGER ADMIN PORTAL */}
          {activeTab === 'admin_portal' && (
            !isAdminLoggedIn ? (
              /* Admin Login Form */
              <div className="max-w-md mx-auto p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
                <div className="text-center space-y-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-white">Branch Manager Admin Portal</h3>
                  <p className="text-xs text-slate-400">
                    Mithapukur Delta Broadband — Akmal Market Central Ticket Management
                  </p>
                </div>

                {adminError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl text-center">
                    {adminError}
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      value={adminUser}
                      onChange={e => setAdminUser(e.target.value)}
                      placeholder="admin"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 px-3.5 py-2.5 rounded-xl text-slate-100 text-sm font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Admin Password
                    </label>
                    <input
                      type="password"
                      value={adminPass}
                      onChange={e => setAdminPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 px-3.5 py-2.5 rounded-xl text-slate-100 text-sm font-mono focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Authorize Branch Manager Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAdminUser('admin');
                      setAdminPass('admin');
                      handleAdminLogin();
                    }}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>One-Click Manager Access (admin / admin)</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Admin Management Dashboard */
              <div className="space-y-5">
                {/* Admin Status Banner & Controls */}
                <div className="p-4 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-white">Branch Manager Authorized Session</h3>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold">
                        Manager: {BRANCH_INFO.manager} ({BRANCH_INFO.name})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                      title="Export all support tickets to CSV"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Lock Admin Session</span>
                    </button>
                  </div>
                </div>

                {/* Admin Analytics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Tickets</span>
                    <strong className="text-lg font-black text-white">{totalCount}</strong>
                  </div>
                  <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-500/30 text-center">
                    <span className="text-[10px] font-bold text-rose-300 block uppercase">Open Pending</span>
                    <strong className="text-lg font-black text-rose-400">{openCount}</strong>
                  </div>
                  <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/30 text-center">
                    <span className="text-[10px] font-bold text-amber-300 block uppercase">In Progress</span>
                    <strong className="text-lg font-black text-amber-400">{progressCount}</strong>
                  </div>
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-center">
                    <span className="text-[10px] font-bold text-emerald-300 block uppercase">Resolved</span>
                    <strong className="text-lg font-black text-emerald-400">{resolvedCount}</strong>
                  </div>
                  <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-500/30 text-center col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-purple-300 block uppercase">Emergency Cuts</span>
                    <strong className="text-lg font-black text-purple-400">{emergencyCount}</strong>
                  </div>
                </div>

                {/* Filter and Search Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search ID, Name, Union, Phone..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 pl-9 pr-3 py-1.5 rounded-lg text-xs text-slate-100"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as any)}
                    className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="ALL">Filter Status: All ({tickets.length})</option>
                    <option value="OPEN">Open Pending ({openCount})</option>
                    <option value="IN_PROGRESS">In Progress ({progressCount})</option>
                    <option value="RESOLVED">Resolved ({resolvedCount})</option>
                  </select>

                  <select
                    value={priorityFilter}
                    onChange={e => setPriorityFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="ALL">Filter Priority: All</option>
                    <option value="emergency">🔴 Emergency Line Cut</option>
                    <option value="high">🟧 High Priority</option>
                    <option value="medium">🟨 Medium</option>
                    <option value="normal">🟦 Normal</option>
                  </select>
                </div>

                {/* Admin Tickets Table & Selected Ticket Management View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Ticket List Column */}
                  <div className={`${selectedTicket ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-2.5 max-h-[420px] overflow-y-auto pr-1`}>
                    {filteredTickets.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-400">No tickets matching selected filters.</p>
                      </div>
                    ) : (
                      filteredTickets.map(t => (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSelectedTicket(t);
                            setAssignedTechInput(t.assignedTechnician || '');
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            selectedTicket?.id === t.id
                              ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                              : 'bg-slate-950 border-slate-800/90 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                {t.id}
                              </span>
                              <span className="text-xs font-bold text-slate-200">{t.name}</span>
                            </div>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                t.status === 'RESOLVED'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                  : t.status === 'IN_PROGRESS'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              }`}
                            >
                              {t.status}
                            </span>
                          </div>

                          <p className="text-xs font-medium text-slate-300 line-clamp-1">{t.subject}</p>

                          <div className="mt-2 flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-900">
                            <span>Union: <strong>{t.union}</strong></span>
                            <span>Phone: <strong className="font-mono">{t.phone}</strong></span>
                            <span className="text-blue-400 font-semibold">{t.assignedTechnician || 'Unassigned'}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Selected Ticket Admin Panel Details Column */}
                  {selectedTicket && (
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 max-h-[420px] overflow-y-auto">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-mono text-sm font-black text-amber-400">{selectedTicket.id}</h4>
                            <span className="text-xs text-slate-400 font-bold">{selectedTicket.name}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono">
                            ID: {selectedTicket.customerId} | Phone: {selectedTicket.phone} | Union: {selectedTicket.union}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedTicket(null)}
                          className="p-1 text-slate-500 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Ticket Issue Description */}
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">{selectedTicket.category}</span>
                        <p className="text-xs text-slate-200 font-medium">{selectedTicket.description}</p>
                      </div>

                      {/* Admin Controls */}
                      <div className="space-y-3 pt-1">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                              Update Status
                            </label>
                            <select
                              value={selectedTicket.status}
                              onChange={e => handleUpdateTicketStatus(selectedTicket.id, e.target.value as any)}
                              className="w-full bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-100 focus:border-amber-500"
                            >
                              <option value="OPEN">🔴 OPEN (Pending)</option>
                              <option value="IN_PROGRESS">🟨 IN PROGRESS</option>
                              <option value="RESOLVED">🟢 RESOLVED</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                              Update Priority
                            </label>
                            <select
                              value={selectedTicket.priority}
                              onChange={e => handleUpdateTicketPriority(selectedTicket.id, e.target.value as any)}
                              className="w-full bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-100 focus:border-amber-500"
                            >
                              <option value="emergency">🔴 Emergency (Fiber Cut)</option>
                              <option value="high">🟧 High Priority</option>
                              <option value="medium">🟨 Medium</option>
                              <option value="normal">🟦 Normal</option>
                            </select>
                          </div>
                        </div>

                        {/* Assign Field Lineman / Tech */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                            Assign Lineman / Field Tech
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={assignedTechInput || selectedTicket.assignedTechnician || ''}
                              onChange={e => {
                                setAssignedTechInput(e.target.value);
                                handleAssignTechnician(selectedTicket.id, e.target.value);
                              }}
                              className="flex-1 bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs text-slate-100 focus:border-amber-500"
                            >
                              {DEMO_TECHNICIANS.map(tech => (
                                <option key={tech} value={tech}>
                                  {tech}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Add Admin Note / Resolution update */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                            Post Official Resolution Note
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={adminNoteText}
                              onChange={e => setAdminNoteText(e.target.value)}
                              placeholder="e.g. Lineman splitted cable at Akmal Market hub, loss restored -18dBm."
                              className="flex-1 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-100 focus:border-amber-500"
                            />
                            <button
                              onClick={() => handleAddAdminNote(selectedTicket.id)}
                              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg cursor-pointer shrink-0"
                            >
                              Post
                            </button>
                          </div>
                        </div>

                        {/* Print & Delete Action Buttons */}
                        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
                          <button
                            onClick={() => handlePrintTicket(selectedTicket)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <Printer className="h-3.5 w-3.5 text-blue-400" />
                            <span>Print Work Order</span>
                          </button>

                          <button
                            onClick={() => handleDeleteTicket(selectedTicket.id)}
                            className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold text-xs rounded-lg border border-rose-500/30 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* TAB 4: PUBLIC TRACK TICKET */}
          {activeTab === 'track' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={language === 'bn' ? 'টিকিট আইডি বা মোবাইল নম্বর দিয়ে খুঁজুন...' : 'Search by Ticket ID, Phone, or Name...'}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 pl-10 pr-4 py-2.5 rounded-xl text-slate-100 text-sm font-mono focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Tickets List */}
              {filteredTickets.length === 0 ? (
                <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-6">
                  <LifeBuoy className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <h4 className="text-slate-300 font-bold text-sm">No tickets found</h4>
                  <p className="text-slate-500 text-xs mt-1">Submit a new ticket or search with another phone number.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredTickets.map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedTicket?.id === ticket.id
                          ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                            {ticket.id}
                          </span>
                          <span className="text-xs font-bold text-slate-200">{ticket.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">({ticket.phone})</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                              ticket.status === 'RESOLVED'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : ticket.status === 'IN_PROGRESS'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-300 line-clamp-1">{ticket.subject}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{ticket.description}</p>

                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-indigo-400" />
                          {ticket.union}
                        </span>
                        <span className="flex items-center gap-1">
                          <Wrench className="h-3 w-3 text-amber-400" />
                          {ticket.assignedTechnician}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-500" />
                          {ticket.createdAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Info */}
        <div className="p-3.5 sm:px-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Mithapukur Akmal Market Local Engineering Support</span>
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

