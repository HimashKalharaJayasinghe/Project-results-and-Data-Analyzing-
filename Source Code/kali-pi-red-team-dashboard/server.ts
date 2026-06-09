import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Server SDK with proper User-Agent header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. API - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: "authorized-red-team-simulation" });
  });

  // 2. API - Security Auditing Report Generation
  app.post("/api/audit/generate-report", async (req, res) => {
    const { target, attackDetails, testLogs } = req.body;

    if (!target) {
      return res.status(400).json({ error: "Missing Target information" });
    }

    try {
      const prompt = `Perform a theoretical security penetration assessment of the following wireless access point.
      Target SSID: ${target.essid}
      BSSID: ${target.bssid}
      Security Protocol: ${target.security}
      WPS Status: ${target.wpsEnabled ? "WPS Active" : "WPS Disabled"}
      Observed Handshake Capture: ${target.handshakeCaptured ? "Handshake CAPTURED" : "No Handshake Captured"}

      Attack Applied: ${attackDetails?.name || "Deauthentication, PMKID Capture, cracking"}
      Simulated Attack Status: ${attackDetails?.status || "SUCCESS"}
      Simulated Terminal Output Snapshot:
      ${(testLogs || []).join("\n")}

      Analyze this security auditing scenario and return a professional penetration testing report in JSON format conforming EXACTLY to this schema structure (do not return raw markdown other than strict serialized JSON):
      {
        "threatLevel": "Critical" | "High" | "Medium" | "Low",
        "cvssScore": number,
        "findings": string[],
        "remediations": string[],
        "rawAnalysis": string
      }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const cleanText = response.text?.trim() || "{}";
      const reportJson = JSON.parse(cleanText);
      res.json(reportJson);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "Failed rendering AI suggestions",
        details: error?.message || "Unknown error"
      });
    }
  });

  // 3. API - Simulated global cloud synchronization endpoint
  // Real red team specialists can monitor vulnerability reports from anywhere in the world on a cloud dashboard
  let syncedAudits: any[] = [
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
      timestamp: "2026-06-06T07:45:00Z"
    },
    {
      id: "AUDIT-WIFI-002",
      targetEssid: "Enterprise_SEC_2.4G",
      targetBssid: "F4:6A:B2:D1:44:02",
      threatLevel: "Critical",
      cvssScore: 9.8,
      findings: [
        "WPA2-TKIP deprecated protocol in use",
        "Vulnerable to Michael MIC sequence countermeasure attack",
        "Active deauthentication severed legacy handheld scanner clients"
      ],
      remediations: [
        "Remove TKIP cipher support; enforce clean AES-CCMP only",
        "Implement enterprise authentication with robust certificate validation (802.1X)",
        "Implement wireless intrusion prevention systems (WIPS) to identify rogue deauthers"
      ],
      rawAnalysis: "Audited network demonstrating TKIP fallback. Automated red-team methods forced legacy clients to disconnect, capturing bidirectional handshakes within 12 seconds of attack commencement. Highly susceptible to decryption.",
      timestamp: "2026-06-06T08:01:10Z"
    }
  ];

  app.get("/api/cloud/sync", (req, res) => {
    res.json({ success: true, telemetry: syncedAudits });
  });

  app.post("/api/cloud/sync", (req, res) => {
    const { newReport } = req.body;
    if (newReport) {
      syncedAudits = [newReport, ...syncedAudits];
    }
    res.json({ success: true, count: syncedAudits.length, telemetry: syncedAudits });
  });

  // 4. API - Full Network & Vulnerability AI Security Analysis
  app.post("/api/audit/security-analysis", async (req, res) => {
    const { targets, reports, systemMetrics } = req.body;

    try {
      const prompt = `You are a Senior Principal Wireless Security Architect and Lead Red-Team Assessor.
      Perform a highly detailed, professional, critical risk analysis of the scannable wireless landscape.
      
      TARGET DATA SCANNED BY RASPBERRY PI 5:
      ${JSON.stringify(targets, null, 2)}
      
      VULNERABILITY REVIEWS HELD SO FAR:
      ${JSON.stringify(reports, null, 2)}
      
      HOST SYSTEM PERFORMANCE INDICATORS:
      ${JSON.stringify(systemMetrics, null, 2)}

      Tasks to perform:
      1. Synthesize the findings into an overall security posture or grade.
      2. Produce highly specific, actionable, prioritize security suggestions to improve Wi-Fi / Bluetooth / Cellular networks.
      3. For each suggestion, provide a prioritized category (Encryption Protocol, Password Policy, Network Segmentation, etc.), clear explanation, threat mitigation level, and a concrete "Remedial Blueprint" which can be a shell command, Cisco/hostapd config snippet, or network policy settings.
      4. Break down vulnerabilities by type (count).

      Return the analysis in JSON format conforming EXACTLY to the following typescript structure:
      {
        "executiveSummary": "A precise synthesis of the network posture, explaining major entry points.",
        "securityGrade": "A" | "B" | "C" | "D" | "F",
        "prioritizedRecommendations": [
          {
            "id": "REC-01",
            "priority": "Immediate" | "High" | "Medium" | "Low",
            "category": "Encryption Protocol" | "Password Policy" | "Network Segmentation" | "Device Hardening",
            "title": "Title of the suggestion",
            "description": "Explanatory detail of what is wrong and why it exposes the system.",
            "impact": "Expected security posture mitigation impact detail.",
            "remedialBlueprint": "Literal configuration instruction, shell command, or setup file template (can use Markdown format)"
          }
        ],
        "vulnerabilityCountByCategory": {
          "encryption": number,
          "wps": number,
          "trafficSniffing": number,
          "evilTwin": number
        }
      }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const cleanText = response.text?.trim() || "{}";
      const analysisJson = JSON.parse(cleanText);
      res.json(analysisJson);
    } catch (error: any) {
      console.error("AI Analysis Error:", error);
      res.status(500).json({
        error: "Failed to run deep security analysis",
        details: error?.message || "Unknown error"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Auditing workspace running at host http://0.0.0.0:${PORT}`);
  });
}

startServer();
