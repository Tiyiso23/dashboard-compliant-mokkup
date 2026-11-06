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
  Layers,
  ShieldAlert,
  Award,
  Users,
} from 'lucide-react';
import { ActiveTab, ComplianceDocument, SarsSubTab } from '../types';
import { COMPLIANCE_GATES, NON_CONFORMANCE_REPORTS } from '../data/complianceOsData';

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
  const gates = COMPLIANCE_GATES;
  const passedGates = gates.filter((g) => g.status === 'PASSED').length;
  const actionGates = gates.filter((g) => g.status === 'ACTION REQUIRED').length;
  const criticalGates = gates.filter((g) => g.status === 'CRITICAL NON-COMPLIANCE').length;

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Key Health Indicator */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Mindworx Compliance Agent (ComplianceOS)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">· Process Map 14 Oct 2026</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Automated Gate-Driven Compliance Dashboard
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Eliminates recurring errors before reaching SETA, QCTO, and EISA evaluators. Automated validation checks documents as they arrive, tracks expiries, and compiles complete audit files before each site visit.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Overall Gate Clearance
            </div>
            <div className="text-3xl font-bold text-emerald-400 font-mono mt-0.5 tabular-nums">
              94.8%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
              {passedGates} Passed · {actionGates} Action · {criticalGates} Critical
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-mono font-bold text-xs text-emerald-300">
            95%
          </div>
        </div>
      </div>

      {/* Critical Gate Alert (EISA Venue Invigilators & 3-Mo IDs) */}
      {criticalGates > 0 && (
        <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-rose-300">
                Critical Non-Compliance Invariant: Gate 07 (EISA Exam Readiness) Blocked
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Invigilator staffing ratio is incomplete (min 2 per room required) & 2 learner ID copy certifications exceed 3-month validity limit.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateToTab('eisa-readiness')}
              className="px-3 py-1.5 text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 rounded transition-colors whitespace-nowrap"
            >
              Resolve Gate 07 Deficiency →
            </button>
          </div>
        </div>
      )}

      {/* The 4 Operational Pillars (Specification Section 1) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            The 4 Operational Pillars of the Mindworx Compliance Agent
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Phyllis Muthombeni QAC Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1: QCTO */}
          <div
            onClick={() => onNavigateToTab('compliance-gates')}
            className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  PILLAR 01
                </span>
                <span className="text-[10px] font-mono text-slate-400">Gates 4, 7</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mt-2.5">
                QCTO Registration & EISA
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Learner enrolment, 21-day monitoring visit file compilation, and EISA exam centre readiness scoring.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-cyan-400">
              <span>View QCTO Gates</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: MICT SETA */}
          <div
            onClick={() => onNavigateToTab('compliance-gates')}
            className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  PILLAR 02
                </span>
                <span className="text-[10px] font-mono text-slate-400">Gates 2, 5, 8</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors mt-2.5">
                MICT SETA Verification
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Bulk upload files, Statement of Results (SoRs), site verification files, and SDP accreditation packs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400">
              <span>View SETA Gates</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: Document QA */}
          <div
            onClick={() => onNavigateToTab('master-register')}
            className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                  PILLAR 03
                </span>
                <span className="text-[10px] font-mono text-slate-400">Gates 1, 3, 6</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors mt-2.5">
                Document Quality Assurance
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Assessor/moderator 3-year scope checks, learner agreement sets (Employed, Unemployed, Bank), PoEs, and SLAs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-purple-400">
              <span>Inspect Master Register</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Pillar 4: B-BBEE */}
          <div
            onClick={() => onNavigateToTab('audit-packs')}
            className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  PILLAR 04
                </span>
                <span className="text-[10px] font-mono text-slate-400">Gate 9</span>
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors mt-2.5">
                B-BBEE Skills Evidence
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Reconciles trained seats with WSP/ATR, stipend proof, absorption letters, and feeds client self-service portal.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-amber-400">
              <span>Compile B-BBEE Dossier</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* The 9 Gates Progression Strip */}
      <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-200">
              The 9 Automated Gates Pipeline
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab('compliance-gates')}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
          >
            Open Full 9 Gates Pipeline →
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
          {gates.map((g) => {
            let statusBadge = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
            if (g.status === 'ACTION REQUIRED') statusBadge = 'text-amber-300 border-amber-500/40 bg-amber-950/30';
            if (g.status === 'CRITICAL NON-COMPLIANCE') statusBadge = 'text-rose-300 border-rose-500/70 bg-rose-950/50 animate-pulse';

            return (
              <button
                key={g.id}
                onClick={() => onNavigateToTab('compliance-gates')}
                className={`p-2.5 rounded border text-left flex flex-col justify-between transition-all hover:brightness-125 ${statusBadge}`}
              >
                <div>
                  <div className="text-[10px] font-mono text-slate-400">G0{g.id}</div>
                  <div className="text-xs font-bold truncate mt-0.5">{g.name.replace(' Gate', '')}</div>
                </div>
                <div className="text-[10px] font-mono mt-2 flex items-center justify-between">
                  <span>{g.readinessScore}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Non-Conformance Reports (NCRs) and Corrective Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Open NCRs */}
        <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 font-mono">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Active Non-Conformance Reports ({NON_CONFORMANCE_REPORTS.length} Items)</span>
            </span>
            <button
              onClick={() => onNavigateToTab('audit-packs')}
              className="text-[11px] text-cyan-400 hover:underline font-mono"
            >
              View CAP Matrix
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {NON_CONFORMANCE_REPORTS.slice(0, 3).map((ncr) => (
              <div key={ncr.id} className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{ncr.title}</span>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      ncr.severity === 'CRITICAL NON-COMPLIANCE'
                        ? 'text-rose-400 bg-rose-950 border-rose-800'
                        : 'text-amber-400 bg-amber-950 border-amber-800'
                    }`}
                  >
                    {ncr.severity === 'CRITICAL NON-COMPLIANCE' ? 'CRITICAL' : 'ACTION'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2">{ncr.finding}</div>
                <div className="text-[10px] font-mono text-cyan-400 pt-1 flex items-center justify-between">
                  <span>Assignee: {ncr.assignee}</span>
                  <span>Due: {ncr.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expiry Tracking & Escalations (Prompt Section: Expiry & Risk Rules) */}
        <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Automated Expiry & Escalation Rules</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">Google Calendar</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">Learner Certified IDs (3-Mo Rule)</div>
                <div className="text-[11px] text-slate-400 font-sans">Strict 3-month certification stamp check at upload</div>
              </div>
              <span className="text-rose-400 text-right">Reject & Request</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">Assessor & Moderator Reg (3-Yr Cycle)</div>
                <div className="text-[11px] text-slate-400 font-sans">Alerts at 90d & 30d; blocks PoE sign-off on expiry</div>
              </div>
              <span className="text-emerald-400 text-right">Valid (155d left)</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">Mindworx SLAs, Leases & Insurance</div>
                <div className="text-[11px] text-slate-400 font-sans">Alerts at 60d, 30d, then every 2 days</div>
              </div>
              <span className="text-emerald-400 text-right">All Active</span>
            </div>

            <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">QCTO Monitoring Window (21d - 2mo)</div>
                <div className="text-[11px] text-slate-400 font-sans">Flags gaps 2 weeks before window opens</div>
              </div>
              <span className="text-amber-400 text-right">Opens in 4 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
