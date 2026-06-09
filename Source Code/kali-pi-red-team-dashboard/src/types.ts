export interface SimulatedInterface {
  name: string;
  type: 'wifi' | 'bluetooth' | 'cellular';
  chipset: string;
  status: 'UP' | 'DOWN' | 'MONITOR';
  activeChannel?: number;
  powerDbm?: number;
}

export interface WirelessTarget {
  bssid: string;
  essid: string;
  signal: number;
  channel: number;
  security: 'WEP' | 'WPA-TKIP' | 'WPA2-CCMP' | 'WPA3-SAE' | 'OPEN';
  clientsCount: number;
  wpsEnabled: boolean;
  handshakeCaptured: boolean;
  vulnerabilities: string[];
}

export interface SecurityAttack {
  id: string;
  name: string;
  protocol: 'wifi' | 'bluetooth' | 'cellular';
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
  status: 'IDLE' | 'SCANNING' | 'ATTACKING' | 'SUCCESS' | 'FAILED';
  terminalLogs: string[];
}

export interface SecurityReport {
  id: string;
  targetBssid: string;
  targetEssid: string;
  threatLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  cvssScore: number;
  findings: string[];
  remediations: string[];
  rawAnalysis: string;
  timestamp: string;
}

export interface CloudDashboardStats {
  totalScannedWifi: number;
  activeAttacks: number;
  vulnerableDevices: number;
  criticalRisks: number;
  syncedTargets: WirelessTarget[];
}
