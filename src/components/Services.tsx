import React from 'react';
import { Wifi, Building2, Radio, Headset, CheckCircle, Award, ShieldCheck, Phone, Mail, Megaphone, HelpCircle, MessageCircle, MessageSquare, MessagesSquare, CheckCircle2, Server, MapPin } from 'lucide-react';
import { ImageSideshow } from './ImageSideshow';
import { BRANCH_INFO, OUR_TEAM } from '../data/plans';
import branchManagerPhoto from '../assets/images/regenerated_image_1786009739201.jpg';
import supportManagerPhoto from '../assets/images/support_manager_avatar_1786007253596.jpg';
import marketingOfficerPhoto from '../assets/images/regenerated_image_1786855975878.png';

export const Services: React.FC = () => {
  const branchManager = OUR_TEAM.find(t => t.id === 'team-1') || {
    id: 'team-1',
    name: BRANCH_INFO.manager,
    role: BRANCH_INFO.designation,
    department: 'Branch Operations',
    phone: BRANCH_INFO.phone,
    whatsapp: '01719394430',
    status: 'Online & Available',
    image: branchManagerPhoto,
    badge: 'Branch Executive Lead',
    description: 'Leading Delta Mithapukur branch operations & corporate fiber deployment.'
  };

  const supportManager = OUR_TEAM.find(t => t.id === 'team-sm') || {
    id: 'team-sm',
    name: 'MD. Jion Hasan',
    role: 'Support Manager',
    department: 'Support Desk',
    phone: '01944455176',
    whatsapp: '01944455176',
    status: '24/7 Desk Active',
    image: supportManagerPhoto,
    badge: '24/7 Support Lead',
    description: 'Managing 24/7 technical helpdesk and query resolution.'
  };

  const marketingOfficer = OUR_TEAM.find(t => t.id === 'team-mo') || {
    id: 'team-mo',
    name: 'Habibur Rahman',
    role: 'Marketing Officer',
    department: 'Marketing',
    phone: '01944455176',
    whatsapp: '01944455176',
    status: 'Field Outreach Active',
    image: marketingOfficerPhoto,
    badge: 'Broadband Outreach',
    description: 'Promoting optical fiber connection deals and corporate line connections.'
  };

  const keyPersonnel = [
    {
      ...branchManager,
      badgeColor: 'from-blue-600 via-indigo-600 to-sky-500',
      badgeIcon: MessageCircle,
      badgeLabel: 'Branch Manager',
      borderColor: 'border-blue-500/40 hover:border-blue-400/80',
      tagColor: 'bg-blue-500/10 text-sky-400 border-blue-500/30',
      messenger: BRANCH_INFO.messengerLink,
    },
    {
      ...supportManager,
      badgeColor: 'from-amber-500 to-rose-600',
      badgeIcon: HelpCircle,
      badgeLabel: 'Support Manager',
      borderColor: 'border-amber-500/40 hover:border-amber-400/80',
      tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      messenger: BRANCH_INFO.messengerLink,
    },
    {
      ...marketingOfficer,
      badgeColor: 'from-indigo-600 to-cyan-500',
      badgeIcon: Megaphone,
      badgeLabel: 'Marketing Officer',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400/80',
      tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      messenger: BRANCH_INFO.messengerLink,
    }
  ];

  const popInCharges = [
    {
      popName: 'Boldipukur Bazzar (Delta Mithapukur Brach)',
      bengaliPopName: 'বলদিপুকুর বাজার (ডেল্টা মিঠাপুকুর ব্রাঞ্চ)',
      type: 'Central Transmission Core PoP',
      officerName: 'Mahamudul Hasan',
      role: 'Branch Manager & Core PoP In-Charge',
      phone: '0171-9394430',
      whatsapp: '01719394430',
      image: branchManagerPhoto,
      status: 'Core Active',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      borderColor: 'border-emerald-500/40'
    },
    {
      popName: 'Borogorga PoP',
      bengaliPopName: 'বড়দরগাহ্‌ পিওপি',
      type: 'Main Regional PoP',
      officerName: 'MD. Jion Hasan',
      role: 'Support Manager & Borogorga PoP In-Charge',
      phone: '01944455176',
      whatsapp: '01944455176',
      image: supportManagerPhoto,
      status: 'Regional Active',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      borderColor: 'border-blue-500/40'
    },
    {
      popName: 'Molonghat Sub PoP',
      bengaliPopName: 'মোলংহাট সাব-পিওপি',
      type: 'Distribution Sub PoP',
      officerName: 'Habibur Rahman',
      role: 'Marketing Lead & Molonghat Sub PoP In-Charge',
      phone: '01944455176',
      whatsapp: '01944455176',
      image: marketingOfficerPhoto,
      status: 'Sub PoP Active',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      borderColor: 'border-indigo-500/40'
    },
    {
      popName: 'Shalaipur Sub PoP',
      bengaliPopName: 'শালাইপুর সাব-পিওপি',
      type: 'Distribution Sub PoP',
      officerName: 'Sharif Hossain',
      role: 'Senior NOC Specialist & Shalaipur Sub PoP In-Charge',
      phone: '01712-001122',
      whatsapp: '01712001122',
      image: branchManagerPhoto,
      status: 'Sub PoP Active',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      borderColor: 'border-purple-500/40'
    }
  ];

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

        {/* Branch Key Leadership Cards */}
        <div className="my-12">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Delta Mithapukur Branch Team
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Branch Leadership & Officers
            </h3>
            <p className="text-xs text-slate-400">
              Direct access to key officials managing operations, support, and marketing in Mithapukur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyPersonnel.map((person, idx) => {
              const BadgeIcon = person.badgeIcon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-900 to-slate-950 border ${person.borderColor} shadow-2xl backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-300`}
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />

                  {/* Top Status & Verification Row */}
                  <div className="w-full flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/80 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 -ml-3" />
                      <span>{person.status}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                      <CheckCircle2 className="h-3 w-3 text-blue-400" />
                      <span>Official</span>
                    </span>
                  </div>
                  
                  {/* Executive Portrait Frame */}
                  <div className="relative mb-4">
                    <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-blue-500/30 via-slate-800 to-slate-900 border border-blue-500/40 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.25)] group-hover:border-blue-400 group-hover:shadow-[0_10px_30px_-5px_rgba(59,130,246,0.4)] transition-all duration-300">
                      <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-950 flex items-center justify-center">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:brightness-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Department Badge Icon Floating Overlay */}
                    <div className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${person.badgeColor} text-white p-2 rounded-xl border-2 border-slate-900 shadow-xl group-hover:scale-110 transition-transform`}>
                      <BadgeIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Officer Info & Role */}
                  <div className="space-y-1.5 w-full flex-1 flex flex-col justify-between">
                    <div>
                      <div className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider mb-1.5 ${person.tagColor}`}>
                        <Award className="h-3 w-3" />
                        <span>{person.badgeLabel}</span>
                      </div>

                      <h4 className="text-xl font-black text-white tracking-tight group-hover:text-blue-300 transition-colors">
                        {person.name}
                      </h4>

                      <p className="text-xs font-bold text-blue-400">
                        {person.role} — Delta Mithapukur
                      </p>

                      <p className="text-xs text-slate-400 leading-relaxed pt-1.5 px-1">
                        {person.description}
                      </p>
                    </div>
                    
                    {/* Direct Contact Action Bar */}
                    <div className="pt-4 mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-800/80 w-full">
                      {person.messenger ? (
                        <a 
                          href={person.messenger}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 hover:border-blue-400 text-sky-300 font-bold transition-all text-[11px] shadow-sm"
                          title="Direct Facebook Messenger Chat"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-sky-400 fill-sky-400/30" />
                          <span>Messenger</span>
                        </a>
                      ) : (
                        <a 
                          href={person.whatsapp ? `https://wa.me/88${person.whatsapp.replace(/[^0-9]/g, '')}` : `tel:${person.phone}`} 
                          target={person.whatsapp ? "_blank" : undefined}
                          rel={person.whatsapp ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold transition-all text-[11px]"
                          title={person.whatsapp ? "Direct WhatsApp Chat" : "Call Phone"}
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      <a 
                        href={`tel:${person.phone}`}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold transition-all text-[11px]"
                      >
                        <Phone className="h-3.5 w-3.5 text-blue-400" />
                        <span>{person.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All PoP In-Charge Officers Section */}
        <div className="my-16 bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3.5 py-1.5 rounded-full border border-sky-500/20">
              <Server className="h-3.5 w-3.5 text-sky-400" />
              <span>PoP In-Charge Officers</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              All PoP In-Charge Directory
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Dedicated officers responsible for core transmission, regional routing, and local sub-PoP distribution across Delta Mithapukur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {popInCharges.map((pop, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-slate-950 border ${pop.borderColor} shadow-xl flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${pop.badgeColor}`}>
                      {pop.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-sky-400" />
                      <span>PoP 0{idx + 1}</span>
                    </span>
                  </div>

                  {/* PoP Name */}
                  <div className="mb-3 pb-2.5 border-b border-slate-800/80">
                    <h4 className="text-sm font-black text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {pop.popName}
                    </h4>
                    <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                      {pop.bengaliPopName}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">
                      {pop.type}
                    </span>
                  </div>

                  {/* Officer Info */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="h-12 w-12 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0 shadow-md">
                      <img
                        src={pop.image}
                        alt={pop.officerName}
                        className="h-full w-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase text-sky-400 block tracking-wider">
                        PoP In-Charge
                      </span>
                      <h5 className="text-sm font-bold text-slate-100 truncate">
                        {pop.officerName}
                      </h5>
                      <p className="text-[10px] text-slate-400 line-clamp-1">
                        {pop.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Action */}
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs">
                  <a
                    href={`https://wa.me/88${pop.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] transition-all"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${pop.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-[11px] transition-all"
                  >
                    <Phone className="h-3 w-3 text-sky-400" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
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
