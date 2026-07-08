# VPS- & n8n-Härtung — Runbook (Sicherheits-Gate vor Schlüsselübergabe)

> **Zweck:** Auf dem self-hosted n8n liegen später **alle** Zugänge (HERO, WhatsApp/360dialog,
> Google, OpenAI, Sipgate). Deshalb wird der Server **zuerst gehärtet** — erst danach werden
> Keys in den n8n-Credential-Store eingetragen. Diese Datei ist die abhakbare Checkliste + Referenz.
>
> **Hinweis:** Konkrete `ENV`-Namen/Defaults können sich je n8n-Version unterscheiden → gegen die
> installierte Version prüfen. Snippets sind Vorlagen, keine 1:1-Kopiervorlage ohne Anpassung.

## 0. Zielbild

```
Internet ──HTTPS──▶ Reverse Proxy (Caddy/nginx)
                     │  ├─ /webhook/*      → öffentlich, ABER Signatur/Secret geprüft + Rate-Limit
                     │  └─ / (Editor-UI)   → nur via VPN/IP-Allowlist + Login + 2FA
                     ▼
                  n8n (Docker) ── Postgres (Docker) ── tägliches Backup (offsite)
```

Zwei getrennte Zugriffsklassen: **Webhooks müssen öffentlich sein** (Sipgate/360dialog/Website rufen an),
die **Editor-Oberfläche darf es nicht**.

---

## 1. Server-Grundhärtung (VPS)

- ☐ **Eigener Nicht-Root-User** mit `sudo`; Root-Login deaktivieren.
- ☐ **SSH nur mit Key** (kein Passwort-Login):
  - `/etc/ssh/sshd_config`: `PasswordAuthentication no`, `PermitRootLogin no`, `PubkeyAuthentication yes` → `systemctl restart ssh`.
- ☐ **Firewall (ufw):** nur SSH + HTTPS offen.
  ```bash
  ufw default deny incoming
  ufw default allow outgoing
  ufw allow 22/tcp        # SSH (ggf. eigenen Port)
  ufw allow 443/tcp       # HTTPS (Proxy)
  ufw enable
  ```
  → **Port 5678 (n8n) NICHT öffnen** — n8n nur intern hinter dem Proxy erreichbar.
- ☐ **fail2ban** installieren (bremst SSH-/Login-Bruteforce).
- ☐ **Automatische Sicherheitsupdates** (`unattended-upgrades`).
- ☐ **Zeitsync** aktiv (chrony/systemd-timesyncd) — wichtig für TLS & Signaturen.

---

## 2. n8n-Deployment (Docker Compose empfohlen)

- ☐ **Postgres statt SQLite** als DB (Stabilität + saubere Backups).
- ☐ **Reverse Proxy mit automatischem HTTPS** — Caddy ist am einfachsten (Let's Encrypt out-of-the-box).
- ☐ n8n **nicht** direkt ans Internet; nur der Proxy terminiert TLS.

**`docker-compose.yml` (Vorlage):**
```yaml
services:
  caddy:
    image: caddy:2
    restart: unless-stopped
    ports: ["443:443", "80:80"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
    depends_on: [n8n]

  n8n:
    image: docker.n8n.io/n8nio/n8n:latest   # besser: konkrete Version pinnen
    restart: unless-stopped
    environment:
      - N8N_HOST=automation.euredomain.de
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://automation.euredomain.de/
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}   # aus .env, sicher sichern!
      - N8N_SECURE_COOKIE=true
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
      # Execution-Daten begrenzen (kein Dauer-PII-Speicher):
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168          # Stunden (=7 Tage) — an Bedarf/DSGVO anpassen
      - EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000
      - GENERIC_TIMEZONE=Europe/Berlin
    expose: ["5678"]        # nur intern, NICHT "ports:"
    depends_on: [postgres]

  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  caddy_data:
  pg_data:
```

**`Caddyfile` (Vorlage) — trennt öffentliche Webhooks von der geschützten UI:**
```
automation.euredomain.de {
    encode gzip

    # Editor-UI + API: nur aus dem Firmen-/VPN-Netz
    @adminPaths {
        not path /webhook* /webhook-test*
    }
    handle @adminPaths {
        @notAllowed not remote_ip 203.0.113.0/24 100.64.0.0/10   # eure IP/VPN-Range
        respond @notAllowed "Forbidden" 403
        reverse_proxy n8n:5678
    }

    # Öffentliche Webhooks: erreichbar, aber Rate-Limit (Signaturprüfung passiert IN n8n)
    handle /webhook* {
        reverse_proxy n8n:5678
    }
}
```
> Rate-Limiting in Caddy braucht das `rate_limit`-Modul (Plugin) — alternativ nginx `limit_req`.
> Für Admin-Zugang ohne feste IP: **Tailscale/WireGuard-VPN** oder **Cloudflare Tunnel**.

- ☐ **n8n-User-Management + 2FA:** Owner-Account mit **starkem Passwort** anlegen, **MFA/2FA (TOTP) aktivieren**; keine offene Registrierung.

---

## 3. Webhook-Absicherung (kritisch gegen Fake-Leads & Prompt-Injection)

Jeder öffentliche Webhook validiert die **Herkunft**, bevor irgendetwas verarbeitet wird. Unsignierte/ungültige Requests → sofort verwerfen (kein LLM-Call, kein HERO-Schreiben).

- ☐ **360dialog / Meta (WhatsApp):** **HMAC-SHA256** über den Rohbody gegen `X-Hub-Signature-256` mit dem App-Secret prüfen (erster Node nach dem Webhook: Signatur berechnen → vergleichen → sonst abbrechen).
- ☐ **Sipgate:** **Shared Secret** — z. B. geheimer, nicht-ratbarer Pfad/Token in der Webhook-URL und/oder Prüf-Parameter; unbekannte Werte verwerfen.
- ☐ **Website-Formular:** **Secret-Token** im Header/Body, das nur Formular + n8n kennen.
- ☐ **Input-Limits:** Payload-Größe begrenzen; **Audio-Länge kappen** (kein 60-Min-Audio transkribieren) → schützt Budget.
- ☐ **Rate-Limiting** am Proxy je Webhook-Pfad.
- ☐ **Idempotenz:** Nachrichten-/Call-ID speichern und Duplikate verwerfen (auch Sicherheitsnetz gegen Replays).

---

## 4. Secrets-Management

- ☐ **`.env` mit `chmod 600`**, Eigentümer = Deploy-User; **in `.gitignore`**, niemals committen.
- ☐ **`N8N_ENCRYPTION_KEY`** einmalig generieren (`openssl rand -hex 32`) und **getrennt sichern** (Passwortmanager). Ohne ihn sind nach einem Restore alle Credentials unbrauchbar; mit ihm + DB-Leak wären sie entschlüsselbar.
- ☐ **Pro Dienst eigener, minimal berechtigter Key** (HERO, OpenAI, Sipgate, 360dialog, Google) → einzeln widerrufbar; **Rotationsplan**.
- ☐ **Keine Secrets in Logs** und **keine Secrets in exportierten Workflow-JSONs** (nur Credential-Referenzen). Falls Workflows versioniert werden: vor Export prüfen.

---

## 5. Backups & Wiederherstellung

- ☐ **Täglicher Postgres-Dump** (`pg_dump`) → **offsite** (verschlüsselt), Aufbewahrung z. B. 30 Tage.
- ☐ **`N8N_ENCRYPTION_KEY` separat** vom DB-Backup aufbewahren (sonst nützt das Backup nichts / oder zu viel).
- ☐ **Restore mindestens einmal testen** (Backup ohne getesteten Restore = kein Backup).
- ☐ Docker-Volumes (`pg_data`, `caddy_data`) in die Backup-Strategie aufnehmen.

---

## 6. Monitoring & Fehlerbehandlung (sonst gehen Leads *wieder* verloren)

- ☐ **Uptime-Monitoring** (z. B. Uptime Kuma self-host oder externer Dienst) auf die Webhook-URL → **Alert**, wenn n8n down ist.
- ☐ **Globaler n8n-Error-Workflow:** bei jedem Workflow-Fehler → Benachrichtigung (Mail/HERO-Aufgabe), nie stiller Ausfall.
- ☐ **Backstop bewusst nutzen:** Quell-Systeme (WhatsApp-App, Sipgate-Mailbox, Postfach) behalten die Anfragen ohnehin → bei n8n-Ausfall ist Nacharbeiten möglich, nichts ist endgültig weg.
- ☐ **Log-Rotation** aktiv; Festplatte überwachen.

---

## 7. DSGVO-/Betriebs-Abschluss

- ☐ **AVV/DPA** mit jedem Verarbeiter abgeschlossen (OpenAI/Gemini, 360dialog, Google, ggf. Supabase, VPS-Hoster).
- ☐ **EU-Region** wo möglich; OpenAI API: kein Training auf API-Daten, ggf. Zero-Retention bestätigen.
- ☐ **Roh-Log/Execution-Daten** mit Aufbewahrungsgrenze + Zugriffsschutz (siehe `EXECUTIONS_DATA_*`).
- ☐ **Auskunfts-/Löschprozess** definiert (Daten in n8n/DB auffindbar & löschbar).

---

## Freigabe-Kriterium („Gate offen")

Erst wenn Abschnitte **1–6** abgehakt sind (insb. HTTPS + 2FA + UI-Zugriffsschutz + `N8N_ENCRYPTION_KEY` gesichert + Backup getestet + Webhook-Signaturen vorbereitet), werden die **Keys aus der Credential-Checkliste (Punkt 1)** in n8n eingetragen und der Bau von Punkt 1 beginnt.
