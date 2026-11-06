# Mindworx ComplianceOS — Business Requirements Document (BRD)

**Project Name:** Mindworx Automated Compliance Agent (ComplianceOS)  
**Version:** 1.0.0  
**Date:** November 2026  
**Document Owner:** Phyllis Muthombeni (QAC Lead) & Martin Pienaar (Managing Director)  
**Stakeholders:** Compliance Officer (Tandeeka), Training Manager, Ops & Programmes Lead, Recruitment / Onboarding  

---

## 1. Executive Summary & Problem Statement

### 1.1 Context
Mindworx Academy and Mindworx Consulting operate in highly regulated sectors governed by:
- **QCTO** (Quality Council for Trades and Occupations)
- **MICT SETA** (Media, Information and Communication Technologies Sector Education and Training Authority)
- **SARS** (South African Revenue Service)
- **CIPC** (Companies and Intellectual Property Commission)
- **SITA** (State Information Technology Agency — Transversal RFB 1183)
- **Department of Employment and Labour** (COIDA Compensation Fund)
- **B-BBEE ICT Sector Codes**

### 1.2 The Problem
Historically, recurring procedural mistakes reached external SETA, QCTO, and EISA evaluators. These included:
1. **Certified ID Freshness Lapses:** Learner ID copy certifications older than 3 months at onboarding.
2. **Assessor & Moderator Accreditation Expiry:** Lapsed 3-year registration cycles blocking Portfolios of Evidence (PoEs) and Statements of Results (SoRs).
3. **Examination Centre Invariants:** Venue and staffing non-compliances (e.g., invigilator staffing ratios below 2 per room, missing directional signage, failed wall clocks) risking EISA session disqualification.
4. **Tax Standing Verification Gaps:** Inability to continuously verify SARS TCS PINs, VAT 103, and PAYE EMP201 statements across multi-company legal entities.
5. **Fragmented Shared Drive Repositories:** Documents distributed across unmonitored Google Shared Drives and OneDrive folders without automated expiry alerts.

### 1.3 Solution Statement
ComplianceOS turns the procedures mapped on 14 October 2026 into automated, gate-driven checks. No file is submitted to MICT SETA or QCTO, and no EISA examination proceeds, until the system has verified every invariant across the **9 Automated Compliance Gates**.

---

## 2. Business Objectives & Key Results (OKRs)

| ID | Objective | Measurable Key Result (KR) |
|---|---|---|
| **OBJ-01** | **Zero External Audit Deficiencies** | 0 Non-Conformance Reports (NCRs) raised during external QCTO and MICT SETA site visits. |
| **OBJ-02** | **Continuous Tax Good Standing** | 100% continuous SARS TCS PIN validity across all Mindworx legal entities. |
| **OBJ-03** | **Automated Expiry Horizon** | 100% of expiring statutory artifacts flagged 90/60/30 days prior to lapse. |
| **OBJ-04** | **Turnaround Acceleration** | Reduce site visit dossier preparation from 5 business days to < 10 minutes via automated assembly. |
| **OBJ-05** | **Zero Unverified Assumptions** | Every upload classified by OCR & Gemini/Vertex AI, validated against hard invariants, and approved by a Compliance Officer. |

---

## 3. Scope of the System

### 3.1 In-Scope
1. **Multi-Company Architecture:**
   - *Mindworx Consulting (Pty) Ltd* (Reg: 2014/192847/07, Tax: 9012847192)
   - *Mindworx Academy (Pty) Ltd* (Reg: 2016/482019/07, Tax: 9182049281)
   - *Mindworx Holdings (Pty) Ltd* (Reg: 2010/019283/07, Tax: 9281048201)
   - Consolidated Group views.
2. **Master Dashboard Dual-Tab Focus:**
   - Dedicated **Academic Compliance** tab (SETA tripartite agreements, SITA RFB 1183, learner records).
   - Dedicated **Consulting Compliance** tab (CIPC, COIDA, B-BBEE Level 1, client MSAs).
3. **Automated Status Hierarchy:**
   - **Green:** Fully compliant.
   - **Yellow:** Warnings (expiring in <30 days or pending certified stamps).
   - **Red:** Expired or critical non-compliance invariants.
4. **Automated Bot Network:**
   - Headless Playwright bots pinging SARS, CIPC, SITA, MICT SETA, QCTO, and DoL portals.
   - Google Shared Drive document validity tracking.
5. **Manual Intervention Console:**
   - Dynamic password and one-off verification PIN (MFA) entry for protected portals.
6. **End-to-End Workflow Pipeline:**
   - OneDrive/Google Drive ingestion → Tesseract/PyMuPDF OCR → Vertex AI/Gemini 3.8 Flash Classification → Compliance Gate Engine → Human Officer Approval → Live Dashboard Sync.
7. **Audit Trail & Reporting:**
   - Immutable chronological audit log with SHA-256 evidence hashing.
   - One-click summary CSV export and full printable PDF regulatory dossiers.

### 3.2 Out-of-Scope (Phase 1)
- Direct payroll disbursement (stipend calculation is verified; banking payout remains on EFT rails).
- Automated submission to non-API legacy government portals without human officer sign-off.

---

## 4. Functional Requirements

### 4.1 Master Document Register (MDR)
- **FR-MDR-01:** System must maintain a centralized register of 25 statutory compliance document classes.
- **FR-MDR-02:** System must enforce the **3-month police certification stamp rule** for all South African ID copies.
- **FR-MDR-03:** System must enforce the **3-year accreditation cycle** for assessors and moderators, issuing alerts at 90 and 30 days before expiry.
- **FR-MDR-04:** System must enforce 60/30/2-day alert escalation ladders for SLAs, leases, and insurance policies.

### 4.2 The 9 Automated Compliance Gates
- **Gate 01 (Onboarding):** Validates agreement sets by learner type (Employed, Unemployed, Bank) and blocks registration if ID certification exceeds 3 months.
- **Gate 02 (Registration):** Generates MICT SETA bulk uploads and QCTO enrolment sheets exclusively from verified records; starts QCTO 21-day monitoring visit countdown.
- **Gate 03 (Assessor & Moderator Scope):** Validates SAQA registration scope, SLA, and blocks expired assessors from signing PoEs.
- **Gate 04 (QCTO Monitoring Visit):** Automatically compiles the 8-part monitoring pack 2 weeks before the 21-day to 2-month window opens.
- **Gate 05 (Verification):** Compiles verification file upon receipt of assessor/moderator reports, confirms external moderator booking, and drafts Statements of Results (SoRs).
- **Gate 06 (Post-Course Review):** Validates knowledge, practical, and workplace module PoEs before clearing cohort for EISA.
- **Gate 07 (EISA Exam Readiness):** Evaluates 16-point checklist (minimum 2 invigilators per room, chief invigilator, venue signage, wall clock, power backup) and triggers hard block if defective.
- **Gate 08 (Accreditation & SARS):** Reconciles CIPC annual returns, lease, public liability, and queries live SARS eFiling TCS PINs.
- **Gate 09 (B-BBEE Evidence):** Assembles stipend payment proof, absorption letters, and reconciles trained seats with WSP/ATR submissions.

### 4.3 AI & OCR Architecture
- **FR-AI-01:** Optical Character Recognition must run via Tesseract 5.3 + PyMuPDF text tokenizers with confidence reporting.
- **FR-AI-02:** Cognitive classification must leverage Google Cloud Vertex AI / Gemini 3.8 Flash to extract legal entity names, tax references, validity dates, SAPS stamps, and digital signatures.
- **FR-AI-03:** Strict zero-assumption rule: Blurry, unsigned, or unverified documents must default to `ACTION REQUIRED` or `CRITICAL NON-COMPLIANCE`.

---

## 5. Non-Functional Requirements (NFRs)

- **Security & POPIA:** Personal information (ID numbers, stipend records, addresses) encrypted in transit (TLS 1.3) and at rest (AES-256).
- **Audit Integrity:** Every gate check and verification event produces a SHA-256 evidence hash.
- **Latency:** OCR extraction and AI classification complete in < 3.5 seconds per multi-page document.
- **Availability:** 99.9% uptime across local and cloud environments.
- **Browser Compatibility:** Responsive layout supporting Chrome, Edge, Safari, and Firefox.

---

## 6. RACI Accountability Matrix

| Procedure | Compliance Agent | Compliance Officer (Tandeeka) | QAC Lead (Phyllis) | Ops Lead | Managing Director (Martin Pienaar) |
|---|:---:|:---:|:---:|:---:|:---:|
| **Learner Document Checks** | Responsible (R) | Accountable (A) | Informed (I) | Informed (I) | Informed (I) |
| **SETA / QCTO Submissions** | R (Drafts) | Accountable (A) | Consulted (C) | Informed (I) | Informed (I) |
| **Expiry Tracking & Escalation** | Responsible (R) | Accountable (A) | Informed (I) | Informed (I) | Informed (I) |
| **Monitoring & Verification Packs**| Responsible (R) | Accountable (A) | Consulted (C) | Informed (I) | Informed (I) |
| **EISA Venue & Staffing Inspection**| R (Checklist) | Consulted (C) | Accountable (A) | Responsible (R) | Informed (I) |
| **SARS TCS PIN Verification** | Responsible (R) | Accountable (A) | Informed (I) | Informed (I) | Accountable (A) |
| **Manual MFA / Dynamic PIN** | Consulted (C) | Responsible (R) | Informed (I) | Informed (I) | Responsible (R) |
