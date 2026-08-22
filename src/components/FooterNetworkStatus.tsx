import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Wifi,
  Clock,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type FooterSystemStatus = 'operational' | 'maintenance';

export const FooterNetworkStatus: React.FC = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState<FooterSystemStatus>('operational');
  const [latency, setLatency] = useState<number>(4);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [uptime] = useState<string>('99.98%');

  // Format current time
  const getFormattedTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  useEffect(() => {
    setLastUpdated(getFormattedTime());

    // Auto-ping simulation every 30 seconds
    const interval = setInterval(() => {
      setLastUpdated(getFormattedTime());
      if (status === 'operational') {
        setLatency(Math.floor(Math.random() * 3) + 3); // 3-5ms
      } else {
        setLatency(Math.floor(Math.random() * 12) + 24); // 24-36ms
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [status]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(getFormattedTime());
      if (status === 'operational') {
        setLatency(Math.floor(Math.random() * 3) + 3);
      } else {
        setLatency(Math.floor(Math.random() * 10) + 25);
      }
      setIsRefreshing(false);
    }, 600);
  };

  const toggleStatus = () => {
    setStatus((prev) => (prev === 'operational' ? 'maintenance' : 'operational'));
    setLastUpdated(getFormattedTime());
    setLatency((prev) => (prev <= 10 ? 28 : 4));
  };

  const isOperational = status === 'operational';

  return (
    <div
      id="footer-network-status"
      className="my-8 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-slate-700"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left: Status Indicator & Title */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div
            className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
              isOperational
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
            }`}
          >
            {isOperational ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="h-3 w-3 text-blue-400" />
                {language === 'bn' ? 'নেটওয়ার্ক লাইভ স্ট্যাটাস' : 'Real-time Network Status'}
              </span>

              {/* Pulsing Pill Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black border transition-all duration-300 ${
                  isOperational
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-sm'
                    : 'bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-sm'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isOperational ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isOperational ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </span>
                <span>
                  {isOperational
                    ? language === 'bn'
                      ? 'All Systems Operational (সব সিস্টেম সচল)'
                      : 'All Systems Operational'
                    : language === 'bn'
                    ? 'Scheduled Maintenance (নির্ধারিত রক্ষণাবেক্ষণ)'
                    : 'Scheduled Maintenance'}
                </span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isOperational
                ? language === 'bn'
                  ? 'মিঠাপুকুর সদর, বলদপুকুর ও রানীপুকুর অপটিক্যাল ফাইবার ডিস্ট্রিবিউশন হাব এবং বিডিআইএক্স গেটওয়ে নিরবচ্ছিন্নভাবে চালু রয়েছে।'
                  : 'Mithapukur Sadar, Boldipukur Optical Splitters, and BDIX Gateway routing operating at peak 100% capacity.'
                : language === 'bn'
                ? 'রুটিন অপটিক্যাল ফাইবার স্প্লাইসিং ও ব্যাকবোন ব্যান্ডউইথ আপগ্রেড রক্ষণাবেক্ষণ চলছে।'
                : 'Routine optical fiber splicing and backbone trunk link maintenance is currently active.'}
            </p>
          </div>
        </div>

        {/* Right: Metrics & Interactive Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
          {/* Latency Metric */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Activity className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-400">{language === 'bn' ? 'লেটেন্সি:' : 'Latency:'}</span>
            <strong className="text-white font-mono font-bold">{latency} ms</strong>
          </div>

          {/* Uptime Metric */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400">{language === 'bn' ? 'আপটাইম:' : 'Uptime:'}</span>
            <strong className="text-emerald-400 font-mono font-bold">{uptime}</strong>
          </div>

          {/* Last Checked timestamp */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <Clock className="h-3 w-3 text-slate-500" />
            <span>{lastUpdated}</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              title={language === 'bn' ? 'স্ট্যাটাস রিফ্রেশ করুন' : 'Refresh network status'}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            </button>

            {/* Toggle State Button */}
            <button
              type="button"
              onClick={toggleStatus}
              title={language === 'bn' ? 'স্ট্যাটাস টগল করুন' : 'Toggle Operational / Scheduled Maintenance'}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Server className="h-3.5 w-3.5 text-indigo-400" />
              <span>
                {language === 'bn'
                  ? isOperational
                    ? 'মেইনটেন্যান্স মোড'
                    : 'অপারেশনাল মোড'
                  : isOperational
                  ? 'Simulate Maintenance'
                  : 'Set Operational'}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
