import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Wifi,
  ChevronDown,
  X,
  Clock,
  ShieldCheck
} from 'lucide-react';

export type NodeStatusType = 'Operational' | 'Maintenance' | 'Checking';

interface NodeDetail {
  id: string;
  name: string;
  status: 'Operational' | 'Maintenance' | 'Degraded';
  ping: number;
}

export const NetworkStatus: React.FC = () => {
  const [status, setStatus] = useState<NodeStatusType>('Operational');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<string>('Just now');
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [latency, setLatency] = useState<number>(4);

  const [subNodes, setSubNodes] = useState<NodeDetail[]>([
    { id: '1', name: 'Boldipukur Primary Optical Hub', status: 'Operational', ping: 4 },
    { id: '2', name: 'Mithapukur Sadar BDIX Gateway', status: 'Operational', ping: 6 },
    { id: '3', name: 'Ranipukur Secondary Optical Splitter', status: 'Operational', ping: 8 },
    { id: '4', name: 'Rangpur Main Trunk Link', status: 'Operational', ping: 12 },
  ]);

  // Mock API call function to check Mithapukur Node Health
  const checkMithapukurNodeHealth = async () => {
    setIsRefreshing(true);
    setStatus('Checking');

    // Simulate network delay for realistic mock API response
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 90% chance Operational, 10% chance Maintenance / Degraded for realistic mock simulation
    const rand = Math.random();
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (rand < 0.88) {
      setStatus('Operational');
      setLatency(Math.floor(Math.random() * 4) + 3); // 3-6ms
      setSubNodes([
        { id: '1', name: 'Boldipukur Primary Optical Hub', status: 'Operational', ping: 4 },
        { id: '2', name: 'Mithapukur Sadar BDIX Gateway', status: 'Operational', ping: 5 },
        { id: '3', name: 'Ranipukur Secondary Optical Splitter', status: 'Operational', ping: 7 },
        { id: '4', name: 'Rangpur Main Trunk Link', status: 'Operational', ping: 11 },
      ]);
    } else {
      setStatus('Maintenance');
      setLatency(Math.floor(Math.random() * 15) + 22); // 22-37ms
      setSubNodes([
        { id: '1', name: 'Boldipukur Primary Optical Hub', status: 'Operational', ping: 5 },
        { id: '2', name: 'Mithapukur Sadar BDIX Gateway', status: 'Maintenance', ping: 35 },
        { id: '3', name: 'Ranipukur Secondary Optical Splitter', status: 'Operational', ping: 9 },
        { id: '4', name: 'Rangpur Main Trunk Link', status: 'Operational', ping: 14 },
      ]);
    }

    setLastChecked(timeString);
    setIsRefreshing(false);
  };

  // Initial load check
  useEffect(() => {
    const now = new Date();
    setLastChecked(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    // Periodically re-check health every 45 seconds
    const interval = setInterval(() => {
      checkMithapukurNodeHealth();
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Badge */}
      <button
        onClick={() => setPopoverOpen(!popoverOpen)}
        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          status === 'Operational'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            : status === 'Maintenance'
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
            : 'bg-slate-800 text-slate-300 border-slate-700'
        }`}
        aria-label="Mithapukur Node Health Status"
      >
        {/* Pulsing indicator dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status === 'Operational'
                ? 'bg-emerald-400'
                : status === 'Maintenance'
                ? 'bg-amber-400'
                : 'bg-blue-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              status === 'Operational'
                ? 'bg-emerald-500'
                : status === 'Maintenance'
                ? 'bg-amber-500'
                : 'bg-blue-500'
            }`}
          />
        </span>

        <span className="hidden sm:inline text-[11px] text-slate-400 font-medium">Node:</span>
        <span className="font-extrabold tracking-tight">
          Mithapukur ({status})
        </span>

        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${popoverOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Card */}
      {popoverOpen && (
        <>
          {/* Backdrop for click outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setPopoverOpen(false)}
          />

          <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl z-50 p-4 space-y-4 text-xs backdrop-blur-md">
            
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-blue-400" />
                <div>
                  <h4 className="font-bold text-white text-sm">Mithapukur Fiber Node Health</h4>
                  <span className="text-[11px] text-slate-400 block">Akmal Market, Boldipukur Distribution Hub</span>
                </div>
              </div>
              <button
                onClick={() => setPopoverOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Current Health Overview */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Node Status</span>
                <span className={`font-black text-sm flex items-center justify-center gap-1 ${
                  status === 'Operational' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {status === 'Operational' ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  )}
                  {status}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Latency / Uptime</span>
                <span className="font-black text-sm text-white font-mono">
                  {latency} ms <span className="text-[10px] text-emerald-400 font-sans font-normal">(99.98%)</span>
                </span>
              </div>
            </div>

            {/* Sub-node details list */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">
                Active Optical Links Breakdown
              </span>

              <div className="space-y-1.5">
                {subNodes.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px]"
                  >
                    <span className="text-slate-300 font-medium truncate max-w-[200px]">{node.name}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400">{node.ping}ms</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          node.status === 'Operational'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Manual Check trigger */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3 w-3 text-slate-500" />
                Checked: <strong className="text-slate-300 font-mono">{lastChecked}</strong>
              </span>

              <button
                onClick={checkMithapukurNodeHealth}
                disabled={isRefreshing}
                className="px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-bold rounded-lg border border-blue-500/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
                <span>{isRefreshing ? 'Pinging Node...' : 'Re-check Node'}</span>
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};
