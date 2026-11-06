import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ComplianceDocument } from '../types';

interface ReportsAnalyticsProps {
  documents: ComplianceDocument[];
  onTriggerRpaReport: () => void;
}

export const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({
  documents,
  onTriggerRpaReport,
}) => {
  const [showFullDossier, setShowFullDossier] = useState(false);

  const totalDocs = documents.length;
  const compliantDocs = documents.filter((d) => d.status === 'COMPLIANT').length;
  const warningDocs = documents.filter((d) => d.status === 'WARNING').length;
  const auditScore = ((compliantDocs / (totalDocs || 1)) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Reports & Regulatory Analytics
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Audit Ready (97.4%)
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Aggregated audit readiness, expiry timeline forecasts, SARS tax compliance scores, and downloadable regulatory dossiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFullDossier(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-md transition-colors"
          >
            <FileCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>View Full Audit Dossier</span>
          </button>
          <button
            onClick={onTriggerRpaReport}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate PDF Audit Dossier</span>
          </button>
        </div>
      </div>

      {/* KPI Scores Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Overall Audit Readiness
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono tabular-nums">
            {auditScore}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Tier-1 Banking & SITA Tender Standard
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            SARS Tax Standing
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono tabular-nums">
            100%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            TCS PIN, VAT 103, and PAYE reconciled
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Academic SETA Standing
          </div>
          <div className="text-2xl font-bold text-cyan-300 mt-1 font-mono tabular-nums">
            96.2%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            2 learner ID copies pending police stamp
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Consulting Governance
          </div>
          <div className="text-2xl font-bold text-purple-300 mt-1 font-mono tabular-nums">
            98.1%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            COIDA renewal scheduled (27 days left)
          </div>
        </div>
      </div>

      {/* Expiry Risk Horizon & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-200">
            Document Expiry Risk Horizon
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Expiring in &lt; 30 Days (Urgent Action)</span>
                <span className="font-mono text-amber-400 font-semibold tabular-nums">1 Document</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '8%' }}></div>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                COIDA Letter of Good Standing (30/11/2026)
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Expiring in 31 - 90 Days</span>
                <span className="font-mono text-slate-300 font-semibold tabular-nums">2 Documents</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Learner Records Dossier (10/01/2027) & MICT Tripartite Agreement
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Valid &gt; 90 Days (Compliant Window)</span>
                <span className="font-mono text-emerald-400 font-semibold tabular-nums">8 Documents</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '77%' }}></div>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                SARS TCS (01/10/2027), SITA RFB 1183 (12/01/2028), CIPC (Perpetual)
              </span>
            </div>
          </div>
        </div>

        {/* Verification Engine Performance */}
        <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-lg space-y-4">
          <h3 className="text-sm font-bold text-slate-200">
            Automated Audit Evidence Integrity
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-300">Total Monitored Artifacts</span>
              <span className="font-mono text-slate-100 font-bold tabular-nums">148 Records</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-300">OCR Text Layer Extraction Precision</span>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">98.4% Confidence</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-300">Playwright Gateway Verification Success</span>
              <span className="font-mono text-emerald-400 font-bold tabular-nums">100% (0 Failures)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-slate-300">Last External Audit Review</span>
              <span className="font-mono text-slate-400 tabular-nums">PwC Independent (Q3 2026)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Dossier Modal Preview */}
      {showFullDossier && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase">OFFICIAL REGULATORY DOSSIER</div>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">Mindworx Compliance Audit Pack 2026</h3>
                <div className="text-xs text-slate-400">Prepared for Government Tender & Banking Vendor Onboarding</div>
              </div>
              <button
                onClick={() => setShowFullDossier(false)}
                className="text-slate-500 hover:text-slate-300 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <div className="font-bold text-slate-200 mb-1">Section 1: SARS Tax Compliance</div>
                <p>Taxpayer: MINDWORX CONSULTING (PTY) LTD · Tax Ref: 9012847192 · TCS PIN: 98234821A8.</p>
                <p className="text-emerald-400 mt-1 font-mono text-[11px]">Status: COMPLIANT (Good Standing Valid until 01/10/2027)</p>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <div className="font-bold text-slate-200 mb-1">Section 2: Academic & SITA Accreditation</div>
                <p>SITA Transversal Contract RFB 1183 Tier-1 IT Vendor (Exp: 12/01/2028). MICT SETA National Certificate Systems Development Cohort agreements signed.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <div className="font-bold text-slate-200 mb-1">Section 3: Corporate Governance & B-BBEE</div>
                <p>CIPC: 2014/192847/07 (In Business). B-BBEE Level 1 Contributor (135% Recognition). COIDA Letter of Good Standing active.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-slate-400">
                <div>DIGITAL SIGNATURE HASH (SHA-256):</div>
                <div className="text-cyan-400 break-all mt-0.5">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-500 font-mono">18 Pages · Generated via Playwright + Python</span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
