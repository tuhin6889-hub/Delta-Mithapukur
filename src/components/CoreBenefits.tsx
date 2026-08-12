import React from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, ArrowUpDown, Router, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CoreBenefits: React.FC = () => {
  const { language } = useLanguage();

  const benefits = [
    {
      id: 'low-latency',
      icon: Zap,
      iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      title: language === 'bn' ? 'অত্যন্ত কম লেটেন্সি' : 'Low Latency',
      badge: language === 'bn' ? '< ৫ মি.সে. BDIX' : '< 5ms BDIX Ping',
      description:
        language === 'bn'
          ? 'বাফারলেস ৪K স্ট্রিমিং ও পাবজি/ফ্রি-ফায়ারে নিরবচ্ছিন্ন গেমিং অভিজ্ঞতার জন্য আল্ট্রা-লো পিং।'
          : 'Sub-5ms BDIX ping optimized for buffer-free 4K streaming and competitive low-jitter gaming.',
    },
    {
      id: 'support-24-7',
      icon: Clock,
      iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
      title: language === 'bn' ? '২৪/৭ ব্রাঞ্চ সাপোর্ট' : '24/7 Local Support',
      badge: language === 'bn' ? 'আকমল মার্কেট ডেস্ক' : 'On-Site Team',
      description:
        language === 'bn'
          ? 'বলদিপুকুর বাজার শাখায় সার্বক্ষণিক ইঞ্জিনিয়ারিং টিম। ক্যাবল বা লাইন সমস্যায় সঙ্গে সঙ্গে অন-সাইট সাহায্য।'
          : 'Round-the-clock local support desk at Boldipukur Bazaar for instant physical cable & line troubleshooting.',
    },
    {
      id: 'symmetrical-speeds',
      icon: ArrowUpDown,
      iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      title: language === 'bn' ? 'সমপরিমাণ আপ-ডাউন স্পিড' : 'Symmetrical Speeds',
      badge: language === 'bn' ? '১:১ ব্যান্ডউইথ' : '1:1 Ratio Fiber',
      description:
        language === 'bn'
          ? 'সমান আপলোড ও ডাউনলোড স্পিড। জুম মিটিং, বড় ফাইল আপলোড এবং ক্লাউড ব্যাকআপ হবে নিমেষেই।'
          : 'Equal upload and download bandwidth for seamless video calls, fast file transfers, and instant cloud backups.',
    },
    {
      id: 'free-router-installation',
      icon: Router,
      iconBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
      title: language === 'bn' ? 'ফ্রি রাউটার ও ইনস্টলেশন' : 'Free Router & Setup',
      badge: language === 'bn' ? '০৳ ইনস্টলেশন ফি' : 'Zero Setup Fee',
      description:
        language === 'bn'
          ? 'বিনা খরচে অপটিক্যাল ক্যাবল সংযোগ এবং ফ্রি ওয়াই-ফাই রাউটার সেটআপ সুবিধা।'
          : 'Zero installation charges with complimentary high-gain Wi-Fi router setup and fiber optic drop cable.',
    },
  ];

  return (
    <section className="relative bg-slate-950 py-12 sm:py-16 border-y border-slate-800/80 overflow-hidden">
      {/* Background Decorative Ambient Shimmer */}
      <div className="absolute top-0 left-1/4 h-64 w-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>{language === 'bn' ? 'কেন ডেল্টা ফাইবার সেরা' : 'Core Delta Benefits'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {language === 'bn' ? 'আমাদের মূল সুবিধাসমূহ' : 'Why Choose Delta Internet?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'bn'
              ? 'মিঠাপুকুরের প্রতিটি ঘরে ও ব্যবসায় প্রিমিয়াম মানের অপটিক্যাল ইন্টারনেট ব্রডব্যান্ড সার্ভিস।'
              : 'Enterprise-grade fiber technology engineered for Mithapukur homes, shops, and institutions.'}
          </p>
        </div>

        {/* 4 Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Card Ambient Glow */}
                <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Icon & Badge Header */}
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${item.iconBg}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Indicator Bar */}
                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{language === 'bn' ? '১০০% ব্রডব্যান্ড গারান্টি' : '100% Fiber Guaranteed'}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
