import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Layers,
  Folder,
  Clock,
  Lock,
  Unlock,
  GraduationCap,
  FileCheck,
  Sparkles,
  UserCheck,
  ArrowRight,
  Cpu,
  ClipboardList,
} from 'lucide-react';
import {
  ComplianceDocument,
  ActiveTab,
  SarsSubTab,
  GateDefinition,
  MasterRegisterItem,
} from '../types';
import {
  COMPLIANCE_GATES,
  MASTER_DOCUMENT_REGISTER,
  COHORTS_LIST,
  NON_CONFORMANCE_REPORTS,
  EXPIRY_RISK_RULES,
} from '../data/complianceOsData';

interface DashboardOverviewProps {
  documents: ComplianceDocument[];
  gates?: GateDefinition[];
  masterRegister?: MasterRegisterItem[];
  onNavigateToTab: (tab: ActiveTab) => void;
  onNavigateToSarsSubTab?: (subTab: SarsSubTab) => void;
  onTriggerRpa?: (action: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  gates: propGates,
  masterRegister: propRegister,
  onNavigateToTab,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<
    'All' | 'QCTO' | 'MICT SETA' | 'Document QA' | 'B-BBEE'
  >('All');

  const gates = propGates || COMPLIANCE_GATES;
  const registerItems = propRegister || MASTER_DOCUMENT_REGISTER;

  // Standard Compliance Outcomes (PASSED, ACTION REQUIRED, CRITICAL NON-COMPLIANCE)
  const passedGates = gates.filter((g) => g.status === 'PASSED').length;
  const actionGates = gates.filter((g) => g.status === 'ACTION REQUIRED').length;
  const criticalGates = gates.filter((g) => g.status === 'CRITICAL NON-COMPLIANCE').length;

  const passedDocs = registerItems.filter((i) => i.status === 'PASSED').length;
  const actionDocs = registerItems.filter((i) => i.status === 'ACTION REQUIRED').length;
  const criticalDocs = registerItems.filter((i) => i.status === 'CRITICAL NON-COMPLIANCE').length;

  const avgGateReadiness = (
    gates.reduce((acc, g) => acc + g.readinessScore, 0) / gates.length
  ).toFixed(1);

  const totalLearners = COHORTS_LIST.reduce((acc, c) => acc + c.totalLearners, 0);

  const filteredGates = gates.filter(
    (g) => selectedPillar === 'All' || g.pillar === selectedPillar
  );

  // Highlighted register items requiring attention (Critical first, then Action Required, then expiring <= 30d)
  const attentionDocuments = registerItems.filter(
    (item) =>
      item.status !== 'PASSED' ||
      (item.daysRemaining !== undefined && item.daysRemaining <= 30)
  );

  // Submission gate status summary for Compliance Officer (Tandeeka)
  const submissionQueues = [
    {
      label: 'Gate 04 · QCTO Monitoring Visit File',
      entity: 'QCTO',
      gate: gates.find((g) => g.id === 4),
      targetTab: 'audit-packs' as ActiveTab,
    },
    {
      label: 'Gate 05 · MICT SETA Verification File',
      entity: 'MICT SETA',
      gate: gates.find((g) => g.id === 5),
      targetTab: 'audit-packs' as ActiveTab,
    },
    {
      label: 'Gate 06 · Post-Course Review Pack',
      entity: 'QAC / EISA Clearance',
      gate: gates.find((g) => g.id === 6),
      targetTab: 'audit-packs' as ActiveTab,
    },
    {
      label: 'Gate 07 · EISA Exam Readiness Clearance',
      entity: 'QCTO / AQP',
      gate: gates.find((g) => g.id === 7),
      targetTab: 'eisa-readiness' as ActiveTab,
    },
    {
      label: 'Gate 08 · New Qualification Accreditation',
      entity: 'MICT SETA / QCTO',
      gate: gates.find((g) => g.id === 8),
      targetTab: 'audit-packs' as ActiveTab,
    },
    {
      label: 'Gate 09 · B-BBEE Evidence Reconciliation',
      entity: 'WSP/ATR & Client Portal',
      gate: gates.find((g) => g.id === 9),
      targetTab: 'audit-packs' as ActiveTab,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. ComplianceOS Executive Identity & Positioning Header */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              ComplianceOS · AI &amp; Business Process Automation
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              · Mindworx Academy QAC Map (Phyllis Muthombeni, 14 Oct 2026)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            ComplianceOS — Mindworx AI-Powered Compliance &amp; Quality Assurance Management System
          </h1>
          <div className="text-xs font-mono text-emerald-300">
            Intelligent compliance. Automated assurance. Audit-ready operations.
          </div>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Enforces compliance workflows across nine operational gates—combining AI &amp; OCR document intelligence, rules-based validation, automated expiry monitoring, audit-file compilation, and authorised human approval so incomplete or invalid evidence never reaches MICT SETA, QCTO, or EISA evaluators.
          </p>
        </div>

        {/* Readiness KPI Box */}
        <div className="flex flex-col gap-3 shrink-0 bg-slate-950/80 p-4 rounded-lg border border-slate-800 min-w-[270px]">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Overall Gate Readiness
              </div>
              <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">
                {avgGateReadiness}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Active Cohorts
              </div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">
                {totalLearners} Learners
              </div>
              <div className="text-[10px] text-slate-500 font-mono">4 Programmes</div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Engine: Gemini AI + Apps Script</span>
            <span className="text-emerald-400">{registerItems.length} Docs Tracked</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onNavigateToTab('workflow')}
              className="flex-1 py-1.5 px-2.5 text-[11px] font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Intake Flow</span>
            </button>
            <button
              onClick={() => onNavigateToTab('architecture')}
              className="py-1.5 px-2.5 text-[11px] font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors"
            >
              Google Stack
            </button>
          </div>
        </div>
      </div>

      {/* 2. Standard Compliance Outcomes (PASSED / ACTION REQUIRED / CRITICAL NON-COMPLIANCE) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Standard Compliance Outcomes (Zero Unverified Assumptions Policy)
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Blurry, unsigned, or expired documents are flagged as unverified—never assumed compliant
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PASSED */}
          <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span>PASSED</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono tabular-nums">
                {passedGates} / {gates.length} Gates
              </div>
              <div className="text-xs text-slate-400">
                <strong className="text-emerald-300 tabular-nums">{passedDocs}</strong> Master Register artifacts verified &amp; current
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* ACTION REQUIRED */}
          <div className="p-4 rounded-lg bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                <span>ACTION REQUIRED</span>
              </div>
              <div className="text-2xl font-bold text-amber-300 font-mono tabular-nums">
                {actionGates} Gates
              </div>
              <div className="text-xs text-slate-400">
                <strong className="text-amber-300 tabular-nums">{actionDocs}</strong> register items in alert window or missing signatures
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          {/* CRITICAL NON-COMPLIANCE */}
          <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e] animate-pulse" />
                <span>CRITICAL NON-COMPLIANCE</span>
              </div>
              <div className="text-2xl font-bold text-rose-400 font-mono tabular-nums">
                {criticalGates} Gate Blocked
              </div>
              <div className="text-xs text-slate-400">
                <strong className="text-rose-300 tabular-nums">{criticalDocs}</strong> lapsed item (&gt;3m certified ID / EISA invigilators)
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 4 Pillars & 9 Automated Compliance Gates */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-white">
                Four Compliance Pillars &amp; Nine Operational Gates
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Nothing is submitted to MICT SETA or QCTO, and no EISA exam goes ahead, until the matching gate clears 100%.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 flex-wrap">
            {(['All', 'QCTO', 'MICT SETA', 'Document QA', 'B-BBEE'] as const).map((pillar) => (
              <button
                key={pillar}
                onClick={() => setSelectedPillar(pillar)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                  selectedPillar === pillar
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pillar}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredGates.map((gate) => {
            const isPassed = gate.status === 'PASSED';
            const isCritical = gate.status === 'CRITICAL NON-COMPLIANCE';

            const borderClass = isPassed
              ? 'border-emerald-500/30 bg-slate-950/90'
              : isCritical
              ? 'border-rose-500/50 bg-rose-950/15'
              : 'border-amber-500/40 bg-amber-950/15';

            const badgeClass = isPassed
              ? 'text-emerald-300 bg-emerald-950 border-emerald-800'
              : isCritical
              ? 'text-rose-300 bg-rose-950 border-rose-800'
              : 'text-amber-300 bg-amber-950 border-amber-800';

            const barColor = isPassed
              ? 'bg-emerald-400'
              : isCritical
              ? 'bg-rose-400'
              : 'bg-amber-400';

            return (
              <div
                key={gate.id}
                className={`p-4 rounded-lg border flex flex-col justify-between gap-3 transition-all hover:border-slate-600 ${borderClass}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                        G0{gate.id}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-400">
                        {gate.pillar}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${badgeClass}`}
                    >
                      {gate.status}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-slate-100">{gate.name}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {gate.validationRule}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/70">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">
                      {gate.itemsVerified}/{gate.itemsTotal} Verified
                    </span>
                    <span className="text-slate-200 font-bold tabular-nums">
                      {gate.readinessScore}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${gate.readinessScore}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="text-slate-500 truncate max-w-[170px]">
                      Owner: {gate.leadOwner}
                    </span>
                    <button
                      onClick={() =>
                        onNavigateToTab(gate.id === 7 ? 'eisa-readiness' : 'compliance-gates')
                      }
                      className="text-cyan-400 hover:text-cyan-300 font-mono font-semibold"
                    >
                      {gate.id === 7 ? 'Score EISA →' : 'Inspect Gate →'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Master Document Register Alerts & 7 Expiry Escalation Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Register Exceptions & 3-Month ID Rule */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Master Document Register · Active Flagged Records
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Documents stored in Google Shared Drive and audited automatically by Gemini via Apps Script.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('master-register')}
              className="text-xs font-mono text-cyan-400 hover:underline shrink-0"
            >
              View All {registerItems.length} Docs →
            </button>
          </div>

          <div className="space-y-2.5">
            {attentionDocuments.map((doc) => {
              const isCritical = doc.status === 'CRITICAL NON-COMPLIANCE';
              const isAction = doc.status === 'ACTION REQUIRED';
              return (
                <div
                  key={doc.id}
                  className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                    isCritical
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : isAction
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-100">{doc.documentName}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                        isCritical
                          ? 'text-rose-300 bg-rose-950 border-rose-800'
                          : isAction
                          ? 'text-amber-300 bg-amber-950 border-amber-800'
                          : 'text-emerald-300 bg-emerald-950 border-emerald-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">
                    {doc.googleDrivePath}
                  </div>
                  {doc.rejectionReason ? (
                    <div className="text-[11px] text-rose-300">
                      ⚠ {doc.rejectionReason}
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-300">
                      {doc.validityCheck} · {doc.daysRemaining} days remaining
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                    <span>
                      Applies to: {doc.appliesTo} · Gates:{' '}
                      {doc.gatesNeeded.map((g) => `G0${g}`).join(', ')}
                    </span>
                    <span className="text-cyan-400">Owner: {doc.owner}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 7 Automated Expiry & Escalation Windows */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  7 Expiry &amp; Risk Escalation Windows
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Any lapsed date is treated as CRITICAL NON-COMPLIANCE.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('architecture')}
              className="text-xs font-mono text-cyan-400 hover:underline shrink-0"
            >
              Simulate →
            </button>
          </div>

          <div className="divide-y divide-slate-800/70 border border-slate-800 rounded-lg bg-slate-950 overflow-hidden text-[11px]">
            {EXPIRY_RISK_RULES.map((rule) => (
              <div key={rule.id} className="p-2.5 space-y-0.5 hover:bg-slate-900/50">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-200">{rule.item}</span>
                  <span className="font-mono text-[10px] text-cyan-300 shrink-0">
                    {rule.firstAlert}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 text-[10px]">
                  <span className="text-amber-300 font-mono">Esc: {rule.escalation}</span>
                  <span className="text-rose-300 truncate">{rule.onExpiry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Corrective Action Plans (NCRs) & Authorised Human Approval Gate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Non-Conformance Reports & Corrective Action Plan */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">
                  Corrective Action Plan (Active Non-Conformance Reports)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Standard 4-part agent output naming who acts and by when.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('audit-packs')}
              className="text-xs font-mono text-cyan-400 hover:underline shrink-0"
            >
              Open Audit Packs →
            </button>
          </div>

          <div className="space-y-2.5">
            {NON_CONFORMANCE_REPORTS.map((ncr) => (
              <div
                key={ncr.id}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono font-bold text-rose-400 shrink-0">{ncr.id}</span>
                    <span className="font-bold text-slate-100 truncate">{ncr.title}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                      ncr.severity === 'CRITICAL NON-COMPLIANCE'
                        ? 'text-rose-300 bg-rose-950 border-rose-800'
                        : 'text-amber-300 bg-amber-950 border-amber-800'
                    }`}
                  >
                    {ncr.severity}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">{ncr.correctiveAction}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/70">
                  <span>
                    Assignee: <strong className="text-cyan-300">{ncr.assignee}</strong> · Due:{' '}
                    <strong className="text-amber-300">{ncr.dueDate}</strong>
                  </span>
                  <span>Escalated to: {ncr.escalatedTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authorised Human Approval & Portal Submission Locks */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Authorised Human Approval &amp; Submission Locks
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Agent prepares files; Compliance Officer (Tandeeka) approves portal submissions.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('raci-matrix')}
              className="text-xs font-mono text-cyan-400 hover:underline shrink-0"
            >
              RACI Matrix →
            </button>
          </div>

          <div className="p-3 rounded-lg bg-cyan-950/25 border border-cyan-500/30 text-[11px] text-slate-300">
            <strong className="text-cyan-300">17 Sep 1:1 Governance:</strong> Tender &amp; Procurement Administrator owns compliance document management day to day; ComplianceOS handles checking &amp; compiling.
          </div>

          <div className="space-y-2">
            {submissionQueues.map((q) => {
              const cleared = q.gate?.status === 'PASSED';
              return (
                <button
                  key={q.label}
                  onClick={() => onNavigateToTab(q.targetTab)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-2 text-left transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-200 truncate">{q.label}</div>
                    <div className="text-[10px] font-mono text-slate-500">{q.entity}</div>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                      cleared
                        ? 'text-emerald-300 bg-emerald-950 border-emerald-800'
                        : 'text-rose-300 bg-rose-950 border-rose-800'
                    }`}
                  >
                    {cleared ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    <span>{cleared ? 'READY FOR APPROVAL' : 'GATE LOCKED'}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Active Cohorts Snapshot & Google Workspace Architecture Bar */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Mindworx Academy Cohorts &amp; QCTO Monitoring Windows
              </h3>
              <p className="text-xs text-slate-400">
                Tracks learner types (Employed, Unemployed, Bank), 21-day to 2-month QCTO visit windows, and EISA targets.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('cohorts')}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Manage Cohorts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COHORTS_LIST.map((cohort) => (
            <button
              key={cohort.id}
              onClick={() => onNavigateToTab('cohorts')}
              className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left space-y-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400">{cohort.code}</span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {cohort.learnerType}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-100 line-clamp-1">{cohort.name}</div>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">{cohort.totalLearners} Learners</span>
                <span className="text-amber-300">QCTO: {cohort.qctoWindow.daysRemaining}d</span>
                <span
                  className={`font-bold tabular-nums ${
                    cohort.complianceScore >= 95
                      ? 'text-emerald-400'
                      : cohort.complianceScore >= 90
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {cohort.complianceScore}%
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Google Workspace + Lucid Platform Strip */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-white">Google Workspace Architecture:</strong> Lucid Process Maps · Shared Drive · Google Sheets Register · Google Forms · Gemini AI (Apps Script) · Google Calendar · Gmail Alerts · Looker Studio · MICT SETA &amp; QCTO Portals
            </span>
          </div>
          <button
            onClick={() => onNavigateToTab('architecture')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors shrink-0"
          >
            Architecture &amp; 4-Phase Roadmap →
          </button>
        </div>
      </div>
    </div>
  );
};
