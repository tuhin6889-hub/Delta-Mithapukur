import React, { useState } from 'react';
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
  answer: string;
  highlights?: string[];
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'install-time',
    category: 'installation',
    question: 'How fast can I get fiber optic internet installed in Mithapukur?',
    answer: 'Our local field technician team in Mithapukur provides same-day or 24-hour optical fiber drop installation across Mithapukur Sadar, Boldipukur, Ranipukur, Gopalpur, and surrounding union markets upon booking confirmation.',
    highlights: ['Same-day installation available', 'Direct drop-line setup from nearest optical splitter node', 'Free initial router configuration']
  },
  {
    id: 'install-equipment',
    category: 'installation',
    question: 'What equipment is provided during the fiber connection setup?',
    answer: 'Standard installation includes high-gain Optical Network Unit (ONU) device, outdoor armored fiber drop cable, patch cords, and complete optical power signal calibration by our certified fiber technician.',
    highlights: ['High-performance GEPON/GPON ONU included', 'Outdoor fiber drop cable', 'Signal strength testing & router optimization']
  },
  {
    id: 'install-coverage',
    category: 'installation',
    question: 'Which areas in Mithapukur Upazila are covered by Delta Fiber?',
    answer: 'We maintain dense optical fiber distribution lines covering Akmal Market, Boldipukur, Mithapukur Health Complex Road, Rangpur Highway Corridor, Ranipukur, Gopalpur, Kafrikhal, Latifpur, and adjacent union markets.',
    highlights: ['Full Mithapukur Sadar & Market area', 'Boldipukur Commercial Hub', 'Inter-union wireless & fiber links']
  },
  {
    id: 'billing-methods',
    category: 'billing',
    question: 'What payment options are available for monthly broadband billing?',
    answer: 'You can conveniently pay your monthly internet bill via bKash, Nagad, Rocket, or direct cash at our Mithapukur Branch Office located at Akmal Market, Boldipukur.',
    highlights: ['Instant bKash & Nagad merchant payment', 'Automated SMS bill receipt confirmation', 'Physical counter payment at Akmal Market Desk']
  },
  {
    id: 'billing-hidden-fees',
    category: 'billing',
    question: 'Are there any data caps or hidden monthly maintenance fees?',
    answer: 'No. All Delta Mithapukur broadband plans offer 100% truly unlimited data without Fair Usage Policy (FUP) caps, speed throttling, or surprise surcharge fees.',
    highlights: ['Zero data throttling (No FUP)', 'Fixed flat monthly rate', 'Transparent billing cycle']
  },
  {
    id: 'billing-cycle',
    category: 'billing',
    question: 'When is the bill due date and how is line renewal handled?',
    answer: 'Billing cycles run from the 1st of every month. Payments are due within the 1st to 7th of each month. In case of delayed payment, lines can be instantly restored immediately after bill payment.',
    highlights: ['Monthly billing period starting 1st', 'Automated SMS bill reminders', 'Instant automated reconnection upon payment']
  },
  {
    id: 'tech-support',
    category: 'technical',
    question: 'How does Delta handle fiber line cuts or technical outages?',
    answer: 'We operate a dedicated 24/7 local support desk right in Mithapukur. Our on-ground fiber engineers maintain OTDR laser fault locators and dispatch within 30 to 60 minutes for rapid line splicing.',
    highlights: ['Under 1-hour average field response', 'Local Mithapukur field engineer dispatch', 'Active BDIX & International upstream redundancy']
  },
  {
    id: 'tech-upgrade',
    category: 'technical',
    question: 'Can I upgrade my bandwidth package anytime if my speed requirements increase?',
    answer: 'Yes! Package upgrades or temporary high-speed bandwidth boosts for events are processed immediately without any re-installation cost or extra cable replacement.',
    highlights: ['Instant package change', 'No extra installation or cable cost', 'Flexible monthly options']
  }
];

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'installation' | 'billing' | 'technical'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('install-time');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
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
            <span>Got Questions?</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about optical fiber broadband installation, monthly billing, bKash payments, and technical support in Mithapukur.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-4">
          
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search installation, bKash billing, router setup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
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
              All Topics ({FAQ_DATA.length})
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
              Fiber Installation
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
              Billing & Payments
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
              Technical Support
            </button>
          </div>

        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
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
                      {faq.question}
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
                      <p>{faq.answer}</p>
                      
                      {faq.highlights && (
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {faq.highlights.map((item, idx) => (
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
              <p className="text-slate-300 font-semibold text-sm">No matching questions found</p>
              <p className="text-xs text-slate-500">Try searching with different keywords like "bKash", "speed", or "ONU"</p>
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
              <h4 className="font-bold text-white text-sm sm:text-base">Have a specific question about your location?</h4>
              <p className="text-xs text-slate-400">Our Mithapukur support desk is available 24/7 to answer custom query calls.</p>
            </div>
          </div>

          <a
            href="tel:+8801700000000"
            className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Call Branch Help Desk</span>
          </a>
        </div>

      </div>
    </section>
  );
};
