import React, { useState } from 'react';
import {
  Wifi,
  Smartphone,
  CheckCircle2,
  XCircle,
  Zap,
  Sparkles,
  Info,
  Tv,
  Gamepad2,
  Users,
  ShieldCheck,
  TrendingUp,
  CloudRain
} from 'lucide-react';

interface ComparisonRow {
  id: string;
  feature: string;
  category: 'speed' | 'reliability' | 'cost';
  fiberValue: string;
  fiberAdvantage: boolean;
  mobileValue: string;
  mobileDrawback: boolean;
  explanation: string;
  icon: React.ElementType;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    id: 'data-caps',
    feature: 'Monthly Data Cap',
    category: 'cost',
    fiberValue: '100% Truly Unlimited',
    fiberAdvantage: true,
    mobileValue: 'Strict GB Packs (10-30GB limits)',
    mobileDrawback: true,
    explanation: 'Delta Fiber has zero FUP caps. Stream 4K movies, download large files, and work all month with no throttle or extra charges.',
    icon: Zap,
  },
  {
    id: 'latency',
    feature: 'Ping Latency & Stability',
    category: 'speed',
    fiberValue: 'Ultra-Low 3 - 8 ms',
    fiberAdvantage: true,
    mobileValue: 'High 45 - 120 ms (Lag & Jitter)',
    mobileDrawback: true,
    explanation: 'Low optical latency ensures zero lag in online games (Free Fire, PUBG), crystal-clear Zoom video calls, and instant web page loading.',
    icon: TrendingUp,
  },
  {
    id: 'weather',
    feature: 'Monsoon Weather Reliability',
    category: 'reliability',
    fiberValue: 'Unaffected by Heavy Rain / Storms',
    fiberAdvantage: true,
    mobileValue: 'Frequent Signal Drops & Blackouts',
    mobileDrawback: true,
    explanation: 'Underground and optical cable lines remain solid during Mithapukur monsoons, whereas mobile tower signals degrade heavily in bad weather.',
    icon: CloudRain,
  },
  {
    id: 'bdix',
    feature: 'BDIX Local Speed Boost',
    category: 'speed',
    fiberValue: 'Up to 100 Mbps BDIX Peering',
    fiberAdvantage: true,
    mobileValue: 'Standard Mobile Network Speeds',
    mobileDrawback: false,
    explanation: 'Direct high-speed optical connection to local BDIX caches means YouTube, Facebook, BDIX media servers, and Google load at lightning speeds.',
    icon: Wifi,
  },
  {
    id: 'devices',
    feature: 'Multi-Device Household Capacity',
    category: 'reliability',
    fiberValue: 'Supports 10 - 25+ Devices Smoothly',
    fiberAdvantage: true,
    mobileValue: 'Slows down with 2 - 3 connected phones',
    mobileDrawback: true,
    explanation: 'A single Delta fiber Wi-Fi router powers smart TVs, phones, laptops, and security cameras simultaneously without congestion.',
    icon: Users,
  },
  {
    id: 'pricing-value',
    feature: 'Monthly Cost Value',
    category: 'cost',
    fiberValue: 'Fixed Low Rate (From ৳500/month)',
    fiberAdvantage: true,
    mobileValue: 'Unpredictable High Recharge Costs',
    mobileDrawback: true,
    explanation: 'Recharging mobile data daily or weekly for a full family can cost ৳1,200 - ৳2,000+ per month for very limited data.',
    icon: ShieldCheck,
  },
];

type ScenarioFilter = 'all' | 'family' | 'gaming' | 'streaming';

export const FiberVsMobileComparison: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'speed' | 'reliability' | 'cost'>('all');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioFilter>('all');
  const [expandedRowId, setExpandedRowId] = useState<string | null>('data-caps');

  const filteredRows = COMPARISON_DATA.filter((row) => {
    if (activeCategory !== 'all' && row.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="mt-16 bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Connection Performance Benchmark</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Delta Fiber vs Mobile 4G / 5G Data
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Compare why optical fiber broadband is the superior choice for homes and businesses in Mithapukur.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Benefits
          </button>
          <button
            onClick={() => setActiveCategory('speed')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'speed'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Speed & Latency
          </button>
          <button
            onClick={() => setActiveCategory('reliability')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'reliability'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Reliability
          </button>
          <button
            onClick={() => setActiveCategory('cost')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'cost'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monthly Value
          </button>
        </div>
      </div>

      {/* Interactive Household Scenario Presets */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-blue-400" />
            Select Your Use Case to Highlight Key Differences:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Family Presets */}
          <button
            onClick={() => {
              setSelectedScenario('family');
              setActiveCategory('all');
              setExpandedRowId('devices');
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              selectedScenario === 'family'
                ? 'bg-blue-600/20 border-blue-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-xs">Family / Multi-Device</div>
              <div className="text-[11px] text-slate-400">Connected smart TVs & phones</div>
            </div>
          </button>

          {/* Gaming Preset */}
          <button
            onClick={() => {
              setSelectedScenario('gaming');
              setActiveCategory('speed');
              setExpandedRowId('latency');
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              selectedScenario === 'gaming'
                ? 'bg-amber-500/20 border-amber-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Gamepad2 className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-xs">Gaming & Live Zoom</div>
              <div className="text-[11px] text-slate-400">Ultra-low ping & zero jitter</div>
            </div>
          </button>

          {/* Streaming Preset */}
          <button
            onClick={() => {
              setSelectedScenario('streaming');
              setActiveCategory('all');
              setExpandedRowId('data-caps');
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
              selectedScenario === 'streaming'
                ? 'bg-emerald-500/20 border-emerald-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Tv className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-xs">4K Streaming & Downloads</div>
              <div className="text-[11px] text-slate-400">100% Unlimited no-cap data</div>
            </div>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/90 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <th className="py-4 px-5 font-semibold">Feature Benchmark</th>
              <th className="py-4 px-5 font-bold text-blue-400 bg-blue-950/20 border-x border-slate-800">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-blue-400" />
                  <span>Delta Mithapukur Fiber</span>
                </div>
              </th>
              <th className="py-4 px-5 font-semibold text-slate-400">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-slate-400" />
                  <span>Mobile 4G / 5G Pack</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
            {filteredRows.map((row) => {
              const IconComp = row.icon;
              const isExpanded = expandedRowId === row.id;

              return (
                <React.Fragment key={row.id}>
                  <tr
                    onClick={() => setExpandedRowId(isExpanded ? null : row.id)}
                    className={`cursor-pointer transition-colors ${
                      isExpanded ? 'bg-slate-900/90' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    {/* Feature Name */}
                    <td className="py-4 px-5 font-semibold text-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                          <IconComp className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <span>{row.feature}</span>
                          <span className="text-[10px] text-slate-500 block">Click for detailed breakdown</span>
                        </div>
                      </div>
                    </td>

                    {/* Fiber Column */}
                    <td className="py-4 px-5 font-bold text-emerald-400 bg-blue-950/20 border-x border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{row.fiberValue}</span>
                      </div>
                    </td>

                    {/* Mobile Data Column */}
                    <td className="py-4 px-5 font-medium text-slate-400">
                      <div className="flex items-center gap-2">
                        {row.mobileDrawback ? (
                          <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-slate-500 shrink-0" />
                        )}
                        <span className={row.mobileDrawback ? 'text-rose-300' : 'text-slate-400'}>
                          {row.mobileValue}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Detail Accordion Row */}
                  {isExpanded && (
                    <tr className="bg-slate-900/70 border-b border-slate-800">
                      <td colSpan={3} className="px-6 py-3.5 text-xs text-slate-300 leading-relaxed bg-blue-950/10">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white font-semibold">{row.feature} Detail: </strong>
                            <span>{row.explanation}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Footer Box */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>
            <strong>100% Satisfaction Guarantee:</strong> Enjoy dedicated optical fiber drops connected directly to your router with zero shared mobile tower congestion.
          </span>
        </div>
      </div>

    </div>
  );
};
