import React, { useState, useEffect } from 'react';
import { Plan, InquiryFormData } from '../types';
import { BRANCH_INFO, PLANS } from '../data/plans';
import { Phone, Mail, MapPin, User, Send, CheckCircle2, Wifi, Clock, Bot, LifeBuoy } from 'lucide-react';

interface ContactSectionProps {
  initialPlan?: Plan | null;
  onOpenSupportTicket?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialPlan, onOpenSupportTicket }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    selectedPlan: initialPlan?.name || 'Starter Broadband (30 Mbps)',
    locality: 'Boldipukur Bazaar',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialPlan) {
      setFormData((prev) => ({
        ...prev,
        selectedPlan: `${initialPlan.name} (${initialPlan.speedMbps} Mbps)`,
      }));
    }
  }, [initialPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Apply Now
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get Connected Today
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Apply for a new fiber connection or line transfer. Our local team in Mithapukur will review your address and contact you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Branch Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Delta Mithapukur Branch Office
              </h3>

              {/* Detail Items */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Manager */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold block">
                      Branch Manager
                    </span>
                    <span className="text-white font-bold text-base">{BRANCH_INFO.manager}</span>
                    <span className="text-slate-400 text-xs block">{BRANCH_INFO.designation}</span>
                  </div>
                </div>

                {/* Mobile / Hotline */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold block">
                      Direct Hotline / Mobile
                    </span>
                    <a href={`tel:${BRANCH_INFO.phone}`} className="text-emerald-400 font-extrabold text-lg hover:underline block">
                      {BRANCH_INFO.phone}
                    </a>
                    <span className="text-slate-400 text-xs">Call or WhatsApp anytime</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold block">
                      Official Email
                    </span>
                    <a href={`mailto:${BRANCH_INFO.email}`} className="text-white font-semibold hover:text-blue-300 block">
                      {BRANCH_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600/20 text-sky-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold block">
                      Physical Branch Address
                    </span>
                    <span className="text-slate-200 font-medium leading-relaxed block">
                      {BRANCH_INFO.address}
                    </span>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold block">
                      Branch Support Desk
                    </span>
                    <span className="text-slate-300 text-xs">{BRANCH_INFO.hours}</span>
                  </div>
                </div>

                {/* Support Ticket Portal Card */}
                {onOpenSupportTicket && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/60 border border-rose-500/40 p-4 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-rose-500/20 rounded-lg text-rose-400">
                            <LifeBuoy className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-bold text-white text-xs block">Mithapukur Support Ticket Desk</span>
                            <span className="text-[10px] text-rose-300 font-bold">24/7 Optical Repair & Billing Ticket</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300">
                        Facing line cuts, RED LOS light on ONU, or slow speeds? Submit an official Support Ticket for priority dispatch.
                      </p>

                      <button
                        onClick={onOpenSupportTicket}
                        className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xs rounded-lg shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <LifeBuoy className="h-4 w-4" />
                        <span>Create or Track Support Ticket</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Telegram Bot & Number Live Chat Card */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="bg-gradient-to-r from-blue-950/80 to-slate-900 border border-[#26A5E4]/40 p-4 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[#26A5E4]/20 rounded-lg text-[#26A5E4]">
                          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                          </svg>
                        </div>
                        <div>
                          <span className="font-bold text-white text-xs block">Telegram Live Chat</span>
                          <span className="text-[10px] text-emerald-400 font-bold">Number: {BRANCH_INFO.telegramNumber}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#26A5E4] bg-[#26A5E4]/10 px-2 py-0.5 rounded border border-[#26A5E4]/30">
                        {BRANCH_INFO.telegramBotUsername}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300">
                      Message us on Telegram at <strong className="text-white font-mono">{BRANCH_INFO.telegramNumber}</strong> or use our automated Bot for outage logs & bill receipts.
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={BRANCH_INFO.telegramDirectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-[#26A5E4] hover:bg-[#2094ce] text-white font-bold text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.016.096.035.313.019.485z"/>
                        </svg>
                        <span>Chat Number</span>
                      </a>

                      <a
                        href={BRANCH_INFO.telegramBotLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-[#26A5E4]/50 font-bold text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <Bot className="h-3.5 w-3.5 text-[#26A5E4]" />
                        <span>Bot Assistant</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Connection Request Form */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-800 pb-4 mb-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-blue-400" />
                    New Connection Application
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the inquiry form below to request installation at your address.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      placeholder="e.g. Abul Kalam"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="e.g. 01712345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Locality */}
                  <div>
                    <label htmlFor="locality" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Locality / Area in Mithapukur *
                    </label>
                    <input
                      type="text"
                      id="locality"
                      required
                      placeholder="e.g. Boldipukur Bazaar, Akmal Market"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Plan Selection */}
                <div>
                  <label htmlFor="plan" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Desired Broadband Package *
                  </label>
                  <select
                    id="plan"
                    value={formData.selectedPlan}
                    onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    {PLANS.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.speedMbps} Mbps)`}>
                        {p.name} — {p.speedMbps} Mbps (৳{p.priceBdt}/mo)
                      </option>
                    ))}
                    <option value="Custom Corporate Plan">Custom Corporate / Leased Line</option>
                  </select>
                </div>

                {/* Requirements / Notes */}
                <div>
                  <label htmlFor="requirements" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Additional Address Details or Notes
                  </label>
                  <textarea
                    id="requirements"
                    rows={3}
                    placeholder="Specific house or shop location details in Mithapukur..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-5 w-5" />
                  Submit Connection Application
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Our Mithapukur branch team will contact you at <strong className="text-emerald-400">{formData.phone}</strong> shortly to confirm cable drop availability.
                </p>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-left max-w-md mx-auto space-y-1">
                  <div className="text-slate-400">Selected Package: <span className="text-blue-300 font-bold">{formData.selectedPlan}</span></div>
                  <div className="text-slate-400">Locality: <span className="text-white font-medium">{formData.locality}</span></div>
                  <div className="text-slate-400">Branch Office: <span className="text-white font-medium">Boldipukur Bazaar Akmal Market</span></div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
