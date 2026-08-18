import React, { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, X, ArrowRight, Clock, ShieldCheck, Gift, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TopPromoBannerProps {
  onClaimOffer?: () => void;
  onViewPricing?: () => void;
  onOpenSupportTicket?: () => void;
}

export const TopPromoBanner: React.FC<TopPromoBannerProps> = ({
  onClaimOffer,
  onViewPricing,
  onOpenSupportTicket,
}) => {
  const { language } = useLanguage();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'offer' | 'maintenance'>('offer');
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 45,
    seconds: 18,
  });

  // Check dismissal state in session storage
  useEffect(() => {
    const dismissed = sessionStorage.getItem('delta_top_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  // Countdown timer for limited-time promotional offer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('delta_top_banner_dismissed', 'true');
  };

  const handleReopen = () => {
    setIsDismissed(false);
    sessionStorage.removeItem('delta_top_banner_dismissed');
  };

  const handleActionClick = () => {
    if (activeTab === 'offer') {
      if (onClaimOffer) {
        onClaimOffer();
      } else {
        const pricingEl = document.getElementById('pricing') || document.getElementById('contact');
        pricingEl?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (onOpenSupportTicket) {
        onOpenSupportTicket();
      } else {
        const servicesEl = document.getElementById('services');
        servicesEl?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Minimized floating re-open pill when dismissed
  if (isDismissed) {
    return (
      <div className="fixed top-2 right-20 z-[60] animate-fadeIn hidden md:block">
        <button
          onClick={handleReopen}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 text-[11px] font-bold text-amber-300 border border-amber-500/40 shadow-lg backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          title={language === 'bn' ? 'অফার ও নোটিশ ব্যানার দেখুন' : 'Show Offers & Alerts Banner'}
        >
          <Gift className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>{language === 'bn' ? 'অফার দেখুন' : 'View Offers'}</span>
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Special Offers and Service Alerts" className="relative z-50 bg-gradient-to-r from-indigo-950 via-slate-950 to-blue-950 text-slate-100 border-b border-blue-900/40 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs">
        {/* Left Side: Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('offer')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
              activeTab === 'offer'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-sm ring-1 ring-white/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>{language === 'bn' ? '🔥 বিশেষ অফার' : '🔥 Limited Offer'}</span>
          </button>

          <button
            onClick={() => setActiveTab('maintenance')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
              activeTab === 'maintenance'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm ring-1 ring-white/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-amber-200" />
            <span>{language === 'bn' ? '🔔 সার্ভিস অ্যালার্ট' : '🔔 Service Notice'}</span>
          </button>
        </div>

        {/* Center: Dynamic Message & Urgency Indicator */}
        <div className="flex-1 flex items-center justify-center text-center px-1 overflow-hidden">
          {activeTab === 'offer' ? (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-black border border-amber-400/30 flex items-center gap-1">
                <Gift className="w-3 h-3" />
                {language === 'bn' ? '৫০% ছাড় ও ফ্রি রাউটার' : '50% Off Setup + Free Router'}
              </span>
              <span className="font-semibold text-slate-200">
                {language === 'bn'
                  ? 'মিঠাপুকুরের সকল ইউনিয়নে নতুন ফাইবার সংযোগে পাচ্ছেন ১ মাস ফ্রি ইন্টারনেট বোনাস!'
                  : 'Get free optical fiber line installation & 1 Month Free on annual subscriptions across Mithapukur!'}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-amber-300/90 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400">{language === 'bn' ? 'বাকি' : 'left'}</span>
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-black border border-emerald-400/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {language === 'bn' ? 'নেটওয়ার্ক ১০০% স্বাভাবিক' : 'Core Network 100% Online'}
              </span>
              <span className="font-semibold text-slate-200">
                {language === 'bn'
                  ? 'মিঠাপুকুর আকবরিয়া ও বলদিপুকুর নোডে বিডিআইএক্স ও ক্যাশ সার্ভার অপ্টিমাইজেশন সম্পন্ন।'
                  : 'Scheduled upstream fiber routing optimization completed. Latency under 5ms.'}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: CTA Button & Dismiss Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleActionClick}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-[11px] shadow-sm hover:shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>
              {activeTab === 'offer'
                ? language === 'bn'
                  ? 'অফার নিন'
                  : 'Claim Offer'
                : language === 'bn'
                ? 'হেল্পডেস্ক'
                : 'Help Desk'}
            </span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Dismiss (Close) Button */}
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer"
            title={language === 'bn' ? 'ব্যানারটি বন্ধ করুন' : 'Dismiss Banner'}
            aria-label="Dismiss Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
