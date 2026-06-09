#!/bin/bash

echo ""
echo "███████╗███████╗██████╗ ██████╗  █████╗ ███████╗"
echo "██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝"
echo "█████╗  █████╗  ██████╔╝██████╔╝███████║███████╗"
echo "██╔══╝  ██╔══╝  ██╔══██╗██╔══██╗██╔══██║╚════██║"
echo "███████╗███████╗██║  ██║██║  ██║██║  ██║███████║"
echo "╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝"
echo "          Pentesting Framework Installation"
echo ""

# Check root
if [[ $EUID -ne 0 ]]; then
    echo "Must be run as root!"
    exit 1
fi

# Update system
echo "[*] Updating system..."
apt update && apt upgrade -y

# Install ALL attack tools
echo "[*] Installing WiFi tools..."
apt install -y \
    aircrack-ng \
    hostapd \
    dnsmasq \
    reaver \
    bully \
    mdk4 \
    wifite \
    hcxdumptool \
    hcxtools \
    hashcat \
    john \
    cowpatty \
    asleap

echo "[*] Installing MITM tools..."
apt install -y \
    bettercap \
    ettercap \
    sslstrip \
    driftnet \
    urlsnarf \
    dsniff \
    wireshark \
    tshark

echo "[*] Installing Bluetooth tools..."
apt install -y \
    bluetooth \
    bluez \
    bluelog \
    bluez-tools \
    blueranger \
    spooftooph

echo "[*] Installing Social Engineering tools..."
apt install -y \
    setoolkit \
    beef-xss \
    social-engineer-toolkit

echo "[*] Installing Wired attack tools..."
apt install -y \
    nmap \
    metasploit-framework \
    hydra \
    sqlmap \
    responder \
    onesixtyone \
    enum4linux \
    smbclient \
    ftp

echo "[*] Installing additional tools..."
apt install -y \
    hping3 \
    macof \
    yersinia \
    xterm \
    git \
    python3 \
    python3-pip \
    net-tools

# Install from GitHub
echo "[*] Installing from GitHub..."
git clone https://github.com/FluxionNetwork/fluxion.git /opt/fluxion
git clone https://github.com/wifiphisher/wifiphisher.git /opt/wifiphisher
git clone https://github.com/v1s1t0r1sh3r3/airgeddon.git /opt/airgeddon

# Install Python packages
echo "[*] Installing Python packages..."
pip3 install scapy requests beautifulsoup4 paramiko

# Download wordlists
echo "[*] Downloading wordlists..."
mkdir -p /root/wordlists
wget https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt -O /root/wordlists/rockyou.txt

# Make CEBRAS executable
chmod +x cebras_framework.sh

echo ""
echo "=========================================="
echo "CEBRAS Framework Installation Complete!"
echo ""
echo "To start CEBRAS:"
echo "  sudo ./cebras_framework.sh"
echo ""
echo "Remember: Use only for authorized testing!"
echo "=========================================="