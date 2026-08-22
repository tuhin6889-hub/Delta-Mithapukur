import React, { useState } from 'react';
import deltaLogoImg from '../assets/images/regenerated_image_1785198851415.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  lightText = true,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 min-w-8',
    md: 'h-11 min-w-11',
    lg: 'h-14 min-w-14',
    xl: 'h-20 min-w-20',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`} id="official-delta-logo">
      <div className={`relative overflow-hidden rounded-xl bg-white p-1.5 shadow-md ring-1 ring-slate-200/80 transition-transform duration-300 hover:scale-105 ${sizeClasses[size]}`}>
        {!imgError ? (
          <img
            src={deltaLogoImg}
            alt="Delta Logo"
            className="h-full w-full object-contain rounded-lg"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg">
            <svg viewBox="0 0 40 40" className="h-full w-full p-0.5 fill-current" aria-hidden="true">
              <path d="M20 4L36 32H4L20 4Z" className="fill-blue-500 stroke-blue-200" strokeWidth="2" />
              <path d="M20 12L29 27H11L20 12Z" className="fill-white" />
            </svg>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center leading-tight">
            <span className={`font-black tracking-tight ${textSizes[size]} ${lightText ? 'text-white' : 'text-slate-900'}`}>
              Delta Mithapukur Branch
            </span>
          </div>
          <span className={`text-[11px] sm:text-xs font-semibold ${lightText ? 'text-blue-300/90' : 'text-blue-600'} leading-normal`}>
            অপটিক্যাল ফাইবার ব্রডব্যান্ড
          </span>
        </div>
      )}
    </div>
  );
};
