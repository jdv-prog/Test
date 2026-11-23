# PLAN: Friends at Hand, Phase 1

Draft plan based on SPEC.md. Phase 1 = ledger and events, Admin only. Nothing here is built yet.

## 1. Stack (and why)
- **React + Vite + TypeScript:** the most common setup, so Claude Code and online help are strongest here. TypeScript catches mistakes early.
- **React Router:** simple screen navigation.
- **Supabase (free plan):** login, PostgreSQL database, private storage for receipt photos, Row Level Security.
- **vite-plugin-pwa:** makes the site installable on a phone home screen.
- **Hosting:** Cloudflare Pages free tier (simple, no card needed).
- **Money:** whole pence stored as integers. One helper formats pence as £.
- Few extra libraries. Any addition gets explained first.

## 2. Folder structure (proposed)
```
friends-at-hand/
  SPEC.md
  PLAN.md
  PROGRESS.md          decisions, done/next, permissions table
  supabase/
    schema.sql         tables, policies, storage bucket (paste into Supabase SQL editor)
  src/
    main.tsx
    App.tsx            routes
    lib/
      supabase.ts      client (public anon key only)
      money.ts         pence <-> £ helpers
      labels.ts        app name and key wording in one place
    auth/
      LoginPage.tsx
      useSession.ts
    pages/
      Dashboard.tsx
      Transactions.tsx
      TransactionForm.tsx
      Events.tsx
      EventDetail.tsx
      Reports.tsx
    components/        small shared pieces (buttons, inputs, list rows)
  .env.example         names of keys, no real values
```

## 3. Database (Phase 1)
Every table has `organisation_id`. Only one organisation exists for now.
- `organisations`, `profiles` (role: admin for now), `categories`, `events`, `transactions` (soft delete with `deleted_at`).
- Starter categories added by the SQL file.
- Row Level Security on every table: a user only sees rows for their own organisation, and only the right role can write.
- Private storage bucket `receipts`, same rule.
- First account becomes the Admin.

## 4. Build order (test each step before the next)
0. **Setup:** create the project, run it locally, show a "Friends at Hand" starter screen. *Test: it opens in the browser.*
1. **Supabase connection and schema:** you create the Supabase project; paste `schema.sql`. *Test: tables visible in Supabase.*
2. **Login:** email and password, logged-out users see only the login screen. *Test: wrong password fails; correct one works.*
3. **Categories and transactions:** add, edit, soft-delete, list with filters. *Test: enter 5 real past transactions; totals match your spreadsheet.*
4. **Events:** create events, link transactions, show budget vs actual and profit. *Test: one past event matches your records.*
5. **Dashboard and totals:** balance, recent items, totals by category, event and date range. *Test: numbers match by hand.*
6. **Export:** CSV and a printable summary. *Test: opens correctly in a spreadsheet.*
7. **Receipt photo (optional field):** upload to the private bucket, compress first. *Test: photo shows on the transaction; not visible when logged out.*
8. **PWA and deploy:** installable, hosted on Cloudflare Pages. *Test: Add to Home Screen on your phone, then repeat steps 2-3 there.*

Commit after each step once a git repository exists.

## 5. What you will do by hand
- Create the free Supabase project and copy its URL and public (anon) key.
- Paste `schema.sql` into the Supabase SQL editor.
- Create a Cloudflare Pages account and connect it for deployment (needs a GitHub repository by then).
- Test on your phone.

## 6. Decisions to confirm before building
1. TypeScript is fine, or prefer plain JavaScript?
2. Are the starter categories right? (see SPEC.md section 5)
3. Should receipt photos be in Phase 1 (step 7) or wait for Phase 2?
4. What do you need on the printable summary (per event, per term, whole year)?
5. Does your group's constitution set a spending limit or signatory rule to reflect later?

## 7. Risks
- Supabase free projects pause after about a week of inactivity; plan a note on how to wake it.
- Row Level Security is the easiest place to make a silent mistake. Test with a logged-out visit and, in Phase 2, with a Treasurer account.
- Keep the service role key out of the front-end code entirely.
- Free storage is limited (about 1 GB), hence photo compression.
