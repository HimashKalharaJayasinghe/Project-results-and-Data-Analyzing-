// Automated Wi-Fi, Bluetooth & Cellular attacking simulator workflows for education & authorized testing
import { WirelessTarget, SecurityAttack, SimulatedInterface } from './types';

export const INITIAL_INTERFACES: SimulatedInterface[] = [
  { name: 'wlan0', type: 'wifi', chipset: 'BCM43455 (Raspberry Pi 5 integrated)', status: 'UP' },
  { name: 'wlan0mon', type: 'wifi', chipset: 'Atheros AR9271 (High Gain External USB)', status: 'MONITOR', activeChannel: 6 },
  { name: 'hci0', type: 'bluetooth', chipset: 'Cypress CYW43455 BLE (Classic + Smart)', status: 'UP' },
  { name: 'wwan0', type: 'cellular', chipset: 'SIM8200EA 5G Sub-6G Raspberry Pi HAT', status: 'DOWN' }
];

export const SIMULATED_TARGETS: WirelessTarget[] = [
  {
    bssid: 'F4:6A:B2:D1:44:02',
    essid: 'Enterprise_SEC_2.4G',
    signal: -42,
    channel: 1,
    security: 'WPA-TKIP',
    clientsCount: 5,
    wpsEnabled: true,
    handshakeCaptured: false,
    vulnerabilities: ['Deprecated TKIP Cipher Suite', 'Active WPS PBC Enabled', 'Susceptible to Michael MIC countermeasure exploits']
  },
  {
    bssid: 'CC:23:44:91:00:FF',
    essid: 'SmartHome_IoT',
    signal: -68,
    channel: 6,
    security: 'WPA2-CCMP',
    clientsCount: 12,
    wpsEnabled: true,
    handshakeCaptured: false,
    vulnerabilities: ['WPS locked PIN susceptible to Pixie Dust attack', 'Weak 8-character pre-shared key fallback']
  },
  {
    bssid: 'AA:BB:CC:DD:EE:FF',
    essid: 'WPA3_CORP_MAIN',
    signal: -31,
    channel: 11,
    security: 'WPA3-SAE',
    clientsCount: 28,
    wpsEnabled: false,
    handshakeCaptured: false,
    vulnerabilities: ['Protected Management Frames (PMF) bypass simulation on old client fallbacks']
  },
  {
    bssid: '58:90:43:2F:B0:1B',
    essid: 'Guest_AP_OPEN',
    signal: -51,
    channel: 11,
    security: 'OPEN',
    clientsCount: 3,
    wpsEnabled: false,
    handshakeCaptured: false,
    vulnerabilities: ['Unauthenticated traffic sniffing', 'Lack of cryptographic boundaries', 'Susceptible to Evil Twin redirection']
  },
  {
    bssid: '8C:3B:AD:E2:0F:D0',
    essid: 'LTE_Fems_Simulator_4G',
    signal: -55,
    channel: 3,
    security: 'OPEN',
    clientsCount: 1,
    wpsEnabled: false,
    handshakeCaptured: false,
    vulnerabilities: ['IMSI catcher redirection target', 'Lack of tower validation signatures']
  }
];

export const DEFAULT_ATTACKS: SecurityAttack[] = [
  {
    id: 'attack-1',
    name: 'Wifite Automated Deauthentication Burst',
    protocol: 'wifi',
    description: 'Sends continuous raw IEEE 802.11 deauthentication broadcast frames to force clients off target AP, triggering handshakes.',
    complexity: 'Low',
    status: 'IDLE',
    terminalLogs: []
  },
  {
    id: 'attack-2',
    name: 'Pixie Dust WPS PIN Crack (Reaver)',
    protocol: 'wifi',
    description: 'Exploits the generator architecture of weak Router WPS authentication algorithms to calculate the PIN offline.',
    complexity: 'Medium',
    status: 'IDLE',
    terminalLogs: []
  },
  {
    id: 'attack-3',
    name: 'Evil Twin Access Point Replication',
    protocol: 'wifi',
    description: 'Launches a replica rogue AP mimicking the target ESSID with identical BSSID while flooding the primary AP with deauth packets.',
    complexity: 'High',
    status: 'IDLE',
    terminalLogs: []
  },
  {
    id: 'attack-4',
    name: 'BLE GATT Spoofing & Sniffing (Bettercap)',
    protocol: 'bluetooth',
    description: 'Passively monitors Bluetooth Low Energy advertising packets and performs simulated man-in-the-middle GATT attribute modifications.',
    complexity: 'Medium',
    status: 'IDLE',
    terminalLogs: []
  },
  {
    id: 'attack-5',
    name: 'Simulated IMSI Catcher Tower Spoof',
    protocol: 'cellular',
    description: 'Deploys simulated false base station (FBS/IMSI Catcher) protocol requests to capture client device metadata safely.',
    complexity: 'High',
    status: 'IDLE',
    terminalLogs: []
  }
];

export const generateAttackLogs = (attackType: string, targetEssid: string, targetBssid: string): string[] => {
  const timestamp = new Date().toISOString().substring(11, 19);
  switch (attackType) {
    case 'attack-1':
      return [
        `[${timestamp}] [INFO] Starting wifite2 framework on monitor interface wlan0mon...`,
        `[${timestamp}] [INFO] Checking for target node [${targetEssid}] (${targetBssid})...`,
        `[${timestamp}] [OK] Target found on Channel 6, power level: -45dBm`,
        `[${timestamp}] [WARN] Initiating directed aireplay-ng deauth attack sequence.`,
        `[${timestamp}] [EXEC] cmd: aireplay-ng --deauth 15 -a ${targetBssid} wlan0mon`,
        `[${timestamp}] [DEAUTH] Sending 15 deauth frames to broadcast address...`,
        `[${timestamp}] [DEAUTH] Client MAC: 00:0C:42:1F:B1:AC disconnected from AP`,
        `[${timestamp}] [AIRODUMP] Listening for modern 4-way WPA handshake...`,
        `[${timestamp}] [Handshake] WPA Handshake CAPTURED on ${targetBssid}`,
        `[${timestamp}] [SUCCESS] Handshake written back to: /root/hs/${targetEssid}.cap`,
        `[${timestamp}] [INFO] Launching hashcat dictionary crack suite...`,
        `[${timestamp}] [STATS] Speed: 42.1 kH/s | Candidates tried: 10,240`,
        `[${timestamp}] [VULN] Cracking SUCCESSFUL. Found WPA Pre-Shared Key: 'admin123'`
      ];
    case 'attack-2':
      return [
        `[${timestamp}] [WPS] Starting Pixie-Dust WPS recovery attack for ${targetEssid}...`,
        `[${timestamp}] [WPS] cmd: reaver -i wlan0mon -b ${targetBssid} -K 1 -vv`,
        `[${timestamp}] [INFO] Associating with ${targetBssid} (ESSID: ${targetEssid})...`,
        `[${timestamp}] [OK] Association completed. Sending EAPOL Start packet...`,
        `[${timestamp}] [WPS] Received Identity Request -> Sent Identity Response`,
        `[${timestamp}] [WPS] Received M1 message -> Analyzing cryptographic Diffie-Hellman parameters`,
        `[${timestamp}] [WPS] Received M2 message -> Sent M3 response`,
        `[${timestamp}] [WPS] Received M4 message... Extracting E-S1 & E-S2 nonces.`,
        `[${timestamp}] [PIXIE] Invoking offline hash calculator tool: pixiewst --nonce-s1 0x22F...`,
        `[${timestamp}] [SUCCESS] Pixie Dust computed PIN cracker key within 1.4 seconds!`,
        `[${timestamp}] [WPS] Recovered PIN: 29402517`,
        `[${timestamp}] [WPS] Recovered Pre-Shared Key: 'smartlife90'`
      ];
    case 'attack-3':
      return [
        `[${timestamp}] [EVIL] Initializing hostapd for rogue AP environment spoofing...`,
        `[${timestamp}] [EVIL] cmd: hostapd-mana /etc/hostapd-mana.conf`,
        `[${timestamp}] [EVIL] Mimicking target MAC: ${targetBssid} with duplicate ESSID: ${targetEssid}`,
        `[${timestamp}] [DHCP] Started spoofed dnsmasq server on subnetwork 192.168.100.0/24`,
        `[${timestamp}] [INFO] Starting automated deauth flood against original channel AP...`,
        `[${timestamp}] [ROUTING] Enforcing captive portal splash redirection on internal traffic`,
        `[${timestamp}] [ROUTING] Sniffing credentials via simulated dnsmasq query intercepts`,
        `[${timestamp}] [OK] Targeted smartphone connected to spoofed Evil Twin node`,
        `[${timestamp}] [EXPLOIT] captured login attempt at captive portal template.`,
        `[${timestamp}] [EXPLOIT] user entered credential payload: (WIFI_UPGRADE_VERIFY / admin@2026)`
      ];
    case 'attack-4':
      return [
        `[${timestamp}] [BLE] Activating Cypress Bluetooth LE scanning via bettercap...`,
        `[${timestamp}] [BLE] scan.on -> listening for classic and smart advertising nodes...`,
        `[${timestamp}] [OK] Found active IoT health scale BLE device [BLE-A8:99:FF:3E]`,
        `[${timestamp}] [GATT] Sniffing services: 180D (Heart Rate), 180F (Battery Service)`,
        `[${timestamp}] [GATT] Enumerating character database indicators...`,
        `[${timestamp}] [MITM] Injecting test telemetry GATT descriptor changes (service UUID fff0)...`,
        `[${timestamp}] [SUCCESS] Spoofed sensor values received by client smartphone application.`
      ];
    case 'attack-5':
      return [
        `[${timestamp}] [CELLULAR] Booting SDR (Software Defined Radio) transceiver wrapper...`,
        `[${timestamp}] [CELLULAR] Launching simulated OpenLTE platform module...`,
        `[${timestamp}] [CELLULAR] Masking network identifier as Country Code: 234 / Network Code: 15`,
        `[${timestamp}] [FBS] False Base Station Active. Emitting simulated weak MNC network broadcast`,
        `[${timestamp}] [FBS] Received connection request from LTE modem within virtual simulator.`,
        `[${timestamp}] [SUCCESS] IMSI captured safely in simulation sandbox: 234150918451120`,
        `[${timestamp}] [INFO] Disconnecting subscriber and restoring primary operator network routing.`
      ];
    default:
      return [
        `[${timestamp}] [DEBUG] Initializing custom pentesting script sequence...`,
        `[${timestamp}] [DEBUG] Executing standard diagnostic tests...`,
        `[${timestamp}] [SUCCESS] Completed simulation suite output.`
      ];
  }
};
