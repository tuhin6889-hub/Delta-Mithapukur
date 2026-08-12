import React, { useState } from 'react';
import {
  Users,
  Gift,
  Copy,
  Check,
  Share2,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Send,
  Building2,
  Tag
} from 'lucide-react';

interface ReferralReward {
  id: string;
  neighborName: string;
  unionArea: string;
  date: string;
  status: 'Completed' | 'Pending Installation' | 'Processing';
  rewardAmount: string;
}

export const ReferralSection: React.FC = () => {
  const [customerId, setCustomerId] = useState<string>('DF-MITH-8842');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'tracker'>('generate');
  const [sampleTrackedRewards, setSampleTrackedRewards] = useState<ReferralReward[]>([
    {
      id: 'REF-101',
      neighborName: 'Kabir Hossain',
      unionArea: 'Boldipukur Bazaar',
      date: '24 July 2026',
      status: 'Completed',
      rewardAmount: '৳200 Bill Discount',
    },
    {
      id: 'REF-102',
      neighborName: 'Tariqul Islam',
      unionArea: 'Ranipukur Union Market',
      date: '26 July 2026',
      status: 'Pending Installation',
      rewardAmount: '৳200 Pending Credit',
    },
  ]);

  const referralCode = customerId.trim() ? `REF-${customerId.trim().toUpperCase()}` : 'REF-DF-MITH-XXXX';
  const referralLink = `https://deltafiber.bd/mithapukur/ref?code=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = `Get high-speed 100% Optical Fiber Broadband in Mithapukur with Delta Fiber! Use my referral code ${referralCode} to get FREE optical drop installation & ৳100 discount on your first month bill. Apply now: ${referralLink}`;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="referral" className="py-20 bg-slate-950 text-white relative border-t border-slate-800 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Gift className="h-3.5 w-3.5" />
            <span>Mithapukur Community Rewards</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Refer a Neighbor, Get Free Broadband Credits
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Spread high-speed fiber internet across Mithapukur Sadar, Boldipukur, Ranipukur, and nearby unions. Both you and your neighbor get rewarded on every successful line activation!
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-lg hover:scale-105 transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-lg border border-blue-500/30">
              1
            </div>
            <h4 className="font-bold text-white text-base">Enter Your Customer ID</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Find your customer ID on your monthly bKash SMS bill receipt or user router portal.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 hover:shadow-lg hover:scale-105 transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg border border-amber-500/30">
              2
            </div>
            <h4 className="font-bold text-white text-base">Share Link with Neighbors</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Send your unique referral link via WhatsApp, IMO, or SMS to friends and shops in Mithapukur.
            </p>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-lg hover:scale-105 transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg border border-emerald-500/30">
              3
            </div>
            <h4 className="font-bold text-white text-base">Earn Bill Discounts</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Get ৳200 credited directly to your next month’s bill for every neighbor who gets connected!
            </p>
          </div>
        </div>

        {/* Interactive Main Referral Hub Box */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 hover:scale-[1.02] hover:border-blue-500/40 hover:shadow-blue-500/10 transition-all duration-300">
          
          {/* Navigation Toggle Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <h3 className="font-bold text-white text-lg">Mithapukur Referral Portal</h3>
            </div>

            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'generate'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Generate Referral Link
              </button>
              <button
                onClick={() => setActiveTab('tracker')}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'tracker'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Rewards Tracker ({sampleTrackedRewards.length})
              </button>
            </div>
          </div>

          {activeTab === 'generate' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Input Column */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <label htmlFor="customer-id-input" className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Enter Your Customer ID / User ID
                  </label>
                  <div className="relative">
                    <input
                      id="customer-id-input"
                      type="text"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="e.g. DF-MITH-8842"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 uppercase tracking-wider"
                    />
                    {customerId && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                        VERIFIED NODE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Don't know your ID? Check your bKash bill SMS or contact support.</span>
                    <button
                      type="button"
                      onClick={() => setCustomerId('DF-MITH-2026')}
                      className="text-blue-400 hover:underline cursor-pointer font-semibold"
                    >
                      Use Sample ID
                    </button>
                  </p>
                </div>

                {/* Generated Referral Code & Link Box */}
                <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Your Exclusive Shareable Link:</span>
                    <span className="font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Code: {referralCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-300" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Instant Social Share Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleShareWhatsApp}
                      className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Share on WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Reward Highlights Graphic Box */}
              <div className="lg:col-span-6 bg-gradient-to-br from-blue-950/40 via-slate-950 to-emerald-950/30 p-6 rounded-2xl border border-slate-800 space-y-4 hover:scale-[1.02] hover:border-emerald-500/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    Mithapukur Referral Milestones
                  </span>
                  <span className="text-[10px] text-slate-400">Valid in all 17 Unions</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center">
                        1x
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">1 Neighbor Referral</div>
                        <div className="text-slate-400 text-[11px]">Free ৳200 bKash bill discount</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold">৳200 Credit</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
                        3x
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">3 Neighbor Referrals</div>
                        <div className="text-slate-400 text-[11px]">৳600 Credit + Free 7-Day Speed Boost</div>
                      </div>
                    </div>
                    <span className="text-amber-400 font-bold">৳600 + Boost</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
                        5x
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">5 Neighbor Referrals</div>
                        <div className="text-slate-400 text-[11px]">FULL 1 MONTH FREE BROADBAND</div>
                      </div>
                    </div>
                    <span className="text-emerald-300 font-black">100% FREE MONTH</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Referred neighbors also get <strong>FREE Optical Drop Installation</strong> + ৳100 off their first month bill.</span>
                </div>

              </div>

            </div>
          ) : (
            /* Rewards Tracker Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tracking active neighbor referrals connected under customer <strong>{customerId}</strong>:</span>
                <span className="text-emerald-400 font-bold">Total Earned: ৳200</span>
              </div>

              <div className="space-y-3">
                {sampleTrackedRewards.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                        <Tag className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{item.neighborName}</div>
                        <div className="text-slate-400 text-[11px] flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3 text-slate-500" />
                            {item.unionArea}
                          </span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 border-slate-900 pt-2 sm:pt-0">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          item.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {item.status === 'Completed' ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clock className="h-3.5 w-3.5 animate-pulse" />
                        )}
                        {item.status}
                      </span>
                      <span className="font-extrabold text-white text-sm">{item.rewardAmount}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Discounts are automatically deducted from your bKash monthly billing statement upon new line fiber installation.</span>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  Refer another neighbor →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
