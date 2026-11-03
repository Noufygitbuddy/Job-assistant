# Job Assistant

Personal opportunity finder for computational engineering, AI for engineering, AI/ML, LLM applications, engineering software, and research/PhD roles. Germany first; country presets also include Czechia, Netherlands, Switzerland, Austria, and Belgium. English and German role titles are included.

## Run

Open this folder in VS Code. Run `node server.mjs`, then open http://127.0.0.1:5174. Requires Node 20+. No dependencies or paid API keys. Tests: `node --test`.

## What works

- Persistent browser preferences, six selectable role groups, country, work arrangement, opportunity type, custom minute window.
- Separate LinkedIn search links for each group. Minute URL parameters are experimental; LinkedIn may ignore them. No LinkedIn scraping or automated polling.
- Fetches up to three pages from Arbeitnow's public API, with five-minute server caching and one shared request when multiple searches overlap.
- Filters retrieved records by source-entry time, location, role terms, and arrangement evidence. Unknown locations are excluded, as are internship and working-student titles. Feed timestamps are not verified original employer publication times. German feed coverage is not exhaustive; other countries and research positions may be sparse.
- Combines all matching groups and deduplicates canonical URLs. Distinct URLs are retained rather than risking merging distinct positions.
- Explains title/skill matches and lowers senior/lead titles. Research classification is a title heuristic, not a guarantee. Germany selection uses the Germany-focused source coverage; country eligibility must be verified on the listing. A false remote flag does not prove on-site; hybrid detection uses text evidence.
- Saves full descriptions to a local shortlist. Export each opportunity to Job Journal's existing backup format; open Job Journal and use Restore. Import creates Interested records, without an application timestamp. Repeated import of the same opportunity replaces the matching ID after Journal's restore confirmation.

## Boundaries

Local app, no login, no cloud sync, no background agent, no notification delivery, no full offline app installation. Search needs internet. Saved shortlist remains in this browser's localStorage. Do not clear site data without exporting records. No CV or private contact information is embedded in the code. No LLM or match percentages. Saved records may be lost if storage is cleared. Source failures are shown explicitly; no fabricated results or automatic widening of time filters.

## Source

Arbeitnow API information: https://www.arbeitnow.com/blog/job-board-api
API: https://www.arbeitnow.com/api/job-board-api
All listings link back to Arbeitnow. There is no claim of complete LinkedIn or Europe-wide coverage. Future employer and university connectors should use documented permitted interfaces and preserve original vs first-seen timestamps separately.

## Hosting

Not deployed. A static-only host cannot run this Node API server. Public deployment needs server hosting, rate limiting, access control, and review of provider terms. Local server binds only to 127.0.0.1.
