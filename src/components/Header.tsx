import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, Menu, X, Wifi, ShieldCheck, Gauge, Sparkles, ArrowRight, Tag, LogIn, UserPlus, LifeBuoy, ExternalLink } from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenInquiryModal: () => void;
  onOpenClientPortal?: () => void;
  onOpenSupportTicket?: () => void;
  onOpenFastLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiryModal, onOpenClientPortal, onOpenSupportTicket, onOpenFastLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasPendingAdminResponse, setHasPendingAdminResponse] = useState<boolean>(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkPendingResponse = () => {
      try {
        const savedTickets = localStorage.getItem('delta_support_tickets');
        if (!savedTickets) {
          setHasPendingAdminResponse(true);
          return;
        }

        const tickets: any[] = JSON.parse(savedTickets);
        const savedClientData = sessionStorage.getItem('delta_client_data');
        const clientData = savedClientData ? JSON.parse(savedClientData) : null;

        const userPhone = clientData?.phone || '01712001122';
        const userId = clientData?.id || 'DLT-1001';

        const readUpdates = JSON.parse(localStorage.getItem('delta_read_ticket_updates') || '{}');

        const pending = tickets.some(ticket => {
          const matchesUser =
            ticket.phone === userPhone ||
            ticket.customerId === userId ||
            ticket.customerId === 'DF-MITH-1024' ||
            ticket.phone === '01712001122';

          if (!matchesUser) return false;

          const hasAdminUpdate = ticket.updates?.some(
            (u: any) =>
              u.author?.includes('Branch Manager') ||
              u.author?.includes('Admin') ||
              u.author?.includes('NOC') ||
              u.author?.includes('Engineer') ||
              u.author?.includes('Squad') ||
              u.author?.includes('Dispatcher')
          );

          if (!hasAdminUpdate) return false;

          const lastUpdate = ticket.updates?.[0]?.text || '';
          return readUpdates[ticket.id] !== lastUpdate;
        });

        setHasPendingAdminResponse(pending);
      } catch (e) {
        setHasPendingAdminResponse(false);
      }
    };

    checkPendingResponse();
    const interval = setInterval(checkPendingResponse, 2000);
    window.addEventListener('storage', checkPendingResponse);
    window.addEventListener('focus', checkPendingResponse);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkPendingResponse);
      window.removeEventListener('focus', checkPendingResponse);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl" id="app-header">
      {/* Top Scrolling Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-slate-100 border-b border-blue-800/40 py-1.5 px-3 text-xs overflow-hidden relative group shadow-inner">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <div className="shrink-0 flex items-center gap-1.5 bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider shadow-sm z-10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>MITHAPUKUR OFFER</span>
          </div>

          <div className="overflow-hidden relative w-full flex items-center">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 group-hover:[animation-play-state:paused] text-xs font-medium text-slate-200">
              <span className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">🎉 Special Fiber Offer:</span>
                <span>50% OFF Fiber Installation Charge across all 17 Unions in Mithapukur Upazila!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">🎁 Free Wi-Fi Router:</span>
                <span>Complimentary Dual-Band Gigabit Router with 20 Mbps & higher packages!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">⚡ Express 24h Setup:</span>
                <span>Same-Day Fiber Drop Wire Installation & 24/7 NOC Hotline Support (01712-001122)!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">🎓 Advance Payment Bonus:</span>
                <span>Pay 6 Months in advance and get 1 Month FREE Fiber Internet!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>

              {/* Duplicate for smooth continuous marquee loop */}
              <span className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">🎉 Special Fiber Offer:</span>
                <span>50% OFF Fiber Installation Charge across all 17 Unions in Mithapukur Upazila!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">🎁 Free Wi-Fi Router:</span>
                <span>Complimentary Dual-Band Gigabit Router with 20 Mbps & higher packages!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-blue-400 font-bold">⚡ Express 24h Setup:</span>
                <span>Same-Day Fiber Drop Wire Installation & 24/7 NOC Hotline Support (01712-001122)!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>
              <span className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">🎓 Advance Payment Bonus:</span>
                <span>Pay 6 Months in advance and get 1 Month FREE Fiber Internet!</span>
              </span>
              <span className="text-slate-600 font-bold">•</span>
            </div>
          </div>

          <button
            onClick={onOpenInquiryModal}
            className="shrink-0 z-10 hidden sm:flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded text-[11px] transition-all hover:scale-105 shadow-sm whitespace-nowrap cursor-pointer"
          >
            <span>Claim Offer</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1">
              <Logo size="md" lightText={true} />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5">
            <a href="#home" className="text-sm font-semibold text-slate-200 hover:text-blue-400 inline-block transition-all duration-200 hover:scale-105 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.85)]">
              {t('nav_home')}
            </a>
            <a href="#services" className="text-sm font-semibold text-slate-200 hover:text-blue-400 inline-block transition-all duration-200 hover:scale-105 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.85)]">
              {t('nav_services')}
            </a>
            <a href="#speed-test" className="text-sm font-semibold text-blue-400 hover:text-blue-300 inline-block transition-all duration-200 flex items-center gap-1 hover:scale-105 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.85)]">
              <Gauge className="h-3.5 w-3.5" />
              {t('nav_speedtest')}
            </a>
            <a href="#pricing" className="text-sm font-semibold text-slate-200 hover:text-blue-400 inline-block transition-all duration-200 hover:scale-105 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.85)]">
              {t('nav_plans')}
            </a>
            <a href="#coverage" className="text-sm font-semibold text-slate-200 hover:text-blue-400 inline-block transition-all duration-200 hover:scale-105 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.85)]">
              {t('nav_coverage')}
            </a>
            <a href="#referral" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-block transition-all duration-200 hover:scale-105 hover:[text-shadow:0_0_12px_rgba(52,211,153,0.85)]">
              {t('nav_referral')}
            </a>
            <a href="#contact" className="text-sm font-semibold text-slate-200 hover:text-blue-400 inline-block transition-all duration-200 hover:scale-105 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.85)]">
              {t('nav_contact')}
            </a>
          </nav>

          {/* Hotline, Self Care, Support Ticket, Network Status & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenFastLogin || onOpenSupportTicket}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs px-3 py-2 rounded-xl shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 border border-amber-300/40"
              title="Fast Login for Branch Manager & NOC (Email + Password)"
            >
              <ShieldCheck className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>⚡ Fast Login</span>
            </button>

            <a
              href="https://radius.yetfix.com/customer_login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs px-3 py-2 rounded-xl shadow-md shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 border border-amber-300/40"
              title="Customer Self Care Portal Login"
            >
              <LogIn className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{t('self_care')}</span>
            </a>

            <button
              onClick={onOpenClientPortal}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-extrabold text-xs px-3 py-2 rounded-xl shadow-md shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0 border border-indigo-400/30"
              title="Open Delta Client Database & Marketing Portal"
            >
              <UserPlus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{t('add_client')}</span>
            </button>
          </div>

          {/* Mobile Language Switcher, Status Indicator, Theme Toggle & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenSupportTicket}
              className="flex items-center gap-1 bg-gradient-to-r from-rose-600 to-orange-600 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-lg shadow-md shrink-0 border border-rose-400/30"
              title="Support Ticket Portal"
            >
              <LifeBuoy className="h-3.5 w-3.5 stroke-[2.5] text-amber-300" />
              <span>Ticket</span>
            </button>

            <a
              href="https://radius.yetfix.com/customer_login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-2.5 py-1.5 rounded-lg shadow-md shrink-0 border border-amber-300/40"
              title="Customer Self Care Login"
            >
              <LogIn className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{t('self_care')}</span>
            </a>

            <button
              onClick={onOpenClientPortal}
              className="flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-lg shadow-md shrink-0 border border-indigo-400/30"
              title="Open Client Database"
            >
              <UserPlus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{t('add_client')}</span>
            </button>

            <LanguageSwitcher />
            <ThemeToggle showLabel={false} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white bg-slate-800 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Language / ভাষা</span>
            <LanguageSwitcher showFullLabel={true} />
          </div>

          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            {t('nav_home')}
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            {t('nav_services')}
          </a>
          <a
            href="#speed-test"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-blue-400 hover:bg-slate-800 rounded-lg flex items-center gap-2"
          >
            <Gauge className="h-4 w-4" />
            {t('nav_speedtest')}
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            {t('nav_plans')}
          </a>
          <a
            href="#coverage"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            {t('nav_coverage')}
          </a>
          <a
            href="#referral"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-slate-800 rounded-lg"
          >
            🎁 {t('nav_referral')}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            {t('nav_contact')}
          </a>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenFastLogin) onOpenFastLogin();
                else if (onOpenSupportTicket) onOpenSupportTicket();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md border border-amber-300/40 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
              <span>⚡ Fast Login (Manager & NOC)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSupportTicket?.();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-rose-600 via-orange-600 to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md border border-rose-400/30"
            >
              <LifeBuoy className="h-4 w-4 stroke-[2.5] text-amber-300" />
              Delta Support Ticket Portal
            </button>
            <a
              href="https://radius.yetfix.com/customer_login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md border border-amber-300/40"
            >
              <LogIn className="h-4 w-4 stroke-[2.5]" />
              {t('self_care')} ({t('customer_login')})
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenClientPortal?.();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md border border-indigo-400/30"
            >
              <UserPlus className="h-4 w-4 stroke-[2.5]" />
              {t('add_client')} & {t('client_database')}
            </button>
            <a
              href={`tel:${BRANCH_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 text-slate-100 font-bold text-xs rounded-xl border border-slate-700"
            >
              <Phone className="h-4 w-4 text-blue-400" />
              {t('call_now')} ({BRANCH_INFO.phone})
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiryModal();
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Wifi className="h-4 w-4" />
              {t('apply_new_connection')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
