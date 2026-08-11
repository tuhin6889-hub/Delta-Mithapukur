import React from 'react';
import { Wifi, Building2, Radio, Headset, CheckCircle, Award, ShieldCheck, Phone, Mail, Megaphone, HelpCircle, MessageCircle } from 'lucide-react';
import { ImageSideshow } from './ImageSideshow';
import { BRANCH_INFO, OUR_TEAM } from '../data/plans';
import branchManagerPhoto from '../assets/images/regenerated_image_1786009739201.jpg';

export const Services: React.FC = () => {
  const branchManager = OUR_TEAM.find(t => t.id === 'team-1') || {
    id: 'team-1',
    name: BRANCH_INFO.manager,
    role: BRANCH_INFO.designation,
    department: 'Branch Operations',
    phone: BRANCH_INFO.phone,
    whatsapp: '01719394430',
    status: 'Online',
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
    status: '24/7 Active',
    image: branchManagerPhoto,
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
    status: 'Outreach',
    image: branchManagerPhoto,
    badge: 'Broadband Outreach',
    description: 'Promoting optical fiber connection deals and corporate line connections.'
  };

  const keyPersonnel = [
    {
      ...branchManager,
      badgeColor: 'from-blue-600 to-emerald-600',
      badgeIcon: ShieldCheck,
      badgeLabel: 'Branch Manager',
      borderColor: 'border-emerald-500/40',
      tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      ...supportManager,
      badgeColor: 'from-amber-500 to-rose-600',
      badgeIcon: HelpCircle,
      badgeLabel: 'Support Manager',
      borderColor: 'border-amber-500/40',
      tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      ...marketingOfficer,
      badgeColor: 'from-indigo-600 to-cyan-500',
      badgeIcon: Megaphone,
      badgeLabel: 'Marketing Officer',
      borderColor: 'border-cyan-500/40',
      tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
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
                  className={`p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border ${person.borderColor} shadow-2xl flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative mb-3">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-lg ring-4 ring-slate-800/50">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={`absolute -bottom-1.5 -right-1.5 bg-gradient-to-r ${person.badgeColor} text-white p-1 rounded-full border-2 border-slate-900 shadow-md`}>
                      <BadgeIcon className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>

                  <div className="space-y-1 w-full">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${person.tagColor}`}>
                      <Award className="h-3 w-3" />
                      <span>{person.badgeLabel}</span>
                    </div>
                    <h4 className="text-lg font-black text-white tracking-tight">
                      {person.name}
                    </h4>
                    <p className="text-xs font-bold text-blue-400">
                      {person.role} — Delta Mithapukur
                    </p>
                    <p className="text-[11px] text-slate-400 leading-snug pt-1 px-2 line-clamp-2">
                      {person.description}
                    </p>
                    
                    <div className="pt-3 flex items-center justify-center gap-3 text-xs border-t border-slate-800/80 mt-3">
                      <a 
                        href={person.whatsapp ? `https://wa.me/88${person.whatsapp.replace(/[^0-9]/g, '')}` : `tel:${person.phone}`} 
                        target={person.whatsapp ? "_blank" : undefined}
                        rel={person.whatsapp ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-1 text-emerald-400 hover:underline font-bold"
                        title={person.whatsapp ? "Connect via WhatsApp" : "Call Phone"}
                      >
                        {person.whatsapp ? (
                          <>
                            <MessageCircle className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20" />
                            <span>WhatsApp: {person.phone}</span>
                          </>
                        ) : (
                          <>
                            <Phone className="h-3.5 w-3.5" />
                            <span>{person.phone}</span>
                          </>
                        )}
                      </a>
                      <a href={`mailto:${BRANCH_INFO.email}`} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                        <Mail className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
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
