import React from 'react';
import { Logo } from './Logo';
import { Zap, ShieldCheck, Activity, MapPin, ArrowRight, CheckCircle2, Users } from 'lucide-react';
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
              <div className="flex items-center gap-2.5 bg-slate-800/80 hover:bg-slate-800/95 border border-slate-700/80 hover:border-emerald-500/50 p-2.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10 group cursor-default">
                <div className="p-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(16,185,129,0.5)] transition-all">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                </div>
                <span className="text-xs font-bold text-slate-100 group-hover:text-white transition-colors">
                  {language === 'bn' ? '৯৯.৯% আপটাইম' : '99.9% Fiber Uptime'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-800/80 hover:bg-slate-800/95 border border-slate-700/80 hover:border-sky-500/50 p-2.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/10 group cursor-default">
                <div className="p-1.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.5)] transition-all">
                  <Zap className="h-4 w-4 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
                </div>
                <span className="text-xs font-bold text-slate-100 group-hover:text-white transition-colors">
                  {language === 'bn' ? 'বাফারহীন স্ট্রিম' : 'Zero Buffer Streaming'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-800/80 hover:bg-slate-800/95 border border-slate-700/80 hover:border-amber-500/50 p-2.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 group cursor-default col-span-2 sm:col-span-1">
                <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(245,158,11,0.5)] transition-all">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                </div>
                <span className="text-xs font-bold text-slate-100 group-hover:text-white transition-colors">
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
                  <span className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider">
                    <Activity className="h-3.5 w-3.5 animate-pulse" />
                    {language === 'bn' ? 'ব্রাঞ্চ নেটওয়ার্ক লাইভ' : 'BRANCH NETWORK LIVE'}
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
                {/* Honored Delta Family Members List */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900/90 to-slate-950/90 border border-blue-500/30 shadow-lg space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-sky-300 font-black text-xs flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-sky-400" />
                      <span>{language === 'bn' ? 'সম্মানিত ডেল্টা পরিবারের সদস্য' : 'Honored Delta Family Members'}</span>
                    </span>
                    <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {language === 'bn' ? '৬ জন প্রতিনিধি' : '6 Key Representatives'}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      { nameBn: 'মাহামুদুল হাসান', nameEn: 'Mahamudul Hasan', areaBn: 'বলদীপুকুর', areaEn: 'Boldipukur' },
                      { nameBn: 'মোক্কাবার মিয়া', nameEn: 'Mokkabar Mia', areaBn: 'শানেরহাট', areaEn: 'Shanerhat' },
                      { nameBn: 'গোলাম রব্বানি', nameEn: 'Golam Rabbani', areaBn: 'মগঙ্ঘাট', areaEn: 'Moganghat' },
                      { nameBn: 'জাহাঙ্গীর আলম', nameEn: 'Jahangir Alam', areaBn: 'দরগা', areaEn: 'Dorga' },
                      { nameBn: 'মশিয়র রহমান', nameEn: 'Moshiur Rahman', areaBn: 'চাতালবাজার', areaEn: 'Chatalbazar' },
                      { nameBn: 'রাব্বি হাসান', nameEn: 'Rabbi Hasan', areaBn: 'শাল্লাইপুর', areaEn: 'Shallaipur' },
                    ].map((member, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between gap-1.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/90 transition-all group"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                          <span className="font-bold text-slate-100 group-hover:text-white truncate text-[11px]">
                            {language === 'bn' ? member.nameBn : member.nameEn}
                          </span>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-500/10 text-sky-300 border border-blue-500/20 shrink-0">
                          {language === 'bn' ? member.areaBn : member.areaEn}
                        </span>
                      </li>
                    ))}
                  </ul>
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
