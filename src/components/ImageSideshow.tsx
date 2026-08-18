import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import posterCoverImg from '../assets/images/delta_mithapukur_cover_1787008989117.jpg';
import poster1Img from '../assets/images/regenerated_image_1785277610229.jpg';
import poster2Img from '../assets/images/regenerated_image_1785277611652.webp';
import poster3Img from '../assets/images/regenerated_image_1785277613279.webp';
import poster4Img from '../assets/images/regenerated_image_1785277614755.webp';

interface SlideImage {
  id: string;
  src: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  tagEn: string;
  tagBn: string;
}

const SLIDES: SlideImage[] = [
  {
    id: 'slide-cover',
    src: posterCoverImg,
    titleEn: 'Delta Mithapukur - Ultra-Fast Fiber Broadband Network',
    titleBn: 'ডেল্টা মিঠাপুকুর - আল্ট্রা-ফাস্ট ফাইবার ব্রডব্যান্ড নেটওয়ার্ক',
    subtitleEn: 'High-speed optical fiber coverage reaching every village and household in Mithapukur',
    subtitleBn: 'মিঠাপুকুর উপজেলার প্রতিটি ইউনিয়ন ও গ্রামে নিরবচ্ছিন্ন উচ্চগতির অপটিক্যাল ফাইবার সংযোগ',
    tagEn: 'Delta Mithapukur',
    tagBn: 'ডেল্টা মিঠাপুকুর',
  },
  {
    id: 'slide-1',
    src: poster1Img,
    titleEn: 'Internet Services in Every Household - Delta Internet',
    titleBn: 'প্রতিটি ঘরে ঘরে ইন্টারনেটের সেবা পৌঁছে দিচ্ছে ডেল্টা ইন্টারনেট',
    subtitleEn: '20 Mbps ৳525, 30 Mbps ৳630, 40 Mbps ৳735, 50 Mbps ৳840, 60 Mbps ৳1050',
    subtitleBn: '২০ Mbps ৫২৫টাকা, ৩০ Mbps ৬৩০টাকা, ৪০ Mbps ৭৩৫টাকা, ৫০ Mbps ৮৪০টাকা, ৬০ Mbps ১০৫০টাকা',
    tagEn: 'Village Fiber Offers',
    tagBn: 'গ্রামের ফাইবার অফার',
  },
  {
    id: 'slide-2',
    src: poster2Img,
    titleEn: 'Internet for Everyone - A New Address of Trust',
    titleBn: 'সবার জন্য ইন্টারনেট - আস্থার এক নতুন ঠিকানা',
    subtitleEn: '30 Mbps ৳630, 40 Mbps ৳735, 60 Mbps ৳1050 for study, gaming & smart family',
    subtitleBn: 'স্টাডি, গেইমিং ও স্মার্ট ফ্যামিলির জন্য ৩০, ৪০ ও ৬০ Mbps উচ্চগতির ইন্টারনেট',
    tagEn: 'Family & Gaming',
    tagBn: 'ফ্যামিলি ও গেইমিং',
  },
  {
    id: 'slide-3',
    src: poster3Img,
    titleEn: 'One Connection for the Whole Family',
    titleBn: 'এক কানেকশনে চলবে পুরো পরিবার - ডেল্টা ইন্টারনেট',
    subtitleEn: 'High capacity 60 Mbps connection at ৳1050/month for streaming & smart devices',
    subtitleBn: 'স্ট্রিমিং ও স্মার্ট ডিভাইসের জন্য ৬০ Mbps হাই-ক্যাপাসিটি কানেকশন মাত্র ১০৫০টাকায়',
    tagEn: 'Family Choice',
    tagBn: 'পারিবারিক সেরা পছন্দ',
  },
  {
    id: 'slide-4',
    src: poster4Img,
    titleEn: 'Zero Lag, Ultra-Speed Unstoppable Gaming',
    titleBn: 'জিরো ল্যাগ, আল্ট্রা-স্পিড আনস্টপেবল গেইমিং - গেইমার্স চয়েস',
    subtitleEn: 'Gamers Choice 80 Mbps package at ৳1260/month with low latency and WiFi 6 speed',
    subtitleBn: 'গেইমার্স চয়েস ৮০ Mbps স্পেশাল প্যাকেজ মাত্র ১২৬০টাকায়, লো ল্যাটেন্সি ও ওয়াইফাই ৬ স্পিড',
    tagEn: 'Gamers Choice',
    tagBn: 'গেইমার্স চয়েস',
  },
];

export const ImageSideshow: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullScreenImg, setFullScreenImg] = useState<SlideImage | null>(null);
  const [progress, setProgress] = useState(0);

  const activeSlide = SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const DURATION = 4500; // 4.5 seconds
    const INTERVAL = 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (INTERVAL / DURATION) * 100;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex, isPlaying]);

  return (
    <div className="mb-12 w-full max-w-5xl mx-auto">
      {/* Container Box */}
      <div
        className="relative bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/80 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden group p-3 sm:p-5"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Animated Progress Timer Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800/80 overflow-hidden z-20">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Main Display Frame */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2/1] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-inner flex items-center justify-center">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                idx === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              <img
                src={slide.src}
                alt={language === 'bn' ? slide.titleBn : slide.titleEn}
                className="w-full h-full object-contain sm:object-cover object-center cursor-pointer"
                onClick={() => setFullScreenImg(slide)}
                referrerPolicy="no-referrer"
              />

              {/* Fullscreen Button */}
              <button
                onClick={() => setFullScreenImg(slide)}
                className="absolute top-3 right-3 z-20 p-2 rounded-xl bg-slate-900/80 text-slate-200 border border-slate-700/80 shadow-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                title="View Full Resolution"
                aria-label="View Full Resolution"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Side Controls (Previous / Next) */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/80 text-white border border-slate-700/80 shadow-xl opacity-80 group-hover:opacity-100 hover:bg-blue-600 transition-all cursor-pointer"
            title="Previous Image"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/80 text-white border border-slate-700/80 shadow-xl opacity-80 group-hover:opacity-100 hover:bg-blue-600 transition-all cursor-pointer"
            title="Next Image"
            aria-label="Next Image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom Thumbnail Strip & Controls */}
        <div className="mt-3 flex items-center justify-between gap-3">
          {/* Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  idx === currentIndex
                    ? 'border-blue-500 ring-2 ring-blue-500/40 scale-105'
                    : 'border-slate-800 opacity-50 hover:opacity-100 hover:border-slate-600'
                }`}
                title={language === 'bn' ? slide.titleBn : slide.titleEn}
              >
                <img
                  src={slide.src}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all cursor-pointer shrink-0"
            title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">{language === 'bn' ? 'পজ' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{language === 'bn' ? 'প্লে' : 'Play'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {fullScreenImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setFullScreenImg(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-3 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-blue-400" />
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {language === 'bn' ? fullScreenImg.titleBn : fullScreenImg.titleEn}
                </h4>
              </div>
              <button
                onClick={() => setFullScreenImg(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 relative rounded-xl overflow-hidden bg-black max-h-[75vh] flex items-center justify-center">
              <img
                src={fullScreenImg.src}
                alt="Full View"
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
