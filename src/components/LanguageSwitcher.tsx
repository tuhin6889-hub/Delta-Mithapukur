import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  showFullLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  showFullLabel = false,
}) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
        language === 'bn'
          ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 hover:bg-amber-500/20'
          : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
      } ${className}`}
      title={language === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
      aria-label="Toggle Language"
    >
      <Globe className="h-3.5 w-3.5 text-blue-400 shrink-0" />
      <span className="font-semibold tracking-wide">
        {language === 'en' ? (
          <>
            <span className="text-blue-400 font-extrabold">EN</span>
            <span className="text-slate-500 mx-0.5">/</span>
            <span className="text-slate-300 hover:text-amber-300">বাংলা</span>
          </>
        ) : (
          <>
            <span className="text-amber-400 font-extrabold">বাংলা</span>
            <span className="text-slate-500 mx-0.5">/</span>
            <span className="text-slate-300 hover:text-blue-400">EN</span>
          </>
        )}
      </span>
      {showFullLabel && (
        <span className="text-[10px] text-slate-400 ml-1">
          ({language === 'en' ? 'English' : 'বাংলা'})
        </span>
      )}
    </button>
  );
};
