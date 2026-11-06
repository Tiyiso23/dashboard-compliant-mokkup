import React, { useState } from 'react';
import {
  FolderGit2,
  FileText,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ComplianceDocument } from '../types';

interface DocumentManagementProps {
  documents: ComplianceDocument[];
  onOpenOcrScanner: () => void;
  onSelectDocument: (doc: ComplianceDocument) => void;
}

export const DocumentManagement: React.FC<DocumentManagementProps> = ({
  documents,
  onOpenOcrScanner,
  onSelectDocument,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<ComplianceDocument | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.taxReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || doc.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || doc.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Document Management Vault
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              OneDrive Synchronized
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Centralized compliance repository integrated with OneDrive, automated OCR indexing, and document audit records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOcrScanner}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload & Run OCR</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, tax ref, company..."
            className="w-full bg-slate-950 border border-slate-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            {['All', 'SARS', 'Academic', 'Consulting'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            {['All', 'COMPLIANT', 'WARNING'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 text-xs rounded transition-all ${
                  selectedStatus === st
                    ? 'bg-slate-800 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'All' ? 'All Status' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document Grid / Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Document</th>
              <th className="py-2.5 px-3">Pillar</th>
              <th className="py-2.5 px-3">Tax / Reg Number</th>
              <th className="py-2.5 px-3">Issue Date</th>
              <th className="py-2.5 px-3">Expiry Date</th>
              <th className="py-2.5 px-3">Confidence</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-medium text-slate-200 max-w-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate pl-5.5">
                    {doc.companyName}
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <span className="text-slate-300 font-medium">{doc.category}</span>
                  <div className="text-[11px] text-slate-500">{doc.subCategory}</div>
                </td>
                <td className="py-2.5 px-3 font-mono text-cyan-300 tabular-nums">
                  {doc.taxReference}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                  {doc.issueDate}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-300 tabular-nums">
                  {doc.expiryDate}
                </td>
                <td className="py-2.5 px-3 font-mono text-emerald-400 tabular-nums">
                  {doc.confidenceScore}%
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
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="text-[11px] text-slate-400 hover:text-slate-200 font-mono"
                      title="Quick Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectDocument(doc)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                    >
                      Inspect OCR
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDocs.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No compliance documents matched the selected criteria.
          </div>
        )}
      </div>

      {/* Quick Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs font-mono text-cyan-400">{previewDoc.category} · {previewDoc.subCategory}</div>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">{previewDoc.title}</h3>
                <div className="text-xs text-slate-400">{previewDoc.companyName}</div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-500 hover:text-slate-300 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-500">Tax Reference / ID</div>
                <div className="font-mono text-cyan-300 mt-0.5 tabular-nums">{previewDoc.taxReference}</div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-500">Reference Number</div>
                <div className="font-mono text-slate-300 mt-0.5 tabular-nums">{previewDoc.referenceNumber}</div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-500">Issue Date</div>
                <div className="font-mono text-slate-300 mt-0.5 tabular-nums">{previewDoc.issueDate}</div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-500">Expiry Date</div>
                <div className="font-mono text-emerald-400 mt-0.5 tabular-nums font-semibold">{previewDoc.expiryDate}</div>
              </div>
            </div>

            {previewDoc.keyClauses && previewDoc.keyClauses.length > 0 && (
              <div className="bg-slate-950/70 p-3 rounded border border-slate-800/80 space-y-1.5 text-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Key Legal Clauses</div>
                {previewDoc.keyClauses.map((clause, i) => (
                  <div key={i} className="text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{clause}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-500 font-mono">
                Verified: {previewDoc.verifiedAt} by {previewDoc.verifiedBy}
              </span>
              <button
                onClick={() => {
                  onSelectDocument(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-3 py-1.5 bg-cyan-400 text-slate-950 rounded font-semibold hover:bg-cyan-300"
              >
                Open in OCR Scanner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
