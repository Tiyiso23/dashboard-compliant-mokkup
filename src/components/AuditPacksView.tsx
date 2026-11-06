import React, { useState } from 'react';
import {
  FileCheck,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  FolderDown,
  Building,
  GraduationCap,
  Calendar,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';
import { NON_CONFORMANCE_REPORTS } from '../data/complianceOsData';

export const AuditPacksView: React.FC = () => {
  const [selectedPackId, setSelectedPackId] = useState<string>('qcto-monitoring');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledSuccess, setCompiledSuccess] = useState(false);

  const AUDIT_PACKS = [
    {
      id: 'qcto-monitoring',
      gateId: 4,
      title: 'QCTO Monitoring Visit File',
      entity: 'Quality Council for Trades & Occupations (QCTO)',
      dueWindow: 'Between 21 days & 2 months post-registration',
      status: 'ACTION REQUIRED',
      readinessScore: 91.3,
      items: [
        { name: 'Assessor accreditation, certified IDs, CVs & qualifications', ready: true },
        { name: 'SDP accreditation letter & Mindworx SOPs', ready: true },
        { name: 'Training schedule, assessment strategy, timetables & lesson plans', ready: true },
        { name: 'QCTO learner registration letters (24 candidates)', ready: true },
        { name: 'Facility check report (furniture, lighting, cleanliness, ventilation)', ready: true },
        { name: 'Meeting minutes & onboarding induction report', ready: false, issue: 'Workplace mentor signature missing on 18 Feb induction minutes' },
        { name: 'Learner agreements & certified IDs (last 3 months)', ready: false, issue: '2 candidate ID certifications expired beyond 3-month threshold' },
      ],
    },
    {
      id: 'mict-verification',
      gateId: 5,
      title: 'MICT SETA Verification File',
      entity: 'MICT SETA External Verification Committee',
      dueWindow: 'On completion of formative & summative assessments',
      status: 'PASSED',
      readinessScore: 100.0,
      items: [
        { name: 'Signed Assessor Report & Moderation Report (10% sample)', ready: true },
        { name: 'Assessor & Moderator SETA registration letters', ready: true },
        { name: 'Signed SLAs with Mindworx for all assessors', ready: true },
        { name: 'Mindworx SDP accreditation certificate', ready: true },
        { name: 'Learner transcripts & Statement of Results (SoR) sheet', ready: true },
        { name: 'Sample learner Portfolios of Evidence (PoEs) complete', ready: true },
        { name: 'Moderator booked for verification site visit', ready: true },
      ],
    },
    {
      id: 'eisa-readiness',
      gateId: 7,
      title: 'EISA Exam Readiness & Centre Pack',
      entity: 'Assessment Quality Partner (AQP) / QCTO',
      dueWindow: '14 days prior to External Integrated Summative Assessment',
      status: 'CRITICAL NON-COMPLIANCE',
      readinessScore: 81.2,
      items: [
        { name: 'Venue: 26 configured candidate laptops with backup power', ready: true },
        { name: 'Venue: Learner name tags, table numbers & 1.5m seating plan', ready: true },
        { name: 'Venue: Directional signage to exam room & candidate restrooms', ready: false, issue: 'Signage missing in reception lobby' },
        { name: 'Documents: Valid SDP accreditation & QCTO candidate registers', ready: true },
        { name: 'Documents: Synchronized wall clock mounted in examination room', ready: false, issue: 'Room 1 wall clock battery depleted' },
        { name: 'Staff: 2 registered invigilators per room ratio', ready: false, issue: 'CRITICAL: Only 1 invigilator confirmed for Room 1' },
        { name: 'Staff: Chief Invigilator, IT support & Training Manager on standby', ready: true },
      ],
    },
    {
      id: 'accreditation-pack',
      gateId: 8,
      title: 'New Qualification Accreditation Pack',
      entity: 'QCTO / SETA Evaluators',
      dueWindow: 'Any time prior to new programme intake',
      status: 'PASSED',
      readinessScore: 100.0,
      items: [
        { name: 'Facilitator CVs, certified qualifications & SLAs', ready: true },
        { name: 'Valid company stamp & CIPC enterprise registration', ready: true },
        { name: 'Physical premises lease agreement (current)', ready: true },
        { name: 'SARS Tax Compliance Status (TCS PIN - Active Good Standing)', ready: true },
        { name: 'Public liability insurance certificate (R10M coverage)', ready: true },
        { name: 'OHS representative appointment & first aid kit inspection', ready: true },
        { name: 'Proof of online LMS training delivery infrastructure', ready: true },
      ],
    },
    {
      id: 'bbbee-dossier',
      gateId: 9,
      title: 'B-BBEE Skills Development Evidence Pack',
      entity: 'SANAS B-BBEE Verification Agency',
      dueWindow: 'Annual financial audit & WSP/ATR submission cycle',
      status: 'PASSED',
      readinessScore: 98.2,
      items: [
        { name: 'Executed learnership agreements & certified IDs', ready: true },
        { name: 'Disability medical certificates for claimed bonus points', ready: true },
        { name: 'Monthly stipend bank proof & salary payment registers', ready: true },
        { name: 'SETA registration letters & Statement of Results (SoRs)', ready: true },
        { name: 'Post-programme employment absorption letters (51.2% target)', ready: true },
        { name: 'WSP/ATR submission reconciliation sheet', ready: true },
      ],
    },
  ];

  const currentPack = AUDIT_PACKS.find((p) => p.id === selectedPackId) || AUDIT_PACKS[0];

  const handleCompilePack = () => {
    setIsCompiling(true);
    setCompiledSuccess(false);
    setTimeout(() => {
      setIsCompiling(false);
      setCompiledSuccess(true);
      setTimeout(() => setCompiledSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FolderDown className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Site Visit & Evaluation Audit Pack Compiler
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Compiles complete, auditor-ready files before each QCTO monitoring, MICT SETA verification, or EISA examination session.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleCompilePack}
            disabled={isCompiling}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors shadow-sm"
          >
            {compiledSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>{isCompiling ? 'Compiling Dossier...' : compiledSuccess ? 'Pack Compiled in Drive!' : 'Compile Audit File'}</span>
          </button>
        </div>
      </div>

      {/* Audit Pack Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {AUDIT_PACKS.map((pack) => {
          const isSelected = selectedPackId === pack.id;
          let badgeColor = 'text-emerald-400 bg-emerald-950 border-emerald-800';
          if (pack.status === 'ACTION REQUIRED') badgeColor = 'text-amber-400 bg-amber-950 border-amber-800';
          if (pack.status === 'CRITICAL NON-COMPLIANCE') badgeColor = 'text-rose-400 bg-rose-950 border-rose-800';

          return (
            <button
              key={pack.id}
              onClick={() => setSelectedPackId(pack.id)}
              className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 shadow-sm shadow-cyan-400/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">GATE 0{pack.gateId}</span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${badgeColor}`}>
                    {pack.readinessScore}%
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-100 mt-1 line-clamp-2">
                  {pack.title}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 line-clamp-1">
                {pack.entity}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Report Structure (The 4 Standard Report Sections) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-6 space-y-6">
        {/* Section 1: Executive Summary */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                SECTION 1 · EXECUTIVE SUMMARY
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {currentPack.title} — Readiness Audit
              </h3>
            </div>
            <div className="text-right">
              <span
                className={`text-xs font-mono font-bold px-3 py-1 rounded border ${
                  currentPack.status === 'PASSED'
                    ? 'text-emerald-300 bg-emerald-950/70 border-emerald-800'
                    : currentPack.status === 'ACTION REQUIRED'
                    ? 'text-amber-300 bg-amber-950/70 border-amber-800'
                    : 'text-rose-300 bg-rose-950/70 border-rose-800'
                }`}
              >
                STATUS: {currentPack.status}
              </span>
              <div className="text-[10px] font-mono text-slate-500 mt-1">
                Evaluation Window: {currentPack.dueWindow}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
            This dossier reflects the automated compliance inspection run by the Mindworx Compliance Agent for <strong>{currentPack.entity}</strong>. In accordance with the 14 October specification, no submission or on-site evaluation proceeds until all required gate invariants score 100%.
          </p>
        </div>

        {/* Section 2: Gap Analysis Matrix */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              SECTION 2 · GAP ANALYSIS MATRIX
            </div>
            <span className="text-xs font-mono text-slate-400">
              Readiness Score: <strong className="text-cyan-400 tabular-nums">{currentPack.readinessScore}%</strong>
            </span>
          </div>

          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Required Audit Artifact</th>
                  <th className="py-2.5 px-3 w-32">Validation State</th>
                  <th className="py-2.5 px-3">Identified Gap / Deficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {currentPack.items.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-medium text-slate-200">
                      <div className="flex items-center gap-2">
                        {item.ready ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px]">
                      {item.ready ? (
                        <span className="text-emerald-400">VERIFIED</span>
                      ) : (
                        <span className="text-rose-400 font-bold">NON-COMPLIANT</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                      {item.issue ? <span className="text-rose-300">{item.issue}</span> : 'No gaps identified · Compliant'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Non-Conformance Reports (NCRs) */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
            SECTION 3 · SPECIFIC NON-CONFORMANCE REPORTS (NCRs)
          </div>

          <div className="space-y-3">
            {NON_CONFORMANCE_REPORTS.filter((n) => n.gateNumber === currentPack.gateId).length > 0 ? (
              NON_CONFORMANCE_REPORTS.filter((n) => n.gateNumber === currentPack.gateId).map((ncr) => (
                <div key={ncr.id} className="p-4 bg-slate-950 rounded-lg border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-400">{ncr.id}</span>
                      <span className="text-xs font-bold text-slate-200">{ncr.title}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      {ncr.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{ncr.finding}</p>
                  <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                    <span>Root Cause: {ncr.rootCause}</span>
                    <span>Assignee: <strong className="text-slate-200">{ncr.assignee}</strong> (Due: {ncr.dueDate})</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero open Non-Conformance Reports for this gate. All mandatory invariants satisfied.</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Corrective Action Plan (CAP) */}
        <div className="space-y-3">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
            SECTION 4 · CORRECTIVE ACTION PLAN (CAP)
          </div>

          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Remediation Action Item</th>
                  <th className="py-2.5 px-3">Responsible Party</th>
                  <th className="py-2.5 px-3">Target Due Date</th>
                  <th className="py-2.5 px-3">Escalated To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {NON_CONFORMANCE_REPORTS.filter((n) => n.gateNumber === currentPack.gateId).map((ncr) => (
                  <tr key={ncr.id} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-medium text-slate-200">{ncr.correctiveAction}</td>
                    <td className="py-2.5 px-3 text-cyan-300 font-medium">{ncr.assignee}</td>
                    <td className="py-2.5 px-3 font-mono text-amber-300 tabular-nums">{ncr.dueDate}</td>
                    <td className="py-2.5 px-3 text-slate-400">{ncr.escalatedTo}</td>
                  </tr>
                ))}
                {NON_CONFORMANCE_REPORTS.filter((n) => n.gateNumber === currentPack.gateId).length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-500 text-xs font-mono">
                      No corrective actions pending. File is cleared for evaluator submission.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
