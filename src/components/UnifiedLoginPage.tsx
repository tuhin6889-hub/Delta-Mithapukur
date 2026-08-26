import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  Smartphone,
  Server,
  ArrowRight,
  LifeBuoy,
  AlertCircle,
  Eye,
  EyeOff,
  Globe,
  Radio,
  ExternalLink,
  Activity,
  Zap,
  PhoneCall,
  MessageCircle,
  Wifi,
  Cpu,
  Database,
  Building2,
  FileText,
  CreditCard,
  Layers,
  CheckCircle2,
  Home,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { BRANCH_INFO } from '../data/plans';
import { NocTelemetryCharts } from './NocTelemetryCharts';
import { LayoutDashboard } from 'lucide-react';

interface UnifiedLoginPageProps {
  onLoginSuccess: (userRole: 'client' | 'staff' | 'manager' | 'guest', userData?: any) => void;
  onExplorePublicWebsite: () => void;
  onOpenSupportTicket: (tab?: 'fast_login' | 'create' | 'qr_ticket' | 'client_portal' | 'admin_portal' | 'noc_telemetry' | 'client_db' | 'ai_diagnostics' | 'android_app') => void;
  onOpenDownloadApk?: () => void;
  onOpenDashboard?: () => void;
}

export const UnifiedLoginPage: React.FC<UnifiedLoginPageProps> = ({
  onLoginSuccess,
  onExplorePublicWebsite,
  onOpenSupportTicket,
  onOpenDownloadApk,
  onOpenDashboard
}) => {
  const { language } = useLanguage();
  // Strictly 3 portals: Branch Manager, NOC Center, Client Portal
  const [activeTab, setActiveTab] = useState<'manager' | 'noc' | 'client'>('manager');
  
  // Branch Manager Form
  const [managerEmail, setManagerEmail] = useState('');
  const [managerPassword, setManagerPassword] = useState('');
  const [showManagerPassword, setShowManagerPassword] = useState(false);

  // NOC Engineer Form
  const [nocEmail, setNocEmail] = useState('');
  const [nocPassword, setNocPassword] = useState('');
  const [showNocPassword, setShowNocPassword] = useState(false);

  // Client Form
  const [clientId, setClientId] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Status & Error
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler: Branch Manager Login
  const handleManagerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!managerEmail.trim() || !managerPassword.trim()) {
      setErrorMessage(language === 'bn' ? 'ম্যানেজার ইমেইল ও পাসওয়ার্ড উভয় ফিল্ড পূরণ করুন' : 'Please provide both Manager Email and Password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('manager', { email: managerEmail.trim(), role: 'manager', portal: 'branch_manager' });
    }, 500);
  };

  // Handler: NOC Engineer Login
  const handleNocLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nocEmail.trim() || !nocPassword.trim()) {
      setErrorMessage(language === 'bn' ? 'NOC অ্যাডমিন ইমেইল ও পাসওয়ার্ড প্রদান করুন' : 'Please provide NOC Email and Password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('manager', { email: nocEmail.trim(), role: 'noc', portal: 'noc_operations' });
    }, 500);
  };

  // Handler: Client CID Login
  const handleClientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!clientId.trim()) {
      setErrorMessage(language === 'bn' ? 'অনুগ্রহ করে গ্রাহক আইডি (CID) লিখুন' : 'Please enter Customer ID (CID)');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('client', { cid: clientId.trim().toUpperCase(), phone: clientPhone });
    }, 500);
  };

  // Quick Demo Auto-Fillers
  const fillManagerDemo = () => {
    setManagerEmail('manager@deltamithapukur.net');
    setManagerPassword('delta2026');
    setErrorMessage('');
  };

  const fillNocDemo = () => {
    setNocEmail('noc@deltamithapukur.net');
    setNocPassword('delta2026');
    setErrorMessage('');
  };

  const fillClientDemo = (cid: string) => {
    setClientId(cid);
    setClientPhone('01712345678');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-600/15 via-rose-600/10 to-transparent pointer-events-none blur-3xl -z-10" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-20 shadow-lg">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-black flex items-center gap-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>BRANCH • NOC • CLIENT GATEWAY</span>
            </span>

            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold">
              <Activity className="h-3 w-3 text-emerald-400" />
              <span>Backbone: 4ms • BDIX 100% Active</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenDownloadApk && (
            <button
              type="button"
              onClick={onOpenDownloadApk}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Download Android Client & Support APK"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{language === 'bn' ? 'অ্যান্ড্রয়েড অ্যাপ' : 'Download APK'}</span>
              <span className="sm:hidden">APK</span>
            </button>
          )}

          <button
            type="button"
            onClick={onExplorePublicWebsite}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>{language === 'bn' ? 'পাবলিক ওয়েবসাইট' : 'Explore Website'}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-slate-900/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-2 z-10 shadow-md shadow-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <ol className="flex items-center gap-1.5 font-medium">
            <li>
              <button
                type="button"
                onClick={onExplorePublicWebsite}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <Home className="h-3.5 w-3.5 text-blue-400" />
                <span>{language === 'bn' ? 'হোম (মিঠাপুকুর শাখা)' : 'Home (Mithapukur)'}</span>
              </button>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            </li>
            <li>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/20">
                <Lock className="h-3.5 w-3.5 text-indigo-400" />
                <span>{language === 'bn' ? 'লগইন পোর্টাল' : 'Unified Login Portal'}</span>
              </span>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            </li>
            <li>
              <span className="text-slate-300 font-semibold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                {activeTab === 'client' ? (language === 'bn' ? 'গ্রাহক একাউন্ট' : 'Client Self-Care') :
                 activeTab === 'noc' ? (language === 'bn' ? 'NOC টেলিকম কন্ট্রোল' : 'NOC Control') :
                 (language === 'bn' ? 'ম্যানেজার কনসোল' : 'Branch Manager')}
              </span>
            </li>
          </ol>

          <button
            type="button"
            onClick={onExplorePublicWebsite}
            className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>← {language === 'bn' ? 'ওয়েবসাইটে ফিরুন' : 'Back to Website'}</span>
          </button>
        </div>
      </nav>

      {/* Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 my-2 sm:my-4">
        <div className={`w-full ${activeTab === 'noc' ? 'max-w-5xl' : 'max-w-2xl'} transition-all duration-300 bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/40 relative`}>
          
          {/* Main Title & Subtitle */}
          <div className="text-center space-y-1.5 mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-rose-500/20 to-cyan-500/20 border border-indigo-500/30 text-indigo-400 shadow-inner">
              <ShieldCheck className="h-7 w-7 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {language === 'bn' ? 'ডেল্টা মিঠাপুকুর এক্সেস পোর্টাল' : 'Delta Mithapukur Access Portal'}
            </h1>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
              {language === 'bn'
                ? 'ব্রাঞ্চ ম্যানেজার, এনওসি নেটওয়ার্ক অপারেশন কন্ট্রোল এবং গ্রাহক সেলফ-কেয়ার পোর্টাল।'
                : 'Authorized Branch Manager, NOC Optical Operations Control & Customer Self-Care Gateway.'}
            </p>
          </div>

          {/* 3-Column Portal Switcher Tabs: Branch Manager | NOC Center | Client Portal */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-950/90 rounded-2xl border border-slate-800 mb-6">
            {/* 1. Branch Manager */}
            <button
              type="button"
              onClick={() => { setActiveTab('manager'); setErrorMessage(''); }}
              className={`py-3 px-2 text-xs font-black rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'manager'
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="h-4 w-4 shrink-0 text-indigo-300" />
              <span className="text-center">{language === 'bn' ? 'ব্রাঞ্চ ম্যানেজার' : 'Branch Manager'}</span>
            </button>

            {/* 2. NOC Operations */}
            <button
              type="button"
              onClick={() => { setActiveTab('noc'); setErrorMessage(''); }}
              className={`py-3 px-2 text-xs font-black rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'noc'
                  ? 'bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 text-white shadow-lg shadow-rose-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Server className="h-4 w-4 shrink-0 text-rose-300" />
              <span className="text-center">{language === 'bn' ? 'NOC কন্ট্রোল' : 'NOC Center'}</span>
            </button>

            {/* 3. Client Self-Care */}
            <button
              type="button"
              onClick={() => { setActiveTab('client'); setErrorMessage(''); }}
              className={`py-3 px-2 text-xs font-black rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="h-4 w-4 shrink-0 text-cyan-300" />
              <span className="text-center">{language === 'bn' ? 'গ্রাহক পোর্টাল' : 'Client Portal'}</span>
            </button>
          </div>

          {/* Error Notification Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. BRANCH MANAGER PORTAL */}
          {/* ========================================================= */}
          {activeTab === 'manager' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span className="text-indigo-200 font-bold">
                    {language === 'bn' ? 'মিঠাপুকুর হেড ব্রাঞ্চ অ্যাডমিনিস্ট্রেশন' : 'Mithapukur Head Branch Administration'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                  Full Authority
                </span>
              </div>

              <form onSubmit={handleManagerLogin} className="space-y-3.5 bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-indigo-400" />
                    {language === 'bn' ? 'ম্যানেজার ক্রেডেনশিয়াল' : 'Branch Manager Credentials'}
                  </span>
                  <button
                    type="button"
                    onClick={fillManagerDemo}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer font-mono"
                  >
                    {language === 'bn' ? '⚡ ডেমো অটো-ফিল' : '⚡ Auto Fill Demo'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    {language === 'bn' ? 'ম্যানেজার অফিশিয়াল ইমেইল' : 'Manager Official Email'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={managerEmail}
                      onChange={(e) => setManagerEmail(e.target.value)}
                      placeholder="manager@deltamithapukur.net"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    {language === 'bn' ? 'সিকিউরিটি পাসওয়ার্ড' : 'Security Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showManagerPassword ? 'text' : 'password'}
                      value={managerPassword}
                      onChange={(e) => setManagerPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowManagerPassword(!showManagerPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showManagerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Manager Capabilities Highlights */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 py-1 font-sans">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>ক্লায়েন্ট ডাটাবেস ও কালেকশন</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>লাইনম্যান ও স্টাফ অ্যাসাইনমেন্ট</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>মাসিক রাজস্ব ও ইনভয়েস রিপোর্ট</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>সাপোর্ট টিকিট ও রি-ডিসপ্যাচ</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>{language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Authorizing session...'}</span>
                    ) : (
                      <>
                        <span>{language === 'bn' ? 'ব্রাঞ্চ ম্যানেজার প্যানেলে প্রবেশ করুন' : 'Enter Branch Manager Workspace'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. NOC (NETWORK OPERATIONS CENTER) PORTAL */}
          {/* ========================================================= */}
          {activeTab === 'noc' && (
            <div className="space-y-5">
              {/* Recharts Live Fiber Telemetry Visualizer */}
              <NocTelemetryCharts />

              {/* Real-time Emergency Tickets Preview */}
              <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                    </span>
                    <h3 className="text-xs font-black text-white flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-rose-400" />
                      {language === 'bn' ? 'NOC লাইভ ফাইবার টিকিট মনিটর' : 'NOC Real-time Incident Feed'}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenSupportTicket('admin_portal')}
                    className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-bold border border-rose-500/30 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'সকল টিকিট দেখুন' : 'Open Ticket Console'}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div
                    onClick={() => onOpenSupportTicket('admin_portal')}
                    className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 text-xs flex items-center justify-between gap-2 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-mono font-bold text-[10px] shrink-0 border border-rose-500/30">
                        #TK-1082
                      </span>
                      <div className="truncate">
                        <span className="font-bold text-slate-200 group-hover:text-white">DM-1001 (মিঠাপুকুর সদর)</span>
                        <span className="text-[11px] text-slate-400 block truncate">🔴 Red LOS Optical Core Cut near Akmal Market</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-500/40">
                        Emergency
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => onOpenSupportTicket('admin_portal')}
                    className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 text-xs flex items-center justify-between gap-2 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-mono font-bold text-[10px] shrink-0 border border-amber-500/30">
                        #TK-1080
                      </span>
                      <div className="truncate">
                        <span className="font-bold text-slate-200 group-hover:text-white">DM-1045 (বলদপুকুর বাজার)</span>
                        <span className="text-[11px] text-slate-400 block truncate">High optical loss (-27 dBm) drop wire bend</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                        Dispatched
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NOC Admin Login Form */}
              <form onSubmit={handleNocLogin} className="space-y-3.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Server className="h-4 w-4 text-rose-400" />
                    {language === 'bn' ? 'NOC ইঞ্জিনিয়ার ও টেকনিক্যাল লগইন' : 'NOC Engineer Technical Login'}
                  </span>
                  <button
                    type="button"
                    onClick={fillNocDemo}
                    className="text-[11px] text-rose-400 hover:text-rose-300 underline cursor-pointer font-mono"
                  >
                    {language === 'bn' ? '⚡ ডেমো অটো-ফিল' : '⚡ Auto Fill Demo'}
                  </button>
                </div>

                <div>
                  <div className="relative">
                    <Server className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={nocEmail}
                      onChange={(e) => setNocEmail(e.target.value)}
                      placeholder="noc@deltamithapukur.net"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showNocPassword ? 'text' : 'password'}
                      value={nocPassword}
                      onChange={(e) => setNocPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNocPassword(!showNocPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showNocPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>{language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying clearance...'}</span>
                    ) : (
                      <>
                        <span>{language === 'bn' ? 'NOC কন্ট্রোল রুমে প্রবেশ করুন' : 'Authorize NOC Session'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenSupportTicket('ai_diagnostics')}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Open AI Optical Loss Diagnostics"
                  >
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">AI Line Scan</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. CLIENT PORTAL */}
          {/* ========================================================= */}
          {activeTab === 'client' && (
            <div className="space-y-4">
              <form onSubmit={handleClientLogin} className="space-y-4 bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">
                    {language === 'bn' ? 'গ্রাহক আইডি (Customer CID)' : 'Customer CID / Account ID'}
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fillClientDemo('DM-1001')}
                      className="px-2 py-0.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30 cursor-pointer"
                    >
                      DM-1001
                    </button>
                    <button
                      type="button"
                      onClick={() => fillClientDemo('DM-1045')}
                      className="px-2 py-0.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30 cursor-pointer"
                    >
                      DM-1045
                    </button>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      placeholder="e.g. DM-1001, DM-1045, DM-1088"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono uppercase"
                      autoFocus
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {language === 'bn' ? '💡 আপনার মাসিক বিল রশিদে থাকা CID কোডটি লিখুন।' : '💡 Enter your ISP Account CID to view invoices, speed stats, and open tickets.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {language === 'bn' ? 'রেজিস্টার্ড মোবাইল নম্বর (ঐচ্ছিক)' : 'Registered Mobile Number (Optional)'}
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>{language === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Authenticating...'}</span>
                  ) : (
                    <>
                      <span>{language === 'bn' ? 'গ্রাহক ড্যাশবোর্ডে প্রবেশ করুন' : 'Enter Client Self-Care Portal'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Customer Support Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenSupportTicket('create')}
                  className="p-3 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-left flex items-start gap-3 transition-all cursor-pointer group"
                >
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 group-hover:scale-110 transition-transform">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-rose-200">
                      {language === 'bn' ? '🔴 লাল বাতি / ফাইবার সমস্যা' : '🔴 Red LOS Ticket'}
                    </strong>
                    <p className="text-[11px] text-rose-300/80 leading-tight mt-0.5">
                      {language === 'bn' ? 'সরাসরি স্প্লাইসিং টিকিট ওপেন করুন।' : 'Emergency fiber drop repair.'}
                    </p>
                  </div>
                </button>

                <a
                  href="https://wa.me/8801777085720?text=Hello%20Delta%20Mithapukur%20Support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-left flex items-start gap-3 transition-all cursor-pointer group"
                >
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-emerald-200">
                      {language === 'bn' ? '💬 হোয়াটসঅ্যাপ ২৪/৭ হটলাইন' : '💬 WhatsApp Helpdesk'}
                    </strong>
                    <p className="text-[11px] text-emerald-300/80 leading-tight mt-0.5">
                      {language === 'bn' ? 'ম্যানেজার চ্যাট: 01777085720' : 'Direct support: 01777085720'}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Quick Direct Actions Footer Bar */}
          <div className="mt-6 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => onOpenSupportTicket('create')}
              className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <LifeBuoy className="h-3.5 w-3.5" />
              <span>{language === 'bn' ? 'সরাসরি সাপোর্ট টিকিট খুলুন' : 'Open Ticket without Login'}</span>
            </button>

            <button
              type="button"
              onClick={onExplorePublicWebsite}
              className="text-slate-400 hover:text-slate-200 font-semibold cursor-pointer underline underline-offset-2"
            >
              {language === 'bn' ? 'প্যাকেজ ও স্পিড টেস্ট দেখুন →' : 'View Packages & Coverage →'}
            </button>
          </div>

        </div>
      </main>

      {/* Footer Credentials Info */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-3.5 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Delta Infocom Mithapukur. All Rights Reserved.
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            Akmal Market 2nd Floor, Boldipukur • 24/7 Hotline: {BRANCH_INFO.phone}
          </span>
        </div>
      </footer>

    </div>
  );
};

