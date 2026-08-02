import React, { useState, useEffect, useRef } from 'react';
import {
  Gauge,
  Zap,
  ArrowDown,
  ArrowUp,
  Activity,
  Wifi,
  Server,
  RefreshCw,
  CheckCircle2,
  Copy,
  Sparkles,
  ShieldCheck,
  Globe,
  Sliders,
  ChevronRight,
  Tv,
  Gamepad2,
  Video,
  LineChart as ChartIcon,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { PLANS } from '../data/plans';
import { Plan } from '../types';

interface SpeedTestProps {
  onSelectPlan?: (plan: Plan) => void;
  onOpenInquiry?: () => void;
}

type TestStage = 'idle' | 'ping' | 'download' | 'upload' | 'complete';

interface ServerNode {
  id: string;
  name: string;
  location: string;
  basePing: number;
  maxSpeedMbps: number;
}

const SERVERS: ServerNode[] = [
  {
    id: 'boldipukur-hub',
    name: 'Boldipukur Primary Hub',
    location: 'Akmal Market, Mithapukur',
    basePing: 4,
    maxSpeedMbps: 120,
  },
  {
    id: 'rangpur-node',
    name: 'Rangpur Division Edge Node',
    location: 'Rangpur Sadar',
    basePing: 8,
    maxSpeedMbps: 100,
  },
  {
    id: 'dhaka-bdix',
    name: 'Dhaka BDIX Peering Exchange',
    location: 'Dhaka, Bangladesh',
    basePing: 12,
    maxSpeedMbps: 85,
  },
  {
    id: 'singapore-cdn',
    name: 'Global CDN (Singapore Edge)',
    location: 'Singapore',
    basePing: 38,
    maxSpeedMbps: 65,
  },
];

interface ConnectionProfile {
  id: string;
  label: string;
  targetDownload: number;
  targetUpload: number;
  ping: number;
  jitter: number;
}

const SIMULATED_PROFILES: ConnectionProfile[] = [
  {
    id: 'delta-100',
    label: 'Delta Business Fiber (100 Mbps)',
    targetDownload: 98.5,
    targetUpload: 95.2,
    ping: 5,
    jitter: 1.1,
  },
  {
    id: 'delta-30',
    label: 'Delta Starter Broadband (30 Mbps)',
    targetDownload: 29.8,
    targetUpload: 28.4,
    ping: 8,
    jitter: 1.8,
  },
  {
    id: 'delta-500',
    label: 'Delta Enterprise Fiber (500 Mbps)',
    targetDownload: 485.0,
    targetUpload: 478.0,
    ping: 3,
    jitter: 0.8,
  },
  {
    id: 'wifi-home',
    label: 'Standard 2.4GHz Wi-Fi Router',
    targetDownload: 18.2,
    targetUpload: 12.5,
    ping: 24,
    jitter: 6.4,
  },
];

export interface TelemetryPoint {
  time: string; // e.g. "0.4s"
  ping: number; // Ping latency in ms
  download: number | null; // Download speed in Mbps
  upload: number | null; // Upload speed in Mbps
  phaseLabel: string;
}

// Default baseline telemetry data for initial display before user starts test
const INITIAL_TELEMETRY: TelemetryPoint[] = [
  { time: '0.0s', ping: 5.2, download: 0, upload: 0, phaseLabel: 'Idle' },
  { time: '0.4s', ping: 4.8, download: 12.5, upload: 0, phaseLabel: 'Baseline' },
  { time: '0.8s', ping: 5.5, download: 34.2, upload: 0, phaseLabel: 'Baseline' },
  { time: '1.2s', ping: 6.1, download: 68.0, upload: 0, phaseLabel: 'Baseline' },
  { time: '1.6s', ping: 5.0, download: 98.5, upload: 0, phaseLabel: 'Baseline' },
  { time: '2.0s', ping: 4.9, download: 98.2, upload: 15.4, phaseLabel: 'Baseline' },
  { time: '2.4s', ping: 5.3, download: 97.9, upload: 52.8, phaseLabel: 'Baseline' },
  { time: '2.8s', ping: 5.1, download: 98.1, upload: 95.0, phaseLabel: 'Baseline' },
];

interface AnimatedCountUpProps {
  value: number | null;
  decimals?: number;
  duration?: number;
  fallback?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCountUp: React.FC<AnimatedCountUpProps> = ({
  value,
  decimals = 1,
  duration = 800,
  fallback = '--',
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<number | null>(value);
  const prevValueRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === null) {
      setDisplayValue(null);
      prevValueRef.current = null;
      return;
    }

    const startVal = prevValueRef.current !== null ? prevValueRef.current : 0;
    const endVal = value;
    prevValueRef.current = value;

    if (startVal === endVal) {
      setDisplayValue(endVal);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endVal);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  if (displayValue === null) {
    return <span className={className}>{fallback}</span>;
  }

  return (
    <span className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const SpeedTest: React.FC<SpeedTestProps> = ({ onSelectPlan, onOpenInquiry }) => {
  const [selectedServer, setSelectedServer] = useState<ServerNode>(SERVERS[0]);
  const [selectedProfile, setSelectedProfile] = useState<ConnectionProfile>(SIMULATED_PROFILES[0]);
  const [testStage, setTestStage] = useState<TestStage>('idle');

  // Real-time animated test metrics
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [pingResult, setPingResult] = useState<number | null>(null);
  const [jitterResult, setJitterResult] = useState<number | null>(null);
  const [downloadResult, setDownloadResult] = useState<number | null>(null);
  const [uploadResult, setUploadResult] = useState<number | null>(null);

  // Time-series telemetry dataset for Recharts
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>(INITIAL_TELEMETRY);

  // Chart view filter: 'all' | 'ping' | 'bandwidth'
  const [chartMode, setChartMode] = meState<'all' | 'ping' | 'bandwidth'>('all');

  // Toast indicator for sharing
  const [copiedToast, setCopiedToast] = useState(false);

  const animationRef = useRef<number | null>(null);

  function meState<T>(initialValue: T) {
    return useState<T>(initialValue);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const runSpeedTest = () => {
    setTestStage('ping');
    setCurrentSpeed(0);
    setPingResult(null);
    setJitterResult(null);
    setDownloadResult(null);
    setUploadResult(null);
    setTelemetry([]);

    const basePing = selectedServer.basePing + Math.floor(Math.random() * 2);
    const jitter = Number((Math.random() * 1.2 + selectedProfile.jitter).toFixed(1));

    let step = 0;
    const points: TelemetryPoint[] = [];

    // Phase 1: Ping & Latency Fluctuations Test
    const pingInterval = setInterval(() => {
      step++;
      const timeStr = `${(step * 0.2).toFixed(1)}s`;
      // Simulate ping fluctuation with micro spikes
      const fluctuation = (Math.random() - 0.45) * (jitter * 2.2);
      const pingVal = Math.max(2, Number((basePing + fluctuation).toFixed(1)));

      setCurrentSpeed(pingVal);

      const p: TelemetryPoint = {
        time: timeStr,
        ping: pingVal,
        download: null,
        upload: null,
        phaseLabel: 'Ping Test',
      };
      points.push(p);
      setTelemetry([...points]);

      if (step >= 8) {
        clearInterval(pingInterval);
        setPingResult(basePing);
        setJitterResult(jitter);
        startDownloadPhase(points, step, basePing, jitter);
      }
    }, 200);
  };

  // Phase 2: Download Speed Measurement
  const startDownloadPhase = (
    currentPoints: TelemetryPoint[],
    startStep: number,
    basePing: number,
    jitter: number
  ) => {
    setTestStage('download');
    const target = Math.min(selectedProfile.targetDownload, selectedServer.maxSpeedMbps);
    const durationMs = 3200;
    const intervalMs = 150;
    const totalSteps = Math.floor(durationMs / intervalMs);
    let step = 0;
    let globalStep = startStep;
    const dlSamples: number[] = [];

    const dlInterval = setInterval(() => {
      step++;
      globalStep++;
      const timeStr = `${(globalStep * 0.2).toFixed(1)}s`;
      const progress = step / totalSteps;
      const easeProgress = Math.sin((progress * Math.PI) / 2);
      const fluctuation = (Math.random() - 0.48) * (target * 0.08);
      const dlVal = Math.max(0.5, Number((target * easeProgress + fluctuation).toFixed(1)));

      // Ping fluctuates slightly higher under download load (loaded latency / bufferbloat)
      const loadedPing = Math.max(2, Number((basePing + (Math.random() * jitter * 1.8)).toFixed(1)));

      setCurrentSpeed(dlVal);
      dlSamples.push(dlVal);

      const p: TelemetryPoint = {
        time: timeStr,
        ping: loadedPing,
        download: dlVal,
        upload: null,
        phaseLabel: 'Download',
      };
      currentPoints.push(p);
      setTelemetry([...currentPoints]);

      if (step >= totalSteps) {
        clearInterval(dlInterval);
        const finalDl = Number((dlSamples.slice(-6).reduce((a, b) => a + b, 0) / 6).toFixed(1));
        setDownloadResult(finalDl);
        startUploadPhase(currentPoints, globalStep, basePing, jitter, finalDl);
      }
    }, intervalMs);
  };

  // Phase 3: Upload Speed Measurement
  const startUploadPhase = (
    currentPoints: TelemetryPoint[],
    startStep: number,
    basePing: number,
    jitter: number,
    finalDl: number
  ) => {
    setTestStage('upload');
    const target = Math.min(selectedProfile.targetUpload, selectedServer.maxSpeedMbps * 0.95);
    const durationMs = 3200;
    const intervalMs = 150;
    const totalSteps = Math.floor(durationMs / intervalMs);
    let step = 0;
    let globalStep = startStep;
    const ulSamples: number[] = [];

    const ulInterval = setInterval(() => {
      step++;
      globalStep++;
      const timeStr = `${(globalStep * 0.2).toFixed(1)}s`;
      const progress = step / totalSteps;
      const easeProgress = Math.sin((progress * Math.PI) / 2);
      const fluctuation = (Math.random() - 0.48) * (target * 0.07);
      const ulVal = Math.max(0.5, Number((target * easeProgress + fluctuation).toFixed(1)));

      const loadedPing = Math.max(2, Number((basePing + (Math.random() * jitter * 1.5)).toFixed(1)));

      setCurrentSpeed(ulVal);
      ulSamples.push(ulVal);

      const p: TelemetryPoint = {
        time: timeStr,
        ping: loadedPing,
        download: finalDl,
        upload: ulVal,
        phaseLabel: 'Upload',
      };
      currentPoints.push(p);
      setTelemetry([...currentPoints]);

      if (step >= totalSteps) {
        clearInterval(ulInterval);
        const finalUl = Number((ulSamples.slice(-6).reduce((a, b) => a + b, 0) / 6).toFixed(1));
        setUploadResult(finalUl);
        setTestStage('complete');
        setCurrentSpeed(0);
      }
    }, intervalMs);
  };

  // Gauge needle calculation
  const maxDisplaySpeed = 500;
  const activeDisplaySpeed = testStage === 'complete' && downloadResult !== null ? downloadResult : currentSpeed;
  const clampedSpeed = Math.min(activeDisplaySpeed, maxDisplaySpeed);
  const needleAngle = (clampedSpeed / maxDisplaySpeed) * 180;

  // Grade evaluator
  const getSpeedGrade = (dl: number | null) => {
    if (!dl) return { title: 'Unknown', color: 'text-slate-400', badge: 'bg-slate-800' };
    if (dl >= 80) return { title: 'Ultra-Broadband (A+)', color: 'text-emerald-400', badge: 'bg-emerald-500/15 border-emerald-500/30' };
    if (dl >= 25) return { title: 'High-Speed Fiber (A)', color: 'text-blue-400', badge: 'bg-blue-500/15 border-blue-500/30' };
    if (dl >= 15) return { title: 'Standard Fiber (B)', color: 'text-sky-300', badge: 'bg-sky-500/15 border-sky-500/30' };
    return { title: 'Low Connection Speed (C)', color: 'text-amber-400', badge: 'bg-amber-500/15 border-amber-500/30' };
  };

  const currentGrade = getSpeedGrade(downloadResult);

  // Recommended plan
  const recommendedPlan = React.useMemo(() => {
    const tested = downloadResult || selectedProfile.targetDownload;
    if (tested < 35) return PLANS[1]; // Recommend 100 Mbps
    if (tested < 150) return PLANS[2]; // Recommend 500 Mbps Enterprise
    return PLANS[1];
  }, [downloadResult, selectedProfile]);

  const handleCopyResults = () => {
    const summary = `⚡ Delta Mithapukur Broadband Speed Test Results:\n• Download: ${downloadResult || 0} Mbps\n• Upload: ${uploadResult || 0} Mbps\n• Ping Latency: ${pingResult || 0} ms | Jitter: ${jitterResult || 0} ms\n• Target Server: ${selectedServer.name} (${selectedServer.location})\nTested via Delta Mithapukur Symmetrical Fiber Node.`;
    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // Statistics derived from telemetry points for chart header badges
  const pingValues = telemetry.map((p) => p.ping).filter(Boolean);
  const minPing = pingValues.length ? Math.min(...pingValues) : pingResult || 0;
  const maxPing = pingValues.length ? Math.max(...pingValues) : (pingResult || 0) + 2;
  const avgPing = pingValues.length
    ? (pingValues.reduce((a, b) => a + b, 0) / pingValues.length).toFixed(1)
    : pingResult || 0;

  // Custom Dark Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl text-xs space-y-1.5 font-sans backdrop-blur-md">
          <p className="font-bold text-slate-300 border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
            <span>Timestamp: {label}</span>
            <span className="text-[10px] text-blue-400 font-mono font-normal uppercase tracking-wider">
              {payload[0]?.payload?.phaseLabel}
            </span>
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-5 font-mono">
              <span style={{ color: entry.color }} className="font-semibold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-white">
                {entry.value !== null && entry.value !== undefined ? entry.value : '--'} {entry.unit || (entry.dataKey === 'ping' ? 'ms' : 'Mbps')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="speed-test" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" />
            <span>Interactive Broadband Telemetry Utility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mithapukur Broadband Speed & Latency Test
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Simulate real-time fiber throughput and measure sub-millisecond ping fluctuations using integrated Recharts telemetry.
          </p>
        </div>

        {/* Main Speedometer & Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Speedometer Gauge & Controls (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative">

            {/* Header Toolbar: Server Node & Profile Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-b border-slate-800 pb-5">

              {/* Server selector */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5 text-blue-400" />
                  Target Test Server:
                </label>
                <select
                  disabled={testStage !== 'idle' && testStage !== 'complete'}
                  value={selectedServer.id}
                  onChange={(e) => {
                    const found = SERVERS.find((s) => s.id === e.target.value);
                    if (found) setSelectedServer(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  {SERVERS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Profile Preset Switcher */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-emerald-400" />
                  Simulation Profile:
                </label>
                <select
                  disabled={testStage !== 'idle' && testStage !== 'complete'}
                  value={selectedProfile.id}
                  onChange={(e) => {
                    const found = SIMULATED_PROFILES.find((p) => p.id === e.target.value);
                    if (found) setSelectedProfile(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  {SIMULATED_PROFILES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Gauge Dial Container */}
            <div className="relative flex flex-col items-center justify-center pt-2 pb-4">

              {/* SVG Speedometer Dial */}
              <div className="relative w-64 h-36 sm:w-80 sm:h-44 flex items-end justify-center">

                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 110">
                  {/* Outer Track Arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />

                  {/* Ticks */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="16"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    className="opacity-30"
                  />

                  {/* Active Progress Gradient Arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#speed-gradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * clampedSpeed) / maxDisplaySpeed}
                    className="transition-all duration-100 ease-out"
                  />

                  <defs>
                    <linearGradient id="speed-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Dial Needle */}
                  <g transform={`rotate(${needleAngle - 90}, 100, 100)`} className="transition-transform duration-100 ease-out">
                    <line x1="100" y1="100" x2="100" y2="30" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="7" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  </g>
                </svg>

                {/* Central Speed Display */}
                <div className="absolute bottom-0 text-center translate-y-2">
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                    {testStage === 'ping' ? (
                      <span className="text-amber-400 text-3xl animate-pulse">Measuring Latency...</span>
                    ) : testStage === 'complete' && downloadResult !== null ? (
                      <AnimatedCountUp value={downloadResult} decimals={1} duration={1000} />
                    ) : (
                      currentSpeed.toFixed(1)
                    )}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                    {testStage === 'download' && <span className="text-blue-400">Mbps (Download)</span>}
                    {testStage === 'upload' && <span className="text-emerald-400">Mbps (Upload)</span>}
                    {testStage === 'ping' && <span className="text-amber-300">Ping Latency Test</span>}
                    {testStage === 'idle' && <span>Mbps Symmetrical Throughput</span>}
                    {testStage === 'complete' && <span className="text-emerald-400 font-bold">Test Completed</span>}
                  </div>
                </div>

              </div>

              {/* Start / Restart GO Button */}
              <div className="mt-8">
                {testStage === 'idle' || testStage === 'complete' ? (
                  <div className="relative inline-block">
                    {/* Pulsing beacon ring and glow effect when idle for high CTR */}
                    {testStage === 'idle' && (
                      <>
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 rounded-2xl blur-lg opacity-80 animate-pulse pointer-events-none" />
                        <div className="absolute -inset-0.5 bg-blue-500 rounded-2xl animate-ping opacity-30 pointer-events-none" />
                      </>
                    )}
                    <button
                      onClick={runSpeedTest}
                      className={`group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-extrabold text-lg px-10 py-4 rounded-2xl shadow-2xl shadow-blue-600/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
                        testStage === 'idle' ? 'animate-pulse' : ''
                      }`}
                    >
                      <Gauge className="h-6 w-6 animate-pulse" />
                      <span>{testStage === 'complete' ? 'RUN SPEED TEST AGAIN' : 'START BROADBAND TEST'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-700 px-6 py-3 rounded-2xl text-slate-300 font-semibold text-sm">
                    <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
                    <span>
                      {testStage === 'ping' && 'Phase 1/3: Measuring Ping Latency & Jitter...'}
                      {testStage === 'download' && 'Phase 2/3: Measuring Download Throughput...'}
                      {testStage === 'upload' && 'Phase 3/3: Measuring Upload Throughput...'}
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Connection Information Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 gap-2">
              <div className="flex items-center gap-1.5">
                <Wifi className="h-4 w-4 text-emerald-400" />
                <span>Node: <strong className="text-slate-200">{selectedServer.name}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>Client IP: <strong className="text-slate-200">103.145.28.19 (Delta Fiber)</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Key Results, Quality Ratings & Recommendation (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Primary Metrics Grid */}
            <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-5">

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-400" />
                  Speed Summary Results
                </h3>
                {testStage === 'complete' && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentGrade.badge} ${currentGrade.color}`}>
                    {currentGrade.title}
                  </span>
                )}
              </div>

              {/* 4 Primary Metric Cards */}
              <div className="grid grid-cols-2 gap-3">

                {/* Download Card */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <ArrowDown className="h-3.5 w-3.5 text-blue-400" />
                    Download
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    <AnimatedCountUp value={downloadResult} decimals={1} duration={900} />
                    <span className="text-xs text-slate-400 font-sans ml-1">Mbps</span>
                  </div>
                </div>

                {/* Upload Card */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <ArrowUp className="h-3.5 w-3.5 text-emerald-400" />
                    Upload
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    <AnimatedCountUp value={uploadResult} decimals={1} duration={900} />
                    <span className="text-xs text-slate-400 font-sans ml-1">Mbps</span>
                  </div>
                </div>

                {/* Ping Card */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    Ping Latency
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    <AnimatedCountUp value={pingResult} decimals={1} duration={700} />
                    <span className="text-xs text-slate-400 font-sans ml-1">ms</span>
                  </div>
                </div>

                {/* Jitter Card */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                    Jitter Variance
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    <AnimatedCountUp value={jitterResult} decimals={1} duration={700} />
                    <span className="text-xs text-slate-400 font-sans ml-1">ms</span>
                  </div>
                </div>

              </div>

              {/* Share & Copy Action */}
              {testStage === 'complete' && (
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={handleCopyResults}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5 text-blue-400" />
                    <span>{copiedToast ? 'Copied to Clipboard!' : 'Copy Speed Report'}</span>
                  </button>
                </div>
              )}

            </div>

            {/* Application Suitability & Performance Ratings */}
            <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
              <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                Connection Suitability Analysis
              </h4>

              <div className="space-y-2.5 text-xs">

                {/* 4K Streaming */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Tv className="h-4 w-4 text-blue-400" />
                    <span className="font-semibold text-slate-200">4K / Ultra HD Streaming</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    (downloadResult || selectedProfile.targetDownload) >= 25
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {(downloadResult || selectedProfile.targetDownload) >= 25 ? 'Seamless (A+)' : 'Buffer Likely'}
                  </span>
                </div>

                {/* Gaming */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Gamepad2 className="h-4 w-4 text-emerald-400" />
                    <span className="font-semibold text-slate-200">Competitive Online Gaming</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    (pingResult || selectedProfile.ping) <= 15
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {(pingResult || selectedProfile.ping) <= 15 ? 'Low Ping (A+)' : 'Moderate Lag'}
                  </span>
                </div>

                {/* Video Conference */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Video className="h-4 w-4 text-indigo-400" />
                    <span className="font-semibold text-slate-200">Zoom & HD Video Calls</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    (uploadResult || selectedProfile.targetUpload) >= 10
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {(uploadResult || selectedProfile.targetUpload) >= 10 ? 'HD Crystal Clear' : 'Standard Quality'}
                  </span>
                </div>

              </div>
            </div>

            {/* Smart Plan Recommendation Banner */}
            <div className="bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-950 p-6 rounded-3xl border border-blue-500/30 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                  Delta Fiber Upgrade Recommendation
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-lg text-white">
                  {recommendedPlan.name} ({recommendedPlan.speedMbps} Mbps)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enjoy symmetrical optical fiber speeds across Mithapukur, Boldipukur, and surrounding unions with zero data caps and 24/7 branch desk support.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-slate-400 block">Monthly Price</span>
                  <span className="text-xl font-extrabold text-white">৳{recommendedPlan.priceBdt} <span className="text-xs text-slate-400 font-normal">/ month</span></span>
                </div>

                <button
                  onClick={() => {
                    if (onSelectPlan) onSelectPlan(recommendedPlan);
                    else if (onOpenInquiry) onOpenInquiry();
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply For Connection</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Recharts Latency & Throughput Telemetry Section */}
        <div className="bg-slate-950/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">

          {/* Chart Header Controls & Live Metrics */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <ChartIcon className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-extrabold text-white">
                  Real-time Ping Latency & Telemetry Analysis
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic line chart tracking microsecond ping jitter, loaded latency spikes, and bandwidth ramping over time.
              </p>
            </div>

            {/* Chart Mode Filter Tabs */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setChartMode('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMode === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Combined Telemetry
              </button>
              <button
                onClick={() => setChartMode('ping')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMode === 'ping'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Ping Latency Only
              </button>
              <button
                onClick={() => setChartMode('bandwidth')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMode === 'bandwidth'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Throughput Speed
              </button>
            </div>
          </div>

          {/* Key Latency Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                Min Ping
              </span>
              <span className="font-mono font-bold text-amber-300 text-sm">
                <AnimatedCountUp value={typeof minPing === 'number' ? minPing : parseFloat(minPing as any)} decimals={1} suffix=" ms" />
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
                Peak Ping
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm">
                <AnimatedCountUp value={typeof maxPing === 'number' ? maxPing : parseFloat(maxPing as any)} decimals={1} suffix=" ms" />
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Zap className="h-3.5 w-3.5 text-blue-400" />
                Avg Latency
              </span>
              <span className="font-mono font-bold text-blue-300 text-sm">
                <AnimatedCountUp value={typeof avgPing === 'number' ? avgPing : parseFloat(avgPing as any)} decimals={1} suffix=" ms" />
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Packet Jitter
              </span>
              <span className="font-mono font-bold text-emerald-300 text-sm">
                ±<AnimatedCountUp value={jitterResult !== null ? jitterResult : (selectedProfile.jitter || 1.1)} decimals={1} suffix=" ms" />
              </span>
            </div>
          </div>

          {/* Recharts Chart Container */}
          <div className="h-72 sm:h-80 w-full pt-2 relative">
            {testStage === 'idle' && (
              <div className="absolute top-2 left-4 z-10 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg text-[11px] text-blue-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-amber-400" />
                Showing sample baseline graph — click "START BROADBAND TEST" for live telemetry
              </div>
            )}

            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={telemetry} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  {/* Ping Area Gradient */}
                  <linearGradient id="pingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Download Area Gradient */}
                  <linearGradient id="dlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  {/* Upload Area Gradient */}
                  <linearGradient id="ulGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />

                {/* Left Y-Axis for Ping (ms) */}
                {(chartMode === 'all' || chartMode === 'ping') && (
                  <YAxis
                    yAxisId="pingAxis"
                    orientation="left"
                    stroke="#f59e0b"
                    tick={{ fontSize: 11 }}
                    domain={[0, (dataMax: number) => Math.max(20, Math.ceil(dataMax * 1.2))]}
                    unit=" ms"
                  />
                )}

                {/* Right Y-Axis for Throughput (Mbps) */}
                {(chartMode === 'all' || chartMode === 'bandwidth') && (
                  <YAxis
                    yAxisId="speedAxis"
                    orientation="right"
                    stroke="#3b82f6"
                    tick={{ fontSize: 11 }}
                    domain={[0, (dataMax: number) => Math.max(50, Math.ceil(dataMax * 1.15))]}
                    unit=" Mbps"
                  />
                )}

                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '11px', paddingTop: '0px', paddingBottom: '10px' }}
                />

                {/* Ping Latency Area + Line */}
                {(chartMode === 'all' || chartMode === 'ping') && (
                  <Area
                    yAxisId="pingAxis"
                    type="monotone"
                    dataKey="ping"
                    name="Ping Latency (ms)"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    fill="url(#pingGradient)"
                    dot={{ r: 3, fill: '#f59e0b' }}
                    activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
                    isAnimationActive={false}
                  />
                )}

                {/* Download Speed Line */}
                {(chartMode === 'all' || chartMode === 'bandwidth') && (
                  <Line
                    yAxisId="speedAxis"
                    type="monotone"
                    dataKey="download"
                    name="Download (Mbps)"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: '#3b82f6' }}
                    isAnimationActive={false}
                  />
                )}

                {/* Upload Speed Line */}
                {(chartMode === 'all' || chartMode === 'bandwidth') && (
                  <Line
                    yAxisId="speedAxis"
                    type="monotone"
                    dataKey="upload"
                    name="Upload (Mbps)"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="4 2"
                    dot={false}
                    activeDot={{ r: 5, fill: '#10b981' }}
                    isAnimationActive={false}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Symmetrical Fiber Network Node: <strong>Delta Mithapukur BDIX Edge</strong>
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Sampling interval: 150ms | Real-Time Recharts Telemetry
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
