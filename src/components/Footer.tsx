import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { BRANCH_INFO, OUR_TEAM } from '../data/plans';
import { Phone, Mail, MapPin, ShieldCheck, Award, ExternalLink, Sparkles, Lock, Gauge, LifeBuoy, FileText, Send, Users, Globe } from 'lucide-react';
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
                <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                <a href={BRANCH_INFO.website} target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-extrabold hover:underline truncate">
                  {BRANCH_INFO.domain}
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

        {/* Bottom Copyright & Social Media Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Delta Mithapukur Branch. All rights reserved.</p>
            <p className="text-[11px] text-slate-400">
              Powered by <strong className="text-blue-400 font-bold">Delta Broadband Internet</strong> • {BRANCH_INFO.tagline}
            </p>
          </div>

          {/* Social Media Links in Bottom Right Corner */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 md:pt-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:inline-block">Connect With Us:</span>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a
                href={BRANCH_INFO.facebookPageLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Delta Mithapukur on Facebook"
                aria-label="Facebook Page"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Messenger */}
              <a
                href={BRANCH_INFO.messengerLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Send a Direct Message on Messenger"
                aria-label="Facebook Messenger"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[linear-gradient(135deg,#00B2FF,#006AFF,#FF5280)] hover:border-sky-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,178,255,0.5)] group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.082.3 2.23.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.961 3.129 3.26 5.889-3.26-6.559 6.961z"/>
                </svg>
              </a>

              {/* Telegram */}
              <a
                href={BRANCH_INFO.telegramChannelLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Join Official Telegram Channel"
                aria-label="Telegram Channel"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#26A5E4] hover:border-[#26A5E4] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(38,165,228,0.5)] group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm5.262 7.222c.118.026.242.083.315.197.108.167.098.375.052.563l-2.023 9.531c-.131.618-.495.83-.984.542l-3.092-2.278-1.493 1.438c-.165.165-.304.304-.624.304l.222-3.15 5.733-5.18c.25-.222-.054-.344-.388-.122l-7.086 4.462-3.053-.954c-.663-.207-.677-.663.138-.98l11.944-4.602c.553-.203 1.042.138.86.88z"/>
                </svg>
              </a>

              {/* WhatsApp Support */}
              <a
                href={`https://wa.me/880${BRANCH_INFO.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp 24/7 Support"
                aria-label="WhatsApp Support"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={BRANCH_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="View LinkedIn Professional Profile"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(10,102,194,0.5)] group"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Website / Globe */}
              <a
                href={BRANCH_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Official Delta Internet Website"
                aria-label="Official Website"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] group"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
