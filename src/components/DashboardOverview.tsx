import React from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Bot,
  Scan,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileCheck,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { ActiveTab, ComplianceDocument, SarsSubTab } from '../types';

interface DashboardOverviewProps {
  documents: ComplianceDocument[];
  onNavigateToTab: (tab: ActiveTab) => void;
  onNavigateToSarsSubTab: (subTab: SarsSubTab) => void;
  onTriggerRpa: (action: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  documents,
  onNavigateToTab,
  onNavigateToSarsSubTab,
  onTriggerRpa,
}) => {
  const total = documents.length;
  const compliant = documents.filter((d) => d.status === 'COMPLIANT').length;
  const warnings = documents.filter((d) => d.status === 'WARNING').length;

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Key Health Indicator */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Mindworx Enterprise Compliance Management
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Compliance Operations & Automation Dashboard
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Continuous regulatory compliance monitoring across SARS tax directives, MICT SETA & SITA academic accreditation, and enterprise consulting governance.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Overall Audit Score
            </div>
            <div className="text-3xl font-bold text-emerald-400 font-mono mt-0.5 tabular-nums">
              97.4%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Grade A · Tender Qualified
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-mono font-bold text-xs text-emerald-300">
            97%
          </div>
        </div>
      </div>

      {/* 3 Core Compliance Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: SARS Compliance */}
        <div
          onClick={() => onNavigateToTab('sars')}
          className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                100% Compliant
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors mt-3">
              SARS Compliance
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Good Standing active · TCS PIN 98234821A8 valid until 01/10/2027 · VAT 103 current.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400">
            <span>Open SARS Verification Hub</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Pillar 2: Academic Compliance */}
        <div
          onClick={() => onNavigateToTab('academic')}
          className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                96.2% Standing
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors mt-3">
              Academic Compliance
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              52 Learner Agreements signed · SITA RFB 1183 Tier-1 accreditation active until 2028.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-purple-400">
            <span>Manage Academic Records</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Pillar 3: Consulting Compliance */}
        <div
          onClick={() => onNavigateToTab('consulting')}
          className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                98.1% Standing
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-300 transition-colors mt-3">
              Consulting Compliance
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              CIPC In Business · B-BBEE Level 1 (135% Recognition) · COIDA renewal queued (27d).
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-400">
            <span>Inspect Consulting Governance</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Robotic Automation Shortcuts */}
      <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-200">
              Robotic Automation & OCR Quick Actions
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab('automation-centre')}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
          >
            Open Dedicated Automation Centre →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigateToTab('automation-centre')}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500 transition-all text-left group"
          >
            <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
              <span>OCR Scanner</span>
              <Scan className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Extract text & metadata from scanned PDFs
            </div>
          </button>

          <button
            onClick={() => onNavigateToSarsSubTab('tcs-pin-verification')}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-emerald-500 transition-all text-left group"
          >
            <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 flex items-center justify-between">
              <span>SARS TCS PIN Verify</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Live eFiling gateway verification bot
            </div>
          </button>

          <button
            onClick={() => onTriggerRpa('expiry_scan')}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-amber-500 transition-all text-left group"
          >
            <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 flex items-center justify-between">
              <span>Expiry Scan</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Check all records for upcoming 30d renewals
            </div>
          </button>

          <button
            onClick={() => onTriggerRpa('generate_report')}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-purple-500 transition-all text-left group"
          >
            <div className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 flex items-center justify-between">
              <span>Generate Audit Pack</span>
              <FileCheck className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Compile full South African regulatory dossier
            </div>
          </button>
        </div>
      </div>

      {/* Action Items & Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Urgent Action Items */}
        <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Compliance Attention Required (2 Items)</span>
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-200">
                  COIDA Letter of Good Standing Renewal
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Compensation Fund certificate expires on 30/11/2026 (27 days left).
                </div>
              </div>
              <button
                onClick={() => onTriggerRpa('send_alerts')}
                className="px-2.5 py-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 rounded hover:bg-cyan-900/60 shrink-0"
              >
                Send Reminder
              </button>
            </div>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-200">
                  Learner ID Police Certification
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  2 candidates require renewed 3-month police certification stamp before MICT audit.
                </div>
              </div>
              <button
                onClick={() => onNavigateToTab('academic')}
                className="px-2.5 py-1 text-[11px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800 rounded hover:bg-purple-900/60 shrink-0"
              >
                Review Cohort
              </button>
            </div>
          </div>
        </div>

        {/* Recent Automated Audit Trail */}
        <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recent Robotic Verifications</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">Live Feed</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-300">Playwright: SARS TCS PIN Verified</span>
              <span className="text-emerald-400 text-[11px]">Today 09:14</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-300">Tesseract OCR: 6 PDFs Extracted</span>
              <span className="text-slate-400 text-[11px]">Today 08:30</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-300">Playwright: CIPC BizPortal Ping OK</span>
              <span className="text-emerald-400 text-[11px]">Yesterday 16:45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
