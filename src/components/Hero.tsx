import React from 'react';
import { Logo } from './Logo';
import { Zap, ShieldCheck, Activity, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenInquiryModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiryModal }) => {
  const { t, language } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 text-white">
      {/* Background Glow FX */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {t('hero_title_1')} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                {t('hero_title_2')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {language === 'bn' ? '৯৯.৯% আপটাইম' : '99.9% Fiber Uptime'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {language === 'bn' ? 'বাফারহীন স্ট্রিম' : 'Zero Buffer Streaming'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">
                  {language === 'bn' ? '২৪/৭ ব্রাঞ্চ সাপোর্ট' : '24/7 Branch Desk'}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenInquiryModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t('hero_cta_primary')}</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-base px-6 py-4 rounded-xl border border-slate-700 transition-all hover:scale-105 hover:[text-shadow:0_0_12px_rgba(59,130,246,0.8)]"
              >
                {language === 'bn' ? 'প্যাকেজ ও ফি দেখুন' : 'View Packages & Fees'}
              </a>
            </div>

            {/* Branch Manager Note */}
            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2">
              <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
              <span>
                {language === 'bn' ? 'অফিস: ' : 'Office: '}
                <strong className="text-slate-200">{language === 'bn' ? 'বলদপুকুর বাজার আকমল মার্কেট' : 'Boldipukur Bazaar Akmal Market'}</strong>
                {' • '}
                {language === 'bn' ? 'ম্যানেজার: ' : 'Manager: '}
                <strong className="text-slate-200">{BRANCH_INFO.manager}</strong>
              </span>
            </div>
          </div>

          {/* Right Hero Card Showcase featuring Official Logo Badge */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl">
              
              {/* Card Header with Official Logo */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-5 mb-6">
                <Logo size="lg" lightText={true} />
              </div>

              {/* Speed Meter Feature Box */}
              <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 mb-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Activity className="h-3.5 w-3.5 animate-pulse" />
                    {language === 'bn' ? 'নেটওয়ার্ক সচল' : 'NETWORK LIVE'}
                  </span>
                  <span>LATENCY: 4ms</span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-white">{t('stat_speed')}</span>
                  </div>
                  <span className="text-xs bg-blue-500/10 text-blue-300 font-semibold px-2.5 py-1 rounded-md border border-blue-500/20">
                    {t('stat_speed_label')}
                  </span>
                </div>

                {/* Simulated speed bar */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 h-full w-[92%] rounded-full animate-pulse" />
                </div>
              </div>

              {/* Quick Branch Info Grid */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-slate-400">{language === 'bn' ? 'শাখার নাম:' : 'Branch Name:'}</span>
                  <span className="font-bold text-slate-100">{BRANCH_INFO.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-slate-400">{language === 'bn' ? 'ট্যাগলাইন:' : 'Brand Tagline:'}</span>
                  <span className="font-bold text-blue-300">{BRANCH_INFO.tagline}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-slate-400">{language === 'bn' ? 'হটলাইন:' : 'Direct Hotline:'}</span>
                  <a href={`tel:${BRANCH_INFO.phone}`} className="font-bold text-emerald-400 hover:underline">
                    {BRANCH_INFO.phone}
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
