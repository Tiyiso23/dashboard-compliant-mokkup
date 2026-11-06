import React from 'react';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building,
  UserCheck,
  Shield,
  Clock,
} from 'lucide-react';
import { ConsultingSubTab, ComplianceDocument } from '../types';

interface ConsultingComplianceProps {
  documents: ComplianceDocument[];
  activeSubTab: ConsultingSubTab;
  onSubTabChange: (subTab: ConsultingSubTab) => void;
  onRunOcrOnDoc?: (doc: ComplianceDocument) => void;
}

export const ConsultingCompliance: React.FC<ConsultingComplianceProps> = ({
  documents,
  activeSubTab,
  onSubTabChange,
  onRunOcrOnDoc,
}) => {
  const consultingDocs = documents.filter((d) => d.category === 'Consulting');

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Consulting Compliance Centre
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              CIPC & B-BBEE Level 1
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Enterprise corporate governance, CIPC CoR 14.3, COIDA Good Standing, employee clearances, and Tier-1 client MSAs.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
          {[
            { id: 'all', label: 'All Consulting' },
            { id: 'company-compliance', label: 'Company Compliance' },
            { id: 'employee-compliance', label: 'Employee Compliance' },
            { id: 'client-compliance', label: 'Client Compliance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSubTabChange(tab.id as ConsultingSubTab)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
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
            CIPC Status
          </div>
          <div className="text-lg font-bold text-slate-100 mt-1">
            In Business
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono tabular-nums">
            Reg: 2014/192847/07 · Annual Return Current
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            B-BBEE Transformation
          </div>
          <div className="text-lg font-bold text-emerald-400 mt-1">
            Level 1 Contributor
          </div>
          <div className="text-xs text-slate-400 mt-1">
            135% Procurement Recognition (51.2% Black Owned)
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            COIDA Letter of Good Standing
          </div>
          <div className="text-lg font-bold text-amber-400 mt-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>27 Days Remaining</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Expires 30/11/2026 · Automated renewal queued
          </div>
        </div>
      </div>

      {/* Document Records Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Document Title</th>
              <th className="py-2.5 px-3">Sub-Category</th>
              <th className="py-2.5 px-3">Reference No</th>
              <th className="py-2.5 px-3">Issue Date</th>
              <th className="py-2.5 px-3">Expiry Date</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {consultingDocs.map((doc) => (
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
