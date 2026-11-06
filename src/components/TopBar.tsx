import React from 'react';
import { ActiveTab } from '../types';
import { Bot, RefreshCw, Sun, Moon } from 'lucide-react';

interface TopBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onRunAudit: () => void;
  isAuditing?: boolean;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onRunAudit,
  isAuditing = false,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950 sticky top-0 z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => onSelectTab('dashboard')}
        className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 text-left hover:text-cyan-400 transition-colors"
      >
        <span>MINDWORX COMPLIANCE</span>
      </button>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'dashboard' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onSelectTab('sars')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'sars' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          SARS Hub
        </button>
        <button
          onClick={() => onSelectTab('academic')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'academic' ? 'text-purple-400 font-semibold' : ''
          }`}
        >
          Academic
        </button>
        <button
          onClick={() => onSelectTab('consulting')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'consulting' ? 'text-blue-400 font-semibold' : ''
          }`}
        >
          Consulting
        </button>
        <button
          onClick={() => onSelectTab('automation-centre')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'automation-centre' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          OCR & RPA Automation
        </button>
      </nav>

      {/* Zone 3: 1 primary action button + Theme toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleTheme}
          aria-label="Toggle visual theme"
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={onRunAudit}
          disabled={isAuditing}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Auditing...' : 'Run Full Audit'}</span>
        </button>
      </div>
    </header>
  );
};
