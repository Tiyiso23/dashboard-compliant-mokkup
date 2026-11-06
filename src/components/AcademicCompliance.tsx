import React from 'react';
import {
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Users,
  Award,
  Calendar,
  Building2,
  ShieldAlert,
} from 'lucide-react';
import { AcademicSubTab, ComplianceDocument } from '../types';

interface AcademicComplianceProps {
  documents: ComplianceDocument[];
  activeSubTab: AcademicSubTab;
  onSubTabChange: (subTab: AcademicSubTab) => void;
  onRunOcrOnDoc?: (doc: ComplianceDocument) => void;
}

export const AcademicCompliance: React.FC<AcademicComplianceProps> = ({
  documents,
  activeSubTab,
  onSubTabChange,
  onRunOcrOnDoc,
}) => {
  const academicDocs = documents.filter((d) => d.category === 'Academic');

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Academic Compliance Centre
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              SETA & SITA Accredited
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Tripartite learner contracts, State Information Technology Agency (SITA) transversal RFB 1183 accreditation, and student records.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
          {[
            { id: 'all', label: 'All Academic' },
            { id: 'learner-agreements', label: 'Learner Agreements' },
            { id: 'sita-registration', label: 'SITA Registration' },
            { id: 'learner-records', label: 'Learner Records' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSubTabChange(tab.id as AcademicSubTab)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Active Learnerships
          </div>
          <div className="text-xl font-bold text-slate-100 mt-1 tabular-nums">
            52 Enrolled
          </div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Tripartite Agreements Signed</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            SITA RFB 1183 Standing
          </div>
          <div className="text-xl font-bold text-slate-100 mt-1">
            Tier-1 Supplier
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Valid until 12/01/2028 (Accreditation Active)
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            ID Copy Compliance
          </div>
          <div className="text-xl font-bold text-amber-300 mt-1 tabular-nums">
            96.2%
          </div>
          <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>2 Candidates need renewed police certification</span>
          </div>
        </div>
      </div>

      {/* SITA Accreditation Spotlight Banner */}
      <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-slate-200">
              State Information Technology Agency (SITA) Transversal Framework RFB 1183
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Mindworx Consulting is approved for Transversal IT and Digital Skills Provisioning across all national and provincial departments.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            CSD: MAAA0029481
          </span>
        </div>
      </div>

      {/* Document Records Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Document Title</th>
              <th className="py-2.5 px-3">Classification</th>
              <th className="py-2.5 px-3">Accreditation Ref</th>
              <th className="py-2.5 px-3">Issue Date</th>
              <th className="py-2.5 px-3">Expiry Date</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">OCR Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {academicDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-medium text-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.title}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-slate-300">
                  {doc.subCategory}
                </td>
                <td className="py-2.5 px-3 font-mono text-cyan-300 tabular-nums">
                  {doc.referenceNumber}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                  {doc.issueDate}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-300 tabular-nums">
                  {doc.expiryDate}
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={`text-[11px] font-mono flex items-center gap-1 ${
                      doc.status === 'COMPLIANT'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {doc.status === 'COMPLIANT' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {doc.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  {onRunOcrOnDoc && (
                    <button
                      onClick={() => onRunOcrOnDoc(doc)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                    >
                      Inspect OCR ({doc.confidenceScore}%)
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
