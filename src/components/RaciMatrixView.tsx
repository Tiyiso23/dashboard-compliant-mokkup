import React from 'react';
import {
  Users,
  CheckCircle2,
  Shield,
  FileCheck,
  UserCheck,
  Award,
} from 'lucide-react';
import { RACI_MATRIX } from '../data/complianceOsData';

export const RaciMatrixView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Compliance Governance & RACI Accountability Matrix
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Operational governance mapped on 14 October 2026. The Compliance Agent is Responsible (R) for checking and compiling; Tandeeka (Compliance Officer) is Accountable (A) for submissions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <span>Executive Sponsor:</span>
          <strong className="text-slate-200">Martin Pienaar (Managing Director)</strong>
        </div>
      </div>

      {/* RACI Definition Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center font-mono">
              R
            </span>
            <span className="font-bold text-slate-200">Responsible</span>
          </div>
          <p className="text-slate-400 mt-1 text-[11px]">
            The doer of the task. The Mindworx Compliance Agent does the automated checking, scanning, and compilation.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center font-mono">
              A
            </span>
            <span className="font-bold text-slate-200">Accountable</span>
          </div>
          <p className="text-slate-400 mt-1 text-[11px]">
            The decision maker with sole veto. Tandeeka (Compliance Officer) approves all formal submissions to MICT SETA & QCTO.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center font-mono">
              C
            </span>
            <span className="font-bold text-slate-200">Consulted</span>
          </div>
          <p className="text-slate-400 mt-1 text-[11px]">
            Subject matter expert whose opinion is sought. Phyllis Muthombeni (QAC Lead) consults on standards and curriculum.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-800 text-slate-300 font-bold flex items-center justify-center font-mono">
              I
            </span>
            <span className="font-bold text-slate-200">Informed</span>
          </div>
          <p className="text-slate-400 mt-1 text-[11px]">
            Kept updated on progress and results. Operations and recruitment teams receive automated activity notifications.
          </p>
        </div>
      </div>

      {/* RACI Matrix Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60 shadow-inner">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
            <tr>
              <th className="py-3 px-4">Compliance & QAC Activity</th>
              <th className="py-3 px-3 text-center">Compliance Agent</th>
              <th className="py-3 px-3 text-center">Compliance Officer (Tandeeka)</th>
              <th className="py-3 px-3 text-center">QAC Lead (Phyllis M.)</th>
              <th className="py-3 px-3 text-center">Ops & Programmes Lead</th>
              <th className="py-3 px-3 text-center">Recruitment / Onboarding</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {RACI_MATRIX.map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-200">
                  {row.activity}
                </td>

                <td className="py-3 px-3 text-center">
                  <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-xs bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                    {row.complianceAgent}
                  </span>
                </td>

                <td className="py-3 px-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      row.complianceOfficer === 'A'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-950 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {row.complianceOfficer}
                  </span>
                </td>

                <td className="py-3 px-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      row.qacLead === 'A'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                        : row.qacLead === 'C'
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {row.qacLead}
                  </span>
                </td>

                <td className="py-3 px-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      row.opsLead === 'A'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                        : row.opsLead === 'C'
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {row.opsLead}
                  </span>
                </td>

                <td className="py-3 px-3 text-center">
                  <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-950 text-slate-400 border border-slate-800">
                    {row.recruitment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
