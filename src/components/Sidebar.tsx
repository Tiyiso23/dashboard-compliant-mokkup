import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  FolderGit2,
  Bot,
  BarChart3,
  Users,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Scan,
} from 'lucide-react';
import { ActiveTab, SarsSubTab, AcademicSubTab, ConsultingSubTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  sarsSubTab: SarsSubTab;
  onSelectSarsSubTab: (subTab: SarsSubTab) => void;
  academicSubTab: AcademicSubTab;
  onSelectAcademicSubTab: (subTab: AcademicSubTab) => void;
  consultingSubTab: ConsultingSubTab;
  onSelectConsultingSubTab: (subTab: ConsultingSubTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  sarsSubTab,
  onSelectSarsSubTab,
  academicSubTab,
  onSelectAcademicSubTab,
  consultingSubTab,
  onSelectConsultingSubTab,
}) => {
  return (
    <aside className="w-64 shrink-0 bg-slate-950 border-r border-slate-800 flex flex-col justify-between select-none">
      <div className="p-4 space-y-4 overflow-y-auto">
        {/* Navigation Section */}
        <div className="space-y-1">
          {/* Dashboard */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Dashboard Overview</span>
          </button>

          {/* AI Automation Centre (Dedicated OCR & RPA) */}
          <button
            onClick={() => onSelectTab('automation-centre')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'automation-centre'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>AI Automation Centre</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
              OCR & RPA
            </span>
          </button>

          {/* SARS Compliance (NEW) */}
          <div className="pt-2">
            <button
              onClick={() => onSelectTab('sars')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'sars'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SARS Compliance</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                NEW
              </span>
            </button>

            {/* SARS Sub-tree */}
            {activeTab === 'sars' && (
              <div className="pl-9 pr-2 py-1 space-y-1 mt-1 border-l border-emerald-500/30 ml-4">
                {[
                  { id: 'tax-compliance-status', label: 'Tax Compliance Status' },
                  { id: 'tcs-pin-verification', label: 'TCS PIN Verification' },
                  { id: 'vat-registration', label: 'VAT Registration' },
                  { id: 'paye-registration', label: 'PAYE Registration' },
                  { id: 'tax-documentation', label: 'Tax Documentation' },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelectSarsSubTab(sub.id as SarsSubTab)}
                    className={`w-full text-left py-1 px-2 rounded text-[11px] transition-colors truncate block ${
                      sarsSubTab === sub.id
                        ? 'text-emerald-300 font-medium bg-emerald-500/10'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Academic Compliance */}
          <div className="pt-2">
            <button
              onClick={() => onSelectTab('academic')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'academic'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Academic Compliance</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${
                  activeTab === 'academic' ? 'rotate-90 text-purple-400' : 'text-slate-600'
                }`}
              />
            </button>

            {/* Academic Sub-tree */}
            {activeTab === 'academic' && (
              <div className="pl-9 pr-2 py-1 space-y-1 mt-1 border-l border-purple-500/30 ml-4">
                {[
                  { id: 'learner-agreements', label: 'Learner Agreements' },
                  { id: 'sita-registration', label: 'SITA Registration' },
                  { id: 'learner-records', label: 'Learner Records' },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelectAcademicSubTab(sub.id as AcademicSubTab)}
                    className={`w-full text-left py-1 px-2 rounded text-[11px] transition-colors truncate block ${
                      academicSubTab === sub.id
                        ? 'text-purple-300 font-medium bg-purple-500/10'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Consulting Compliance */}
          <div className="pt-2">
            <button
              onClick={() => onSelectTab('consulting')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'consulting'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Consulting Compliance</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${
                  activeTab === 'consulting' ? 'rotate-90 text-blue-400' : 'text-slate-600'
                }`}
              />
            </button>

            {/* Consulting Sub-tree */}
            {activeTab === 'consulting' && (
              <div className="pl-9 pr-2 py-1 space-y-1 mt-1 border-l border-blue-500/30 ml-4">
                {[
                  { id: 'company-compliance', label: 'Company Compliance' },
                  { id: 'employee-compliance', label: 'Employee Compliance' },
                  { id: 'client-compliance', label: 'Client Compliance' },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelectConsultingSubTab(sub.id as ConsultingSubTab)}
                    className={`w-full text-left py-1 px-2 rounded text-[11px] transition-colors truncate block ${
                      consultingSubTab === sub.id
                        ? 'text-blue-300 font-medium bg-blue-500/10'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Document Management */}
          <button
            onClick={() => onSelectTab('documents')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'documents'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-slate-400" />
            <span>Document Management</span>
          </button>

          {/* Reports & Analytics */}
          <button
            onClick={() => onSelectTab('reports')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Reports & Analytics</span>
          </button>

          {/* User Management */}
          <button
            onClick={() => onSelectTab('users')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'users'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>User Management</span>
          </button>
        </div>
      </div>

      {/* Footer Profile & Status */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-700/80 text-cyan-200 font-bold flex items-center justify-center text-xs">
            MP
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-slate-200 truncate">
              Martin Pienaar
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              Managing Director · Mindworx
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
