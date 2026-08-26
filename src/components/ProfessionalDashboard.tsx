import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  Activity,
  Server,
  Users,
  CreditCard,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Download,
  Bell,
  Radio,
  Sliders,
  Send,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  BarChart3,
  Cpu,
  Globe,
  Database,
  ArrowLeft,
  ChevronRight,
  Home,
  FileText,
  Phone,
  Settings,
  Flame,
  UserCheck,
  Building2,
  Lock,
  Compass,
  Laptop,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export type DashboardTab = 'overview' | 'noc_telemetry' | 'subscribers' | 'tickets' | 'revenue' | 'ai_diagnostics';

interface SubscriberRecord {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  union: string;
  plan: string;
  speedMbps: number;
  monthlyFee: number;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'MAINTENANCE';
  opticalSignalDbm: number;
  expiryDate: string;
  lastPaymentMethod: 'bKash' | 'Nagad' | 'Cash' | 'Bank';
  assignedLineman: string;
}

interface SupportTicketRecord {
  id: string;
  ticketNo: string;
  customerName: string;
  phone: string;
  union: string;
  issue: string;
  category: 'FIBER_CUT' | 'ONU_OFFLINE' | 'ROUTER_CONFIG' | 'BILLING' | 'SPEED_SLOW';
  priority: 'EMERGENCY' | 'HIGH' | 'NORMAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  assignedLineman: string;
  createdAt: string;
  responseTimeMinutes: number;
}

interface LinemanWorkload {
  name: string;
  shortName: string;
  area: string;
  activeTickets: number;
  resolvedToday: number;
  maxCapacity: number;
  phone: string;
  status: 'AVAILABLE' | 'ON_FIELD' | 'OVERLOADED';
}

const INITIAL_SUBSCRIBERS: SubscriberRecord[] = [
  {
    id: 'sub-1',
    clientId: 'DEL-MTH-1024',
    name: 'Al-Hasan Mahmud',
    phone: '01712-613143',
    union: 'Mithapukur Sadar',
    plan: '40 Mbps High-Speed Fiber',
    speedMbps: 40,
    monthlyFee: 735,
    status: 'ACTIVE',
    opticalSignalDbm: -17.8,
    expiryDate: '2026-09-15',
    lastPaymentMethod: 'bKash',
    assignedLineman: 'Sadar Rapid Squad'
  },
  {
    id: 'sub-2',
    clientId: 'DEL-MTH-1088',
    name: 'Rafiqul Islam (Akmal Market)',
    phone: '01799-445522',
    union: 'Akmal Market Hub',
    plan: '60 Mbps Fiber Family',
    speedMbps: 60,
    monthlyFee: 1050,
    status: 'ACTIVE',
    opticalSignalDbm: -18.4,
    expiryDate: '2026-09-18',
    lastPaymentMethod: 'Nagad',
    assignedLineman: 'Akmal Core Team'
  },
  {
    id: 'sub-3',
    clientId: 'DEL-MTH-1142',
    name: 'Begum Rokeya Institute',
    phone: '01822-998877',
    union: 'Payraband',
    plan: '100 Mbps Dedicated Business',
    speedMbps: 100,
    monthlyFee: 2499,
    status: 'ACTIVE',
    opticalSignalDbm: -19.1,
    expiryDate: '2026-09-28',
    lastPaymentMethod: 'Bank',
    assignedLineman: 'Payraband Splicing Unit'
  },
  {
    id: 'sub-4',
    clientId: 'DEL-MTH-1205',
    name: 'Tania Akter',
    phone: '01911-332211',
    union: 'Ranipukur',
    plan: '30 Mbps Starter Fiber',
    speedMbps: 30,
    monthlyFee: 630,
    status: 'EXPIRED',
    opticalSignalDbm: -22.3,
    expiryDate: '2026-08-22',
    lastPaymentMethod: 'bKash',
    assignedLineman: 'Ranipukur Field Crew'
  },
  {
    id: 'sub-5',
    clientId: 'DEL-MTH-1250',
    name: 'Engr. Shamim Hossain',
    phone: '01744-887766',
    union: 'Balua Masimpur',
    plan: '50 Mbps Smart Stream',
    speedMbps: 50,
    monthlyFee: 840,
    status: 'ACTIVE',
    opticalSignalDbm: -18.0,
    expiryDate: '2026-09-10',
    lastPaymentMethod: 'bKash',
    assignedLineman: 'Balua Fiber Crew'
  },
  {
    id: 'sub-6',
    clientId: 'DEL-MTH-1310',
    name: 'Mirzapur Health Complex',
    phone: '01633-112233',
    union: 'Mirzapur',
    plan: '80 Mbps Gamers Choice',
    speedMbps: 80,
    monthlyFee: 1260,
    status: 'ACTIVE',
    opticalSignalDbm: -19.5,
    expiryDate: '2026-09-05',
    lastPaymentMethod: 'bKash',
    assignedLineman: 'North Border Squad'
  }
];

const INITIAL_TICKETS: SupportTicketRecord[] = [
  {
    id: 't-101',
    ticketNo: 'TK-8821',
    customerName: 'Khoragach Cold Storage Ltd',
    phone: '01711-223344',
    union: 'Mirzapur',
    issue: 'Tree branch fallen on outdoor drop cable, optical loss detected.',
    category: 'FIBER_CUT',
    priority: 'EMERGENCY',
    status: 'IN_PROGRESS',
    assignedLineman: 'North Border Squad',
    createdAt: '10 mins ago',
    responseTimeMinutes: 12
  },
  {
    id: 't-102',
    ticketNo: 'TK-8822',
    customerName: 'Sadar Pharmacy & Diagnostic',
    phone: '01819-556677',
    union: 'Mithapukur Sadar',
    issue: 'New 5GHz WiFi SSID setup for clinic CCTV streaming.',
    category: 'ROUTER_CONFIG',
    priority: 'NORMAL',
    status: 'OPEN',
    assignedLineman: 'Sadar Rapid Squad',
    createdAt: '25 mins ago',
    responseTimeMinutes: 18
  },
  {
    id: 't-103',
    ticketNo: 'TK-8823',
    customerName: 'Payraband Cyber Point',
    phone: '01955-443322',
    union: 'Payraband',
    issue: 'bKash TrxID verification pending for renewal.',
    category: 'BILLING',
    priority: 'NORMAL',
    status: 'RESOLVED',
    assignedLineman: 'Payraband Splicing Unit',
    createdAt: '1 hr ago',
    responseTimeMinutes: 8
  },
  {
    id: 't-104',
    ticketNo: 'TK-8824',
    customerName: 'Ranipukur Govt Primary School',
    phone: '01722-667788',
    union: 'Ranipukur',
    issue: 'ONU red optical light blinking after lightning storm.',
    category: 'ONU_OFFLINE',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    assignedLineman: 'Ranipukur Field Crew',
    createdAt: '45 mins ago',
    responseTimeMinutes: 20
  }
];

const INITIAL_LINEMEN: LinemanWorkload[] = [
  {
    name: 'Mithapukur Emergency Line Squad (Akmal Hub)',
    shortName: 'Akmal Core Team',
    area: 'Mithapukur Sadar & Central Hub',
    activeTickets: 2,
    resolvedToday: 7,
    maxCapacity: 5,
    phone: '01712-613143',
    status: 'AVAILABLE'
  },
  {
    name: 'Boldipukur Field Tech Team B',
    shortName: 'Boldipukur Team B',
    area: 'Boldipukur Market & Latifpur',
    activeTickets: 4,
    resolvedToday: 5,
    maxCapacity: 5,
    phone: '01799-445522',
    status: 'OVERLOADED'
  },
  {
    name: 'Ranipukur Fiber Splicing Specialist',
    shortName: 'Ranipukur Splicer',
    area: 'Ranipukur & Gopalpur Area',
    activeTickets: 3,
    resolvedToday: 6,
    maxCapacity: 5,
    phone: '01911-332211',
    status: 'ON_FIELD'
  },
  {
    name: 'Sadar Central NOC Engineer (Sharif)',
    shortName: 'NOC Engineer Sharif',
    area: 'Central PoP & Core OLT',
    activeTickets: 1,
    resolvedToday: 9,
    maxCapacity: 6,
    phone: '01822-998877',
    status: 'AVAILABLE'
  },
  {
    name: 'Payraband Local Support Lineman',
    shortName: 'Payraband Unit',
    area: 'Payraband & Mirzapur Area',
    activeTickets: 2,
    resolvedToday: 4,
    maxCapacity: 5,
    phone: '01744-887766',
    status: 'AVAILABLE'
  }
];

// Telemetry 24-Hour Traffic Data for Recharts
const TRAFFIC_SERIES_DATA = [
  { time: '00:00', downloadGbps: 3.2, uploadGbps: 1.1, bdixGbps: 2.8, latencyMs: 2.1 },
  { time: '03:00', downloadGbps: 1.8, uploadGbps: 0.6, bdixGbps: 1.4, latencyMs: 1.9 },
  { time: '06:00', downloadGbps: 2.4, uploadGbps: 0.9, bdixGbps: 2.1, latencyMs: 2.0 },
  { time: '09:00', downloadGbps: 5.6, uploadGbps: 2.4, bdixGbps: 4.8, latencyMs: 2.4 },
  { time: '12:00', downloadGbps: 6.8, uploadGbps: 2.9, bdixGbps: 5.9, latencyMs: 2.7 },
  { time: '15:00', downloadGbps: 7.4, uploadGbps: 3.2, bdixGbps: 6.5, latencyMs: 2.8 },
  { time: '18:00', downloadGbps: 8.9, uploadGbps: 4.1, bdixGbps: 7.8, latencyMs: 3.1 },
  { time: '21:00', downloadGbps: 9.4, uploadGbps: 4.6, bdixGbps: 8.4, latencyMs: 3.4 },
  { time: '23:00', downloadGbps: 7.1, uploadGbps: 3.1, bdixGbps: 6.2, latencyMs: 2.6 }
];

// Monthly Performance & Revenue Growth Data for Recharts
const MONTHLY_PERFORMANCE_DATA = [
  { month: 'Mar', ticketsResolved: 142, avgResponseMins: 28, revenueBdt: 820000, targetBdt: 800000, resolutionRate: 94 },
  { month: 'Apr', ticketsResolved: 165, avgResponseMins: 24, revenueBdt: 890000, targetBdt: 850000, resolutionRate: 96 },
  { month: 'May', ticketsResolved: 180, avgResponseMins: 22, revenueBdt: 960000, targetBdt: 900000, resolutionRate: 97 },
  { month: 'Jun', ticketsResolved: 210, avgResponseMins: 19, revenueBdt: 1040000, targetBdt: 1000000, resolutionRate: 98 },
  { month: 'Jul', ticketsResolved: 228, avgResponseMins: 17, revenueBdt: 1120000, targetBdt: 1080000, resolutionRate: 99 },
  { month: 'Aug', ticketsResolved: 245, avgResponseMins: 14, revenueBdt: 1184500, targetBdt: 1150000, resolutionRate: 99.4 }
];

// Ticket categories distribution for Donut chart
const TICKET_CATEGORY_DATA = [
  { name: 'Fiber Drop Cut', value: 34, color: '#f43f5e' },
  { name: 'ONU Power / Storm', value: 28, color: '#f59e0b' },
  { name: 'WiFi / Router Config', value: 22, color: '#3b82f6' },
  { name: 'Billing / bKash', value: 16, color: '#10b981' }
];

interface ProfessionalDashboardProps {
  onBackToWebsite: () => void;
  onOpenSupportTicketModal?: () => void;
}

export const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({
  onBackToWebsite,
  onOpenSupportTicketModal
}) => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>(INITIAL_SUBSCRIBERS);
  const [tickets, setTickets] = useState<SupportTicketRecord[]>(INITIAL_TICKETS);
  const [linemen, setLinemen] = useState<LinemanWorkload[]>(INITIAL_LINEMEN);
  
  // Real-time auto-simulation states
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [currentPing, setCurrentPing] = useState(2.3);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnionFilter, setSelectedUnionFilter] = useState('ALL');

  // Quick Action Modal states
  const [isAddSubscriberModalOpen, setIsAddSubscriberModalOpen] = useState(false);
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Subscriber Form State
  const [newSubName, setNewSubName] = useState('');
  const [newSubPhone, setNewSubPhone] = useState('');
  const [newSubUnion, setNewSubUnion] = useState('Mithapukur Sadar');
  const [newSubPlan, setNewSubPlan] = useState('40 Mbps High-Speed Fiber');
  const [newSubFee, setNewSubFee] = useState(735);

  // New Ticket Form State
  const [newTicketClient, setNewTicketClient] = useState('');
  const [newTicketPhone, setNewTicketPhone] = useState('');
  const [newTicketUnion, setNewTicketUnion] = useState('Mithapukur Sadar');
  const [newTicketIssue, setNewTicketIssue] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState<'EMERGENCY' | 'HIGH' | 'NORMAL'>('NORMAL');
  const [newTicketCategory, setNewTicketCategory] = useState<'FIBER_CUT' | 'ONU_OFFLINE' | 'ROUTER_CONFIG' | 'BILLING' | 'SPEED_SLOW'>('ROUTER_CONFIG');

  // AI Diagnostic Sweep State
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{
    oltDb: string;
    bdixJitter: string;
    linemanStatus: string;
    autoHealed: boolean;
  } | null>(null);

  // Clock ticker & ping generator
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ping jitter simulation
  useEffect(() => {
    if (!isLiveTelemetry) return;
    const interval = setInterval(() => {
      setCurrentPing(parseFloat((1.8 + Math.random() * 0.9).toFixed(2)));
    }, 3000);
    return () => clearInterval(interval);
  }, [isLiveTelemetry]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const matchSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.phone.includes(searchQuery);
      const matchUnion = selectedUnionFilter === 'ALL' || sub.union === selectedUnionFilter;
      return matchSearch && matchUnion;
    });
  }, [subscribers, searchQuery, selectedUnionFilter]);

  // Handle create new subscriber
  const handleCreateSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName || !newSubPhone) return;

    const newSub: SubscriberRecord = {
      id: `sub-${Date.now()}`,
      clientId: `DEL-MTH-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newSubName,
      phone: newSubPhone,
      union: newSubUnion,
      plan: newSubPlan,
      speedMbps: parseInt(newSubPlan.split(' ')[0]) || 40,
      monthlyFee: Number(newSubFee),
      status: 'ACTIVE',
      opticalSignalDbm: -18.2,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastPaymentMethod: 'bKash',
      assignedLineman: 'Sadar Rapid Squad'
    };

    setSubscribers([newSub, ...subscribers]);
    setIsAddSubscriberModalOpen(false);
    setNewSubName('');
    setNewSubPhone('');
    showToast(isBn ? 'নতুন গ্রাহক সফলভাবে নিবন্ধিত হয়েছে!' : 'New Subscriber Registered Successfully!');
  };

  // Handle create new ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketClient || !newTicketIssue) return;

    const newTicket: SupportTicketRecord = {
      id: `t-${Date.now()}`,
      ticketNo: `TK-${Math.floor(8000 + Math.random() * 1999)}`,
      customerName: newTicketClient,
      phone: newTicketPhone || '01712-613143',
      union: newTicketUnion,
      issue: newTicketIssue,
      category: newTicketCategory,
      priority: newTicketPriority,
      status: 'OPEN',
      assignedLineman: 'Mithapukur Emergency Line Squad (Akmal Hub)',
      createdAt: 'Just now',
      responseTimeMinutes: 5
    };

    setTickets([newTicket, ...tickets]);
    setIsCreateTicketModalOpen(false);
    setNewTicketClient('');
    setNewTicketIssue('');
    showToast(isBn ? 'জরুরি সাপোর্ট টিকেট তৈরি হয়েছে!' : 'Support Ticket Created & Dispatched!');
  };

  // Resolve Ticket
  const handleResolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'RESOLVED' as const } : t))
    );
    showToast(isBn ? 'টিকেট সফলভাবে সমাধান (Resolved) করা হয়েছে!' : 'Ticket Marked as Resolved!');
  };

  // AI Diagnostic Sweep
  const runAiDiagnostic = () => {
    setIsDiagnosing(true);
    setDiagnosticProgress(15);
    setDiagnosticResult(null);

    const step1 = setTimeout(() => {
      setDiagnosticProgress(45);
    }, 700);

    const step2 = setTimeout(() => {
      setDiagnosticProgress(80);
    }, 1400);

    const step3 = setTimeout(() => {
      setDiagnosticProgress(100);
      setIsDiagnosing(false);
      setDiagnosticResult({
        oltDb: '-18.42 dBm (Optimal Laser Alignment)',
        bdixJitter: '0.41 ms (Ultra-Low Jitter)',
        linemanStatus: 'All 5 Field Squads Active & Geotagged',
        autoHealed: true
      });
      showToast(isBn ? 'AI ফাইবার অপটিমাইজেশন সম্পন্ন হয়েছে!' : 'AI Fiber Line Auto-Optimization Complete!');
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Background Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/2 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP COMMAND BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Back button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWebsite}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer group"
              title="Return to Public Website"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">{isBn ? 'ওয়েবসাইট' : 'Public Web'}</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 flex items-center justify-center">
                <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Server className="h-4 w-4 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
                    <span>DELTA MITHAPUKUR</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      NOC v4.8
                    </span>
                  </h1>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  {isBn ? 'ম্যানেজার ও অপারেশনাল সেন্ট্রাল কমান্ড ড্যাশবোর্ড' : 'Managerial & Operational Command Cockpit'}
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Indicators & Quick Control Actions */}
          <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
            
            {/* Live BDIX Ping Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-400 text-[11px]">BDIX Ping:</span>
              <span className="font-bold text-emerald-400">{currentPing} ms</span>
            </div>

            {/* Time Clock */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span>{currentTime}</span>
            </div>

            {/* Language Switch */}
            <button
              onClick={() => setLanguage(isBn ? 'en' : 'bn')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isBn ? 'English' : 'বাংলা'}
            </button>

            {/* Quick Action: New Subscriber */}
            <button
              onClick={() => setIsAddSubscriberModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-blue-600/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">{isBn ? 'নতুন গ্রাহক' : 'Add Client'}</span>
            </button>

            {/* Quick Action: Create Ticket */}
            <button
              onClick={() => setIsCreateTicketModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg shadow-rose-600/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Flame className="h-3.5 w-3.5" />
              <span>{isBn ? 'জরুরি টিকেট' : 'New Ticket'}</span>
            </button>
          </div>
        </div>

        {/* SUB-NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-slate-850 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', labelEn: 'Executive Overview', labelBn: 'এক্সেকিউটিভ ওভারভিউ', icon: BarChart3 },
            { id: 'noc_telemetry', labelEn: 'NOC & Fiber Telemetry', labelBn: 'NOC ও ফাইবার ট্রাফিক', icon: Activity },
            { id: 'subscribers', labelEn: 'Subscribers & Billing', labelBn: 'গ্রাহক ও বিলিং ডাটাবেজ', icon: Users },
            { id: 'tickets', labelEn: 'Lineman Ops & Tickets', labelBn: 'লাইনম্যান ও সাপোর্ট টিকেট', icon: ShieldCheck },
            { id: 'revenue', labelEn: 'Managerial Performance', labelBn: 'ম্যানেজার পারফরম্যান্স', icon: TrendingUp },
            { id: 'ai_diagnostics', labelEn: 'AI Diagnostics & Sweep', labelBn: 'AI ফাইবার অপটিমাইজার', icon: Sparkles }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <TabIcon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span>{isBn ? tab.labelBn : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-slate-900/70 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <ol className="flex items-center gap-1.5 font-medium">
            <li>
              <button
                type="button"
                onClick={onBackToWebsite}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <Home className="h-3.5 w-3.5 text-blue-400" />
                <span>{isBn ? 'হোম (মিঠাপুকুর শাখা)' : 'Home (Mithapukur)'}</span>
              </button>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            </li>
            <li>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20">
                <BarChart3 className="h-3.5 w-3.5 text-cyan-400" />
                <span>{isBn ? 'কমান্ড ড্যাশবোর্ড' : 'NOC & Manager Dashboard'}</span>
              </span>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            </li>
            <li>
              <span className="text-slate-300 font-semibold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                {activeTab === 'overview' ? (isBn ? 'ওভারভিউ' : 'Overview') :
                 activeTab === 'noc_telemetry' ? (isBn ? 'NOC টেলিমেট্রি' : 'NOC Telemetry') :
                 activeTab === 'subscribers' ? (isBn ? 'গ্রাহক ডাটাবেজ' : 'Subscribers') :
                 activeTab === 'tickets' ? (isBn ? 'লাইনম্যান টিকেট' : 'Lineman Tickets') :
                 activeTab === 'revenue' ? (isBn ? 'ম্যানেজার রিপোর্ট' : 'Manager Report') :
                 (isBn ? 'AI ফাইবার অপটিমাইজার' : 'AI Sweep')}
              </span>
            </li>
          </ol>

          <button
            type="button"
            onClick={onBackToWebsite}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>← {isBn ? 'পাবলিক ওয়েবসাইটে ফিরুন' : 'Back to Public Website'}</span>
          </button>
        </div>
      </nav>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-950 border border-emerald-500/50 shadow-2xl text-emerald-300 text-xs font-bold flex items-center gap-2 backdrop-blur-xl"
          >
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* 6 High-Impact Glass KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              
              {/* Metric 1: Total Active Clients */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>{isBn ? 'সক্রিয় গ্রাহক' : 'Active Subscribers'}</span>
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white font-mono">1,428</div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-1.5">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>+8.4% {isBn ? 'এই মাসে' : 'this month'}</span>
                </div>
              </div>

              {/* Metric 2: Live Optical Bandwidth */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>{isBn ? 'লাইভ ব্যান্ডউইথ' : 'Live Bandwidth'}</span>
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Activity className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-cyan-400 font-mono">8.42 <span className="text-xs font-normal text-slate-400">Gbps</span></div>
                <div className="text-[11px] text-slate-400 mt-1.5">
                  {isBn ? '১০ Gbps কোর ট্রাঙ্ক ক্যাপাসিটি' : 'of 10 Gbps Trunk'}
                </div>
              </div>

              {/* Metric 3: Monthly Revenue Collection */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>{isBn ? 'মাসিক রাজস্ব আদায়' : 'Monthly Collection'}</span>
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <CreditCard className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">৳ 11.84L</div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>96.2% {isBn ? 'আদায় সম্পন্ন' : 'Collected'}</span>
                </div>
              </div>

              {/* Metric 4: Open Support Tickets */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-rose-500/50 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>{isBn ? 'চলমান টিকেট' : 'Active Tickets'}</span>
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                    <Flame className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-rose-400 font-mono">4 <span className="text-xs text-slate-400 font-normal">Active</span></div>
                <div className="text-[11px] text-slate-400 mt-1.5">
                  {isBn ? 'গড় সমাধান সময়: ১৪ মিনিট' : 'Avg Time: 14 mins'}
                </div>
              </div>

              {/* Metric 5: Optical Laser Quality */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>{isBn ? 'গড় অপটিক্যাল পাওয়ার' : 'Avg Optical Rx'}</span>
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Radio className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">-18.4 <span className="text-xs font-normal text-slate-400">dBm</span></div>
                <div className="text-[11px] text-emerald-400 mt-1.5 font-bold">
                  {isBn ? '১০০% অপটিমাল সিগন্যাল' : '100% Signal Purity'}
                </div>
              </div>

              {/* Metric 6: Coverage Union Nodes */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-indigo-500/50 transition-all">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                  <span>{isBn ? 'কভারেজ হাবসমূহ' : 'Coverage Hubs'}</span>
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Globe className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-indigo-400 font-mono">6 / 6 <span className="text-xs font-normal text-slate-400">Unions</span></div>
                <div className="text-[11px] text-emerald-400 mt-1.5 font-bold">
                  {isBn ? 'সম্পূর্ণ আপটাইম ৯৯.৯৮%' : '99.98% Upazila Uptime'}
                </div>
              </div>
            </div>

            {/* Middle Section: 24h Traffic Chart & Lineman Overload Bars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Traffic Flow Graph (7 Cols) */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-400" />
                      <span>{isBn ? '২৪ ঘণ্টার কোর ব্যান্ডউইথ ও ট্রাফিক বিশ্লেষণ' : '24-Hour Core Bandwidth Telemetry'}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isBn ? 'মিঠাপুকুর OLT কোর ট্রাঙ্ক ও BDIX লোকাল ক্যাশ স্ট্রিমিং' : 'Mithapukur OLT Trunk vs BDIX Local Cache Distribution'}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    ● Peak 9.4 Gbps
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TRAFFIC_SERIES_DATA}>
                      <defs>
                        <linearGradient id="downloadGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="bdixGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                      <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} unit=" G" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Area type="monotone" dataKey="downloadGbps" name="Internet (Gbps)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#downloadGrad)" />
                      <Area type="monotone" dataKey="bdixGbps" name="BDIX Peering (Gbps)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#bdixGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Lineman Overload & Workload Progress Bars (5 Cols) */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span>{isBn ? 'লাইনম্যান ওয়ার্কলোড ও ক্যাপাসিটি' : 'Field Squad Workload & Capacity'}</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isBn ? 'ওভারলোড হওয়া টিম দ্রুত শনাক্তকরণ' : 'Monitor active tickets to spot overloaded squads'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {linemen.map((l, idx) => {
                      const loadPercent = Math.min(100, Math.round((l.activeTickets / l.maxCapacity) * 100));
                      const isOverloaded = l.activeTickets >= 4;

                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-200">{l.shortName}</span>
                            <div className="flex items-center gap-2 font-mono">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isOverloaded
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              }`}>
                                {isOverloaded ? 'OVERLOADED' : `${l.activeTickets} Active`}
                              </span>
                              <span className="text-slate-400">{l.resolvedToday} resolved</span>
                            </div>
                          </div>

                          {/* Horizontal Progress Bar */}
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isOverloaded
                                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                                  : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                              }`}
                              style={{ width: `${loadPercent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{isBn ? 'মোট ফিল্ড ইঞ্জিনিয়ার: ৫ জন' : 'Total Field Engineers: 5'}</span>
                  <button
                    onClick={() => setActiveTab('tickets')}
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isBn ? 'টিকেট পরিচালনা' : 'Manage Tickets'}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Live Incident Ticker & Active Action Callout */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {isBn ? 'AI ফাইবার অপটিমাইজার ও লাইভ নোটিফিকেশন' : 'AI Optical Self-Healing & Instant Dispatch'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {isBn ? 'সমস্ত সাব-পপ সিগন্যাল স্বাভাবিক। কোনো অপটিক্যাল ফাইবার কর্তন নেই।' : 'All Mithapukur Sub-PoP OLT loops operating at 99.98% laser accuracy.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={runAiDiagnostic}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>{isBn ? 'AI ডায়াগনস্টিক চালান' : 'Run AI Sweep'}</span>
                </button>

                <button
                  onClick={() => setIsBroadcastModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
                >
                  <Send className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isBn ? 'গ্রাহক নোটিশ পাঠান' : 'Broadcast SMS'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: NOC & FIBER TELEMETRY */}
        {activeTab === 'noc_telemetry' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Real-Time Optical Node Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Mithapukur Sadar Central PoP', olt: 'Huawei MA5800-X7', ports: '16/16 Active', rx: '-17.8 dBm', ping: '1.9 ms', status: 'Optimal' },
                { name: 'Akmal Market & Boldipukur Hub', olt: 'ZTE C320 OLT', ports: '8/8 Active', rx: '-18.4 dBm', ping: '2.1 ms', status: 'Optimal' },
                { name: 'Payraband Begum Rokeya Hub', olt: 'VSOL EPON/GPON', ports: '8/8 Active', rx: '-19.1 dBm', ping: '2.4 ms', status: 'Optimal' },
                { name: 'Ranipukur & Latifpur Node', olt: 'BDCOM GP3600', ports: '8/8 Active', rx: '-20.4 dBm', ping: '2.8 ms', status: 'Monitored' },
                { name: 'Balua Masimpur & Chengmari', olt: 'ZTE C300 Trunk', ports: '4/4 Active', rx: '-18.9 dBm', ping: '2.3 ms', status: 'Optimal' },
                { name: 'Mirzapur & Khoragach Loop', olt: 'Huawei Core GPON', ports: '4/4 Active', rx: '-19.6 dBm', ping: '2.6 ms', status: 'Optimal' }
              ].map((node, i) => (
                <div key={i} className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-300">{node.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {node.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mb-4">{node.olt} • {node.ports}</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Optical Rx</span>
                        <span className="text-emerald-400 font-bold">{node.rx}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">BDIX Ping</span>
                        <span className="text-blue-400 font-bold">{node.ping}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>OTDR Sweep: Clean</span>
                    <button
                      onClick={() => showToast(`OTDR Sweep Initiated for ${node.name}`)}
                      className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer"
                    >
                      Sweep Loop
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Throughput Chart */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              <h3 className="text-base font-black text-white mb-1">Detailed Peak Throughput vs Latency</h3>
              <p className="text-xs text-slate-400 mb-4">Mithapukur upstream bandwidth (Gbps) correlated with Core Ping (ms)</p>
              
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TRAFFIC_SERIES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="downloadGbps" name="Download (Gbps)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="uploadGbps" name="Upload (Gbps)" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="latencyMs" name="Latency (ms)" stroke="#ec4899" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: SUBSCRIBERS & BILLING CRM */}
        {activeTab === 'subscribers' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search, Filter & Export Toolbar */}
            <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={isBn ? 'গ্রাহকের নাম, আইডি বা মোবাইল খুঁজুন...' : 'Search by name, client ID or mobile...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Union Filter & Add Button */}
              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <select
                    value={selectedUnionFilter}
                    onChange={(e) => setSelectedUnionFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">All Unions ({subscribers.length})</option>
                    <option value="Mithapukur Sadar">Mithapukur Sadar</option>
                    <option value="Akmal Market Hub">Akmal Market Hub</option>
                    <option value="Payraband">Payraband</option>
                    <option value="Ranipukur">Ranipukur</option>
                    <option value="Balua Masimpur">Balua Masimpur</option>
                    <option value="Mirzapur">Mirzapur</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsAddSubscriberModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isBn ? 'নতুন গ্রাহক ফর্ম' : 'Register Subscriber'}</span>
                </button>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">{isBn ? 'গ্রাহক তথ্য ও আইডি' : 'Client & ID'}</th>
                      <th className="p-4">{isBn ? 'ইউনিয়ন ও এলাকা' : 'Union / Area'}</th>
                      <th className="p-4">{isBn ? 'প্যাকেজ ও স্পিড' : 'Plan & Speed'}</th>
                      <th className="p-4">{isBn ? 'মাসিক বিল' : 'Monthly Fee'}</th>
                      <th className="p-4">{isBn ? 'অপটিক্যাল সিগন্যাল' : 'Signal (dBm)'}</th>
                      <th className="p-4">{isBn ? 'অবস্থা' : 'Status'}</th>
                      <th className="p-4 text-right">{isBn ? 'অ্যাকশন' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredSubscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-850/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white font-sans">{sub.name}</div>
                          <div className="text-[11px] text-blue-400">{sub.clientId} • {sub.phone}</div>
                        </td>
                        <td className="p-4 text-slate-300 font-sans">{sub.union}</td>
                        <td className="p-4">
                          <span className="font-bold text-white">{sub.speedMbps} Mbps</span>
                          <div className="text-[10px] text-slate-400">{sub.plan}</div>
                        </td>
                        <td className="p-4 font-bold text-emerald-400">৳ {sub.monthlyFee}</td>
                        <td className="p-4">
                          <span className={`font-bold ${sub.opticalSignalDbm < -21 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {sub.opticalSignalDbm} dBm
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            sub.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => showToast(`bKash Bill Reminder sent to ${sub.phone}`)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans font-bold transition-all cursor-pointer mr-2"
                          >
                            SMS Bill
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: LINEMAN OPS & SUPPORT TICKETS */}
        {activeTab === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Create Ticket Trigger Toolbar */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-lg font-black text-white">{isBn ? 'লাইভ সাপোর্ট ও ফিল্ড লাইনম্যান ডিসপ্যাচ' : 'Live Field Lineman Dispatch & Tickets'}</h3>
                <p className="text-xs text-slate-400">{isBn ? 'জরুরি ফাইবার কাটা ও ওএনইউ অফলাইন দ্রুত মেরামত' : 'Instant field response tracking across Mithapukur'}</p>
              </div>

              <button
                onClick={() => setIsCreateTicketModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{isBn ? 'জরুরি টিকেট ইস্যু করুন' : 'Dispatch Emergency Ticket'}</span>
              </button>
            </div>

            {/* Ticket Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className={`p-5 rounded-3xl bg-slate-900/90 border shadow-xl flex flex-col justify-between transition-all ${
                    t.priority === 'EMERGENCY'
                      ? 'border-rose-500/50 bg-gradient-to-b from-rose-950/20 to-slate-900'
                      : 'border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-blue-400">{t.ticketNo}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.priority === 'EMERGENCY'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}>
                          {t.priority}
                        </span>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'RESOLVED'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-white mb-1">{t.customerName} ({t.union})</h4>
                    <p className="text-xs text-slate-300 mb-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      {t.issue}
                    </p>

                    <div className="text-[11px] text-slate-400 font-mono space-y-1">
                      <div>Assigned: <strong className="text-slate-200">{t.assignedLineman}</strong></div>
                      <div>Created: {t.createdAt} • Response: {t.responseTimeMinutes}m</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${t.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <Phone className="h-3 w-3 text-sky-400" />
                      <span>{t.phone}</span>
                    </a>

                    {t.status !== 'RESOLVED' && (
                      <button
                        onClick={() => handleResolveTicket(t.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>{isBn ? 'সমাধান চিহ্নিত করুন' : 'Mark Resolved'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 5: MANAGERIAL PERFORMANCE & REVENUE CHARTS */}
        {activeTab === 'revenue' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Revenue Trend vs Monthly Target (Recharts Bar & Line) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Revenue vs Target (8 Cols) */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span>{isBn ? 'মাসিক রাজস্ব প্রবৃদ্ধি ও টার্গেট' : 'Monthly Revenue Growth vs Target (BDT)'}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isBn ? 'বিগত ৬ মাসের ক্রমাগত বৃদ্ধি ও বিল কালেকশন' : 'Continuous revenue expansion across Mithapukur branches'}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    ৳ 11,84,500 Current
                  </span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MONTHLY_PERFORMANCE_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} unit=" ৳" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="revenueBdt" name="Actual Revenue (৳)" fill="#10b981" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="targetBdt" name="Target (৳)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Ticket Category Breakdown Donut (4 Cols) */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-white mb-1">{isBn ? 'ইস্যুর ধরন অনুপাত' : 'Ticket Cause Breakdown'}</h3>
                  <p className="text-xs text-slate-400 mb-4">{isBn ? 'ক্যাটাগরি অনুযায়ী সমস্যার বিন্যাস' : 'Category distribution this month'}</p>

                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={TICKET_CATEGORY_DATA}
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {TICKET_CATEGORY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  {TICKET_CATEGORY_DATA.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        <span>{c.name}</span>
                      </div>
                      <span className="font-mono font-bold text-white">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: AI DIAGNOSTICS & SWEEP */}
        {activeTab === 'ai_diagnostics' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-blue-500/40 shadow-2xl text-center max-w-3xl mx-auto">
              <div className="h-16 w-16 mx-auto rounded-3xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4 shadow-xl">
                <Sparkles className="h-8 w-8 animate-pulse" />
              </div>

              <h3 className="text-xl font-black text-white mb-2">
                {isBn ? 'মিঠাপুকুর AI অপটিক্যাল লাইন সুইপ ও অটো-হিলিং' : 'Mithapukur AI Optical Line Sweep & Auto-Healer'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                {isBn
                  ? 'এক ক্লিকে সমস্ত OLT পোর্টের লেজার ডেসিবল পাওয়ার, বিডিআইএক্স ল্যাটেন্সি ও লাইনম্যান স্কোয়াডের অবস্থান স্বয়ংক্রিয়ভাবে যাচাই করুন।'
                  : 'Instantly sweep all 6 Upazila Union loops to detect optical micro-bending, power drops, and auto-route backup fibers.'}
              </p>

              {isDiagnosing ? (
                <div className="space-y-3 max-w-md mx-auto">
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${diagnosticProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-blue-400 animate-pulse">
                    Scanning Core Laser Transceivers ({diagnosticProgress}%)...
                  </span>
                </div>
              ) : (
                <button
                  onClick={runAiDiagnostic}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
                >
                  {isBn ? '🚀 সম্পূর্ণ AI ডায়াগনস্টিক স্ক্যান শুরু করুন' : '🚀 Launch Complete AI Diagnostic Sweep'}
                </button>
              )}

              {diagnosticResult && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold block mb-1">Laser Accuracy</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">{diagnosticResult.oltDb}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold block mb-1">BDIX Core Jitter</span>
                    <span className="text-cyan-400 font-mono font-bold text-sm">{diagnosticResult.bdixJitter}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </main>

      {/* MODAL: ADD SUBSCRIBER */}
      <AnimatePresence>
        {isAddSubscriberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setIsAddSubscriberModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-lg font-black text-white mb-1">{isBn ? 'নতুন গ্রাহক নিবন্ধন' : 'Register New Subscriber'}</h3>
              <p className="text-xs text-slate-400 mb-4">{isBn ? 'মিঠাপুকুর ফাইবার নেটওয়ার্কে গ্রাহক যোগ করুন' : 'Add new fiber client to Delta database'}</p>

              <form onSubmit={handleCreateSubscriber} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    required
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    placeholder="e.g. Mahfuzur Rahman"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Mobile Phone (bKash/Nagad)</label>
                  <input
                    type="tel"
                    required
                    value={newSubPhone}
                    onChange={(e) => setNewSubPhone(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Union Hub</label>
                    <select
                      value={newSubUnion}
                      onChange={(e) => setNewSubUnion(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Mithapukur Sadar">Mithapukur Sadar</option>
                      <option value="Akmal Market Hub">Akmal Market Hub</option>
                      <option value="Payraband">Payraband</option>
                      <option value="Ranipukur">Ranipukur</option>
                      <option value="Balua Masimpur">Balua Masimpur</option>
                      <option value="Mirzapur">Mirzapur</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Monthly Fee (BDT)</label>
                    <input
                      type="number"
                      value={newSubFee}
                      onChange={(e) => setNewSubFee(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  {isBn ? 'গ্রাহক সংরক্ষণ করুন' : 'Save & Activate Subscriber'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CREATE TICKET */}
      <AnimatePresence>
        {isCreateTicketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setIsCreateTicketModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-lg font-black text-white mb-1">{isBn ? 'জরুরি সাপোর্ট টিকেট তৈরি' : 'Dispatch Field Support Ticket'}</h3>
              <p className="text-xs text-slate-400 mb-4">{isBn ? 'লাইনম্যান স্কোয়াডে তাৎক্ষণিক বার্তা পাঠান' : 'Create priority maintenance ticket'}</p>

              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Customer / Organization Name</label>
                  <input
                    type="text"
                    required
                    value={newTicketClient}
                    onChange={(e) => setNewTicketClient(e.target.value)}
                    placeholder="e.g. Mithapukur Sadar Diagnostic"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Union</label>
                    <select
                      value={newTicketUnion}
                      onChange={(e) => setNewTicketUnion(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Mithapukur Sadar">Mithapukur Sadar</option>
                      <option value="Akmal Market Hub">Akmal Market Hub</option>
                      <option value="Payraband">Payraband</option>
                      <option value="Ranipukur">Ranipukur</option>
                      <option value="Balua Masimpur">Balua Masimpur</option>
                      <option value="Mirzapur">Mirzapur</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Priority</label>
                    <select
                      value={newTicketPriority}
                      onChange={(e) => setNewTicketPriority(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="NORMAL">NORMAL</option>
                      <option value="HIGH">HIGH</option>
                      <option value="EMERGENCY">EMERGENCY (Tree Cut / Storm)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Issue Description</label>
                  <textarea
                    required
                    rows={3}
                    value={newTicketIssue}
                    onChange={(e) => setNewTicketIssue(e.target.value)}
                    placeholder="Describe problem (e.g. optical loss, dropped drop wire)..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-lg shadow-rose-600/30 cursor-pointer"
                >
                  {isBn ? 'টিকেট ইস্যু ও লাইনম্যান ডিসপ্যাচ করুন' : 'Dispatch Field Squad Now'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: BROADCAST SMS */}
      <AnimatePresence>
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-lg font-black text-white mb-1">{isBn ? 'গ্রাহকদের এসএমএস নোটিশ পাঠান' : 'Broadcast Notice to Clients'}</h3>
              <p className="text-xs text-slate-400 mb-4">{isBn ? 'মিঠাপুকুরের সকল গ্রাহকের মোবাইলে ইনস্ট্যান্ট নোটিফিকেশন' : 'Instant SMS gateway dispatch'}</p>

              <textarea
                rows={4}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Write announcement (e.g. Scheduled REB maintenance on Saturday, 12 AM - 2 AM)..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 mb-4"
              />

              <button
                onClick={() => {
                  setIsBroadcastModalOpen(false);
                  setBroadcastMessage('');
                  showToast(isBn ? '১,৪২৮ জন গ্রাহককে এসএমএস পাঠানো হয়েছে!' : 'SMS Broadcast Dispatched to 1,428 Subscribers!');
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                {isBn ? 'এসএমএস পাঠান (Broadcast Now)' : 'Broadcast SMS Now'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
