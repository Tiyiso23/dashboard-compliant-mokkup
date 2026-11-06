# Mindworx ComplianceOS — Comprehensive User Guide

**Platform Version:** 1.0.0 (Production Release)  
**Audience:** Compliance Officers, QAC Leads, Training Managers, Operations Leads, Administrators, Managing Director  
**System URL:** `https://ais-pre-z2quiq5gmm7yr3tennyadl-862413215453.europe-west2.run.app`  

---

## 1. Introduction & Navigation Overview

The Mindworx Compliance Agent (**ComplianceOS**) turns statutory QAC procedures into automated, gate-driven checks so that mistakes never reach SETA, QCTO, or EISA evaluators.

### 1.1 The Global Top Bar
- **Wordmark ("MINDWORX COMPLIANCE"):** Click anytime to return to the Master Dashboard.
- **Navigation Links:** Quick-switch between **Overview**, **AI Workflow**, **9 Automated Gates**, **Master Register**, **Audit Packs**, **EISA Readiness**, and **OCR & RPA**.
- **Run Gate Check (Primary Action):** Triggers a live automated validation scan across all active gates and documents.
- **Theme Toggle:** Switch between high-contrast Dark Mode and crisp Light Mode.

### 1.2 Sidebar Organization
The sidebar is divided into two operational tiers:
1. **ComplianceOS Engine:** Core QAC gate pipeline, master document register, site visit audit packs, EISA venue scorer, learnership cohorts, and RACI governance.
2. **Statutory & Automation Hub:** End-to-end AI workflow, dedicated SARS compliance centre, academic & SITA hub, consulting & CIPC hub, document vault, reports & regulatory analytics, and user access management.
3. **User Identity Footer:** Shows current logged-in role (Managing Director Martin Pienaar / Compliance Officer).

---

## 2. Navigating the Master Compliance Dashboard

### 2.1 The Two Master Dashboard Tabs
The top of the Overview features two dedicated operational tabs:
- **Academic Compliance Tab:** Filters documents, bot pings, and alerts strictly for MICT SETA learnership agreements, SITA RFB 1183 tender accreditation, and learner POPIA dossiers.
- **Consulting Compliance Tab:** Filters corporate compliance, including CIPC CoR 14.3 annual returns, COIDA Letter of Good Standing, B-BBEE Level 1 affidavits, and client MSAs.

### 2.2 Multi-Company Entity Selector
Use the **Active Company Entity** dropdown on the top-right to filter views:
- `All Mindworx Entities (Consolidated Group)`
- `MINDWORX CONSULTING (PTY) LTD` (Tax: 9012847192)
- `MINDWORX ACADEMY (PTY) LTD` (Tax: 9182049281)
- `MINDWORX HOLDINGS (PTY) LTD` (Tax: 9281048201)

### 2.3 Status Hierarchy (Green / Yellow / Red)
- **Green (Compliant):** Document is verified, unexpired, and meets statutory invariants.
- **Yellow (Warning):** Document is expiring within 30 days or is pending an updated police certification stamp.
- **Red (Expired / Non-Compliant):** Document has lapsed or failed a critical gate invariant (e.g. stamp older than 3 months, missing invigilators).

---

## 3. Automated Bots & Shared Drive Tracking

### 3.1 Headless Bot Network
ComplianceOS features continuous background bots monitoring external government portals:
1. **SARS eFiling Gateway Bot:** Pings `efiling.sars.gov.za` to confirm Income Tax, VAT, and PAYE good standing.
2. **CIPC BizPortal Bot:** Verifies enterprise status ("IN BUSINESS") and annual return filing.
3. **MICT SETA LMS Bot:** Checks learner registration numbers and contract submissions.
4. **SITA Transversal Bot:** Confirms Tier-1 RFB 1183 status on the Central Supplier Database (CSD).
5. **QCTO Portal Bot:** Tracks 21-day monitoring windows.
6. **COIDA CF-Portal Bot:** Queries Department of Labour assessment returns.

### 3.2 Running an On-Demand Bot Ping
1. Scroll to the **Automated Bot Network** section on the Dashboard Overview.
2. Click **"Trigger Bot Network Ping"**.
3. Watch the bots ping external gateways, update round-trip latencies (ms), and verify file counts inside Google Shared Drive folders.

---

## 4. Manual Intervention: Dynamic Passwords & Verification PINs

Certain government portals enforce dynamic OTPs or one-off verification tokens that cannot be bypassed. ComplianceOS handles this seamlessly:

### 4.1 Submitting a Dynamic PIN
1. Locate the **Manual Intervention Console** on the Dashboard Overview.
2. Review the active session:
   - *Example:* "MICT SETA LMS Portal — Email verification PIN sent to Tandeeka".
   - *Example:* "Department of Labour COIDA Portal — SMS OTP sent to Martin Pienaar (+27 82 *** 4910)".
3. Type the 4-to-6 digit code into the input field.
4. Click **"Submit PIN"**.
5. The session immediately transitions to **`AUTHENTICATED`** in green, unlocking the automated bot ingestion stream.

---

## 5. End-to-End AI Workflow Pipeline

The End-to-End Workflow demonstrates the core AI capability from raw ingestion to live dashboard update:

### 5.1 The 6 Stages
1. **OneDrive / Shared Drive Store:** Ingests the binary file from Google Drive / OneDrive.
2. **OCR Engine:** Extracts text tokens, timestamps, and metadata via Tesseract 5.3 + PyMuPDF.
3. **AI Classification:** Uses Google Cloud Vertex AI / Gemini 3.8 Flash to classify document types, detect police certification stamps, and calculate elapsed validity months.
4. **Compliance Gate Engine:** Evaluates the 9 Gate rules (e.g. Gate 01 3-Month Freshness Rule, Gate 07 Invigilator Ratios).
5. **Human Approval Gate:** Prompts the Compliance Officer for review, optional notes, and final sign-off.
6. **Dashboard Sync:** Generates a SHA-256 evidence hash and updates the Master Document Register and KPIs.

### 5.2 Operating the Pipeline
1. Click **"AI Workflow"** in the top navigation or sidebar.
2. Select a document from the queue (e.g. *Kabelo Ndlovu ID*, *SARS TCS Notice*, *Dr. Sithole Assessor Letter*).
3. Click **"Run Full Pipeline on Document"** to watch the animated progression across all 6 stages.
4. In the **Stage 5: Human Approval** panel, enter review notes and click **"Approve File"** or **"Reject File"**.

---

## 6. Reports & Regulatory Analytics

### 6.1 Exporting a Summary CSV
1. Click **"Reports & Analytics"** in the sidebar.
2. In the top-right header, click **"Export Report"** (green spreadsheet icon).
3. The browser will immediately generate and download `Mindworx_Compliance_Documents_Summary_YYYY-MM-DD.csv` containing complete metadata, validity dates, OCR scores, and audit notes.

### 6.2 Viewing & Printing the Regulatory Dossier
1. Click **"View Full Audit Dossier"** to preview the official multi-page audit report.
2. Click **"Print Dossier"** for a clean, formal printout with digital signature hashes.

### 6.3 Inspecting the Chronological Audit Log
1. Scroll down to the **Audit History** component in Reports.
2. Use the search bar to query by audit ID, outcome, or agent.
3. Filter by status (`PASSED`, `ACTION REQUIRED`, `CRITICAL NON-COMPLIANCE`) or audit type.
4. Click **"Run On-Demand Audit"** to execute a fresh live gate inspection.
5. Click **"Export Log"** to download the immutable JSON audit trail.

---

## 7. Support & Maintenance Contacts

- **QAC & Process Map Governance:** Phyllis Muthombeni (`phyllis@mindworx.co.za`)
- **Compliance Officer & Submissions:** Tandeeka (`tandeeka@mindworx.co.za`)
- **Executive Direction:** Martin Pienaar (`martin@mindworx.co.za`)
- **Technical Platform & Cloud Architecture:** Mindworx Automation Operations
