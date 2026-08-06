import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { BRANCH_INFO, OUR_TEAM } from '../data/plans';
import { Phone, Mail, MapPin, ShieldCheck, Award, ExternalLink, Sparkles, Lock, Gauge, LifeBuoy, FileText, Send, Users } from 'lucide-react';
import branchManagerImg from '../assets/images/branch_manager_photo_1785230421070.jpg';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Logo Column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" lightText={true} />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed pt-1">
              Delta Mithapukur Branch is a leading provider of high-speed fiber broadband and dedicated corporate internet lines across Mithapukur Upazila, Rangpur Division.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold pt-1">
              <ShieldCheck className="h-4 w-4 shrink-0 text-blue-400" />
              <span>Official Registered Branch — Delta Broadband ISP</span>
            </div>

            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Branch Manager Card */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
                  <img
                    src={branchManagerImg}
                    alt="Branch Manager Mahamudul Hasan"
                    className="w-10 h-12 rounded-lg object-cover object-center border border-blue-500/40 shadow-md shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Award className="h-2.5 w-2.5" /> Manager
                    </span>
                    <h5 className="text-xs font-bold text-white truncate">{BRANCH_INFO.manager}</h5>
                    <p className="text-[9px] text-blue-300 font-medium truncate">{BRANCH_INFO.designation}</p>
                  </div>
                </div>

                {/* Our Team Card */}
                <motion.a 
                  href="#contact" 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/30 hover:border-purple-500/60 transition-colors group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 group-hover:bg-purple-600/30">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[9px] text-purple-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Users className="h-2.5 w-2.5" /> Our Team
                    </span>
                    <h5 className="text-xs font-bold text-white truncate">Delta Mithapukur Team</h5>
                    <p className="text-[9px] text-purple-300 font-medium truncate">{OUR_TEAM.length} Active Members</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Home Page</span>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Packages & Fees</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Broadband Services</span>
                </a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Mithapukur Coverage Area</span>
                </a>
              </li>
              <li>
                <a href="#speed-test" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Gauge className="h-3 w-3 text-blue-400" />
                  <span>BDIX Speed Test</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>FAQ & Help Center</span>
                </a>
              </li>
              <li>
                <a href="#referral" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400/90 font-medium">
                  <span>Referral Rewards</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Apply For Connection</span>
                </a>
              </li>
              <li>
                <a href="#official-logo" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>Official Logo & Identity</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Important External Portals Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Important Links & Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://radius.yetfix.com/customer_login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/30 text-amber-300 font-extrabold flex items-center justify-between gap-1.5 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Self Care Customer Login</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://aistudio.google.com/apps/bb46533d-01c6-4632-922f-ebc7a77d1339?showPreview=true&showAssistant=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 font-extrabold flex items-center justify-between gap-1.5 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                    <span>Support Ticket Portal</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://aistudio.google.com/apps/0394c8e7-033c-44cd-9f79-661ff5aee2e2?showPreview=true&showAssistant=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-indigo-950/30 hover:bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 font-extrabold flex items-center justify-between gap-1.5 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <span>Client DB & Marketing Portal</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href={BRANCH_INFO.telegramBotLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#26A5E4] transition-colors flex items-center gap-2 text-slate-300 pt-1"
                >
                  <Send className="h-3.5 w-3.5 text-[#26A5E4] shrink-0" />
                  <span>Telegram Support Bot ({BRANCH_INFO.telegramBotUsername})</span>
                </a>
              </li>
              <li>
                <a
                  href={BRANCH_INFO.telegramChannelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#26A5E4] transition-colors flex items-center gap-2 text-slate-300"
                >
                  <Send className="h-3.5 w-3.5 text-[#26A5E4] shrink-0" />
                  <span>Telegram Official Channel</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Branch Contact
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BRANCH_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href={`tel:${BRANCH_INFO.phone}`} className="text-emerald-400 font-extrabold hover:underline">
                  {BRANCH_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${BRANCH_INFO.email}`} className="text-slate-300 hover:underline truncate">
                  {BRANCH_INFO.email}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Delta Mithapukur Branch. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Powered by Delta Internet • {BRANCH_INFO.tagline}</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
