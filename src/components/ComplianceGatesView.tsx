import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Search,
  Filter,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';
import { GateDefinition, GateComplianceStatus } from '../types';

interface ComplianceGatesViewProps {
  gates: GateDefinition[];
  onTriggerGateCheck: (gateId: number) => void;
  onNavigateToAuditPacks: (gateId: number) => void;
}

export const ComplianceGatesView: React.FC<ComplianceGatesViewProps> = ({
  gates,
  onTriggerGateCheck,
  onNavigateToAuditPacks,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [expandedGate, setExpandedGate] = useState<number | null>(4); // Gate 4 open by default
  const [runningGateId, setRunningGateId] = useState<number | null>(null);

  const pillars = ['All', 'QCTO', 'MICT SETA', 'Document QA', 'B-BBEE'];

  const filteredGates = gates.filter((gate) => {
    return selectedPillar === 'All' || gate.pillar === selectedPillar;
  });

  const passedCount = gates.filter((g) => g.status === 'PASSED').length;
  const actionCount = gates.filter((g) => g.status === 'ACTION REQUIRED').length;
  const criticalCount = gates.filter((g) => g.status === 'CRITICAL NON-COMPLIANCE').length;

  const handleRunValidation = (gateId: number) => {
    setRunningGateId(gateId);
    setTimeout(() => {
      onTriggerGateCheck(gateId);
      setRunningGateId(null);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Executive Context */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              ComplianceOS · Phyllis Muthombeni QAC Map (14 Oct 2026)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>The 9 Automated Compliance Gates</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Every procedure is a hard, gate-driven validation. Nothing is submitted to MICT SETA or QCTO, and no EISA exam goes ahead, until the agent has cleared the matching gate.
          </p>
        </div>

        {/* 3 Status Summaries */}
        <div className="flex items-center gap-3 shrink-0 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
          <div className="text-center px-3 py-1">
            <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">PASSED</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">{passedCount}</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center px-3 py-1">
            <div className="text-xs font-mono text-amber-400 uppercase font-semibold">ACTION REQ</div>
            <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">{actionCount}</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center px-3 py-1">
            <div className="text-xs font-mono text-rose-400 uppercase font-semibold">CRITICAL</div>
            <div className="text-2xl font-bold text-rose-400 font-mono tabular-nums">{criticalCount}</div>
          </div>
        </div>
      </div>

      {/* Horizontal Pipeline Progression Strip */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>PIPELINE PROGRESSION FLOW (GATES 1 TO 9)</span>
          <span>Lead Sponsor: Martin Pienaar · QAC Lead: Phyllis Muthombeni</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
          {gates.map((g) => {
            let color = 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300';
            if (g.status === 'ACTION REQUIRED') {
              color = 'border-amber-500/50 bg-amber-950/30 text-amber-300';
            } else if (g.status === 'CRITICAL NON-COMPLIANCE') {
              color = 'border-rose-500/70 bg-rose-950/40 text-rose-300 animate-pulse';
            }
            return (
              <button
                key={g.id}
                onClick={() => setExpandedGate(g.id)}
                className={`p-2 rounded border text-left transition-all ${color} hover:brightness-125`}
              >
                <div className="text-[10px] font-mono text-slate-400">G0{g.id}</div>
                <div className="text-xs font-bold truncate mt-0.5">{g.name.replace(' Gate', '')}</div>
                <div className="text-[10px] font-mono tabular-nums mt-1">{g.readinessScore}%</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs by Pillar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <span className="text-[11px] font-mono text-slate-500 px-2 uppercase">Pillar:</span>
          {pillars.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPillar(p)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                selectedPillar === p
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredGates.length} of {gates.length} Gates
        </div>
      </div>

      {/* Gates Accordion List */}
      <div className="space-y-3">
        {filteredGates.map((gate) => {
          const isExpanded = expandedGate === gate.id;
          const isRunning = runningGateId === gate.id;

          let badgeStyle = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
          let statusIcon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;

          if (gate.status === 'ACTION REQUIRED') {
            badgeStyle = 'text-amber-300 bg-amber-950/60 border-amber-800/80';
            statusIcon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
          } else if (gate.status === 'CRITICAL NON-COMPLIANCE') {
            badgeStyle = 'text-rose-300 bg-rose-950/60 border-rose-800/80';
            statusIcon = <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />;
          }

          return (
            <div
              key={gate.id}
              className={`rounded-lg border transition-all ${
                isExpanded
                  ? 'bg-slate-900/90 border-slate-700 shadow-md'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700/80'
              }`}
            >
              {/* Gate Header Row */}
              <div
                onClick={() => setExpandedGate(isExpanded ? null : gate.id)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono font-bold text-xs text-cyan-400 w-16 text-center">
                    {gate.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100">{gate.name}</h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {gate.pillar}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Lead: <span className="text-slate-300">{gate.leadOwner}</span> · {gate.nextScheduledReview}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Readiness Progress */}
                  <div className="hidden sm:block text-right">
                    <div className="text-[11px] font-mono text-slate-400">
                      {gate.itemsVerified} / {gate.itemsTotal} Verified
                    </div>
                    <div className="w-28 bg-slate-950 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${
                          gate.readinessScore >= 95
                            ? 'bg-emerald-400'
                            : gate.readinessScore >= 85
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                        }`}
                        style={{ width: `${gate.readinessScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold border ${badgeStyle}`}
                  >
                    {statusIcon}
                    <span>{gate.status}</span>
                  </div>

                  {/* Expand Icon */}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Detailed Rules & Gating Action Panel */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-2 border-t border-slate-800/80 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Automated Validation Rule */}
                    <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        Automated Validation Rule
                      </div>
                      <p className="text-slate-300 leading-relaxed">{gate.validationRule}</p>
                    </div>

                    {/* System Action */}
                    <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                        System Action & Enforcement
                      </div>
                      <p className="text-slate-300 leading-relaxed">{gate.systemAction}</p>
                    </div>
                  </div>

                  {/* Gating Blocking Conditions */}
                  <div className="p-3.5 bg-slate-950/70 rounded-lg border border-slate-800 space-y-2">
                    <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider font-semibold">
                      Gating Invariants (Blocks Submission If Triggered)
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {gate.blockingConditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-mono mt-0.5">•</span>
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-slate-400 font-mono">
                      Gate ID: <span className="text-cyan-400">G0{gate.id}</span> · Active Invariant
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToAuditPacks(gate.id)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                      >
                        Compile Audit Pack
                      </button>
                      <button
                        onClick={() => handleRunValidation(gate.id)}
                        disabled={isRunning}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors shadow-sm"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                        <span>{isRunning ? 'Validating Gate...' : 'Run Gate Validation'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
