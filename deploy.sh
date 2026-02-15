#!/bin/bash
cd ~/Kamiko-Web

# 1. Update file config
git fetch origin main
git checkout main README.md deploy.sh docker-compose.yml .gitignore 2>/dev/null || true

# 2. Safety check
if [ ! -f .env ]; then
    echo "❌ ERROR: .env missing! Deployment aborted."
    exit 1
fi

# 3. Eksekusi
docker compose down --remove-orphans
docker compose up -d --build