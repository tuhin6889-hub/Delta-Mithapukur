import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COVERAGE_LOCATIONS } from '../data/plans';
import { CoverageLocation } from '../types';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  Radio, 
  Sparkles, 
  AlertCircle, 
  Zap, 
  Wifi, 
  Clock, 
  Activity, 
  Server, 
  ChevronRight, 
  Send, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const CoverageMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'Operational' | 'Expanding'>('all');
  const [selectedLocalityId, setSelectedLocalityId] = useState<string>('1');
  const [hoveredLocalityId, setHoveredLocalityId] = useState<string | null>(null);

  const mainHub = COVERAGE_LOCATIONS.find((l) => l.id === '1') || COVERAGE_LOCATIONS[0];

  const filteredLocations = COVERAGE_LOCATIONS.filter((loc) => {
    const matchesSearch = 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (loc.bengaliName && loc.bengaliName.includes(searchQuery)) ||
      (loc.unionSector && loc.unionSector.toLowerCase().includes(searchQuery.toLowerCase())) ||
      loc.coveredLandmarks.some((lm) => lm.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = activeFilter === 'all' || loc.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const activeLoc: CoverageLocation = 
    COVERAGE_LOCATIONS.find((l) => l.id === selectedLocalityId) || COVERAGE_LOCATIONS[0];

  const handleApplyConnection = (localityName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="coverage" className="py-20 bg-slate-950 text-white border-t border-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Radio className="h-3.5 w-3.5 animate-pulse text-blue-400" />
            <span>Mithapukur Network Reach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Mithapukur Fiber & Coverage Area
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Click on any neighborhood marker on the map or select from the list to view real-time optical fiber capacity, port availability, ping latencies, and installation leads.
          </p>
        </div>

        {/* Coverage Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Locality List & Search */}
          <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Select Neighborhood</span>
              </h3>
              <span className="text-[11px] bg-blue-500/15 text-blue-300 px-2.5 py-0.5 rounded-full font-semibold border border-blue-500/20">
                {COVERAGE_LOCATIONS.length} Active Nodes
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Boldipukur, Borogorga, Molonghat, Shalaipur PoP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Filter Category Chips */}
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                All Sectors ({COVERAGE_LOCATIONS.length})
              </button>
              <button
                onClick={() => setActiveFilter('Operational')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === 'Operational'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                100% Fiber Active
              </button>
              <button
                onClick={() => setActiveFilter('Expanding')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === 'Expanding'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Expanding Lines
              </button>
            </div>

            {/* Location List */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => {
                  const isSelected = loc.id === selectedLocalityId;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocalityId(loc.id)}
                      onMouseEnter={() => setHoveredLocalityId(loc.id)}
                      onMouseLeave={() => setHoveredLocalityId(null)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border-blue-500/80 text-white ring-1 ring-blue-500/40 shadow-lg'
                          : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-extrabold text-sm ${isSelected ? 'text-blue-300' : 'text-white'}`}>
                            {loc.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans flex items-center gap-2">
                          <span>{loc.bengaliName}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400 font-mono text-[10px]">{loc.availablePorts} ports free</span>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide ${
                            loc.status === 'Operational'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {loc.status}
                        </span>
                        <span className="text-[10px] font-bold text-blue-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Specs <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <AlertCircle className="h-6 w-6 text-amber-400 mx-auto" />
                  <p className="font-semibold text-slate-300">Neighborhood not listed in search?</p>
                  <p className="text-[11px] text-slate-400">
                    Our optical fiber teams extend custom cable drops across Mithapukur Upazila. Submit an inquiry for feasibility check!
                  </p>
                </div>
              )}
            </div>

            {/* Quick Status Bar */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Network Uptime Guarantee:</span>
              </div>
              <span className="font-black text-emerald-400">99.9% SLA</span>
            </div>

          </div>

          {/* Right Column: Interactive Vector Map & Neighborhood Inspector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Map Canvas Card */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-blue-400 animate-pulse" />
                  <span className="font-bold text-xs text-slate-200 uppercase tracking-wide">
                    Mithapukur Interactive Fiber Grid
                  </span>
                </div>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/20">
                  Live Interactive Radar
                </span>
              </div>

              {/* Simulated Interactive Grid Map Canvas */}
              <div className="relative h-80 sm:h-[380px] w-full bg-slate-950 rounded-2xl border border-slate-800/90 overflow-hidden select-none">
                
                {/* Radial Grid Backdrop */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Radar Sweep Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full border border-blue-500/20 animate-ping opacity-20 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-52 w-52 rounded-full border border-blue-400/30 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 rounded-full border border-blue-300/40 pointer-events-none" />

                {/* SVG Transmission Cable Lines Connecting Hub to Satellite Nodes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  {COVERAGE_LOCATIONS.map((loc) => {
                    if (loc.id === '1') return null; // skip main hub connecting to itself
                    const isSelected = loc.id === selectedLocalityId;
                    return (
                      <line
                        key={`line-${loc.id}`}
                        x1={`${mainHub.lngPct}%`}
                        y1={`${mainHub.latPct}%`}
                        x2={`${loc.lngPct}%`}
                        y2={`${loc.latPct}%`}
                        stroke={isSelected ? '#3b82f6' : '#1e293b'}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        strokeDasharray={isSelected ? '4 4' : '2 2'}
                        className={isSelected ? 'animate-pulse' : 'opacity-60'}
                      />
                    );
                  })}
                </svg>

                {/* Main Branch Hub Pin (Boldipukur Bazaar) */}
                <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none">
                  <div className="relative flex h-8 w-8 items-center justify-center mx-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-tr from-blue-700 to-blue-500 border-2 border-white shadow-lg items-center justify-center">
                      <Server className="h-3 w-3 text-white" />
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-white bg-slate-900/95 px-2 py-0.5 rounded-lg shadow-md border border-blue-500/50 inline-block mt-1 whitespace-nowrap">
                    Delta Mithapukur Branch Core PoP
                  </span>
                </div>

                {/* Interactive Location Markers */}
                {COVERAGE_LOCATIONS.map((loc) => {
                  const isSelected = loc.id === selectedLocalityId;
                  const isHovered = loc.id === hoveredLocalityId;

                  return (
                    <div
                      key={loc.id}
                      style={{ top: `${loc.latPct}%`, left: `${loc.lngPct}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
                    >
                      {/* Marker Button */}
                      <button
                        onClick={() => setSelectedLocalityId(loc.id)}
                        onMouseEnter={() => setHoveredLocalityId(loc.id)}
                        onMouseLeave={() => setHoveredLocalityId(null)}
                        className={`relative transition-all duration-300 cursor-pointer flex flex-col items-center focus:outline-none`}
                      >
                        {/* Pulse Ring when Selected */}
                        {isSelected && (
                          <span className="animate-ping absolute -inset-2 rounded-full bg-blue-400/40 pointer-events-none" />
                        )}

                        <div
                          className={`p-2 rounded-2xl border shadow-xl transition-all duration-300 flex items-center justify-center ${
                            isSelected
                              ? 'bg-blue-600 border-white text-white scale-125 ring-4 ring-blue-500/40 shadow-blue-500/50'
                              : isHovered
                              ? 'bg-slate-800 border-blue-400 text-blue-300 scale-110'
                              : loc.status === 'Operational'
                              ? 'bg-slate-900 border-emerald-500/60 text-emerald-400'
                              : 'bg-slate-900 border-amber-500/60 text-amber-400'
                          }`}
                        >
                          <MapPin className="h-4 w-4" />
                        </div>

                        {/* Always-Visible Map Label */}
                        <span
                          className={`mt-1 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-md transition-all shadow-md ${
                            isSelected
                              ? 'bg-blue-600 text-white ring-1 ring-blue-300'
                              : 'bg-slate-900/95 text-slate-200 border border-slate-700 opacity-90 group-hover:opacity-100'
                          }`}
                        >
                          {loc.name.split(' ')[0]}
                        </span>
                      </button>

                      {/* Hover / Active Mini Quick-Tooltip Popover */}
                      <AnimatePresence>
                        {(isHovered || (isSelected && !hoveredLocalityId)) && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none z-50 bg-slate-950/95 border border-blue-500/40 rounded-xl p-2.5 shadow-2xl min-w-[170px] text-left backdrop-blur-md"
                          >
                            <div className="font-extrabold text-xs text-white pb-1 border-b border-slate-800 flex items-center justify-between">
                              <span>{loc.name.split(' ')[0]}</span>
                              <span className="text-[9px] text-blue-400 font-mono">Up to {loc.maxSpeedMbps}M</span>
                            </div>
                            <div className="pt-1.5 space-y-1 text-[10px] text-slate-300">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Free Ports:</span>
                                <span className="font-bold text-emerald-400">{loc.availablePorts} Ports</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">BDIX Ping:</span>
                                <span className="font-bold text-blue-300">{loc.avgPingBdixMs} ms</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}

                {/* Map Legend Overlay */}
                <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-xl p-2 text-[10px] space-y-1 backdrop-blur-sm shadow-md z-20">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>FTTH Optical Fiber Node</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Expanding Sector</span>
                  </div>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 pt-1 gap-1">
                <span>Central Transmission Core: Boldipukur Bazzar (Delta Mithapukur Brach)</span>
                <span className="text-blue-400 font-semibold">Rangpur Division • Bangladesh</span>
              </div>
            </div>

            {/* Neighborhood Availability Inspector Drawer / Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLoc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 border border-blue-500/30 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Top Accent Light */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500" />

                <div className="space-y-5">
                  
                  {/* Header & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {activeLoc.oltNodeName}
                        </span>
                        <span className="text-xs text-slate-400">• {activeLoc.unionSector}</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {activeLoc.name}
                      </h4>
                      {activeLoc.bengaliName && (
                        <p className="text-xs text-emerald-400 font-sans font-semibold mt-0.5">
                          {activeLoc.bengaliName}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                          activeLoc.status === 'Operational'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>{activeLoc.status === 'Operational' ? '100% Fiber Active' : 'Expanding Line'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Neighborhood Overview Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeLoc.description}
                  </p>

                  {/* Key Neighborhood Metric Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    
                    {/* Max Speed */}
                    <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-left space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Zap className="h-3.5 w-3.5 text-amber-400" />
                        <span>Max Speed</span>
                      </div>
                      <div className="text-lg font-black text-white">
                        {activeLoc.maxSpeedMbps} <span className="text-xs font-normal text-slate-400">Mbps</span>
                      </div>
                    </div>

                    {/* Active Port Capacity */}
                    <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-left space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Server className="h-3.5 w-3.5 text-blue-400" />
                        <span>Optical Ports</span>
                      </div>
                      <div className="text-lg font-black text-emerald-400">
                        {activeLoc.availablePorts} <span className="text-xs font-normal text-slate-400">Free</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${((activeLoc.totalPorts - activeLoc.availablePorts) / activeLoc.totalPorts) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* BDIX Ping */}
                    <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-left space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Activity className="h-3.5 w-3.5 text-emerald-400" />
                        <span>BDIX Ping</span>
                      </div>
                      <div className="text-lg font-black text-blue-300">
                        {activeLoc.avgPingBdixMs} <span className="text-xs font-normal text-slate-400">ms</span>
                      </div>
                    </div>

                    {/* Install ETA */}
                    <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-left space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Clock className="h-3.5 w-3.5 text-sky-400" />
                        <span>Install Lead</span>
                      </div>
                      <div className="text-xs font-bold text-white pt-1">
                        {activeLoc.estInstallTime}
                      </div>
                    </div>

                  </div>

                  {/* Additional Technical Metrics: Signal & Gaming Latency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Optical Signal Power (RX):</span>
                      <span className="text-emerald-400 font-mono font-bold">{activeLoc.signalStrengthDbm}</span>
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Gaming Ping (PUBG/FreeFire):</span>
                      <span className="text-sky-300 font-mono font-bold">{activeLoc.avgPingGamingMs} ms</span>
                    </div>
                  </div>

                  {/* Covered Landmarks Tags */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-semibold text-slate-400 block">
                      Covered Landmarks & Roads in {activeLoc.name.split(' ')[0]}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeLoc.coveredLandmarks.map((lm, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-slate-200 flex items-center gap-1"
                        >
                          <Check className="h-3 w-3 text-blue-400" />
                          <span>{lm}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>Ready for high-speed fiber connection at your door?</span>
                    </div>

                    <button
                      onClick={() => handleApplyConnection(activeLoc.name)}
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <Send className="h-4 w-4" />
                      <span>Request Connection in {activeLoc.name.split(' ')[0]}</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
