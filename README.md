# Mindworx ComplianceOS — Enterprise Compliance, OCR & RPA Automation Platform

An automated, gate-driven compliance dashboard and Quality Assurance & Control (QAC) platform built for **Mindworx Consulting (Pty) Ltd**, **Mindworx Academy (Pty) Ltd**, and **Mindworx Holdings (Pty) Ltd**.

ComplianceOS turns statutory procedures into automated gate validations, document OCR pipelines, external regulatory portal bot checks, and human-in-the-loop sign-off workflows across **QCTO**, **MICT SETA**, **SARS**, **SITA**, **CIPC**, **COIDA**, and **B-BBEE** obligations.

---

## Key Capabilities

### 1. Master Compliance Dashboard (Multi-Company & Dual-Tab)
- **Multi-Company Selector:** Switch seamlessly between *All Mindworx Entities (Consolidated)*, *Mindworx Consulting (Pty) Ltd*, *Mindworx Academy (Pty) Ltd*, and *Mindworx Holdings (Pty) Ltd*.
- **Academic vs. Consulting Tabs:** Isolates learnership/SITA records from corporate CIPC/COIDA/client governance.
- **Traffic-Light Status Indicators:** Green (Compliant), Yellow (Expiring `< 30` days or pending certification), and Red (Expired / Hard Gate Block).
- **Automated External Bot Network:** Pings SARS eFiling, CIPC BizPortal, MICT SETA LMS, SITA RFB 1183, QCTO, and DoL COIDA portals while tracking Google Shared Drive folders.
- **Manual Intervention Console:** Handles dynamic passwords, SMS OTPs, and one-off verification PINs for protected government portals.

### 2. End-to-End AI Compliance Workflow
Interactive 6-stage document lifecycle demonstration:
1. **OneDrive / Google Drive Ingestion**
2. **OCR Text & Metadata Extraction** (Tesseract 5.3 + PyMuPDF)
3. **AI Classification & Validation** (Google Cloud Vertex AI / Gemini via `@google/genai`)
4. **Compliance Gate Engine** (e.g., 3-Month Certified ID rule, 3-Year Assessor Scope rule)
5. **Human Approval Gate** (Compliance Officer sign-off / rejection)
6. **Dashboard & Master Register Sync** (with SHA-256 evidence hashing)

### 3. The 9 Automated Compliance Gates & EISA Readiness
- **9 Automated Gates:** Onboarding, Registration, Assessor & Moderator Scope, QCTO Monitoring Visit, Verification, Post-Course Review, EISA Exam Readiness, New Qualification Accreditation & SARS, and B-BBEE Evidence.
- **Master Document Register:** 25 statutory document classes mapped to Shared Drive paths and escalation rules.
- **Site Visit Audit Packs & Cohorts:** Compilation of inspection dossiers and cohort progression tracking.
- **Gate 07 EISA Readiness Scorer:** Live scoring for examination venues, documents, and mandatory 2-invigilators-per-room ratios.

### 4. OCR Scanner, RPA Control Panel & SARS Compliance Hub
- **OCR Document Scanner:** Upload PDFs/images or inspect South African presets (SARS TCS, VAT103, EMP201, SITA RFB 1183, Learner Agreement, CIPC CoR 14.3) with bounding-box overlays and editable fields.
- **RPA Control Panel:** Execute `Run OCR`, `SARS Verify`, `Expiry Scan`, `Website Check`, `Generate Report`, and `Send Alerts` across Hybrid, Python + Playwright, UiPath, or Power Automate engines, complete with daily performance metrics charts.
- **SARS Compliance Hub:** Live TCS PIN verification simulator/gateway returning Income Tax, VAT, PAYE standing and audit tokens.

### 5. Reports, Audit History, Governance & In-App User Guide
- **Reports & Regulatory Analytics:** Export CSV compliance summaries (`Export Report`), preview/print regulatory audit dossiers, and inspect chronological **Audit History** with JSON export and on-demand audits.
- **RACI Governance & User Management:** Role accountability matrix and team RBAC directory.
- **Interactive User Guide:** Built-in searchable handbook with role filters and direct module links.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Motion
- **Backend:** Express.js (`server.ts`) serving Vite middleware in development and `dist/` in production
- **AI / Document Understanding:** `@google/genai` (`gemini-3.8-flash`) supporting both Google Cloud Vertex AI and Gemini API key authentication

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or bun

### Installation & Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables by copying `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Supported environment variables in `.env.example`:
   - `GEMINI_API_KEY`: Gemini API key (configured automatically in AI Studio Secrets)
   - `GOOGLE_GENAI_USE_VERTEXAI`: Set `"true"` to route AI requests via Google Cloud Vertex AI
   - `GOOGLE_CLOUD_PROJECT`: GCP Project ID for Vertex AI
   - `GOOGLE_CLOUD_LOCATION`: GCP region (default: `europe-west2`)
   - `APP_URL`: Hosted application URL

3. Start the full-stack development server (port `3000`):
   ```bash
   npm run dev
   ```

### Available Scripts
| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `tsx server.ts` | Starts Express + Vite dev server on port 3000 |
| `npm run build` | `vite build` | Builds the frontend production bundle to `dist/` |
| `npm run start` | `node server.ts` | Starts production server |
| `npm run lint` | `tsc --noEmit` | Runs TypeScript type-checking |
| `npm run clean` | `rm -rf dist server.js` | Removes build artifacts |

---

## Server API Endpoints

- `GET /api/health` — Returns service health, active AI engine (`Google Cloud Vertex AI` or `Google Gemini API`), and configuration status.
- `POST /api/ocr-extract` — Extracts structured South African compliance fields from uploaded base64 images or text using Gemini / OCR pipeline.
- `POST /api/sars-verify` — Validates SARS Tax Reference Number and TCS PIN status across tax categories.
- `POST /api/rpa-run` — Executes RPA workflow actions (`run_ocr`, `sars_verify`, `expiry_scan`, `website_check`, `generate_report`, `send_alerts`) and returns step-by-step logs.
- `POST /api/workflow-run` — Executes the 6-stage end-to-end classification and gate evaluation pipeline.

---

## Project Structure

```text
├── docs/
│   ├── BUSINESS_CASE.md                    # Financial ROI & investment justification
│   ├── BUSINESS_REQUIREMENTS_DOCUMENT.md   # Functional, NFR & RACI specifications
│   └── USER_GUIDE.md                       # Complete operational manual
├── public/                                 # Static assets & process map specification
├── src/
│   ├── components/                         # Modular UI views (Dashboard, Gates, OCR, RPA, Workflow, User Guide, etc.)
│   ├── data/
│   │   ├── complianceOsData.ts             # 9 Gates, Master Register, Cohorts, EISA & RACI datasets
│   │   ├── mockComplianceData.ts           # Multi-company, documents, bot targets, MFA & users datasets
│   │   └── README.md                       # Data layer schema & dictionary
│   ├── App.tsx                             # Application shell & view routing
│   └── types.ts                            # TypeScript domain interfaces
├── server.ts                               # Express API server & Gemini / Vertex AI integration
├── package.json                            # Dependencies and build scripts
└── .env.example                            # Environment variable template
```

---

## Governance Documentation

- [Business Requirements Document (`docs/BUSINESS_REQUIREMENTS_DOCUMENT.md`)](./docs/BUSINESS_REQUIREMENTS_DOCUMENT.md)
- [Business Case (`docs/BUSINESS_CASE.md`)](./docs/BUSINESS_CASE.md)
- [User Guide (`docs/USER_GUIDE.md`)](./docs/USER_GUIDE.md)
- [Mock Compliance Data Dictionary (`src/data/README.md`)](./src/data/README.md)
