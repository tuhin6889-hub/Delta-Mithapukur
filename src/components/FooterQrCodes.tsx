import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, MessageCircle, Download, ExternalLink, Copy, Check, QrCode, Sparkles, ShieldCheck } from 'lucide-react';
import { BRANCH_INFO } from '../data/plans';
import { useLanguage } from '../context/LanguageContext';

export const FooterQrCodes: React.FC = () => {
  const { language } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const androidAppLink = 'https://tuhin6889-hub.github.io/deltamithapukur.net/#android-app';
  const whatsappSupportLink = `https://wa.me/880${BRANCH_INFO.phone.replace(/[^0-9]/g, '')}?text=Hello%20Delta%20Mithapukur%20Support%2C%20I%20need%20broadband%20assistance`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="py-10 border-b border-slate-800/80" id="footer-qr-codes">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <QrCode className="h-3.5 w-3.5 text-blue-400" />
            <span>{language === 'bn' ? 'কুইক অ্যাক্সেস কিউআর কোড' : 'Instant Mobile QR Access'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{language === 'bn' ? 'মোবাইল অ্যাপ ও হোয়াটসঅ্যাপ সাপোর্ট কিউআর' : 'Scan to Connect: Android App & WhatsApp Support'}</span>
            <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'স্মার্টফোনের ক্যামেরা দিয়ে স্ক্যান করে সরাসরি ডেল্টা অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করুন অথবা ২৪/৭ হোয়াটসঅ্যাপ হেল্পডেস্কে মেসেজ পাঠান।'
              : 'Scan with your smartphone camera to quickly download the Delta Android App or open an instant 24/7 WhatsApp support chat with our local Mithapukur engineers.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{language === 'bn' ? '১০০% নিরাপদ ও ভেরিফাইড কিউআর' : '100% Safe & Verified Direct Links'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* QR 1: Android App Download */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 shadow-xl flex flex-col sm:flex-row items-center gap-6 group">
          {/* QR Code Container */}
          <div className="relative p-3.5 bg-white rounded-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300 ring-4 ring-indigo-500/20">
            <QRCodeSVG
              value={androidAppLink}
              size={120}
              level="M"
              includeMargin={false}
              className="rounded-lg"
            />
            <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-full shadow-md">
              <Smartphone className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Details & Actions */}
          <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Android APK v2.4
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  ● {language === 'bn' ? 'সরাসরি ইনস্টল' : 'Instant Setup'}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white mt-1">
                {language === 'bn' ? 'ডেল্টা মিঠাপুকুর অ্যান্ড্রয়েড অ্যাপ' : 'Delta Mithapukur Android App'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {language === 'bn'
                  ? 'বিল পেমেন্ট হিস্ট্রি, লাইভ স্পিড টেস্ট ও টিকিট ট্র্যাকিংয়ের জন্য অ্যাপ ডাউনলোড করুন।'
                  : 'Monitor bandwidth, check live latency, review bill receipts, and create support tickets on the go.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <a
                href={androidAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{language === 'bn' ? 'অ্যাপ ডাউনলোড' : 'Download APK'}</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(androidAppLink, 'app')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
                title="Copy App Link"
              >
                {copiedKey === 'app' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{language === 'bn' ? 'কপি হয়েছে' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>{language === 'bn' ? 'লিংক কপি' : 'Copy Link'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* QR 2: WhatsApp 24/7 Support Line */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 rounded-3xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col sm:flex-row items-center gap-6 group">
          {/* QR Code Container */}
          <div className="relative p-3.5 bg-white rounded-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300 ring-4 ring-emerald-500/20">
            <QRCodeSVG
              value={whatsappSupportLink}
              size={120}
              level="M"
              includeMargin={false}
              className="rounded-lg"
            />
            <div className="absolute -top-2 -right-2 bg-[#25D366] text-white p-1.5 rounded-full shadow-md">
              <MessageCircle className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Details & Actions */}
          <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  24/7 WhatsApp Hotline
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  ● {language === 'bn' ? 'অনলাইন সাপোর্ট' : 'Online Now'}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white mt-1">
                {language === 'bn' ? 'হোয়াটসঅ্যাপ ২৪/৭ সাপোর্ট লাইন' : 'WhatsApp 24/7 Support Line'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {language === 'bn'
                  ? 'সরাসরি আমাদের মিঠাপুকুর টেকনিক্যাল ইঞ্জিনিয়ারের সাথে হোয়াটসঅ্যাপে চ্যাট করুন।'
                  : 'Direct line to our on-duty Mithapukur fiber NOC engineer for quick queries and emergency line fixes.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <a
                href={whatsappSupportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'Chat on WhatsApp'}</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(whatsappSupportLink, 'whatsapp')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
                title="Copy WhatsApp Support Link"
              >
                {copiedKey === 'whatsapp' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{language === 'bn' ? 'কপি হয়েছে' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>{language === 'bn' ? 'লিংক কপি' : 'Copy Link'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
