import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Layers, 
  Gauge, 
  Tag, 
  MapPin, 
  Activity, 
  HelpCircle, 
  Phone, 
  Database, 
  LifeBuoy, 
  LogIn, 
  Smartphone, 
  Sparkles,
  Wifi
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BreadcrumbNavProps {
  currentView?: 'public_website' | 'login_portal' | 'dashboard';
  activeModal?: 'none' | 'client_portal' | 'support_ticket' | 'apk_download' | 'faq' | 'inquiry';
  supportTicketTab?: string;
  onNavigateHome?: () => void;
  onOpenClientPortal?: () => void;
  onOpenSupportTicket?: (tab?: any) => void;
  onOpenFastLogin?: () => void;
  onOpenDownloadApk?: () => void;
  onOpenFaq?: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  currentView = 'public_website',
  activeModal = 'none',
  supportTicketTab,
  onNavigateHome,
  onOpenClientPortal,
  onOpenSupportTicket,
  onOpenFastLogin,
  onOpenDownloadApk,
  onOpenFaq,
  onScrollToSection
}) => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'services', 'speed-test', 'pricing', 'coverage', 'network-resilience', 'resilience', 'faq', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId === 'network-resilience' ? 'resilience' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const targetId = sectionId === 'resilience' ? 'network-resilience' : sectionId;
      const element = document.getElementById(targetId) || document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getSectionName = (sectionId: string) => {
    switch (sectionId) {
      case 'services':
        return language === 'bn' ? 'সার্ভিসসমূহ' : 'Services';
      case 'speed-test':
        return language === 'bn' ? 'স্পিড টেস্ট' : 'Speed Test';
      case 'pricing':
        return language === 'bn' ? 'প্যাকেজ ও মূল্য' : 'Packages & Pricing';
      case 'coverage':
        return language === 'bn' ? 'কভারেজ ম্যাপ' : 'Coverage Map';
      case 'resilience':
        return language === 'bn' ? 'নেটওয়ার্ক হেলথ' : 'Network Health';
      case 'faq':
        return language === 'bn' ? 'প্রশ্নোত্তর' : 'FAQs';
      case 'contact':
        return language === 'bn' ? 'যোগাযোগ' : 'Contact';
      default:
        return language === 'bn' ? 'ওভারভিউ' : 'Overview';
    }
  };

  // Determine current path components
  const pathItems: Array<{ label: string; icon: React.ReactNode; onClick?: () => void; isCurrent?: boolean; badge?: string }> = [
    {
      label: language === 'bn' ? 'হোম (মিঠাপুকুর শাখা)' : 'Home (Mithapukur)',
      icon: <Home className="h-3.5 w-3.5 text-blue-400" />,
      onClick: onNavigateHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    }
  ];

  if (currentView === 'login_portal') {
    pathItems.push({
      label: language === 'bn' ? 'ইউনিফাইড লগইন পোর্টাল' : 'Unified Login Portal',
      icon: <LogIn className="h-3.5 w-3.5 text-indigo-400" />,
      isCurrent: true
    });
  } else if (currentView === 'dashboard') {
    pathItems.push({
      label: language === 'bn' ? 'কমান্ড ড্যাশবোর্ড' : 'NOC & Manager Dashboard',
      icon: <Activity className="h-3.5 w-3.5 text-cyan-400" />,
      isCurrent: true
    });
  } else if (activeModal === 'client_portal') {
    pathItems.push({
      label: language === 'bn' ? 'ক্লায়েন্ট ডিবি ও মার্কেটিং পোর্টাল' : 'Client DB & Marketing Portal',
      icon: <Database className="h-3.5 w-3.5 text-emerald-400" />,
      isCurrent: true,
      badge: 'Manager'
    });
  } else if (activeModal === 'support_ticket') {
    const tabLabel = supportTicketTab === 'client_portal' 
      ? (language === 'bn' ? 'ক্লায়েন্ট পোর্টাল' : 'Client Self-Care')
      : supportTicketTab === 'admin_portal'
      ? (language === 'bn' ? 'ব্রাঞ্চ সাপোর্ট ডেস্ক' : 'Branch Support Desk')
      : supportTicketTab === 'client_db'
      ? (language === 'bn' ? 'গ্রাহক ডেটাবেজ' : 'Client DB')
      : supportTicketTab === 'noc_telemetry'
      ? (language === 'bn' ? 'NOC টেলিমেট্রি' : 'NOC Telemetry')
      : (language === 'bn' ? 'সাপোর্ট টিকিট' : 'Support Ticket');

    pathItems.push({
      label: language === 'bn' ? 'সাপোর্ট ও ম্যানেজমেন্ট হাব' : 'Support & Management Hub',
      icon: <LifeBuoy className="h-3.5 w-3.5 text-cyan-400" />,
      onClick: () => onOpenSupportTicket && onOpenSupportTicket()
    });
    pathItems.push({
      label: tabLabel,
      icon: <ChevronRight className="h-3.5 w-3.5 text-slate-500" />,
      isCurrent: true
    });
  } else if (activeModal === 'apk_download') {
    pathItems.push({
      label: language === 'bn' ? 'অ্যান্ড্রয়েড অ্যাপ ডাউনলোড' : 'Android APK Download',
      icon: <Smartphone className="h-3.5 w-3.5 text-teal-400" />,
      isCurrent: true
    });
  } else {
    // Standard section breadcrumb
    pathItems.push({
      label: getSectionName(activeSection),
      icon: activeSection === 'speed-test' ? <Gauge className="h-3.5 w-3.5 text-blue-400" /> :
            activeSection === 'pricing' ? <Tag className="h-3.5 w-3.5 text-emerald-400" /> :
            activeSection === 'coverage' ? <MapPin className="h-3.5 w-3.5 text-indigo-400" /> :
            activeSection === 'resilience' ? <Activity className="h-3.5 w-3.5 text-cyan-400" /> :
            <Layers className="h-3.5 w-3.5 text-slate-400" />,
      isCurrent: true
    });
  }

  return (
    <nav
      id="app-breadcrumb-bar"
      aria-label="Breadcrumb Navigation"
      className="bg-slate-900/85 backdrop-blur-xl border-b border-slate-800/80 sticky top-16 z-30 shadow-lg shadow-black/20 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          
          {/* Main Breadcrumb Trail */}
          <ol className="flex items-center gap-1.5 text-xs font-medium shrink-0">
            {pathItems.map((item, index) => {
              const isLast = index === pathItems.length - 1;
              return (
                <li key={index} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" aria-hidden="true" />
                  )}
                  {item.isCurrent || isLast ? (
                    <span 
                      aria-current="page"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20 whitespace-nowrap shadow-xs"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-blue-600/30 text-blue-200 font-extrabold ml-0.5">
                          {item.badge}
                        </span>
                      )}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Quick Jump Section Links & Portal Switchers */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold shrink-0">
            <span className="text-slate-500 mr-1 text-[10px] uppercase tracking-wider">
              {language === 'bn' ? 'দ্রুত যান:' : 'Jump to:'}
            </span>

            <button
              onClick={() => handleSectionClick('speed-test')}
              className={`px-2 py-0.8 rounded-md transition-colors cursor-pointer ${
                activeSection === 'speed-test'
                  ? 'bg-blue-600/20 text-blue-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {language === 'bn' ? 'স্পিড টেস্ট' : 'Speed Test'}
            </button>

            <button
              onClick={() => handleSectionClick('pricing')}
              className={`px-2 py-0.8 rounded-md transition-colors cursor-pointer ${
                activeSection === 'pricing'
                  ? 'bg-emerald-600/20 text-emerald-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {language === 'bn' ? 'প্যাকেজ' : 'Packages'}
            </button>

            <button
              onClick={() => handleSectionClick('coverage')}
              className={`px-2 py-0.8 rounded-md transition-colors cursor-pointer ${
                activeSection === 'coverage'
                  ? 'bg-indigo-600/20 text-indigo-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {language === 'bn' ? 'কভারেজ' : 'Coverage'}
            </button>

            <button
              onClick={() => handleSectionClick('resilience')}
              className={`px-2 py-0.8 rounded-md transition-colors cursor-pointer ${
                activeSection === 'resilience'
                  ? 'bg-cyan-600/20 text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {language === 'bn' ? 'লাইভ স্ট্যাটাস' : 'Live Status'}
            </button>

            {/* Quick Portals */}
            <div className="h-3.5 w-px bg-slate-800 mx-1" />

            {onOpenSupportTicket && (
              <button
                onClick={() => onOpenSupportTicket('client_portal')}
                className="inline-flex items-center gap-1 px-2 py-0.8 rounded-md text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors cursor-pointer font-bold"
                title="Open Client Self-Care Portal"
              >
                <LifeBuoy className="h-3 w-3" />
                <span>{language === 'bn' ? 'সেল্ফ কেয়ার' : 'Self-Care'}</span>
              </button>
            )}

            {onOpenFastLogin && (
              <button
                onClick={onOpenFastLogin}
                className="inline-flex items-center gap-1 px-2 py-0.8 rounded-md text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 transition-colors cursor-pointer font-bold"
                title="Unified Fast Login"
              >
                <LogIn className="h-3 w-3" />
                <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
