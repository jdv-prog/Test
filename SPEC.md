# SPEC: Friends at Hand

Working name: **Friends at Hand**. Tagline idea: "Events, volunteers and budgets, together."

## 1. Purpose
A simple, mobile-friendly web app (installable as a PWA) that helps small volunteer-run groups plan events, coordinate volunteers and equipment, and track income and expenses in one place.

- First user: my friends-of-school group, where I will be the Admin.
- Later: other local schools, and similar groups (for example "Friends of" parks and libraries, clubs, community events, small gig promoters).
- Core idea: each **event** has one page showing its budget, money in and out, volunteers, equipment, donations and notes.

It does NOT hold or move money. It records and reports on what happens in the group's real bank account and cash.

## 2. Users and roles
- **Admin (I will be the admin):** full access to everything. Manages users and assigns roles, manages categories and settings, adds, edits, deletes and restores any record, views the audit log, exports all reports.
- **Treasurer (secondary role):** runs the day-to-day finances. Can add and edit transactions, events, targets and receipts, and can view and export reports. Cannot manage users or roles, change settings, or delete or restore records.
- **Committee member:** can view everything except settings, plans events, adds expense requests, votes. Cannot edit or delete the ledger.
- **Volunteer / member:** sees event task, volunteer and equipment lists, and can sign up or confirm items. Cannot see finances.
- **Parent / public (late phase):** sees limited public information only (see Phase 4).

Rules for roles:
- Permissions must be enforced in the database (Row Level Security), not just hidden in the interface.
- Only an Admin can change anyone's role. There must always be at least one Admin.
- The first account created is the Admin.
- Keep a simple permissions table in PROGRESS.md so I can adjust who can do what.

## 3. Groups (organisations), built in from the start
- Every record belongs to an **organisation** (one group's data). Other groups' data must never be visible to a user.
- For now there is only one organisation (mine). Do not build sign-up or switching between organisations yet, but include `organisation_id` on every table and make the security policies check it, so other groups can be added later without a rebuild.
- Wording should be configurable per organisation later (for example "volunteers" vs "crew", "fundraising target" vs "event goal"). In Phase 1, keep the wording in one place in the code so it is easy to change.
- Categories are editable per organisation, not hardcoded.

## 4. Tech approach (keep it simple and low cost)
- Mobile-first web app, installable as a PWA (Add to Home Screen).
- Front end: React with Vite (or the simplest well-supported option; explain the choice).
- Back end: Supabase on the free plan (Authentication + PostgreSQL database + Storage for receipt photos). Use Row Level Security on every table.
- Hosting: a free static host suitable for a PWA (for example Cloudflare Pages, Netlify or Vercel free tier). Recommend the simplest option and explain how to deploy.
- Supabase free projects pause after about a week of inactivity. Tell me how to wake a paused project, and add a reminder in the app docs. Do not add workarounds that break Supabase's terms.
- Free storage is limited (about 1 GB), so compress receipt photos in the browser before uploading.
- Avoid paid services, paid APIs and anything that requires a monthly subscription.
- Prefer few dependencies. Explain any library you add.

## 5. Phase 1 (build first): ledger and events, Admin only
1. **Login:** email and password for the Admin. Only logged-in users can see data.
2. **Transactions:** add, edit, delete income and expenses.
   - Fields: type (income/expense), amount, date, category, event (optional), payment method (cash/bank/card), note, receipt photo (optional).
3. **Categories:** a starter list I can edit. Income examples: cake sale, raffle, uniform sale, disco, donation, grant. Expense examples: supplies, hire, printing, prizes, school purchase.
4. **Events:** create an event with a name, date and budget. Show income, expenses, profit and budget vs actual.
5. **Totals:** running balance and totals by category and by event, filtered by date range or term.
6. **Export:** CSV export of transactions, and a simple printable summary.

## 6. Phase 2: Treasurer role, targets and reports
- **Treasurer role:** Admin invites a Treasurer by email and assigns the role from a simple Users screen. Test by logging in as a Treasurer and confirming that user management, settings and delete are blocked, including by direct database requests.
- **Targets:** e.g. "New playground equipment, £1,200". Progress bar based on money allocated to the target. Mark as complete.
- **Receipt photos:** capture from the phone camera, stored against the expense.
- **Cash count mode:** at the end of an event, enter takings; a second person confirms the total. Record both names.
- **Termly and annual report:** printable PDF with totals, events and targets.

## 7. Phase 3: Event hub (volunteers and equipment)
- **Event planning page:** notes, tasks and a checklist for each event.
- **Volunteer slots:** roles or shifts with a number needed. People claim a slot; show "3 of 5 filled". Admin can remove or edit entries.
- **Equipment list:** items needed. Someone marks "I can bring this" and it is confirmed, so items are not double-claimed. Mark items as brought or returned.
- Committee and volunteer roles are added here, with the permissions in section 2.
- Collect the minimum personal data: a name and an optional contact detail. No children's details.

## 8. Phase 4: Donations and wider access
- **Donation requests:** a wishlist of requested items (raffle prizes, cake ingredients, tombola items). Parents or others tick what they can give. The committee logs what has actually arrived.
- **Parent / public access:** decide with me before building. Options: simple sign-in with email, or a shared event link with just a name and tick-box. Show limited public information only (event details, what is needed, totals raised), never transaction detail.
- Admin can moderate, edit or remove any entry.
- Keep a clear way to delete a person's data on request.

## 9. Phase 5: Minutes, updates, voting and approvals
- **Meeting minutes:** committee-only by default. Fields: date, attendees, decisions, action points with owners.
- **Updates:** short public updates for members and parents, kept separate from minutes.
- **Wishlist and voting:** committee or staff suggest purchases; members vote; top items can become targets.
- **Approvals:** expenses above a set amount need a second person's sign-off.
- **Audit log:** who created or changed each record and when.

## 10. Data model (suggested PostgreSQL tables)
Every table has `organisation_id`.
- `organisations`: id, name
- `profiles`: id (matches the Supabase auth user id), organisation_id, name, role (admin, treasurer, committee, volunteer)
- `categories`: id, organisation_id, name, type (income/expense)
- `events`: id, organisation_id, name, date, budget_pence, notes
- `targets`: id, organisation_id, name, goal_pence, status
- `transactions`: id, organisation_id, type, amount_pence, date, category_id, event_id, payment_method, note, receipt_path, created_by, created_at, updated_at, deleted_at

Later phases add: `event_tasks`, `volunteer_slots`, `volunteer_signups`, `equipment_items`, `donation_requests`, `minutes`, `updates`, `votes`, `audit_log`.

Rules:
- Store money as whole numbers of pence (integers), never decimals, to avoid rounding errors.
- Currency is GBP (£). Dates in UK format (DD/MM/YYYY) in the interface.
- Use a `deleted_at` column (soft delete) instead of permanent removal, so history is not lost.
- Give me the SQL to create the tables and policies as a file I can paste into the Supabase SQL editor, and explain what it does.

## 11. Screens (Phase 1)
- Login
- Dashboard: balance, recent transactions, quick "Add income" / "Add expense" buttons
- Transactions list with filters and search
- Add/edit transaction
- Events list and event detail (budget vs actual)
- Reports/export

## 12. Security and privacy
- Enable Row Level Security on every table and storage bucket so nothing is readable or writable unless the user is logged in, belongs to the same organisation, and has permission for their role. Explain each policy in plain English.
- Receipt photos go in a private storage bucket (not public), accessed only by logged-in users with permission.
- Only use the Supabase public (anon) key in the app. Never put the service role key in front-end code.
- Never store bank account numbers, card numbers or passwords in the app.
- Collect the minimum personal data needed. Volunteer names and contact details are personal data: store only what is necessary and allow deletion on request.
- Minutes are committee-only by default. Anything public must be a separate, deliberate setting.
- The app must not imply that anyone has been safeguarding-checked unless the school confirms it.
- Keep API keys and config out of public code; explain how.
- Remind me to export a CSV backup regularly.

## 13. Design and branding
- Mobile-first, large tap targets, clear and friendly. Light, simple colour scheme.
- Easy for a volunteer with no accounting background to use. Plain wording (e.g. "Money in", "Money out").
- Works well with one hand on a phone at an event.
- Name: Friends at Hand (logo to follow; use a simple text placeholder for now).
- Keep the name and key wording in one place so it can be changed easily.

## 14. Out of scope (for now)
- Holding or transferring money, payments, ticketing or direct bank integration
- Native App Store / Google Play publishing
- Onboarding or switching between multiple organisations (the structure supports it, but the feature comes later)
- Anything that needs a paid subscription

## 15. How to work with me
- I am not an experienced developer. Explain steps in plain English and tell me exactly what to click or paste (for example, creating the Supabase project).
- Build in small steps. Finish and test one feature before the next. Do not build later phases early.
- Before writing code for each phase, give a short plan and wait for my go-ahead.
- After each feature, tell me how to test it on my phone.
- Keep a `PROGRESS.md` file with what is done, what is next, and any decisions made, so a new session can pick up where we left off.
- Suggest committing to git after each working feature.
- If something in this spec is unclear or a better low-cost option exists, ask or tell me before proceeding.

## 16. Done means (Phase 1)
- I can log in on my phone as Admin and add income and expenses.
- The balance and event totals match my existing spreadsheet when I enter the same transactions.
- I can export a CSV.
- Someone who isn't logged in cannot see any data.
