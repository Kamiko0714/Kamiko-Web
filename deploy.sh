#!/bin/bash

echo "----------------------------------------"
echo "💠 KAMIKO - AUTOMATED DEPLOYMENT SYSTEM"
echo "----------------------------------------"
cd "$(dirname "$0")"

# 2. Ambil data terbaru dari GitHub
echo "📡 Pulling latest data from GitHub..."
git fetch --all
git reset --hard origin/main

# 3. Validasi Keamanan
if [ ! -f .env ]; then
    echo "❌ ERROR: File .env tidak ditemukan di VM!"
    echo "Tips: Buat file .env secara manual di VM dan masukkan TOKEN & KEY."
    exit 1
fi

# 4. Eksekusi Docker
echo "🏗️  Reconstructing Virtual Environment..."
docker compose down --remove-orphans
docker compose up -d --build

echo "----------------------------------------"
echo "✅ SYSTEM OPERATIONAL - DEPLOYMENT COMPLETE"
echo "----------------------------------------"
docker ps