import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Activity,
  Zap,
  TrendingUp,
  Cpu,
  RefreshCw,
  Server,
  Radio,
  Wifi,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Gauge,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FiberNodeTelemetry {
  id: string;
  name: string;
  bengaliName: string;
  oltCode: string;
  location: string;
  status: 'optimal' | 'warning' | 'degraded';
  currentBandwidthGbps: number;
  maxCapacityGbps: number;
  currentPingMs: number;
  currentJitterMs: number;
  opticalSignalDbm: number;
  activeOnuCount: number;
  packetLossPct: number;
}

const MITHAPUKUR_NODES: FiberNodeTelemetry[] = [
  {
    id: 'all',
    name: 'Mithapukur Network Backbone (Aggregated)',
    bengaliName: 'মিঠাপুকুর সমগ্র ব্যাকবোন (একত্রিত)',
    oltCode: 'CORE-MITHA-AGG',
    location: 'Central Gateway & BDIX Peering',
    status: 'optimal',
    currentBandwidthGbps: 8.45,
    maxCapacityGbps: 12.0,
    currentPingMs: 3.8,
    currentJitterMs: 0.6,
    opticalSignalDbm: -18.2,
    activeOnuCount: 2480,
    packetLossPct: 0.00
  },
  {
    id: 'olt-01',
    name: 'Boldipukur Core PoP (HQ Branch)',
    bengaliName: 'বলদপুকুর মেইন পিওপি (হেডকোয়ার্টার)',
    oltCode: 'OLT-CORE-01',
    location: 'Akmal Market 2nd Floor, Boldipukur',
    status: 'optimal',
    currentBandwidthGbps: 3.20,
    maxCapacityGbps: 4.5,
    currentPingMs: 3.2,
    currentJitterMs: 0.4,
    opticalSignalDbm: -17.8,
    activeOnuCount: 940,
    packetLossPct: 0.00
  },
  {
    id: 'olt-02',
    name: 'Mithapukur Sadar Urban Sector',
    bengaliName: 'মিঠাপুকুর সদর শহর সেক্টর',
    oltCode: 'OLT-SADAR-02',
    location: 'Upazila Parishad & Hospital Road',
    status: 'optimal',
    currentBandwidthGbps: 2.65,
    maxCapacityGbps: 3.5,
    currentPingMs: 4.1,
    currentJitterMs: 0.7,
    opticalSignalDbm: -18.6,
    activeOnuCount: 710,
    packetLossPct: 0.00
  },
  {
    id: 'olt-03',
    name: 'Borogorga & Ranipukur Feeder Node',
    bengaliName: 'বড়দরগা ও রাণীপুকুর ফিডার নোড',
    oltCode: 'OLT-BORO-03',
    location: 'Borogorga Bazaar Optical Hub',
    status: 'optimal',
    currentBandwidthGbps: 1.40,
    maxCapacityGbps: 2.0,
    currentPingMs: 4.8,
    currentJitterMs: 0.9,
    opticalSignalDbm: -19.4,
    activeOnuCount: 430,
    packetLossPct: 0.00
  }
];

// Generate 24-hour timeline sample data
const generateTimelineData = (node: FiberNodeTelemetry) => {
  const times = [
    '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
    '12:00', '14:00', '16:00', '18:00', '20:00', '21:00', '22:00', '23:00'
  ];

  return times.map((t, idx) => {
    // Peak hours between 18:00 and 23:00
    const isPeak = idx >= 8;
    const baseMultiplier = isPeak ? 0.85 : 0.45 + (idx * 0.04);
    const variance = (Math.sin(idx) * 0.15);
    
    const downloadGbps = Number((node.currentBandwidthGbps * (baseMultiplier + variance)).toFixed(2));
    const uploadGbps = Number((downloadGbps * 0.38).toFixed(2));
    const bdixTrafficGbps = Number((downloadGbps * 0.58).toFixed(2));
    
    // Latency is lowest at night, slightly higher in peak
    const pingMs = Number((node.currentPingMs + (isPeak ? 1.2 : 0) + (Math.random() * 0.8)).toFixed(1));
    const jitterMs = Number((node.currentJitterMs + (isPeak ? 0.4 : 0.1) + (Math.random() * 0.3)).toFixed(2));
    const opticalDbm = Number((node.opticalSignalDbm + (Math.sin(idx) * 0.3)).toFixed(1));

    return {
      time: t,
      downloadGbps,
      uploadGbps,
      bdixTrafficGbps,
      totalTrafficGbps: Number((downloadGbps + uploadGbps).toFixed(2)),
      pingMs,
      jitterMs,
      opticalDbm
    };
  });
};

export const NocTelemetryCharts: React.FC = () => {
  const { language } = useLanguage();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('all');
  const [activeMetricTab, setActiveMetricTab] = useState<'bandwidth' | 'latency' | 'optical'>('bandwidth');
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [liveData, setLiveData] = useState<any[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());

  const selectedNode = useMemo(() => {
    return MITHAPUKUR_NODES.find(n => n.id === selectedNodeId) || MITHAPUKUR_NODES[0];
  }, [selectedNodeId]);

  // Initial timeline population
  useEffect(() => {
    setLiveData(generateTimelineData(selectedNode));
    setLastSyncTime(new Date().toLocaleTimeString());
  }, [selectedNode]);

  // Live real-time tick streaming simulation
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setLiveData(prev => {
        if (!prev.length) return prev;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const lastItem = prev[prev.length - 1];
        const randomDelta = (Math.random() - 0.5) * 0.25;
        const newDownload = Math.max(0.2, Number((lastItem.downloadGbps + randomDelta).toFixed(2)));
        const newUpload = Number((newDownload * 0.38).toFixed(2));
        const newBdix = Number((newDownload * 0.58).toFixed(2));
        const newPing = Math.max(2.1, Number((selectedNode.currentPingMs + (Math.random() - 0.5) * 0.6).toFixed(1)));
        const newJitter = Math.max(0.2, Number((selectedNode.currentJitterMs + (Math.random() - 0.5) * 0.2).toFixed(2)));
        const newOptical = Number((selectedNode.opticalSignalDbm + (Math.random() - 0.5) * 0.2).toFixed(1));

        const newItem = {
          time: timeStr,
          downloadGbps: newDownload,
          uploadGbps: newUpload,
          bdixTrafficGbps: newBdix,
          totalTrafficGbps: Number((newDownload + newUpload).toFixed(2)),
          pingMs: newPing,
          jitterMs: newJitter,
          opticalDbm: newOptical
        };

        const updated = [...prev.slice(1), newItem];
        return updated;
      });
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, selectedNode]);

  const handleSimulateSpike = () => {
    setLiveData(prev => {
      if (!prev.length) return prev;
      const copy = [...prev];
      const last = copy[copy.length - 1];
      copy[copy.length - 1] = {
        ...last,
        downloadGbps: Number((last.downloadGbps * 1.35).toFixed(2)),
        uploadGbps: Number((last.uploadGbps * 1.4).toFixed(2)),
        pingMs: Number((last.pingMs + 3.2).toFixed(1)),
        jitterMs: Number((last.jitterMs + 0.8).toFixed(2))
      };
      return copy;
    });
  };

  const currentLatest = liveData[liveData.length - 1] || {
    downloadGbps: selectedNode.currentBandwidthGbps,
    uploadGbps: (selectedNode.currentBandwidthGbps * 0.38).toFixed(2),
    bdixTrafficGbps: (selectedNode.currentBandwidthGbps * 0.58).toFixed(2),
    totalTrafficGbps: (selectedNode.currentBandwidthGbps * 1.38).toFixed(2),
    pingMs: selectedNode.currentPingMs,
    jitterMs: selectedNode.currentJitterMs,
    opticalDbm: selectedNode.opticalSignalDbm
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl text-slate-100 space-y-5">
      
      {/* Header with Title & Live Pulse */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Activity className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{language === 'bn' ? 'মিঠাপুকুর ফাইবার নোড লাইভ টেলিমেট্রি' : 'Mithapukur Fiber Nodes Live Telemetry'}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                  LIVE NOC
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'রিয়েল-টাইম ব্যান্ডউইথ ব্যবহার, লেটেন্সি (পিং) ও অপটিক্যাল সিগন্যাল মনিটরিং।'
                  : 'Real-time bandwidth throughput, BDIX latency curve & optical power telemetry.'}
              </p>
            </div>
          </div>
        </div>

        {/* Controls: Live Sync Indicator */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{language === 'bn' ? 'লাইভ ব্যাকবোন সিঙ্ক' : 'Live NOC Polling'}</span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono hidden sm:block bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800">
            Sync: {lastSyncTime}
          </div>
        </div>
      </div>

      {/* Node Selector Badges */}
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5 text-rose-400" />
          <span>{language === 'bn' ? 'ফাইবার ডিস্ট্রিবিউশন নোড নির্বাচন করুন:' : 'Select Optical Distribution Node:'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {MITHAPUKUR_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-blue-950/80 border-rose-500/60 shadow-lg shadow-rose-950/50 scale-[1.02]'
                    : 'bg-slate-950/60 hover:bg-slate-950/90 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {node.oltCode}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-xs font-bold text-slate-200 line-clamp-1">
                  {language === 'bn' ? node.bengaliName : node.name}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1 pt-1 border-t border-slate-800/60">
                  <span>{node.currentBandwidthGbps} Gbps</span>
                  <span className="text-emerald-400">{node.currentPingMs} ms</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Metric Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Total Inbound Throughput */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1">
              <ArrowDownLeft className="h-3.5 w-3.5 text-blue-400" />
              <span>{language === 'bn' ? 'ডাউনলোড ট্রাফিক' : 'Inbound (Download)'}</span>
            </span>
            <span className="text-[10px] text-blue-400 font-mono font-bold">Gbps</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-blue-400 font-mono">
            {currentLatest.downloadGbps} <span className="text-xs font-normal text-slate-400">Gbps</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Capacity: {selectedNode.maxCapacityGbps} Gbps Peak
          </div>
        </div>

        {/* Total Outbound Throughput */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5 text-purple-400" />
              <span>{language === 'bn' ? 'আপলোড ট্রাফিক' : 'Outbound (Upload)'}</span>
            </span>
            <span className="text-[10px] text-purple-400 font-mono font-bold">Gbps</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-purple-400 font-mono">
            {currentLatest.uploadGbps} <span className="text-xs font-normal text-slate-400">Gbps</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            BDIX Cache: {currentLatest.bdixTrafficGbps} Gbps
          </div>
        </div>

        {/* Mean Latency */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>{language === 'bn' ? 'গড় পিং (BDIX)' : 'Mean Latency'}</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">ms</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
            {currentLatest.pingMs} <span className="text-xs font-normal text-slate-400">ms</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Jitter: {currentLatest.jitterMs} ms • 0% Loss
          </div>
        </div>

        {/* Optical Signal Level */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="flex items-center gap-1">
              <Radio className="h-3.5 w-3.5 text-rose-400" />
              <span>{language === 'bn' ? 'অপটিক্যাল পাওয়ার' : 'Optical Signal'}</span>
            </span>
            <span className="text-[10px] text-rose-400 font-mono font-bold">dBm</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-rose-400 font-mono">
            {currentLatest.opticalDbm} <span className="text-xs font-normal text-slate-400">dBm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Active ONUs: <strong className="text-slate-300 font-bold">{selectedNode.activeOnuCount}</strong>
          </div>
        </div>
      </div>

      {/* Chart Metric Toggle Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveMetricTab('bandwidth')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeMetricTab === 'bandwidth'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'ব্যান্ডউইথ ব্যবহার (Gbps)' : 'Bandwidth Throughput'}
          </button>

          <button
            type="button"
            onClick={() => setActiveMetricTab('latency')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeMetricTab === 'latency'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'লেটেন্সি ও জিটার (Ping ms)' : 'Latency & Jitter'}
          </button>

          <button
            type="button"
            onClick={() => setActiveMetricTab('optical')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeMetricTab === 'optical'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'অপটিক্যাল লেভেল (dBm)' : 'Optical Power'}
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400 hidden sm:block">
          Active OLT Port Feeder: <span className="text-white font-bold">{selectedNode.oltCode}</span>
        </div>
      </div>

      {/* Interactive Recharts Visualization Stage */}
      <div className="h-72 w-full bg-slate-950/90 rounded-2xl p-2 sm:p-4 border border-slate-800/80">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetricTab === 'bandwidth' ? (
            <AreaChart data={liveData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="downloadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="bdixGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="G" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
              <Area
                type="monotone"
                dataKey="downloadGbps"
                name={language === 'bn' ? 'ডাউনলোড ট্রাফিক (Gbps)' : 'Inbound Download (Gbps)'}
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#downloadGrad)"
              />
              <Area
                type="monotone"
                dataKey="bdixTrafficGbps"
                name={language === 'bn' ? 'BDIX পেয়ারিং ক্যাশ (Gbps)' : 'BDIX Peering (Gbps)'}
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#bdixGrad)"
              />
              <Area
                type="monotone"
                dataKey="uploadGbps"
                name={language === 'bn' ? 'আপলোড ট্রাফিক (Gbps)' : 'Outbound Upload (Gbps)'}
                stroke="#a855f7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#uploadGrad)"
              />
            </AreaChart>
          ) : activeMetricTab === 'latency' ? (
            <LineChart data={liveData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="ms" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
              <Line
                type="monotone"
                dataKey="pingMs"
                name={language === 'bn' ? 'BDIX রাউন্ড-ট্রিপ পিং (ms)' : 'BDIX Core Ping (ms)'}
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3, fill: '#10b981' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="jitterMs"
                name={language === 'bn' ? 'লাইন জিটার ফ্লাকচুয়েশন (ms)' : 'Packet Jitter (ms)'}
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          ) : (
            <LineChart data={liveData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" domain={[-26, -14]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="dBm" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
              <Line
                type="monotone"
                dataKey="opticalDbm"
                name={language === 'bn' ? 'অপটিক্যাল রিসিভ পাওয়ার (dBm)' : 'Optical Rx Power (dBm)'}
                stroke="#f43f5e"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#f43f5e' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Bottom Telemetry Health Status Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">
            {language === 'bn' ? 'সাপ্লায়ার ব্যাকবোন আপটাইম:' : 'Backbone Uptime:'} <strong className="text-emerald-400">99.98%</strong>
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2">
          <Wifi className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300">
            {language === 'bn' ? 'BDIX ন্যাশনাল পেয়ারিং:' : 'BDIX National Exchange:'} <strong className="text-cyan-400">Optimal (10 Gbps)</strong>
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2">
          <Radio className="h-4 w-4 text-rose-400 shrink-0" />
          <span className="text-slate-300">
            {language === 'bn' ? 'মিঠাপুকুর জিপিওএন স্প্লিটার:' : 'GPON Fiber Splitters:'} <strong className="text-rose-400">1:64 Balanced</strong>
          </span>
        </div>
      </div>

    </div>
  );
};
