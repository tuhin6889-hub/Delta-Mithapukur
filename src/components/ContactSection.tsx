import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plan, InquiryFormData } from '../types';
import { BRANCH_INFO, OUR_TEAM, PLANS } from '../data/plans';
import { Phone, Mail, MapPin, User, Send, CheckCircle2, Wifi, Clock, Users, Award, ShieldCheck, Loader2 } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
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
                
                {/* Manager & Our Team Side-by-Side Row Container */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-900/90 rounded-2xl border border-slate-800"
                >
                  {/* Branch Manager */}
                  <div className="flex items-start gap-3 p-2 bg-slate-950/80 rounded-xl border border-blue-500/30">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-blue-400 text-[10px] uppercase tracking-wider font-extrabold block">
                        Branch Manager
                      </span>
                      <span className="text-white font-black text-sm block">{BRANCH_INFO.manager}</span>
                      <span className="text-slate-400 text-[11px] block">{BRANCH_INFO.designation}</span>
                    </div>
                  </div>

                  {/* Our Team Row */}
                  <div className="flex items-start gap-3 p-2 bg-slate-950/80 rounded-xl border border-purple-500/30">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-purple-400 text-[10px] uppercase tracking-wider font-extrabold block">
                        Our Team (আমাদের টিম)
                      </span>
                      <span className="text-white font-black text-sm block">Delta Technical Squad</span>
                      <span className="text-slate-400 text-[11px] block">5 Dedicated Members</span>
                    </div>
                  </div>
                </motion.div>

                {/* Our Team Detailed List Block */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="p-3.5 bg-slate-950/90 rounded-2xl border border-purple-500/20 space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-purple-300">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span>Our Team Members (আমাদের টেকনিক্যাল টিম)</span>
                    </div>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold border border-purple-500/30">
                      5 Active Members
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {OUR_TEAM.map((member, index) => (
                      <motion.div 
                        key={member.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                        className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-white text-xs">{member.name}</span>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-semibold">
                            {member.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-purple-300 font-medium">{member.role}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5 border-t border-slate-800">
                          <span className="truncate max-w-[130px]">{member.badge}</span>
                          <a href={`tel:${member.phone}`} className="text-emerald-400 hover:underline font-bold flex items-center gap-0.5">
                            <Phone className="h-2.5 w-2.5" />
                            <span>Call</span>
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

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
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-75 text-white font-bold text-base rounded-xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-blue-200" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Submit Connection Application</span>
                    </>
                  )}
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
