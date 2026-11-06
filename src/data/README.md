# Mock Compliance Data Architecture (`mockComplianceData.ts`)

This document provides technical documentation, data dictionary specifications, and schema definitions for the mock compliance data layer in the **Mindworx Compliance Dashboard & ComplianceOS** platform (`src/data/mockComplianceData.ts`).

---

## 1. Overview & Regulatory Purpose

The `mockComplianceData.ts` module serves as the realistic, domain-grounded compliance data store for South African corporate and educational governance. It reflects official statutory standards from:
- **South African Revenue Service (SARS)**: Tax Compliance Status (TCS PIN), Value-Added Tax (VAT 103), and Pay-As-You-Earn (PAYE EMP201).
- **State Information Technology Agency (SITA)**: Transversal procurement accreditation (RFB 1183).
- **Sector Education and Training Authorities (MICT SETA & Services SETA)**: Tripartite learnership agreements, workplace contracts, and stipend compliance.
- **Companies and Intellectual Property Commission (CIPC)**: Enterprise registration (CoR 14.3) and annual returns.
- **Department of Employment & Labour**: Compensation for Occupational Injuries and Diseases Act (COIDA) Letter of Good Standing.
- **Broad-Based Black Economic Empowerment (B-BBEE)**: Level 1 contributor scorecard with 135% procurement recognition.

---

## 2. Exported Data Sets & Interfaces

### A. `INITIAL_DOCUMENTS: ComplianceDocument[]`
A pre-loaded collection of statutory compliance documents categorized across the three core operational pillars:

```typescript
export interface ComplianceDocument {
  id: string;
  title: string;
  category: 'SARS' | 'Academic' | 'Consulting';
  subCategory: string;
  documentType: string;
  companyName: string;
  taxReference: string;
  referenceNumber: string;
  issueDate: string;        // DD/MM/YYYY
  expiryDate: string;       // DD/MM/YYYY or 'Indefinite (Active)'
  status: 'COMPLIANT' | 'WARNING' | 'EXPIRED' | 'PENDING';
  confidenceScore: number;  // OCR confidence percentage (0-100)
  fileSize: string;
  verifiedBy: string;       // e.g., 'Playwright RPA Bot', 'Gemini Document AI'
  verifiedAt: string;       // Timestamp DD/MM/YYYY HH:MM
  extractedFields: Record<string, string>;
  keyClauses?: string[];
  notes?: string;
}
```

#### Document Inventory:
| ID | Title | Category | Sub-Category | Tax/Reg Ref | Expiry | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `doc-sars-01` | SARS Tax Compliance Status (TCS) Certificate | SARS | Tax Compliance Status | `9012847192` | 01/10/2027 | `COMPLIANT` |
| `doc-sars-02` | VAT 103 Notice of Registration Certificate | SARS | VAT Registration | `4120283921` | Indefinite | `COMPLIANT` |
| `doc-sars-03` | PAYE EMP201 Monthly Statement & Payment | SARS | PAYE Registration | `7820194820` | 07/11/2026 | `COMPLIANT` |
| `doc-sars-04` | Notice of Assessment (ITR14) Clearance | SARS | Tax Documentation | `9012847192` | 15/05/2027 | `COMPLIANT` |
| `doc-acad-01` | MICT SETA Tripartite Learner Agreements (Q1) | Academic | Learner Agreements | `LNR-2026-SA-0441` | 31/01/2027 | `COMPLIANT` |
| `doc-acad-02` | SITA Accreditation & RFB 1183 Certificate | Academic | SITA Registration | `SITA-ACC-2025-998` | 12/01/2028 | `COMPLIANT` |
| `doc-acad-03` | Learner Verification Records & ID Dossier | Academic | Learner Records | `MWX-LRN-DOSSIER-2026` | 10/01/2027 | `WARNING` |
| `doc-cons-01` | CIPC Enterprise Registration (CoR 14.3) | Consulting | Company Compliance | `2014/192847/07` | Perpetual | `COMPLIANT` |
| `doc-cons-02` | COIDA Letter of Good Standing (Comp. Fund) | Consulting | Company Compliance | `99000124819` | 30/11/2026 | `WARNING` |
| `doc-cons-03` | B-BBEE SANAS Verification Scorecard (Level 1) | Consulting | Company Compliance | `BEE-MWX-2026-L1` | 14/02/2027 | `COMPLIANT` |
| `doc-cons-04` | Standard Bank MSA & Security Addendum | Consulting | Client Compliance | `SB-MSA-2025-09` | 31/05/2028 | `COMPLIANT` |

---

### B. `MOCK_USERS: UserAccount[]`
The Role-Based Access Control (RBAC) directory defining personnel, clearance levels, and operational rights:

```typescript
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
```

#### User Directory:
| User ID | Full Name | Corporate Email | Role | Department | Key Permissions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `usr-00` | **Martin Pienaar** | `martin.p@mindworx.co.za` | Managing Director | Executive | `ALL_PERMISSIONS`, `EXECUTIVE_SIGN_OFF`, `SIGN_AUDIT` |
| `usr-01` | **Sipho Sithole** | `sipho.s@mindworx.co.za` | Compliance Director | Executive | `ALL_PERMISSIONS`, `SIGN_AUDIT`, `TRIGGER_RPA` |
| `usr-02` | **Nomsa Dlamini** | `nomsa.d@mindworx.co.za` | SARS Liaison Officer | Tax & Regulatory | `SARS_VERIFY`, `TCS_MANAGE`, `RUN_OCR` |
| `usr-03` | **Brenda van der Merwe** | `brenda.vdm@mindworx.co.za` | Academic Registrar | Academic Operations | `ACADEMIC_MANAGE`, `SETA_SUBMIT`, `VIEW_LEARNERS` |
| `usr-04` | **Thabo Mokoena** | `thabo.m@mindworx.co.za` | RPA Operator | Automation & IT | `TRIGGER_RPA`, `CONFIGURE_BOTS`, `VIEW_LOGS` |
| `usr-05` | **Kavita Pillay** | `kavita.p@external-auditor.co.za`| Lead Auditor | External Audit | `VIEW_DOCUMENTS`, `VIEW_LOGS`, `EXPORT_DOSSIER` |

---

### C. `RPA_TECHNOLOGIES`
An architectural technology comparison matrix evaluating document processing and browser automation engines integrated into the platform:

```typescript
export const RPA_TECHNOLOGIES = [
  { name: 'Tesseract OCR', function: 'Open-source text extraction...', category: 'OCR Engine', speed: '~1.2s / doc', accuracy: '97.4%' },
  { name: 'PyMuPDF', function: 'High-speed text and vector extraction...', category: 'Document Parsing', speed: '~0.3s / doc', accuracy: '99.8%' },
  { name: 'Google Document AI', function: 'Specialized enterprise structured form parser...', category: 'Document AI', speed: '~1.8s / doc', accuracy: '99.1%' },
  { name: 'Playwright', function: 'Headless browser automation for SARS/CIPC/SETA...', category: 'Browser RPA', speed: '~2.4s / check', accuracy: '100% Reliable' },
  { name: 'UiPath', function: 'Enterprise robotic process automation orchestrator...', category: 'Enterprise RPA', speed: '~3.5s / job', accuracy: '99.5%' },
  { name: 'Python', function: 'Core automation scripting, scheduling, normalization...', category: 'Automation Logic', speed: 'Sub-second', accuracy: '100%' },
  { name: 'Gemini', function: 'Cognitive AI document classification & validation...', category: 'Cognitive AI', speed: '~1.5s / doc', accuracy: '99.4%' },
];
```

---

## 3. Relationship to `complianceOsData.ts`

While `mockComplianceData.ts` models foundational statutory documents, users, and tech stacks, `complianceOsData.ts` extends this data with the **Phyllis Muthombeni Process Map (14 October 2026)**:
- **`COMPLIANCE_GATES`**: The 9 automated gates (Gate 1 Onboarding to Gate 9 B-BBEE).
- **`MASTER_DOCUMENT_REGISTER`**: 25 statutory documents mapped to Google Drive locations and the mandatory **3-month certified ID limit**.
- **`COHORTS_LIST`**: Live learnership cohorts (`MWX-DEV-2026-Q1`, `MWX-DATA-2026-Q2`, etc.) and the 21-day to 2-month QCTO monitoring countdown window.
- **`EISA_CHECKLIST`**: Examination centre venue, document, and staffing checklist scoring (e.g. 2 invigilators per room).
- **`NON_CONFORMANCE_REPORTS`**: Official NCRs and Corrective Action Plans (CAPs).
- **`RACI_MATRIX`**: Operational RACI accountability matrix.

---

## 4. Usage in Components

```typescript
// 1. Initializing master state in App.tsx
import { INITIAL_DOCUMENTS } from './data/mockComplianceData';
const [documents, setDocuments] = useState<ComplianceDocument[]>(INITIAL_DOCUMENTS);

// 2. Querying user accounts in UserManagement.tsx
import { MOCK_USERS } from '../data/mockComplianceData';
const [users, setUsers] = useState<UserAccount[]>(MOCK_USERS);

// 3. Rendering RPA benchmark matrix in RpaControlPanel.tsx
import { RPA_TECHNOLOGIES } from '../data/mockComplianceData';
```
