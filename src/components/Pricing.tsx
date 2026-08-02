import React from 'react';
import { PLANS } from '../data/plans';
import { Plan } from '../types';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { FiberVsMobileComparison } from './FiberVsMobileComparison';

interface PricingProps {
  onSelectPlan: (plan: Plan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 bg-slate-900 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Broadband Packages & Fees
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Simple, honest pricing with no hidden charges. All packages include unlimited monthly data and free standard fiber installation in Mithapukur.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 md:-translate-y-2'
                  : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-extrabold px-4 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" /> Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                    {plan.speedMbps} Mbps
                  </span>
                </div>

                {/* Price Display in BDT */}
                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-blue-400">৳</span>
                    <span className="text-4xl sm:text-5xl font-black text-white">{plan.priceBdt.toLocaleString()}</span>
                    <span className="text-slate-400 text-sm font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 italic">{plan.recommendedFor}</p>
                </div>

                {/* Feature List */}
                <ul className="space-y-3.5 my-8 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <span>Select Package</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Corporate Box */}
        <div className="mt-12 bg-slate-950/80 rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">Need Custom Speed or Enterprise SLA?</h4>
            <p className="text-xs text-slate-400">
              We offer dedicated fiber rings, multiple static IPs, and custom bandwidth for local institutions in Mithapukur.
            </p>
          </div>
          <a
            href={`tel:01719394430`}
            className="shrink-0 bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold text-xs px-6 py-3 rounded-xl border border-slate-700 transition-colors"
          >
            Call 0171-9394430 Directly
          </a>
        </div>

        {/* Interactive Comparison Table: Fiber vs Mobile Data */}
        <FiberVsMobileComparison />

      </div>
    </section>
  );
};
