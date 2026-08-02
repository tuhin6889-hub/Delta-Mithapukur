import React, { useState } from 'react';
import { COVERAGE_LOCATIONS } from '../data/plans';
import { MapPin, Search, CheckCircle, Radio, Sparkles, AlertCircle } from 'lucide-react';

export const CoverageMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState<string | null>('1');

  const filteredLocations = COVERAGE_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeLoc = COVERAGE_LOCATIONS.find((l) => l.id === selectedLocality) || COVERAGE_LOCATIONS[0];

  return (
    <section id="coverage" className="py-20 bg-slate-950 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Network Reach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mithapukur Fiber Coverage Area
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Check active optical fiber lines and high-gain wireless hubs across Mithapukur Upazila, Rangpur Division.
          </p>
        </div>

        {/* Coverage Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Locality Selector & Search */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              Check Your Area Coverage
            </h3>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search area e.g. Boldipukur, Sadar, Pairaband..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Location List */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocality(loc.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                      selectedLocality === loc.id
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-sm">{loc.name}</span>
                      <span className="text-[11px] text-slate-400">{loc.areaType}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        loc.status === 'Operational'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {loc.status}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
                  <AlertCircle className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                  Area not listed? Contact our branch desk for line extension evaluation!
                </div>
              )}
            </div>

            {/* Active Details Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 block font-medium">Selected Location Status:</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{activeLoc.name}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> High Signal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Direct fiber cables deployed in this sector. Installation typically completed within 24 hours of request.
              </p>
            </div>
          </div>

          {/* Right: Modern Vector Coverage Map Visualization */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-blue-400 animate-pulse" />
                <span className="font-bold text-xs text-slate-200">Mithapukur Fiber Grid Radar</span>
              </div>
              <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/20">
                Active Local Loop
              </span>
            </div>

            {/* Simulated Map Canvas */}
            <div className="relative h-80 sm:h-96 w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              
              {/* Grid backdrop */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Central Radar Ping Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full border border-blue-500/20 animate-ping opacity-30 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-full border border-blue-400/30 pointer-events-none" />

              {/* Hub Marker at Boldipukur Bazaar */}
              <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
                <div className="relative flex h-8 w-8 items-center justify-center mx-auto">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white" />
                </div>
                <span className="text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded shadow border border-blue-500/40 inline-block mt-1">
                  MAIN HUB (Boldipukur)
                </span>
              </div>

              {/* Plot Locations */}
              {COVERAGE_LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocality;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocality(loc.id)}
                    style={{ top: `${loc.latPct}%`, left: `${loc.lngPct}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 group cursor-pointer`}
                  >
                    <div
                      className={`p-1.5 rounded-full border shadow-lg transition-transform ${
                        isSelected
                          ? 'bg-blue-500 border-white text-white scale-125 ring-4 ring-blue-500/30'
                          : 'bg-slate-800 border-slate-600 text-blue-300 hover:scale-110'
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 top-7 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-700 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {loc.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}

            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Main Hub: Boldipukur Bazaar Akmal Market</span>
              <span className="text-blue-400 font-semibold">Rangpur Division • Bangladesh</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
