import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronDown,
  HelpCircle,
  CreditCard,
  Wrench,
  ShieldCheck,
  Search,
  MessageSquare,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'installation' | 'billing' | 'technical';
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  highlights?: string[];
  highlightsBn?: string[];
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'install-time',
    category: 'installation',
    question: 'How fast can I get fiber optic internet installed in Mithapukur?',
    questionBn: 'মিঠাপুকুরে কত দ্রুত ফাইবার অপটিক ইন্টারনেট সংযোগ পাওয়া যায়?',
    answer: 'Our local field technician team in Mithapukur provides same-day or 24-hour optical fiber drop installation across Mithapukur Sadar, Boldipukur, Ranipukur, Gopalpur, and surrounding union markets upon booking confirmation.',
    answerBn: 'আমাদের লোকাল ফাইবার টেকনিশিয়ান টিম বুকিং কনফার্ম হওয়ার পর মিঠাপুকুর সদর, বলদিপুকুর, রানিপুকুর, গোপালপুর এবং সংলগ্ন সকল ইউনিয়ন বাজারে একই দিনে বা সর্বোচ্চ ২৪ ঘণ্টার মধ্যে সংযোগ প্রদান করে।',
    highlights: ['Same-day installation available', 'Direct drop-line setup from nearest optical splitter node', 'Free initial router configuration'],
    highlightsBn: ['একই দিনে সংযোগ সুবিধা', 'নিকটস্থ স্প্লিটার নোড থেকে ফাইবার ড্রপ', 'ফ্রি রাউটার কনফিগারেশন']
  },
  {
    id: 'install-equipment',
    category: 'installation',
    question: 'What equipment is provided during the fiber connection setup?',
    questionBn: 'ফাইবার সংযোগ স্থাপনের সময় কী কী যন্ত্রপাতি প্রদান করা হয়?',
    answer: 'Standard installation includes high-gain Optical Network Unit (ONU) device, outdoor armored fiber drop cable, patch cords, and complete optical power signal calibration by our certified fiber technician.',
    answerBn: 'স্ট্যান্ডার্ড ইনস্টলেশনে রয়েছে হাই-গেইন অপটিক্যাল নেটওয়ার্ক ইউনিট (ONU) ডিভাইস, আউটডোর আর্মর্ড ফাইবার ড্রপ ক্যাবল, প্যাচ কর্ড এবং অপটিক্যাল সিগন্যাল পাওয়ার ক্যালিব্রেশন।',
    highlights: ['High-performance GEPON/GPON ONU included', 'Outdoor fiber drop cable', 'Signal strength testing & router optimization'],
    highlightsBn: ['উচ্চমানের GEPON/GPON ONU অন্তর্ভুক্ত', 'টেকসই আউটডোর ফাইবার ক্যাবল', 'সিগন্যাল টেস্ট ও রাউটার অপটিমাইজেশন']
  },
  {
    id: 'install-coverage',
    category: 'installation',
    question: 'Which areas in Mithapukur Upazila are covered by Delta Fiber?',
    questionBn: 'মিঠাপুকুর উপজেলার কোন কোন এলাকায় ডেল্টা ফাইবার নেটওয়ার্ক রয়েছে?',
    answer: 'We maintain dense optical fiber distribution lines covering Akmal Market, Boldipukur, Mithapukur Health Complex Road, Rangpur Highway Corridor, Ranipukur, Gopalpur, Kafrikhal, Latifpur, and adjacent union markets.',
    answerBn: 'আমাদের অপটিক্যাল ফাইবার নেটওয়ার্ক মিঠাপুকুর আকমল মার্কেট, বলদিপুকুর, স্বাস্থ্য কমপ্লেক্স রোড, রানিপুকুর, গোপালপুর, কাফ্রিখাল, লতিফপুর এবং আশেপাশের সকল বাজারে বিস্তৃত।',
    highlights: ['Full Mithapukur Sadar & Market area', 'Boldipukur Commercial Hub', 'Inter-union wireless & fiber links'],
    highlightsBn: ['সমগ্র মিঠাপুকুর সদর ও মার্কেট এলাকা', 'বলদিপুকুর কমার্শিয়াল হাব', 'আন্তঃইউনিয়ন ফাইবার গ্রিড']
  },
  {
    id: 'billing-methods',
    category: 'billing',
    question: 'What payment options are available for monthly broadband billing?',
    questionBn: 'মাসিক ব্রডব্যান্ড বিল পরিশোধের জন্য কী কী মাধ্যম রয়েছে?',
    answer: 'You can conveniently pay your monthly internet bill via bKash, Nagad, Rocket, or direct cash at our Mithapukur Branch Office located at Akmal Market, Boldipukur.',
    answerBn: 'আপনি বিকাশ, নগদ, রকেট অথবা বলদিপুকুর আকমল মার্কেটে অবস্থিত আমাদের মিঠাপুকুর ব্রাঞ্চ অফিসে সরাসরি নগদ টাকায় মাসিক বিল পরিশোধ করতে পারবেন।',
    highlights: ['Instant bKash & Nagad merchant payment', 'Automated SMS bill receipt confirmation', 'Physical counter payment at Akmal Market Desk'],
    highlightsBn: ['বিকাশ ও নগদে অন-লাইন মার্চেন্ট বিলিং', 'স্বয়ংক্রিয় এসএমএস মেমো নিশ্চিতকরণ', 'আকমল মার্কেট কাউন্টারে সরাসরি বিল জমা']
  },
  {
    id: 'billing-hidden-fees',
    category: 'billing',
    question: 'Are there any data caps or hidden monthly maintenance fees?',
    questionBn: 'ইন্টারনেট প্যাকেজে কি কোনো ডাটা লিমিট বা অতিরিক্ত চার্জ রয়েছে?',
    answer: 'No. All Delta Mithapukur broadband plans offer 100% truly unlimited data without Fair Usage Policy (FUP) caps, speed throttling, or surprise surcharge fees.',
    answerBn: 'না। ডেল্টা মিঠাপুকুরের সকল ফাইবার প্যাকেজে ১০০% আনলিমিটেড ডাটা দেওয়া হয়। কোনো FUP স্পিড কমানো বা অতিরিক্ত গোপন চার্জ নেই।',
    highlights: ['Zero data throttling (No FUP)', 'Fixed flat monthly rate', 'Transparent billing cycle'],
    highlightsBn: ['কোনো ডাটা সীমা বা FUP নেই', 'ফিক্সড মাসিক বিল', 'স্বচ্ছ ও নিরাপদ বিলিং']
  },
  {
    id: 'billing-cycle',
    category: 'billing',
    question: 'When is the bill due date and how is line renewal handled?',
    questionBn: 'বিল পরিশোধের সময়সীমা কত এবং লাইন কীভাবে নবায়ন হয়?',
    answer: 'Billing cycles run from the 1st of every month. Payments are due within the 1st to 7th of each month. In case of delayed payment, lines can be instantly restored immediately after bill payment.',
    answerBn: 'প্রতি মাসের ১ তারিখ থেকে নতুন বিলিং সাইকেল শুরু হয়। ১ থেকে ৭ তারিখের মধ্যে বিল দিতে হয়। বিল পরিশোধের সাথে সাথে স্বয়ংক্রিয়ভাবে ইন্টারনেট লাইন সচল হয়ে যায়।',
    highlights: ['Monthly billing period starting 1st', 'Automated SMS bill reminders', 'Instant automated reconnection upon payment'],
    highlightsBn: ['প্রতি মাসের ১ তারিখ থেকে শুরু', 'এসএমএস বিল অনুস্মারক বার্তা', 'বিল পরিশোধেই ইনস্ট্যান্ট রিকানেকশন']
  },
  {
    id: 'tech-support',
    category: 'technical',
    question: 'How does Delta handle fiber line cuts or technical outages?',
    questionBn: 'ফাইবার তার ছিঁড়ে গেলে বা কারিগরি ত্রুটি হলে কীভাবে সাপোর্ট পাবেন?',
    answer: 'We operate a dedicated 24/7 local support desk right in Mithapukur. Our on-ground fiber engineers maintain OTDR laser fault locators and dispatch within 30 to 60 minutes for rapid line splicing.',
    answerBn: 'মিঠাপুকুরেই আমাদের ২৪/৭ লোকাল সাপোর্ট ডেস্ক রয়েছে। ফাইবার অপটিক ড্রপ ক্যাবল ক্ষতিগ্রস্ত হলে আমাদের ফিল্ড টিম ৩০-৬০ মিনিটের মধ্যে স্প্লাইসিং সাপোর্ট প্রদান করে।',
    highlights: ['Under 1-hour average field response', 'Local Mithapukur field engineer dispatch', 'Active BDIX & International upstream redundancy'],
    highlightsBn: ['১ ঘণ্টার মধ্যে ফিল্ড টেকনিশিয়ান উপস্থিতি', 'মিঠাপুকুর লোকাল ইঞ্জিনিয়ার টিম', 'সচল BDIX ও আন্তর্জাতিক রিডান্ডেন্সি']
  },
  {
    id: 'tech-upgrade',
    category: 'technical',
    question: 'Can I upgrade my bandwidth package anytime if my speed requirements increase?',
    questionBn: 'প্রয়োজনে যেকোনো সময় কি স্পিড বা প্যাকেজ পরিবর্তন করা সম্ভব?',
    answer: 'Yes! Package upgrades or temporary high-speed bandwidth boosts for events are processed immediately without any re-installation cost or extra cable replacement.',
    answerBn: 'হ্যাঁ! আপনার প্রয়োজন অনুযায়ী অতিরিক্ত কোনো ক্যাবল ছাড়াই যেকোনো সময় ইনস্ট্যান্ট স্পিড ও ব্যান্ডউইথ প্যাকেজ বৃদ্ধি করতে পারবেন।',
    highlights: ['Instant package change', 'No extra installation or cable cost', 'Flexible monthly options'],
    highlightsBn: ['তাৎক্ষণিক প্যাকেজ পরিবর্তন', 'অতিরিক্ত কোনো ক্যাবল খরচ নেই', 'নমনীয় মাসিক অফার']
  }
];

export const FaqSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'installation' | 'billing' | 'technical'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('install-time');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const qText = language === 'bn' ? item.questionBn : item.question;
    const aText = language === 'bn' ? item.answerBn : item.answer;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      qText.toLowerCase().includes(searchLower) ||
      aText.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{language === 'bn' ? 'সাধারণ প্রশ্নাবলি' : 'Got Questions?'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'সাধারণ জিজ্ঞাসা ও উত্তর (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {language === 'bn'
              ? 'মিঠাপুকুর ফাইবার ইন্টারনেট সংযোগ, মাসিক বিল পরিশোধ, বিকাশ মার্চেন্ট পেমেন্ট এবং টেকনিক্যাল সাপোর্ট সম্পর্কিত সাধারণ প্রশ্নাবলি।'
              : 'Everything you need to know about optical fiber broadband installation, monthly billing, bKash payments, and technical support in Mithapukur.'}
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-4">
          
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={
                language === 'bn'
                  ? 'প্রশ্ন খুঁজুন (যেমন: সংযোগ, বিকাশ বিল, রাউটার)...'
                  : 'Search installation, bKash billing, router setup...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                {language === 'bn' ? 'মুছে ফেলুন' : 'Clear'}
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {language === 'bn' ? `সব বিষয় (${FAQ_DATA.length})` : `All Topics (${FAQ_DATA.length})`}
            </button>
            <button
              onClick={() => setActiveCategory('installation')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'installation'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Wrench className="h-3.5 w-3.5" />
              {language === 'bn' ? 'ফাইবার সংযোগ' : 'Fiber Installation'}
            </button>
            <button
              onClick={() => setActiveCategory('billing')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'billing'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" />
              {language === 'bn' ? 'বিলিং ও পরিশোধ' : 'Billing & Payments'}
            </button>
            <button
              onClick={() => setActiveCategory('technical')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'technical'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {language === 'bn' ? 'টেকনিক্যাল সাপোর্ট' : 'Technical Support'}
            </button>
          </div>

        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const question = language === 'bn' ? faq.questionBn : faq.question;
              const answer = language === 'bn' ? faq.answerBn : faq.answer;
              const highlights = language === 'bn' ? faq.highlightsBn : faq.highlights;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'bg-slate-950/95 border-blue-500/50 shadow-xl shadow-blue-950/20'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-bold text-base text-white hover:text-blue-300 transition-colors">
                      {question}
                    </span>
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-blue-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 space-y-3 border-t border-slate-900 text-slate-300 text-sm leading-relaxed">
                      <p>{answer}</p>
                      
                      {highlights && (
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
              <HelpCircle className="h-8 w-8 text-slate-500 mx-auto" />
              <p className="text-slate-300 font-semibold text-sm">
                {language === 'bn' ? 'কোনো সম্পর্কিত প্রশ্ন পাওয়া যায়নি' : 'No matching questions found'}
              </p>
              <p className="text-xs text-slate-500">
                {language === 'bn'
                  ? 'অন্য শব্দ লিখে চেষ্টা করুন, যেমন: "বিকাশ", "স্পিড" বা "রাউটার"'
                  : 'Try searching with different keywords like "bKash", "speed", or "ONU"'}
              </p>
            </div>
          )}
        </div>

        {/* Additional Help / Contact Fallback Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">
                {language === 'bn'
                  ? 'আপনার নির্দিষ্ট এলাকা সম্পর্কে কোনো প্রশ্ন আছে?'
                  : 'Have a specific question about your location?'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'আমাদের মিঠাপুকুর সাপোর্ট ডেস্ক যেকোনো প্রশ্নের উত্তর দিতে ২৪/৭ প্রস্তুত।'
                  : 'Our Mithapukur support desk is available 24/7 to answer custom query calls.'}
              </p>
            </div>
          </div>

          <a
            href="tel:+8801712001122"
            className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <PhoneCall className="h-4 w-4" />
            <span>{language === 'bn' ? 'ব্রাঞ্চ হেল্পডেস্কে কল দিন' : 'Call Branch Help Desk'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

