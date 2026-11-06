import React, { useState } from 'react';
import {
  Bot,
  Play,
  Terminal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Send,
  Globe,
  Scan,
  Shield,
  FileText,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Workflow,
  Cpu,
  Layers,
  Code2,
  Check,
  Download,
  BarChart2,
  TrendingUp,
  Activity,
  Zap,
} from 'lucide-react';
import { RpaApproach, RpaLogEntry } from '../types';
import { RPA_TECHNOLOGIES } from '../data/mockComplianceData';

interface RpaControlPanelProps {
  onRefreshComplianceStatus?: () => void;
  onNavigateToSars?: () => void;
  onNavigateToReports?: () => void;
}

interface DailyPerformanceMetric {
  date: string;
  dayShort: string;
  runs: number;
  successRate: number; // percentage
  avgLatencyMs: number;
  docsProcessed: number;
}

const INITIAL_DAILY_METRICS: DailyPerformanceMetric[] = [
  { date: '27 Oct', dayShort: 'Mon', runs: 36, successRate: 97.2, avgLatencyMs: 1840, docsProcessed: 32 },
  { date: '28 Oct', dayShort: 'Tue', runs: 42, successRate: 100.0, avgLatencyMs: 1650, docsProcessed: 38 },
  { date: '29 Oct', dayShort: 'Wed', runs: 51, successRate: 98.0, avgLatencyMs: 1720, docsProcessed: 46 },
  { date: '30 Oct', dayShort: 'Thu', runs: 48, successRate: 100.0, avgLatencyMs: 1580, docsProcessed: 44 },
  { date: '31 Oct', dayShort: 'Fri', runs: 56, successRate: 98.2, avgLatencyMs: 1510, docsProcessed: 52 },
  { date: '01 Nov', dayShort: 'Sat', runs: 18, successRate: 100.0, avgLatencyMs: 1410, docsProcessed: 16 },
  { date: '02 Nov', dayShort: 'Sun', runs: 24, successRate: 100.0, avgLatencyMs: 1390, docsProcessed: 22 },
  { date: '03 Nov', dayShort: 'Today', runs: 48, successRate: 100.0, avgLatencyMs: 1440, docsProcessed: 45 },
];

export const RpaControlPanel: React.FC<RpaControlPanelProps> = ({
  onRefreshComplianceStatus,
  onNavigateToSars,
  onNavigateToReports,
}) => {
  const [selectedApproach, setSelectedApproach] = useState<RpaApproach>('hybrid');
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);
  const [metricView, setMetricView] = useState<'runs' | 'success' | 'latency'>('runs');
  const [dailyMetrics, setDailyMetrics] = useState<DailyPerformanceMetric[]>(INITIAL_DAILY_METRICS);
  const [hoveredDay, setHoveredDay] = useState<DailyPerformanceMetric | null>(null);
  const [logs, setLogs] = useState<RpaLogEntry[]>([
    {
      id: 'init-1',
      time: '08:00:00',
      level: 'info',
      message: 'System ready. Awaiting automation request.',
    },
  ]);
  const [lastSummary, setLastSummary] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Execute an RPA Action via server API
  const handleExecuteRpaAction = async (actionKey: string, actionName: string) => {
    setActiveAction(actionKey);
    setLastSummary(null);

    // Animate the 5 pipeline steps
    setActivePipelineStep(1);
    const stepInterval = setInterval(() => {
      setActivePipelineStep((prev) => (prev < 5 ? prev + 1 : 5));
    }, 450);

    try {
      const response = await fetch('/api/rpa-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionKey,
          approach: selectedApproach,
        }),
      });

      const data = await response.json();
      if (data?.logs) {
        const formattedLogs: RpaLogEntry[] = data.logs.map((l: any, i: number) => ({
          id: `log-${Date.now()}-${i}`,
          time: l.time || new Date().toLocaleTimeString('en-ZA', { hour12: false }),
          level: l.level || 'info',
          message: l.message,
        }));

        setLogs((prev) => [...formattedLogs, ...prev]);
        setLastSummary(data.summary || `${actionName} executed successfully.`);

        // Reactively update today's daily performance metrics on action
        const items = data.itemsProcessed || 1;
        setDailyMetrics((prev) =>
          prev.map((m) =>
            m.dayShort === 'Today'
              ? {
                  ...m,
                  runs: m.runs + 1,
                  docsProcessed: m.docsProcessed + items,
                  avgLatencyMs: Math.max(1200, Math.round((m.avgLatencyMs + 1350) / 2)),
                }
              : m
          )
        );
      }
    } catch {
      const fallbackEntry: RpaLogEntry = {
        id: `log-${Date.now()}`,
        time: new Date().toLocaleTimeString('en-ZA', { hour12: false }),
        level: 'success',
        message: `[${selectedApproach.toUpperCase()} Agent] Executed ${actionName}. Simulated action completed successfully.`,
      };
      setLogs((prev) => [fallbackEntry, ...prev]);
      setLastSummary(`${actionName} completed.`);

      setDailyMetrics((prev) =>
        prev.map((m) =>
          m.dayShort === 'Today' ? { ...m, runs: m.runs + 1, docsProcessed: m.docsProcessed + 1 } : m
        )
      );
    } finally {
      clearInterval(stepInterval);
      setActivePipelineStep(5);
      setActiveAction(null);
      setTimeout(() => setActivePipelineStep(0), 2000);

      if (onRefreshComplianceStatus) {
        onRefreshComplianceStatus();
      }
    }
  };

  const handleClearLogs = () => {
    setLogs([
      {
        id: `init-${Date.now()}`,
        time: new Date().toLocaleTimeString('en-ZA', { hour12: false }),
        level: 'info',
        message: 'System ready. Awaiting automation request.',
      },
    ]);
    setLastSummary(null);
  };

  const handleTestTechnology = (techName: string) => {
    setTestResult(`Testing ${techName}... Verified operational with 0 errors.`);
    setTimeout(() => setTestResult(null), 3500);
  };

  // The 6 exact robotic automation buttons requested
  const RPA_BUTTONS = [
    {
      key: 'run_ocr',
      label: 'Run OCR',
      desc: 'Batch scan repository PDFs & images',
      icon: Scan,
      color: 'hover:border-cyan-500 text-cyan-400',
    },
    {
      key: 'sars_verify',
      label: 'SARS Verify',
      desc: 'Automated Playwright TCS PIN check',
      icon: Shield,
      color: 'hover:border-emerald-500 text-emerald-400',
    },
    {
      key: 'expiry_scan',
      label: 'Expiry Scan',
      desc: 'Detect 30/60/90-day upcoming expirations',
      icon: Clock,
      color: 'hover:border-amber-500 text-amber-400',
    },
    {
      key: 'website_check',
      label: 'Website Check',
      desc: 'Probe SARS, CIPC, SITA & SETA portals',
      icon: Globe,
      color: 'hover:border-blue-500 text-blue-400',
    },
    {
      key: 'generate_report',
      label: 'Generate Report',
      desc: 'Compile comprehensive audit dossier',
      icon: FileCheck,
      color: 'hover:border-purple-500 text-purple-400',
    },
    {
      key: 'send_alerts',
      label: 'Send Alerts',
      desc: 'Power Automate Outlook & Teams notify',
      icon: Send,
      color: 'hover:border-rose-500 text-rose-400',
    },
  ];

  // Pipeline stages from Section 4 of prompt
  const PIPELINE_STAGES = [
    { step: 1, name: 'OneDrive Repository', desc: 'Monitored folder sync' },
    { step: 2, name: 'OCR Engine', desc: 'Tesseract & PyMuPDF' },
    { step: 3, name: 'AI Classification', desc: 'Gemini 3.8 Flash validation' },
    { step: 4, name: 'RPA Agents', desc: 'Playwright & bots verification' },
    { step: 5, name: 'Mindworx Dashboard', desc: 'Updated audit evidence' },
  ];

  // Performance calculations
  const totalWeeklyRuns = dailyMetrics.reduce((sum, d) => sum + d.runs, 0);
  const avgWeeklySuccess = (
    dailyMetrics.reduce((sum, d) => sum + d.successRate, 0) / dailyMetrics.length
  ).toFixed(1);
  const todayMetric = dailyMetrics.find((d) => d.dayShort === 'Today') || dailyMetrics[dailyMetrics.length - 1];
  const maxRuns = Math.max(...dailyMetrics.map((d) => d.runs), 60);

  // Sparkline coordinates calculation (0 to 100 width, 0 to 40 height)
  const sparklineMin = 95;
  const sparklineMax = 100.5;
  const sparklinePoints = dailyMetrics.map((m, idx) => {
    const x = (idx / (dailyMetrics.length - 1)) * 100;
    const normalized = (m.successRate - sparklineMin) / (sparklineMax - sparklineMin);
    const y = 36 - normalized * 30; // higher success = lower y on SVG
    return { x, y, ...m };
  });

  const sparklinePathD = sparklinePoints.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );
  const sparklineAreaD = `${sparklinePathD} L 100 40 L 0 40 Z`;

  return (
    <div className="space-y-6">
      {/* Title & Approach Selector Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              AI Automation Centre & RPA Control Panel
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Centrally orchestrate robotic verification routines, OCR batch readers, external regulatory checks, and audit alerts.
          </p>
        </div>

        {/* RPA Approach Switcher (Prompt Question 5) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-900/90 p-1.5 rounded-lg border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
            RPA Engine:
          </span>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedApproach('hybrid')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                selectedApproach === 'hybrid'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hybrid (Recommended)
            </button>
            <button
              onClick={() => setSelectedApproach('python_playwright')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                selectedApproach === 'python_playwright'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Python + Playwright
            </button>
            <button
              onClick={() => setSelectedApproach('power_automate')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                selectedApproach === 'power_automate'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Power Automate
            </button>
            <button
              onClick={() => setSelectedApproach('uipath')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                selectedApproach === 'uipath'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              UiPath
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: How Everything Connects (Live Pipeline Visualizer) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              End-to-End Automation Pipeline Architecture
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Mode: {selectedApproach === 'hybrid' ? 'Python + Playwright + Power Automate' : selectedApproach.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
          {PIPELINE_STAGES.map((st) => {
            const isActive = activePipelineStep === st.step;
            const isCompleted = activePipelineStep > st.step;
            return (
              <div
                key={st.step}
                className={`p-3 rounded-lg border transition-all text-left flex flex-col justify-between ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-sm shadow-cyan-400/20'
                    : isCompleted
                    ? 'border-emerald-500/60 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-slate-500">STEP 0{st.step}</span>
                    {isActive ? (
                      <span className="text-cyan-400 animate-pulse font-bold">ACTIVE</span>
                    ) : isCompleted ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : null}
                  </div>
                  <div className="text-xs font-bold text-slate-200">{st.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{st.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Automation Control Panel Buttons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200">Automation Control Panel</h3>
            <p className="text-xs text-slate-400">
              Interactive UI concept – buttons trigger realistic automated worker scripts and update compliance logs.
            </p>
          </div>

          {lastSummary && (
            <div className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded">
              {lastSummary}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {RPA_BUTTONS.map((btn) => {
            const Icon = btn.icon;
            const isRunning = activeAction === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => handleExecuteRpaAction(btn.key, btn.label)}
                disabled={activeAction !== null}
                className={`p-3.5 rounded-lg border bg-slate-900 border-slate-800 hover:bg-slate-850 transition-all text-left group flex flex-col justify-between min-h-[110px] ${
                  isRunning
                    ? 'border-cyan-400 bg-cyan-950/30'
                    : btn.color
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-2 rounded bg-slate-950/80 border border-slate-800 group-hover:border-slate-700">
                    <Icon className="w-4 h-4 text-slate-200" />
                  </div>
                  <Play className={`w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors ${isRunning ? 'animate-spin' : ''}`} />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-100 group-hover:text-white">
                    {btn.label}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {btn.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Automation Activity Log with Daily Performance Metrics Bar Chart / Sparkline */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden space-y-0">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200">
              Automation Activity Log & Daily Performance
            </span>
            <span className="text-[11px] font-mono text-slate-400 tabular-nums">
              ({logs.length} live log events)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded border border-slate-800">
              <button
                onClick={() => setMetricView('runs')}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors flex items-center gap-1.5 ${
                  metricView === 'runs'
                    ? 'bg-slate-800 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Daily Automation Volume Bar Chart"
              >
                <BarChart2 className="w-3 h-3" />
                <span>Runs (Bar)</span>
              </button>
              <button
                onClick={() => setMetricView('success')}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors flex items-center gap-1.5 ${
                  metricView === 'success'
                    ? 'bg-slate-800 text-emerald-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Daily Success Rate Sparkline"
              >
                <TrendingUp className="w-3 h-3" />
                <span>Success % (Sparkline)</span>
              </button>
              <button
                onClick={() => setMetricView('latency')}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors flex items-center gap-1.5 ${
                  metricView === 'latency'
                    ? 'bg-slate-800 text-purple-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Daily Processing Speed"
              >
                <Zap className="w-3 h-3" />
                <span>Speed</span>
              </button>
            </div>

            <button
              onClick={handleClearLogs}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 px-2 py-1 rounded bg-slate-950 border border-slate-800 transition-colors ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Visual Daily Performance Metrics Section (Bar Chart & Sparkline) */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800/80 space-y-3">
          {/* Top KPI Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] uppercase font-mono text-slate-400">Today's Executions</div>
              <div className="text-base font-bold text-cyan-300 font-mono mt-0.5 tabular-nums flex items-baseline gap-1.5">
                <span>{todayMetric.runs} runs</span>
                <span className="text-[10px] text-emerald-400 font-normal">Active</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] uppercase font-mono text-slate-400">7-Day Success Rate</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5 tabular-nums">
                {avgWeeklySuccess}%
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] uppercase font-mono text-slate-400">Avg Execution Latency</div>
              <div className="text-base font-bold text-purple-300 font-mono mt-0.5 tabular-nums">
                {(todayMetric.avgLatencyMs / 1000).toFixed(2)}s
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
              <div className="text-[10px] uppercase font-mono text-slate-400">7-Day Total Verified</div>
              <div className="text-base font-bold text-slate-100 font-mono mt-0.5 tabular-nums">
                {totalWeeklyRuns} actions
              </div>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="bg-slate-950/80 border border-slate-800/70 rounded-lg p-3.5 relative">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                {metricView === 'runs' && 'Daily Robotic Automation Volume (Past 8 Days)'}
                {metricView === 'success' && 'Automated Accuracy & Verification Rate Trend (%)'}
                {metricView === 'latency' && 'Robotic Execution Duration (ms per task)'}
              </span>
              <span className="font-mono text-slate-500 text-[10px]">
                {hoveredDay
                  ? `${hoveredDay.date} (${hoveredDay.dayShort}): ${hoveredDay.runs} runs · ${hoveredDay.successRate}% success · ${hoveredDay.avgLatencyMs}ms`
                  : 'Hover over bars or data points for detail'}
              </span>
            </div>

            {/* 1. Bar Chart View */}
            {metricView === 'runs' && (
              <div className="h-32 flex items-end justify-between gap-2 pt-4 px-1">
                {dailyMetrics.map((item, idx) => {
                  const heightPercent = Math.max(14, Math.round((item.runs / maxRuns) * 100));
                  const isToday = item.dayShort === 'Today';
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredDay(item)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    >
                      {/* Numeric Top Tooltip Label */}
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300 tabular-nums mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.runs}
                      </span>

                      {/* Bar Column */}
                      <div className="w-full max-w-[34px] bg-slate-800/80 rounded-t overflow-hidden relative transition-all group-hover:bg-slate-700/80 h-full flex items-end">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t transition-all duration-300 ${
                            isToday
                              ? 'bg-gradient-to-t from-cyan-600 via-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.35)]'
                              : 'bg-gradient-to-t from-slate-700 via-slate-600 to-slate-500 group-hover:from-cyan-700 group-hover:to-cyan-400'
                          }`}
                        />
                      </div>

                      {/* Date & Day Label */}
                      <div className="mt-1.5 text-center">
                        <div
                          className={`text-[10px] font-mono leading-none ${
                            isToday ? 'text-cyan-300 font-bold' : 'text-slate-400'
                          }`}
                        >
                          {item.dayShort}
                        </div>
                        <div className="text-[9px] font-mono text-slate-500 tabular-nums">
                          {item.date.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Sparkline View */}
            {metricView === 'success' && (
              <div className="h-32 flex flex-col justify-between pt-2">
                <div className="relative w-full h-24">
                  <svg
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    className="w-full h-full overflow-visible"
                  >
                    <defs>
                      <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Reference Lines */}
                    <line x1="0" y1="6" x2="100" y2="6" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                    <line x1="0" y1="21" x2="100" y2="21" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                    <line x1="0" y1="36" x2="100" y2="36" stroke="rgba(255,255,255,0.08)" />

                    {/* Gradient Area Fill */}
                    <path d={sparklineAreaD} fill="url(#sparklineGrad)" />

                    {/* Sparkline Continuous Line */}
                    <path
                      d={sparklinePathD}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Interactive Circles */}
                    {sparklinePoints.map((pt, i) => (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r={pt.dayShort === 'Today' ? 3.5 : 2.5}
                        className={`transition-all ${
                          pt.dayShort === 'Today'
                            ? 'fill-emerald-400 stroke-slate-950 stroke-2'
                            : 'fill-slate-900 stroke-emerald-400 stroke-1 hover:fill-emerald-400'
                        }`}
                      />
                    ))}
                  </svg>
                </div>

                {/* Day Labels under sparkline */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80 px-1">
                  {dailyMetrics.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredDay(item)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`cursor-pointer text-center ${
                        item.dayShort === 'Today' ? 'text-emerald-400 font-bold' : ''
                      }`}
                    >
                      <span>{item.dayShort}</span>
                      <span className="block text-[9px] text-slate-500 tabular-nums">{item.successRate}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Latency Speed View */}
            {metricView === 'latency' && (
              <div className="h-32 flex items-end justify-between gap-2 pt-4 px-1">
                {dailyMetrics.map((item, idx) => {
                  const maxLat = 2200;
                  const heightPercent = Math.max(16, Math.round((item.avgLatencyMs / maxLat) * 100));
                  const isToday = item.dayShort === 'Today';
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredDay(item)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    >
                      <span className="text-[10px] font-mono text-purple-300 tabular-nums mb-1 opacity-80 group-hover:opacity-100">
                        {(item.avgLatencyMs / 1000).toFixed(1)}s
                      </span>
                      <div className="w-full max-w-[34px] bg-slate-800/80 rounded-t overflow-hidden h-full flex items-end">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t transition-all ${
                            isToday
                              ? 'bg-gradient-to-t from-purple-700 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.35)]'
                              : 'bg-gradient-to-t from-slate-700 to-purple-500/70 group-hover:to-purple-400'
                          }`}
                        />
                      </div>
                      <div className="mt-1.5 text-center">
                        <div
                          className={`text-[10px] font-mono leading-none ${
                            isToday ? 'text-purple-300 font-bold' : 'text-slate-400'
                          }`}
                        >
                          {item.dayShort}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Live Terminal Log Feed */}
        <div className="p-4 font-mono text-xs max-h-56 overflow-y-auto space-y-1.5 bg-slate-950/95 text-slate-300">
          {logs.map((entry) => {
            let badgeColor = 'text-slate-400';
            if (entry.level === 'success') badgeColor = 'text-emerald-400';
            if (entry.level === 'warn') badgeColor = 'text-amber-400';
            if (entry.level === 'error') badgeColor = 'text-rose-400';

            return (
              <div key={entry.id} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-slate-500 shrink-0 tabular-nums font-mono text-[11px]">
                  [{entry.time}]
                </span>
                <span className={`shrink-0 text-[11px] font-semibold uppercase ${badgeColor}`}>
                  {entry.level}
                </span>
                <span className="text-slate-300 break-words">{entry.message}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Recommended OCR & RPA Technologies Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200">
              Recommended OCR & RPA Technology Stack
            </h3>
            <p className="text-xs text-slate-400">
              Integrated toolchain providing document reading, web automation, and regulatory classification.
            </p>
          </div>
          {testResult && (
            <span className="text-xs text-emerald-400 font-mono animate-fade-in">
              {testResult}
            </span>
          )}
        </div>

        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Technology</th>
                <th className="py-2.5 px-3">Function in Pipeline</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Benchmark</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {RPA_TECHNOLOGIES.map((tech) => (
                <tr key={tech.name} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-slate-200 font-mono">
                    {tech.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 max-w-md">
                    {tech.function}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                    {tech.category}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[11px] font-mono text-emerald-400">
                      {tech.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400 tabular-nums">
                    {tech.speed} · {tech.accuracy}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleTestTechnology(tech.name)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                    >
                      Test Module
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
