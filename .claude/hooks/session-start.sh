#!/bin/bash
set -euo pipefail

# Nur in Claude Code on the web / Remote-Sessions nötig (lokal existiert node_modules meist schon).
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Idempotent: npm install nutzt den Container-Cache und ist bei vorhandenem
# node_modules deutlich schneller als npm ci (das immer alles löscht).
npm install --no-audit --no-fund
