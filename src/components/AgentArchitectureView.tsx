import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  FolderTree,
  Folder,
  FolderOpen,
  FileText,
  Clock,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Layers,
  Calendar,
  ArrowRight,
  ListChecks,
  Milestone,
  Sparkles,
  Play,
  ExternalLink,
} from 'lucide-react';
import {
  AGENT_TRIGGERS,
  EXPIRY_RISK_RULES,
  GOOGLE_WORKSPACE_STACK,
  GOOGLE_DRIVE_TREE,
  BUILD_ROADMAP_PHASES,
  CONFIRMED_DECISIONS,
  SPEC_NEXT_STEPS,
} from '../data/complianceOsData';
import { ActiveTab, SpecNextStep } from '../types';

interface AgentArchitectureViewProps {
  onNavigateToTab: (tab: ActiveTab) => void;
}

export const AgentArchitectureView: React.FC<AgentArchitectureViewProps> = ({
  onNavigateToTab,
}) => {
  const [selectedTriggerId, setSelectedTriggerId] = useState<string>(AGENT_TRIGGERS[0].id);
  const [expandedFolderIds, setExpandedFolderIds] = useState<Record<string, boolean>>({
    'drv-company': true,
    'drv-staff': true,
    'drv-learners': true,
    'drv-site-visits': true,
  });
  const [simulatedRuleId, setSimulatedRuleId] = useState<string | null>(null);
  const [nextSteps, setNextSteps] = useState<SpecNextStep[]>(SPEC_NEXT_STEPS);

  const activeTrigger =
    AGENT_TRIGGERS.find((t) => t.id === selectedTriggerId) || AGENT_TRIGGERS[0];

  const toggleFolder = (id: string) => {
    setExpandedFolderIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleNextStep = (id: string) => {
    setNextSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step))
    );
  };

  const completedStepsCount = nextSteps.filter((s) => s.completed).length;

  return (
    <div className="space-y-6">
      {/* Executive Specification Header */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              ComplianceOS Architecture · Phyllis Muthombeni Map (14 Oct 2026)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span>Agent Architecture, Google Workspace Stack & Build Roadmap</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Specification blueprint defining the 4 operational triggers, 3 continuous agent jobs, 4-section evaluator report format, 9-layer Google Workspace + Lucid stack, fixed Shared Drive tree, and 4-phase rollout plan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
          <div className="text-center px-2.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Triggers</div>
            <div className="text-xl font-bold text-cyan-400 font-mono tabular-nums">4</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center px-2.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Core Jobs</div>
            <div className="text-xl font-bold text-purple-400 font-mono tabular-nums">3</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center px-2.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Sign-Off</div>
            <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
              {completedStepsCount}/{nextSteps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Prototype Identity & Positioning Matrix */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              SYSTEM IDENTITY · MINDWORX AI-POWERED COMPLIANCE &amp; QUALITY ASSURANCE MANAGEMENT SYSTEM
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              ComplianceOS — Intelligent compliance. Automated assurance. Audit-ready operations.
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 shrink-0">
            AI &amp; Business Process Automation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          {[
            { label: 'Business Domain', value: 'Education, Training & Compliance' },
            { label: 'Primary Users', value: 'Compliance Officers, QAC Leads, Training Managers' },
            { label: 'AI Technology', value: 'Google Gemini / Vertex AI + OCR' },
            { label: 'Automation & Data', value: 'Google Apps Script, Drive & Sheets' },
            { label: 'Core Capability', value: 'Automated compliance gate management' },
          ].map((item) => (
            <div key={item.label} className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500 uppercase">{item.label}</div>
              <div className="text-[11px] font-semibold text-slate-200 mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1: 4 Inputs (Triggers) -> 3 Jobs -> 4 Outputs */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              AGENT ARCHITECTURE · 4 INPUTS, 3 JOBS, 4 OUTPUTS
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              Interactive Trigger → Job → Standard Evaluator Report Flow
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab('workflow')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-800 rounded-md transition-colors shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Open Live AI Pipeline</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* 4 Triggers (Inputs) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
              4 Event Triggers (Click to Inspect)
            </div>
            {AGENT_TRIGGERS.map((trg) => {
              const isSelected = trg.id === activeTrigger.id;
              return (
                <button
                  key={trg.id}
                  onClick={() => setSelectedTriggerId(trg.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Zap
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-cyan-400' : 'text-slate-500'
                        }`}
                      />
                      {trg.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {trg.sourceEvent}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Middle: Active Trigger Execution & 3 Jobs */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="p-4 rounded-lg bg-slate-950 border border-cyan-500/30 space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  ACTIVE TRIGGER DISPATCH
                </span>
                <div className="flex items-center gap-1">
                  {activeTrigger.affectedGates.map((g) => (
                    <span
                      key={g}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800"
                    >
                      G0{g}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-sm font-bold text-white">{activeTrigger.agentJob}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{activeTrigger.sampleAction}</p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-amber-300">
                Primary Output Section: {activeTrigger.outputReportSection}
              </div>
            </div>

            {/* 3 Core Agent Jobs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-purple-400 font-bold">JOB 01</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">
                  Check Docs on Arrival
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Legibility, stamps, dates & signatures via OCR.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-purple-400 font-bold">JOB 02</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">
                  Track Expiry Dates
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Proactive alerts before any lapse triggers a block.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-purple-400 font-bold">JOB 03</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">
                  Compile & Submit
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Build packs pre-visit; submit after Tandeeka approves.
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Standard Report Outputs */}
          <div className="lg:col-span-3 p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono uppercase text-emerald-400 font-semibold">
                4 Standard Report Outputs
              </div>
              {[
                { num: '01', name: 'Executive Summary', desc: 'Overall gate status & evaluator readiness score' },
                { num: '02', name: 'Gap Analysis Matrix', desc: 'Artifact-by-artifact PASS vs NON-COMPLIANT check' },
                { num: '03', name: 'Specific NCRs', desc: 'Root cause & formal Non-Conformance Reports' },
                { num: '04', name: 'Corrective Action Plan', desc: 'Named responsible role, due date & escalation' },
              ].map((out) => (
                <div
                  key={out.num}
                  className="p-2.5 rounded bg-slate-900/90 border border-slate-800/80 space-y-0.5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
                    <span className="font-mono text-[10px] text-emerald-400">{out.num}</span>
                    <span>{out.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{out.desc}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateToTab('audit-packs')}
              className="w-full py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect 4-Section Audit Packs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Proposed Platform (Google Workspace + Lucid) & Suggested Drive Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 9-Layer Google Workspace Table */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              PROPOSED PLATFORM · 9 ARCHITECTURE LAYERS
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              Google Workspace + Lucid Specification Stack
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Runs inside Mindworx’s Google Workspace so documents never leave Shared Drive and staff operate in familiar tools.
            </p>
          </div>

          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Layer</th>
                  <th className="py-2.5 px-3">Tool</th>
                  <th className="py-2.5 px-3">What It Does</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {GOOGLE_WORKSPACE_STACK.map((row) => (
                  <tr key={row.layer} className="hover:bg-slate-900/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-200 whitespace-nowrap">
                      {row.layer}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-cyan-300 whitespace-nowrap">
                      {row.tool}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
            <strong className="text-amber-300">Portal Submission & Engine Note:</strong> MICT SETA and QCTO portals may not expose a public API, so submissions use a human-in-the-loop or Playwright browser agent with Compliance Officer approval. Claude connected to Google Drive, Calendar, and Gmail is supported as an alternative engine alongside Gemini via Apps Script.
          </div>
        </div>

        {/* Fixed Google Shared Drive Folder Explorer */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                DOCUMENT STORE TOPOLOGY
              </div>
              <h2 className="text-base font-bold text-white mt-0.5 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-cyan-400" />
                <span>Suggested Google Drive Structure</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigateToTab('master-register')}
              className="text-[11px] font-mono text-cyan-400 hover:underline"
            >
              View 25 Docs →
            </button>
          </div>

          <div className="space-y-2.5">
            {GOOGLE_DRIVE_TREE.map((node) => {
              const isOpen = !!expandedFolderIds[node.id];
              return (
                <div
                  key={node.id}
                  className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFolder(node.id)}
                    className="w-full p-3 flex items-start justify-between gap-2 text-left hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      {isOpen ? (
                        <FolderOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      ) : (
                        <Folder className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-xs font-mono font-bold text-cyan-300">{node.path}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{node.description}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 shrink-0 justify-end max-w-[90px]">
                      {node.requiredGates.map((g) => (
                        <span
                          key={g}
                          className="text-[9px] font-mono px-1 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          G0{g}
                        </span>
                      ))}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-800/70 space-y-1.5 bg-slate-950/60">
                      {node.contents.map((fileItem, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-[11px] text-slate-300 pl-6"
                        >
                          <FileText className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{fileItem}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 3: Complete 7-Row Expiry & Risk Tracking Rules Matrix */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider font-semibold">
              EXPIRY & RISK TRACKING RULES (7 STATUTORY CADENCES)
            </div>
            <h2 className="text-base font-bold text-white mt-0.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Automated Alert Windows & Hard Expiry Enforcements</span>
            </h2>
          </div>

          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-rose-950/60 text-rose-300 border border-rose-800/80">
            Rule: Blurry / unsigned / expired = unverified, never assumed compliant
          </span>
        </div>

        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Tracked Compliance Item</th>
                <th className="py-2.5 px-3">First Alert</th>
                <th className="py-2.5 px-3">Escalation Cadence</th>
                <th className="py-2.5 px-3">System Action on Expiry</th>
                <th className="py-2.5 px-3">Gates</th>
                <th className="py-2.5 px-3 text-right">Simulate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {EXPIRY_RISK_RULES.map((rule) => {
                const isSimulating = simulatedRuleId === rule.id;
                return (
                  <React.Fragment key={rule.id}>
                    <tr className="hover:bg-slate-900/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-100">{rule.item}</td>
                      <td className="py-2.5 px-3 font-mono text-cyan-300">{rule.firstAlert}</td>
                      <td className="py-2.5 px-3 font-mono text-amber-300">{rule.escalation}</td>
                      <td className="py-2.5 px-3 text-rose-300 font-medium">{rule.onExpiry}</td>
                      <td className="py-2.5 px-3 font-mono">
                        <div className="flex flex-wrap gap-1">
                          {rule.affectedGates.map((g) => (
                            <span
                              key={g}
                              className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px]"
                            >
                              G0{g}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => setSimulatedRuleId(isSimulating ? null : rule.id)}
                          className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          {isSimulating ? 'Hide Trace' : 'Test Breach'}
                        </button>
                      </td>
                    </tr>
                    {isSimulating && (
                      <tr className="bg-rose-950/20">
                        <td colSpan={6} className="px-4 py-3 text-xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-rose-200">
                              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                              <span>
                                <strong>Lapse Simulation ({rule.severityOnLapse}):</strong>{' '}
                                Google Apps Script flags <em>{rule.item}</em> in Master Register
                                Sheet → dispatches Gmail escalation ({rule.escalation}) → enforces:{' '}
                                <span className="underline">{rule.onExpiry}</span>.
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-rose-300 shrink-0">
                              Portal Submit Locked
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: 4-Phase Build Roadmap + Confirmed Decisions + Interactive Next Steps */}
      <div className="space-y-6">
        {/* Build Roadmap */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                IMPLEMENTATION SEQUENCE
              </div>
              <h2 className="text-base font-bold text-white mt-0.5 flex items-center gap-2">
                <Milestone className="w-4 h-4 text-cyan-400" />
                <span>4-Phase ComplianceOS Build Roadmap</span>
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Priority: Onboarding & Expiry Dates First
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BUILD_ROADMAP_PHASES.map((p) => {
              const badge =
                p.status === 'IN_PROGRESS'
                  ? 'text-emerald-300 bg-emerald-950 border-emerald-800'
                  : p.status === 'NEXT'
                  ? 'text-cyan-300 bg-cyan-950 border-cyan-800'
                  : 'text-slate-400 bg-slate-900 border-slate-800';
              return (
                <div
                  key={p.phase}
                  className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-cyan-400">
                        PHASE 0{p.phase}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${badge}`}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">{p.title.replace(/^Phase \d+ · /, '')}</div>
                    <div className="text-[11px] text-slate-400">{p.focus}</div>
                  </div>
                  <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                    {p.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-mono mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decisions Confirmed + Next Steps Sign-Off */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Decisions Confirmed */}
          <div className="lg:col-span-6 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                GOVERNANCE BASELINE
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">Decisions Confirmed</h2>
            </div>
            <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Question</th>
                    <th className="py-2.5 px-3">Confirmed Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {CONFIRMED_DECISIONS.map((item) => (
                    <tr key={item.question} className="hover:bg-slate-900/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-200 align-top whitespace-nowrap">
                        {item.question}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">{item.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Next Steps Checklist */}
          <div className="lg:col-span-6 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  DEPLOYMENT CHECKLIST
                </div>
                <h2 className="text-base font-bold text-white mt-0.5 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-amber-400" />
                  <span>Next Steps & Sign-Off Tracker</span>
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800 tabular-nums">
                {completedStepsCount} / {nextSteps.length} Complete
              </span>
            </div>

            <div className="space-y-2">
              {nextSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => toggleNextStep(step.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                    step.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={step.completed}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                  />
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                      {step.owner}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        step.completed ? 'text-slate-300 line-through' : 'text-slate-100'
                      }`}
                    >
                      {step.task}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
