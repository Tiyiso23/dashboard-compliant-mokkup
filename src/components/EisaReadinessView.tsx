import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Users,
  Monitor,
  FileText,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { EISA_CHECKLIST } from '../data/complianceOsData';
import { EisaChecklistItem } from '../types';

export const EisaReadinessView: React.FC = () => {
  const [checklist, setChecklist] = useState<EisaChecklistItem[]>(EISA_CHECKLIST);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Venue' | 'Documents' | 'Staff'>('All');
  const [auditBanner, setAuditBanner] = useState<string | null>(null);

  const totalItems = checklist.length;
  const compliantItems = checklist.filter((item) => item.isCompliant).length;
  const readinessScore = Math.round((compliantItems / totalItems) * 100);

  // Critical rules: 2 invigilators per room, valid accreditation letter, laptops with backup power, wall clock, signage
  const hasCriticalFailure = checklist.some(
    (item) => !item.isCompliant && item.severity === 'CRITICAL NON-COMPLIANCE'
  );

  const handleToggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompliant: !item.isCompliant } : item
      )
    );
    setAuditBanner('EISA Readiness Checklist updated. Recalculating Gate 7 Score...');
    setTimeout(() => setAuditBanner(null), 2500);
  };

  const filteredChecklist = checklist.filter((item) => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Gate 07 · QCTO External Integrated Summative Assessment (EISA)
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>EISA Examination Readiness & Venue Scoring</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Automated checklist scoring covering examination room venue specifications, statutory documents, and mandatory invigilator staffing ratios.
          </p>
        </div>

        {/* Live Scorecard */}
        <div className="flex items-center gap-4 shrink-0 bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              Gate 07 Status
            </div>
            <div
              className={`text-xl font-bold font-mono mt-0.5 ${
                hasCriticalFailure ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {hasCriticalFailure ? 'CRITICAL NON-COMPLIANCE' : 'EXAM CLEARED (PASSED)'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Readiness: <strong className="text-slate-200 tabular-nums">{readinessScore}%</strong> ({compliantItems}/{totalItems} items)
            </div>
          </div>
          <div
            className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-mono font-bold text-xs ${
              hasCriticalFailure
                ? 'border-rose-500/30 border-t-rose-400 text-rose-300'
                : 'border-emerald-500/30 border-t-emerald-400 text-emerald-300'
            }`}
          >
            {readinessScore}%
          </div>
        </div>
      </div>

      {/* Critical Non-Compliance Callout if invigilators or clocks fail */}
      {hasCriticalFailure && (
        <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
          <div className="text-xs space-y-1">
            <div className="font-bold text-rose-300">
              Exam Clearance Blocked: QCTO Non-Compliance Invariants Detected
            </div>
            <p className="text-slate-300 leading-relaxed">
              Per Gate 7 specification, the examination session scheduled for <strong>25 November 2026</strong> cannot be cleared because critical requirements are unmet (e.g. <em>Invigilator ratio below 2 invigilators per room</em>, <em>Directional signage unposted</em>, or <em>Wall clock depleted</em>). Resolve these items below to clear the gate.
            </p>
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {(['All', 'Venue', 'Documents', 'Staff'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                activeCategory === cat
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {auditBanner && (
          <span className="text-xs font-mono text-cyan-300 animate-fade-in">
            {auditBanner}
          </span>
        )}
      </div>

      {/* Checklist Grid */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60 shadow-inner">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
            <tr>
              <th className="py-2.5 px-3 w-12 text-center">Audit</th>
              <th className="py-2.5 px-3">Checklist Item</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">QCTO Mandatory Requirement</th>
              <th className="py-2.5 px-3">Responsible Role</th>
              <th className="py-2.5 px-3">Audit Inspector Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredChecklist.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleToggleItem(item.id)}
                className="hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="checkbox"
                    checked={item.isCompliant}
                    onChange={() => {}} // handled by row click
                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                  />
                </td>

                <td className="py-2.5 px-3 font-semibold text-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={item.isCompliant ? 'text-slate-200' : 'text-rose-300'}>
                      {item.item}
                    </span>
                    {!item.isCompliant && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        {item.severity === 'CRITICAL NON-COMPLIANCE' ? 'CRITICAL' : 'ACTION'}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-2.5 px-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {item.category}
                  </span>
                </td>

                <td className="py-2.5 px-3 text-slate-300 max-w-xs">{item.requirement}</td>

                <td className="py-2.5 px-3 text-cyan-300 font-medium font-mono text-[11px]">
                  {item.responsibleRole}
                </td>

                <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                  {item.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
