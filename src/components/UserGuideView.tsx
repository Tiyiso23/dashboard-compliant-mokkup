import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Printer,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  LayoutDashboard,
  Sparkles,
  Layers,
  Folder,
  FileCheck,
  GraduationCap,
  Users,
  Bot,
  ShieldCheck,
  Briefcase,
  FolderGit2,
  BarChart3,
  KeyRound,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface UserGuideViewProps {
  onNavigateToTab: (tab: ActiveTab) => void;
}

interface GuideSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  targetTab?: ActiveTab;
  targetTabLabel?: string;
  roles: string[];
  icon: React.ReactNode;
  overview: string;
  steps: {
    heading: string;
    detail: string;
  }[];
  rulesOrTips?: string[];
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'getting-started',
    number: '01',
    title: 'Getting Started & Global Navigation',
    subtitle: 'Top bar controls, hierarchical sidebar, and theme switching',
    targetTab: 'dashboard',
    targetTabLabel: 'Open Master Dashboard',
    roles: ['All Roles', 'Managing Director', 'Compliance Officer', 'QAC Lead'],
    icon: <LayoutDashboard className="w-4 h-4 text-cyan-400" />,
    overview:
      'Mindworx ComplianceOS enforces gate-driven quality assurance so recurring documentation errors never reach MICT SETA, QCTO, SARS, or EISA evaluators. The workspace is organized into a 3-zone Top Bar and a 2-tier Sidebar.',
    steps: [
      {
        heading: 'Top Bar Wordmark & Quick Links',
        detail:
          'Click "MINDWORX COMPLIANCE" at any time to return to the Master Dashboard. Use top navigation links for one-click jumps to Overview, AI Workflow, 9 Automated Gates, Master Register, Audit Packs, EISA Readiness, and OCR & RPA.',
      },
      {
        heading: 'Run Gate Check (Primary Action)',
        detail:
          'Click the cyan "Run Gate Check" button on the top-right to dispatch an automated validation sweep across all 9 compliance gates and monitored documents.',
      },
      {
        heading: 'Sidebar & Theme Toggle',
        detail:
          'Switch between Dark and Light display modes using the Sun/Moon toggle in the Top Bar. Use the Sidebar to move between ComplianceOS Engine modules (top section) and Statutory & Automation Hub tools (bottom section).',
      },
    ],
    rulesOrTips: [
      'Zero Unverified Assumptions Policy: Blurry, unsigned, or expired documents are never marked compliant automatically.',
    ],
  },
  {
    id: 'master-dashboard',
    number: '02',
    title: 'Master Dashboard, Multi-Company Selector & Manual MFA',
    subtitle: 'Academic vs Consulting tabs, RAG status indicators, external bot pings, and dynamic PINs',
    targetTab: 'dashboard',
    targetTabLabel: 'Go to Dashboard Overview',
    roles: ['All Roles', 'Managing Director', 'Compliance Officer'],
    icon: <KeyRound className="w-4 h-4 text-amber-400" />,
    overview:
      'The Master Compliance Dashboard unifies group-wide visibility across Mindworx Consulting (Pty) Ltd, Mindworx Academy (Pty) Ltd, and Mindworx Holdings (Pty) Ltd while isolating Academic and Consulting regulatory tracks.',
    steps: [
      {
        heading: 'Switch Active Company Entity',
        detail:
          'Use the "Active Company Entity" dropdown in the top-right executive card to filter records by All Mindworx Entities, Mindworx Consulting (2014/192847/07), Mindworx Academy (2016/482019/07), or Mindworx Holdings.',
      },
      {
        heading: 'Toggle Academic vs Consulting Tabs',
        detail:
          'Click "Academic Compliance Tab" for MICT SETA tripartite learner contracts, SITA RFB 1183, and learner dossiers; click "Consulting Compliance Tab" for CIPC CoR 14.3, COIDA Good Standing, B-BBEE Level 1, and client MSAs.',
      },
      {
        heading: 'Interpret Green / Yellow / Red Status Indicators',
        detail:
          'Green indicates fully compliant and unexpired documents; Yellow warns of items expiring within 30 days or missing certified stamps; Red highlights expired artifacts or critical gate blockers.',
      },
      {
        heading: 'Trigger External Bot Network Pings',
        detail:
          'Click "Trigger Bot Network Ping" to run Playwright health checks against SARS eFiling, CIPC BizPortal, MICT SETA LMS, SITA, QCTO, and DoL COIDA portals while reconciling Google Shared Drive folder counts.',
      },
      {
        heading: 'Resolve Dynamic Passwords & One-Off PINs (Manual Intervention)',
        detail:
          'When a statutory portal requires an SMS OTP or email verification code (e.g., MICT SETA or COIDA ROE), enter the 4–6 digit PIN in the Manual Intervention Console and click "Submit PIN" to unlock the bot session.',
      },
    ],
  },
  {
    id: 'ai-workflow',
    number: '03',
    title: 'End-to-End AI Compliance Pipeline',
    subtitle: 'OneDrive → OCR → Vertex AI / Gemini → Gate Engine → Human Approval → Dashboard',
    targetTab: 'workflow',
    targetTabLabel: 'Launch AI Workflow',
    roles: ['All Roles', 'Compliance Officer', 'QAC Lead', 'RPA Operator'],
    icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    overview:
      'Demonstrates the complete automated document lifecycle from cloud folder ingestion through Vertex AI classification, gate rule enforcement, human sign-off, and cryptographic dashboard synchronization.',
    steps: [
      {
        heading: 'Select a Queued Document',
        detail:
          'Choose any file from the OneDrive / Google Drive queue (such as Learner Certified ID, SARS TCS Notice, or Assessor Registration Letter) to inspect its pipeline telemetry.',
      },
      {
        heading: 'Run Full Pipeline on Document',
        detail:
          'Click "Run Full Pipeline on Document" to execute Stages 1–6 sequentially: Cloud Ingestion, Tesseract 5.3 + PyMuPDF OCR extraction, Vertex AI (gemini-3.8-flash) classification, and 9-Gate invariant checks.',
      },
      {
        heading: 'Complete Stage 5 Human Approval',
        detail:
          'Enter optional review notes in the Human Approval Gate card and click "Approve File" (which syncs to the Master Register with a SHA-256 hash) or "Reject File" (which queues an automated learner resubmission alert).',
      },
    ],
    rulesOrTips: [
      'Stage 4 enforces the 3-Month Certified ID rule automatically—any SAPS stamp older than 90 days raises a hard block on Gate 01.',
    ],
  },
  {
    id: 'nine-gates',
    number: '04',
    title: 'The 9 Automated Compliance Gates',
    subtitle: 'Hard pre-submission validation rules across QCTO, MICT SETA, Document QA & B-BBEE',
    targetTab: 'compliance-gates',
    targetTabLabel: 'Open 9 Automated Gates',
    roles: ['All Roles', 'QAC Lead', 'Compliance Officer'],
    icon: <Layers className="w-4 h-4 text-cyan-400" />,
    overview:
      'Every QAC procedure mapped on 14 October 2026 is enforced by one of 9 numbered gates. Submissions to MICT SETA, QCTO, and EISA are blocked until their corresponding gate passes.',
    steps: [
      {
        heading: 'Filter by Regulatory Pillar',
        detail:
          'Filter gates by All, QCTO, MICT SETA, Document QA, or B-BBEE using the pillar filter controls.',
      },
      {
        heading: 'Inspect Validation Rules & Blocking Conditions',
        detail:
          'Click any gate card (e.g., Gate 01 Onboarding, Gate 04 QCTO Monitoring Visit, Gate 07 EISA Readiness) to expand its validation rules, system actions, and active blocking conditions.',
      },
      {
        heading: 'Re-Run Gate Validation or Jump to Audit Packs',
        detail:
          'Use the gate validation trigger inside an expanded gate to verify newly uploaded artifacts, or jump straight to the matching Site Visit Audit Pack.',
      },
    ],
  },
  {
    id: 'master-register',
    number: '05',
    title: 'Master Document Register (MDR)',
    subtitle: '25 statutory document classes, Google Drive paths & expiry rules',
    targetTab: 'master-register',
    targetTabLabel: 'Open Master Register',
    roles: ['All Roles', 'Compliance Officer', 'QAC Lead'],
    icon: <Folder className="w-4 h-4 text-cyan-400" />,
    overview:
      'The single source of truth tracking every required company, staff, assessor, venue, and learner document, which gates depend on it, and its exact Google Shared Drive path.',
    steps: [
      {
        heading: 'Search & Filter Statutory Documents',
        detail:
          'Filter the 25-document register by keyword, Gate number (1–9), applicability target (Learners, Assessors, Mindworx, Venue), or status (PASSED, ACTION REQUIRED, CRITICAL NON-COMPLIANCE).',
      },
      {
        heading: 'Trigger Targeted OCR Re-Check',
        detail:
          'Click the OCR verification action on any register row to load that document directly into the OCR Document Scanner for fresh text extraction and date validation.',
      },
    ],
  },
  {
    id: 'audit-packs-cohorts',
    number: '06',
    title: 'Site Visit Audit Packs & Learnership Cohorts',
    subtitle: 'QCTO monitoring packs, MICT SETA verification files & 77-learner cohort tracking',
    targetTab: 'audit-packs',
    targetTabLabel: 'Open Audit Packs',
    roles: ['All Roles', 'QAC Lead', 'Compliance Officer'],
    icon: <FileCheck className="w-4 h-4 text-amber-400" />,
    overview:
      'Automated compilation of inspection-ready folders prior to external evaluator visits, paired with cohort-level progression tracking across all 9 gates.',
    steps: [
      {
        heading: 'Compile Site Visit Audit Packs',
        detail:
          'In Site Visit Audit Packs, select QCTO Monitoring Visit File, MICT SETA Verification File, New Qualification Accreditation Pack, or B-BBEE Evidence Pack. Inspect missing items and click Compile Pack.',
      },
      {
        heading: 'Track Learnership Cohorts & QCTO Windows',
        detail:
          'Open "Learnership Cohorts" in the sidebar to inspect active cohorts (such as MWX-DEV-2026-Q1), confirm assigned assessors/moderators, and monitor the 21-day to 2-month QCTO monitoring countdown.',
      },
    ],
  },
  {
    id: 'eisa-readiness',
    number: '07',
    title: 'Gate 07 · EISA Examination Readiness Scorer',
    subtitle: 'Venue equipment, exam documents & 2-invigilator-per-room enforcement',
    targetTab: 'eisa-readiness',
    targetTabLabel: 'Open EISA Readiness',
    roles: ['All Roles', 'QAC Lead', 'Compliance Officer'],
    icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
    overview:
      'Scores the 16-point examination venue, document, and staffing checklist before any EISA assessment is allowed to begin. Incomplete invigilator ratios trigger a CRITICAL NON-COMPLIANCE hard block.',
    steps: [
      {
        heading: 'Filter by Venue, Documents, or Staff',
        detail:
          'Use category filters to inspect Venue items (laptops, backup power, directional signage), Documents (valid accreditation letter, wall clock, registers), and Staff (2 invigilators per room, chief invigilator, IT support).',
      },
      {
        heading: 'Toggle Verified Checklist Items',
        detail:
          'Click any checklist item once resolved (for example, assigning the 2nd invigilator or replacing a wall clock battery) to recalculate the live Gate 07 readiness score and clear the critical block.',
      },
    ],
  },
  {
    id: 'ocr-rpa',
    number: '08',
    title: 'OCR Document Scanner & RPA Control Panel',
    subtitle: 'Tesseract + PyMuPDF extraction, bounding boxes, and hybrid automation bots',
    targetTab: 'automation-centre',
    targetTabLabel: 'Open OCR & RPA Bots',
    roles: ['All Roles', 'RPA Operator', 'Compliance Officer'],
    icon: <Bot className="w-4 h-4 text-cyan-400" />,
    overview:
      'Provides interactive single-document OCR scanning (with editable fields and bounding boxes) alongside the RPA Control Panel for running batch extraction, SARS checks, expiry scans, and daily metric tracking.',
    steps: [
      {
        heading: 'Scan Uploaded PDFs/Images or Presets',
        detail:
          'Upload a PDF/image via "Upload Document" or select a South African standard preset (SARS TCS, VAT103, EMP201, SITA RFB 1183, Learner Agreement, CIPC CoR 14.3). Toggle OCR Bounding Boxes to inspect confidence scores.',
      },
      {
        heading: 'Edit Extracted Metadata & Save',
        detail:
          'Verify or correct extracted fields in the right-hand table, click "Save to Compliance Records" to add the item to the vault, or click "Verify TCS PIN in SARS Hub" for immediate eFiling verification.',
      },
      {
        heading: 'Run RPA Automation Actions & Review Performance Chart',
        detail:
          'Choose an orchestration approach (Hybrid, Python + Playwright, UiPath, or Power Automate), trigger actions (Run OCR, SARS Verify, Expiry Scan, Website Check, Generate Report, Send Alerts), and inspect daily runs/success/latency metrics in the activity log chart.',
      },
    ],
  },
  {
    id: 'statutory-hubs',
    number: '09',
    title: 'SARS, Academic, Consulting & Document Vault Hubs',
    subtitle: 'Dedicated statutory views, live TCS PIN verification & full document repository',
    targetTab: 'sars',
    targetTabLabel: 'Open SARS Compliance',
    roles: ['All Roles', 'Compliance Officer', 'Managing Director'],
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    overview:
      'Specialized compliance hubs segment regulatory filings across SARS Tax, Academic & SITA, Consulting & CIPC, and the searchable Document Vault.',
    steps: [
      {
        heading: 'Verify a Live SARS TCS PIN',
        detail:
          'Navigate to "SARS Compliance", select the TCS PIN Verification sub-tab, enter the Tax Reference Number and TCS PIN, and run verification to receive an audit token and Income Tax/VAT/PAYE standing breakdown.',
      },
      {
        heading: 'Inspect Academic & Consulting Records',
        detail:
          'Use "Academic & SITA" for learner agreements, SITA RFB 1183, and learner records; use "Consulting & CIPC" for company, employee, and client MSA records.',
      },
      {
        heading: 'Browse the Document Vault',
        detail:
          'Open "Document Vault" to filter every registered artifact across all categories or launch the OCR Scanner directly on any item.',
      },
    ],
  },
  {
    id: 'reports-audit-users',
    number: '10',
    title: 'Reports, Audit History, RACI & User Management',
    subtitle: 'CSV & JSON exports, printable dossiers, chronological audit logs & RBAC',
    targetTab: 'reports',
    targetTabLabel: 'Open Reports & Analytics',
    roles: ['All Roles', 'Managing Director', 'Compliance Officer', 'QAC Lead'],
    icon: <BarChart3 className="w-4 h-4 text-purple-400" />,
    overview:
      'Executive reporting and governance views deliver audit-ready evidence packs, immutable chronological audit logs, RACI accountability tables, and team permissions.',
    steps: [
      {
        heading: 'Export CSV Summary & Printable PDF Dossier',
        detail:
          'In "Reports & Analytics", click "Export Report" to download a CSV summary of all compliance documents, or click "View Full Audit Dossier" → "Print Dossier" for formal audit packs.',
      },
      {
        heading: 'Search & Run Chronological Audits',
        detail:
          'Scroll down in Reports & Analytics to the Audit History log. Filter by status or audit type, expand any row to inspect SHA-256 evidence hashes and NCR findings, click "Run On-Demand Audit", or click "Export Log" (JSON).',
      },
      {
        heading: 'Review RACI Matrix & Manage Users',
        detail:
          'Open "RACI Governance" to confirm Responsible/Accountable/Consulted/Informed roles across QAC procedures, and open "User Management" to inspect or administer team access.',
      },
    ],
  },
];

const EXPIRY_RULES_SUMMARY = [
  { item: 'SDP / Provider Accreditation', firstAlert: '12 months before', escalation: '6 months, then 90 days', onExpiry: 'Block new cohorts & site visits' },
  { item: 'Assessor / Moderator Reg (3-Yr)', firstAlert: '90 days before', escalation: '30 days before', onExpiry: 'Block PoE sign-off & moderation' },
  { item: 'Mindworx SLAs, Leases, Insurance & OHS', firstAlert: '60 days before', escalation: '30 days, then every 2 days', onExpiry: 'Block allocation / mark pack incomplete' },
  { item: 'Certified Learner IDs (3-Mo Rule)', firstAlert: 'At upload', escalation: 'Immediate flag', onExpiry: 'Reject & request fresh certification' },
  { item: 'QCTO Monitoring Window (21d–2mo)', firstAlert: 'At registration date', escalation: '2 weeks before window opens', onExpiry: 'Escalate gaps to QAC Lead' },
];

export const UserGuideView: React.FC<UserGuideViewProps> = ({ onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All Roles');
  const [activeSectionId, setActiveSectionId] = useState<string>('getting-started');

  const roles = ['All Roles', 'Compliance Officer', 'QAC Lead', 'Managing Director', 'RPA Operator'];

  const filteredSections = GUIDE_SECTIONS.filter((sec) => {
    const matchesRole = selectedRole === 'All Roles' || sec.roles.includes(selectedRole);
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      sec.title.toLowerCase().includes(q) ||
      sec.subtitle.toLowerCase().includes(q) ||
      sec.overview.toLowerCase().includes(q) ||
      sec.steps.some(
        (st) => st.heading.toLowerCase().includes(q) || st.detail.toLowerCase().includes(q)
      );
    return matchesRole && matchesSearch;
  });

  const handleDownloadGuideMarkdown = () => {
    const lines: string[] = [
      '# Mindworx ComplianceOS — User Guide',
      `Generated: ${new Date().toISOString().slice(0, 10)}`,
      '',
      ...GUIDE_SECTIONS.flatMap((sec) => [
        `## ${sec.number}. ${sec.title}`,
        `_${sec.subtitle}_`,
        '',
        sec.overview,
        '',
        ...sec.steps.map((s, idx) => `${idx + 1}. **${s.heading}:** ${s.detail}`),
        '',
      ]),
      '## Expiry & Risk Escalation Thresholds',
      '| Compliance Item | First Alert | Escalation | On Expiry |',
      '|---|---|---|---|',
      ...EXPIRY_RULES_SUMMARY.map(
        (r) => `| ${r.item} | ${r.firstAlert} | ${r.escalation} | ${r.onExpiry} |`
      ),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mindworx_ComplianceOS_User_Guide_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              ComplianceOS Operational Manual · v1.0
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Mindworx ComplianceOS User Guide
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Step-by-step handbook covering every dashboard view, automated compliance gate, OCR/Vertex AI workflow pipeline, external bot ping console, dynamic PIN intervention, and audit export.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Handbook</span>
          </button>
          <button
            onClick={handleDownloadGuideMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download User Guide (.md)</span>
          </button>
        </div>
      </div>

      {/* Search & Role Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-slate-900/70 p-3.5 rounded-lg border border-slate-800">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guide (e.g., EISA, PIN, CSV, Gate 01, OCR)..."
            className="w-full bg-slate-950 border border-slate-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-500 uppercase mr-1">Role Filter:</span>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                selectedRole === role
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Sticky Table of Contents (Left) + Detailed Modules (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table of Contents */}
        <aside className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-lg p-4 space-y-2 lg:sticky lg:top-20">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold pb-2 border-b border-slate-800">
            Table of Contents ({filteredSections.length} Chapters)
          </div>
          <nav className="space-y-1">
            {filteredSections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#guide-${sec.id}`}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`flex items-center justify-between p-2 rounded-md text-xs transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] text-cyan-400 shrink-0 tabular-nums">
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                </a>
              );
            })}
          </nav>

          {/* Status Legend Quick Reference */}
          <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Status Indicator Legend
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Green / PASSED — Verified & current</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Yellow / ACTION REQUIRED — Renewal due</span>
              </div>
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Red / CRITICAL — Hard block active</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Detailed Walkthrough Chapters */}
        <div className="lg:col-span-8 space-y-5">
          {filteredSections.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-400">
              No guide chapters match "{searchQuery}" for role "{selectedRole}".
            </div>
          ) : (
            filteredSections.map((sec) => (
              <section
                id={`guide-${sec.id}`}
                key={sec.id}
                className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4 scroll-mt-24"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 tabular-nums">
                        CHAPTER {sec.number}
                      </span>
                      {sec.icon}
                      <h2 className="text-base font-bold text-white">{sec.title}</h2>
                    </div>
                    <p className="text-xs text-slate-400">{sec.subtitle}</p>
                  </div>

                  {sec.targetTab && sec.targetTabLabel && (
                    <button
                      onClick={() => onNavigateToTab(sec.targetTab!)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-800 rounded-md transition-colors shrink-0"
                    >
                      <span>{sec.targetTabLabel}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{sec.overview}</p>

                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Step-by-Step Instructions
                  </div>
                  <ol className="space-y-2.5">
                    {sec.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="p-3 bg-slate-950/80 border border-slate-800/90 rounded-lg flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                          {idx + 1}
                        </span>
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-slate-100">{step.heading}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{step.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {sec.rulesOrTips && sec.rulesOrTips.length > 0 && (
                  <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg space-y-1">
                    {sec.rulesOrTips.map((tip, i) => (
                      <div key={i} className="text-xs text-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))
          )}

          {/* Automated Expiry & Escalation Reference Table */}
          <section className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">
                Reference: Automated Expiry & Escalation Rules
              </h2>
            </div>
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Statutory Item</th>
                    <th className="py-2.5 px-3">First Alert</th>
                    <th className="py-2.5 px-3">Escalation Cadence</th>
                    <th className="py-2.5 px-3">System Action on Expiry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                  {EXPIRY_RULES_SUMMARY.map((rule) => (
                    <tr key={rule.item} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">{rule.item}</td>
                      <td className="py-2.5 px-3 font-mono text-cyan-300">{rule.firstAlert}</td>
                      <td className="py-2.5 px-3 font-mono text-amber-300">{rule.escalation}</td>
                      <td className="py-2.5 px-3 text-rose-300">{rule.onExpiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
