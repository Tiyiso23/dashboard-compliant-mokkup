import React, { useState } from 'react';
import {
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FolderSync,
  Bot,
  KeyRound,
  ShieldCheck,
  Globe,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Send,
  Lock,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  Check,
  X,
} from 'lucide-react';
import {
  ComplianceDocument,
  CompanyEntity,
  CompanyEntityId,
  ExternalBotPingTarget,
  DynamicMfaSession,
  ActiveTab,
  SarsSubTab,
} from '../types';
import { COMPANY_ENTITIES, BOT_PING_TARGETS, INITIAL_DYNAMIC_MFA_SESSIONS } from '../data/mockComplianceData';
import { COMPLIANCE_GATES, NON_CONFORMANCE_REPORTS } from '../data/complianceOsData';

interface DashboardOverviewProps {
  documents: ComplianceDocument[];
  onNavigateToTab: (tab: ActiveTab) => void;
  onNavigateToSarsSubTab: (subTab: SarsSubTab) => void;
  onTriggerRpa: (action: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  documents,
  onNavigateToTab,
  onNavigateToSarsSubTab,
  onTriggerRpa,
}) => {
  // Master Dashboard 2 Separate Tabs Requirement: Academic Compliance vs Consulting Compliance
  const [masterDashboardTab, setMasterDashboardTab] = useState<'academic' | 'consulting'>('academic');
  // Multi-Company Architecture Filter
  const [selectedCompanyId, setSelectedCompanyId] = useState<CompanyEntityId>('all');
  // External Bot Pings state
  const [botTargets, setBotTargets] = useState<ExternalBotPingTarget[]>(BOT_PING_TARGETS);
  const [isPingingBots, setIsPingingBots] = useState(false);
  // Manual Intervention / Dynamic PIN verification sessions
  const [mfaSessions, setMfaSessions] = useState<DynamicMfaSession[]>(INITIAL_DYNAMIC_MFA_SESSIONS);
  const [pinInputs, setPinInputs] = useState<Record<string, string>>({
    'MFA-MICT-88912': '849102',
    'MFA-COIDA-99410': '592184',
  });
  const [pinNotice, setPinNotice] = useState<string | null>(null);

  const gates = COMPLIANCE_GATES;
  const passedGates = gates.filter((g) => g.status === 'PASSED').length;
  const actionGates = gates.filter((g) => g.status === 'ACTION REQUIRED').length;
  const criticalGates = gates.filter((g) => g.status === 'CRITICAL NON-COMPLIANCE').length;

  // Filter documents based on active Master Dashboard Tab (Academic vs Consulting) and Company
  const tabCategory = masterDashboardTab === 'academic' ? 'Academic' : 'Consulting';
  const categoryDocuments = documents.filter((d) => {
    const matchesCategory = d.category === tabCategory;
    if (selectedCompanyId === 'all') return matchesCategory;
    if (selectedCompanyId === 'mwx_consulting') {
      return matchesCategory && (d.companyName.includes('CONSULTING') || d.taxReference === '9012847192');
    }
    if (selectedCompanyId === 'mwx_academy') {
      return matchesCategory && (d.companyName.includes('ACADEMY') || d.category === 'Academic');
    }
    if (selectedCompanyId === 'mwx_holdings') {
      return matchesCategory && d.companyName.includes('HOLDINGS');
    }
    return matchesCategory;
  });

  // Calculate status counts according to the prompt indicator spec:
  // Green for compliance, Yellow for warnings, Red for expired items
  const greenCompliantCount = categoryDocuments.filter((d) => d.status === 'COMPLIANT').length;
  const yellowWarningCount = categoryDocuments.filter((d) => d.status === 'WARNING').length;
  const redExpiredCount = categoryDocuments.filter((d) => d.status === 'EXPIRED').length;

  // Ping External Bots across shared drive folders
  const handlePingAllBots = () => {
    setIsPingingBots(true);
    setTimeout(() => {
      setBotTargets((prev) =>
        prev.map((bot) => ({
          ...bot,
          lastPingStatus: bot.id === 'bot-labour' ? 'ONLINE' : bot.lastPingStatus,
          latencyMs: Math.floor(120 + Math.random() * 90),
          lastPingTime: 'Just now (live verified)',
          verifiedDocuments: bot.verifiedDocuments + 1,
        }))
      );
      setIsPingingBots(false);
      setPinNotice('All 6 external government & regulatory gateways pinged and validated across Google Shared Drive folders.');
      setTimeout(() => setPinNotice(null), 4000);
    }, 1100);
  };

  // Submit manual intervention Dynamic PIN / OTP
  const handleSubmitDynamicPin = (sessionId: string) => {
    const enteredPin = pinInputs[sessionId];
    if (!enteredPin || enteredPin.trim().length < 4) {
      setPinNotice('Please enter a valid 4-to-6 digit dynamic verification PIN.');
      setTimeout(() => setPinNotice(null), 3000);
      return;
    }

    setMfaSessions((prev) =>
      prev.map((s) => (s.sessionId === sessionId ? { ...s, status: 'VERIFIED' } : s))
    );

    // Update matching bot status
    const targetSession = mfaSessions.find((s) => s.sessionId === sessionId);
    if (targetSession) {
      setBotTargets((prev) =>
        prev.map((b) =>
          b.id === targetSession.targetId
            ? { ...b, mfaSessionStatus: 'VERIFIED', lastPingTime: 'Just now (Authenticated with Dynamic PIN)' }
            : b
        )
      );
    }

    setPinNotice(`Manual intervention authenticated: Dynamic PIN "${enteredPin}" accepted. Portal session unlocked.`);
    setTimeout(() => setPinNotice(null), 4500);
  };

  const selectedCompany = COMPANY_ENTITIES.find((c) => c.id === selectedCompanyId) || COMPANY_ENTITIES[0];

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Multi-Company Selector Header */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Mindworx Compliance Agent (ComplianceOS)
            </span>
            <span className="text-[10px] text-slate-500 font-mono">· Multi-Company Architecture</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
              Automated Tracking & Manual Intervention Active
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Master Compliance Dashboard
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Consolidated regulatory oversight featuring automated bots pinging external websites, Google Shared Drive document validity tracking, and human manual intervention for dynamic OTP/TCS PIN verification.
          </p>
        </div>

        {/* Multi-Company Selector Card */}
        <div className="flex flex-col gap-2 shrink-0 bg-slate-950/80 p-4 rounded-lg border border-slate-800 min-w-[280px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              Active Company Entity:
            </span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                selectedCompany.overallStatus === 'COMPLIANT'
                  ? 'text-emerald-400 bg-emerald-950 border-emerald-800'
                  : 'text-amber-400 bg-amber-950 border-amber-800'
              }`}
            >
              {selectedCompany.overallStatus}
            </span>
          </div>

          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value as CompanyEntityId)}
            className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 font-semibold"
          >
            {COMPANY_ENTITIES.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-950 text-slate-200">
                {c.name}
              </option>
            ))}
          </select>

          <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Reg: {selectedCompany.registrationNumber}</span>
            <span className="text-cyan-400">{selectedCompany.activeDocumentsCount} Docs</span>
          </div>
        </div>
      </div>

      {pinNotice && (
        <div className="p-3 bg-cyan-950/90 border border-cyan-800 rounded-lg text-xs text-cyan-200 flex items-center justify-between font-mono animate-fade-in shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{pinNotice}</span>
          </div>
          <button onClick={() => setPinNotice(null)} className="text-cyan-400 hover:text-white">✕</button>
        </div>
      )}

      {/* MASTER DASHBOARD: 2 SEPARATE TABS (Academic Compliance vs Consulting Compliance) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Master Dashboard Focus:
            </span>
            <div className="inline-flex p-1 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => setMasterDashboardTab('academic')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  masterDashboardTab === 'academic'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Academic Compliance Tab</span>
              </button>

              <button
                onClick={() => setMasterDashboardTab('consulting')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  masterDashboardTab === 'consulting'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Consulting Compliance Tab</span>
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
            <span>Folder: </span>
            <span className="text-cyan-300 truncate max-w-xs">{selectedCompany.sharedDriveFolder}</span>
          </div>
        </div>

        {/* STATUS INDICATORS ROW: GREEN for compliance, YELLOW for warnings, and RED for expired items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. GREEN Status Indicator: Compliance */}
          <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                <span>Green · Fully Compliant</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono tabular-nums">
                {greenCompliantCount} Documents
              </div>
              <div className="text-xs text-slate-400">
                Verified against statutory regulations & valid
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* 2. YELLOW Status Indicator: Warnings */}
          <div className="p-4 rounded-lg bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
                <span>Yellow · Warnings & Renewal Window</span>
              </div>
              <div className="text-2xl font-bold text-amber-300 font-mono tabular-nums">
                {yellowWarningCount} Items Flagged
              </div>
              <div className="text-xs text-slate-400">
                Expiring within &lt;30 days or pending certified stamps
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          {/* 3. RED Status Indicator: Expired Items */}
          <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e] animate-pulse"></span>
                <span>Red · Expired / Non-Compliant</span>
              </div>
              <div className="text-2xl font-bold text-rose-400 font-mono tabular-nums">
                {redExpiredCount} Expired
              </div>
              <div className="text-xs text-slate-400">
                Zero unverified assumptions; requires re-filing
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* AUTOMATED BOTS SECTION & SHARED DRIVE VALIDITY TRACKING */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100">
                Automated Bot Network & Shared Drive Document Validity Verification
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Headless Playwright bots continuously ping external governing bodies (SARS, CIPC, SITA, SETA) and verify matching files inside Google Shared Drive folders.
            </p>
          </div>

          <button
            onClick={handlePingAllBots}
            disabled={isPingingBots}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors shadow-sm shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPingingBots ? 'animate-spin' : ''}`} />
            <span>{isPingingBots ? 'Pinging External Gateways...' : 'Trigger Bot Network Ping'}</span>
          </button>
        </div>

        {/* Bot Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {botTargets.map((bot) => (
            <div
              key={bot.id}
              className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 truncate">{bot.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    bot.lastPingStatus === 'ONLINE'
                      ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800'
                      : 'text-amber-400 bg-amber-950/80 border-amber-800'
                  }`}
                >
                  {bot.lastPingStatus === 'ONLINE' ? 'ONLINE (200 OK)' : 'LATENCY WARN'}
                </span>
              </div>

              <div className="text-[11px] font-mono text-cyan-400/90 truncate" title={bot.portalUrl}>
                {bot.portalUrl}
              </div>

              <div className="p-2 bg-slate-900 rounded border border-slate-800/80 text-[10px] font-mono space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>Ping Latency:</span>
                  <span className="text-emerald-400 tabular-nums">{bot.latencyMs}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Monitored Shared Drive:</span>
                  <span className="text-slate-200 truncate max-w-[130px]" title={bot.monitoredFolder}>
                    {bot.monitoredFolder}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Verified Artifacts:</span>
                  <span className="text-cyan-300 font-bold">{bot.verifiedDocuments} Files Active</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>Last check: {bot.lastPingTime}</span>
                {bot.requiresDynamicMfa && (
                  <span className="text-amber-400 font-mono flex items-center gap-1">
                    <KeyRound className="w-3 h-3" />
                    <span>MFA Protected</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MANUAL INTERVENTION SUPPORT: DYNAMIC PASSWORDS & ONE-OFF VERIFICATION PINS */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/40 space-y-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">
                  Manual Intervention Console: Dynamic Passwords & One-Off Verification PINs
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  HUMAN IN THE LOOP
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Some statutory systems (SARS TCS PIN, MICT SETA OTP, Department of Labour CF-Portal) require dynamic passwords, time-based OTPs, or one-off verification codes that cannot be fully bypassed by headless bots.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic PIN Sessions Queue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {mfaSessions.map((session) => (
            <div
              key={session.sessionId}
              className={`p-4 rounded-lg border text-xs space-y-3 transition-all ${
                session.status === 'VERIFIED'
                  ? 'bg-slate-950/80 border-emerald-500/40'
                  : 'bg-slate-950 border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100">{session.portalName}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    session.status === 'VERIFIED'
                      ? 'text-emerald-400 bg-emerald-950 border-emerald-800'
                      : 'text-amber-400 bg-amber-950 border-amber-800 animate-pulse'
                  }`}
                >
                  {session.status === 'VERIFIED' ? 'AUTHENTICATED' : 'ACTION REQUIRED'}
                </span>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                {session.promptMessage}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    disabled={session.status === 'VERIFIED'}
                    value={pinInputs[session.sessionId] || ''}
                    onChange={(e) =>
                      setPinInputs({ ...pinInputs, [session.sessionId]: e.target.value })
                    }
                    placeholder={`Enter ${session.pinType}...`}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-100 font-mono tracking-widest focus:outline-none focus:border-amber-400 disabled:opacity-60"
                  />
                </div>

                <button
                  onClick={() => handleSubmitDynamicPin(session.sessionId)}
                  disabled={session.status === 'VERIFIED'}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm ${
                    session.status === 'VERIFIED'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 cursor-default'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  }`}
                >
                  {session.status === 'VERIFIED' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit PIN</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                <span>Session: {session.sessionId}</span>
                <span>Type: {session.pinType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Active Category Document Register Preview */}
      <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderSync className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-200">
              {masterDashboardTab === 'academic' ? 'Academic Compliance' : 'Consulting Compliance'} Document Roster ({selectedCompany.name})
            </h3>
          </div>
          <button
            onClick={() => onNavigateToTab(masterDashboardTab === 'academic' ? 'academic' : 'consulting')}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
          >
            Open Dedicated {masterDashboardTab === 'academic' ? 'Academic' : 'Consulting'} Centre →
          </button>
        </div>

        <div className="divide-y divide-slate-800/80 border border-slate-800 rounded bg-slate-950/80 overflow-hidden text-xs">
          {categoryDocuments.map((doc) => {
            let statusDot = 'bg-emerald-400 shadow-[0_0_8px_#34d399]';
            let statusText = 'text-emerald-400';
            if (doc.status === 'WARNING') {
              statusDot = 'bg-amber-400 shadow-[0_0_8px_#fbbf24]';
              statusText = 'text-amber-400';
            } else if (doc.status === 'EXPIRED') {
              statusDot = 'bg-rose-400 shadow-[0_0_8px_#f43f5e] animate-pulse';
              statusText = 'text-rose-400';
            }

            return (
              <div key={doc.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/60 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusDot}`}></span>
                    <span className="font-bold text-slate-100">{doc.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">({doc.documentType})</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Entity: {doc.companyName} · Ref: {doc.taxReference} · Verified by: {doc.verifiedBy}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right">
                    <div className="text-slate-300">Exp: {doc.expiryDate}</div>
                    <div className={`text-[11px] ${statusText}`}>{doc.status}</div>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('automation-centre')}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded text-[11px] transition-colors"
                  >
                    OCR Scan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
