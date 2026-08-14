import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  UserPlus,
  Users,
  Search,
  Filter,
  Download,
  Upload,
  FileSpreadsheet,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  DollarSign,
  Activity,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Edit2,
  Trash2,
  Plus,
  Send,
  Sparkles,
  MessageSquare,
  HelpCircle,
  FileText,
  Navigation,
  ShieldCheck,
  Lock,
  Key,
  LogOut,
  UserCheck,
  Eye,
  EyeOff,
  ShieldAlert,
  CreditCard,
  Receipt,
  Printer,
  QrCode,
  Smartphone,
  CheckCircle2,
  Wallet,
  Building2,
  RefreshCw,
  Gift,
  BadgeCheck,
  Fingerprint,
  Cpu,
  Scan,
  Laptop,
  Check,
  Zap,
  RotateCcw,
  HardDrive,
  Wifi,
  Camera,
  UploadCloud,
  Image as ImageIcon,
  Maximize2,
  FileCheck,
  Copy
} from 'lucide-react';

import { useBiometricAuth } from '../hooks/useBiometricAuth';
import { Logo } from './Logo';
import branchManagerPhoto from '../assets/images/branch_manager_photo_1785230421070.jpg';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

import { ClientRecord, ClientStatus, PaymentMethod, ClientGender, MarketingCampaign } from '../types/client';
import {
  getStoredClients,
  saveStoredClients,
  getStoredCampaigns,
  saveStoredCampaigns,
  exportClientsToExcel,
  downloadSampleExcelTemplate,
  parseCSVToClients
} from '../lib/clientStorage';
import { useLanguage } from '../context/LanguageContext';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'database' | 'analytics' | 'marketing' | 'simulator';
}

const PLAN_OPTIONS = [
  { name: '20 Mbps Economy', speed: 20, fee: 525 },
  { name: '30 Mbps Starter', speed: 30, fee: 630 },
  { name: '40 Mbps High-Speed', speed: 40, fee: 735 },
  { name: '50 Mbps Smart Stream', speed: 50, fee: 840 },
  { name: '60 Mbps Fiber Family', speed: 60, fee: 1050 },
  { name: '80 Mbps Gamers Choice', speed: 80, fee: 1260 },
  { name: '100 Mbps Business Dedicated', speed: 100, fee: 2499 }
];

const MITHAPUKUR_AREAS = [
  'Boldipukur Bazaar (Akmal Market)',
  'Mithapukur Sadar Town',
  'Pairaband Area',
  'Ranipukur Union',
  'Gopalpur Sector',
  'Durga Pur Area',
  'Mirzapur Sector'
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'database'
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'database' | 'analytics' | 'marketing' | 'simulator' | 'usage'>(defaultTab);
  const [usageTimeframe, setUsageTimeframe] = useState<'daily' | 'monthly'>('daily');

  // Admin & Client Portal Login System state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('delta_admin_auth') === 'true';
  });
  const [isClientAuthenticated, setIsClientAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('delta_client_auth') === 'true';
  });
  const [loginMode, setLoginMode] = useState<'admin' | 'client'>('admin');
  const [adminUsernameInput, setAdminUsernameInput] = useState('admin');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [clientDidInput, setClientDidInput] = useState('DLT-1001');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [loggedInClientData, setLoggedInClientData] = useState<ClientRecord | null>(() => {
    const saved = sessionStorage.getItem('delta_client_data');
    return saved ? JSON.parse(saved) : null;
  });

  // Biometric / Fingerprint Registration & WebAuthn Authentication
  const biometric = useBiometricAuth();
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricModalMode, setBiometricModalMode] = useState<'login' | 'register'>('login');

  const handleStartBiometricRegistration = async () => {
    setBiometricModalMode('register');
    setShowBiometricModal(true);
    const success = await biometric.registerBiometric('Mahamudul Hasan (Branch Manager)');
    if (success) {
      showToast('🖐️ WebAuthn Fingerprint Biometrics Registered Successfully!');
      setTimeout(() => {
        setShowBiometricModal(false);
      }, 1000);
    }
  };

  const handleStartBiometricLogin = async () => {
    if (!biometric.isEnrolled) {
      setBiometricModalMode('register');
      setShowBiometricModal(true);
      const success = await biometric.registerBiometric('Mahamudul Hasan (Branch Manager)');
      if (success) {
        showToast('🖐️ Biometrics Enrolled! Now Logging In...');
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('delta_admin_auth', 'true');
        setTimeout(() => {
          setShowBiometricModal(false);
        }, 1000);
      }
      return;
    }

    setBiometricModalMode('login');
    setShowBiometricModal(true);
    const success = await biometric.authenticateBiometric();
    if (success) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('delta_admin_auth', 'true');
      showToast('🖐️ Biometric Verified! Branch Manager Access Granted.');
      setTimeout(() => {
        setShowBiometricModal(false);
      }, 1000);
    }
  };

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const u = adminUsernameInput.trim().toLowerCase();
    const p = adminPasswordInput.trim();

    // Accept valid admin credentials (e.g., admin / admin, admin / delta2026, admin / admin123)
    if (
      (u === 'admin' || u === 'delta' || u === 'admin_delta') &&
      (p === 'admin' || p === 'delta2026' || p === 'admin123' || p === '123456')
    ) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('delta_admin_auth', 'true');
      setAdminLoginError('');
      showToast('🔐 Admin authentication successful! Full portal access granted.');
    } else {
      setAdminLoginError('Invalid Admin Username or Password. (Demo Admin Access: admin / admin)');
    }
  };

  const handleClientLogin = (e?: React.FormEvent, directCid?: string) => {
    if (e) e.preventDefault();
    const raw = (directCid || clientDidInput).trim();
    if (!raw) {
      setAdminLoginError('Please enter your Subscriber CID Number or Mobile Phone Number.');
      return;
    }

    const query = raw.toUpperCase();
    const matched = clients.find(
      c =>
        c.id.toUpperCase() === query ||
        c.id.toUpperCase().includes(query) ||
        c.phone.includes(raw) ||
        (c.username && c.username.toUpperCase() === query)
    ) || clients[0];

    if (matched) {
      setIsClientAuthenticated(true);
      setLoggedInClientData(matched);
      setSelectedBillingClientId(matched.id);
      sessionStorage.setItem('delta_client_auth', 'true');
      sessionStorage.setItem('delta_client_data', JSON.stringify(matched));
      setAdminLoginError('');
      setActiveTab('simulator');
      showToast(`👋 Welcome ${matched.fullName}! Signed in via CID Number (${matched.id}).`);
    } else {
      setAdminLoginError('Subscriber CID Number not found. Try CID Number: DLT-1001 or 01785-230421');
    }
  };

  const handleLogoutAll = () => {
    setIsAdminAuthenticated(false);
    setIsClientAuthenticated(false);
    setLoggedInClientData(null);
    sessionStorage.removeItem('delta_admin_auth');
    sessionStorage.removeItem('delta_client_auth');
    sessionStorage.removeItem('delta_client_data');
    showToast('🔒 Portal session locked.');
  };

  const handleQuickDemoAdmin = () => {
    setAdminUsernameInput('admin');
    setAdminPasswordInput('admin');
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('delta_admin_auth', 'true');
    setAdminLoginError('');
    showToast('⚡ Signed in as Administrator!');
  };

  // Client DB state
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [planFilter, setPlanFilter] = useState<string>('All');

  // Marketing campaigns state
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);

  // Add / Edit Client Modal/Form state
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<{
    fullName: string;
    username: string;
    password: string;
    phone: string;
    gender: ClientGender;
    area: string;
    popName: string;
    zoneName: string;
    planName: string;
    monthlyFee: number;
    status: ClientStatus;
    paymentMethod: PaymentMethod;
    ipAddress: string;
    onuMac: string;
    routerMac: string;
    nidNumber: string;
    nidPhotoUrl: string;
    latitude: string;
    longitude: string;
    notes: string;
  }>({
    fullName: '',
    username: '',
    password: '',
    phone: '',
    gender: 'Male',
    area: MITHAPUKUR_AREAS[0],
    popName: 'Akmal Market PoP-01',
    zoneName: 'Zone A - Boldipukur',
    planName: PLAN_OPTIONS[1].name,
    monthlyFee: PLAN_OPTIONS[1].fee,
    status: 'Active',
    paymentMethod: 'bKash',
    ipAddress: '',
    onuMac: '',
    routerMac: '',
    nidNumber: '',
    nidPhotoUrl: '',
    latitude: '',
    longitude: '',
    notes: ''
  });

  // NID Image Preview Modal state
  const [previewNidModal, setPreviewNidModal] = useState<{
    name: string;
    id: string;
    url: string;
    nidNumber?: string;
  } | null>(null);

  // NID File Input ref for form
  const nidFileInputRef = useRef<HTMLInputElement | null>(null);

  // MAC formatting helper function
  const formatMacAddress = (input: string) => {
    const clean = input.toUpperCase().replace(/[^0-9A-F]/g, '');
    const chunks = clean.match(/.{1,2}/g) || [];
    return chunks.slice(0, 6).join(':');
  };

  // NID file upload reader helper
  const handleNidFileUpload = (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('⚠️ NID document size should be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setFormData(prev => ({ ...prev, nidPhotoUrl: e.target?.result as string }));
        showToast('📄 Client NID document uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Notification / Feedback alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // File Upload Ref for Excel/CSV Import
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Bill Payment Simulator State
  const [selectedBillingClientId, setSelectedBillingClientId] = useState<string>('');
  const [billingMonth, setBillingMonth] = useState<string>('July 2026');
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Upay' | 'Bank' | 'Cash'>('bKash');
  const [paymentPhoneInput, setPaymentPhoneInput] = useState<string>('');
  const [paymentPinInput, setPaymentPinInput] = useState<string>('12345');
  const [trxIdInput, setTrxIdInput] = useState<string>('');
  const [promoCouponInput, setPromoCouponInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountBdt: number } | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentProcessingLogs, setPaymentProcessingLogs] = useState<string[]>([]);
  const [paidInvoicesMap, setPaidInvoicesMap] = useState<
    Record<
      string,
      {
        invoiceNo: string;
        paidAmount: number;
        paymentMethod: string;
        transactionId: string;
        paidAt: string;
        billingMonth: string;
        accountPhone: string;
      }
    >
  >({});
  const [selectedInvoiceReceipt, setSelectedInvoiceReceipt] = useState<any | null>(null);

  // Load clients & campaigns on mount or when modal opens
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredClients();
      setClients(stored);
      setCampaigns(getStoredCampaigns());
      if (stored.length > 0 && !selectedBillingClientId) {
        setSelectedBillingClientId(stored[0].id);
        setPaymentPhoneInput(stored[0].phone);
      }
    }
  }, [isOpen]);

  // Sync selected client phone when billing client changes
  useEffect(() => {
    if (selectedBillingClientId && clients.length > 0) {
      const found = clients.find(c => c.id === selectedBillingClientId);
      if (found) {
        setPaymentPhoneInput(found.phone);
      }
    }
  }, [selectedBillingClientId, clients]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync clients to localStorage
  const updateClientsState = (newClients: ClientRecord[]) => {
    setClients(newClients);
    saveStoredClients(newClients);
  };

  // Selected Billing Client calculation
  const currentBillingClient = useMemo(() => {
    return clients.find(c => c.id === selectedBillingClientId) || clients[0] || null;
  }, [clients, selectedBillingClientId]);

  const currentInvoiceDetails = useMemo(() => {
    if (!currentBillingClient) return null;
    const baseFee = currentBillingClient.monthlyFee || 0;
    const vatAmount = Math.round(baseFee * 0.05); // 5% VAT
    const lateFee = currentBillingClient.status === 'Suspended' ? 50 : 0;
    const subtotal = baseFee + vatAmount + lateFee;
    const discount = appliedCoupon ? appliedCoupon.discountBdt : 0;
    const netPayable = Math.max(0, subtotal - discount);

    const invoiceKey = `${currentBillingClient.id}_${billingMonth.replace(/\s+/g, '_')}`;
    const paidRecord = paidInvoicesMap[invoiceKey] || null;
    const isPaid = !!paidRecord;

    return {
      baseFee,
      vatAmount,
      lateFee,
      subtotal,
      discount,
      netPayable,
      invoiceKey,
      paidRecord,
      isPaid,
      invoiceNo: paidRecord?.invoiceNo || `INV-${billingMonth.slice(-4)}-${currentBillingClient.id.replace('DLT-', '')}`
    };
  }, [currentBillingClient, billingMonth, appliedCoupon, paidInvoicesMap]);

  // Bandwidth Usage Data calculation for logged-in / selected CID account
  const clientBandwidthData = useMemo(() => {
    if (!currentBillingClient) return { daily: [], monthly: [], totalThisMonth: 0, peakDaily: 0, avgDaily: 0 };

    const fee = currentBillingClient.monthlyFee || 800;
    const speedMultiplier = fee >= 1200 ? 1.7 : fee >= 800 ? 1.2 : 0.85;

    const daily = [
      { timeLabel: 'Jul 25', downloadGB: Math.round(14.2 * speedMultiplier * 10) / 10, uploadGB: Math.round(2.1 * speedMultiplier * 10) / 10 },
      { timeLabel: 'Jul 26', downloadGB: Math.round(18.5 * speedMultiplier * 10) / 10, uploadGB: Math.round(3.4 * speedMultiplier * 10) / 10 },
      { timeLabel: 'Jul 27', downloadGB: Math.round(12.8 * speedMultiplier * 10) / 10, uploadGB: Math.round(1.9 * speedMultiplier * 10) / 10 },
      { timeLabel: 'Jul 28', downloadGB: Math.round(21.4 * speedMultiplier * 10) / 10, uploadGB: Math.round(4.1 * speedMultiplier * 10) / 10 },
      { timeLabel: 'Jul 29', downloadGB: Math.round(25.6 * speedMultiplier * 10) / 10, uploadGB: Math.round(4.8 * speedMultiplier * 10) / 10 },
      { timeLabel: 'Jul 30', downloadGB: Math.round(16.9 * speedMultiplier * 10) / 10, uploadGB: Math.round(2.7 * speedMultiplier * 10) / 10 },
      { timeLabel: 'Jul 31 (Today)', downloadGB: Math.round(19.3 * speedMultiplier * 10) / 10, uploadGB: Math.round(3.2 * speedMultiplier * 10) / 10 },
    ].map(d => ({ ...d, totalGB: Math.round((d.downloadGB + d.uploadGB) * 10) / 10 }));

    const monthly = [
      { timeLabel: 'Feb 2026', downloadGB: Math.round(280 * speedMultiplier), uploadGB: Math.round(45 * speedMultiplier) },
      { timeLabel: 'Mar 2026', downloadGB: Math.round(320 * speedMultiplier), uploadGB: Math.round(52 * speedMultiplier) },
      { timeLabel: 'Apr 2026', downloadGB: Math.round(390 * speedMultiplier), uploadGB: Math.round(61 * speedMultiplier) },
      { timeLabel: 'May 2026', downloadGB: Math.round(360 * speedMultiplier), uploadGB: Math.round(58 * speedMultiplier) },
      { timeLabel: 'Jun 2026', downloadGB: Math.round(420 * speedMultiplier), uploadGB: Math.round(70 * speedMultiplier) },
      { timeLabel: 'Jul 2026', downloadGB: Math.round(465 * speedMultiplier), uploadGB: Math.round(78 * speedMultiplier) },
    ].map(m => ({ ...m, totalGB: m.downloadGB + m.uploadGB }));

    const totalThisMonth = monthly[monthly.length - 1].totalGB;
    const peakDaily = Math.max(...daily.map(d => d.totalGB));
    const avgDaily = Math.round((daily.reduce((acc, curr) => acc + curr.totalGB, 0) / daily.length) * 10) / 10;

    return { daily, monthly, totalThisMonth, peakDaily, avgDaily };
  }, [currentBillingClient]);

  // Data Usage Monitoring Visualization Component
  const renderDataUsageMonitor = () => {
    if (!currentBillingClient) return null;

    const currentChartData = usageTimeframe === 'daily' ? clientBandwidthData.daily : clientBandwidthData.monthly;

    return (
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">
                  Subscriber Data Usage & Bandwidth Monitor
                </h3>
                <span className="px-2 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono font-bold rounded-full">
                  CID: {currentBillingClient.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time daily and monthly consumption metrics for <strong className="text-slate-200">{currentBillingClient.fullName}</strong> ({currentBillingClient.planName})
              </p>
            </div>
          </div>

          {/* Timeframe Switcher & Subscriber Quick Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setUsageTimeframe('daily')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  usageTimeframe === 'daily'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Daily Usage (GB)
              </button>
              <button
                type="button"
                onClick={() => setUsageTimeframe('monthly')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  usageTimeframe === 'monthly'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly Trend (GB)
              </button>
            </div>

            <div className="min-w-[200px]">
              <select
                value={selectedBillingClientId}
                onChange={e => setSelectedBillingClientId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>
                    CID: {c.id} — {c.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
              <span>Total Month Usage</span>
              <Download className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-xl font-black text-cyan-300 font-mono">
              {clientBandwidthData.totalThisMonth} GB
            </p>
            <p className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Unlimited High Speed FUP
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
              <span>Peak Daily Usage</span>
              <Activity className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-xl font-black text-amber-300 font-mono">
              {clientBandwidthData.peakDaily} GB
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Peak Hour: 09:00 PM - 11:30 PM
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
              <span>Daily Average</span>
              <Clock className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-xl font-black text-purple-300 font-mono">
              {clientBandwidthData.avgDaily} GB/day
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              85% Download / 15% Upload
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
              <span>Optical Feed Health</span>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-xl font-black text-emerald-400 font-mono">
              100 Mbps
            </p>
            <p className="text-[10px] text-emerald-400 font-bold mt-1">
              99.98% Fiber Port Uptime
            </p>
          </div>
        </div>

        {/* Recharts Bar Chart Container */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 sm:p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              <span>
                {usageTimeframe === 'daily'
                  ? 'Daily Download vs Upload Volume (Past 7 Days)'
                  : 'Monthly Bandwidth Consumption Trend (Past 6 Months)'}
              </span>
            </h4>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="h-3 w-3 rounded-sm bg-cyan-500 inline-block"></span> Download (GB)
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="h-3 w-3 rounded-sm bg-purple-500 inline-block"></span> Upload (GB)
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timeLabel" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} unit=" GB" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                  formatter={(val: any, name: any) => [`${val} GB`, name === 'downloadGB' ? 'Download' : 'Upload']}
                  labelStyle={{ fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '11px' }} />
                <Bar dataKey="downloadGB" name="Download (GB)" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={22} />
                <Bar dataKey="uploadGB" name="Upload (GB)" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
            <span className="flex items-center gap-1 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Auto-synchronized with Mikrotik RADIUS Core Session Logs
            </span>
            <span className="text-slate-500 font-mono">
              Subscriber CID: {currentBillingClient.id} | POP: Mithapukur Central Hub
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleApplyCoupon = () => {
    const code = promoCouponInput.trim().toUpperCase();
    if (code === 'DELTA2026' || code === 'MITHAPUKUR100' || code === 'FREE100') {
      setAppliedCoupon({ code, discountBdt: 100 });
      showToast(`🎉 Promo coupon ${code} applied! ৳100 discount deducted.`);
    } else if (code === 'DELTA50' || code === 'SUPER50') {
      setAppliedCoupon({ code, discountBdt: 50 });
      showToast(`🎉 Promo coupon ${code} applied! ৳50 discount deducted.`);
    } else {
      showToast('⚠️ Invalid promo code. Use "DELTA2026" or "MITHAPUKUR100"');
    }
  };

  const handleSimulatePayment = () => {
    if (!currentBillingClient || !currentInvoiceDetails) return;
    if (!paymentPhoneInput.trim()) {
      showToast('⚠️ Please enter account / mobile phone number.');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentProcessingLogs([`1/4 Connecting to ${selectedPaymentGateway} Payment Gateway API...`]);

    setTimeout(() => {
      setPaymentProcessingLogs(prev => [
        ...prev,
        `2/4 Verifying subscriber ${currentBillingClient.fullName} (${currentBillingClient.id})...`
      ]);
    }, 600);

    setTimeout(() => {
      setPaymentProcessingLogs(prev => [
        ...prev,
        `3/4 Authenticating mobile account ${paymentPhoneInput} on ${selectedPaymentGateway} network...`
      ]);
    }, 1200);

    setTimeout(() => {
      setPaymentProcessingLogs(prev => [
        ...prev,
        `4/4 Authorizing transfer of ৳${currentInvoiceDetails.netPayable} BDT to Delta Broadband Akmal Market account...`
      ]);
    }, 1800);

    setTimeout(() => {
      const generatedTrxId =
        trxIdInput.trim() ||
        `TRX-${selectedPaymentGateway.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const paidAt = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const record = {
        invoiceNo: currentInvoiceDetails.invoiceNo,
        paidAmount: currentInvoiceDetails.netPayable,
        paymentMethod: selectedPaymentGateway,
        transactionId: generatedTrxId,
        paidAt,
        billingMonth,
        accountPhone: paymentPhoneInput
      };

      setPaidInvoicesMap(prev => ({
        ...prev,
        [currentInvoiceDetails.invoiceKey]: record
      }));

      // Automatically re-activate client if status was Suspended or Pending
      if (currentBillingClient.status === 'Suspended' || currentBillingClient.status === 'Pending') {
        const updatedClients = clients.map(c =>
          c.id === currentBillingClient.id ? { ...c, status: 'Active' as ClientStatus } : c
        );
        updateClientsState(updatedClients);
      }

      setIsProcessingPayment(false);
      setSelectedInvoiceReceipt({ ...record, client: currentBillingClient, details: currentInvoiceDetails });
      showToast(
        `✅ Bill payment of ৳${currentInvoiceDetails.netPayable} successful via ${selectedPaymentGateway}! Bill cleared.`
      );
    }, 2500);
  };

  // Filtered clients list
  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        c.fullName.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.username && c.username.toLowerCase().includes(q)) ||
        (c.popName && c.popName.toLowerCase().includes(q)) ||
        (c.zoneName && c.zoneName.toLowerCase().includes(q)) ||
        c.area.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchesPlan = planFilter === 'All' || c.planName.includes(planFilter);

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [clients, searchQuery, statusFilter, planFilter]);

  // Overall Statistics
  const stats = useMemo(() => {
    const total = clients.length;
    const active = clients.filter(c => c.status === 'Active').length;
    const pending = clients.filter(c => c.status === 'Pending').length;
    const suspended = clients.filter(c => c.status === 'Suspended').length;

    const totalRevenueBdt = clients
      .filter(c => c.status === 'Active')
      .reduce((sum, c) => sum + (c.monthlyFee || 0), 0);

    const arpu = active > 0 ? Math.round(totalRevenueBdt / active) : 0;

    return { total, active, pending, suspended, totalRevenueBdt, arpu };
  }, [clients]);

  // Analytics Chart Data Preparation
  const chartData = useMemo(() => {
    // 1. Distribution by Plan
    const planCounts: Record<string, number> = {};
    clients.forEach(c => {
      const p = c.planName;
      planCounts[p] = (planCounts[p] || 0) + 1;
    });
    const pieData = Object.keys(planCounts).map(planKey => ({
      name: planKey,
      value: planCounts[planKey]
    }));

    // 2. Bandwidth vs Price vs Revenue
    const barData = PLAN_OPTIONS.map(plan => {
      const planClients = clients.filter(c => c.planName === plan.name && c.status === 'Active');
      return {
        name: plan.name.split(' ')[0] + ' ' + plan.name.split(' ')[1], // e.g., '30 Mbps'
        speedMbps: plan.speed,
        monthlyFee: plan.fee,
        subscribers: planClients.length,
        totalRevenue: planClients.length * plan.fee
      };
    });

    // 3. Area Distribution
    const areaCounts: Record<string, number> = {};
    clients.forEach(c => {
      const a = c.area.split('(')[0].trim();
      areaCounts[a] = (areaCounts[a] || 0) + 1;
    });
    const areaBarData = Object.keys(areaCounts).map(area => ({
      area,
      clients: areaCounts[area]
    }));

    return { pieData, barData, areaBarData };
  }, [clients]);

  // Handle Form Submit (Add or Edit)
  const handleSubmitClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('⚠️ Please provide client full name and phone number.');
      return;
    }

    if (editingClient) {
      // Edit existing
      const updated = clients.map(c =>
        c.id === editingClient.id
          ? {
              ...c,
              fullName: formData.fullName,
              username: formData.username,
              password: formData.password,
              phone: formData.phone,
              gender: formData.gender,
              area: formData.area,
              popName: formData.popName,
              zoneName: formData.zoneName,
              planName: formData.planName,
              monthlyFee: Number(formData.monthlyFee),
              status: formData.status,
              paymentMethod: formData.paymentMethod,
              ipAddress: formData.ipAddress,
              onuMac: formData.onuMac,
              routerMac: formData.routerMac,
              nidNumber: formData.nidNumber,
              nidPhotoUrl: formData.nidPhotoUrl,
              latitude: formData.latitude,
              longitude: formData.longitude,
              notes: formData.notes
            }
          : c
      );
      updateClientsState(updated);
      showToast(`✅ Client ${editingClient.id} updated successfully!`);
    } else {
      // Add new
      const newId = `DLT-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newClient: ClientRecord = {
        id: newId,
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
        area: formData.area,
        popName: formData.popName,
        zoneName: formData.zoneName,
        planName: formData.planName,
        monthlyFee: Number(formData.monthlyFee),
        status: formData.status,
        joinDate: new Date().toISOString().slice(0, 10),
        paymentMethod: formData.paymentMethod,
        ipAddress: formData.ipAddress,
        onuMac: formData.onuMac,
        routerMac: formData.routerMac,
        nidNumber: formData.nidNumber,
        nidPhotoUrl: formData.nidPhotoUrl,
        latitude: formData.latitude,
        longitude: formData.longitude,
        notes: formData.notes
      };
      updateClientsState([newClient, ...clients]);
      showToast(`🎉 New client ${newId} added to database!`);
    }

    // Reset Form & Close Drawer
    setIsAddClientOpen(false);
    setEditingClient(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      username: '',
      password: '',
      phone: '',
      gender: 'Male',
      area: MITHAPUKUR_AREAS[0],
      popName: 'Akmal Market PoP-01',
      zoneName: 'Zone A - Boldipukur',
      planName: PLAN_OPTIONS[1].name,
      monthlyFee: PLAN_OPTIONS[1].fee,
      status: 'Active',
      paymentMethod: 'bKash',
      ipAddress: '',
      onuMac: '',
      routerMac: '',
      nidNumber: '',
      nidPhotoUrl: '',
      latitude: '',
      longitude: '',
      notes: ''
    });
  };

  const handleOpenEdit = (client: ClientRecord) => {
    setEditingClient(client);
    setFormData({
      fullName: client.fullName,
      username: client.username || '',
      password: client.password || '',
      phone: client.phone,
      gender: client.gender || 'Male',
      area: client.area,
      popName: client.popName || 'Akmal Market PoP-01',
      zoneName: client.zoneName || 'Zone A - Boldipukur',
      planName: client.planName,
      monthlyFee: client.monthlyFee,
      status: client.status,
      paymentMethod: client.paymentMethod,
      ipAddress: client.ipAddress || '',
      onuMac: client.onuMac || '',
      routerMac: client.routerMac || '',
      nidNumber: client.nidNumber || '',
      nidPhotoUrl: client.nidPhotoUrl || '',
      latitude: client.latitude || '',
      longitude: client.longitude || '',
      notes: client.notes || ''
    });
    setIsAddClientOpen(true);
  };

  const handleDeleteClient = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete client "${name}" (${id})?`)) {
      const updated = clients.filter(c => c.id !== id);
      updateClientsState(updated);
      showToast(`🗑️ Client ${id} removed.`);
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = clients.map(c => {
      if (c.id === id) {
        const nextStatus: ClientStatus =
          c.status === 'Active' ? 'Suspended' : c.status === 'Suspended' ? 'Active' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    });
    updateClientsState(updated);
    showToast(`🔄 Client status updated.`);
  };

  // Excel File Upload / Import Handler
  const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const content = evt.target?.result as string;
        const imported = parseCSVToClients(content);
        if (imported.length === 0) {
          showToast('❌ Could not parse valid client data from CSV/Excel file.');
          return;
        }

        // Merge or replace
        const merged = [...imported, ...clients];
        // Deduplicate by ID or Phone
        const uniqueMap = new Map<string, ClientRecord>();
        merged.forEach(item => uniqueMap.set(item.id, item));
        const finalClients = Array.from(uniqueMap.values());

        updateClientsState(finalClients);
        showToast(`📊 Successfully imported ${imported.length} client records from Excel file!`);
      } catch (err) {
        console.error(err);
        showToast('❌ Error parsing Excel/CSV file.');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-0 overflow-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[60] bg-slate-900 border border-blue-500/50 text-slate-100 font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative w-full h-full max-w-full bg-slate-900 border-0 text-slate-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 p-4 sm:px-8 bg-slate-950/90 gap-3">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="text-lg sm:text-xl font-black tracking-tight"
                  style={{ color: '#31e507', fontSize: '19px', fontFamily: 'monospace' }}
                >
                  Delta Client Portal & Excel Database
                </h2>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Mithapukur Branch
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Integrated subscriber management, Excel export/import, plan analytics & marketing tracker
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Branch Manager Admin
                </span>
                <button
                  onClick={handleLogoutAll}
                  className="flex items-center gap-1 px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  title="Lock Session / Logout"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Lock Session</span>
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer border border-slate-700"
              title="Close Portal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Authentication Gate OR Modal Body */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 w-full flex flex-col items-center justify-center overflow-y-auto py-6 px-4 sm:py-12 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
            {/* Ambient Background Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-lg bg-slate-900/95 border-2 border-slate-700/70 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-2xl relative overflow-hidden z-10 my-auto">
              
              {/* Top Accent Light Beam */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-indigo-500" />
              <div className="absolute top-2 right-2 opacity-5 sm:opacity-10 pointer-events-none">
                <ShieldCheck className="h-32 w-32 sm:h-44 sm:w-44 text-emerald-400" />
              </div>

              {/* Branch Manager / Admin Login Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-3 group">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-2 border-emerald-400 shadow-xl shadow-emerald-500/25 ring-4 ring-emerald-500/20">
                    <img
                      src={branchManagerPhoto}
                      alt="Branch Manager - Mahamudul Hasan"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-1.5 rounded-full border-2 border-slate-900 shadow-lg">
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Authorized Branch Manager Access</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {language === 'bn' ? 'ব্রাঞ্চ ম্যানেজার লগইন পোর্টাল' : 'Branch Manager Portal'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm leading-relaxed">
                  {language === 'bn' 
                    ? 'ডেল্টা ফাইবার মিঠাপুকুর কেন্দ্রীয় এনওসি ও ক্লায়েন্ট ডাটাবেস পোর্টাল'
                    : 'Delta Broadband Mithapukur Central NOC & Subscriber Operations Database'}
                </p>
              </div>

              {/* Login Error Alert */}
              {adminLoginError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-center gap-2 shadow-md">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 animate-bounce" />
                  <span>{adminLoginError}</span>
                </div>
              )}

              {/* Branch Manager Login Form */}
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-blue-400" />
                      {language === 'bn' ? 'ইউজারনেম' : 'Admin Username'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">ID: admin</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={adminUsernameInput}
                      onChange={e => setAdminUsernameInput(e.target.value)}
                      placeholder={language === 'bn' ? 'ইউজারনেম টাইপ করুন' : 'Enter admin username'}
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-4 py-3 rounded-xl text-slate-100 text-sm font-mono placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Key className="h-3.5 w-3.5 text-emerald-400" />
                      {language === 'bn' ? 'পাসওয়ার্ড' : 'Admin Password'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">PASS: admin</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showAdminPassword ? 'text' : 'password'}
                      value={adminPasswordInput}
                      onChange={e => setAdminPasswordInput(e.target.value)}
                      placeholder={language === 'bn' ? 'পাসওয়ার্ড টাইপ করুন' : 'Enter admin password'}
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-4 py-3 pr-11 rounded-xl text-slate-100 text-sm font-mono placeholder-slate-600 focus:outline-none transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer transition-colors p-1"
                    >
                      {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:via-teal-500 hover:to-blue-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-900/40 border border-emerald-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                  >
                    <ShieldCheck className="h-4 w-4 text-emerald-200" />
                    <span>{language === 'bn' ? 'লগইন করুন (ম্যানেজার এক্সেস)' : 'Login as Branch Manager'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickDemoAdmin}
                    className="w-full py-2.5 bg-slate-950/80 hover:bg-slate-800 text-emerald-400 font-bold text-xs rounded-xl border border-slate-700/80 flex items-center justify-center gap-2 cursor-pointer transition-all hover:border-emerald-500/50 shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                    <span>{language === 'bn' ? 'এক-ক্লিকে টেস্ট এক্সেস (admin / admin)' : 'One-Click Demo Manager (admin / admin)'}</span>
                  </button>
                </div>

                {/* Modern WebAuthn Biometric & Fingerprint Section */}
                <div className="pt-3.5 border-t border-slate-800/80">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Fingerprint className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                      {language === 'bn' ? 'বায়োমেট্রিক ফিঙ্গারপ্রিন্ট' : 'Biometric Access'}
                    </span>
                    <span className="text-[9px] bg-slate-800 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-slate-700">
                      Windows Hello™ / FIDO2
                    </span>
                  </div>

                  {biometric.isEnrolled ? (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleStartBiometricLogin}
                        className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-950/40 border border-emerald-400/40 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                      >
                        <Fingerprint className="h-4 w-4 text-white animate-pulse" />
                        <span>{language === 'bn' ? 'ফিঙ্গারপ্রিন্ট দিয়ে দ্রুত লগইন' : '⚡ Quick Login with Fingerprint'}</span>
                      </button>

                      <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-400 truncate">
                          <Check className="h-3 w-3 shrink-0" />
                          <span className="truncate">{biometric.credential?.deviceName || 'Enrolled Biometric Device'}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            biometric.removeBiometric();
                            showToast('🗑️ Biometric credential removed.');
                          }}
                          className="text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer ml-2 shrink-0"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStartBiometricRegistration}
                      className="w-full py-2.5 bg-slate-950 hover:bg-slate-800/90 text-slate-200 hover:text-white font-extrabold text-xs rounded-xl border border-emerald-500/40 hover:border-emerald-400 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm group"
                    >
                      <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                        <Fingerprint className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-emerald-300 font-bold text-xs">
                        {language === 'bn' ? 'ফিঙ্গারপ্রিন্ট রেজিস্টার করুন (Register Fingerprint)' : 'Register for Fingerprint Access'}
                      </span>
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-6 pt-3.5 border-t border-slate-800/80 text-center">
                <span className="text-[11px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>256-Bit SSL Encrypted • Delta Mithapukur Branch Core</span>
                </span>
              </div>
            </div>

            {/* WebAuthn / Biometric Scanning Interactive Modal Overlay */}
            {showBiometricModal && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
                <div className="w-full max-w-sm bg-slate-900 border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center max-h-[90vh] overflow-y-auto">
                  {/* Top Ambient Glow */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 animate-pulse" />
                  
                  {/* Biometric Sensor Visual */}
                  <div className="relative my-3 sm:my-4 flex items-center justify-center">
                    {/* Concentric Pulse Rings */}
                    <div className="absolute h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-emerald-500/10 animate-ping" />
                    <div className="absolute h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-emerald-500/30 animate-pulse" />
                    
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border-2 border-emerald-400 shadow-xl shadow-emerald-500/20 flex items-center justify-center overflow-hidden">
                      <Fingerprint className={`h-10 w-10 sm:h-12 sm:w-12 ${biometric.state === 'scanning' || biometric.state === 'verifying' ? 'text-emerald-300 animate-bounce' : biometric.state === 'success' ? 'text-emerald-400' : 'text-emerald-400 animate-pulse'}`} />
                      
                      {/* Scanning Laser Line */}
                      {(biometric.state === 'scanning' || biometric.state === 'verifying') && (
                        <div className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_8px_#10b981] animate-[scan_1.5s_ease-in-out_infinite]" />
                      )}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-1.5">
                    <Laptop className="h-3 w-3 text-emerald-400" />
                    <span>Windows Hello / Touch ID WebAuthn</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-white">
                    {biometric.state === 'prompting' && (biometricModalMode === 'register' ? 'Registering Fingerprint...' : 'Detecting Biometric Sensor...')}
                    {biometric.state === 'scanning' && 'Touch Fingerprint Sensor'}
                    {biometric.state === 'verifying' && 'Verifying FIDO2 Credential...'}
                    {biometric.state === 'success' && 'Biometrics Verified!'}
                    {biometric.state === 'error' && 'Authentication Failed'}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                    {biometric.state === 'prompting' && 'Initializing hardware security module & cryptographic challenge.'}
                    {biometric.state === 'scanning' && 'Please place your registered finger on your device sensor or security key.'}
                    {biometric.state === 'verifying' && 'Matching ridge patterns against device secure enclave...'}
                    {biometric.state === 'success' && 'Cryptographic handshake complete. Access granted to Branch Manager NOC.'}
                    {biometric.state === 'error' && (biometric.error || 'Biometric authentication failed. Please try again or use password.')}
                  </p>

                  <div className="mt-4 sm:mt-6 w-full pt-3 sm:pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">FIDO2 / W3C Standard</span>
                    <button
                      type="button"
                      onClick={() => setShowBiometricModal(false)}
                      className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 sm:px-6 bg-slate-950/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'database'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Client Database ({clients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Plan Comparison & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('marketing')}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'marketing'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Marketing & Leads</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="h-4 w-4 text-emerald-400" />
            <span>Bill Payment Simulator</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 font-mono">
              Pay & Invoices
            </span>
          </button>

          <button
            onClick={() => setActiveTab('usage')}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'usage'
                ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>Data Usage Monitor</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30 font-mono">
              Bandwidth Chart
            </span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: CLIENT DATABASE */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                    Total Clients
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div className="text-xl font-black text-white mt-1">{stats.total}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Registered subscribers</div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                    Active Subscriptions
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl font-black text-emerald-400 mt-1">{stats.active}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {Math.round((stats.active / (stats.total || 1)) * 100)}% active rate
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                    Monthly Revenue
                    <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <div className="text-xl font-black text-amber-400 mt-1">
                    ৳{stats.totalRevenueBdt.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Active subscriber billing</div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
                  <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                    Avg Revenue / User
                    <Activity className="h-3.5 w-3.5 text-indigo-400" />
                  </div>
                  <div className="text-xl font-black text-indigo-300 mt-1">৳{stats.arpu}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">ARPU in Mithapukur</div>
                </div>
              </div>

              {/* Excel Controls & Search Toolbar */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
                {/* Search & Filters */}
                <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search name, phone, ID or area..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 pl-9 pr-3 py-2 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <select
                    value={planFilter}
                    onChange={e => setPlanFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="All">All Plans</option>
                    <option value="20 Mbps">20 Mbps</option>
                    <option value="30 Mbps">30 Mbps</option>
                    <option value="40 Mbps">40 Mbps</option>
                    <option value="50 Mbps">50 Mbps</option>
                    <option value="60 Mbps">60 Mbps</option>
                    <option value="80 Mbps">80 Mbps</option>
                    <option value="100 Mbps">100 Mbps</option>
                  </select>
                </div>

                {/* Actions & Excel buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      resetForm();
                      setEditingClient(null);
                      setIsAddClientOpen(true);
                    }}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Add New Client</span>
                  </button>

                  <button
                    onClick={() => exportClientsToExcel(filteredClients)}
                    className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    title="Export Client Database to Excel (.xlsx/.csv)"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export Excel</span>
                  </button>

                  <label className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3 py-2 rounded-lg border border-slate-700 transition-colors cursor-pointer">
                    <Upload className="h-3.5 w-3.5 text-blue-400" />
                    <span>Import Excel</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".csv, .xlsx, .xls, text/plain"
                      onChange={handleExcelImport}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={downloadSampleExcelTemplate}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[11px] underline ml-1 cursor-pointer"
                    title="Download Excel CSV template structure"
                  >
                    <FileText className="h-3 w-3" />
                    <span>Excel Template</span>
                  </button>
                </div>
              </div>

              {/* Client Table */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto shadow-inner">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-3 font-bold">Client ID</th>
                      <th className="py-3 px-3 font-bold">Name & User Name</th>
                      <th className="py-3 px-3 font-bold">Gender & Phone</th>
                      <th className="py-3 px-3 font-bold">PoP & Zone Name</th>
                      <th className="py-3 px-3 font-bold">Area / Hub</th>
                      <th className="py-3 px-3 font-bold text-emerald-400">ONU / Router MAC</th>
                      <th className="py-3 px-3 font-bold text-amber-300">NID & Doc</th>
                      <th className="py-3 px-3 font-bold text-cyan-400">Lat-Log (GPS)</th>
                      <th className="py-3 px-3 font-bold">Plan</th>
                      <th className="py-3 px-3 font-bold">Monthly Bill</th>
                      <th className="py-3 px-3 font-bold">Status</th>
                      <th className="py-3 px-3 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="py-8 text-center text-slate-500">
                          No matching clients found in database. Click "Add New Client" or "Import Excel" to get started.
                        </td>
                      </tr>
                    ) : (
                      filteredClients.map(c => (
                        <tr key={c.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3 px-3 font-mono text-blue-400 font-bold">{c.id}</td>
                          <td className="py-3 px-3 font-semibold text-white">
                            <div>{c.fullName}</div>
                            {c.username && (
                              <div className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
                                <span className="text-slate-500">User:</span> {c.username}
                              </div>
                            )}
                            {c.ipAddress && (
                              <div className="text-[10px] font-mono text-slate-500">IP: {c.ipAddress}</div>
                            )}
                          </td>
                          <td className="py-3 px-3 font-medium text-slate-300">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 font-bold border border-slate-700">
                                {c.gender || 'Male'}
                              </span>
                            </div>
                            <a href={`tel:${c.phone}`} className="hover:text-blue-400 flex items-center gap-1">
                              <Phone className="h-3 w-3 text-slate-500" />
                              {c.phone}
                            </a>
                          </td>
                          <td className="py-3 px-3 text-slate-300">
                            <div className="font-semibold text-slate-200 text-[11px]">{c.popName || 'Main PoP'}</div>
                            <div className="text-[10px] text-indigo-300">{c.zoneName || 'Zone A'}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
                              {c.area}
                            </span>
                          </td>
                          {/* Hardware MAC (ONU & Router MAC) */}
                          <td className="py-3 px-3 text-slate-300">
                            <div className="space-y-1 min-w-[130px]">
                              {c.onuMac ? (
                                <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded shadow-sm" title={`ONU MAC: ${c.onuMac}`}>
                                  <HardDrive className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
                                  <span className="truncate">ONU: {c.onuMac}</span>
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-600 font-mono italic">No ONU MAC</div>
                              )}
                              {c.routerMac ? (
                                <div className="flex items-center gap-1 font-mono text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded shadow-sm" title={`Router MAC: ${c.routerMac}`}>
                                  <Wifi className="h-2.5 w-2.5 text-cyan-400 shrink-0" />
                                  <span className="truncate">Rtr: {c.routerMac}</span>
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-600 font-mono italic">No Router MAC</div>
                              )}
                            </div>
                          </td>
                          {/* NID & Photo Upload */}
                          <td className="py-3 px-3 text-slate-300">
                            <div className="space-y-1 min-w-[110px]">
                              {c.nidNumber ? (
                                <div className="text-[11px] font-mono text-amber-300 font-semibold flex items-center gap-1" title={`NID: ${c.nidNumber}`}>
                                  <FileCheck className="h-3 w-3 text-amber-400 shrink-0" />
                                  <span className="truncate">{c.nidNumber}</span>
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-600 font-mono italic">No NID No</div>
                              )}
                              {c.nidPhotoUrl ? (
                                <button
                                  type="button"
                                  onClick={() => setPreviewNidModal({ name: c.fullName, id: c.id, url: c.nidPhotoUrl!, nidNumber: c.nidNumber })}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-300 hover:text-white bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 px-2 py-0.5 rounded transition-colors cursor-pointer shadow-sm"
                                  title="Click to preview uploaded NID card"
                                >
                                  <Eye className="h-2.5 w-2.5 text-blue-400" />
                                  <span>View NID</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-600 italic">No Doc</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-300">
                            {c.latitude && c.longitude ? (
                              <a
                                href={`https://maps.google.com/?q=${c.latitude},${c.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-lg shrink-0"
                                title="Click to view client location on Google Maps"
                              >
                                <Navigation className="h-3 w-3 text-cyan-400 shrink-0" />
                                <span>{c.latitude}, {c.longitude}</span>
                              </a>
                            ) : (
                              <span className="text-slate-600 font-mono text-[10px]">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-medium text-indigo-300">{c.planName}</td>
                          <td className="py-3 px-3 font-bold text-amber-400">৳{c.monthlyFee}</td>
                          <td className="py-3 px-3">
                            <span
                              onClick={() => handleToggleStatus(c.id)}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold cursor-pointer transition-opacity hover:opacity-80 ${
                                c.status === 'Active'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : c.status === 'Pending'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : c.status === 'Suspended'
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                              title="Click to toggle status"
                            >
                              {c.status === 'Active' && <CheckCircle className="h-3 w-3" />}
                              {c.status === 'Pending' && <Clock className="h-3 w-3" />}
                              {c.status === 'Suspended' && <AlertTriangle className="h-3 w-3" />}
                              {c.status === 'Inactive' && <XCircle className="h-3 w-3" />}
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedBillingClientId(c.id);
                                  setActiveTab('simulator');
                                }}
                                className="px-2 py-1 rounded-md bg-emerald-950 hover:bg-emerald-800 text-emerald-300 border border-emerald-800/80 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                                title="Pay / Simulate Invoice Payment for this subscriber"
                              >
                                <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="hidden sm:inline">Pay Invoice</span>
                              </button>
                              <button
                                onClick={() => handleOpenEdit(c)}
                                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors cursor-pointer"
                                title="Edit client details"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteClient(c.id, c.fullName)}
                                className="p-1.5 rounded-md bg-slate-800 hover:bg-rose-950 text-rose-400 transition-colors cursor-pointer"
                                title="Delete client"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PLAN COMPARISON & ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    Broadband Plan Performance & Bandwidth Comparison
                  </h3>
                  <p className="text-xs text-slate-400">
                    Live market metrics across Mithapukur subscriber base
                  </p>
                </div>
              </div>

              {/* Grid with Recharts Graphs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Donut Chart: Subscriber Share by Plan */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
                    <PieChartIcon className="h-4 w-4 text-emerald-400" />
                    Subscriber Market Share by Plan
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {chartData.pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart: Plan Bandwidth vs Generated Revenue */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-amber-400" />
                    Total Monthly Revenue by Package Tier (BDT)
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                        />
                        <Bar dataKey="totalRevenue" fill="#3b82f6" name="Total Revenue (BDT)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Area Distribution Bar Chart */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl lg:col-span-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-indigo-400" />
                    Subscribers Distribution by Mithapukur Locality / Union
                  </h4>
                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData.areaBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="area" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                        />
                        <Bar dataKey="clients" fill="#10b981" name="Subscribers Count" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MARKETING & CAMPAIGNS */}
          {activeTab === 'marketing' && (
            <div className="space-y-6">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-400" />
                    Mithapukur Marketing Campaigns & Lead Tracker
                  </h3>
                  <p className="text-xs text-slate-400">
                    Monitor leaflet distributions, local Facebook ads & referral leads
                  </p>
                </div>
              </div>

              {/* Campaign Table */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4 font-bold">Campaign Name</th>
                      <th className="py-3 px-4 font-bold">Source</th>
                      <th className="py-3 px-4 font-bold">Target Area</th>
                      <th className="py-3 px-4 font-bold">Leads</th>
                      <th className="py-3 px-4 font-bold">Conversions</th>
                      <th className="py-3 px-4 font-bold">Conv. Rate</th>
                      <th className="py-3 px-4 font-bold">Budget (BDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {campaigns.map(cmp => {
                      const rate = Math.round((cmp.conversionsCount / (cmp.leadsCount || 1)) * 100);
                      return (
                        <tr key={cmp.id} className="hover:bg-slate-900/50">
                          <td className="py-3 px-4 font-bold text-white">{cmp.campaignName}</td>
                          <td className="py-3 px-4 text-blue-300 font-medium">{cmp.source}</td>
                          <td className="py-3 px-4 text-slate-400">{cmp.targetArea}</td>
                          <td className="py-3 px-4 font-bold text-slate-200">{cmp.leadsCount}</td>
                          <td className="py-3 px-4 font-bold text-emerald-400">{cmp.conversionsCount}</td>
                          <td className="py-3 px-4 font-extrabold text-amber-400">{rate}%</td>
                          <td className="py-3 px-4 font-mono text-slate-300">৳{cmp.budgetBdt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Client SMS & Billing Notice Template Generator */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <h4 className="text-sm font-bold text-white">
                    Client SMS & Billing Notice Broadcast Draft Generator
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  Quick text template to send Bkash / Nagad payment link or broadband promo message to clients.
                </p>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg font-mono text-xs text-slate-300 space-y-2">
                  <p className="text-emerald-400 font-semibold">
                    [Delta Internet Mithapukur Notice]:
                  </p>
                  <p>
                    প্রিয় গ্রাহক, ডেল্টা ইন্টারনেটের চলতি মাসের বিল পরিশোধ করুন সহজেই bKash/Nagad মাধ্যমে। কাস্টমার সেলফ কেয়ার পোর্টালে লগইন করতে ভিজিট করুন: https://radius.yetfix.com/customer_login | যেকোনো সহায়তায় আকমালে শাখা হটলাইন: 0171-9394430
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BILL PAYMENT SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              {/* Top Toolbar & Subscriber Selector */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-[280px] flex-1">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      Mithapukur Broadband Invoice & Bill Payment Simulator
                    </h3>
                    <p className="text-xs text-slate-400">
                      View current monthly bill, select payment method & simulate live transaction clearing
                    </p>
                  </div>
                </div>

                {/* Subscriber & Month Pickers */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                  <div className="flex flex-col gap-1 flex-1 sm:flex-none min-w-[220px]">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Subscriber</label>
                    <select
                      value={selectedBillingClientId}
                      onChange={e => {
                        setSelectedBillingClientId(e.target.value);
                        setAppliedCoupon(null);
                      }}
                      className="bg-slate-900 border border-slate-700 text-slate-100 font-semibold px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.fullName} ({c.id}) — {c.planName} (৳{c.monthlyFee})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 min-w-[140px]">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billing Month</label>
                    <select
                      value={billingMonth}
                      onChange={e => setBillingMonth(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-slate-100 font-semibold px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="July 2026">July 2026 (Current)</option>
                      <option value="August 2026">August 2026</option>
                      <option value="June 2026">June 2026</option>
                    </select>
                  </div>
                </div>
              </div>

              {!currentBillingClient || !currentInvoiceDetails ? (
                <div className="p-8 text-center text-slate-500 bg-slate-950/50 rounded-xl border border-slate-800">
                  No subscriber selected. Please add clients to database first.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* LEFT COLUMN: DIGITAL INVOICE VIEW (7 Cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                      {/* Paid Watermark Banner */}
                      {currentInvoiceDetails.isPaid && (
                        <div className="absolute -right-12 top-6 bg-emerald-500 text-slate-950 text-xs font-black px-12 py-1 rotate-45 shadow-lg tracking-widest uppercase pointer-events-none z-10 flex items-center justify-center gap-1">
                          <BadgeCheck className="h-4 w-4" />
                          PAID IN FULL
                        </div>
                      )}

                      {/* Official Invoice Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                        <div className="space-y-1">
                          <Logo size="md" lightText={true} />
                          <p className="text-[11px] text-slate-400 font-medium">
                            Boldipukur Bazaar (Akmal Market PoP-01), Mithapukur, Rangpur
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            Helpline: 01785-230421 | BTRC Licensed ISP
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg inline-block">
                            Official Monthly Statement
                          </span>
                          <div className="text-sm font-mono font-bold text-slate-200 mt-2">
                            {currentInvoiceDetails.invoiceNo}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Issue Date: <strong className="text-slate-200">{billingMonth.split(' ')[0]} 1, 2026</strong>
                          </div>
                          <div className="text-[11px] text-rose-400 mt-0.5">
                            Due Date: <strong className="text-rose-300">{billingMonth.split(' ')[0]} 10, 2026</strong>
                          </div>
                        </div>
                      </div>

                      {/* Client Account Info Card */}
                      <div className="my-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 font-medium block">Subscriber Name</span>
                          <strong className="text-white font-bold">{currentBillingClient.fullName}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-medium block">Customer ID / User</span>
                          <strong className="text-blue-400 font-mono font-bold">
                            {currentBillingClient.id} ({currentBillingClient.username || 'user'})
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-medium block">Contact Phone</span>
                          <span className="text-slate-300 font-mono">{currentBillingClient.phone}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-medium block">Subscribed Plan</span>
                          <span className="text-indigo-300 font-semibold">{currentBillingClient.planName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-medium block">Coverage Area</span>
                          <span className="text-slate-300">{currentBillingClient.area}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-medium block">Current Account Status</span>
                          <span
                            className={`inline-flex items-center gap-1 font-bold ${
                              currentBillingClient.status === 'Active'
                                ? 'text-emerald-400'
                                : currentBillingClient.status === 'Suspended'
                                ? 'text-rose-400'
                                : 'text-amber-400'
                            }`}
                          >
                            {currentBillingClient.status}
                          </span>
                        </div>
                      </div>

                      {/* Invoice Itemized Charges Table */}
                      <div className="border border-slate-800 rounded-xl overflow-hidden mb-4">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 text-[10px] uppercase">
                            <tr>
                              <th className="py-2.5 px-3">Description / Service Item</th>
                              <th className="py-2.5 px-3 text-right">Amount (BDT)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 text-slate-200 font-medium">
                            <tr>
                              <td className="py-2.5 px-3">
                                <div>Monthly Fiber Broadband Plan Fee</div>
                                <div className="text-[10px] text-slate-500">{currentBillingClient.planName} ({billingMonth})</div>
                              </td>
                              <td className="py-2.5 px-3 text-right font-mono font-bold">
                                ৳{currentInvoiceDetails.baseFee.toLocaleString()}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2.5 px-3">
                                <div>ONU Fiber Port Maintenance & Optical Drop Wire</div>
                                <div className="text-[10px] text-emerald-400 font-medium">Complimentary High-Speed Fiber Port</div>
                              </td>
                              <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">
                                ৳0 (FREE)
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2.5 px-3">
                                <div>Government Telecom VAT & SD (5%)</div>
                              </td>
                              <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                                ৳{currentInvoiceDetails.vatAmount}
                              </td>
                            </tr>
                            {currentInvoiceDetails.lateFee > 0 && (
                              <tr>
                                <td className="py-2.5 px-3 text-rose-300">
                                  <div>Re-activation & Late Payment Fee</div>
                                  <div className="text-[10px] text-rose-400">Due bill suspension surcharge</div>
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-rose-400 font-bold">
                                  +৳{currentInvoiceDetails.lateFee}
                                </td>
                              </tr>
                            )}
                            {currentInvoiceDetails.discount > 0 && (
                              <tr className="bg-emerald-950/20">
                                <td className="py-2.5 px-3 text-emerald-300">
                                  <div>Applied Promo Discount ({appliedCoupon?.code})</div>
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono text-emerald-400 font-bold">
                                  -৳{currentInvoiceDetails.discount}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Net Total Summary */}
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">Total Amount Payable</span>
                          <span className="text-[10px] text-slate-500">Includes all taxes & fees</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-amber-400 font-mono">
                            ৳{currentInvoiceDetails.netPayable.toLocaleString()} BDT
                          </div>
                          {currentInvoiceDetails.isPaid ? (
                            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>CLEARED VIA {currentInvoiceDetails.paidRecord?.paymentMethod}</span>
                            </div>
                          ) : (
                            <div className="text-xs font-bold text-rose-400 flex items-center gap-1 justify-end mt-0.5">
                              <Clock className="h-3.5 w-3.5" />
                              <span>UNPAID — DUE NOW</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Paid Status Voucher Details if Paid */}
                      {currentInvoiceDetails.isPaid && currentInvoiceDetails.paidRecord && (
                        <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2 text-xs">
                          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                            <span className="font-extrabold flex items-center gap-1.5 text-emerald-300">
                              <BadgeCheck className="h-4 w-4 text-emerald-400" />
                              Official Digital Payment Receipt
                            </span>
                            <button
                              onClick={() => setSelectedInvoiceReceipt({
                                ...currentInvoiceDetails.paidRecord,
                                client: currentBillingClient,
                                details: currentInvoiceDetails
                              })}
                              className="px-2.5 py-1 bg-emerald-500 text-slate-950 rounded-lg text-[11px] font-black hover:bg-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Printer className="h-3 w-3" />
                              <span>View Receipt</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Transaction ID</span>
                              <strong className="text-emerald-200">{currentInvoiceDetails.paidRecord.transactionId}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Paid Timestamp</span>
                              <span className="text-slate-200">{currentInvoiceDetails.paidRecord.paidAt}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Gateway</span>
                              <span className="text-slate-200">{currentInvoiceDetails.paidRecord.paymentMethod}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Payer Mobile</span>
                              <span className="text-slate-200">{currentInvoiceDetails.paidRecord.accountPhone}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: INTERACTIVE PAYMENT METHOD SIMULATOR (5 Cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-emerald-400" />
                          Select Payment Method
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">Simulated Gateway</span>
                      </div>

                      {/* Payment Method Selector Cards */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* bKash */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentGateway('bKash')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            selectedPaymentGateway === 'bKash'
                              ? 'bg-pink-950/60 border-pink-500 ring-2 ring-pink-500/30 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="h-6 w-6 rounded-lg bg-pink-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                            bk
                          </div>
                          <span className="text-xs font-bold">bKash</span>
                        </button>

                        {/* Nagad */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentGateway('Nagad')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            selectedPaymentGateway === 'Nagad'
                              ? 'bg-orange-950/60 border-orange-500 ring-2 ring-orange-500/30 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="h-6 w-6 rounded-lg bg-orange-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                            NG
                          </div>
                          <span className="text-xs font-bold">Nagad</span>
                        </button>

                        {/* Rocket */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentGateway('Rocket')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            selectedPaymentGateway === 'Rocket'
                              ? 'bg-purple-950/60 border-purple-500 ring-2 ring-purple-500/30 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="h-6 w-6 rounded-lg bg-purple-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                            RC
                          </div>
                          <span className="text-xs font-bold">Rocket</span>
                        </button>

                        {/* Upay */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentGateway('Upay')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            selectedPaymentGateway === 'Upay'
                              ? 'bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/30 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="h-6 w-6 rounded-lg bg-blue-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                            UP
                          </div>
                          <span className="text-xs font-bold">Upay</span>
                        </button>

                        {/* Bank / Card */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentGateway('Bank')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            selectedPaymentGateway === 'Bank'
                              ? 'bg-cyan-950/60 border-cyan-500 ring-2 ring-cyan-500/30 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <Building2 className="h-5 w-5 text-cyan-400" />
                          <span className="text-xs font-bold">Card/Bank</span>
                        </button>

                        {/* Cash Counter */}
                        <button
                          type="button"
                          onClick={() => setSelectedPaymentGateway('Cash')}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            selectedPaymentGateway === 'Cash'
                              ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30 text-white'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <Receipt className="h-5 w-5 text-emerald-400" />
                          <span className="text-xs font-bold">Branch Cash</span>
                        </button>
                      </div>

                      {/* Selected Gateway Merchant Info Box */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Delta Merchant Account</span>
                          <p className="font-mono text-emerald-400 font-extrabold">01785-230421 (Akmal Market PoP)</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          Auto-Verified
                        </span>
                      </div>

                      {/* Payment Account Details Inputs */}
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                            <Smartphone className="h-3.5 w-3.5 text-blue-400" />
                            {selectedPaymentGateway === 'Bank' ? 'Card / Account Number' : `${selectedPaymentGateway} Account Mobile Number`}
                          </label>
                          <input
                            type="text"
                            value={paymentPhoneInput}
                            onChange={e => setPaymentPhoneInput(e.target.value)}
                            placeholder="e.g. 01712-345678"
                            className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 px-3.5 py-2 rounded-xl text-slate-100 font-mono text-xs focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-slate-300 font-bold mb-1">
                              {selectedPaymentGateway === 'Bank' ? 'CVV / OTP' : 'PIN / OTP Code'}
                            </label>
                            <input
                              type="password"
                              value={paymentPinInput}
                              onChange={e => setPaymentPinInput(e.target.value)}
                              placeholder="e.g. 12345"
                              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 px-3 py-2 rounded-xl text-slate-100 font-mono text-xs focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-300 font-bold mb-1">
                              Trx ID Override (Optional)
                            </label>
                            <input
                              type="text"
                              value={trxIdInput}
                              onChange={e => setTrxIdInput(e.target.value)}
                              placeholder="Auto-generated"
                              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 px-3 py-2 rounded-xl text-slate-100 font-mono text-xs focus:outline-none placeholder-slate-600"
                            />
                          </div>
                        </div>

                        {/* Promo / Discount Coupon Input */}
                        <div>
                          <label className="block text-slate-300 font-bold mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Gift className="h-3.5 w-3.5 text-amber-400" />
                              Promo Coupon Code
                            </span>
                            <span className="text-[10px] text-slate-400">Try: DELTA2026</span>
                          </label>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={promoCouponInput}
                              onChange={e => setPromoCouponInput(e.target.value)}
                              placeholder="e.g. DELTA2026"
                              className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-500 px-3 py-2 rounded-xl text-slate-100 font-mono text-xs focus:outline-none uppercase"
                            />
                            <button
                              type="button"
                              onClick={handleApplyCoupon}
                              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Payment Action Button */}
                      {isProcessingPayment ? (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Processing Payment Gateway Request...</span>
                          </div>
                          <div className="space-y-1 font-mono text-[11px] text-slate-300">
                            {paymentProcessingLogs.map((log, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="text-emerald-400">›</span>
                                <span>{log}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={currentInvoiceDetails.isPaid}
                          onClick={handleSimulatePayment}
                          className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                            currentInvoiceDetails.isPaid
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                              : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/25 active:scale-[0.99]'
                          }`}
                        >
                          <CreditCard className="h-4 w-4" />
                          <span>
                            {currentInvoiceDetails.isPaid
                              ? 'Bill Already Paid for this Month'
                              : `Simulate ${selectedPaymentGateway} Payment (৳${currentInvoiceDetails.netPayable} BDT)`}
                          </span>
                        </button>
                      )}

                      <div className="text-[10px] text-slate-500 text-center font-mono flex items-center justify-center gap-1 pt-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-400" />
                        <span>Mithapukur Branch Digital Payment Gateway Simulator</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Usage & Bandwidth Consumption Chart for Logged-In CID Account */}
                {renderDataUsageMonitor()}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DATA USAGE MONITOR */}
          {activeTab === 'usage' && (
            <div className="space-y-6">
              {renderDataUsageMonitor()}
            </div>
          )}
        </div>
      </>
    )}
  </div>

      {/* Paid Receipt Voucher Modal Overlay */}
      {selectedInvoiceReceipt && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Delta Broadband Official Paid Receipt</span>
              </div>
              <button
                onClick={() => setSelectedInvoiceReceipt(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white text-slate-900 p-5 rounded-xl space-y-4 text-xs font-sans shadow-inner">
              {/* Receipt Branding Header */}
              <div className="text-center border-b pb-3 border-slate-200">
                <h4 className="font-black text-base uppercase text-blue-900 tracking-tight">Delta Broadband Network</h4>
                <p className="text-[10px] text-slate-600">Boldipukur Bazaar (Akmal Market PoP-01), Mithapukur, Rangpur</p>
                <p className="text-[10px] text-emerald-700 font-bold mt-1 uppercase tracking-widest bg-emerald-50 py-0.5 rounded border border-emerald-200 inline-block px-2">
                  Official Paid Voucher
                </p>
              </div>

              {/* Transaction Key Details */}
              <div className="space-y-1.5 font-mono text-[11px] border-b pb-3 border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Invoice No:</span>
                  <strong className="text-slate-900">{selectedInvoiceReceipt.invoiceNo}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <strong className="text-emerald-700">{selectedInvoiceReceipt.transactionId}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Subscriber:</span>
                  <span className="text-slate-900 font-bold">{selectedInvoiceReceipt.client?.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer ID:</span>
                  <span className="text-slate-900">{selectedInvoiceReceipt.client?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Gateway:</span>
                  <span className="text-slate-900 font-bold">{selectedInvoiceReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="text-slate-700">{selectedInvoiceReceipt.paidAt}</span>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="flex items-center justify-between bg-slate-100 p-3 rounded-lg">
                <span className="font-bold text-slate-700">Total Amount Cleared</span>
                <span className="font-mono font-black text-base text-emerald-700">
                  ৳{selectedInvoiceReceipt.paidAmount?.toLocaleString()} BDT
                </span>
              </div>

              <div className="text-[10px] text-slate-500 text-center italic">
                Thank you for paying your broadband bill on time! For support, call 01785-230421.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print / Save Receipt</span>
              </button>
              <button
                onClick={() => setSelectedInvoiceReceipt(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Client Modal Drawer Overlay */}
      {isAddClientOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 text-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-blue-400" />
                {editingClient ? `Edit Client (${editingClient.id})` : 'Add New Client to Database'}
              </h3>
              <button
                onClick={() => setIsAddClientOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitClient} className="space-y-3 text-xs max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Client Full Name (English / বাংলা)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robiul Islam (রবিউল ইসলাম)"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* User Name & Password fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold text-blue-400">User Name</label>
                  <input
                    type="text"
                    placeholder="e.g. mahbub_dlt"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold text-blue-400">Password</label>
                  <input
                    type="text"
                    placeholder="e.g. Dlt@2026Pass"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Gender & Phone fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold text-emerald-400">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as ClientGender })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="01712-XXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* PoP Name & Zone Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold text-indigo-400">PoP Name</label>
                  <input
                    type="text"
                    list="pop-list-options"
                    placeholder="e.g. Akmal Market PoP-01"
                    value={formData.popName}
                    onChange={e => setFormData({ ...formData, popName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <datalist id="pop-list-options">
                    <option value="Boldipukur Bazzar (Delta Mithapukur Brach)" />
                    <option value="Borogorga PoP" />
                    <option value="Molonghat Sub PoP" />
                    <option value="Shalaipur Sub PoP" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold text-indigo-400">Zone Name</label>
                  <input
                    type="text"
                    list="zone-list-options"
                    placeholder="e.g. Zone A - Boldipukur"
                    value={formData.zoneName}
                    onChange={e => setFormData({ ...formData, zoneName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <datalist id="zone-list-options">
                    <option value="Zone A - Boldipukur" />
                    <option value="Zone B - Sadar Town" />
                    <option value="Zone C - Pairaband" />
                    <option value="Zone D - Mirzapur" />
                    <option value="Zone E - Ranipukur" />
                    <option value="Zone F - Gopalpur" />
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Area / Hub</label>
                <select
                  value={formData.area}
                  onChange={e => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  {MITHAPUKUR_AREAS.map(a => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Broadband Plan</label>
                  <select
                    value={formData.planName}
                    onChange={e => {
                      const selectedP = PLAN_OPTIONS.find(p => p.name === e.target.value);
                      setFormData({
                        ...formData,
                        planName: e.target.value,
                        monthlyFee: selectedP ? selectedP.fee : formData.monthlyFee
                      });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {PLAN_OPTIONS.map(p => (
                      <option key={p.name} value={p.name}>
                        {p.name} (৳{p.fee})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Monthly Fee (BDT)</label>
                  <input
                    type="number"
                    required
                    value={formData.monthlyFee}
                    onChange={e => setFormData({ ...formData, monthlyFee: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Connection Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as ClientStatus })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={e => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                  </select>
                </div>
              </div>

              {/* Hardware MAC Addresses (ONU & Router MAC) */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-200 font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                    <HardDrive className="h-3.5 w-3.5 text-emerald-400" />
                    Device Hardware MAC Addresses (ONU & Router)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const randomHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase();
                      const genOnu = `BC:54:36:${randomHex()}:${randomHex()}:${randomHex()}`;
                      const genRouter = `74:83:C2:${randomHex()}:${randomHex()}:${randomHex()}`;
                      setFormData(prev => ({ ...prev, onuMac: genOnu, routerMac: genRouter }));
                      showToast('⚡ Auto-generated sample ONU & Router MACs');
                    }}
                    className="text-[10px] bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Zap className="h-2.5 w-2.5 text-emerald-400" />
                    <span>Auto-Gen MAC</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold text-[11px] flex items-center gap-1">
                      <HardDrive className="h-3 w-3 text-emerald-400" />
                      ONU MAC Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="BC:54:36:XX:XX:XX"
                        value={formData.onuMac}
                        onChange={e => setFormData({ ...formData, onuMac: formatMacAddress(e.target.value) })}
                        maxLength={17}
                        className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-emerald-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono text-xs tracking-wider uppercase"
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 mt-0.5 block">Optical Network Unit physical address</span>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold text-[11px] flex items-center gap-1">
                      <Wifi className="h-3 w-3 text-cyan-400" />
                      Router MAC Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="74:83:C2:XX:XX:XX"
                        value={formData.routerMac}
                        onChange={e => setFormData({ ...formData, routerMac: formatMacAddress(e.target.value) })}
                        maxLength={17}
                        className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-xs tracking-wider uppercase"
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 mt-0.5 block">Wi-Fi Router LAN/WAN MAC address</span>
                  </div>
                </div>
              </div>

              {/* Client NID & Identity Upload Section */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-200 font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                    <FileCheck className="h-3.5 w-3.5 text-amber-400" />
                    Client NID & Smart Card Identity (জাতীয় পরিচয়পত্র)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const sampleNid = `1988269${Math.floor(1000000000 + Math.random() * 9000000000)}`;
                      // Create an SVG-based preview card data URL as sample NID
                      const canvas = document.createElement('canvas');
                      canvas.width = 600;
                      canvas.height = 380;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.fillStyle = '#064e3b';
                        ctx.fillRect(0, 0, 600, 380);
                        ctx.fillStyle = '#047857';
                        ctx.fillRect(10, 10, 580, 360);
                        ctx.strokeStyle = '#10b981';
                        ctx.lineWidth = 4;
                        ctx.strokeRect(15, 15, 570, 350);
                        
                        // Header
                        ctx.fillStyle = '#fef08a';
                        ctx.font = 'bold 20px sans-serif';
                        ctx.fillText('PEOPLE\'S REPUBLIC OF BANGLADESH', 110, 50);
                        ctx.fillStyle = '#ffffff';
                        ctx.font = '14px sans-serif';
                        ctx.fillText('National ID Card / জাতীয় পরিচয়পত্র', 190, 75);
                        
                        // User info
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 16px sans-serif';
                        ctx.fillText(`Name: ${formData.fullName || 'Subscriber Client'}`, 180, 140);
                        ctx.font = '14px sans-serif';
                        ctx.fillText(`Phone: ${formData.phone || '01700-000000'}`, 180, 175);
                        ctx.fillText(`Area: ${formData.area}`, 180, 210);
                        
                        // Photo placeholder box
                        ctx.fillStyle = '#1e293b';
                        ctx.fillRect(40, 110, 110, 130);
                        ctx.strokeStyle = '#38bdf8';
                        ctx.strokeRect(40, 110, 110, 130);
                        ctx.fillStyle = '#94a3b8';
                        ctx.font = 'bold 12px sans-serif';
                        ctx.fillText('PHOTO', 70, 180);
                        
                        // NID Number
                        ctx.fillStyle = '#fef08a';
                        ctx.font = 'bold 22px monospace';
                        ctx.fillText(`NID NO: ${sampleNid}`, 40, 310);
                        
                        const sampleUrl = canvas.toDataURL('image/png');
                        setFormData(prev => ({ ...prev, nidNumber: sampleNid, nidPhotoUrl: sampleUrl }));
                        showToast('🪪 Generated sample Bangladesh Smart NID card!');
                      }
                    }}
                    className="text-[10px] bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-amber-400" />
                    <span>Demo NID Card</span>
                  </button>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold text-[11px]">
                    NID / Smart Card Number (জাতীয় পরিচয়পত্র নম্বর)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 19882691234567890 (10 or 17 digits)"
                    value={formData.nidNumber}
                    onChange={e => setFormData({ ...formData, nidNumber: e.target.value.replace(/[^0-9]/g, '') })}
                    maxLength={17}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-amber-300 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                </div>

                {/* NID Document / Photo Upload */}
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold text-[11px] flex items-center justify-between">
                    <span>Upload NID Front/Back Photo (এনআইডি ছবি / কপি)</span>
                    {formData.nidPhotoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, nidPhotoUrl: '' }))}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <Trash2 className="h-2.5 w-2.5" /> Remove Photo
                      </button>
                    )}
                  </label>

                  <input
                    type="file"
                    ref={nidFileInputRef}
                    accept="image/*,application/pdf"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        handleNidFileUpload(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  {formData.nidPhotoUrl ? (
                    <div className="relative rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-2.5 flex items-center gap-3">
                      <div className="h-16 w-24 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-900 shrink-0 relative group">
                        <img
                          src={formData.nidPhotoUrl}
                          alt="Client NID Document"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setPreviewNidModal({
                            name: formData.fullName || 'Subscriber',
                            id: editingClient ? editingClient.id : 'New Client',
                            url: formData.nidPhotoUrl,
                            nidNumber: formData.nidNumber
                          })}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity cursor-pointer"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>NID Document Attached</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                          {formData.nidNumber ? `NID: ${formData.nidNumber}` : 'Document attached'}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewNidModal({
                              name: formData.fullName || 'Subscriber',
                              id: editingClient ? editingClient.id : 'New Client',
                              url: formData.nidPhotoUrl,
                              nidNumber: formData.nidNumber
                            })}
                            className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 font-bold transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Eye className="h-2.5 w-2.5" /> View Full
                          </button>
                          <button
                            type="button"
                            onClick={() => nidFileInputRef.current?.click()}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer"
                          >
                            Change File
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => nidFileInputRef.current?.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleNidFileUpload(e.dataTransfer.files[0]);
                        }
                      }}
                      className="border-2 border-dashed border-slate-700 hover:border-blue-500/80 bg-slate-900/50 hover:bg-slate-900 rounded-xl p-3.5 text-center cursor-pointer transition-all duration-200 group"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <UploadCloud className="h-6 w-6 text-slate-400 group-hover:text-blue-400 transition-colors mb-1" />
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                          Click or drag NID photo to upload
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5">
                          PNG, JPG, or WebP up to 5MB (Smart Card / NID Paper)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">IP Address (Optional)</label>
                <input
                  type="text"
                  placeholder="103.145.22.XX"
                  value={formData.ipAddress}
                  onChange={e => setFormData({ ...formData, ipAddress: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Latitude & Longitude (Lat-Log) Geolocation Fields */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-300 font-bold text-cyan-400 flex items-center gap-1.5 text-xs">
                    <Navigation className="h-3.5 w-3.5 text-cyan-400" />
                    GPS Coordinates (Lat-Log / Lat-Lng)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          pos => {
                            setFormData(prev => ({
                              ...prev,
                              latitude: pos.coords.latitude.toFixed(6),
                              longitude: pos.coords.longitude.toFixed(6)
                            }));
                            showToast('📍 Captured GPS coordinates!');
                          },
                          err => {
                            showToast('⚠️ Location access disabled: ' + err.message);
                          }
                        );
                      } else {
                        showToast('⚠️ Geolocation not supported by browser.');
                      }
                    }}
                    className="text-[10px] bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 px-2 py-1 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  >
                    <MapPin className="h-3 w-3 text-cyan-400" />
                    <span>Auto-Detect GPS</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold text-[11px]">Latitude (Lat)</label>
                    <input
                      type="text"
                      placeholder="e.g. 25.5801"
                      value={formData.latitude}
                      onChange={e => setFormData({ ...formData, latitude: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold text-[11px]">Longitude (Log / Lng)</label>
                    <input
                      type="text"
                      placeholder="e.g. 89.2815"
                      value={formData.longitude}
                      onChange={e => setFormData({ ...formData, longitude: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Notes / Fiber Box Details</label>
                <textarea
                  rows={2}
                  placeholder="Installation address, router model, drop wire length..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800 sticky bottom-0 bg-slate-900 py-2">
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-md"
                >
                  {editingClient ? 'Save Changes' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL NID DOCUMENT / PHOTO PREVIEW MODAL */}
      {previewNidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                    <span>{previewNidModal.name}</span>
                    <span className="font-mono text-xs text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                      {previewNidModal.id}
                    </span>
                  </h3>
                  <p className="text-xs text-amber-400 font-mono">
                    {previewNidModal.nidNumber ? `NID No: ${previewNidModal.nidNumber}` : 'National ID Document'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewNidModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image Body */}
            <div className="p-4 bg-slate-950 flex items-center justify-center overflow-auto max-h-[60vh]">
              <img
                src={previewNidModal.url}
                alt={`NID Card of ${previewNidModal.name}`}
                className="max-h-[50vh] max-w-full rounded-xl object-contain border border-slate-800 shadow-2xl"
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Verified Delta Broadband Subscriber Identity Document
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={previewNidModal.url}
                  download={`NID_${previewNidModal.id}_${previewNidModal.name.replace(/\s+/g, '_')}.png`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download NID</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewNidModal(null)}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
