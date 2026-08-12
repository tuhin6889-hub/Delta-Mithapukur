import React from 'react';
import { motion } from 'motion/react';
import { PLANS } from '../data/plans';
import { Plan } from '../types';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Gauge, Phone, MessageSquare } from 'lucide-react';
import { FiberVsMobileComparison } from './FiberVsMobileComparison';

interface PricingProps {
  onSelectPlan: (plan: Plan) => void;
}

// Enhanced Plan card visual color ribbon themes matching the poster photo
const PLAN_COLOR_THEMES: Record<string, {
  ribbonBg: string;
  ribbonFoldBg: string;
  glowShadow: string;
  priceBadgeBorder: string;
  borderColor: string;
  btnBg: string;
  accentText: string;
  checkIconColor: string;
}> = {
  student: {
    ribbonBg: 'from-sky-500 via-sky-600 to-blue-600',
    ribbonFoldBg: 'bg-sky-800',
    glowShadow: 'group-hover:shadow-[0_15px_35px_rgba(14,165,233,0.35)]',
    priceBadgeBorder: 'border-sky-500/40 text-sky-400 bg-sky-950/60',
    borderColor: 'border-sky-500/30 hover:border-sky-400',
    btnBg: 'bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/30',
    accentText: 'text-sky-400',
    checkIconColor: 'text-sky-400'
  },
  bachelor: {
    ribbonBg: 'from-emerald-500 via-teal-600 to-teal-700',
    ribbonFoldBg: 'bg-teal-900',
    glowShadow: 'group-hover:shadow-[0_15px_35px_rgba(20,184,166,0.35)]',
    priceBadgeBorder: 'border-teal-500/40 text-teal-400 bg-teal-950/60',
    borderColor: 'border-teal-500/30 hover:border-teal-400',
    btnBg: 'bg-gradient-to-r from-emerald-500 via-teal-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-teal-500/30',
    accentText: 'text-teal-400',
    checkIconColor: 'text-teal-400'
  },
  couple: {
    ribbonBg: 'from-purple-500 via-indigo-600 to-violet-700',
    ribbonFoldBg: 'bg-purple-900',
    glowShadow: 'group-hover:shadow-[0_15px_35px_rgba(168,85,247,0.35)]',
    priceBadgeBorder: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
    borderColor: 'border-purple-500/30 hover:border-purple-400',
    btnBg: 'bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-purple-500/30',
    accentText: 'text-purple-400',
    checkIconColor: 'text-purple-400'
  },
  family: {
    ribbonBg: 'from-amber-400 via-orange-500 to-amber-600',
    ribbonFoldBg: 'bg-amber-800',
    glowShadow: 'group-hover:shadow-[0_20px_45px_rgba(245,158,11,0.45)]',
    priceBadgeBorder: 'border-amber-400 text-amber-300 bg-amber-950/80',
    borderColor: 'border-2 border-amber-400/90 shadow-xl shadow-amber-500/10',
    btnBg: 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black shadow-amber-500/50',
    accentText: 'text-amber-400',
    checkIconColor: 'text-amber-400'
  },
  joint_family: {
    ribbonBg: 'from-blue-600 via-indigo-700 to-slate-900',
    ribbonFoldBg: 'bg-blue-950',
    glowShadow: 'group-hover:shadow-[0_15px_35px_rgba(59,130,246,0.35)]',
    priceBadgeBorder: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
    borderColor: 'border-blue-500/30 hover:border-blue-400',
    btnBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30',
    accentText: 'text-blue-400',
    checkIconColor: 'text-blue-400'
  },
  grand_family: {
    ribbonBg: 'from-red-500 via-rose-600 to-red-800',
    ribbonFoldBg: 'bg-red-950',
    glowShadow: 'group-hover:shadow-[0_15px_35px_rgba(239,68,68,0.4)]',
    priceBadgeBorder: 'border-red-500/40 text-red-300 bg-red-950/60',
    borderColor: 'border-red-500/30 hover:border-red-400',
    btnBg: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30',
    accentText: 'text-red-400',
    checkIconColor: 'text-red-400'
  }
};

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider shadow-inner">
            <Zap className="h-3.5 w-3.5 animate-pulse text-amber-400" />
            <span>High Speed Optical Fiber Grid</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Delta Internet Packages
          </h2>

          {/* Slogan Banner matching photo */}
          <div className="pt-2 flex flex-col items-center justify-center space-y-2">
            <div className="inline-block bg-gradient-to-r from-red-500 via-amber-400 to-orange-400 text-transparent bg-clip-text text-2xl sm:text-4xl font-black tracking-wide font-sans drop-shadow-md">
              "বাজেট যাই হোক, স্পিডে কম্প্রোমাইজ নয়"
            </div>
            <p className="text-sky-300 text-sm sm:text-xl font-bold tracking-wide">
              বেছে নিন আপনার পছন্দের প্যাকেজ....
            </p>

            {/* IPv6 Ready Badge */}
            <div className="pt-2 flex items-center justify-center gap-2">
              <div className="px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>IPv6 Ready Certified Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid (6 Plans with 3D Folded Color Ribbons & Modern Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 sm:gap-6 items-stretch">
          {PLANS.map((plan) => {
            const theme = PLAN_COLOR_THEMES[plan.id] || PLAN_COLOR_THEMES.student;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl bg-slate-950/95 backdrop-blur-xl border transition-all duration-300 ${theme.borderColor} ${theme.glowShadow} hover:-translate-y-2 group cursor-default overflow-hidden shadow-2xl p-5 pt-8`}
              >
                {/* Popular Top Badge */}
                {plan.popular && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-1 uppercase tracking-wider z-20 border border-amber-300/60">
                    <Sparkles className="h-2.5 w-2.5 fill-slate-950 animate-spin-slow" /> Popular
                  </div>
                )}

                <div>
                  {/* Folded 3D Speed Ribbon Flag (Matching Poster Design) */}
                  <div className="absolute -top-1 -left-1 z-20">
                    <div className={`relative px-4 py-2 bg-gradient-to-r ${theme.ribbonBg} text-white font-black rounded-br-2xl shadow-xl flex items-center gap-1.5 border-b border-r border-white/20 transition-transform duration-300 group-hover:scale-105`}>
                      {/* Shimmer Light effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                      
                      <Gauge className="h-4 w-4 text-white animate-pulse" />
                      <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow">
                        {plan.speedMbps}
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-white/95">
                        Mbps
                      </span>
                    </div>
                    {/* Folded Shadow triangle underneath ribbon */}
                    <div className={`w-2.5 h-2.5 ${theme.ribbonFoldBg} opacity-80 shadow-md transform rotate-45 -mt-1 ml-0.5`} />
                  </div>

                  {/* Plan Name Header */}
                  <div className="text-center mt-7 mb-3">
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-widest uppercase group-hover:scale-105 transition-transform duration-200">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Oval Shadowed Price Pill (Matching Poster Design) */}
                  <div className={`mx-auto my-3 px-4 py-2.5 rounded-full border shadow-lg text-center backdrop-blur-md max-w-[190px] ${theme.priceBadgeBorder} group-hover:scale-105 transition-transform duration-200`}>
                    <div className="flex items-center justify-center gap-1 font-mono font-black">
                      <span className="text-sm font-bold">৳</span>
                      <span className="text-2xl sm:text-3xl font-black text-white">{plan.priceBdt}</span>
                      <span className="text-xs font-bold text-slate-300 uppercase">/MONTH</span>
                    </div>
                  </div>

                  {/* Feature Checklist Box */}
                  <div className="my-4 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className={`p-1 rounded-full bg-slate-800 ${theme.checkIconColor} shrink-0`}>
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-100">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs text-slate-300 text-center italic font-medium min-h-[36px] flex items-center justify-center leading-snug">
                    {plan.recommendedFor}
                  </p>

                  {/* Angled Ribbon BUY NOW Button (Matching Poster Ribbon Button) */}
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer transform active:scale-95 group/btn uppercase tracking-wider ${theme.btnBg}`}
                  >
                    <span>BUY NOW</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Corporate Box (Animated Bengali Version with WhatsApp) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-12 relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-blue-500/30 shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.25)] hover:border-blue-400/50 transition-all duration-300 overflow-hidden group"
        >
          {/* Animated Background Shimmer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-emerald-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs font-bold tracking-wide">
                <Zap className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>এন্টারপ্রাইজ ও কর্পোরেট সলিউশন</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                কাস্টম ব্যান্ডউইথ বা ডেডিকেটেড এন্টারপ্রাইজ SLA প্রয়োজন?
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                মিঠাপুকুর উপজেলার বিভিন্ন প্রতিষ্ঠান, স্কুল-কলেজ, হাসপাতাল ও ব্যবসার জন্য আমরা প্রদান করছি ডেডিকেটেড ফাইবার রিং, মাল্টিপল স্ট্যাটিক IP (IPv4/IPv6), রিডান্ড্যান্ট আপলিঙ্ক এবং ৯৯.৯% আপটাইম নিশ্চয়তা।
              </p>
            </div>

            {/* Action Buttons: WhatsApp & Phone */}
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801719394430?text=Hello%20Delta%20Internet,%20I%20need%20custom%20bandwidth/enterprise%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 border border-emerald-400/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2.5 group/wa"
              >
                <div className="p-1 bg-white/20 rounded-full group-hover/wa:rotate-12 transition-transform">
                  <MessageSquare className="h-4 w-4 text-white fill-white" />
                </div>
                <span>WhatsApp: 01719394430</span>
              </a>

              {/* Direct Call Button */}
              <a
                href="tel:01719394430"
                className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-sky-300 hover:text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl border border-sky-500/30 hover:border-sky-400 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-md"
              >
                <Phone className="h-4 w-4 text-sky-400" />
                <span>কল করুন: 0171-9394430</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Interactive Comparison Table: Fiber vs Mobile Data */}
        <FiberVsMobileComparison />

      </div>
    </section>
  );
};


