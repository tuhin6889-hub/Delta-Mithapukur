import React, { useState, useEffect, useRef } from 'react';
import { NEWS_POSTS, NewsPost } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Clock,
  Pause,
  Play,
  Megaphone,
  Maximize2,
  X,
  ImageIcon
} from 'lucide-react';

interface NewsTickerSectionProps {
  onOpenInquiryModal?: () => void;
}

export const NewsTickerSection: React.FC<NewsTickerSectionProps> = ({ onOpenInquiryModal }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [modalImage, setModalImage] = useState<NewsPost | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activePost = NEWS_POSTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % NEWS_POSTS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + NEWS_POSTS.length) % NEWS_POSTS.length);
    setProgress(0);
  };

  // Auto slide timer & progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const DURATION = 6000; // 6 seconds per image slide
    const STEP = 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (STEP / DURATION) * 100;
      });
    }, STEP);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, isPlaying]);

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 relative z-20" id="news-updates">
      {/* 1. Continuous Marquee Ticker Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 py-2 px-3 sm:px-6 border-b border-blue-500/20 text-xs flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 bg-red-600/90 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-md shrink-0 shadow-sm shadow-red-500/30 animate-pulse">
          <Megaphone className="h-3 w-3" />
          <span>{language === 'bn' ? 'ব্রেকিং নিউজ' : 'BREAKING NEWS'}</span>
        </div>

        {/* Scrolling Infinite Ticker */}
        <div className="flex-1 overflow-hidden relative group">
          <div className="whitespace-nowrap inline-flex items-center gap-8 animate-marquee group-hover:[animation-play-state:paused]">
            {NEWS_POSTS.concat(NEWS_POSTS).map((post, idx) => (
              <button
                key={`${post.id}-${idx}`}
                onClick={() => {
                  setCurrentIndex(idx % NEWS_POSTS.length);
                  setProgress(0);
                }}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-300 transition-colors cursor-pointer"
              >
                <span className="text-amber-400 font-bold">•</span>
                <span className="font-semibold text-slate-100">
                  {language === 'bn' ? post.titleBn : post.titleEn}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  {language === 'bn' ? post.badgeBn : post.badgeEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Image-First Poster Slideshow Showcase */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div
          className="relative bg-gradient-to-r from-slate-900 via-slate-900/95 to-blue-950/90 rounded-2xl border border-slate-800/90 overflow-hidden shadow-2xl transition-all duration-300 hover:border-blue-500/40"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Animated Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800/80 overflow-hidden z-20">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Main Featured Poster Image Showcase */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[16/9] sm:aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                <img
                  src={activePost.image}
                  alt={language === 'bn' ? activePost.titleBn : activePost.titleEn}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                  onClick={() => setModalImage(activePost)}
                  referrerPolicy="no-referrer"
                />

                {/* Fullscreen Zoom Trigger */}
                <button
                  onClick={() => setModalImage(activePost)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/90 text-white border border-slate-700/80 shadow-lg hover:bg-blue-600 hover:border-blue-500 transition-all cursor-pointer opacity-90 hover:opacity-100 flex items-center gap-1.5 text-xs font-semibold"
                  title="View High-Res Photo"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{language === 'bn' ? 'বড় করে দেখুন' : 'Full Image'}</span>
                </button>
              </div>
            </div>

            {/* Poster Details & Action Content */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  ● {language === 'bn' ? 'পোস্ট বিষয়বস্তু' : 'POST FEATURE'}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="h-3.5 w-3.5 text-blue-400" /> {activePost.date}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-black text-white leading-snug">
                  {language === 'bn' ? activePost.titleBn : activePost.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  {language === 'bn' ? activePost.summaryBn : activePost.summaryEn}
                </p>
              </div>

              {/* Action Buttons & Slide Controls */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
                {onOpenInquiryModal && (
                  <button
                    onClick={onOpenInquiryModal}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'নতুন সংযোগের আবেদন' : 'Apply For Connection'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}

                {/* Slideshow Controllers */}
                <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Previous Image Slide"
                    aria-label="Previous Image Slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause Image Slideshow' : 'Play Image Slideshow'}
                    aria-label={isPlaying ? 'Pause Image Slideshow' : 'Play Image Slideshow'}
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-400" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Next Image Slide"
                    aria-label="Next Image Slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Photo Thumbnails Switcher */}
              <div className="pt-1 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {NEWS_POSTS.map((post, idx) => (
                  <button
                    key={post.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setProgress(0);
                    }}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      idx === currentIndex
                        ? 'border-blue-500 ring-2 ring-blue-500/30 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                    }`}
                    title={language === 'bn' ? post.titleBn : post.titleEn}
                  >
                    <img
                      src={post.image}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal Lightbox Viewer */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white truncate pr-4">
                {language === 'bn' ? modalImage.titleBn : modalImage.titleEn}
              </h4>
              <button
                onClick={() => setModalImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 relative rounded-xl overflow-hidden bg-black max-h-[80vh] flex items-center justify-center">
              <img
                src={modalImage.image}
                alt="Full Resolution View"
                className="max-h-[75vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
