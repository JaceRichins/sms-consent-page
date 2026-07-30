# Setup — what's live and what's left

## Already live (done by Claude on 2026-07-29)

| Piece | Status |
|---|---|
| Goals & group sheet | ✅ Created: [Accountability – Goals & Group](https://docs.google.com/spreadsheets/d/11p_HjVtgZZ7mXZQJynBw6_1sHIP4CG-IUeP1Z6-qCAg/edit) (owned by richinscontracting@gmail.com) |
| Coach Journal — living memory | ✅ [Drive folder](https://drive.google.com/drive/folders/1azBkWfCCWZYyXt8w1WnWWMfrSmsYH0Cz) + Day-0 doc. Every run adds a dated doc: full per-member/per-goal index (status, streaks, insights, queued prompts) + that day's history. Newest doc = current brain. Share the folder with the group for transparency. |
| Daily coach schedule | ✅ Claude routine fires daily at 11:00 UTC (~5am Mountain), reads sheet + calendar + Gmail, writes the evening check-in event |
| Day 1 check-in event | ✅ Tonight 8:30pm on the calendar, invite sent to jace.richins1999@gmail.com |
| Email check-in channel | ✅ Works now: email richinscontracting@gmail.com, subject "Check-in" |
| Pages privacy | ✅ Workflow now publishes only `index.html`, not this folder |

## Your 15 minutes of setup

1. **Put real goals in the sheet.** Replace the `example` rows (set Status `active`).
   One GOAL per person, its KEY RESULTs, and 1–2 SYSTEM rows each. The coach's
   quality is capped by what's in this sheet.
2. **Add your group.** One MEMBER row per person (name, email, Status `active`),
   and share the sheet with them (Editor). The coach starts inviting them to the
   daily event automatically on its next run.
3. **Optional but recommended — the 10-second answer form.** Create a Google Form
   named `Daily Check-in` with exactly these fields, all short-answer, only the
   first two required:
   - `Name` (dropdown of members)
   - `Answer 1`
   - `Answer 2`
   - `Answer 3 (optional)`
   - `Anything else on your mind? (optional)`

   The fields stay generic on purpose: **the day's actual questions live in the
   calendar event**, so the form never needs editing. In the Form's Responses tab
   click "Link to Sheets", then paste the form's share link and the responses
   sheet's ID into `coach/config.yaml` (`form_url`, `responses_sheet_id`) — or just
   tell Claude "wire up my check-in form" with the link and it'll do it.
4. **Merge this branch to `main`** so each daily run starts on the latest playbook
   without a checkout step.

## How members experience it (the low-friction loop)

8:30pm: phone buzzes (calendar reminder) → open event → 3-line recap + 2 questions
→ tap form link (or reply by email) → type two fragments → done. 10–20 seconds.

## Changing things

- **Times, timezone, questions cadence** → edit `coach/config.yaml` (timezone is
  assumed America/Denver — fix if wrong, and consider setting your Google Calendar
  timezone, which is currently UTC).
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
1. Read the goals sheet, check-in responses (form responses sheet if
   configured, plus Gmail messages matching the fallback subject), the LATEST
   doc in the Coach Journal Drive folder (your living memory: the per-member
   per-goal index and history), and recent check-in calendar events.
2. Analyze streaks, progress, and patterns per member and per goal.
3. Create this evening's check-in calendar event: fresh targeted questions,
   micro-coaching, all active members as attendees.
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
