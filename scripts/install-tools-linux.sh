#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update
sudo apt-get install -y python3 python3-pip nodejs npm g++ git curl build-essential
echo "[OK] Base dev tools installed for Linux"
