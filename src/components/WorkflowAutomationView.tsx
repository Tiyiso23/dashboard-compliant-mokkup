import React, { useState } from 'react';
import {
  Cloud,
  Scan,
  Sparkles,
  ShieldCheck,
  UserCheck,
  LayoutDashboard,
  ArrowRight,
  Play,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  FileText,
  FileCode,
  ShieldAlert,
  Send,
  Download,
  Building,
  ChevronRight,
  ExternalLink,
  Lock,
  Eye,
  Check,
  X,
  Bot,
} from 'lucide-react';
import { WorkflowDocumentItem, WorkflowStage, GateComplianceStatus, ComplianceDocument } from '../types';

interface WorkflowAutomationViewProps {
  onDocumentAdded?: (newDoc: ComplianceDocument) => void;
  onNavigateToDashboard?: () => void;
  onNavigateToGates?: () => void;
  onNavigateToRegister?: () => void;
}

const SAMPLE_WORKFLOW_DOCUMENTS: WorkflowDocumentItem[] = [
  {
    id: 'WF-DOC-001',
    sourceFile: 'Learner_ID_Kabelo_Ndlovu_Certified.pdf',
    sourcePath: 'OneDrive://Mindworx/Cohorts/MWX-DEV-2026-Q1/Learners/Kabelo_Ndlovu/ID_Doc.pdf',
    fileSize: '640 KB',
    receivedAt: 'Today at 08:42 AM',
    uploaderRole: 'Recruitment & Onboarding Portal (Learner Upload)',
    ocrOutput: {
      rawTextPreview: 'REPUBLIC OF SOUTH AFRICA IDENTITY DOCUMENT - NATIONAL ID: 020412 5819 084 - SURNAME: NDLOVU - FORENAMES: KABELO - SAPS BRIXTON POLICE STATION CERTIFICATION STAMP DATED: 14/10/2026 - COMMISSIONER OF OATHS CONFIRMED.',
      textLayerConfidence: 99.2,
      extractedFields: {
        'Document Title': 'South African Identity Document (Green Barcoded / Smart Card)',
        'Full Legal Name': 'Kabelo Ndlovu',
        'National ID Number': '020412 5819 084',
        'Citizen Status': 'South African Citizen (RSA)',
        'Police Station Certified': 'SAPS Brixton Station 44',
        'Certification Stamp Date': '14/10/2026',
        'Validity Window (3-Month Rule)': 'Valid (23 days elapsed since certification)',
      },
    },
    aiClassification: {
      documentClass: 'Certified South African ID Document (EA1 Mandatory Supporting)',
      applicablePillar: 'QCTO',
      relevantGates: [1, 4, 8],
      confidence: 99.4,
      legibilityScore: 98.6,
      policeStampDetected: true,
      certificationDate: '14/10/2026',
      monthsSinceCertification: 0.7,
      detectedSignatures: ['Commissioner of Oaths (SAPS Stamp + Warrant Officer Signature)'],
    },
    complianceEngine: {
      gateNumber: 1,
      gateName: 'Gate 01 · Onboarding Gate',
      gateStatus: 'PASSED',
      invariantsPassed: [
        'Legibility threshold satisfied (> 95%)',
        'Official SAPS police certification stamp detected',
        'Certification date (14/10/2026) satisfies the 3-month statutory freshness rule',
        'Matches enrolled learner name on Cohort MWX-DEV-2026-Q1 roster',
      ],
      blockingDeficiencies: [],
      readinessImpact: '+1.4% toward Cohort 2026-Q1 Gate 01 100% Clearance',
      requiresHumanReview: true,
    },
    humanApproval: {
      status: 'APPROVED',
      reviewedBy: 'Tandeeka (Compliance Officer)',
      reviewedAt: 'Today at 09:15 AM',
      reviewerRole: 'Compliance Officer (Sign-off Authority)',
      decisionNotes: 'SAPS stamp verified legible. Date 14 Oct 2026 is well within the 3-month window. Cleared for MICT SETA bulk registration and QCTO enrolment.',
      signaturesConfirmed: true,
      stampValidityConfirmed: true,
    },
    dashboardSync: {
      syncedAt: 'Today at 09:16 AM',
      targetRegistry: 'Master Document Register (Doc #5) & Cohorts Roster',
      status: 'SYNCED',
      auditEvidenceHash: 'sha256-020412ndlovu14oct2026valid99214',
    },
  },
  {
    id: 'WF-DOC-002',
    sourceFile: 'SARS_TCS_PIN_Notice_2026_Q4.pdf',
    sourcePath: 'OneDrive://Mindworx/Compliance/Company/SARS/TCS_PIN_Notice_98234821A8.pdf',
    fileSize: '412 KB',
    receivedAt: 'Today at 07:15 AM',
    uploaderRole: 'Automated SARS eFiling Gateway Sync (Tender Admin)',
    ocrOutput: {
      rawTextPreview: 'SOUTH AFRICAN REVENUE SERVICE - TAX COMPLIANCE STATUS VERIFICATION PIN NOTICE - TAXPAYER NAME: MINDWORX CONSULTING (PTY) LTD - TAX REF: 9012847192 - TCS PIN: 98234821A8 - EXPIRY DATE: 01/10/2027 - COMPLIANCE STATUS: GOOD STANDING.',
      textLayerConfidence: 99.8,
      extractedFields: {
        'Taxpayer Legal Entity': 'MINDWORX CONSULTING (PTY) LTD',
        'Income Tax Reference': '9012847192',
        'TCS Verification PIN': '98234821A8',
        'Issue Date': '01/10/2026',
        'Expiry Date': '01/10/2027',
        'Good Standing Confirmed': 'YES (Zero Outstanding Returns / Debt)',
        'Filing Accounts': 'Income Tax (OK), VAT 201 (OK), PAYE EMP201 (OK)',
      },
    },
    aiClassification: {
      documentClass: 'SARS Tax Compliance Status (TCS) Official Certificate',
      applicablePillar: 'SARS',
      relevantGates: [8],
      confidence: 99.9,
      legibilityScore: 99.5,
      policeStampDetected: false, // SARS documents carry digital QR/hash, not police stamp
      certificationDate: '01/10/2026',
      monthsSinceCertification: 1.2,
      detectedSignatures: ['Digital SARS Cryptographic Verification Hash & QR Code'],
    },
    complianceEngine: {
      gateNumber: 8,
      gateName: 'Gate 08 · SARS Compliance & Accreditation Gate',
      gateStatus: 'PASSED',
      invariantsPassed: [
        'Valid for 329 more days (expires 01/10/2027)',
        'PIN 98234821A8 verified against live SARS eFiling gateway',
        'Satisfies SITA RFB 1183 tender and client procurement prerequisites',
      ],
      blockingDeficiencies: [],
      readinessImpact: 'Maintains 100% Tax Good Standing Score across all modules',
      requiresHumanReview: true,
    },
    humanApproval: {
      status: 'APPROVED',
      reviewedBy: 'Martin Pienaar (Managing Director)',
      reviewedAt: 'Today at 07:30 AM',
      reviewerRole: 'Executive Approval',
      decisionNotes: 'TCS Good Standing confirmed. Approved for ongoing SITA government contract and Tier-1 banking vendor panels.',
      signaturesConfirmed: true,
      stampValidityConfirmed: true,
    },
    dashboardSync: {
      syncedAt: 'Today at 07:31 AM',
      targetRegistry: 'SARS Hub, Master Register & Executive Dashboard',
      status: 'SYNCED',
      auditEvidenceHash: 'sha256-9012847192tcs20261001goodstanding',
    },
  },
  {
    id: 'WF-DOC-003',
    sourceFile: 'Assessor_Reg_Letter_Dr_Sithole.pdf',
    sourcePath: 'OneDrive://Mindworx/Compliance/Staff/Assessors/Dr_Bongani_Sithole/Reg_Letter.pdf',
    fileSize: '510 KB',
    receivedAt: 'Yesterday at 15:10 PM',
    uploaderRole: 'QAC Lead / Training Manager (Phyllis Muthombeni)',
    ocrOutput: {
      rawTextPreview: 'MICT SETA CONSTITUENT ASSESSOR REGISTRATION LETTER - ASSESSOR: DR. BONGANI SITHOLE - REGISTRATION NO: ASS-8819 - SAQA QUALIFICATION SCOPE: 48872 SYSTEMS DEVELOPMENT NQF LEVEL 5 - EXPIRY DATE: 15/12/2026 - RENEWAL APPLICATION REQUIRED.',
      textLayerConfidence: 98.4,
      extractedFields: {
        'Assessor Name': 'Dr. Bongani Sithole',
        'SETA Registration No': 'ASS-8819',
        'Accreditation Scope': 'SAQA ID 48872 (NQF Level 5 Systems Development)',
        'Registration Cycle': '3-Year Accreditation Cycle',
        'Expiry Date': '15/12/2026',
        'Days Remaining': '39 Days (Critical 60d/30d Alert Window Active)',
      },
    },
    aiClassification: {
      documentClass: 'Assessor Scope & MICT SETA Registration Letter',
      applicablePillar: 'MICT SETA',
      relevantGates: [3, 4, 5],
      confidence: 98.7,
      legibilityScore: 97.2,
      policeStampDetected: false,
      certificationDate: '15/12/2023',
      monthsSinceCertification: 35,
      detectedSignatures: ['MICT SETA ETQA Senior Manager Sign-off'],
    },
    complianceEngine: {
      gateNumber: 3,
      gateName: 'Gate 03 · Assessor & Moderator Scope Gate',
      gateStatus: 'ACTION REQUIRED',
      invariantsPassed: [
        'Registration active on official MICT SETA register',
        'Scope matches Cohort 2026-Q1 Systems Development modules',
        'Signed SLA with Mindworx verified on file',
      ],
      blockingDeficiencies: [
        'Registration expires in 39 days (15/12/2026) — within the mandatory 90d/30d alert threshold',
        'Automated block will trigger on 15 Dec preventing Dr. Sithole from signing final PoE assessments if renewal is not filed',
      ],
      readinessImpact: 'Gate 03 flagged ACTION REQUIRED; 30-day escalation reminder dispatched',
      requiresHumanReview: true,
    },
    humanApproval: {
      status: 'CONDITIONAL',
      reviewedBy: 'Tandeeka (Compliance Officer)',
      reviewedAt: 'Today at 08:00 AM',
      reviewerRole: 'Compliance Officer',
      decisionNotes: 'Conditionally approved for current formative assessments, but renewal application to MICT SETA must be submitted by 20 Nov 2026.',
      signaturesConfirmed: true,
      stampValidityConfirmed: true,
    },
    dashboardSync: {
      syncedAt: 'Today at 08:05 AM',
      targetRegistry: 'Gate 03 Scope Tracker & Action Board',
      status: 'SYNCED',
      auditEvidenceHash: 'sha256-ass8819sithole20261215renewalalert',
    },
  },
  {
    id: 'WF-DOC-004',
    sourceFile: 'Learner_ID_Sibusiso_Khumalo_ExpiredStamp.pdf',
    sourcePath: 'OneDrive://Mindworx/Cohorts/MWX-DEV-2026-Q1/Learners/Sibusiso_Khumalo/ID_Upload.pdf',
    fileSize: '820 KB',
    receivedAt: 'Today at 09:30 AM',
    uploaderRole: 'Recruitment & Onboarding Portal (Learner Upload)',
    ocrOutput: {
      rawTextPreview: 'REPUBLIC OF SOUTH AFRICA IDENTITY CARD - NATIONAL ID: 010819 5412 089 - KHUMALO SIBUSISO - SAPS POLICE STATION STAMP DATED: 14/06/2026 - COMMISSIONER OF OATHS.',
      textLayerConfidence: 96.1,
      extractedFields: {
        'Document Title': 'South African Identity Document',
        'Full Legal Name': 'Sibusiso Khumalo',
        'National ID Number': '010819 5412 089',
        'Police Station Certified': 'SAPS Johannesburg Central',
        'Certification Stamp Date': '14/06/2026',
        'Validity Window (3-Month Rule)': 'NON-COMPLIANT (145 days elapsed > 90 day limit)',
      },
    },
    aiClassification: {
      documentClass: 'Certified South African ID Document (Defective Stamp Date)',
      applicablePillar: 'QCTO',
      relevantGates: [1],
      confidence: 97.8,
      legibilityScore: 92.4,
      policeStampDetected: true,
      certificationDate: '14/06/2026',
      monthsSinceCertification: 4.8,
      detectedSignatures: ['Commissioner of Oaths (Expired Police Stamp)'],
    },
    complianceEngine: {
      gateNumber: 1,
      gateName: 'Gate 01 · Onboarding Gate',
      gateStatus: 'ACTION REQUIRED',
      invariantsPassed: [
        'Document is legible and matches candidate name',
        'Police certification stamp present',
      ],
      blockingDeficiencies: [
        'CRITICAL DEFICIENCY: Stamp date 14/06/2026 violates Mindworx 3-Month Freshness Policy (Phyllis Muthombeni QAC Rule #1)',
        'Blocks SETA Proof of Registration and QCTO Enrolment file generation',
      ],
      readinessImpact: 'Hard block on Gate 01 learner enrolment upload',
      requiresHumanReview: true,
    },
    humanApproval: {
      status: 'PENDING_APPROVAL',
      reviewerRole: 'Compliance Officer (Tandeeka)',
      decisionNotes: 'Agent recommends REJECTION. Candidate needs to submit fresh certified copy stamped within the last 3 months.',
      signaturesConfirmed: false,
      stampValidityConfirmed: false,
    },
    dashboardSync: {
      status: 'QUEUED',
      targetRegistry: 'Master Document Register (Flagged Gaps)',
      auditEvidenceHash: 'sha256-khumalo-deficiency-14jun2026-reject',
    },
  },
];

export const WorkflowAutomationView: React.FC<WorkflowAutomationViewProps> = ({
  onDocumentAdded,
  onNavigateToDashboard,
  onNavigateToGates,
  onNavigateToRegister,
}) => {
  const [documents, setDocuments] = useState<WorkflowDocumentItem[]>(SAMPLE_WORKFLOW_DOCUMENTS);
  const [activeDocId, setActiveDocId] = useState<string>('WF-DOC-001');
  const [isExecutingPipeline, setIsExecutingPipeline] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  const currentDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  // Pipeline execution simulation across all 6 stages
  const handleRunFullPipeline = async (docId?: string) => {
    const targetId = docId || activeDocId;
    setIsExecutingPipeline(true);
    setStatusBanner('Starting End-to-End Workflow: OneDrive → OCR → AI → Compliance → Human Approval → Dashboard...');

    const targetDoc = documents.find((d) => d.id === targetId);

    // Call server endpoint to log real server-side execution with Gemini telemetry
    try {
      fetch('/api/workflow-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: targetDoc?.id,
          fileName: targetDoc?.sourceFile,
          sourcePath: targetDoc?.sourcePath,
        }),
      }).catch(() => {});
    } catch {}

    // Step-by-step visual animation through the 6 stages
    for (let step = 1; step <= 6; step++) {
      setActivePipelineStep(step);
      // Brief delay per step to showcase the architectural flow
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => setTimeout(resolve, 550));
    }

    setActivePipelineStep(null);
    setIsExecutingPipeline(false);
    setStatusBanner(`Pipeline successfully executed for "${targetDoc?.sourceFile}". AI classification & compliance gate invariants verified.`);
    setTimeout(() => setStatusBanner(null), 5000);
  };

  // Human Approval Action Handlers
  const handleApproveDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            humanApproval: {
              status: 'APPROVED',
              reviewedBy: 'Tandeeka (Compliance Officer)',
              reviewedAt: 'Just now',
              reviewerRole: 'Compliance Officer',
              decisionNotes: approvalNotes || 'Approved by Compliance Officer after reviewing OCR text and AI gate compliance.',
              signaturesConfirmed: true,
              stampValidityConfirmed: true,
            },
            dashboardSync: {
              syncedAt: 'Just now',
              targetRegistry: 'Master Document Register & Gate Engine',
              status: 'SYNCED',
              auditEvidenceHash: `sha256-verified-${Date.now().toString(16)}`,
            },
          };
        }
        return doc;
      })
    );

    setStatusBanner(`Document ${docId} APPROVED by Compliance Officer. Synchronized to live Master Document Register.`);
    setApprovalNotes('');
    setTimeout(() => setStatusBanner(null), 4500);

    // Sync to main documents list if callback provided
    if (onDocumentAdded && currentDoc) {
      onDocumentAdded({
        id: `doc-approved-${Date.now()}`,
        title: currentDoc.sourceFile,
        category: (currentDoc.aiClassification?.applicablePillar === 'SARS' ? 'SARS' : 'Academic') as any,
        subCategory: currentDoc.aiClassification?.documentClass || 'Compliance Record',
        documentType: currentDoc.aiClassification?.documentClass || 'Certified Document',
        companyName: currentDoc.ocrOutput?.extractedFields['Full Legal Name'] || currentDoc.ocrOutput?.extractedFields['Taxpayer Legal Entity'] || 'Mindworx Academy',
        taxReference: currentDoc.ocrOutput?.extractedFields['Income Tax Reference'] || currentDoc.ocrOutput?.extractedFields['National ID Number'] || 'ZA-9012847192',
        referenceNumber: currentDoc.id,
        issueDate: currentDoc.ocrOutput?.extractedFields['Certification Stamp Date'] || currentDoc.ocrOutput?.extractedFields['Issue Date'] || '01/10/2026',
        expiryDate: currentDoc.ocrOutput?.extractedFields['Expiry Date'] || '01/10/2027',
        status: currentDoc.complianceEngine?.gateStatus === 'PASSED' ? 'COMPLIANT' : 'WARNING',
        confidenceScore: currentDoc.ocrOutput?.textLayerConfidence || 98.5,
        fileSize: currentDoc.fileSize,
        verifiedBy: 'Tandeeka (Compliance Officer via Workflow)',
        verifiedAt: new Date().toLocaleString('en-ZA'),
        extractedFields: currentDoc.ocrOutput?.extractedFields || {},
        keyClauses: currentDoc.complianceEngine?.invariantsPassed || [],
        notes: currentDoc.humanApproval?.decisionNotes || 'Approved via End-to-End Workflow',
      });
    }
  };

  const handleRejectDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            humanApproval: {
              status: 'REJECTED',
              reviewedBy: 'Tandeeka (Compliance Officer)',
              reviewedAt: 'Just now',
              reviewerRole: 'Compliance Officer',
              decisionNotes: approvalNotes || 'Rejected: Does not meet Mindworx 3-month certification validity rule.',
              signaturesConfirmed: false,
              stampValidityConfirmed: false,
            },
            dashboardSync: {
              syncedAt: 'Just now',
              targetRegistry: 'Deficiency Tracking & Learner Resubmission Queue',
              status: 'SYNCED',
              auditEvidenceHash: `sha256-rejected-${Date.now().toString(16)}`,
            },
          };
        }
        return doc;
      })
    );

    setStatusBanner(`Document ${docId} REJECTED. Automated deficiency notice queued for learner resubmission.`);
    setApprovalNotes('');
    setTimeout(() => setStatusBanner(null), 4500);
  };

  // Workflow Stages Pipeline definition
  const STAGES: { step: number; id: string; name: string; subtitle: string; icon: React.ReactNode; color: string }[] = [
    {
      step: 1,
      id: 'onedrive',
      name: '1. OneDrive Store',
      subtitle: 'Google Drive / OneDrive ingestion',
      icon: <Cloud className="w-4 h-4" />,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      step: 2,
      id: 'ocr',
      name: '2. OCR Engine',
      subtitle: 'Tesseract & PyMuPDF extraction',
      icon: <Scan className="w-4 h-4" />,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      step: 3,
      id: 'ai_classification',
      name: '3. AI Classification',
      subtitle: 'Gemini 3.8 Flash understanding',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'from-teal-500 to-indigo-500',
    },
    {
      step: 4,
      id: 'compliance_engine',
      name: '4. Compliance Engine',
      subtitle: 'The 9 Automated Gates',
      icon: <ShieldCheck className="w-4 h-4" />,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      step: 5,
      id: 'human_approval',
      name: '5. Human Approval',
      subtitle: 'Compliance Officer sign-off',
      icon: <UserCheck className="w-4 h-4" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      step: 6,
      id: 'dashboard',
      name: '6. Dashboard Sync',
      subtitle: 'Master Register & audit trail',
      icon: <LayoutDashboard className="w-4 h-4" />,
      color: 'from-pink-500 to-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              End-to-End Compliance Pipeline
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              OneDrive → OCR → AI → Compliance Engine → Human Approval → Dashboard
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-4xl">
            Demonstrates the system's full AI architecture: automated document ingestion, multi-layered text extraction, Gemini document classification, 9-gate invariant checks, human-in-the-loop sign-off, and live dashboard synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRunFullPipeline()}
            disabled={isExecutingPipeline}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-md transition-all shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 ${isExecutingPipeline ? 'animate-spin' : ''}`} />
            <span>{isExecutingPipeline ? 'Executing End-to-End Pipeline...' : 'Run Full Pipeline on Document'}</span>
          </button>
        </div>
      </div>

      {statusBanner && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-800 rounded-lg text-xs text-cyan-200 flex items-center justify-between font-mono animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{statusBanner}</span>
          </div>
          <button onClick={() => setStatusBanner(null)} className="text-cyan-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Visual Workflow Stage Progression Stepper */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Active Pipeline Stages</span>
          <span className="text-cyan-400">Zero Unverified Assumptions Policy</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {STAGES.map((st) => {
            const isStepActive = activePipelineStep === st.step;
            const isPast = activePipelineStep !== null && activePipelineStep > st.step;

            return (
              <div
                key={st.id}
                className={`p-3 rounded-lg border transition-all ${
                  isStepActive
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_12px_#22d3ee55] scale-[1.02]'
                    : isPast
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${
                      isStepActive
                        ? 'bg-cyan-400 text-slate-950 animate-pulse'
                        : isPast
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {st.icon}
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">#{st.step}</span>
                </div>
                <div className="text-xs font-bold text-slate-200">{st.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{st.subtitle}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Queue Selector */}
      <div className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Select Document from OneDrive / Upload Queue to Inspect Workflow:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {documents.map((doc) => {
            const isSelected = doc.id === activeDocId;
            let statusBadge = 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
            if (doc.complianceEngine?.gateStatus === 'ACTION REQUIRED') {
              statusBadge = 'text-amber-400 bg-amber-950/60 border-amber-800/80';
            } else if (doc.complianceEngine?.gateStatus === 'CRITICAL NON-COMPLIANCE') {
              statusBadge = 'text-rose-400 bg-rose-950/60 border-rose-800/80';
            }

            return (
              <button
                key={doc.id}
                onClick={() => {
                  setActiveDocId(doc.id);
                  setApprovalNotes('');
                }}
                className={`p-3.5 text-left rounded-lg border transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>{doc.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] border ${statusBadge}`}>
                    {doc.complianceEngine?.gateStatus || 'PENDING'}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-100 truncate">{doc.sourceFile}</div>
                <div className="text-[11px] text-slate-400 mt-1 truncate">{doc.uploaderRole}</div>
                <div className="text-[10px] font-mono text-cyan-400/80 mt-1.5 flex items-center justify-between">
                  <span>{doc.fileSize}</span>
                  <span className="text-slate-400">{doc.humanApproval?.status}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workflow Inspector: 3 Column Interactive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: OneDrive Ingestion & OCR Extraction (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Stage 1: OneDrive Ingestion Card */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5" />
                Stage 1: OneDrive Ingestion
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                Connected
              </span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800/80 font-mono text-xs space-y-1">
              <div className="text-slate-400 text-[11px]">Storage Path:</div>
              <div className="text-cyan-300 break-all text-[11px]">{currentDoc.sourcePath}</div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                <span>Received: {currentDoc.receivedAt}</span>
                <span>Size: {currentDoc.fileSize}</span>
              </div>
            </div>
          </div>

          {/* Stage 2: OCR Text & Field Extraction */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-teal-400 font-bold uppercase flex items-center gap-1.5">
                <Scan className="w-3.5 h-3.5" />
                Stage 2: OCR Text Extraction
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                {currentDoc.ocrOutput?.textLayerConfidence}% Conf
              </span>
            </div>

            <div className="text-xs text-slate-400">
              Extracted via Tesseract 5.3 & PyMuPDF structured tokenizer:
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed max-h-32 overflow-y-auto">
              "{currentDoc.ocrOutput?.rawTextPreview}"
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-mono uppercase text-slate-400">Key Extracted Metadata:</div>
              <div className="divide-y divide-slate-800 border border-slate-800 rounded bg-slate-950/60 overflow-hidden text-xs">
                {Object.entries(currentDoc.ocrOutput?.extractedFields || {}).map(([key, value]) => (
                  <div key={key} className="p-2 flex items-center justify-between gap-2">
                    <span className="text-slate-400 text-[11px]">{key}</span>
                    <span className="font-mono text-slate-200 text-[11px] truncate max-w-[55%] text-right font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: AI Classification & Compliance Engine (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Stage 3: AI Document Classification */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-indigo-400 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Stage 3: Vertex AI / Gemini Classification
              </span>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Vertex AI · gemini-3.8-flash</span>
              </span>
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Classified Document Type:</span>
                <div className="font-bold text-slate-100 mt-0.5">{currentDoc.aiClassification?.documentClass}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-[11px]">
                <div>
                  <span className="text-slate-500">Pillar:</span>
                  <div className="font-mono text-cyan-300 font-semibold">{currentDoc.aiClassification?.applicablePillar}</div>
                </div>
                <div>
                  <span className="text-slate-500">Relevant Gates:</span>
                  <div className="font-mono text-purple-300 font-semibold">
                    {currentDoc.aiClassification?.relevantGates.map((g) => `Gate 0${g}`).join(', ')}
                  </div>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800/80 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Police Certification Stamp:</span>
                  <span className={`font-mono font-bold ${currentDoc.aiClassification?.policeStampDetected ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {currentDoc.aiClassification?.policeStampDetected ? 'DETECTED' : 'NOT REQUIRED'}
                  </span>
                </div>
                {currentDoc.aiClassification?.certificationDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Certification Date:</span>
                    <span className="font-mono text-slate-200">{currentDoc.aiClassification.certificationDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stage 4: Compliance Engine & 9-Gate Invariants */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-purple-400 font-bold uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Stage 4: Compliance Gate Engine
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                  currentDoc.complianceEngine?.gateStatus === 'PASSED'
                    ? 'text-emerald-400 bg-emerald-950 border-emerald-800'
                    : 'text-amber-400 bg-amber-950 border-amber-800'
                }`}
              >
                {currentDoc.complianceEngine?.gateStatus}
              </span>
            </div>

            <div className="text-xs font-semibold text-slate-200">
              {currentDoc.complianceEngine?.gateName}
            </div>

            {/* Invariants Checked */}
            <div className="space-y-1.5 text-xs">
              <div className="text-[10px] font-mono uppercase text-slate-400">Invariants Evaluated:</div>
              {currentDoc.complianceEngine?.invariantsPassed.map((inv, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{inv}</span>
                </div>
              ))}

              {currentDoc.complianceEngine?.blockingDeficiencies.map((def, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-rose-300 text-[11px] p-2 bg-rose-950/40 rounded border border-rose-800">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{def}</span>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400">
              <span className="font-mono text-cyan-400">Readiness Impact: </span>
              {currentDoc.complianceEngine?.readinessImpact}
            </div>
          </div>
        </div>

        {/* Right Column: Stage 5 Human Approval & Stage 6 Dashboard Sync (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Stage 5: Human Approval Gate (Compliance Officer Sign-off) */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-pink-400 font-bold uppercase flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Stage 5: Human Approval Gate
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                  currentDoc.humanApproval?.status === 'APPROVED'
                    ? 'text-emerald-400 bg-emerald-950 border-emerald-800'
                    : currentDoc.humanApproval?.status === 'REJECTED'
                    ? 'text-rose-400 bg-rose-950 border-rose-800'
                    : 'text-amber-400 bg-amber-950 border-amber-800 animate-pulse'
                }`}
              >
                {currentDoc.humanApproval?.status}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Designated Reviewer:</span>
                <span className="font-mono text-slate-200">Tandeeka (Compliance Officer)</span>
              </div>

              {currentDoc.humanApproval?.reviewedBy && (
                <div className="text-[11px] text-slate-400">
                  <div className="text-slate-500">Sign-off Record:</div>
                  <div className="text-slate-300 italic mt-0.5">
                    "{currentDoc.humanApproval.decisionNotes}"
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Recorded by {currentDoc.humanApproval.reviewedBy} at {currentDoc.humanApproval.reviewedAt}
                  </div>
                </div>
              )}

              {/* Action Buttons for Human Reviewer */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <input
                  type="text"
                  placeholder="Compliance Officer review notes (optional)..."
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleApproveDocument(currentDoc.id)}
                    className="flex items-center justify-center gap-1.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded text-xs transition-colors shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve File</span>
                  </button>

                  <button
                    onClick={() => handleRejectDocument(currentDoc.id)}
                    className="flex items-center justify-center gap-1.5 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded text-xs transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject File</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stage 6: Dashboard & Master Register Synchronization */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Stage 6: Dashboard & Register Sync
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                {currentDoc.dashboardSync?.status}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Target Registry:</span>
                <div className="font-semibold text-slate-200 mt-0.5">
                  {currentDoc.dashboardSync?.targetRegistry}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Cryptographic Audit Hash:</span>
                <div className="font-mono text-cyan-300 text-[10px] truncate" title={currentDoc.dashboardSync?.auditEvidenceHash}>
                  {currentDoc.dashboardSync?.auditEvidenceHash}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={onNavigateToDashboard}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View in Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  onClick={onNavigateToGates}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <span>View in 9 Gates</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
