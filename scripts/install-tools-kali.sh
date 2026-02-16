#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update
sudo apt-get install -y python3 python3-pip nodejs npm g++ git kali-linux-default
echo "[OK] Kali toolchain installed"
