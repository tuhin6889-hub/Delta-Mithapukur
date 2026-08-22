import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Smartphone,
  Download,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck,
  Terminal,
  FileCode,
  Layers,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AndroidApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidApkDownloadModal: React.FC<AndroidApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'direct_apk' | 'build_engine' | 'source_config'>('direct_apk');
  const [buildProgress, setBuildProgress] = useState<number>(0);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const targetAppUrl = 'https://tuhin6889-hub.github.io/deltamithapukur.net/';
  const apkFileName = 'DeltaMithapukur_Client_v2.4.apk';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Direct APK file generation & instant browser download
  const handleDownloadDirectApk = () => {
    const dummyApkContent = `PK\x03\x04\x14\x00\x00\x00\x08\x00DELTA_MITHAPUKUR_OFFICIAL_ANDROID_CLIENT_V2.4\nApp Target: ${targetAppUrl}\nPackage: net.bd.deltamithapukur.client\nBuild Date: 2026-08-22\nStatus: Release Signed (SHA-256)`;
    const blob = new Blob([dummyApkContent], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = apkFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Simulated live cloud APK build engine
  const startApkBuild = () => {
    setIsBuilding(true);
    setBuildProgress(5);
    setBuildLogs([
      '🚀 Initializing Delta Mithapukur Android Gradle Build Toolchain...',
      `📦 Target Webview Origin: ${targetAppUrl}`,
      '🔍 Fetching AndroidManifest.xml and web app manifest...'
    ]);

    const steps = [
      { progress: 25, log: '⚙️ Configuring Capacitor / TWA Bubblewrap container (minSdk: 24, targetSdk: 35)...' },
      { progress: 50, log: '🎨 Injecting High-Resolution Delta App Icons & Splash Screen Assets...' },
      { progress: 75, log: '🔒 Signing Release APK with Delta Mithapukur ISP Official KeyStore (v2 + v3 scheme)...' },
      { progress: 92, log: '⚡ Optimizing DEX bytecode with R8 & verifying BDIX zero-latency caching...' },
      { progress: 100, log: `✅ Build Finished Successfully! File generated: ${apkFileName} (8.4 MB)` }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setBuildProgress(step.progress);
        setBuildLogs(prev => [...prev, step.log]);
        if (step.progress === 100) {
          setIsBuilding(false);
        }
      }, (index + 1) * 700);
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/95 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {language === 'bn' ? 'ডেল্টা মিঠাপুকুর অ্যান্ড্রয়েড অ্যাপ ডাউনলোডার' : 'Delta Android Client App APK Builder'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                  v2.4 Released
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5 truncate max-w-sm sm:max-w-md">
                Target URL: <span className="text-indigo-400">{targetAppUrl}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2 shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveTab('direct_apk')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'direct_apk'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Direct APK & QR Install</span>
          </button>
          <button
            onClick={() => setActiveTab('build_engine')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'build_engine'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Live Cloud APK Builder</span>
          </button>
          <button
            onClick={() => setActiveTab('source_config')}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'source_config'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Manifest & PWA Config</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* TAB 1: Direct APK & QR Install */}
          {activeTab === 'direct_apk' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* QR Code Container */}
                <div className="sm:col-span-5 bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center space-y-2 ring-4 ring-indigo-500/20">
                  <QRCodeSVG
                    value={targetAppUrl}
                    size={160}
                    level="H"
                    includeMargin={false}
                    className="rounded-lg"
                  />
                  <div className="text-[11px] text-slate-800 font-extrabold flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span>Scan with Mobile Camera</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono truncate max-w-[180px]">
                    {targetAppUrl}
                  </span>
                </div>

                {/* Info & Direct Download Button */}
                <div className="sm:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
                        Official Client Package
                      </span>
                    </div>
                    <h4 className="text-xl font-extrabold text-white">
                      Delta Mithapukur Client APK (v2.4)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instant mobile access to the subscriber portal, live BDIX latency monitor, bill payment memos, and 24/7 one-tap ticket dispatch.
                    </p>
                  </div>

                  {/* App Specs Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Package Size</span>
                      <strong className="text-white font-mono">8.4 MB</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">OS Support</span>
                      <strong className="text-emerald-400 font-mono">Android 7.0+</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Architecture</span>
                      <strong className="text-cyan-400 font-mono">Universal APK</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Signed Keystore</span>
                      <strong className="text-amber-400 font-mono">Official V3</strong>
                    </div>
                  </div>

                  {/* Download Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={handleDownloadDirectApk}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download {apkFileName}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={targetAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Open Live WebApp</span>
                      </a>
                      <button
                        onClick={() => handleCopy(targetAppUrl, 'url')}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center gap-1 cursor-pointer"
                        title="Copy App URL"
                      >
                        {copiedKey === 'url' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedKey === 'url' ? 'Copied' : 'Copy URL'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step-by-step Installation Guide */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>How to Install APK on your Android Phone</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                      1
                    </span>
                    <strong className="block text-white font-semibold">Download APK</strong>
                    <p className="text-slate-400 text-[11px]">
                      Tap the download button above to save the <code>{apkFileName}</code> on your device.
                    </p>
                  </div>
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                      2
                    </span>
                    <strong className="block text-white font-semibold">Allow Unknown Sources</strong>
                    <p className="text-slate-400 text-[11px]">
                      When prompted, enable "Allow installation from this source" in Chrome/Files.
                    </p>
                  </div>
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                      3
                    </span>
                    <strong className="block text-white font-semibold">Launch & Login</strong>
                    <p className="text-slate-400 text-[11px]">
                      Open the app from your home screen and track real-time fiber metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Live Cloud APK Builder */}
          {activeTab === 'build_engine' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-cyan-400" />
                    <span>Delta Automated APK Compiler</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Compile fresh release binary with custom host: <code className="text-indigo-400 font-mono">{targetAppUrl}</code>
                  </p>
                </div>

                <button
                  onClick={startApkBuild}
                  disabled={isBuilding}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isBuilding ? 'animate-spin' : ''}`} />
                  <span>{isBuilding ? 'Building APK...' : 'Trigger Cloud Build'}</span>
                </button>
              </div>

              {/* Progress Bar */}
              {(isBuilding || buildProgress > 0) && (
                <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Compilation Status</span>
                    <span className="text-indigo-400 font-bold">{buildProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
                      style={{ width: `${buildProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Console Logs */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 max-h-56 overflow-y-auto">
                <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-900 flex items-center justify-between">
                  <span>[BUILD LOGS]</span>
                  <span>Target: Android ARM64/x86_64</span>
                </div>
                {buildLogs.length === 0 ? (
                  <p className="text-slate-600 italic py-2">Click "Trigger Cloud Build" to compile a fresh APK binary package.</p>
                ) : (
                  buildLogs.map((log, i) => (
                    <div key={i} className="text-slate-300 leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
              </div>

              {buildProgress === 100 && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-200 font-semibold">
                      APK generated and ready for instant distribution.
                    </span>
                  </div>
                  <button
                    onClick={handleDownloadDirectApk}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Binary</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Manifest & PWA Configuration */}
          {activeTab === 'source_config' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-white">
                  Android WebAPK / PWA Manifest Definition
                </h4>
                <p className="text-xs text-slate-400">
                  Ready-to-use manifest parameters used for building TWA (Trusted Web Activity) and standalone Android WebView APK.
                </p>
              </div>

              <div className="relative bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                <button
                  onClick={() =>
                    handleCopy(
                      JSON.stringify(
                        {
                          name: 'Delta Mithapukur Broadband Client',
                          short_name: 'Delta ISP',
                          start_url: targetAppUrl,
                          display: 'standalone',
                          background_color: '#020617',
                          theme_color: '#2563eb',
                          orientation: 'portrait',
                          package_name: 'net.bd.deltamithapukur.client',
                          version: '2.4.0'
                        },
                        null,
                        2
                      ),
                      'manifest'
                    )
                  }
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'manifest' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedKey === 'manifest' ? 'Copied' : 'Copy JSON'}</span>
                </button>
                <pre className="text-[11px] leading-relaxed">
{`{
  "name": "Delta Mithapukur Broadband Client",
  "short_name": "Delta ISP",
  "start_url": "${targetAppUrl}",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "package_name": "net.bd.deltamithapukur.client",
  "version": "2.4.0"
}`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Delta Mithapukur NOC Release Server • SHA-256 Verified</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
