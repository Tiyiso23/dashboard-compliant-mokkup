# Mindworx ComplianceOS — Comprehensive User Guide

**Platform Version:** 1.0.0 (Production Release)  
**Audience:** Compliance Officers, QAC Leads, Training Managers, Operations Leads, Administrators, Managing Director  
**System URL:** `https://ais-pre-z2quiq5gmm7yr3tennyadl-862413215453.europe-west2.run.app`  

---

## 1. Introduction & Global Navigation

The Mindworx Compliance Agent (**ComplianceOS**) turns statutory QAC procedures (mapped on 14 October 2026 by Phyllis Muthombeni) into automated, gate-driven checks so that recurring errors never reach MICT SETA, QCTO, SARS, or EISA evaluators.

### 1.1 The Global Top Bar
- **Wordmark ("MINDWORX COMPLIANCE"):** Click anytime to return to the Master Compliance Dashboard.
- **Navigation Links:** Quick-switch between **Overview**, **AI Workflow**, **9 Automated Gates**, **Master Register**, **Audit Packs**, **EISA Readiness**, and **OCR & RPA**.
- **Run Gate Check (Primary Action):** Triggers a live automated validation scan across all 9 gates and updates clearance metrics.
- **Theme Toggle:** Switch between high-contrast Dark Mode and Light Mode.

### 1.2 Sidebar Organization
1. **ComplianceOS Engine:** Dashboard Overview, End-to-End Workflow, 9 Automated Gates, Master Document Register, Site Visit Audit Packs, EISA Exam Readiness, Learnership Cohorts, and RACI Governance.
2. **Statutory & Automation Hub:** OCR & RPA Bots, SARS Compliance, Academic & SITA, Consulting & CIPC, Document Vault, Reports & Analytics, User Management, and the interactive **User Guide**.
3. **User Identity Footer:** Displays active executive profile (*Martin Pienaar · Managing Director*).

---

## 2. Master Compliance Dashboard

### 2.1 Multi-Company Entity Selector
Use the **Active Company Entity** dropdown in the top-right header to switch between:
- `All Mindworx Entities (Consolidated Group)`
- `MINDWORX CONSULTING (PTY) LTD` (Reg: `2014/192847/07`, Tax: `9012847192`)
- `MINDWORX ACADEMY (PTY) LTD` (Reg: `2016/482019/07`, Tax: `9182049281`)
- `MINDWORX HOLDINGS (PTY) LTD` (Reg: `2010/019283/07`, Tax: `9281048201`)

### 2.2 The Two Master Dashboard Tabs
- **Academic Compliance Tab:** Tracks MICT SETA tripartite learnership agreements, SITA Transversal RFB 1183 accreditation, and learner POPIA/ID verification dossiers.
- **Consulting Compliance Tab:** Tracks CIPC CoR 14.3 annual returns, COIDA Letters of Good Standing, B-BBEE Level 1 affidavits, and client MSAs.

### 2.3 Status Indicators (Green / Yellow / Red)
- **Green (Compliant):** Document is verified, valid, and satisfies all statutory invariants.
- **Yellow (Warning):** Item expires within 30 days or requires an updated police certification stamp.
- **Red (Expired / Non-Compliant):** Lapsed document or failed critical invariant triggering a hard gate block.

---

## 3. Automated Bot Network & Manual PIN Intervention

### 3.1 Headless External Portal Bots
ComplianceOS continuously pings external portals and reconciles file counts inside Google Shared Drive folders:
1. **SARS eFiling Gateway Bot** (`efiling.sars.gov.za`)
2. **CIPC BizPortal Enterprise Registry Bot** (`bizportal.gov.za`)
3. **MICT SETA LMS & Learner Contract Gateway** (`mict.org.za`)
4. **SITA Supplier Portal (RFB 1183)** (`sita.co.za`)
5. **QCTO Enrolment & Monitoring Portal Bot** (`qcto.org.za`)
6. **Department of Employment & Labour COIDA Portal** (`cfonline.labour.gov.za`)

Click **"Trigger Bot Network Ping"** on the Dashboard Overview to refresh live portal latencies and shared-drive counts.

### 3.2 Manual Intervention Console (Dynamic Passwords & One-Off PINs)
For portals requiring human-in-the-loop OTPs or verification codes:
1. Locate the **Manual Intervention Console** on the Dashboard Overview.
2. Enter the 4–6 digit email PIN or SMS OTP in the portal session card (e.g., MICT SETA or COIDA ROE).
3. Click **"Submit PIN"** to unlock the session (`AUTHENTICATED`).

---

## 4. End-to-End AI Workflow Pipeline

Open **AI Workflow** from the Top Bar or Sidebar to trace or execute the 6-stage document pipeline:
1. **OneDrive / Google Drive Store:** Fetches the uploaded artifact.
2. **OCR Engine:** Extracts text tokens and structured fields via Tesseract 5.3 + PyMuPDF.
3. **AI Classification:** Uses Vertex AI (`gemini-3.8-flash`) to classify document type, detect SAPS stamps, and measure elapsed certification time.
4. **Compliance Gate Engine:** Evaluates hard invariants (such as the 3-month SA ID certification limit).
5. **Human Approval Gate:** Enter optional notes and click **"Approve File"** or **"Reject File"** as the Compliance Officer.
6. **Dashboard Sync:** Issues a SHA-256 evidence hash and updates the Master Register.

---

## 5. The 9 Automated Compliance Gates & Master Document Register

### 5.1 The 9 Gates (`9 Automated Gates`)
Filter by pillar (**QCTO**, **MICT SETA**, **Document QA**, **B-BBEE**) and expand any gate to view validation rules, system actions, and blocking conditions:
1. **Gate 01 · Onboarding:** Agreement selection by learner type; 3-month certified ID check.
2. **Gate 02 · Registration:** SETA bulk uploads & QCTO monitoring countdown.
3. **Gate 03 · Assessor & Moderator Scope:** 3-year registration & SLA checks; 90d/30d alerts.
4. **Gate 04 · QCTO Monitoring Visit:** 8-part monitoring file compiled 2 weeks prior to the 21-day–2-month window.
5. **Gate 05 · Verification:** Drafts SoRs, compiles verification files, and confirms moderator booking.
6. **Gate 06 · Post-Course Review:** Confirms module PoEs and client reference letters before EISA.
7. **Gate 07 · EISA Exam Readiness:** Enforces venue, documents, and 2-invigilators-per-room rules.
8. **Gate 08 · New Qualification Accreditation & SARS:** Checks lease, tax compliance, public liability, OHS, and CIPC.
9. **Gate 09 · B-BBEE Evidence:** Reconciles stipends, absorption letters, and WSP/ATR seats.

### 5.2 Master Document Register (`Master Document Register`)
Search all 25 statutory document classes by keyword, Gate (1–9), target audience, or status, and launch targeted OCR re-checks directly from any row.

---

## 6. Audit Packs, Cohorts & EISA Exam Readiness

- **Site Visit Audit Packs:** Select **QCTO Monitoring Visit File**, **MICT SETA Verification File**, **New Qualification Accreditation Pack**, or **B-BBEE Evidence Pack** to review checklist gaps and compile inspection-ready packs.
- **Learnership Cohorts:** Monitor 77 active learners across programmes, QCTO monitoring countdown windows, and assessor/moderator assignments.
- **EISA Exam Readiness (Gate 07):** Filter the 16-item readiness checklist by **Venue**, **Documents**, or **Staff**. Toggle remediated items to clear `CRITICAL NON-COMPLIANCE` blocks and reach 100% exam clearance.

---

## 7. OCR & RPA Automation Centre

### 7.1 OCR Document Scanner
- Upload a scanned PDF/image or choose one of 6 South African document presets (SARS TCS, VAT103, EMP201, SITA RFB 1183, Learner Agreement, CIPC CoR 14.3).
- Toggle **OCR Bounding Boxes**, review/edit extracted metadata, copy JSON, verify a SARS TCS PIN directly, or click **"Save to Compliance Records"**.

### 7.2 RPA Control Panel
- Select an automation engine (**Hybrid**, **Python + Playwright**, **UiPath**, or **Power Automate**).
- Execute **Run OCR**, **SARS Verify**, **Expiry Scan**, **Website Check**, **Generate Report**, or **Send Alerts**.
- Monitor daily automation runs, success rates, and average latency in the interactive performance chart and live activity log.

---

## 8. Statutory Hubs, Document Vault, Reports, RACI & Users

- **SARS Compliance:** Run live TCS PIN verification (`Tax Reference` + `TCS PIN`), inspect VAT 103 and PAYE EMP201 filings, and review audit tokens.
- **Academic & SITA / Consulting & CIPC:** Inspect division-specific compliance dossiers and sub-tabs.
- **Document Vault:** Unified searchable repository across all registered compliance records.
- **Reports & Analytics:**
  - Click **"Export Report"** to download `Mindworx_Compliance_Documents_Summary_YYYY-MM-DD.csv`.
  - Click **"View Full Audit Dossier"** → **"Print Dossier"** for printable regulatory packs.
  - Inspect **Audit History** below the charts to filter chronological audits, expand SHA-256 evidence details, click **"Run On-Demand Audit"**, or click **"Export Log"** (JSON).
- **RACI Governance & User Management:** Review procedure accountability across roles and administer team member permissions.
- **User Guide (In-App):** Access the searchable handbook anytime from the Sidebar, filter chapters by role, print, or download Markdown.

---

## 9. Expiry & Escalation Quick Reference

| Item | First Alert | Escalation | On Expiry |
|---|---|---|---|
| **SDP / Provider Accreditation** | 12 months before | 6 months, then 90 days | Block new cohorts & site visits |
| **Assessor / Moderator Reg (3-Yr)** | 90 days before | 30 days before | Block PoE sign-off & moderation |
| **SLAs, Leases, Insurance & OHS** | 60 days before | 30 days, then every 2 days | Block allocation / mark pack incomplete |
| **Certified Learner IDs (3-Mo Rule)** | At upload | Immediate flag | Reject & request fresh certification |
| **QCTO Monitoring Window** | Registration date | 2 weeks before window opens | Escalate gaps to QAC Lead |

---

## 10. Support & Governance Contacts

- **QAC & Process Map Governance:** Phyllis Muthombeni (`phyllis@mindworx.co.za`)
- **Compliance Officer & Submissions:** Tandeeka (`tandeeka@mindworx.co.za`)
- **Executive Direction:** Martin Pienaar (`martin@mindworx.co.za`)
- **Technical Platform & Cloud Architecture:** Mindworx Automation Operations
