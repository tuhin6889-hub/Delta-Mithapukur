import React from 'react';
import { Wifi, Building2, Radio, Headset, CheckCircle, Award, ShieldCheck, Phone, Mail } from 'lucide-react';
import { ImageSideshow } from './ImageSideshow';
import { BRANCH_INFO } from '../data/plans';
import branchManagerPhoto from '../assets/images/branch_manager_photo_1785230421070.jpg';

export const Services: React.FC = () => {
  const servicesList = [
    {
      icon: Wifi,
      title: 'Fiber Broadband',
      description: 'High-capacity optical fiber internet for homes, apartments, and gaming setups with zero buffering.',
      points: ['Buffer-free 4K Streaming', 'Unlimited Data Allowance', 'Low Latency Gaming']
    },
    {
      icon: Building2,
      title: 'Corporate Leased Lines',
      description: 'SLA-backed dedicated bandwidth and static IP allocations engineered for commercial offices and enterprises.',
      points: ['1:1 Bandwidth Ratio', 'Guaranteed 99.9% Uptime', 'Static IPv4 Addresses']
    },
    {
      icon: Radio,
      title: 'Wireless Connectivity',
      description: 'Point-to-point wireless solutions serving outlying union regions beyond physical fiber network reaches.',
      points: ['Rapid Link Deployment', 'High Gain Antennas', 'Remote Area Coverage']
    },
    {
      icon: Headset,
      title: '24/7 Local Support Desk',
      description: 'On-call local technicians in Mithapukur operating round-the-clock for immediate line troubleshooting.',
      points: ['Under 1-Hour Response', 'On-Site Field Engineers', 'Active Line Monitoring']
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Animated Image Poster Side Show Carousel */}
        <ImageSideshow />

        {/* Branch Manager Profile Card Positioned Before Comprehensive Internet Services */}
        <div className="max-w-2xl mx-auto my-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border border-blue-500/30 shadow-2xl flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative shrink-0">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/10">
              <img
                src={branchManagerPhoto}
                alt="Branch Manager Mahamudul Hasan"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-1 rounded-full border-2 border-slate-900 shadow-md">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-extrabold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5" />
              <span>Branch Executive Leadership</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {BRANCH_INFO.manager}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-blue-400">
              {BRANCH_INFO.designation} — {BRANCH_INFO.name}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300">
              <a href={`tel:${BRANCH_INFO.phone}`} className="flex items-center gap-1 text-emerald-400 hover:underline font-bold">
                <Phone className="h-3.5 w-3.5" />
                <span>{BRANCH_INFO.phone}</span>
              </a>
              <a href={`mailto:${BRANCH_INFO.email}`} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                <span>{BRANCH_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            ISP Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Internet Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Tailored connectivity options engineered for residential homes, local commercial hubs, and corporate offices in Mithapukur.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 mb-6">
                  <IconComponent className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                  {service.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
