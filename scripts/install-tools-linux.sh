#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update
sudo apt-get install -y \
  python3 python3-pip nodejs npm g++ git curl build-essential \
  libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libgbm1 \
  libgtk-3-0 libasound2 libnss3 libxcomposite1 libxdamage1 \
  libxfixes3 libxrandr2 libxkbcommon0 libxshmfence1
echo "[OK] Base dev tools + Electron runtime dependencies installed for Linux"
