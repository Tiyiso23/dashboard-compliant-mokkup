import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  ExternalLink,
  Printer,
  Download,
  Building,
  Hash,
  Key,
  Calendar,
  RefreshCw,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SarsSubTab, SarsVerificationResult, ComplianceDocument } from '../types';

interface SarsComplianceProps {
  documents: ComplianceDocument[];
  activeSubTab: SarsSubTab;
  onSubTabChange: (subTab: SarsSubTab) => void;
  onRunOcrOnDoc?: (doc: ComplianceDocument) => void;
  initialTaxRef?: string;
  initialPin?: string;
}

export const SarsCompliance: React.FC<SarsComplianceProps> = ({
  documents,
  activeSubTab,
  onSubTabChange,
  onRunOcrOnDoc,
  initialTaxRef = '9012847192',
  initialPin = '98234821A8',
}) => {
  const [taxRefInput, setTaxRefInput] = useState(initialTaxRef);
  const [tcsPinInput, setTcsPinInput] = useState(initialPin);
  const [entityNameInput, setEntityNameInput] = useState('MINDWORX CONSULTING (PTY) LTD');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<SarsVerificationResult | null>({
    verified: true,
    status: 'COMPLIANT',
    taxPayerName: 'MINDWORX CONSULTING (PTY) LTD',
    tradingName: 'Mindworx Academy & Consulting',
    taxReferenceNumber: '9012847192',
    tcsPin: '98234821A8',
    issueDate: '01/10/2026',
    expiryDate: '01/10/2027',
    prn: 'PRN-SARS-89214710',
    goodStanding: true,
    complianceCategories: {
      incomeTax: 'Compliant',
      vat: 'Compliant',
      paye: 'Compliant',
      customs: 'Not Registered / Excluded',
    },
    auditToken: 'SARS-AUTH-OTA5Mjg0NzE5Mg==',
    verifiedAt: new Date().toISOString(),
    gatewayNode: 'ZA-JHB-SARS-EFILING-NODE-04',
  });
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleVerifySarsPin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setVerificationError(null);

    try {
      const response = await fetch('/api/sars-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taxRefNumber: taxRefInput,
          tcsPin: tcsPinInput,
          entityName: entityNameInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'SARS Verification failed');
      }

      const result = await response.json();
      setVerificationResult(result);
    } catch (err: any) {
      setVerificationError(err.message || 'Unable to connect to SARS eFiling gateway');
      setVerificationResult(null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const sarsDocs = documents.filter((d) => d.category === 'SARS');

  return (
    <div className="space-y-6">
      {/* Top Section & Sub-tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              SARS Compliance Centre
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Active Good Standing
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Official South African Revenue Service tax compliance status, TCS PIN verification, VAT 103, and PAYE declarations.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 overflow-x-auto">
          {[
            { id: 'all', label: 'All SARS' },
            { id: 'tax-compliance-status', label: 'TCS Overview' },
            { id: 'tcs-pin-verification', label: 'TCS PIN Verification' },
            { id: 'vat-registration', label: 'VAT Registration' },
            { id: 'paye-registration', label: 'PAYE Registration' },
            { id: 'tax-documentation', label: 'Tax Documents' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSubTabChange(tab.id as SarsSubTab)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area based on selected subtab */}
      {(activeSubTab === 'all' || activeSubTab === 'tax-compliance-status') && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              TCS Overall Status
            </div>
            <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>COMPLIANT</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Good standing confirmed under Tax Administration Act
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Active TCS PIN
            </div>
            <div className="text-lg font-mono font-bold text-cyan-300 mt-1 tabular-nums">
              98234821A8
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Expires: 01/10/2027 (332 days left)
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              VAT 103 Status
            </div>
            <div className="text-lg font-bold text-slate-200 mt-1">
              Active Vendor
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 tabular-nums">
              Ref: 4120283921 · Category B
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              PAYE & EMP201
            </div>
            <div className="text-lg font-bold text-slate-200 mt-1">
              Up to Date
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 tabular-nums">
              Ref: 7820194820 · No Arrears
            </div>
          </div>
        </div>
      )}

      {/* TCS PIN Verification Tool (Highlighted feature) */}
      {(activeSubTab === 'all' || activeSubTab === 'tcs-pin-verification') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Verification Form (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-lg p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-200">
                SARS TCS PIN Verification Tool
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Directly check and validate Tax Compliance Status against the SARS Central Assessment Register.
              </p>
            </div>

            {/* Quick-fill buttons */}
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="text-slate-500 font-mono py-0.5">Presets:</span>
              <button
                type="button"
                onClick={() => {
                  setTaxRefInput('9012847192');
                  setTcsPinInput('98234821A8');
                  setEntityNameInput('MINDWORX CONSULTING (PTY) LTD');
                }}
                className="px-2 py-0.5 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 font-mono"
              >
                Mindworx Consulting (Compliant)
              </button>
              <button
                type="button"
                onClick={() => {
                  setTaxRefInput('4120283921');
                  setTcsPinInput('91823741B2');
                  setEntityNameInput('MINDWORX ACADEMY (PTY) LTD');
                }}
                className="px-2 py-0.5 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 font-mono"
              >
                Mindworx Academy (Compliant)
              </button>
            </div>

            <form onSubmit={handleVerifySarsPin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Taxpayer / Registered Entity Name
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={entityNameInput}
                    onChange={(e) => setEntityNameInput(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  SARS Tax Reference Number
                </label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={taxRefInput}
                    onChange={(e) => setTaxRefInput(e.target.value)}
                    placeholder="e.g. 9012847192"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 tabular-nums focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  TCS PIN (10 Characters)
                </label>
                <div className="relative">
                  <Key className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={tcsPinInput}
                    onChange={(e) => setTcsPinInput(e.target.value.toUpperCase())}
                    placeholder="e.g. 98234821A8"
                    required
                    maxLength={10}
                    className="w-full bg-slate-950 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-xs font-mono text-cyan-300 uppercase tabular-nums focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {verificationError && (
                <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{verificationError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 transition-colors shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>{isVerifying ? 'Querying SARS Gateway...' : 'Verify TCS PIN with SARS'}</span>
              </button>
            </form>
          </div>

          {/* Official Verification Certificate Result (7 cols) */}
          <div className="lg:col-span-7">
            {verificationResult ? (
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 relative overflow-hidden flex flex-col justify-between h-full">
                {/* Official SARS Header Layout */}
                <div>
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                        SOUTH AFRICAN REVENUE SERVICE
                      </div>
                      <div className="text-sm font-bold text-slate-100 tracking-tight mt-0.5">
                        Tax Compliance Status Verification Result
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Issued under the provisions of the Tax Administration Act 28 of 2011
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {verificationResult.status}
                      </span>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">
                        {verificationResult.auditToken}
                      </div>
                    </div>
                  </div>

                  {/* Entity Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Taxpayer Name</div>
                      <div className="font-semibold text-slate-200 mt-0.5">
                        {verificationResult.taxPayerName}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Trading Name</div>
                      <div className="text-slate-300 mt-0.5">
                        {verificationResult.tradingName}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Tax Reference Number</div>
                      <div className="font-mono text-cyan-300 mt-0.5 tabular-nums">
                        {verificationResult.taxReferenceNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">PIN Used</div>
                      <div className="font-mono text-cyan-300 mt-0.5 tabular-nums">
                        {verificationResult.tcsPin}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Date Verified</div>
                      <div className="font-mono text-slate-300 mt-0.5 tabular-nums">
                        {new Date(verificationResult.verifiedAt).toLocaleDateString('en-ZA')}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-slate-500">Expiry Date</div>
                      <div className="font-mono text-emerald-400 mt-0.5 tabular-nums font-semibold">
                        {verificationResult.expiryDate}
                      </div>
                    </div>
                  </div>

                  {/* Sub-account Compliance Matrix */}
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                      Sub-Account Compliance Breakdown
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">Income Tax</div>
                        <div className="font-semibold text-emerald-400 mt-0.5">
                          {verificationResult.complianceCategories.incomeTax}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">VAT</div>
                        <div className="font-semibold text-emerald-400 mt-0.5">
                          {verificationResult.complianceCategories.vat}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">PAYE</div>
                        <div className="font-semibold text-emerald-400 mt-0.5">
                          {verificationResult.complianceCategories.paye}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">Customs</div>
                        <div className="text-slate-400 mt-0.5">
                          {verificationResult.complianceCategories.customs}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-slate-500">
                    GATEWAY: {verificationResult.gatewayNode}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintCertificate}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 border border-dashed border-slate-800 rounded-lg text-center text-slate-500 text-xs">
                Enter a Tax Reference and TCS PIN on the left to run live verification.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tax Documentation Archive */}
      {(activeSubTab === 'all' || activeSubTab === 'tax-documentation') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              SARS Tax Documentation Vault
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {sarsDocs.length} Verified Tax Records
            </span>
          </div>

          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Document Title</th>
                  <th className="py-2.5 px-3">Tax Reference</th>
                  <th className="py-2.5 px-3">Reference No</th>
                  <th className="py-2.5 px-3">Issue Date</th>
                  <th className="py-2.5 px-3">Expiry Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {sarsDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-medium text-slate-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300 tabular-nums">
                      {doc.taxReference}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                      {doc.referenceNumber}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                      {doc.issueDate}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400 tabular-nums">
                      {doc.expiryDate}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {onRunOcrOnDoc && (
                        <button
                          onClick={() => onRunOcrOnDoc(doc)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                        >
                          View OCR Metadata
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
