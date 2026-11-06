import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  FileText,
  Play,
  RotateCw,
  Hash,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { AuditHistoryEntry } from '../types';

const INITIAL_AUDIT_HISTORY: AuditHistoryEntry[] = [
  {
    id: 'AUD-2026-1106-01',
    timestamp: '06 Nov 2026 09:14:22',
    rawDate: '2026-11-06T09:14:22',
    auditTitle: 'Automated SARS TCS eFiling Good Standing Verification',
    auditType: 'SARS TCS Gateway',
    gateOrPillar: 'Gate 08 · SARS Compliance',
    status: 'PASSED',
    automatedOutcomes:
      'Verified Tax Reference 9012847192 & PIN 98234821A8 against SARS eFiling gateway. Confirmed zero outstanding returns or debt. Sub-accounts verified: Income Tax (OK), VAT 201 (OK), PAYE EMP201 (OK). Official SARS verification token issued.',
    itemsAudited: 4,
    passedItems: 4,
    failedItems: 0,
    durationMs: 1420,
    executedBy: 'Playwright Headless Agent (SARS-EFILING-NODE-04)',
    evidenceHash: 'c4ca4238a0b923820dcc509a6f75849b202611060914',
    details: {
      summary: 'Bi-monthly tax compliance gateway query cleared without non-compliance.',
      keyFindings: [
        'Tax Compliance Status (TCS) valid until 01/10/2027',
        'VAT Category B returns fully reconciled for current cycle',
        'EMP201 payroll statement of account reflects zero balance owing',
      ],
      actionItems: ['Archived digitally signed certificate to Google Drive / Compliance / Company.'],
    },
  },
  {
    id: 'AUD-2026-1105-02',
    timestamp: '05 Nov 2026 16:45:10',
    rawDate: '2026-11-05T16:45:10',
    auditTitle: 'Gate 07 EISA Examination Venue & Staffing Inspection',
    auditType: 'EISA Venue & Staffing',
    gateOrPillar: 'Gate 07 · QCTO Pillar',
    status: 'CRITICAL NON-COMPLIANCE',
    automatedOutcomes:
      'Scored 16 exam room & staffing invariants for 25 Nov session. Failed 3 critical criteria: only 1 of 2 required invigilators confirmed for Room 1, directional signage missing in entrance lobby, and wall clock battery depleted. Automated hard-block placed on exam clearance.',
    itemsAudited: 16,
    passedItems: 13,
    failedItems: 3,
    durationMs: 2180,
    executedBy: 'ComplianceOS Gate Engine & QAC Auditor',
    evidenceHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b',
    details: {
      summary: 'QCTO Examination Centre readiness blocked pending staffing backfill and venue equipment fixes.',
      keyFindings: [
        'Invigilator staffing ratio is 1 of 2 required (Thabo Mokoena confirmed, 2nd invigilator unassigned)',
        'Directional signs from main entrance to exam room and restrooms unposted',
        'Analogue wall clock stopped in Training Room 1',
      ],
      actionItems: [
        'QAC Lead (Phyllis Muthombeni) to appoint 2nd invigilator by 12 Nov 2026',
        'Ops Lead to replace wall clock battery and install laminated signage',
      ],
    },
  },
  {
    id: 'AUD-2026-1104-03',
    timestamp: '04 Nov 2026 11:20:00',
    rawDate: '2026-11-04T11:20:00',
    auditTitle: 'Gate 04 QCTO Monitoring Visit Dossier Pre-Audit',
    auditType: 'QCTO Monitoring',
    gateOrPillar: 'Gate 04 · QCTO Pillar',
    status: 'ACTION REQUIRED',
    automatedOutcomes:
      'Compiled 8-part monitoring pack for Cohort MWX-DEV-2026-Q1 prior to window opening (due in 4 days). Identified 2 defects: workplace mentor signature missing on induction minutes; 2 learner IDs certified older than 3 months. Dossier readiness scored at 91.3%.',
    itemsAudited: 23,
    passedItems: 21,
    failedItems: 2,
    durationMs: 1850,
    executedBy: 'Tesseract OCR + PyMuPDF Batch Evaluator',
    evidenceHash: '7d89f81a7b6e92c4819d42f9b8c19a0220261104',
    details: {
      summary: 'Automated 2-week early warning triggered to resolve missing documentation before QCTO evaluators arrive.',
      keyFindings: [
        'Meeting minutes for 18 Feb induction missing mentor electronic signature',
        '2 learner IDs have police stamps dated 14 July 2026 (exceeding 3-month validity limit)',
      ],
      actionItems: [
        'Dispatched automated deficiency alerts to learners Kabelo Ndlovu and Sibusiso Khumalo',
        'Requested DocuSign sign-off from workplace mentor',
      ],
    },
  },
  {
    id: 'AUD-2026-1103-04',
    timestamp: '03 Nov 2026 08:30:15',
    rawDate: '2026-11-03T08:30:15',
    auditTitle: 'Master Document Register 3-Month Expiry & Risk Scan',
    auditType: 'CIPC & COIDA Governance',
    gateOrPillar: 'Master Register · Knowledge Base',
    status: 'ACTION REQUIRED',
    automatedOutcomes:
      'Evaluated all 25 statutory compliance artifacts against expiry rules. Flagged: COIDA Letter of Good Standing expires in 27 days (30/11/2026); bank confirmation letter and Director ID renewals due in 14 days (3-month renewal cycle). Generated automated calendar reminders.',
    itemsAudited: 25,
    passedItems: 23,
    failedItems: 2,
    durationMs: 1120,
    executedBy: 'Automated Expiry Monitor (Google Apps Script + RPA)',
    evidenceHash: '8f14e45fceea167a5a36dedd4bea254320261103',
    details: {
      summary: 'Daily scheduled risk scan flagged 2 upcoming renewals within the 30-day escalation window.',
      keyFindings: [
        'Compensation Fund (COIDA) assessment return required before 30 Nov 2026',
        'Director certified IDs and bank letter require quarterly refresh for tender standing',
      ],
      actionItems: [
        'Tender & Procurement Administrator queued COIDA return submission with HR',
      ],
    },
  },
  {
    id: 'AUD-2026-1101-05',
    timestamp: '01 Nov 2026 14:05:44',
    rawDate: '2026-11-01T14:05:44',
    auditTitle: 'Gate 05 MICT SETA Course Verification & PoE Audit',
    auditType: 'MICT SETA Verification',
    gateOrPillar: 'Gate 05 · MICT SETA',
    status: 'PASSED',
    automatedOutcomes:
      'Verified assessor report, moderation report, and 10% learner sample Portfolios of Evidence (PoEs) for Cohort 2026-Q1. Statement of Results (SoR) sheet matched credit allocations across all 24 learners. External verification site visit cleared with moderator.',
    itemsAudited: 48,
    passedItems: 48,
    failedItems: 0,
    durationMs: 3100,
    executedBy: 'ComplianceOS Verification Engine + SETA Bot',
    evidenceHash: '1f83820dcc509a6f75849b1a7b6e92c420261101',
    details: {
      summary: 'Formative and summative assessment records 100% complete. Site visit application submitted.',
      keyFindings: [
        'Assessor Dr. Bongani Sithole (Reg #ASS-8819) valid on SETA register',
        'Moderator Elize Groenewald (Reg #MOD-4412) confirmed for site visit',
        '100% of required module unit standards credited on draft SoRs',
      ],
      actionItems: ['Site visit scheduled for 18 November 2026.'],
    },
  },
  {
    id: 'AUD-2026-1028-06',
    timestamp: '28 Oct 2026 10:12:00',
    rawDate: '2026-10-28T10:12:00',
    auditTitle: 'Gate 09 B-BBEE Skills Development Spend & Stipend Reconcile',
    auditType: 'B-BBEE Evidence Audit',
    gateOrPillar: 'Gate 09 · B-BBEE Pillar',
    status: 'PASSED',
    automatedOutcomes:
      'Reconciled October monthly stipend bank proof (R6,500/learner) against payroll registers for 24 enrolled learners. Verified disability medical documentation for 2 candidates. Updated WSP/ATR reconciliation feed for client B-BBEE portal.',
    itemsAudited: 55,
    passedItems: 55,
    failedItems: 0,
    durationMs: 2450,
    executedBy: 'B-BBEE Reconciliation Agent + Banking Parser',
    evidenceHash: '4b43b0aee35624cd95b910189b3dc23120261028',
    details: {
      summary: 'October 2026 payroll declarations balanced with zero stipend deductions or audit claims discrepancies.',
      keyFindings: [
        '51.2% Black ownership and Skills Development bonus thresholds confirmed',
        '100% of stipend payment confirmations filed in Google Drive',
      ],
      actionItems: ['Exported monthly verification certificate for Standard Bank client audit.'],
    },
  },
  {
    id: 'AUD-2026-1020-07',
    timestamp: '20 Oct 2026 15:30:00',
    rawDate: '2026-10-20T15:30:00',
    auditTitle: 'CIPC Enterprise & BizPortal Annual Return Statutory Check',
    auditType: 'CIPC & COIDA Governance',
    gateOrPillar: 'Gate 08 · Consulting Governance',
    status: 'PASSED',
    automatedOutcomes:
      'Checked CIPC BizPortal registry for Mindworx Consulting (Pty) Ltd (2014/192847/07). Status confirmed as IN BUSINESS. Active directors confirmed with zero disqualifications. Latest annual return receipt #AR-2026-99214 verified current.',
    itemsAudited: 6,
    passedItems: 6,
    failedItems: 0,
    durationMs: 1680,
    executedBy: 'Playwright CIPC Bot',
    evidenceHash: '9e3669d19b675bd57058fd4664205d2a20261020',
    details: {
      summary: 'Companies Act 71 of 2008 corporate enterprise compliance in Good Standing.',
      keyFindings: [
        'Enterprise status: In Business (CoR 14.3 current)',
        'Annual returns up to date through 2026/2027 filing period',
      ],
      actionItems: ['Scheduled next CIPC verification check for 20 Jan 2027.'],
    },
  },
  {
    id: 'AUD-2026-1014-08',
    timestamp: '14 Oct 2026 09:00:00',
    rawDate: '2026-10-14T09:00:00',
    auditTitle: 'Phyllis Muthombeni ComplianceOS Baseline & QAC Process Mapping',
    auditType: 'QCTO Monitoring',
    gateOrPillar: 'Baseline Specification · QAC Core',
    status: 'PASSED',
    automatedOutcomes:
      'Initial baseline audit mapped by Phyllis Muthombeni. Enacted the 9 Automated Gates, Master Document Register rules, 3-month certified ID limits, 90d/30d assessor registration cycles, and the 4-part audit reporting framework approved by Managing Director Martin Pienaar.',
    itemsAudited: 120,
    passedItems: 118,
    failedItems: 2,
    durationMs: 4200,
    executedBy: 'ComplianceOS Architecture Engine (Lead: Phyllis Muthombeni)',
    evidenceHash: '0ccd44c5a9182374b892184719201014090000',
    details: {
      summary: 'Foundation baseline establishing automated gate-driven checks so mistakes stop reaching SETA, QCTO and EISA evaluators.',
      keyFindings: [
        'Established the 9 gates covering every QAC procedure',
        'Mandated 3-month certification validity check for South African IDs',
        'Defined RACI division of labor between agent, officer, and executive leadership',
      ],
      actionItems: ['Configured automated Google Drive and Sheets audit sync.'],
    },
  },
];

export const AuditHistory: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditHistoryEntry[]>(INITIAL_AUDIT_HISTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [expandedRowId, setExpandedRowId] = useState<string | null>('AUD-2026-1106-01');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter & Search Logic
  const filteredLogs = auditLogs
    .filter((log) => {
      const matchesSearch =
        log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.auditTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.automatedOutcomes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.executedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.gateOrPillar.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
      const matchesType = typeFilter === 'All' || log.auditType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.rawDate).getTime();
      const dateB = new Date(b.rawDate).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  // Calculate Metrics
  const totalAudits = auditLogs.length;
  const passedAudits = auditLogs.filter((l) => l.status === 'PASSED').length;
  const actionRequiredAudits = auditLogs.filter((l) => l.status === 'ACTION REQUIRED').length;
  const criticalAudits = auditLogs.filter((l) => l.status === 'CRITICAL NON-COMPLIANCE').length;
  const passRate = Math.round((passedAudits / (totalAudits || 1)) * 100);

  // Trigger New Live Chronological Audit Entry
  const handleTriggerLiveAudit = () => {
    setIsRunningAudit(true);
    setActionNotice('Dispatching ComplianceOS Gate Agents across all 9 gates...');

    setTimeout(() => {
      const now = new Date();
      const timestampStr = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) + ' ' + now.toLocaleTimeString('en-ZA', { hour12: false });

      const newAudit: AuditHistoryEntry = {
        id: `AUD-2026-${Date.now().toString().slice(-6)}`,
        timestamp: timestampStr,
        rawDate: now.toISOString(),
        auditTitle: 'On-Demand Comprehensive 9-Gate Compliance Audit',
        auditType: 'QCTO Monitoring',
        gateOrPillar: 'Gates 01 - 09 · Master Evaluation',
        status: 'ACTION REQUIRED',
        automatedOutcomes:
          'Automated gate probe completed across 77 active learners and 25 statutory documents. Re-confirmed SARS Good Standing and SITA RFB 1183 tier-1 accreditation. Flagged Gate 07 EISA staffing invariant (second invigilator required) and 2 learner IDs pending fresh police certification stamps.',
        itemsAudited: 86,
        passedItems: 83,
        failedItems: 3,
        durationMs: 1980,
        executedBy: 'ComplianceOS Master Engine & Playwright Gateway',
        evidenceHash: `sha256-${Math.random().toString(36).substring(2, 15)}`,
        details: {
          summary: 'On-demand full-spectrum verification executed. Gate clearance score updated to 96.5%.',
          keyFindings: [
            'All statutory company and tax documents active and verified with SARS & CIPC',
            'Cohort 2026-Q1 QCTO visit preparation file 91.3% complete',
            'Gate 07 examination centre clearance blocked pending second invigilator appointment',
          ],
          actionItems: [
            'Phyllis Muthombeni to approve second invigilator contract',
            'Onboarding team to collect certified IDs from 2 candidates',
          ],
        },
      };

      setAuditLogs((prev) => [newAudit, ...prev]);
      setExpandedRowId(newAudit.id);
      setIsRunningAudit(false);
      setActionNotice(`New audit logged: ${newAudit.id} with automated outcome analysis.`);
      setTimeout(() => setActionNotice(null), 4000);
    }, 1200);
  };

  // Export Chronological Log as JSON or CSV
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Mindworx_Compliance_Audit_History_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Compliance Audit Chronological Log & Outcome History
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable, time-stamped record of all automated gate evaluations, SARS eFiling checks, SETA verifications, and external audit milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-600 rounded transition-colors"
            title="Export Audit History to JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Log</span>
          </button>

          <button
            onClick={handleTriggerLiveAudit}
            disabled={isRunningAudit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors shadow-sm"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRunningAudit ? 'animate-spin' : ''}`} />
            <span>{isRunningAudit ? 'Executing Audit...' : 'Run On-Demand Audit'}</span>
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-800 rounded-lg text-xs text-cyan-200 flex items-center justify-between animate-fade-in font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-cyan-400 hover:text-white">✕</button>
        </div>
      )}

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Total Audits Logged
          </div>
          <div className="text-xl font-bold text-white font-mono mt-0.5 tabular-nums">
            {totalAudits} Events
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Chronological trail active</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Automated Pass Rate
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5 tabular-nums">
            {passRate}%
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">{passedAudits} of {totalAudits} passed</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Action Required
          </div>
          <div className="text-xl font-bold text-amber-400 font-mono mt-0.5 tabular-nums">
            {actionRequiredAudits} Events
          </div>
          <div className="text-[11px] text-amber-400/80 mt-0.5">Remediation in progress</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Critical Non-Compliance
          </div>
          <div className="text-xl font-bold text-rose-400 font-mono mt-0.5 tabular-nums">
            {criticalAudits} Event
          </div>
          <div className="text-[11px] text-rose-400/80 mt-0.5">Gate 07 invariant block</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-slate-900/70 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="relative w-full lg:w-72">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reference, outcome, agent..."
            className="w-full bg-slate-950 border border-slate-700 rounded-md pl-8 pr-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400 font-sans"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            <span className="text-[11px] text-slate-500 font-mono px-1">Status:</span>
            {['All', 'PASSED', 'ACTION REQUIRED', 'CRITICAL NON-COMPLIANCE'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  statusFilter === st
                    ? 'bg-slate-800 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'CRITICAL NON-COMPLIANCE' ? 'Critical' : st === 'ACTION REQUIRED' ? 'Action' : st}
              </button>
            ))}
          </div>

          {/* Audit Type Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            <span className="text-[11px] text-slate-500 font-mono px-1">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-slate-300 text-[11px] focus:outline-none cursor-pointer pr-1"
            >
              <option value="All" className="bg-slate-950 text-slate-300">All Audit Types</option>
              <option value="SARS TCS Gateway" className="bg-slate-950 text-slate-300">SARS TCS Gateway</option>
              <option value="QCTO Monitoring" className="bg-slate-950 text-slate-300">QCTO Monitoring</option>
              <option value="MICT SETA Verification" className="bg-slate-950 text-slate-300">MICT SETA Verification</option>
              <option value="EISA Venue & Staffing" className="bg-slate-950 text-slate-300">EISA Venue & Staffing</option>
              <option value="CIPC & COIDA Governance" className="bg-slate-950 text-slate-300">CIPC & COIDA Governance</option>
              <option value="B-BBEE Evidence Audit" className="bg-slate-950 text-slate-300">B-BBEE Evidence Audit</option>
            </select>
          </div>

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-slate-300 hover:text-white font-mono text-[11px]"
            title="Toggle chronological sorting"
          >
            <ArrowUpDown className="w-3 h-3 text-cyan-400" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>
      </div>

      {/* Chronological Audit Log Feed / Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60 shadow-inner">
        <div className="divide-y divide-slate-800/80">
          {filteredLogs.map((log) => {
            const isExpanded = expandedRowId === log.id;

            let statusBadge = 'text-emerald-400 bg-emerald-950/70 border-emerald-800/80';
            let statusIcon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;

            if (log.status === 'ACTION REQUIRED') {
              statusBadge = 'text-amber-300 bg-amber-950/70 border-amber-800/80';
              statusIcon = <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
            } else if (log.status === 'CRITICAL NON-COMPLIANCE') {
              statusBadge = 'text-rose-300 bg-rose-950/70 border-rose-800/80 animate-pulse';
              statusIcon = <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
            }

            return (
              <div
                key={log.id}
                className={`transition-colors ${
                  isExpanded ? 'bg-slate-900/90' : 'hover:bg-slate-850/50'
                }`}
              >
                {/* Main Row */}
                <div
                  onClick={() => setExpandedRowId(isExpanded ? null : log.id)}
                  className="p-4 flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] text-cyan-400 font-semibold">
                        {log.id}
                      </span>
                      <span className="text-slate-600 font-mono">·</span>
                      <span className="font-mono text-[11px] text-slate-400 tabular-nums flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {log.timestamp}
                      </span>
                      <span className="text-slate-600 font-mono">·</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {log.gateOrPillar}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                      <span>{log.auditTitle}</span>
                    </div>

                    {/* Automated Outcomes Summary */}
                    <p className="text-xs text-slate-300 leading-relaxed max-w-4xl pt-0.5">
                      {log.automatedOutcomes}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-end justify-between md:justify-start gap-2 shrink-0">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-semibold border ${statusBadge}`}
                    >
                      {statusIcon}
                      <span>{log.status}</span>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 mt-1">
                      <span>{log.durationMs}ms</span>
                      <span>·</span>
                      <span className="text-slate-400">{log.passedItems}/{log.itemsAudited} Verified</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-400 ml-1" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Outcome & Audit Details Drawer */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-slate-950/70 border-t border-slate-800/80 space-y-3 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                        <div className="text-[10px] uppercase font-mono text-slate-500">Execution Agent</div>
                        <div className="font-semibold text-slate-200 mt-0.5 text-[11px]">{log.executedBy}</div>
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                        <div className="text-[10px] uppercase font-mono text-slate-500">Artifact Verification Scope</div>
                        <div className="font-mono text-slate-200 mt-0.5 text-[11px]">
                          {log.passedItems} passed · {log.failedItems} deficiencies ({log.itemsAudited} total)
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                        <div className="text-[10px] uppercase font-mono text-slate-500">Evidence SHA-256 Hash</div>
                        <div className="font-mono text-cyan-300 mt-0.5 text-[10px] truncate" title={log.evidenceHash}>
                          {log.evidenceHash}
                        </div>
                      </div>
                    </div>

                    {log.details && (
                      <div className="p-3 bg-slate-900/60 rounded border border-slate-800 space-y-2">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                          Automated Audit Findings & Verification Invariants
                        </div>
                        <ul className="space-y-1 text-slate-300">
                          {log.details.keyFindings.map((finding, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-mono mt-0.5">•</span>
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>

                        {log.details.actionItems && log.details.actionItems.length > 0 && (
                          <div className="pt-2 border-t border-slate-800/80">
                            <div className="text-[10px] font-mono text-amber-400 uppercase font-semibold mb-1">
                              Automated Corrective Actions Triggered
                            </div>
                            <ul className="space-y-1 text-slate-300">
                              {log.details.actionItems.map((action, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-amber-400 font-mono mt-0.5">→</span>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No audit history entries found matching your search or filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
