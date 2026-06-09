import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Wifi,
  Users,
  Activity,
  Cpu,
  Monitor,
  Skull,
  FileText,
  AlertOctagon,
  RefreshCw,
  Share2,
  Terminal,
  ExternalLink,
  BookOpen,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Check,
  Smartphone,
  Eye,
  CloudLightning,
  AlertTriangle,
  Lightbulb,
  FileDown
} from 'lucide-react';
import {
  INITIAL_INTERFACES,
  SIMULATED_TARGETS,
  DEFAULT_ATTACKS,
  generateAttackLogs
} from './data';
import {
  SimulatedInterface,
  WirelessTarget,
  SecurityAttack,
  SecurityReport
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'interfaces' | 'targets' | 'attacks' | 'reports' | 'ai-analysis'>('dashboard');

  // Authorization Consent Safeguard for ethical penetration testing
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [consentName, setConsentName] = useState<string>('');

  // Main Simulated Application State
  const [interfaces, setInterfaces] = useState<SimulatedInterface[]>(INITIAL_INTERFACES);
  const [targets, setTargets] = useState<WirelessTarget[]>(SIMULATED_TARGETS);
  const [selectedTarget, setSelectedTarget] = useState<WirelessTarget | null>(SIMULATED_TARGETS[0]);
  const [attacks, setAttacks] = useState<SecurityAttack[]>(DEFAULT_ATTACKS);
  const [activeAttack, setActiveAttack] = useState<SecurityAttack | null>(null);

  // Deep AI Advisor states
  const [deepAnalysis, setDeepAnalysis] = useState<any>(null);
  const [analyzingDeeply, setAnalyzingDeeply] = useState<boolean>(false);

  // Simulated live execution telemetry & terminals
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '[+] Ready. Select target and initiate automated attack sequence...',
    '[!] Ensure authorized permission before running automated auditing modules.'
  ]);
  const [isRunningAttack, setIsRunningAttack] = useState<boolean>(false);
    
  // AI Vulnerability Report parameters
  const [reports, setReports] = useState<SecurityReport[]>([
    {
      id: "AUDIT-WIFI-001",
      targetEssid: "SmartHome_IoT",
      targetBssid: "CC:23:44:91:00:FF",
      threatLevel: "High",
      cvssScore: 8.4,
      findings: [
        "WPA2 Pre-Shared Key uses old WEP-like shared secrets",
        "WPS PIN-based pin is vulnerable to Pixie Dust attack",
        "Active clients are vulnerable to forced deauthentication broadcast"
      ],
      remediations: [
        "Disable Wi-Fi Protected Setup (WPS) immediately in admin settings",
        "Transition authentication from WPA2 Personal to WPA3-SAE",
        "Segment untrusted IoT devices into an isolated VLAN"
      ],
      rawAnalysis: "Target home IoT node 'SmartHome_IoT' demonstrates legacy pre-shared key security practices. It broadcasts a weak power signal (-68 dB) and actively accepts WPS setup requests. Real-world simulation through automated Pixie Dust exploits successfully extracted PIN-key.",
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }
  ]);
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);

  // Cloud Sync Dashboard telemetry
  const [cloudSynced, setCloudSynced] = useState<boolean>(true);
  const [cloudStats, setCloudStats] = useState({
    totalScannedWifi: 32,
    activeAttacks: 0,
    vulnerableDevices: 14,
    criticalRisks: 4
  });

  const [aiChatInput, setAiChatInput] = useState<string>('');
  const [aiAnalysisLogs, setAiAnalysisLogs] = useState<string[]>([
    `"3 potential Handshake captures detected on wlan0mon. Recommend PMKID attack for faster results."`
  ]);

  // System status parameters (simulating raspberry pi metrics)
  const [cpuTemp, setCpuTemp] = useState<number>(42);
  const [cpuUsage, setCpuUsage] = useState<number>(14);
  const [ramUsage, setRamUsage] = useState<number>(1.2);

  // Cycle simulation background updates to mimic dynamic network scanner behavior
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight microchip temperature / metrics fluctuation
      setCpuTemp(prev => Math.min(85, Math.max(35, prev + (Math.random() * 2 - 1))));
      setCpuUsage(prev => Math.min(99, Math.max(5, Math.floor(prev + (Math.random() * 6 - 3)))));
      if (Math.random() > 0.7) {
        setRamUsage(prev => parseFloat(Math.min(7.9, Math.max(0.8, prev + (Math.random() * 0.2 - 0.1))).toFixed(1)));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Set Monitor mode toggle action
  const toggleInterfaceMode = (ifaceName: string) => {
    setInterfaces(prev => prev.map(iface => {
      if (iface.name === ifaceName) {
        const nextStatus = iface.status === 'MONITOR' ? 'UP' : 'MONITOR';
        return {
          ...iface,
          status: nextStatus,
          activeChannel: nextStatus === 'MONITOR' ? 6 : undefined
        };
      }
      return iface;
    }));
    
    // Add logs to console
    const updatedStatus = interfaces.find(i => i.name === ifaceName)?.status === 'MONITOR' ? 'Managed Mode (UP)' : 'Monitor Mode (Active)';
    setTerminalOutput(prev => [
      ...prev,
      `[+] Interface [${ifaceName}] switched state to: ${updatedStatus}`,
      ifaceName.includes('wlan') && updatedStatus.includes('Monitor') 
        ? `[!] Activated raw packet sniffing & injection capabilities on interface ${ifaceName}` 
        : `[!] Returned interface to standard managed TCP/IP networking state.`
    ]);
  };

  // Launch Attack simulation
  const startSimulationAttack = (attack: SecurityAttack) => {
    if (!authorized) {
      setTerminalOutput(prev => [
        ...prev,
        `[❌ ERROR] ATTACK BLOCKED: You must accept Authorized Pentesting Consent in the footer prior to engaging security modules.`
      ]);
      setActiveTab('dashboard');
      return;
    }
    
    if (!selectedTarget) {
      setTerminalOutput(prev => [
        ...prev,
        `[❌ ERROR] No target wireless BSSID selected. Please check the network target discovery panel.`
      ]);
      return;
    }

    setIsRunningAttack(true);
    setActiveAttack(attack);
    setTerminalOutput([
      `[+] Booting automated framework: ${attack.name}...`,
      `[+] Target ESSID matched: ${selectedTarget.essid} (${selectedTarget.bssid})`,
      `[+] Directing RF injection towards channel: ${selectedTarget.channel} with power level: ${selectedTarget.signal} dBm`
    ]);

    // Simulate real terminal output timing step by step
    const simulatedLogs = generateAttackLogs(attack.id, selectedTarget.essid, selectedTarget.bssid);
    let logIndex = 0;

    const timer = setInterval(() => {
      if (logIndex < simulatedLogs.length) {
        setTerminalOutput(prev => [...prev, simulatedLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(timer);
        setIsRunningAttack(false);
        
        // Attack completed, mark as successful or captured depending on type
        // Update selectedTarget details locally to reflect success (e.g. handshake captured)
        const updatedTarget = { ...selectedTarget, handshakeCaptured: true };
        setSelectedTarget(updatedTarget);
        setTargets(prev => prev.map(t => t.bssid === selectedTarget.bssid ? { ...t, handshakeCaptured: true } : t));

        setTerminalOutput(prev => [
          ...prev,
          `[✓] Simulation attack completed with state: SUCCESS. Ready to generate vulnerability assessment report.`
        ]);

        // Automatically update cloud telemetry counts
        setCloudStats(prev => ({
          ...prev,
          activeAttacks: 0,
          vulnerableDevices: prev.vulnerableDevices + 1,
          criticalRisks: selectedTarget.security.includes('TKIP') ? prev.criticalRisks + 1 : prev.criticalRisks
        }));
      }
    }, 450);
  };

  // Agentic AI Vulnerability Report Generator via /api/audit/generate-report endpoint
  const requestAiAnaylsisReport = async () => {
    if (!selectedTarget) {
      alert("Please select a target wireless access point.");
      return;
    }

    setGeneratingReport(true);
    setTerminalOutput(prev => [
      ...prev,
      `[AI Assistant] Analyzing target vulnerability payload via Gemini API...`
    ]);

    try {
      const response = await fetch("/api/audit/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target: selectedTarget,
          attackDetails: activeAttack || { name: "Manual Security Scan", status: "SUCCESS" },
          testLogs: terminalOutput.slice(-8)
        })
      });

      const data = await response.json();
      
      const newReport: SecurityReport = {
        id: `AUDIT-WIFI-0${reports.length + 1}`,
        targetEssid: selectedTarget.essid,
        targetBssid: selectedTarget.bssid,
        threatLevel: data.threatLevel || "High",
        cvssScore: data.cvssScore || 8.1,
        findings: data.findings || ["Unsecured credential key usage detected", "Missing PMF (Protected Management Frames)"],
        remediations: data.remediations || ["Enforce strong PSK rules", "Migrate keying algorithm"],
        rawAnalysis: data.rawAnalysis || "The system presents critical protocol fallback issues susceptible to offline cracking.",
        timestamp: new Date().toISOString()
      };

      setReports(prev => [newReport, ...prev]);
      
      // Update local AI Chat Advisor feedback
      setAiAnalysisLogs(prev => [
        `"Generated vulnerability audit for ${selectedTarget.essid}: Threat identified as ${newReport.threatLevel} with CVSS: ${newReport.cvssScore}."`,
        ...prev
      ]);

      // Push to remote synchronized cloud dashboard instantly
      await fetch("/api/cloud/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newReport })
      });

      setCloudSynced(true);
      setActiveTab('reports');

    } catch (err) {
      console.error(err);
      setTerminalOutput(prev => [...prev, `[❌ AI ERROR] Server failed responding. Adding fallback simulated report.`]);
      
      // Fallback local report creation
      const fallbackReport: SecurityReport = {
        id: `AUDIT-WIFI-0${reports.length + 1}`,
        targetEssid: selectedTarget.essid,
        targetBssid: selectedTarget.bssid,
        threatLevel: "High",
        cvssScore: 8.5,
        findings: [
          `WPA handshakes easily captured on AP: ${selectedTarget.essid}`,
          `Susceptible to remote deauthentication broadcast sequence`,
          `No rogue AP or evil twin mitigation system detected`
        ],
        remediations: [
          "Enable 802.11w Protected Management Frames (PMF) on target AP",
          "Upgrade hardware profile to utilize WPA3-SAE cryptography",
          "Rotate administrative SSID passwords using 16+ alphanumeric characters"
        ],
        rawAnalysis: "Target AP exhibits substantial cryptographic fallbacks. Direct injection methods captured critical EAPOL handshakes, allowing potential decryption via automated toolkits.",
        timestamp: new Date().toISOString()
      };
      setReports(prev => [fallbackReport, ...prev]);
      setActiveTab('reports');
    } finally {
      setGeneratingReport(false);
    }
  };

  // Deep Agentic AI Security landscape analysis & prioritized prioritization generator
  const requestDeepSecurityAnalysis = async () => {
    setAnalyzingDeeply(true);
    setTerminalOutput(prev => [
      ...prev,
      `[AI Agent] Connecting to intelligent security engine to analyze scannable active targets, historical audit reports, and local system metrics...`
    ]);

    try {
      const response = await fetch("/api/audit/security-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targets,
          reports,
          systemMetrics: { cpuTemp, cpuUsage, ramUsage }
        })
      });

      const data = await response.json();
      setDeepAnalysis(data);
      setTerminalOutput(prev => [
        ...prev,
        `[✓] Intelligent agentive analysis successfully prepared. Deep recommended security parameters available.`
      ]);
    } catch (err) {
      console.error(err);
      setTerminalOutput(prev => [
        ...prev,
        `[❌ AI ERROR] Failed loading full landscaping analysis. Running default heuristic rule solver...`
      ]);

      // Fallback offline analysis
      setDeepAnalysis({
        executiveSummary: "Off-grid heuristic calculation shows vulnerable entry points across scanned legacy networks. Weak encryption standards and unprotected PIN generators represent highest risks. System is operating at extreme security deficit.",
        securityGrade: "D+",
        prioritizedRecommendations: [
          {
            "id": "REC-01",
            "priority": "Immediate",
            "category": "Encryption Protocol",
            "title": "Deprecate TKIP Cipher Suites & Transition to AES/WPA3",
            "description": "Enterprise_SEC_2.4G operates utilizing WPA-TKIP. This enables attackers to inject frames and capture bidirectional streams safely within seconds.",
            "impact": "Decreases susceptibility to packet reinjection and offline brute-force cracking to virtually zero.",
            "remedialBlueprint": "# In hostapd.conf or Enterprise AP controller template:\n# Require robust WPA2 CCMP or WPA3 SAE\nwpa=2\nwpa_key_mgmt=WPA-PSK\nwpa_pairwise=CCMP\n# Or configure WPA3 SAE specifically:\n# wpa_key_mgmt=WPA-PSK-SHA256 SAE"
          },
          {
            "id": "REC-02",
            "priority": "High",
            "category": "Password Policy",
            "title": "Replace Low-Entropy Alphanumeric Passwords",
            "description": "Target APs demonstrated susceptibility to common dictionary attacks, allowing captured four-way handshakes to be matched effortlessly against common lists.",
            "impact": "Forces high computation resistance against offline hashcat clusters.",
            "remedialBlueprint": "# Generate a cryptographically secure key consisting of 24 characters:\nopenssl rand -base64 18 | tr -d '+/=' | cut -c1-24"
          },
          {
            "id": "REC-03",
            "priority": "High",
            "category": "Network Segmentation",
            "title": "Segment Untrusted IoT & Smart Devices",
            "description": "SmartHome_IoT network allows local broadcasts across all endpoints, which allows attackers who have compromised simple devices to move laterally to PC consoles.",
            "impact": "Isolates breached segments, stopping lateral propagation dead.",
            "remedialBlueprint": "# Configure local VLAN segmentation and separate subnetwork routing\n# On Router / Switches:\n# Interface VLAN 10 (Smart devices) -> subnet 192.168.10.0/24\n# Interface VLAN 20 (Secure Clients) -> subnet 192.168.20.0/24\n# Impose ACLs block tracking between VLAN 10 & 20!"
          }
        ],
        vulnerabilityCountByCategory: {
          "encryption": 1,
          "wps": 2,
          "trafficSniffing": 2,
          "evilTwin": 1
        }
      });
    } finally {
      setAnalyzingDeeply(false);
    }
  };

  // Mock PDF Generation trigger for user's final year report needs
  const downloadPdfReport = (report: SecurityReport) => {
    // Elegant client-side printing/saving layout helper or alert.
    // Rather than window.alert, we print the element to simulated logs
    setTerminalOutput(prev => [
      ...prev,
      `[✓] Compiled full security report PDF artifact for: ${report.targetEssid}`,
      `[✓] Download stream: /root/reports/${report.id}_redteam_export.pdf successfully saved!`
    ]);
    alert(`Downloaded PDF Report for ${report.targetEssid}\nFile Saved: ${report.id}_redteam_export.pdf\n\nThreat Level: ${report.threatLevel}\nCVSS Score: ${report.cvssScore}`);
  };

  const submitCustomConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (consentName.trim() === '') return;
    setAuthorized(true);
    setTerminalOutput(prev => [
      ...prev,
      `[⚡ AUTHORIZATION SIGNED BY: ${consentName.toUpperCase()}]`,
      `[✓] Verification signature validated. Automated offensive suites unlocked. Use with caution.`
    ]);
  };

  return (
    <div className="w-[1024px] h-[768px] bg-[#0A0A0B] text-slate-300 flex flex-col font-sans overflow-hidden border-4 border-[#1A1A1E] mx-auto my-4 rounded shadow-2xl">
      
      {/* Global Header / System Status Bar */}
      <header className="h-14 border-b border-[#2D2D33] bg-[#141417] flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></div>
            <span className="font-bold tracking-tighter text-white text-lg font-mono">KALI-PI 5 RED TEAM</span>
          </div>
          <div className="h-6 w-[1px] bg-[#2D2D33] mx-6"></div>
          
          {/* Simulated hardware metrics representing raspberry pi internals */}
          <div className="flex gap-6 text-[11px] font-mono">
            <div className="flex flex-col">
              <span className="text-slate-500 uppercase text-[10px]">CPU TEMP</span>
              <span className={cpuTemp > 65 ? "text-red-400 font-bold" : "text-emerald-400"}>
                {cpuTemp.toFixed(1)}°C
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 uppercase text-[10px]">CPU LOAD</span>
              <span className="text-emerald-400">{cpuUsage}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 uppercase text-[10px]">RAM</span>
              <span className="text-emerald-400">{ramUsage} / 8.0 GB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 uppercase text-[10px]">SDR BAND</span>
              <span className="text-cyan-400 font-bold">WIFI + BLE + IMSI</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`px-2 py-0.5 rounded border text-[10px] uppercase font-mono font-bold tracking-widest ${authorized ? 'bg-red-950/40 text-red-400 border-red-500/30' : 'bg-amber-950/30 text-amber-500 border-amber-500/20'}`}>
            {authorized ? 'SUITE UNLOCKED' : 'MUTED STANDBY'}
          </div>
          <div className="px-3 py-1 bg-[#232329] rounded border border-[#3A3A42] text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
            Cloud Sync: Active
          </div>
          <button 
            onClick={() => {
              setAuthorized(false);
              setTerminalOutput(prev => [...prev, '[✖ WARNING] Emergency stop applied. Active simulation processes aborted. Suite returned to secure standby model.']);
            }} 
            className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition-all shadow-[0_0_10px_rgba(220,38,38,0.4)]"
          >
            EMERGENCY KILL
          </button>
        </div>
      </header>

      {/* Main workspace layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Hand Navigation Sidebar */}
        <nav className="w-60 border-r border-[#2D2D33] bg-[#0F0F12] flex flex-col p-4 shrink-0">
          <div className="space-y-1 mb-6">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 px-2">System Workspaces</div>
            
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs font-medium transition-all ${activeTab === 'dashboard' ? 'bg-[#2D2D33] text-white font-semibold' : 'text-slate-400 hover:bg-[#1A1A1E]'}`}
            >
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-red-500" />
                <span>War Room Dashboard</span>
              </div>
              {isRunningAttack && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>}
            </button>

            <button 
              onClick={() => setActiveTab('interfaces')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs font-medium transition-all ${activeTab === 'interfaces' ? 'bg-[#2D2D33] text-white font-semibold' : 'text-slate-400 hover:bg-[#1A1A1E]'}`}
            >
              <div className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interface Configuration</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono">
                {interfaces.filter(i => i.status === 'MONITOR').length} Mon
              </span>
            </button>

            <button 
              onClick={() => setActiveTab('targets')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs font-medium transition-all ${activeTab === 'targets' ? 'bg-[#2D2D33] text-white font-semibold' : 'text-slate-400 hover:bg-[#1A1A1E]'}`}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
                <span>Target Reconnaissance</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#1F1414] text-red-400 rounded font-mono">
                {targets.length} APs
              </span>
            </button>

            <button 
              onClick={() => setActiveTab('attacks')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs font-medium transition-all ${activeTab === 'attacks' ? 'bg-[#2D2D33] text-white font-semibold' : 'text-slate-400 hover:bg-[#1A1A1E]'}`}
            >
              <div className="flex items-center gap-2">
                <Skull className="w-3.5 h-3.5 text-red-400" />
                <span>Automated Attack Suite</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs font-medium transition-all ${activeTab === 'reports' ? 'bg-[#2D2D33] text-white font-semibold' : 'text-slate-400 hover:bg-[#1A1A1E]'}`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Vulnerability Reports</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#1A1521] text-purple-400 rounded font-mono">
                {reports.length} Reports
              </span>
            </button>

            <button 
              onClick={() => {
                setActiveTab('ai-analysis');
                if (!deepAnalysis) {
                  requestDeepSecurityAnalysis();
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs font-medium transition-all ${activeTab === 'ai-analysis' ? 'bg-[#2D2D33] text-white font-semibold animate-pulse' : 'text-slate-400 hover:bg-[#1A1A1E]'}`}
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-400 font-bold">Agentic AI Defender</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 bg-red-950 font-bold text-red-400 rounded font-mono">
                PRO ACTIVE
              </span>
            </button>
          </div>

          {/* AI Guide Module Column */}
          <div className="mt-auto pt-4 border-t border-[#2D2D33] flex flex-col gap-3">
            <div className="p-3 bg-[#131317] rounded border border-[#2D2D33]">
              <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-1 px-1 flex items-center gap-1">
                <BrainCircuit className="w-3 h-3" />
                <span>Agentic AI Pro Advisor</span>
              </div>
              <div className="text-[11px] leading-relaxed text-slate-400 italic font-mono space-y-2">
                {aiAnalysisLogs.slice(0, 1).map((log, index) => (
                  <p key={index}>{log}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 font-semibold uppercase px-1">AI Recommendation Query</span>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Ask Kali-Pi AI pro..."
                  value={aiChatInput}
                  onChange={(e) => setAiChatInput(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && aiChatInput.trim() !== '') {
                      const userQuery = aiChatInput;
                      setAiChatInput('');
                      setAiAnalysisLogs(prev => [`"Evaluating query: ${userQuery}..."`, ...prev]);
                      
                      try {
                        const res = await fetch("/api/audit/generate-report", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            target: selectedTarget || targets[0],
                            attackDetails: { name: `User Query: ${userQuery}`, status: "SIMULATION" },
                            testLogs: [userQuery]
                          })
                        });
                        const resData = await res.json();
                        setAiAnalysisLogs(prev => [
                          `"Insight for [${userQuery}]: recommended focus on implementing ${resData.remediations?.[0] || 'WPA3 algorithm migration'} and resolving CVSS vulnerability levels."`,
                          ...prev
                        ]);
                      } catch {
                        setAiAnalysisLogs(prev => [
                          `"Insight: Ensure target uses encryption above standard WPA2 keys. Weak ciphers allow direct packet analysis."`,
                          ...prev
                        ]);
                      }
                    }
                  }}
                  className="bg-[#141417] text-xs px-2.5 py-1.5 rounded border border-[#2D2D33] focus:border-red-500/50 outline-none flex-1 font-mono text-slate-300 placeholder-slate-600"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Workspace Frame */}
        <main className="flex-1 p-5 bg-[#0A0A0B] flex flex-col gap-5 overflow-y-auto">
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-5">
              {/* Telemetry counters simulating internet accessible global dashboard metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-4 flex flex-col relative overflow-hidden group">
                  <div className="absolute right-3 top-3 opacity-10 font-bold text-3xl font-mono text-white">RF</div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">SCANNED APS</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1">{targets.length}</span>
                  <span className="text-[10px] text-emerald-500 font-mono mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    Passive Sniffing Live
                  </span>
                </div>

                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-4 flex flex-col relative overflow-hidden">
                  <div className="absolute right-3 top-3 opacity-10 font-bold text-3xl font-mono text-white">ATT</div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">ACTIVE ATTACKS</span>
                  <span className={`text-2xl font-bold font-mono mt-1 ${isRunningAttack ? 'text-red-500' : 'text-neutral-500'}`}>
                    {isRunningAttack ? '1 RUNNING' : '0 IDLE'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono mt-1">
                    {activeAttack ? activeAttack.name.substring(0, 18) + '...' : 'Standby Mode'}
                  </span>
                </div>

                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-4 flex flex-col relative overflow-hidden">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">VULNERABILITY LEVEL</span>
                  <span className="text-2xl font-bold text-red-500 font-mono mt-1">9.8/10</span>
                  <span className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                    <AlertOcIcon className="w-3.5 h-3.5 text-red-400" />
                    WPA-TKIP Detected
                  </span>
                </div>

                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">CLOUD DASHBOARD LINK</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-blue-400 font-semibold">Ready</span>
                    <button 
                      onClick={() => {
                        alert("Internet Cloud Telemetry enabled.\nYour laboratory partners can view this exact audit database state in real-time under telemetry sync key: RT-ALPHA-772.");
                      }} 
                      className="text-[10px] flex items-center gap-1 bg-blue-900/40 hover:bg-blue-900/70 border border-blue-500/45 px-2 py-1 rounded text-blue-300 font-mono transition-all"
                    >
                      <span>TEST LINK</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">Telemetry database key: RT-ALPHA-772</span>
                </div>
              </div>

              {/* Primary Workspace Grid: Target Scan & Terminal Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Target Discovery Selection Panel */}
                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-4 flex flex-col h-[280px]">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                      <Wifi className="w-3.5 h-3.5 text-red-500" />
                      <span>Target Wireless Scan (Airodump-NG)</span>
                    </h3>
                    <button 
                      onClick={() => {
                        setTerminalOutput(prev => [...prev, '[+] Initiating rapid wireless channel scan sweep (Ch 1-13)...']);
                      }} 
                      className="p-1 hover:bg-[#232329] rounded transition-all text-slate-400 hover:text-white"
                      title="Rescan"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                    {targets.map((tgt) => (
                      <div 
                        key={tgt.bssid}
                        onClick={() => setSelectedTarget(tgt)}
                        className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-all cursor-pointer border ${selectedTarget?.bssid === tgt.bssid ? 'bg-red-950/20 border-red-500/40' : 'bg-[#0F0F12] border-[#232329] hover:border-slate-700'}`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white font-mono">{tgt.essid}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold font-mono ${tgt.security.includes('OPEN') ? 'bg-yellow-950/50 text-yellow-400' : tgt.security.includes('WPA3') ? 'bg-emerald-950/50 text-emerald-400' : 'bg-red-950/50 text-red-400'}`}>
                              {tgt.security}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{tgt.bssid} • Ch {tgt.channel}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`${tgt.signal > -50 ? 'text-emerald-400' : 'text-slate-400'} font-mono`}>
                            {tgt.signal} dBm
                          </span>
                          {tgt.handshakeCaptured ? (
                            <span className="text-[10px] bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                              HS OK
                            </span>
                          ) : (
                            <span className="text-[10px] bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                              NO HS
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTarget && (
                    <div className="pt-2 border-t border-[#232329] mt-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Selected AP: <strong>{selectedTarget.essid}</strong></span>
                      <button 
                        onClick={() => setActiveTab('attacks')} 
                        className="text-xs text-red-400 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <span>Launch attack suite</span>
                        <Skull className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Simulated kali linux terminal console panel */}
                <div className="bg-[#0F0F12] border border-[#2D2D33] rounded-xl p-4 flex flex-col font-mono text-[11px] h-[280px]">
                  <div className="flex justify-between items-center mb-2 shrink-0">
                    <h3 className="text-xs font-bold text-slate-400 font-sans uppercase tracking-widest flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Console [tty0/root@kali-pi-5]</span>
                    </h3>
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setTerminalOutput(['[+] Terminal session initialized. ready.'])} 
                        className="text-slate-500 hover:text-slate-300 transition-all font-sans text-[10px]"
                      >
                        CLEAR
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 bg-black p-3.5 rounded border border-[#232329] overflow-y-auto text-emerald-500/90 font-mono text-[10px] space-y-1.5">
                    {terminalOutput.map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                    {isRunningAttack && (
                      <div className="flex items-center gap-2 text-yellow-400 animate-pulse mt-1">
                        <span>[~] Simulating ongoing process payload injection...</span>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      </div>
                    )}
                    <div className="mt-2 flex items-center">
                      <span className="animate-pulse mr-2 text-white">_</span>
                      <span className="text-slate-500">root@kali-pi-5:~#</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Section: Deep vulnerability report overview */}
              <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-950/40 text-red-400 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Automated Vulnerability Scanner & Pro AI Suggestions</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      Upon completing a wireless network handshake capture or Pixie Dust attack simulation, pass the security telemetry payload to our agentic AI solver to evaluate threats, score CVSS, and generate mitigations.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={requestAiAnaylsisReport}
                    disabled={generatingReport || isRunningAttack}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white rounded text-xs font-bold font-mono transition-all tracking-wider flex items-center gap-1.5"
                  >
                    {generatingReport ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>AI RETRIEVING REPORT...</span>
                      </>
                    ) : (
                      <>
                        <Skull className="w-3.5 h-3.5" />
                        <span>GENERATE VULNERABILITY REPORT</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab('reports')} 
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold transition-all"
                  >
                    Browse Reports ({reports.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interface Configuration View */}
          {activeTab === 'interfaces' && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-5">
                <h3 className="text-sm font-bold text-white mb-2">Hardware Transceiver Port Settings</h3>
                <p className="text-xs text-slate-400 mb-4">
                  For your final year project presentation, we represent dual-use Wi-Fi, Bluetooth, and cellular hardware modules hooked up to the Raspberry Pi 5. Toggle Monitor mode to enable raw packet injection simulations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interfaces.map((iface) => (
                    <div 
                      key={iface.name} 
                      className={`p-4 rounded-xl border flex flex-col justify-between h-32 transition-all ${iface.status === 'MONITOR' ? 'bg-emerald-950/10 border-emerald-500/35 ring-1 ring-emerald-500/10' : 'bg-[#0F0F12] border-[#2D2D33]'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold font-mono text-white">{iface.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ${iface.status === 'MONITOR' ? 'bg-emerald-900/30 text-emerald-400' : iface.status === 'UP' ? 'bg-blue-900/30 text-blue-400' : 'bg-slate-900 text-slate-500'}`}>
                              {iface.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 font-mono">{iface.chipset}</p>
                        </div>
                        <span className="text-[10px] uppercase text-slate-400 font-mono font-bold tracking-widest">{iface.type}</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#232329] pt-2.5 mt-2">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {iface.status === 'MONITOR' ? `CH: ${iface.activeChannel || 6} | RSSI Sniffer Active` : 'Net Connection: Ready'}
                        </span>
                        
                        {iface.type === 'wifi' ? (
                          <button 
                            onClick={() => toggleInterfaceMode(iface.name)} 
                            className={`text-[10px] font-bold px-2.5 py-1 rounded transition-all ${iface.status === 'MONITOR' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                          >
                            {iface.status === 'MONITOR' ? 'ACTIVATE MANAGED' : 'SWITCH TO MONITOR'}
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              const nextStatus = iface.status === 'UP' ? 'DOWN' : 'UP';
                              setInterfaces(prev => prev.map(i => i.name === iface.name ? { ...i, status: nextStatus } : i));
                              setTerminalOutput(prev => [...prev, `[+] Port changed: interface ${iface.name} switched state to ${nextStatus}`]);
                            }} 
                            className={`text-[10px] font-bold px-2.5 py-1 rounded transition-all ${iface.status === 'UP' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-emerald-800 text-white'}`}
                          >
                            {iface.status === 'UP' ? 'DISABLE INTERFACE' : 'ACTIVATE PORT'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0F0F12] border border-[#2D2D33] rounded-xl p-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Terminal Injection Pipeline Info</span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  The raspberry pi 5 utilizes raw link layer raw sockets on BCM chipsets to inject arbitrary packets. Changing interfaces to monitor mode changes interface driver structures internally, stopping modern routing but enabling native pentesting utilities to execute deauthentication commands.
                </p>
              </div>
            </div>
          )}

          {/* Network Discovery Target View */}
          {activeTab === 'targets' && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Target Wireless Networks (Airodump Scan Results)</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Select a destination target access point to perform authorized credential audits on.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setTerminalOutput(prev => [...prev, '[+] Initiating comprehensive multi-channel reconnaissance sweep...']);
                      }} 
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded transition-all font-mono"
                    >
                      RESCAN AIRPORT RADAR
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {targets.map((tgt) => (
                    <div 
                      key={tgt.bssid} 
                      onClick={() => setSelectedTarget(tgt)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedTarget?.bssid === tgt.bssid ? 'bg-red-950/15 border-red-500/40' : 'bg-[#0F0F12] border-[#2D2D33] hover:border-slate-700'} flex flex-col md:flex-row justify-between gap-4`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-lg border shrink-0 ${tgt.security.includes('TKIP') || tgt.security.includes('OPEN') ? 'bg-red-950/40 text-red-400 border-red-500/20' : 'bg-slate-900 text-slate-400 border-[#2D2D33]'}`}>
                          <Wifi className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white font-mono">{tgt.essid}</span>
                            <span className={`text-[10px] px-1.5 font-bold rounded font-mono ${tgt.security.includes('WPA3') ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20' : 'bg-red-950/50 text-red-400 border border-red-500/20'}`}>
                              {tgt.security}
                            </span>
                            {tgt.wpsEnabled && (
                              <span className="text-[10px] bg-sky-950 text-sky-400 border border-sky-500/25 px-1.5 py-0.2 rounded font-mono font-bold">
                                WPS ACTIVE
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-4 text-[10px] text-slate-500 font-mono mt-1">
                            <span>BSSID: <strong>{tgt.bssid}</strong></span>
                            <span>Channel: <strong>{tgt.channel}</strong></span>
                            <span>Attached Clients: <strong>{tgt.clientsCount}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#2D2D33]/40 pt-2.5 md:pt-0">
                        <div className="text-right font-mono text-[11px] flex flex-col md:items-end">
                          <span className="text-slate-500 text-[9px] uppercase">Rssi Signal</span>
                          <span className={`font-bold ${tgt.signal > -50 ? 'text-emerald-400' : 'text-slate-400'}`}>{tgt.signal} dBm</span>
                        </div>
                        <div className="text-right font-mono text-[11px] flex flex-col md:items-end">
                          <span className="text-slate-500 text-[9px] uppercase">Telemetry</span>
                          <span className="text-slate-300 font-semibold">{tgt.handshakeCaptured ? 'CAPUTURED' : 'PENDING'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Automated Attacks View */}
          {activeTab === 'attacks' && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Ethical Automated Attack & Penetration Suite</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose a real-world automated testing method below. Ensure you have targeted an ESSID and accepted compliance conditions first.
                    </p>
                  </div>
                  {selectedTarget && (
                    <div className="px-3 py-1.5 bg-[#0F0F12] border border-[#2D2D33] rounded text-xs">
                      Targeting AP: <span className="font-bold text-red-400">{selectedTarget.essid}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attacks.map((atk) => (
                    <div key={atk.id} className="p-4 bg-[#0F0F12] border border-[#2D2D33] rounded-xl flex flex-col justify-between h-44">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-white">{atk.name}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 bg-slate-900 border border-[#2D2D33] rounded text-slate-400 font-mono">
                            {atk.protocol}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans mt-2 leading-relaxed">
                          {atk.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#232329] pt-3 mt-3">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                          Complexity: <strong>{atk.complexity}</strong>
                        </span>

                        <button 
                          onClick={() => startSimulationAttack(atk)}
                          disabled={isRunningAttack || !selectedTarget || (!selectedTarget.wpsEnabled && atk.id === 'attack-2')}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-xs font-mono font-bold text-white rounded transition-all flex items-center gap-1.5"
                        >
                          <Play className="w-3 h-3" />
                          <span>LAUNCH SIMULATOR</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vulnerability Reports View */}
          {activeTab === 'reports' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">AI Security Auditing & Penetration Reports</h3>
                  <p className="text-xs text-slate-400 mt-1">Generated by Raspberry Pi 5 terminal outcomes and calculated suggestions by Agentic AI model.</p>
                </div>
                <button 
                  onClick={requestAiAnaylsisReport}
                  disabled={generatingReport}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 rounded text-xs text-white font-mono font-bold transition-all"
                >
                  AUDIT NEXT AP
                </button>
              </div>

              {reports.length === 0 ? (
                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-10 text-center">
                  <span className="text-slate-500 text-xs font-mono">No target audits generated yet. Initiate an attack to capture handshakes and generate report summaries.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((rep) => (
                    <div key={rep.id} className="bg-[#141417] border border-[#2D2D33] rounded-xl p-5 flex flex-col gap-4">
                      
                      {/* Header metadata summary */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#2D2D33] gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${rep.threatLevel === 'Critical' ? 'bg-red-950 text-red-400 border border-red-500/30' : 'bg-amber-950 text-amber-400'}`}>
                            {rep.threatLevel.toUpperCase()} THREAT
                          </div>
                          <span className="text-xs font-bold text-white font-mono">{rep.id}</span>
                          <span className="text-xs text-slate-400">Target Node: <strong className="text-white">{rep.targetEssid}</strong> ({rep.targetBssid})</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] text-slate-500 font-mono">AUDITED: {new Date(rep.timestamp).toLocaleString()}</span>
                          <button 
                            onClick={() => downloadPdfReport(rep)}
                            className="text-[10px] font-mono bg-[#0F0F12] border border-[#2D2D33] hover:border-slate-600 text-slate-400 hover:text-white px-2.5 py-1 rounded transition-all flex items-center gap-1.5"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                            <span>SAVE PDF REPORT</span>
                          </button>
                        </div>
                      </div>

                      {/* Score metrics split */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        
                        {/* CVSS Metric Badge */}
                        <div className="bg-[#0F0F12] border border-[#232329] rounded-xl p-4 flex flex-col justify-center items-center">
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-tight">VULN CVSS SCORE</span>
                          <span className="text-3xl font-extrabold font-mono text-white mt-1">{rep.cvssScore}</span>
                          <span className="text-[10px] text-slate-400 font-sans mt-0.5">Scale Level v3.1</span>
                        </div>

                        {/* Audit findings bullet points */}
                        <div className="md:col-span-3 bg-[#0F0F12] border border-[#232329] rounded-xl p-4 flex flex-col gap-2">
                          <span className="text-[10px] text-red-400 font-bold font-mono tracking-wider">CRITICAL FINDINGS SUMMARY</span>
                          <ul className="text-xs text-slate-300 space-y-1.5">
                            {rep.findings.map((f, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Technical Analysis statement */}
                      <div className="p-4 bg-[#212128]/30 rounded-lg border border-[#2F2F3D] flex flex-col gap-1.5">
                        <span className="text-[10px] text-cyan-400 font-bold font-mono">DETAILED MITIGATION REMEDIATIONS</span>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          {rep.remediations.map((rem, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{rem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-[11px] leading-relaxed text-slate-400 italic bg-[#0C0C0F] p-3 rounded font-mono border border-slate-900">
                        {rep.rawAnalysis}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* New Active AI Landscape Security Analytics Defender Pane */}
          {activeTab === 'ai-analysis' && (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[580px] pr-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-red-500 animate-pulse" />
                    <span>Agentic AI Defender: Security Remediations & Suggestion Blueprint</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Continuous model analyzing target nodes, wireless structures, and Raspberry Pi 5 platform metrics.
                  </p>
                </div>
                <button 
                  onClick={requestDeepSecurityAnalysis}
                  disabled={analyzingDeeply}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded text-xs text-white font-mono font-bold transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${analyzingDeeply ? 'animate-spin' : ''}`} />
                  <span>{analyzingDeeply ? 'COMPUTING SUGGESTIONS...' : 'REFRESH RECOMMENDATIONS'}</span>
                </button>
              </div>

              {(!deepAnalysis && !analyzingDeeply) ? (
                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-10 text-center">
                  <span className="text-slate-500 text-xs font-mono">No analysis cached. Trigger advisor above to run model queries.</span>
                </div>
              ) : analyzingDeeply ? (
                <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-10 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-10 h-10 border-4 border-t-red-500 border-slate-850 rounded-full animate-spin"></div>
                  <span className="text-slate-300 text-xs font-mono animate-pulse">
                    Agentic AI has initiated security posture diagnostics... Parsing BSSIDs, signal anomalies, encryption handshakes, & host telemetry.
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Overview Cards Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Security Grade */}
                    <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono">CALCULATED GRADE</span>
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
                      </div>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-4xl font-extrabold font-mono text-red-500">{deepAnalysis.securityGrade || 'D-'}</span>
                        <span className="text-xs text-slate-400 font-sans">High Risk Environment</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-mono italic">
                        Calculated based on vulnerable legacy cipher suites on 2.4G & open WPS PBC configs.
                      </p>
                    </div>

                    {/* Threat Count breakdown */}
                    <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-4 md:col-span-2">
                      <span className="text-[10px] text-slate-500 font-mono block mb-3">VULNERABILITIES BY RISK AREA</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-[#0F0F12] p-2.5 rounded-lg border border-[#232329] text-center">
                          <span className="text-[9px] text-slate-400 font-mono block">Legacy Ciphers</span>
                          <span className="text-xl font-bold font-mono text-red-500 mt-1 block">
                            {deepAnalysis.vulnerabilityCountByCategory?.encryption || 1}
                          </span>
                        </div>
                        <div className="bg-[#0F0F12] p-2.5 rounded-lg border border-[#232329] text-center">
                          <span className="text-[9px] text-slate-400 font-mono block">WPS Vulnerable</span>
                          <span className="text-xl font-bold font-mono text-red-500 mt-1 block">
                            {deepAnalysis.vulnerabilityCountByCategory?.wps || 2}
                          </span>
                        </div>
                        <div className="bg-[#0F0F12] p-2.5 rounded-lg border border-[#232329] text-center">
                          <span className="text-[9px] text-slate-400 font-mono block">Unencrypted TAP</span>
                          <span className="text-xl font-bold font-mono text-red-500 mt-1 block">
                            {deepAnalysis.vulnerabilityCountByCategory?.trafficSniffing || 2}
                          </span>
                        </div>
                        <div className="bg-[#0F0F12] p-2.5 rounded-lg border border-[#232329] text-center">
                          <span className="text-[9px] text-slate-400 font-mono block">Spoofable Nodes</span>
                          <span className="text-xl font-bold font-mono text-red-500 mt-1 block">
                            {deepAnalysis.vulnerabilityCountByCategory?.evilTwin || 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Executive Overview summary */}
                  <div className="bg-[#141417] border border-[#2D2D33] rounded-xl p-5">
                    <span className="text-red-400 text-[10px] font-bold font-mono tracking-widest block uppercase mb-2">
                      AI EXECUTIVE LANDSCAPE SYNTHESIS
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {deepAnalysis.executiveSummary}
                    </p>
                  </div>

                  {/* Prioritized Security Suggestions & Blueprint list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider font-bold">
                        PRIORITIZED INTELLIGENT SECURITY SUGGESTIONS
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">SORTED BY MITIGATION IMPACT</span>
                    </div>

                    {deepAnalysis.prioritizedRecommendations?.map((rec: any, idx: number) => (
                      <div key={rec.id || idx} className="bg-[#141417] border border-[#2D2D33] rounded-xl p-5 flex flex-col gap-4">
                        {/* Title line and priority rank badges */}
                        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#2D2D33] gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold text-red-500 bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded">
                              {rec.priority}
                            </span>
                            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/10 px-2 py-0.5 rounded">
                              {rec.category}
                            </span>
                            <span className="text-sm font-bold text-white font-sans">{rec.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">REF: {rec.id || `REC-${idx+1}`}</span>
                        </div>

                        {/* Descriptions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wide">Vulnerability Analysis</span>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {rec.description}
                            </p>
                            <div className="mt-2 bg-[#0F0F12] border border-slate-900 rounded p-3 text-[11px] leading-relaxed text-slate-400">
                              <strong className="text-white">Mitigation Impact:</strong> {rec.impact}
                            </div>
                          </div>

                          {/* Actionable Blueprint Template */}
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wide">REMEDIAL BLUEPRINT / DEPLOYMENT PROTOCOL</span>
                            <pre className="p-3.5 bg-[#0A0A0C] border border-[#232329] rounded-lg text-[11px] font-mono whitespace-pre-wrap overflow-x-auto text-emerald-400 leading-relaxed shadow-inner">
                              <code>{rec.remedialBlueprint}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Footer / System Compliance Safeguard Disclaimer */}
      <footer className="h-14 bg-[#0F0F12] border-t border-[#2D2D33] px-6 flex items-center justify-between text-[11px] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">AUTHORIZATION:</span>
            {authorized ? (
              <span className="text-emerald-500 font-bold font-mono flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                SIGNED & VERIFIED CONFORMAL TESTING
              </span>
            ) : (
              <span className="text-amber-500 font-bold font-mono flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                PENDING ETHICAL SIGNATURE
              </span>
            )}
          </div>

          {!authorized && (
            <form onSubmit={submitCustomConsent} className="flex gap-2 items-center">
              <input 
                type="text" 
                placeholder="Type your name to authorize"
                value={consentName}
                onChange={(e) => setConsentName(e.target.value)}
                className="bg-[#141417] text-[10px] font-mono px-2 py-1 rounded border border-[#2D2D33] focus:border-amber-500 outline-none text-slate-300 placeholder-slate-600"
              />
              <button 
                type="submit" 
                className="bg-amber-600 hover:bg-amber-700 text-white font-mono text-[10px] px-2 py-1 rounded transition-all"
              >
                SIGN ETHICAL DISCLAMER
              </button>
            </form>
          )}

        </div>

        <div className="flex gap-6 font-mono text-slate-500">
          <span>VULN_DB: <span className="text-slate-300 font-bold">2026.11.08</span></span>
          <span>SYSTEM_UUID: <span className="text-slate-300">PI5-RT-ALPHA-772</span></span>
        </div>
      </footer>
    </div>
  );
}

// Inline fallback icon components for simple, complete execution
function BrainCircuit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className} 
      style={{ width: '1em', height: '1em' }}
    >
      <path d="M12 22V12" />
      <path d="M12 12H2" />
      <path d="M12 12h10" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="20" cy="12" r="2" />
      <circle cx="4" cy="12" r="2" />
    </svg>
  );
}

function AlertOcIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className} 
      style={{ width: '1.2em', height: '1.2em' }}
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
