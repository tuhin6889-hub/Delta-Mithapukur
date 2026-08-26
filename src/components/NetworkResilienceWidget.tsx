import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CloudRain,
  CloudLightning,
  Wind,
  Sun,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Activity,
  RefreshCw,
  CheckCircle2,
  Droplets,
  Radio,
  HelpCircle,
  Phone,
  ArrowRight,
  Wifi,
  Power,
  ChevronRight,
  Sparkles,
  Info,
  MapPin,
  Clock,
  Check,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type WeatherScenario = 'monsoon' | 'thunderstorm' | 'high_wind' | 'clear';

interface UnionResilienceStatus {
  id: string;
  nameEn: string;
  nameBn: string;
  opticalSignal: string; // e.g. -18.4 dBm
  gridStatus: 'Normal' | 'Fluctuating' | 'Backup Active';
  resilienceScore: number; // 0-100
  aerialCondition: 'Secure' | 'Monitored' | 'Protected';
  linemanSquad: string;
}

const MITHAPUKUR_UNIONS_RESILIENCE: UnionResilienceStatus[] = [
  {
    id: 'sadar',
    nameEn: 'Mithapukur Sadar & Upazila HQ',
    nameBn: 'মিঠাপুকুর সদর ও উপজেলা হেডকোয়ার্টার্স',
    opticalSignal: '-17.8 dBm',
    gridStatus: 'Normal',
    resilienceScore: 99,
    aerialCondition: 'Protected',
    linemanSquad: 'Sadar Rapid Squad'
  },
  {
    id: 'akmal',
    nameEn: 'Akmal Market & Boldipukur Hub',
    nameBn: 'আকমল মার্কেট ও বলদপুকুর হাব',
    opticalSignal: '-18.2 dBm',
    gridStatus: 'Normal',
    resilienceScore: 98,
    aerialCondition: 'Protected',
    linemanSquad: 'Akmal Core Team'
  },
  {
    id: 'payraband',
    nameEn: 'Payraband (Begum Rokeya Zone)',
    nameBn: 'পায়রাবন্দ (বেগম রোকেয়া চত্বর)',
    opticalSignal: '-19.1 dBm',
    gridStatus: 'Normal',
    resilienceScore: 97,
    aerialCondition: 'Secure',
    linemanSquad: 'Payraband Splicing Unit'
  },
  {
    id: 'ranipukur',
    nameEn: 'Ranipukur & Latifpur Union',
    nameBn: 'রানীপুকুর ও লতিফপুর ইউনিয়ন',
    opticalSignal: '-20.4 dBm',
    gridStatus: 'Fluctuating',
    resilienceScore: 94,
    aerialCondition: 'Monitored',
    linemanSquad: 'Ranipukur Field Crew'
  },
  {
    id: 'chengmari',
    nameEn: 'Chengmari & Balua Masimpur',
    nameBn: 'চেংমারী ও বালুয়া মাসিমপুর',
    opticalSignal: '-21.0 dBm',
    gridStatus: 'Normal',
    resilienceScore: 95,
    aerialCondition: 'Monitored',
    linemanSquad: 'Balua Fiber Crew'
  },
  {
    id: 'mirzapur',
    nameEn: 'Mirzapur & Khoragach Loop',
    nameBn: 'মির্জাপুর ও খোড়াগাছ লুপ',
    opticalSignal: '-19.8 dBm',
    gridStatus: 'Normal',
    resilienceScore: 96,
    aerialCondition: 'Secure',
    linemanSquad: 'North Border Squad'
  }
];

interface NetworkResilienceWidgetProps {
  onOpenSupportTicket?: (tab?: any) => void;
  onOpenInquiry?: () => void;
}

export const NetworkResilienceWidget: React.FC<NetworkResilienceWidgetProps> = ({
  onOpenSupportTicket,
  onOpenInquiry
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [activeScenario, setActiveScenario] = useState<WeatherScenario>('monsoon');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState('12:45 PM');
  
  // Interactive Diagnostic Modal/Card State
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [diagnosticComplete, setDiagnosticComplete] = useState(false);
  const [activeTipTab, setActiveTipTab] = useState<'tips' | 'unions' | 'comparison'>('tips');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastRefreshedTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastRefreshedTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setIsRefreshing(false);
    }, 750);
  };

  const handleRunDiagnostic = () => {
    setDiagnosticRunning(true);
    setDiagnosticComplete(false);
    setDiagnosticStep(1);

    setTimeout(() => {
      setDiagnosticStep(2);
      setTimeout(() => {
        setDiagnosticStep(3);
        setTimeout(() => {
          setDiagnosticRunning(false);
          setDiagnosticComplete(true);
        }, 800);
      }, 900);
    }, 900);
  };

  // Weather scenario specific data
  const weatherConfig = {
    monsoon: {
      labelEn: 'Monsoon Rain & Gusts',
      labelBn: 'ভারী বর্ষণ ও দমকা হাওয়া',
      icon: CloudRain,
      iconColor: 'text-sky-400',
      badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
      rainfall: '24 mm/h',
      windSpeed: '32 km/h',
      lightningRisk: 'Moderate',
      gridStability: '92% (REB Active)',
      fiberScore: 98,
      fiberStatusEn: 'Pure Glass FTTH Immune to Rain',
      fiberStatusBn: 'অপটিক্যাল ফাইবার বৃষ্টিতে সম্পূর্ণ অক্ষত',
      headlineEn: 'Monsoon Fiber Protection Active Across Mithapukur',
      headlineBn: 'মিঠাপুকুর জুড়ে মনসুন ফাইবার প্রোটেকশন সক্রিয়',
      summaryEn: 'Heavy precipitation has zero impact on optical photon transmission. Overhead pole tension dampeners are operating normally.',
      summaryBn: 'বৃষ্টির পানিতে অপটিক্যাল ফাইবারের আলো বা স্পিডে কোনো ক্ষতি হয় না। পোলের ড্যাম্পেনার সক্রিয় আছে।',
      tips: [
        {
          titleEn: 'Keep ONU / TJ Box Away from Moisture',
          titleBn: 'টিজে বক্স ও অনু (ONU) শুকনো স্থানে রাখুন',
          descEn: 'Rain cannot harm external optical cables, but moisture or water dripping on the indoor blue patch-cord adapter can cause optical bending loss.',
          descBn: 'বাইরের ক্যাবল ওয়াটারপ্রুফ হলেও ঘরের ভেতরের নীল প্যাচ কর্ড ও অ্যাডাপ্টারে যেন বৃষ্টির পানি না লাগে তা নিশ্চিত করুন।',
          badge: 'Moisture Care'
        },
        {
          titleEn: 'Equip a 12V Mini DC-UPS for Load Shedding',
          titleBn: 'লোডশেডিং এ ব্যাকআপের জন্য মিনি ডিসি-ইউপিএস ব্যবহার করুন',
          descEn: 'Rural REB power may trip during heavy showers. A Mini-UPS keeps your WiFi router & ONU powered for 6-8 hours without interruption.',
          descBn: 'বৃষ্টির সময় পল্লী বিদ্যুতের সাময়িক শাটডাউনেও নিরবচ্ছিন্ন ৬-৮ ঘণ্টা ইন্টারনেট পেতে মিনি ডিসি-ইউপিএস চালু রাখুন।',
          badge: 'Power Continuity'
        },
        {
          titleEn: 'Check Overhead Drop Wire Slack',
          titleBn: 'ড্রপ ক্যাবলের ওপর গাছের ডাল লক্ষ্য রাখুন',
          descEn: 'If wet heavy tree branches bend into your home drop wire, notify our linemen immediately rather than pulling the wire yourself.',
          descBn: 'গাছের ভেজা ভারী ডাল ক্যাবলের ওপর পড়লে নিজে না টেনে আমাদের লাইনম্যান স্কোয়াডে দ্রুত জানান।',
          badge: 'Aerial Safety'
        }
      ]
    },
    thunderstorm: {
      labelEn: 'Severe Thunderstorm & Lightning',
      labelBn: 'তীব্র কালবৈশাখী ও বজ্রপাত সতর্কতা',
      icon: CloudLightning,
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      rainfall: '48 mm/h',
      windSpeed: '54 km/h',
      lightningRisk: 'High / Severe',
      gridStability: '78% (Surge Guarded)',
      fiberScore: 95,
      fiberStatusEn: 'Dielectric Fiber (Non-Conductive)',
      fiberStatusBn: 'ডাইইলেকট্রিক ফাইবার (বিদ্যুৎ অপরিবাহী)',
      headlineEn: 'Severe Lightning Alert — Fiber Glass is 100% Non-Conductive',
      headlineBn: 'বজ্রপাত সতর্কতা — অপটিক্যাল ফাইবার বিদ্যুৎ পরিবহন করে না',
      summaryEn: 'Unlike old copper phone lines, Delta glass optical fibers cannot conduct lightning voltage. However, surge-protect your wall AC socket.',
      summaryBn: 'তামার তারের মতো ফাইবারে বজ্রপাতের বিদ্যুৎ ঢোকে না, তবে দেয়ালের কারেন্ট সকেট থেকে রাউটার রক্ষায় সার্জ প্রোটেকশন নিন।',
      tips: [
        {
          titleEn: 'Fiber is Safe from Lightning (Dielectric)',
          titleBn: 'ফাইবার তারে বজ্রপাতের ভয় নেই',
          descEn: 'Optical fiber transmits pure laser light through silicon dioxide glass. It carries zero electrical conductivity, protecting your devices from outdoor strikes.',
          descBn: 'অপটিক্যাল ফাইবার সম্পূর্ণ কাচের তৈরি হওয়ায় বাইরের বজ্রপাত ক্যাবল দিয়ে ঘরের ভেতরে পৌঁছাতে পারে না।',
          badge: 'Dielectric Armor'
        },
        {
          titleEn: 'Surge-Protect Router Power Adapters',
          titleBn: 'রাউটারের অ্যাডাপ্টারে মাল্টিপ্লাগ সার্জ গার্ড রাখুন',
          descEn: 'While fiber is immune, high-voltage spikes can still enter through your building AC electrical wiring. Use a surge protector or Mini-UPS.',
          descBn: 'ক্যাবলে বিদ্যুৎ না ঢুকলেও দেয়ালের কারেন্ট লাইনে হাই-ভোল্টেজ স্পাইক হতে পারে। তাই ভালো মানের সার্জ প্রোটেক্টর ব্যবহার করুন।',
          badge: 'Voltage Shield'
        },
        {
          titleEn: 'Avoid Touching Loose Snapped Wires on Roads',
          titleBn: 'রাস্তায় ঝুলে থাকা তার স্পর্শ করবেন না',
          descEn: 'In severe storms with fallen poles, nearby electrical wires may touch telecom lines. Always report to our 24/7 hotline for safe repairs.',
          descBn: 'ঝড়ে কোনো তার ছিঁড়ে পড়লে নিজে হাত না দিয়ে আমাদের ২৪/৭ ফিল্ড লাইনম্যান রেসপন্স টিমকে কল করুন।',
          badge: 'Public Safety'
        }
      ]
    },
    high_wind: {
      labelEn: 'High Wind & Storm Gusts',
      labelBn: 'দমকা বাতাস ও ঝড়ো হাওয়া',
      icon: Wind,
      iconColor: 'text-teal-400',
      badgeBg: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
      rainfall: '8 mm/h',
      windSpeed: '62 km/h',
      lightningRisk: 'Low',
      gridStability: '85% (Active Monitoring)',
      fiberScore: 96,
      fiberStatusEn: 'Kevlar Reinforced Aerial Spans',
      fiberStatusBn: 'কেভলার রিইনফোর্সড এরিয়াল স্প্যান',
      headlineEn: 'High Wind Monitoring: Tension Dampeners Active',
      headlineBn: 'ঝড়ো হাওয়া মনিটরিং: পোলের টেনশন ড্যাম্পেনার প্রস্তুত',
      summaryEn: 'Mithapukur backbone spans utilize high-tensile steel messenger wire and Kevlar core to prevent optical micro-bending under strong winds.',
      summaryBn: 'হাই-টেনসাইল মেসেঞ্জার ওয়্যার থাকায় তীব্র বাতাসেও ফাইবার কেবল ছিঁড়ে যাওয়া বা সিগন্যাল লস হয় না।',
      tips: [
        {
          titleEn: 'Kevlar & Steel Core Armor',
          titleBn: 'কেভলার ও স্টিল কোর প্রটেকশন',
          descEn: 'All outdoor Delta drop cables are supported with internal anti-snap reinforcement, maintaining structural tension during 60+ km/h gusts.',
          descBn: 'আমাদের সকল ড্রপ ক্যাবলে ভেতরে অ্যান্টি-স্ন্যাপ স্টিল সাপোর্ট রয়েছে যা ৬০+ কিমি বেগের বাতাসেও অক্ষত থাকে।',
          badge: 'Anti-Snap Core'
        },
        {
          titleEn: 'Keep Home WiFi Router in an Open Central Space',
          titleBn: 'রাউটার ঘরের খোলামেলা স্থানে রাখুন',
          descEn: 'During storms with closed doors and heavy humidity, 5GHz WiFi signals encounter higher indoor wall absorption. Stay closer to router for gaming.',
          descBn: 'ঝড়ের সময় সব দরজা-জানালা বন্ধ থাকলে ওয়াইফাই সিগন্যাল নির্বিঘ্ন রাখতে রাউটার উন্মুক্ত স্থানে রাখুন।',
          badge: 'Indoor WiFi'
        },
        {
          titleEn: 'Linemen on Standby at Sub-PoPs',
          titleBn: 'সাব-পপগুলোতে লাইনম্যান প্রস্তুত',
          descEn: 'Emergency fiber fusion splicing squads are stationed across Sadar, Boldipukur, and Payraband for immediate tree-fall repairs.',
          descBn: 'ঝড়ে গাছ ভেঙে লাইন ক্ষতিগ্রস্ত হলে তাৎক্ষণিক মেরামতের জন্য প্রতিটি সাব-পপে ফাইবার ফিউশন স্প্লাইসিং টিম প্রস্তুত।',
          badge: 'Rapid Response'
        }
      ]
    },
    clear: {
      labelEn: 'Clear Skies & Optimal Weather',
      labelBn: 'পরিষ্কার আকাশ ও অনুকূল আবহাওয়া',
      icon: Sun,
      iconColor: 'text-amber-300',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      rainfall: '0 mm/h',
      windSpeed: '12 km/h',
      lightningRisk: 'Zero',
      gridStability: '99.9% (Optimal)',
      fiberScore: 100,
      fiberStatusEn: 'Peak 10 Gbps Trunk Routing',
      fiberStatusBn: 'সর্বোচ্চ ১০ জিবিপিএস ট্রাঙ্ক সক্ষমতা',
      headlineEn: 'Optimal Network Operating Conditions Across Mithapukur',
      headlineBn: 'মিঠাপুকুর জুড়ে সর্বোচ্চ অপটিক্যাল কর্মক্ষমতা সক্রিয়',
      summaryEn: 'Zero atmospheric risks. All 6 core unions operating at peak laser optical transmission and <3ms BDIX latency.',
      summaryBn: 'কোনো প্রাকৃতিক বিঘ্ন নেই। সকল ইউনিয়নের ফাইবার ৩ মিলি-সেকেন্ডের কম ল্যাটেন্সিতে ফুল স্পিডে চলছে।',
      tips: [
        {
          titleEn: 'Full 10 Gbps BDIX & International Bandwidth',
          titleBn: 'ফুল ১০ জিবিপিএস বিডিআইএক্স ও ক্যাশ ব্যান্ডউইথ',
          descEn: 'Enjoy ultra-low jitter for 4K streaming, online gaming, YouTube 4K, and seamless cloud backups.',
          descBn: '৪কে স্ট্রিমিং ও গেমিংয়ে পান সর্বনিম্ন পিং ও বাফারহীন সুপারফাস্ট ইন্টারনেট।',
          badge: 'Peak Speed'
        },
        {
          titleEn: 'Scheduled Nightly Trunk Optimization',
          titleBn: 'নিয়মিত অপটিক্যাল লাইন অপটিমাইজেশন',
          descEn: 'Automated OTDR line sweeps ensure optical signal power stays consistently between -17 dBm to -21 dBm.',
          descBn: 'স্বয়ংক্রিয় ওটিডিআর স্ক্যানিংয়ের মাধ্যমে ফাইবার সিগন্যালের নির্ভুল মান বজায় রাখা হয়।',
          badge: 'OTDR Monitoring'
        },
        {
          titleEn: 'Perfect Time for New Line Installation',
          titleBn: 'নতুন ফাইবার সংযোগ নেয়ার সেরা সময়',
          descEn: 'Get connected with free drop cable setup and instant on-site activation by our skilled engineers.',
          descBn: 'আজই নতুন অপটিক্যাল ফাইবার সংযোগের জন্য আবেদন করুন ও পান দ্রুত ইনস্টলেশন।',
          badge: 'Fast Setup'
        }
      ]
    }
  };

  const currentCfg = weatherConfig[activeScenario];
  const CurrentIcon = currentCfg.icon;

  return (
    <section id="network-resilience" className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Dynamic Background Atmospheric Glow */}
      <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
        activeScenario === 'thunderstorm' 
          ? 'bg-amber-600/15' 
          : activeScenario === 'monsoon' 
          ? 'bg-sky-600/15' 
          : activeScenario === 'high_wind' 
          ? 'bg-teal-600/15' 
          : 'bg-emerald-600/15'
      }`} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-wider uppercase">
              <ShieldCheck className="h-4 w-4 text-blue-400 animate-pulse" />
              <span>{isBn ? 'মিঠাপুকুর ক্লাইমেট ও ফাইবার স্থিতিশীলতা' : 'Mithapukur Climate & Fiber Resilience'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isBn ? 'আবহাওয়া ইমপ্যাক্ট ও নেটওয়ার্ক স্থিতিশীলতা মনিটর' : 'Mithapukur Network Resilience & Weather Monitor'}
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {isBn
                ? 'মিঠাপুকুরের স্থানীয় বৃষ্টিপাত, কালবৈশাখী ঝড় ও বজ্রপাতের রিয়েল-টাইম তথ্য অনুযায়ী অপটিক্যাল ফাইবারের সুরক্ষা পর্যবেক্ষণ করুন এবং সংযোগ স্থিতিশীল রাখার স্বয়ংক্রিয় টিপস জানুন।'
                : 'Real-time meteorological & optical cable health telemetry for Mithapukur Upazila. Discover automated connection stability tips during heavy monsoon and storm conditions.'}
            </p>
          </div>

          {/* Quick Header Telemetry Status Pill */}
          <div className="flex items-center gap-3 self-start lg:self-auto bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs text-slate-300 px-2 py-1">
              <MapPin className="h-3.5 w-3.5 text-rose-400" />
              <span className="font-semibold">Mithapukur (25.58°N, 89.28°E)</span>
            </div>
            
            <div className="h-4 w-px bg-slate-800" />
            
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold px-2.5 py-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all cursor-pointer"
              title="Refresh Meteorological Telemetry"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-blue-300' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? (isBn ? 'আপডেট হচ্ছে...' : 'Updating...') : (isBn ? 'রিফ্রেশ' : 'Refresh')}</span>
            </button>
          </div>
        </div>

        {/* Interactive Scenario Selector & Live Status Banner */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-amber-400" />
              <span>{isBn ? 'আবহাওয়ার পরিস্থিতি পরিবর্তন করে ফাইবার রেসপন্স দেখুন:' : 'Simulate Weather Impact & See Fiber Response:'}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {isBn ? `শেষ আপডেট: ${lastRefreshedTime}` : `Live Met Synced: ${lastRefreshedTime}`}
            </span>
          </div>

          {/* Scenario Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['monsoon', 'thunderstorm', 'high_wind', 'clear'] as WeatherScenario[]).map((scKey) => {
              const sc = weatherConfig[scKey];
              const ScIcon = sc.icon;
              const isSelected = activeScenario === scKey;

              return (
                <button
                  key={scKey}
                  onClick={() => setActiveScenario(scKey)}
                  className={`p-3 sm:p-4 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer text-left ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/40 shadow-xl shadow-blue-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <ScIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-black ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {isBn ? sc.labelBn : sc.labelEn}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {sc.rainfall} | {sc.windSpeed}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Weather & Resilience Telemetry Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Left / Main Telemetry Card (7 Cols) */}
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background Pattern Watermark */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <CurrentIcon className="w-64 h-64" />
            </div>

            <div>
              {/* Top Condition Pill & Fiber Health Metric */}
              <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-inner">
                    <CurrentIcon className={`h-7 w-7 ${currentCfg.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${currentCfg.badgeBg}`}>
                        {isBn ? currentCfg.labelBn : currentCfg.labelEn}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                      {isBn ? currentCfg.headlineBn : currentCfg.headlineEn}
                    </h3>
                  </div>
                </div>

                {/* Resilience Score Meter */}
                <div className="text-right bg-slate-950/80 px-4 py-2 rounded-2xl border border-slate-800">
                  <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                    {isBn ? 'ফাইবার স্থায়িত্ব সূচক' : 'Resilience Index'}
                  </div>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-2xl font-black text-emerald-400 font-mono">{currentCfg.fiberScore}%</span>
                    <span className="text-[11px] text-slate-500 font-bold">/ 100</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/60">
                {isBn ? currentCfg.summaryBn : currentCfg.summaryEn}
              </p>

              {/* 4 Live Environmental Telemetry Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                
                {/* 1: Rainfall */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mb-1">
                    <Droplets className="h-3.5 w-3.5 text-sky-400" />
                    <span>{isBn ? 'বৃষ্টিপাতের মাত্রা' : 'Precipitation'}</span>
                  </div>
                  <div className="text-base font-black text-white font-mono">{currentCfg.rainfall}</div>
                  <span className="text-[9px] text-slate-400">{isBn ? 'রাডার ডেটা' : 'Mithapukur Met'}</span>
                </div>

                {/* 2: Wind Gusts */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mb-1">
                    <Wind className="h-3.5 w-3.5 text-teal-400" />
                    <span>{isBn ? 'বাতাসের গতিবেগ' : 'Wind Gusts'}</span>
                  </div>
                  <div className="text-base font-black text-white font-mono">{currentCfg.windSpeed}</div>
                  <span className="text-[9px] text-slate-400">{isBn ? 'পোলের টেনশন নিরাপদ' : 'Pole Tension Safe'}</span>
                </div>

                {/* 3: Lightning Risk */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mb-1">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span>{isBn ? 'বজ্রপাত ঝুঁকি' : 'Lightning Surge'}</span>
                  </div>
                  <div className={`text-base font-black font-mono ${
                    currentCfg.lightningRisk.includes('High') ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {currentCfg.lightningRisk}
                  </div>
                  <span className="text-[9px] text-slate-400">{isBn ? 'ডাইইলেকট্রিক ফাইবার' : 'Fiber Non-Conductive'}</span>
                </div>

                {/* 4: Grid Stability */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mb-1">
                    <Power className="h-3.5 w-3.5 text-rose-400" />
                    <span>{isBn ? 'গ্রিড বিদ্যুৎ ব্যাকআপ' : 'REB Power Grid'}</span>
                  </div>
                  <div className="text-sm font-black text-white font-mono truncate">{currentCfg.gridStability}</div>
                  <span className="text-[9px] text-slate-400">{isBn ? 'মিনি-ইউপিএস সমর্থিত' : 'Mini-UPS Ready'}</span>
                </div>
              </div>
            </div>

            {/* Bottom Diagnostic Action Callout */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{isBn ? currentCfg.fiberStatusBn : currentCfg.fiberStatusEn}</span>
              </div>

              <button
                onClick={handleRunDiagnostic}
                disabled={diagnosticRunning}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <Activity className={`h-4 w-4 ${diagnosticRunning ? 'animate-spin' : ''}`} />
                <span>
                  {diagnosticRunning
                    ? (isBn ? 'ফাইবার লাইন স্ক্যান হচ্ছে...' : 'Scanning Optical Signal...')
                    : (isBn ? 'হোম লাইন স্ট্যাবিলিটি টেস্ট' : 'Run Fiber Stability Diagnostic')}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Tabs (Tips / Union Grid / Fiber vs 4G) (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
            
            <div>
              {/* Tab Switcher */}
              <div className="flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5">
                <button
                  onClick={() => setActiveTipTab('tips')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeTipTab === 'tips'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isBn ? '💡 স্ট্যাবিলিটি টিপস' : '💡 Stability Tips'}
                </button>
                <button
                  onClick={() => setActiveTipTab('unions')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeTipTab === 'unions'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isBn ? '🌐 ইউনিয়ন নোড' : '🌐 Union Nodes'}
                </button>
                <button
                  onClick={() => setActiveTipTab('comparison')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeTipTab === 'comparison'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isBn ? '⚡ ফাইবার বনাম 4G' : '⚡ Fiber vs 4G'}
                </button>
              </div>

              {/* Tab 1: Stability Tips */}
              {activeTipTab === 'tips' && (
                <div className="space-y-3">
                  {currentCfg.tips.map((tip, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.08 }}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{isBn ? tip.titleBn : tip.titleEn}</span>
                        </h4>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                          {tip.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pl-5">
                        {isBn ? tip.descBn : tip.descEn}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tab 2: Union Real-Time Optical Status */}
              {activeTipTab === 'unions' && (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {MITHAPUKUR_UNIONS_RESILIENCE.map((u) => (
                    <div
                      key={u.id}
                      className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <h4 className="font-bold text-slate-200 text-xs">
                          {isBn ? u.nameBn : u.nameEn}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {u.linemanSquad} | Signal: <strong className="text-emerald-400">{u.opticalSignal}</strong>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {u.resilienceScore}% Secure
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Fiber vs 4G Comparison in Bad Weather */}
              {activeTipTab === 'comparison' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xs mb-1">
                      <Check className="h-4 w-4" />
                      <span>{isBn ? 'ডেল্টা অপটিক্যাল ফাইবার (FTTH)' : 'Delta Optical Fiber (FTTH)'}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {isBn
                        ? 'আলোর গতিতে গ্লাস কোরের ভেতর সিগন্যাল যায়। বৃষ্টিপাত, মেঘ বা বজ্রপাতে কোনো সিগন্যাল ড্রপ বা পিং স্পাইক হয় না।'
                        : 'Transmits laser photons inside insulated glass. Zero rain fade, zero lightning interference, consistent 100% bandwidth.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                    <div className="flex items-center gap-2 text-rose-400 font-black text-xs mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{isBn ? 'মোবাইল 4G / ওয়্যারলেস টাওয়ার' : 'Mobile 4G / Wireless Towers'}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {isBn
                        ? 'বাতাসে জলীয় বাষ্প ও বৃষ্টির ফোঁটায় রেডিও তরঙ্গ শোষিত হয় (Rain Fade)। ফলে ঝড়-বৃষ্টিতে 4G নেটওয়ার্ক মারাত্মক ধীরগতির হয়।'
                        : 'Atmospheric raindrops absorb radio microwaves (Rain Attenuation), causing severe speed drops, packet loss, and high latency during storms.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Emergency Assistance Footer */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <div className="text-[11px] text-slate-400">
                <span>{isBn ? 'ঝড়ে লাইনে সমস্যা?' : 'Storm line issue?'}</span>{' '}
                <strong className="text-slate-200">24/7 Field Support</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenSupportTicket?.('create')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  {isBn ? 'টিকেট খুলুন' : 'Open Ticket'}
                </button>
                <a
                  href="tel:01712613143"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Phone className="h-3 w-3" />
                  <span>Call 01712-613143</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Modal / Results Overlay */}
        <AnimatePresence>
          {(diagnosticRunning || diagnosticComplete) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 rounded-3xl bg-slate-900 border border-blue-500/50 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <Activity className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">
                      {isBn ? 'মিঠাপুকুর ফাইবার স্ট্যাবিলিটি ডায়াগনস্টিক রিপোর্ট' : 'Mithapukur Optical Line Weather Diagnostics'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {isBn ? 'লাইভ অপটিক্যাল পাওয়ার ও ওয়েদার শিল্ড বিশ্লেষণ' : 'Real-time dBm optical telemetry against active weather condition'}
                    </p>
                  </div>
                </div>

                {diagnosticComplete && (
                  <button
                    onClick={() => setDiagnosticComplete(false)}
                    className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 cursor-pointer"
                  >
                    {isBn ? 'বন্ধ করুন' : 'Dismiss'}
                  </button>
                )}
              </div>

              {/* Progress or Complete Content */}
              {diagnosticRunning ? (
                <div className="py-6 space-y-4 text-center max-w-md mx-auto">
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${(diagnosticStep / 3) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs font-mono text-blue-400 animate-pulse">
                    {diagnosticStep === 1 && (isBn ? '১/৩: অপটিক্যাল সিগন্যাল পাওয়ার (dBm) পরীক্ষা করা হচ্ছে...' : 'Step 1/3: Reading Optical Signal Power (-18.4 dBm)...')}
                    {diagnosticStep === 2 && (isBn ? '২/৩: মিঠাপুকুর আরইবি গ্রিড ফেজ ফ্লাকচুয়েশন চেক হচ্ছে...' : 'Step 2/3: Checking Local REB Sub-station Grid Synchronization...')}
                    {diagnosticStep === 3 && (isBn ? '৩/৩: বিডিআইএক্স ও ক্যাশ সার্ভার পিং যাচাই হচ্ছে...' : 'Step 3/3: Verifying BDIX Core Routing Latency (<4ms)...')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold mb-1">{isBn ? 'অপটিক্যাল সিগন্যাল পাওয়ার' : 'Optical Signal Power'}</div>
                    <div className="text-xl font-black text-emerald-400 font-mono">-18.6 dBm</div>
                    <p className="text-[11px] text-slate-400 mt-1">{isBn ? 'সর্বোচ্চ সুরক্ষিত রেঞ্জ (-14 to -24 dBm)' : 'Ideal Operating Range (-14 to -24 dBm)'}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold mb-1">{isBn ? 'ঝড়/বৃষ্টিতে সিগন্যাল লস' : 'Rain / Weather Fade'}</div>
                    <div className="text-xl font-black text-emerald-400 font-mono">0.00 dB (Zero Loss)</div>
                    <p className="text-[11px] text-slate-400 mt-1">{isBn ? '১০০% ডাইইলেকট্রিক ফাইবার অপটিক্স' : '100% Immune to Rain & Clouds'}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold mb-1">{isBn ? 'প্রস্তাবিত নিরাপত্তা অ্যাকশন' : 'Recommended Action'}</div>
                    <div className="text-sm font-black text-blue-300">{isBn ? 'মিনি-ইউপিএস ব্যাকআপ সক্রিয় রাখুন' : 'Keep Mini-UPS Connected'}</div>
                    <p className="text-[11px] text-slate-400 mt-1">{isBn ? 'বৃষ্টির সময় পল্লি বিদ্যুতের লোডশেডিং নিরবচ্ছিন্ন থাকবে' : 'Protects against REB power grid trips'}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
