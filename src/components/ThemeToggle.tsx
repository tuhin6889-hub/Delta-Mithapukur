import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        theme === 'dark'
          ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700 hover:text-amber-200'
          : 'bg-slate-200 text-slate-800 border-slate-300 hover:bg-slate-300 hover:text-slate-900'
      } ${className}`}
    >
      <div className="relative h-4 w-4 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
        ) : (
          <Moon className="h-4 w-4 text-blue-600 animate-in fade-in zoom-in duration-200" />
        )}
      </div>

      {showLabel && (
        <span className="font-bold text-xs select-none">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
