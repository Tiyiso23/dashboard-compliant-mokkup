import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ExternalLink,
  Folder,
  Clock,
  Sparkles,
  Scan,
  AlertCircle,
} from 'lucide-react';
import { MasterRegisterItem, GateComplianceStatus } from '../types';

interface MasterRegisterViewProps {
  items: MasterRegisterItem[];
  onTriggerOcrCheck: (item: MasterRegisterItem) => void;
}

export const MasterRegisterView: React.FC<MasterRegisterViewProps> = ({
  items,
  onTriggerOcrCheck,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGate, setSelectedGate] = useState<string>('All');
  const [selectedTarget, setSelectedTarget] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.validityCheck.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGate =
      selectedGate === 'All' || item.gatesNeeded.includes(Number(selectedGate));

    const matchesTarget =
      selectedTarget === 'All' || item.appliesTo.toLowerCase().includes(selectedTarget.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesGate && matchesTarget && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Folder className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              Master Document Register (ComplianceOS Knowledge Base)
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            The single source of truth mapped by Phyllis Muthombeni: every statutory document, which gates require it, Google Drive location, and expiration countdown.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
          <span className="text-slate-500">Total Tracked:</span>
          <span className="text-cyan-400 font-bold tabular-nums">{items.length} Artifacts</span>
          <span className="text-slate-500">·</span>
          <span className="text-emerald-400 font-bold tabular-nums">
            {items.filter((i) => i.status === 'PASSED').length} Current
          </span>
        </div>
      </div>

      {/* 3-Month Certified ID Alert Banner (Phyllis Rule) */}
      <div className="p-4 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-amber-300">
            Mandatory Validation Rule: 3-Month Limit on Certified ID Copies & Passports
          </div>
          <p className="text-slate-300 leading-relaxed">
            Per the 14 October specification, all certified South African IDs and passports for learners, assessors, and staff must bear an official certification stamp within the last 3 months. Any older stamp is automatically flagged as <strong className="text-rose-400 font-mono">CRITICAL NON-COMPLIANCE</strong> and blocks registration.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-800">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search document name, validity rule, owner..."
            className="w-full bg-slate-950 border border-slate-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Gate Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            <span className="text-[11px] text-slate-500 font-mono px-1">Gate:</span>
            {['All', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGate(g)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedGate === g
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {g === 'All' ? 'All' : `G0${g}`}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            {['All', 'PASSED', 'ACTION REQUIRED', 'CRITICAL NON-COMPLIANCE'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  selectedStatus === st
                    ? 'bg-slate-800 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'CRITICAL NON-COMPLIANCE' ? 'Critical' : st === 'ACTION REQUIRED' ? 'Action' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Master Document Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60 shadow-inner">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Document Title</th>
              <th className="py-2.5 px-3">Applies To</th>
              <th className="py-2.5 px-3">Required At Gates</th>
              <th className="py-2.5 px-3">Validity Check Rule</th>
              <th className="py-2.5 px-3">Expiry / Certified</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredItems.map((item) => {
              let badgeStyle = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
              let icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;

              if (item.status === 'ACTION REQUIRED') {
                badgeStyle = 'text-amber-300 bg-amber-950/60 border-amber-800/80';
                icon = <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
              } else if (item.status === 'CRITICAL NON-COMPLIANCE') {
                badgeStyle = 'text-rose-300 bg-rose-950/60 border-rose-800/80';
                icon = <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
              }

              return (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-200">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.documentName}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate pl-5.5">
                      {item.googleDrivePath}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-slate-300">
                    <span className="font-medium">{item.appliesTo}</span>
                    <div className="text-[10px] text-slate-500 font-mono">{item.owner}</div>
                  </td>

                  <td className="py-2.5 px-3 font-mono">
                    <div className="flex flex-wrap gap-1">
                      {item.gatesNeeded.map((g) => (
                        <span
                          key={g}
                          className="px-1.5 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800 text-[10px]"
                        >
                          G0{g}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-slate-300 max-w-xs">
                    <div>{item.validityCheck}</div>
                    {item.rejectionReason && (
                      <div className="text-[11px] text-rose-400 mt-1 font-mono">
                        ⚠ {item.rejectionReason}
                      </div>
                    )}
                  </td>

                  <td className="py-2.5 px-3 font-mono text-[11px] tabular-nums">
                    {item.expiryDate && item.expiryDate !== 'N/A' ? (
                      <div>
                        <span className="text-slate-300">Exp: {item.expiryDate}</span>
                        {item.daysRemaining !== undefined && (
                          <span
                            className={`block text-[10px] ${
                              item.daysRemaining < 0
                                ? 'text-rose-400 font-bold'
                                : item.daysRemaining <= 30
                                ? 'text-amber-400 font-bold'
                                : 'text-slate-500'
                            }`}
                          >
                            {item.daysRemaining < 0
                              ? `Expired (${Math.abs(item.daysRemaining)}d ago)`
                              : `${item.daysRemaining} days left`}
                          </span>
                        )}
                      </div>
                    ) : item.certifiedDate ? (
                      <span className="text-slate-400">Cert: {item.certifiedDate}</span>
                    ) : (
                      <span className="text-slate-500">Perpetual</span>
                    )}
                  </td>

                  <td className="py-2.5 px-3">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${badgeStyle}`}
                    >
                      {icon}
                      <span>{item.status}</span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onTriggerOcrCheck(item)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                    >
                      Inspect OCR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No registered compliance documents matched the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
