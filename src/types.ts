export type ActiveTab =
  | 'dashboard'
  | 'workflow'
  | 'compliance-gates'
  | 'master-register'
  | 'audit-packs'
  | 'cohorts'
  | 'eisa-readiness'
  | 'raci-matrix'
  | 'sars'
  | 'academic'
  | 'consulting'
  | 'automation-centre'
  | 'documents'
  | 'reports'
  | 'users';

export type SarsSubTab =
  | 'all'
  | 'tax-compliance-status'
  | 'tcs-pin-verification'
  | 'vat-registration'
  | 'paye-registration'
  | 'tax-documentation';

export type AcademicSubTab =
  | 'all'
  | 'learner-agreements'
  | 'sita-registration'
  | 'learner-records';

export type ConsultingSubTab =
  | 'all'
  | 'company-compliance'
  | 'employee-compliance'
  | 'client-compliance';

export type RpaApproach =
  | 'python_playwright'
  | 'uipath'
  | 'power_automate'
  | 'hybrid';

export type ComplianceStatus = 'COMPLIANT' | 'WARNING' | 'EXPIRED' | 'PENDING';

export type GateComplianceStatus = 'PASSED' | 'ACTION REQUIRED' | 'CRITICAL NON-COMPLIANCE';

export type CompanyEntityId = 'all' | 'mwx_consulting' | 'mwx_academy' | 'mwx_holdings';

export interface CompanyEntity {
  id: CompanyEntityId;
  name: string;
  tradingName: string;
  registrationNumber: string;
  taxNumber: string;
  vatNumber?: string;
  payeNumber?: string;
  division: 'Consulting' | 'Academic' | 'Holdings' | 'Consolidated';
  overallStatus: 'COMPLIANT' | 'WARNING' | 'EXPIRED';
  activeDocumentsCount: number;
  expiringIn30DaysCount: number;
  sharedDriveFolder: string;
}

export interface ExternalBotPingTarget {
  id: string;
  name: string;
  portalUrl: string;
  governingBody: 'SARS' | 'CIPC' | 'SITA' | 'MICT SETA' | 'QCTO' | 'Department of Labour';
  targetCompany: string;
  lastPingStatus: 'ONLINE' | 'LATENCY_WARN' | 'OFFLINE';
  lastPingTime: string;
  latencyMs: number;
  monitoredFolder: string;
  verifiedDocuments: number;
  requiresDynamicMfa: boolean;
  mfaType?: 'OTP_SMS' | 'EMAIL_PIN' | 'DYNAMIC_TOKEN' | 'CAPTCHA';
  mfaSessionStatus?: 'VERIFIED' | 'AWAITING_PIN' | 'NONE';
}

export interface DynamicMfaSession {
  sessionId: string;
  targetId: string;
  portalName: string;
  promptMessage: string;
  pinType: 'TCS PIN' | 'One-Time SMS PIN' | 'Email Verification Code' | 'Dynamic Authenticator Token';
  createdAt: string;
  expiresInSeconds: number;
  status: 'PENDING' | 'VERIFIED' | 'EXPIRED';
}

export interface GateDefinition {
  id: number;
  number: string;
  name: string;
  pillar: 'QCTO' | 'MICT SETA' | 'Document QA' | 'B-BBEE';
  status: GateComplianceStatus;
  validationRule: string;
  systemAction: string;
  blockingConditions: string[];
  itemsVerified: number;
  itemsTotal: number;
  readinessScore: number;
  leadOwner: string;
  nextScheduledReview?: string;
  findingsCount: number;
  ncrCount: number;
}

export interface MasterRegisterItem {
  id: string;
  documentName: string;
  appliesTo: string;
  gatesNeeded: number[];
  validityCheck: string;
  certifiedDate?: string;
  expiryDate?: string;
  daysRemaining?: number;
  status: GateComplianceStatus;
  googleDrivePath: string;
  fileSize: string;
  lastCheckedBy: string;
  lastCheckedAt: string;
  owner: string;
  rejectionReason?: string;
}

export interface CohortComplianceRecord {
  id: string;
  code: string;
  name: string;
  qualification: string;
  saqaId: string;
  learnerType: 'Employed' | 'Unemployed' | 'Bank';
  totalLearners: number;
  currentGate: number;
  gateStatuses: Record<number, GateComplianceStatus>;
  qctoWindow: { start: string; end: string; daysRemaining: number };
  eisaDate?: string;
  complianceScore: number;
  missingDocumentsCount: number;
  assignedAssessor: string;
  assignedModerator: string;
  siteVisitModeratorBooked: boolean;
}

export interface EisaChecklistItem {
  id: string;
  category: 'Venue' | 'Documents' | 'Staff';
  item: string;
  requirement: string;
  isCompliant: boolean;
  severity: 'CRITICAL NON-COMPLIANCE' | 'ACTION REQUIRED';
  responsibleRole: string;
  notes: string;
}

export interface NonConformanceReport {
  id: string;
  gateNumber: number;
  gateName: string;
  title: string;
  severity: 'CRITICAL NON-COMPLIANCE' | 'ACTION REQUIRED';
  finding: string;
  rootCause: string;
  correctiveAction: string;
  assignee: string;
  dueDate: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  escalatedTo: string;
}

export interface RaciItem {
  activity: string;
  complianceAgent: 'R' | 'R (drafts)' | 'R (checklist)' | 'C' | 'I';
  complianceOfficer: 'A' | 'R' | 'C' | 'I';
  qacLead: 'C' | 'A' | 'I';
  opsLead: 'I' | 'A' | 'C';
  recruitment: 'C' | '—' | 'I';
}

export interface ComplianceDocument {
  id: string;
  title: string;
  category: 'SARS' | 'Academic' | 'Consulting';
  subCategory: string;
  documentType: string;
  companyName: string;
  taxReference: string;
  referenceNumber: string;
  issueDate: string;
  expiryDate: string;
  status: ComplianceStatus;
  confidenceScore: number;
  fileSize: string;
  verifiedBy: string;
  verifiedAt: string;
  extractedFields: Record<string, string>;
  keyClauses?: string[];
  notes?: string;
}

export interface SarsVerificationResult {
  verified: boolean;
  status: 'COMPLIANT' | 'NON_COMPLIANT';
  taxPayerName: string;
  tradingName: string;
  taxReferenceNumber: string;
  tcsPin: string;
  issueDate: string;
  expiryDate: string;
  prn: string;
  goodStanding: boolean;
  complianceCategories: {
    incomeTax: string;
    vat: string;
    paye: string;
    customs: string;
  };
  auditToken: string;
  verifiedAt: string;
  gatewayNode: string;
}

export interface RpaLogEntry {
  id: string;
  time: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
}

export interface RpaActionResponse {
  success: boolean;
  action: string;
  approach: string;
  summary: string;
  itemsProcessed: number;
  logs: { time: string; level: 'info' | 'success' | 'warn' | 'error'; message: string }[];
  completedAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Managing Director' | 'Compliance Director' | 'SARS Liaison Officer' | 'Academic Registrar' | 'RPA Operator' | 'Lead Auditor';
  department: 'Executive' | 'Tax & Regulatory' | 'Academic Operations' | 'Automation & IT' | 'External Audit';
  lastActive: string;
  status: 'Active' | 'Invited' | 'Suspended';
  permissions: string[];
}

export interface AuditHistoryEntry {
  id: string;
  timestamp: string;
  rawDate: string;
  auditTitle: string;
  auditType: 'SARS TCS Gateway' | 'QCTO Monitoring' | 'MICT SETA Verification' | 'EISA Venue & Staffing' | 'CIPC & COIDA Governance' | 'B-BBEE Evidence Audit';
  gateOrPillar: string;
  status: 'PASSED' | 'ACTION REQUIRED' | 'CRITICAL NON-COMPLIANCE';
  automatedOutcomes: string;
  itemsAudited: number;
  passedItems: number;
  failedItems: number;
  durationMs: number;
  executedBy: string;
  evidenceHash: string;
  details?: {
    summary: string;
    keyFindings: string[];
    actionItems?: string[];
  };
}

export interface WorkflowStage {
  id: 'onedrive' | 'ocr' | 'ai_classification' | 'compliance_engine' | 'human_approval' | 'dashboard';
  title: string;
  shortDesc: string;
  status: 'IDLE' | 'PROCESSING' | 'COMPLETED' | 'WARNING' | 'FAILED';
  durationMs?: number;
  outputSummary?: string;
  details?: Record<string, any>;
}

export interface WorkflowDocumentItem {
  id: string;
  sourceFile: string;
  sourcePath: string; // OneDrive / Google Drive path
  fileSize: string;
  receivedAt: string;
  uploaderRole: string;
  ocrOutput?: {
    rawTextPreview: string;
    textLayerConfidence: number;
    extractedFields: Record<string, string>;
  };
  aiClassification?: {
    documentClass: string;
    applicablePillar: 'QCTO' | 'MICT SETA' | 'SARS' | 'B-BBEE' | 'Consulting';
    relevantGates: number[];
    confidence: number;
    legibilityScore: number;
    policeStampDetected: boolean;
    certificationDate?: string;
    monthsSinceCertification?: number;
    detectedSignatures: string[];
  };
  complianceEngine?: {
    gateNumber: number;
    gateName: string;
    gateStatus: GateComplianceStatus;
    invariantsPassed: string[];
    blockingDeficiencies: string[];
    readinessImpact: string;
    requiresHumanReview: boolean;
  };
  humanApproval?: {
    status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'CONDITIONAL';
    reviewedBy?: string;
    reviewedAt?: string;
    reviewerRole?: string;
    decisionNotes?: string;
    signaturesConfirmed?: boolean;
    stampValidityConfirmed?: boolean;
  };
  dashboardSync?: {
    syncedAt?: string;
    targetRegistry: string;
    status: 'SYNCED' | 'QUEUED' | 'FAILED';
    auditEvidenceHash: string;
  };
}

