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
  X,
  LifeBuoy
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
    question: 'Can I upgrade or downgrade my broadband speed package anytime?',
    questionBn: 'যেকোনো সময় কি প্যাকেজ বা স্পিড পরিবর্তন (Upgrade/Downgrade) করা যায়?',
    answer: 'Yes. You can upgrade your plan instantly by calling our support number or messaging us via WhatsApp. Package modifications take effect within 10 minutes without physical wire changes.',
    answerBn: 'হ্যাঁ। আপনি আমাদের হটলাইনে কল দিয়ে বা হোয়াটসঅ্যাপে মেসেজ পাঠিয়ে যেকোনো সময় প্যাকেজ পরিবর্তন করতে পারবেন। ১০ মিনিটের মধ্যেই নতুন স্পিড কার্যকর হয়।',
    highlights: ['Instant bandwidth adjustment', 'Zero fee for package switching', 'Flexibility for seasonal usage'],
    highlightsBn: ['তাৎক্ষণিক স্পিড আপগ্রেড', 'প্যাকেজ পরিবর্তনের জন্য কোনো ফি নেই', 'প্রয়োজন অনুযায়ী ফ্লেক্সিবল সুবিধা']
  }
];

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'installation' | 'billing' | 'technical'>('all');
  const [openAccordion, setOpenAccordion] = useState<string | null>('install-time');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchEn =
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      (item.highlights && item.highlights.some((h) => h.toLowerCase().includes(query)));

    const matchBn =
      item.questionBn.includes(query) ||
      item.answerBn.includes(query) ||
      (item.highlightsBn && item.highlightsBn.some((h) => h.includes(query)));

    return matchesCategory && (matchEn || matchBn);
  });

  const categories = [
    { id: 'all', labelEn: 'All Questions', labelBn: 'সকল প্রশ্ন', icon: HelpCircle },
    { id: 'installation', labelEn: 'Installation & Setup', labelBn: 'সংযোগ ও সেটআপ', icon: Wrench },
    { id: 'billing', labelEn: 'Billing & Payments', labelBn: 'বিল ও পেমেন্ট', icon: CreditCard },
    { id: 'technical', labelEn: 'Technical & Support', labelBn: 'টেকনিক্যাল ও সাপোর্ট', icon: ShieldCheck }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {language === 'bn' ? 'সাধারণ জিজ্ঞাসাবলী ও হেল্প সেন্টার' : 'Frequently Asked Questions (FAQ)'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'ডেল্টা মিঠাপুকুর ফাইবার ব্রডব্যান্ড সম্পর্কিত দরকারি তথ্যাবলী'
                  : 'Clear answers to common questions about Delta Fiber Mithapukur'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close FAQ Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search & Categories */}
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'প্রশ্ন খুঁজুন (উদাঃ বিকাশ, রাউটার, বিল, স্পিড)...'
                    : 'Search questions (e.g. bKash, router, installation, speed)...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{language === 'bn' ? cat.labelBn : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion Questions */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => {
                const isOpenAccordion = openAccordion === item.id;
                const question = language === 'bn' ? item.questionBn : item.question;
                const answer = language === 'bn' ? item.answerBn : item.answer;
                const highlights = language === 'bn' ? item.highlightsBn : item.highlights;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpenAccordion
                        ? 'bg-slate-950/90 border-blue-500/40 shadow-lg'
                        : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => setOpenAccordion(isOpenAccordion ? null : item.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                        <span className="font-bold text-white text-sm sm:text-base">{question}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpenAccordion ? 'rotate-180 text-blue-400' : ''
                        }`}
                      />
                    </button>

                    {isOpenAccordion && (
                      <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-800/60">
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{answer}</p>
                        {highlights && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                            {highlights.map((h, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-slate-300 bg-slate-900/90 p-2 rounded-lg border border-slate-800"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                <span>{h}</span>
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
              <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
                <HelpCircle className="h-8 w-8 text-slate-500 mx-auto" />
                <p className="text-slate-300 font-semibold text-sm">
                  {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No matching questions found'}
                </p>
              </div>
            )}
          </div>

          {/* Quick Contact Footer Bar */}
          <div className="bg-gradient-to-r from-blue-950/40 via-slate-950 to-indigo-950/40 p-4 rounded-2xl border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="h-5 w-5 text-blue-400 shrink-0" />
              <p className="text-xs text-slate-300">
                {language === 'bn'
                  ? 'আরও কোনো প্রশ্ন আছে? আমাদের ২৪/৭ সাপোর্ট টিম প্রস্তুত।'
                  : 'Still have questions? Our 24/7 Mithapukur desk is ready to help.'}
              </p>
            </div>
            <a
              href="tel:+8801712001122"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>01712-001122</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
