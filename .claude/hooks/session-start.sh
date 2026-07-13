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

# superpowers-Plugin in jeder neuen Remote-Umgebung automatisch bereitstellen
# (Plugin-Installation ist container-lokal und überlebt sonst keine neue Session).
claude plugin marketplace add anthropics/claude-plugins-official >/dev/null 2>&1 || true
claude plugin install superpowers@claude-plugins-official >/dev/null 2>&1 || true

# Deutsche Rechts-Plugins (Klotzkette-Marketplace) ebenfalls automatisch bereitstellen.
claude plugin marketplace add Klotzkette/claude-fuer-deutsches-recht >/dev/null 2>&1 || true
for plugin in \
  bgb-bt-pruefer \
  fachanwalt-it-recht \
  datenschutzrecht \
  agb-recht-pruefer \
  softwarerecht-de-eu-us; do
  claude plugin install "${plugin}@klotzkette-german-legal-skills" >/dev/null 2>&1 || true
done
