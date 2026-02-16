#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "این اسکریپت باید با sudo اجرا شود."
  exit 1
fi

echo "[1/5] Updating apt repositories..."
apt-get update -y

echo "[2/5] Installing base dependencies..."
apt-get install -y curl git build-essential python3 python3-pip python3-venv ca-certificates

echo "[3/5] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "[4/5] Optional tools for Kali/VSCode workflows..."
apt-get install -y code || true

echo "[5/5] Installing global JS tooling..."
npm install -g npm@latest electron @capacitor/cli

echo "Done. Environment is prepared for Python/JavaScript/C++ development."
