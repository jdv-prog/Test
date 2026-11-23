# PROGRESS: Friends at Hand

A new session should read this file first, then SPEC.md and PLAN.md.

## Current status
- **Phase:** 1 (ledger and events, Admin only)
- **Last finished:** Step 1, project setup and starter screen
- **Next:** Step 2, Supabase connection and `schema.sql` (plan first, wait for go-ahead)

## Phase 1 steps
Numbering used from here on (PLAN.md numbers these 0–8; same order, shifted by one).

| # | Step | Status |
|---|------|--------|
| 1 | Setup: project runs locally, "Friends at Hand" starter screen | Done |
| 2 | Supabase connection and schema (`supabase/schema.sql`) | Next |
| 3 | Login (email + password, logged-out users see only login) | To do |
| 4 | Categories and transactions (add, edit, soft-delete, filters) | To do |
| 5 | Events (budget vs actual, profit) | To do |
| 6 | Dashboard and totals (balance, by category, event, date range) | To do |
| 7 | Export: CSV + printable summary (one event, or a date range) | To do |
| 8 | Receipt photo (compressed, private bucket) | To do |
| 9 | PWA and deploy to Cloudflare Pages | To do |

## Decisions
- 2026-11-23: **TypeScript** (not plain JavaScript).
- 2026-11-23: **Receipt photos** stay in Phase 1 as step 8.
- 2026-11-23: **Printable summary** covers either one event or a chosen date range.
- 2026-11-23: Project lives at the repository root (not in a `friends-at-hand/` subfolder).
- 2026-11-23: Built from the official Vite "react-ts" template (React 19, Vite 8, TypeScript, oxlint). Demo art removed.
- 2026-11-23: React Router and Supabase are not installed yet; they are added in the steps that need them.
- Still open from PLAN.md: are the starter categories right? Does the constitution set a spending limit or signatory rule?

## What exists
- `src/lib/labels.ts`: app name and key wording ("Money in", "Money out", etc.) in one place.
- `src/index.css`: colours as variables at the top, large tap targets.
- `src/App.tsx`: starter screen (buttons are placeholders, disabled).
- `.env.example`: names of the Supabase settings. Real values go in `.env`, which git ignores.

## How to run locally
```
npm install     # first time only
npm run dev     # then open http://localhost:5173
```
Other commands: `npm run build` (production build into `dist/`), `npm run lint` (code check).

## Permissions table (planned, from SPEC section 2)
Enforced in the database with Row Level Security, not just hidden in the screens. Only Admin exists in Phase 1.

| Action | Admin | Treasurer | Committee | Volunteer |
|---|---|---|---|---|
| View finances | Yes | Yes | Yes | No |
| Add / edit transactions, events, targets, receipts | Yes | Yes | No (can add expense requests) | No |
| Delete / restore records | Yes | No | No | No |
| Manage users and roles | Yes | No | No | No |
| Manage categories and settings | Yes | No | No | No |
| View settings | Yes | No | No | No |
| Export reports | Yes | Yes | ? | No |
| Volunteer / equipment lists, sign up | Yes | Yes | Yes | Yes |
| View audit log | Yes | No | No | No |

## Reminders
- Supabase free projects pause after about a week of inactivity (how to wake one will be added in step 2).
- Export a CSV backup regularly (once step 7 exists).
