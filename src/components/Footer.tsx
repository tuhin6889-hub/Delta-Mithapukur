import React from 'react';
import { Logo } from './Logo';
import { BRANCH_INFO } from '../data/plans';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Award } from 'lucide-react';
import branchManagerImg from '../assets/images/branch_manager_photo_1785230421070.jpg';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Logo Column */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" lightText={true} />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed pt-2">
              Delta Mithapukur Branch is a leading provider of high-speed fiber broadband and dedicated corporate internet lines across Mithapukur Upazila, Rangpur Division.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Official Registered Branch — Delta Broadband ISP</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">Home Page</a>
              </li>
              <li>
                <a href="#official-logo" className="hover:text-blue-400 transition-colors">Official Logo & Identity</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">Broadband Services</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-400 transition-colors">Packages & Monthly Fees</a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-blue-400 transition-colors">Mithapukur Coverage Area</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">Apply For New Line</a>
              </li>
              <li>
                <a
                  href="https://radius.yetfix.com/customer_login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 font-bold hover:text-amber-300 hover:underline flex items-center gap-1 mt-1"
                >
                  🔐 Self Care Portal (Customer Login)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Branch Contact</h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{BRANCH_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href={`tel:${BRANCH_INFO.phone}`} className="text-emerald-400 font-bold hover:underline">
                  {BRANCH_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${BRANCH_INFO.email}`} className="text-slate-300 hover:underline">
                  {BRANCH_INFO.email}
                </a>
              </p>
              <p className="flex items-center gap-2 pt-1">
                <svg className="h-4 w-4 fill-current text-[#26A5E4] shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                </svg>
                <a href={BRANCH_INFO.telegramBotLink} target="_blank" rel="noopener noreferrer" className="text-[#26A5E4] font-bold hover:underline">
                  Telegram Bot: {BRANCH_INFO.telegramBotUsername}
                </a>
              </p>
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <img
                    src={branchManagerImg}
                    alt="Branch Manager Mahamudul Hasan"
                    className="w-12 h-14 rounded-lg object-cover object-center border border-blue-500/40 shadow-md shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Award className="h-3 w-3" /> Branch Executive
                    </span>
                    <h5 className="text-xs font-bold text-white">{BRANCH_INFO.manager}</h5>
                    <p className="text-[10px] text-blue-300 font-medium">{BRANCH_INFO.designation}</p>
                  </div>
                </div>
              </div>
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
