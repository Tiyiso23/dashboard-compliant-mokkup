export type ActiveTab =
  | 'dashboard'
  | 'academic'
  | 'consulting'
  | 'sars'
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
