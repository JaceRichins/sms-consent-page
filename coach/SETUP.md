# Setup — what's live and what's left

## Where everything lives (read this first)

Everything lives in the Google account connected to Claude:
**jace.richins1999@gmail.com** (the owner's personal account). Claude can
create files but cannot change sharing, so sharing is the one thing only the
owner can do — open each item in Drive → **Share** → add each member:

- *START HERE guide* → members as **Viewer**
- *Goals & Group sheet* → members as **Editor** (they type their own goals)
- *Coach Journal folder* → members as **Viewer**

Members then find everything under **"Shared with me"** in their own Google
accounts. Calendar needs no sharing: the coach invites each member to the
check-in events directly, so they land on everyone's own calendar.

(History: the system briefly lived in richinscontracting@gmail.com on day 0
and was migrated here before any check-ins happened. Leftover copies in that
account can be deleted.)

## Already live (done by Claude on 2026-07-29)

| Piece | Status |
|---|---|
| Goals & group sheet | ✅ [Accountability – Goals & Group](https://docs.google.com/spreadsheets/d/1Fz_VtOFfYSVZgWe1ToW7SI5ZLpaS11jv_zvdKZGGebY/edit) — formatted: color-coded rows, dropdowns, live Dashboard tab, Guide tab. Optional true macros: paste `templates/sheet-macros.gs` into Extensions → Apps Script |
| Coach Journal — living memory | ✅ [Drive folder](https://drive.google.com/drive/folders/1NXZPY3FYb4iMdnykNVADmmNwf0WamwYF) + Day-0 doc. Every run adds a dated doc: full per-member/per-goal index (status, streaks, insights, queued prompts) + that day's history. Newest doc = current brain. Share the folder with the group for transparency. |
| Member guide | ✅ [START HERE — How Our Accountability System Works](https://docs.google.com/document/d/1R7SvT29jNF7M5y1jjvnz0_qqirQEqpBFaKavQkB3bSo/edit) — the one link to send new members: behavior-change framing, the nightly 20 seconds, sensor power-ups, ground rules, FAQ |
| Daily coach schedule | ⚠ Routine spec is below — **as of Fri Aug 1 it had never fired** (no journal entries, no coach-written events). Verify it exists in a fresh session; recreate from the spec if missing |
| Answer channel | ✅ IN THE CALENDAR EVENT: events are guest-editable; members tap Edit and type after their name. Email (subject "Check-in") still read silently as fallback, never advertised |
| Sensor feeds | ✅ Wired: location pings via email subject "Location" (phone automation, setup below) + [Check-in Uploads folder](https://drive.google.com/drive/folders/1l4QAriuEybmgFxKyRNSfQ-5vCcY51QG9) for weekly screen-time screenshots + nightly screen-time number in the anchor question |
| Pages privacy | ✅ Workflow now publishes only `index.html`, not this folder |

## Your 15 minutes of setup

1. **Put real goals in the sheet.** Replace the `example` rows (set Status `active`).
   One GOAL per person, its KEY RESULTs, and 1–2 SYSTEM rows each. The coach's
   quality is capped by what's in this sheet.
2. **Add your group.** One MEMBER row per person (name, email, Status `active`),
   and share the sheet with them (Editor). The coach starts inviting them to the
   daily event automatically on its next run.
3. **Sensor power-ups (10 min per phone — this is what makes the coaching sharp):**
   - **Location pings** (zero-touch after setup). iPhone: Shortcuts → Automation →
     New → "When I Arrive" [gym / office / jobsite] → action Send Email →
     To: jace.richins1999@gmail.com, Subject: `Location`, Body: "arrived gym" →
     turn OFF "Ask Before Running". Repeat per place (+ "When I Leave" where useful).
     Android: MacroDroid/Tasker, same shape. Works from any sender address —
     the coach matches sender to the MEMBER rows.
   - **Screen time**: say the number in the nightly answer (it's part of question 1);
     once a week, screenshot the phone's screen-time summary into the
     [Check-in Uploads folder](https://drive.google.com/drive/folders/1l4QAriuEybmgFxKyRNSfQ-5vCcY51QG9)
     (phone Share → Drive → that folder). The coach reads images.
4. **One manual sheet fix**: on the sheet's Dashboard tab, the "How this thing
   works" step 2 still says answer-by-email — edit that cell to
   "Answer inside the calendar event (tap Edit, type after your name, Save)."
   (Claude can't edit existing files, and rebuilding the sheet for one cell
   would churn every link.)
5. **Merge this branch to `main`** so each daily run starts on the latest playbook
   without a checkout step.

## How members experience it (the low-friction loop)

8:30pm: phone buzzes (calendar reminder) → open event → 3-line recap + 2 questions
→ tap form link (or reply by email) → type two fragments → done. 10–20 seconds.

## Changing things

- **Times, timezone, questions cadence** → edit `coach/config.yaml` (timezone is
  America/Denver, confirmed against the owner's Google Calendar).
- **Coaching style / rules** → edit `COACH.md`; the coach re-reads it every run.
- **Pause / stop** → tell Claude "pause the accountability coach routine"
  (or manage Routines in the Claude Code web UI). Deleting the routine stops
  everything; nothing else needs cleanup.
- **DST note:** the schedule is fixed at 11:00 UTC, so the run shifts 5am↔4am
  Mountain across DST. Harmless — it always finishes before breakfast.

## Scheduler spec — the daily Routine (create this once)

The scheduling connector got permission-locked in the original build session, so
the Routine may not exist yet. Any Claude session on this repo can create it:
say **"create the accountability coach routine from coach/SETUP.md"** and
approve the one permission prompt (claude-code-remote → create_trigger).
Exact settings:

- **Name:** `AI Accountability Coach — daily run`
- **Schedule:** cron `0 11 * * *` (UTC — ~5am Mountain), every day
- **Mode:** new session on each fire, in this repo's environment
- **Notifications:** push on completion
- **Model:** Opus 4.8 (`claude-opus-4-8`) — set via update_trigger right after
  creating, or pick it in the Routine UI
- **Prompt** (verbatim):

```
You are the AI Accountability Coach for the Richins goal group — you manage the
whole system. The repo JaceRichins/sms-consent-page is cloned in your working
directory. If coach/COACH.md is missing, run: git fetch origin
claude/ai-accountability-goal-tracker-wqd4f0 && git checkout
claude/ai-accountability-goal-tracker-wqd4f0

Read coach/COACH.md and coach/config.yaml, then execute today's run per the
playbook:
1. Read the goals sheet; the last 2 days of check-in events INCLUDING answers
   members typed into the event descriptions (primary channel); Gmail fallback
   check-ins and "Location" sensor pings; new files in the uploads folder; the
   LATEST doc in the Coach Journal Drive folder (your living memory); and
   upcoming calendar context.
2. Analyze streaks, progress, behavior patterns (B=MAP diagnosis per the
   playbook), screen-time trend, and location-derived attendance per member.
3. Create this evening's check-in calendar event: guest-editable
   (guestsCanModify true), fresh targeted questions, micro-coaching, an
   ✍ ANSWERS block with one line per active member, all members as attendees.
4. Write today's Coach Journal doc into the journal folder: full updated index
   (each member, each goal, status, streaks, insights, queued prompts and why)
   plus today's history entry. The journal is the system's continuously growing
   memory — never skip it.
5. On Mondays also run the weekly review (scorecard event + Gmail DRAFT of the
   weekly report — never send email).

Hard rules from the playbook: Drive is create/read only — never modify existing
files; email drafts only — never send; never push code or create PRs; max 3
questions; member-facing text stays short. If setup is incomplete, run
bootstrap mode per COACH.md §6 instead of failing. End with a 2-3 sentence
summary of who's on/off track and anything the owner should do.
```

Alternative: create it by hand in Claude Code on the web (Routines) with the
same schedule, prompt, and model.

## Roadmap ideas (ask Claude when ready)
- **SMS delivery** once the Twilio A2P campaign tied to `/index.html` is approved —
  the coach is designed for it (see COACH.md §Future).
- **Weekly scoreboard artifact** — a shareable web dashboard the Monday run updates.
- **Per-member coaching DM drafts** instead of group-only coaching.
