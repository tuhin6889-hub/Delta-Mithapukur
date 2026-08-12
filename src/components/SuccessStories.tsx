import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  Sparkles,
  Play,
  Pause,
  Award,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Testimonial {
  id: string;
  name: string;
  nameBn: string;
  role: string;
  roleBn: string;
  location: string;
  locationBn: string;
  plan: string;
  planBn: string;
  rating: number;
  verified: boolean;
  avatarBg: string;
  initials: string;
  comment: string;
  commentBn: string;
  highlights: string[];
  highlightsBn: string[];
}

export const SuccessStories: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 'tanvir-boldipukur',
      name: 'Engr. Tanvir Rahman',
      nameBn: 'প্রকৌশলী তানভীর রহমান',
      role: 'Full-Stack Freelancer & Remote Developer',
      roleBn: 'ফুল-স্ট্যাক ফ্রিল্যান্সার ও রিমোট ডেভেলপার',
      location: 'Boldipukur Bazaar, Mithapukur',
      locationBn: 'বলদিপুকুর বাজার, মিঠাপুকুর',
      plan: '50 Mbps Pro Gamer',
      planBn: '৫০ এমবিপিএস প্রো গেমার',
      rating: 5,
      verified: true,
      avatarBg: 'from-blue-600 to-indigo-700',
      initials: 'TR',
      comment:
        'As a remote engineer delivering software for US clients, reliable internet with zero jitter is non-negotiable. Delta Fiber gives me sub-4ms BDIX latency and crystal-clear Zoom video calls every single day.',
      commentBn:
        'ইউএস ক্লায়েন্টদের জন্য রিমোট কাজ করতে নিরবচ্ছিন্ন এবং ল্যাগ-মুক্ত ইন্টারনেট আমার প্রধান প্রয়োজন। ডেল্টা ফাইবারে ৪ মি.সে.-এর কম BDIX লেটেন্সি পাই, যার ফলে সারাদিন কোনো বাফারিং ছাড়াই জুম মিটিং চলে।',
      highlights: ['Sub-4ms Ping', '1:1 Upload Speed'],
      highlightsBn: ['< ৪ মি.সে. পিং', '১:১ আপলোড স্পিড'],
    },
    {
      id: 'rafiqul-sadar',
      name: 'Md. Rafiqul Islam',
      nameBn: 'মোঃ রফিকুল ইসলাম',
      role: 'Owner, Akmal Electronics & CCTV Hardware',
      roleBn: 'প্রোপাইটর, আকবর ইলেকট্রনিক্স ও সিসিটিভি হাবেল',
      location: 'Akmal Market, Sadar Town',
      locationBn: 'আকমল মার্কেট, সদর টাউন',
      plan: '100 Mbps Corporate Leased',
      planBn: '১০০ এমবিপিএস কর্পোরেট লিযড',
      rating: 5,
      verified: true,
      avatarBg: 'from-emerald-600 to-teal-800',
      initials: 'RI',
      comment:
        'We stream live 16-channel HD CCTV feeds to our mobile app and manage real-time store inventory. Delta’s branch desk right in Akmal Market provides instant physical line support whenever we need.',
      commentBn:
        'আমাদের দোকান থেকে প্রতিদিন ১৬টি সিসিটিভি ক্যামেরা লাইভ মোবাইল অ্যাপে চলে। আকমল মার্কেটে ডেল্টার অন-সাইট সাপোর্ট টিম থাকায় কোনো ক্যাবল সমস্যায় ১৫ মিনিটের মধ্যে সলিউশন পাওয়া যায়।',
      highlights: ['Branch Desk Nearby', 'Dedicated IP'],
      highlightsBn: ['নিকটস্থ ব্রাঁচ সাপোর্ট', 'ডেডিকেটেড আইপি'],
    },
    {
      id: 'shamima-pairaband',
      name: 'Mst. Shamima Nasrin',
      nameBn: 'মোছাঃ শামীমা নাসরিন',
      role: 'School Headmistress & Online Educator',
      roleBn: 'প্রধান শিক্ষিকা ও অনলাইন এডুকেটর',
      location: 'Pairaband, Mithapukur',
      locationBn: 'পায়রাবব্দ, মিঠাপুকুর',
      plan: '30 Mbps Family Broadband',
      planBn: '৩০ এমবিপিএস ফ্যামিলি ব্রডব্যান্ড',
      rating: 5,
      verified: true,
      avatarBg: 'from-purple-600 to-pink-700',
      initials: 'SN',
      comment:
        'Smart classroom video lessons run without a single stutter. At home, our whole family streams 4K Smart TV while the kids complete online assignments seamlessly.',
      commentBn:
        'অনলাইন ক্লাস এবং স্মার্ট ক্লাসরুমের ভিডিও টিউটোরিয়াল একদম মসৃণভাবে চলে। একই সাথে বাসায় ৪K স্মার্ট টিভি ও বাচ্চাদের পড়াশোনা খুব ভালোভাবে সামলানো যাচ্ছে।',
      highlights: ['4K Smart TV Ready', 'Unlimited Data'],
      highlightsBn: ['৪K স্মার্ট টিভি উপযোগী', 'আনলিমিটেড ডেটা'],
    },
    {
      id: 'rifat-ranipukur',
      name: 'Shahriar Hossain (Rifat)',
      nameBn: 'শাহরিয়ার হোসেন (রিফাত)',
      role: 'Esports Gamer & Student',
      roleBn: 'ই-স্পোর্টস গেমার ও শিক্ষার্থী',
      location: 'Ranipukur, Mithapukur',
      locationBn: 'রানীপুকুর, মিঠাপুকুর',
      plan: '40 Mbps Gaming Special',
      planBn: '৪০ এমবিপিএস গেমিং স্পেশাল',
      rating: 5,
      verified: true,
      avatarBg: 'from-amber-500 to-orange-700',
      initials: 'SH',
      comment:
        'Zero packet loss in PUBG Mobile, Valorant, and Free Fire! Other local ISPs suffered heavy lag during peak hours, but Delta’s optical fiber stays rock solid 24/7.',
      commentBn:
        'পাবজি ও ভ্যালোরেন্টে জিরো প্যাকেট লস! পিক আওয়ারেও পিং বাড়ে না। মিঠাপুকুরে গেমারদের জন্য ডেল্টা ফাইবার ছাড়া কোনো বিকল্প নেই।',
      highlights: ['Zero Packet Loss', 'BDIX Routing'],
      highlightsBn: ['জিরো প্যাকেট লস', 'বিডিআইএক্স রাউটিং'],
    },
    {
      id: 'kabir-gopalpur',
      name: 'Dr. Kabir Ahmed',
      nameBn: 'ডাঃ কবির আহমেদ',
      role: 'Medical Director, Digital Health Hub',
      roleBn: 'মেডিকেল ডিরেক্টর, ডিজিটাল হেলথ হাব',
      location: 'Gopalpur Union, Mithapukur',
      locationBn: 'গোপালপুর ইউনিয়ন, মিঠাপুকুর',
      plan: '60 Mbps Healthcare Dedicated',
      planBn: '৬০ এমবিপিএস হেলথকেয়ার ডেকোরেশন',
      rating: 5,
      verified: true,
      avatarBg: 'from-cyan-600 to-blue-800',
      initials: 'KA',
      comment:
        'High-resolution diagnostic imaging, telemedicine consultations, and patient report uploads happen in seconds. Delta internet is indispensable for our rural healthcare clinic.',
      commentBn:
        'টেলিমেডিসিন পেশেন্ট কনসাল্টেশন এবং হাই-রেজুলেশন এক্স-রে রিপোর্ট নিমেষেই ক্লাউডে আপলোড হয়ে যায়। গ্রামীণ স্বাস্থ্যসেবায় এই ব্রডব্যান্ড একটি আশীর্বাদ।',
      highlights: ['High Reliability', 'Fast Uploads'],
      highlightsBn: ['উচ্চ নির্ভরযোগ্যতা', 'দ্রুত আপলোড'],
    },
    {
      id: 'nusrat-durgapur',
      name: 'Nusrat Jahan',
      nameBn: 'নুসরাত জাহান',
      role: 'FB Live Streamer & Boutique Founder',
      roleBn: 'ফেসবুক লাইভ স্ট্রিমার ও বুটিক শপ ওনার',
      location: 'Durgapur, Mithapukur',
      locationBn: 'দুর্গাপুর, মিঠাপুকুর',
      plan: '30 Mbps Streamer Edition',
      planBn: '৩০ এমবিপিএস স্ট্রিমার এডিশন',
      rating: 5,
      verified: true,
      avatarBg: 'from-rose-500 to-red-700',
      initials: 'NJ',
      comment:
        'I broadcast 1080p HD live streams for my fashion boutique almost daily. The 1:1 symmetrical upload speed ensures zero stream disconnects or blurry frames.',
      commentBn:
        'প্রতিদিন ফেসবুকে ১০৮০পি এইচডি লাইভ স্ট্রিম করি। ১:১ সমান আপলোড স্পিডের কারণে কখনোই লাইভ ডিসকানেক্ট বা ঘোলাটে হয় না।',
      highlights: ['1080p HD Live', 'Equal Upload'],
      highlightsBn: ['১০৮০পি এইচডি লাইভ', 'সমপরিমাণ আপলোড'],
    },
  ];

  // Carousel autoplay logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;

    if (diff > 50) {
      handleNext();
      setTouchPosition(null);
    } else if (diff < -50) {
      handlePrev();
      setTouchPosition(null);
    }
  };

  const currentItem = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative bg-slate-950 py-16 sm:py-20 border-b border-slate-800/80 overflow-hidden">
      {/* Background Decorative Ambient Flares */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-96 w-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{language === 'bn' ? 'গ্রাহকদের অভিমত' : 'Customer Success Stories'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'bn' ? 'মিঠাপুকুরবাসীর আস্থার প্রতীক ডেল্টা ব্রডব্যান্ড' : 'Trusted by Residents & Businesses Across Mithapukur'}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'বলদিপুকুর, পায়রাবন্দ, সদর টাউন ও আশেপাশের অঞ্চলের গ্রাহকরা কেন আমাদের ফাইবার কানেকশন পছন্দ করেন তা জানুন।'
                : 'Hear directly from freelancers, store owners, educators, and gamers powered by our high-speed optical fiber.'}
            </p>
          </div>

          {/* Overall Trust Badges */}
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl shrink-0 shadow-lg backdrop-blur-md">
            <div className="flex -space-x-2 overflow-hidden">
              {testimonials.slice(0, 4).map((t, i) => (
                <div
                  key={t.id}
                  className={`inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-gradient-to-tr ${t.avatarBg} text-white font-black text-xs flex items-center justify-center`}
                >
                  {t.initials}
                </div>
              ))}
            </div>
            <div className="text-left border-l border-slate-800 pl-3.5 space-y-0.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-black text-white ml-1">4.9/5.0</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400">
                {language === 'bn' ? '৪৫০+ গ্রাহকের ৫-স্টার রেটিং' : '450+ Verified Mithapukur Users'}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Outer Wrapper */}
        <div
          className="relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Active Carousel Card Display */}
          <div className="min-h-[380px] sm:min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full"
              >
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-slate-800/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 group">
                  
                  {/* Decorative Background Quote Graphic */}
                  <Quote className="absolute top-6 right-8 h-24 w-24 text-slate-800/20 group-hover:text-blue-500/10 transition-colors pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    
                    {/* Left Column: User Profile Info & Badges */}
                    <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-6 lg:pb-0 lg:pr-8">
                      <div className="flex items-center gap-4">
                        {/* Profile Avatar */}
                        <div className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr ${currentItem.avatarBg} text-white font-black text-xl sm:text-2xl flex items-center justify-center shadow-xl border-2 border-slate-700/80 shrink-0 group-hover:scale-105 transition-transform`}>
                          {currentItem.initials}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors">
                              {language === 'bn' ? currentItem.nameBn : currentItem.name}
                            </h3>
                            {currentItem.verified && (
                              <span title="Verified Active Line Subscriber">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 fill-emerald-500/20" />
                              </span>
                            )}
                          </div>

                          <p className="text-xs font-medium text-slate-400 mt-0.5">
                            {language === 'bn' ? currentItem.roleBn : currentItem.role}
                          </p>

                          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span>{language === 'bn' ? currentItem.locationBn : currentItem.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Package Tag & Star Rating */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold inline-flex items-center gap-1">
                          <Zap className="h-3 w-3 text-blue-400" />
                          {language === 'bn' ? currentItem.planBn : currentItem.plan}
                        </span>

                        <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                          {[...Array(currentItem.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      {/* Highlighted Feature Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(language === 'bn' ? currentItem.highlightsBn : currentItem.highlights).map((hl, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
                          >
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Quote Text */}
                    <div className="lg:col-span-8 space-y-6">
                      <Quote className="h-8 w-8 text-blue-400/60" />
                      
                      <p className="text-base sm:text-xl font-medium text-slate-100 italic leading-relaxed sm:leading-loose">
                        "{language === 'bn' ? currentItem.commentBn : currentItem.comment}"
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <ShieldCheck className="h-4 w-4" />
                          <span>
                            {language === 'bn' ? 'যাচাইকৃত ব্রডব্যান্ড গ্রাহক (বলদিপুকুর ও মিঠাপুকুর)' : 'Verified Local Delta Fiber User'}
                          </span>
                        </div>

                        <span className="text-slate-400 font-mono text-[11px]">
                          Story {currentIndex + 1} of {testimonials.length}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Bar: Prev/Next Buttons, Dots & Autoplay Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-800/80">
            
            {/* Pagination Indicators (Dots) */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-blue-500 shadow-md shadow-blue-500/50'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next & Pause Action Controls */}
            <div className="flex items-center gap-3 order-1 sm:order-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                title={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
              >
                {isPlaying ? <Pause className="h-4 w-4 text-amber-400" /> : <Play className="h-4 w-4 text-emerald-400" />}
              </button>

              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous Success Story"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next Success Story"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <p className="text-xl sm:text-2xl font-black text-white">450+</p>
            <p className="text-xs text-slate-400">{language === 'bn' ? 'সক্রিয় গ্রাহক' : 'Active Subscribers'}</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <p className="text-xl sm:text-2xl font-black text-emerald-400">99.9%</p>
            <p className="text-xs text-slate-400">{language === 'bn' ? 'নেটওয়ার্ক আপটাইম' : 'Uptime Guarantee'}</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <p className="text-xl sm:text-2xl font-black text-blue-400">&lt; 5ms</p>
            <p className="text-xs text-slate-400">{language === 'bn' ? 'বিডিআইএক্স লেটেন্সি' : 'BDIX Gaming Latency'}</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <p className="text-xl sm:text-2xl font-black text-amber-400">7 Unions</p>
            <p className="text-xs text-slate-400">{language === 'bn' ? 'মিঠাপুকুরে ১০০% কাভারেজ' : 'Full Fiber Coverage'}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
