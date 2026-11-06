import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  FolderGit2,
  Bot,
  BarChart3,
  Users,
  ChevronRight,
  Sparkles,
  Layers,
  FileCheck,
  GraduationCap,
  Briefcase,
  Folder,
  ShieldAlert,
  Calendar,
  CheckCircle2,
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
      <div className="p-3.5 space-y-4 overflow-y-auto">
        {/* Section 1: ComplianceOS Core (Process Map Oct 14) */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center justify-between">
            <span>ComplianceOS Engine</span>
            <span className="text-[9px] text-slate-500 font-normal">v2026.10</span>
          </div>

          {/* Overview */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Dashboard Overview</span>
          </button>

          {/* End-to-End Workflow Pipeline */}
          <button
            onClick={() => onSelectTab('workflow')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'workflow'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>End-to-End Workflow</span>
            </div>
            <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800 font-bold">
              AI Core
            </span>
          </button>

          {/* The 9 Gates */}
          <button
            onClick={() => onSelectTab('compliance-gates')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'compliance-gates'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>9 Automated Gates</span>
            </div>
            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
              QAC Map
            </span>
          </button>

          {/* Master Document Register */}
          <button
            onClick={() => onSelectTab('master-register')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'master-register'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Folder className="w-4 h-4 text-cyan-400" />
              <span>Master Document Register</span>
            </div>
            <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-1 py-0.5 rounded border border-slate-800">
              25 Docs
            </span>
          </button>

          {/* Site Visit Audit Packs */}
          <button
            onClick={() => onSelectTab('audit-packs')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'audit-packs'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Site Visit Audit Packs</span>
            </div>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800">
              QCTO/SETA
            </span>
          </button>

          {/* EISA Exam Readiness */}
          <button
            onClick={() => onSelectTab('eisa-readiness')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'eisa-readiness'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>EISA Exam Readiness</span>
            </div>
            <span className="text-[9px] font-mono text-rose-300 bg-rose-950 px-1.5 py-0.5 rounded border border-rose-800 font-bold">
              Gate 07
            </span>
          </button>

          {/* Learnership Cohorts */}
          <button
            onClick={() => onSelectTab('cohorts')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'cohorts'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Learnership Cohorts</span>
            </div>
            <span className="text-[9px] font-mono text-purple-300 bg-purple-950 px-1 py-0.5 rounded border border-purple-800">
              77 Enrolled
            </span>
          </button>

          {/* RACI Matrix */}
          <button
            onClick={() => onSelectTab('raci-matrix')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'raci-matrix'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>RACI Governance</span>
          </button>
        </div>

        {/* Section 2: Automation & Statutory Compliance Hub */}
        <div className="space-y-1 pt-2 border-t border-slate-800/80">
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Statutory & Automation Hub
          </div>

          {/* AI Automation Centre (OCR & RPA) */}
          <button
            onClick={() => onSelectTab('automation-centre')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'automation-centre'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>OCR & RPA Bots</span>
            </div>
            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
              Active
            </span>
          </button>

          {/* SARS Compliance */}
          <div>
            <button
              onClick={() => onSelectTab('sars')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'sars'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SARS Compliance</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950 px-1 py-0.5 rounded border border-emerald-800">
                TCS Good
              </span>
            </button>
          </div>

          {/* Academic Compliance */}
          <button
            onClick={() => onSelectTab('academic')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'academic'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-slate-400" />
            <span>Academic & SITA</span>
          </button>

          {/* Consulting Compliance */}
          <button
            onClick={() => onSelectTab('consulting')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'consulting'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>Consulting & CIPC</span>
          </button>

          {/* Document Management */}
          <button
            onClick={() => onSelectTab('documents')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'documents'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-slate-400" />
            <span>Document Vault</span>
          </button>

          {/* Reports & Analytics */}
          <button
            onClick={() => onSelectTab('reports')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Reports & Analytics</span>
          </button>

          {/* User Management */}
          <button
            onClick={() => onSelectTab('users')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'users'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>User Management</span>
          </button>
        </div>
      </div>

      {/* Footer Profile & Status (Targeted CSS element for Martin Pienaar) */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-700/80 text-cyan-200 font-bold flex items-center justify-center text-xs shrink-0">
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
