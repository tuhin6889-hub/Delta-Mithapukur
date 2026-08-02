import React, { useState } from 'react';
import { Logo } from './Logo';
import deltaLogoImg from '../assets/images/regenerated_image_1785198851415.jpg';
import branchManagerImg from '../assets/images/branch_manager_photo_1785230421070.jpg';
import promoBannerImg from '../assets/images/regenerated_image_1785198706619.png';
import {
  ShieldCheck,
  Download,
  Copy,
  Check,
  Info,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  UserCheck,
  Quote,
  MessageSquare,
  Award,
  Zap,
  Globe,
  Maximize2,
  X,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';

interface ImageCrateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  src: string;
  date: string;
  dimensions: string;
}

export const OfficialLogoSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'logo' | 'manager' | 'crate'>('crate');
  const [selectedModalImage, setSelectedModalImage] = useState<ImageCrateItem | null>(null);

  const handleCopyBrandName = () => {
    navigator.clipboard.writeText(`${BRANCH_INFO.name} - ${BRANCH_INFO.tagline} | Manager: ${BRANCH_INFO.manager} (${BRANCH_INFO.phone})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const imageCrateGallery: ImageCrateItem[] = [
    {
      id: 'crate-1',
      title: 'Branch Manager Mahamudul Hasan',
      category: 'Leadership & Executive',
      description: 'Official executive portrait of Mithapukur Akmal Market Branch Manager Mahamudul Hasan.',
      src: branchManagerImg,
      date: 'Updated July 2026',
      dimensions: 'High-Res Portrait',
    },
    {
      id: 'crate-2',
      title: 'Delta Internet Corporate Logo Emblem',
      category: 'Brand Assets',
      description: 'Official high-resolution vector logo emblem for Delta Software & Communication.',
      src: deltaLogoImg,
      date: 'Official Master Asset',
      dimensions: '2400 x 1350 px',
    },
    {
      id: 'crate-3',
      title: 'Mithapukur Rural Fiber Coverage & Packages',
      category: 'Promotional Banner',
      description: 'Official Mithapukur Upazila broadband internet rates and 100% optical fiber service banner.',
      src: promoBannerImg,
      date: '2026 Special Tariff',
      dimensions: '1920 x 860 px',
    },
  ];

  return (
    <section id="official-logo" className="py-16 bg-slate-900 border-y border-slate-800 text-white relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative space-y-12">
        
        {/* Section Main Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Official Brand & Executive Office
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Delta Mithapukur Brand Identity & Image Crate
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Explore official branch media assets, corporate logos, and executive photos managed by Mithapukur Branch Manager Mahamudul Hasan.
          </p>

          {/* Navigation Tabs */}
          <div className="pt-3 flex justify-center">
            <div className="inline-flex p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold flex-wrap justify-center gap-1">
              <button
                onClick={() => setActiveTab('crate')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'crate'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Image Crate (Gallery)</span>
              </button>
              <button
                onClick={() => setActiveTab('manager')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'manager'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="h-4 w-4" />
                <span>Branch Manager Photo & Discussion</span>
              </button>
              <button
                onClick={() => setActiveTab('logo')}
                className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'logo'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Official Brand Logo</span>
              </button>
            </div>
          </div>
        </div>

        {/* IMAGE CRATE GALLERY SECTION */}
        {activeTab === 'crate' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Image Crate by Delta Mithapukur Branch</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">3 Official Media Assets</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {imageCrateGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl hover:border-blue-500/50 transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-60 bg-slate-900 overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedModalImage(item)}
                        className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-transform transform scale-90 group-hover:scale-100 cursor-pointer"
                        title="View Fullsize"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <a
                        href={item.src}
                        download={`${item.title.toLowerCase().replace(/\s+/g, '_')}.jpg`}
                        className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-lg hover:bg-emerald-500 transition-transform transform scale-90 group-hover:scale-100 cursor-pointer"
                        title="Download Asset"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1.5 line-clamp-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{item.date}</span>
                      <span className="font-mono text-slate-400">{item.dimensions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: Official Logo Display & Spec Card */}
        {activeTab === 'logo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl animate-in fade-in duration-300">
            
            {/* Left Column: High-Res Official Logo Display Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 relative group">
              <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-md">
                <ShieldCheck className="h-3 w-3" /> Official Emblem
              </div>

              <div className="my-6 p-5 bg-white rounded-2xl shadow-2xl ring-4 ring-blue-500/20 max-w-[260px] transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={deltaLogoImg}
                  alt="Delta Official Logo"
                  className="w-full h-auto object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-center space-y-1">
                <p className="text-xs text-slate-300 font-bold">
                  Delta Software & Communication
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Mithapukur Akmal Market Distribution Hub
                </p>
              </div>
            </div>

            {/* Right Column: Brand Specifications & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Delta Internet Corporate Visual Identity</span>
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  The official Delta logo features the dynamic red and blue optical swoosh representing high-speed data transmission, ultra-low latency BDIX routing, and 100% fiber optic stability across Rangpur district.
                </p>
              </div>

              {/* Spec Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-1">
                  <span className="text-slate-400 block font-medium">Branch Name:</span>
                  <span className="text-slate-100 font-bold text-sm">{BRANCH_INFO.name}</span>
                </div>
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-1">
                  <span className="text-slate-400 block font-medium">Official Tagline:</span>
                  <span className="text-blue-300 font-bold text-sm">{BRANCH_INFO.tagline}</span>
                </div>
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-1">
                  <span className="text-slate-400 block font-medium">Branch Manager:</span>
                  <span className="text-slate-100 font-bold text-sm">{BRANCH_INFO.manager}</span>
                </div>
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 space-y-1">
                  <span className="text-slate-400 block font-medium">Hotline / Support:</span>
                  <span className="text-emerald-400 font-bold text-sm">{BRANCH_INFO.phone}</span>
                </div>
              </div>

              {/* Interactive Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={deltaLogoImg}
                  download="delta_mithapukur_official_logo.jpg"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Official High-Res Logo</span>
                </a>

                <button
                  onClick={handleCopyBrandName}
                  className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs px-4 py-3 rounded-xl transition-all cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied Brand Info!' : 'Copy Brand Details'}</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Photo Box About Branch Manager Mahamudul Hasan & Discussion */}
        {(activeTab === 'manager' || activeTab === 'crate') && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/80 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative space-y-8">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Branch Leadership & Executive Discussion</h3>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                Mithapukur Akmal Market Branch Office
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Photo Box: Branch Manager Portrait */}
              <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  {/* Decorative Frame Glow */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-sky-500 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
                  
                  <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-900">
                    <img
                      src={branchManagerImg}
                      alt="Branch Manager Mahamudul Hasan"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-left flex items-end justify-between gap-2">
                      <div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                          <Award className="h-3 w-3" /> Certified ISP Executive
                        </span>
                        <h4 className="text-lg font-black text-white mt-1">{BRANCH_INFO.manager}</h4>
                        <p className="text-xs text-blue-300 font-semibold">{BRANCH_INFO.designation}</p>
                      </div>

                      {/* Social Quick Badges */}
                      <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
                        <a
                          href={BRANCH_INFO.telegramDirectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-blue-400 hover:bg-blue-600/30 text-[#26A5E4] transition-all shadow-md"
                          title="Telegram Chat 01719394430"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.122.099.155.232.17.327.016.096.035.313.019.485z"/>
                          </svg>
                        </a>
                        <a
                          href={BRANCH_INFO.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-blue-400 hover:bg-blue-600/30 text-[#0A66C2] transition-all shadow-md"
                          title="LinkedIn Profile"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.36-2.5 1.84-2.5 1.48 0 1.5 1.4 1.5 2.58v4.85h2.71M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                          </svg>
                        </a>
                        <a
                          href={BRANCH_INFO.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-blue-400 hover:bg-blue-600/30 text-[#1877F2] transition-all shadow-md"
                          title="Facebook Profile"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manager Contact & Social Media Shortcuts */}
                <div className="w-full max-w-xs space-y-2 text-xs">
                  <a
                    href={`tel:${BRANCH_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Direct Phone:</span>
                    </span>
                    <strong className="text-emerald-400 font-mono">{BRANCH_INFO.phone}</strong>
                  </a>

                  <a
                    href={`mailto:${BRANCH_INFO.email}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors text-slate-200 truncate"
                  >
                    <span className="flex items-center gap-2 shrink-0">
                      <Mail className="h-3.5 w-3.5 text-blue-400" />
                      <span>Email:</span>
                    </span>
                    <span className="text-slate-300 font-mono text-[11px] truncate">{BRANCH_INFO.email}</span>
                  </a>

                  {/* Social Profiles Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={BRANCH_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-blue-950/60 border border-slate-800 hover:border-blue-500/50 transition-all text-slate-200 hover:text-white group"
                      title="Connect on LinkedIn"
                    >
                      <svg className="h-4 w-4 fill-current text-[#0A66C2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.36-2.5 1.84-2.5 1.48 0 1.5 1.4 1.5 2.58v4.85h2.71M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      <span className="font-bold text-[11px]">LinkedIn</span>
                    </a>

                    <a
                      href={BRANCH_INFO.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-blue-950/60 border border-slate-800 hover:border-blue-500/50 transition-all text-slate-200 hover:text-white group"
                      title="Follow on Facebook"
                    >
                      <svg className="h-4 w-4 fill-current text-[#1877F2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-bold text-[11px]">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Discussion & Executive Message Box */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="relative bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
                  <Quote className="h-10 w-10 text-blue-500/20 absolute top-4 right-4" />

                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Executive Message from Branch Manager
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      "Connecting Every Union of Mithapukur with World-Class Optical Fiber"
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic border-l-2 border-blue-500 pl-4 py-1">
                    "Assalamu Alaikum! As the Branch Manager of Delta Internet Mithapukur, I take immense pride in delivering high-speed, zero-buffer broadband internet across our upazila. Whether you reside in Mithapukur Sadar Town, Boldipukur Bazaar, Ranipukur, or Pairaband, our goal is to ensure robust 100% optical fiber connectivity for remote education, freelancing, small businesses, and family entertainment."
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    "Our dedicated local engineering team based at Boldipukur Akmal Market works round-the-clock to maintain low-latency BDIX routing, optical line redundancy, and rapid response field maintenance. We treat every subscriber as family."
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <Zap className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="text-slate-200 font-semibold">100% Optical Fiber Backbone</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 font-semibold">24/7 Local Support Desk</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <Globe className="h-4 w-4 text-blue-400 shrink-0" />
                      <span className="text-slate-200 font-semibold">17 Unions Fiber Coverage</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <MessageSquare className="h-4 w-4 text-sky-400 shrink-0" />
                      <span className="text-slate-200 font-semibold">Instant bKash Bill Processing</span>
                    </div>
                  </div>

                  {/* Branch Location Footer Note */}
                  <div className="pt-3 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-400">
                    <MapPin className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Branch Office:</strong> {BRANCH_INFO.address}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedModalImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 relative space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedModalImage(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">{selectedModalImage.title}</h3>
            </div>

            <div className="max-h-[70vh] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-slate-800">
              <img
                src={selectedModalImage.src}
                alt={selectedModalImage.title}
                className="max-h-[60vh] w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <p className="text-slate-300">{selectedModalImage.description}</p>
              <a
                href={selectedModalImage.src}
                download={`${selectedModalImage.title.toLowerCase().replace(/\s+/g, '_')}.jpg`}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Asset</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
