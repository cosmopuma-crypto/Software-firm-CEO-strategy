# Anfragen-Tracking (Lead-Log, Attribution, Analytics)

Das Tracking beantwortet drei Fragen, die für den Verkauf der Lösung
entscheidend sind (siehe `docs/vertriebsplan-shk-website.md`):

1. **Wie viele Anfragen kommen pro Monat?** → Lead-Log (Datenbank statt Postfach zählen)
2. **Woher kommen sie?** → Quellen-Attribution (Referrer + UTM, cookie-los)
3. **Wie viele Besucher braucht es dafür?** → Vercel Web Analytics (cookie-los)

Alles ist DSGVO-freundlich umgesetzt: keine Cookies, keine IP-Speicherung im
Lead-Log, keine personenbezogenen Daten in den Events.

---

## 1. Lead-Log

Jede erfolgreiche Formular-Anfrage (`waermepumpe`, `badplaner`,
`kundendienst`) und jeder abgeschlossene Heizreport-Check (`heizreport`)
erzeugt ein Event in der Supabase-Tabelle `lead_events`.
Ohne konfigurierte Env-Vars fällt das Log auf die Konsole zurück —
Build/Dev laufen also auch ohne Secrets (gleiches Muster wie der Mailer).

### Setup

**Status: eingerichtet (Juli 2026).** Das Supabase-Projekt
`st-haustechnik-leads` (Region Frankfurt/eu-central-1, kostenloser Tarif,
Projekt-Ref `bpuzhxlvibhshcyoucbp`) existiert und die Tabelle `lead_events`
ist per Migration `create_lead_events` angelegt.

**Einziger offener Schritt:** Im Vercel-Dashboard → Projekt → Settings →
Environment Variables setzen und neu deployen:

```bash
SUPABASE_URL=https://bpuzhxlvibhshcyoucbp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<aus Supabase-Dashboard: Settings → API → service_role>
```

Der `service_role`-Key ist geheim — nur als Server-Env-Var verwenden,
niemals in Client-Code oder ins Repo.

Zur Referenz (falls das Projekt je neu aufgesetzt werden muss) — die
Tabelle wurde so angelegt:

```sql
create table public.lead_events (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  form_type    text not null,
  source       text,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  landing_page text
);

-- Kein öffentlicher Zugriff: RLS aktivieren, keine Policies anlegen.
-- Die Website schreibt mit dem Service-Role-Key (umgeht RLS, nur serverseitig).
alter table public.lead_events enable row level security;
```

### Auswertung: Anfragen pro Monat (für Fallstudie & Kunden-Report)

```sql
select
  to_char(date_trunc('month', created_at), 'YYYY-MM') as monat,
  form_type,
  count(*) as anfragen
from lead_events
group by 1, 2
order by 1 desc, 2;
```

Quellen-Verteilung:

```sql
select coalesce(source, 'unbekannt') as quelle, count(*) as anfragen
from lead_events
group by 1
order by 2 desc;
```

---

## 2. Quellen-Attribution

- `src/lib/tracking/attribution.ts` erfasst beim ersten Seitenaufruf der
  Sitzung Referrer + UTM-Parameter (First-Touch) und hält sie in
  `sessionStorage` — kein Cookie, verfällt mit dem Tab.
- `submitContact()` hängt die Attribution automatisch an jeden
  Formular-Submit an; die API validiert sie (`attributionSchema`) und
  schreibt sie ins Lead-Log **und** als „Quelle"-Zeile in die
  Benachrichtigungs-E-Mail.
- Quellen-Erkennung: `utm_source` gewinnt, sonst Referrer-Hostname
  (google, bing, facebook, … oder der Hostname selbst), sonst `direkt`.

**Praxis-Tipp:** Für Print/Flyer/Fahrzeugbeschriftung Links mit
`?utm_source=flyer&utm_campaign=fruehjahr2027` verwenden — dann taucht die
Kampagne in E-Mail und Auswertung auf.

---

## 3. Besucherstatistik (Vercel Web Analytics)

- `<Analytics />` ist im Root-Layout eingebunden (`@vercel/analytics`),
  cookie-los und DSGVO-freundlich.
- **Einmalig aktivieren:** Vercel-Dashboard → Projekt → Tab „Analytics"
  → „Enable". Ohne diesen Schritt sendet das Skript nichts.
- Damit gibt es Besucher/Monat und Seitenaufrufe pro Pfad — zusammen mit
  dem Lead-Log ergibt das die Conversion-Rate
  (Anfragen ÷ Besucher), die Kernzahl der Fallstudie.

---

## Datenschutz-Hinweis

Das Lead-Log speichert keine Namen, E-Mails oder IPs — nur Formular-Typ,
Quelle und Zeitpunkt. Vercel Web Analytics arbeitet ohne Cookies und ohne
geräteübergreifendes Tracking. Beides ist in der Datenschutzerklärung
beschrieben (Abschnitt „10. Reichweitenmessung und Anfragen-Statistik").
