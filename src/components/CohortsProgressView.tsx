import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { COHORTS_LIST } from '../data/complianceOsData';
import { CohortComplianceRecord } from '../types';

export const CohortsProgressView: React.FC = () => {
  const [cohorts, setCohorts] = useState<CohortComplianceRecord[]>(COHORTS_LIST);
  const [selectedCohortId, setSelectedCohortId] = useState<string>('cohort-01');

  const activeCohort = cohorts.find((c) => c.id === selectedCohortId) || cohorts[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Learnership Cohorts Gate Progression
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Tracks enrolled cohorts through the 9 automated compliance gates, QCTO monitoring countdowns, and assessor allocations.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          Active Seats: <strong className="text-cyan-400 tabular-nums">77 Learners</strong> across 4 Programmes
        </div>
      </div>

      {/* Cohort Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cohorts.map((c) => {
          const isSelected = selectedCohortId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCohortId(c.id)}
              className={`p-4 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 shadow-md shadow-cyan-400/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">{c.code}</span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {c.learnerType}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100 mt-1.5 leading-snug">
                  {c.name}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">{c.saqaId}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.totalLearners} Learners</span>
                <span className="text-emerald-400 font-mono font-bold tabular-nums">
                  {c.complianceScore}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Cohort Detailed Gate Journey */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              ACTIVE COHORT DOSSIER
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">{activeCohort.name}</h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Code: {activeCohort.code} · Qualification: {activeCohort.qualification}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs">
              <div className="text-[10px] uppercase font-mono text-slate-500">QCTO Monitoring Window</div>
              <div className="text-amber-400 font-bold font-mono mt-0.5">
                {activeCohort.qctoWindow.start} – {activeCohort.qctoWindow.end}
              </div>
              <div className="text-[10px] text-slate-400">
                Window opens in <strong className="text-amber-300 tabular-nums">{activeCohort.qctoWindow.daysRemaining} days</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Gates Visual Pipeline for Cohort */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-300 uppercase font-mono">
            Gate Clearance Trail (Gates 1 to 9)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gateNum) => {
              const status = activeCohort.gateStatuses[gateNum] || 'PASSED';
              let color = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300';
              if (status === 'ACTION REQUIRED') color = 'bg-amber-950/40 border-amber-500/50 text-amber-300';
              if (status === 'CRITICAL NON-COMPLIANCE') color = 'bg-rose-950/50 border-rose-500/70 text-rose-300 animate-pulse';

              const gateNames: Record<number, string> = {
                1: 'Onboarding',
                2: 'Registration',
                3: 'Scope Check',
                4: 'QCTO Visit',
                5: 'SETA Verif',
                6: 'Post-Course',
                7: 'EISA Exam',
                8: 'Accreditation',
                9: 'B-BBEE',
              };

              return (
                <div key={gateNum} className={`p-2.5 rounded border text-left flex flex-col justify-between ${color}`}>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400">G0{gateNum}</div>
                    <div className="text-xs font-bold mt-0.5 truncate">{gateNames[gateNum]}</div>
                  </div>
                  <div className="text-[9px] font-mono font-semibold uppercase mt-2 truncate">
                    {status === 'CRITICAL NON-COMPLIANCE' ? 'CRITICAL' : status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Staff & Faculty Allocations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
            <div className="text-[10px] uppercase font-mono text-slate-500">Assigned Assessor</div>
            <div className="font-semibold text-slate-200 mt-1">{activeCohort.assignedAssessor}</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Scope Verified (3-Year Cycle Current)</div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
            <div className="text-[10px] uppercase font-mono text-slate-500">Assigned Moderator</div>
            <div className="font-semibold text-slate-200 mt-1">{activeCohort.assignedModerator}</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">SLA Signed · Site Visit Booked</div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded border border-slate-800">
            <div className="text-[10px] uppercase font-mono text-slate-500">EISA Examination Target</div>
            <div className="font-semibold text-slate-200 mt-1">
              {activeCohort.eisaDate || 'Target Q1 2027'}
            </div>
            <div className="text-[11px] text-amber-400 font-mono mt-0.5">
              {activeCohort.missingDocumentsCount > 0
                ? `${activeCohort.missingDocumentsCount} document gaps blocking exam`
                : 'All documents clear'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
