# AI Accountability Coach

A scheduled Claude session that coaches a goal-accountability group with near-zero
daily friction. No servers, no API keys — it runs on Claude Code routines and the
owner's connected Google account.

## How it works

```
                 ┌─────────────────────────────┐
  daily 11:00 UTC│  Claude routine (fresh run)  │
  ──────────────▶│  follows coach/COACH.md      │
                 └──────┬──────────┬────────────┘
        reads           │          │ writes
  ┌─────────────────────┴──┐   ┌───┴──────────────────────────┐
  │ Goals & Group sheet    │   │ Google Calendar event         │
  │ (Drive, human-owned)   │   │ "✅ 2-min check-in" — recap,  │
  │ Form responses sheet   │   │ streaks, TODAY'S QUESTIONS,   │
  │ Email check-ins (Gmail)│   │ all members invited, 8:30pm   │
  │ Past events (memory)   │   │ popup reminder                │
  └────────────────────────┘   └───┬──────────────────────────┘
                                   │ members answer in 10–20s
                                   ▼
                     Google Form (stable fields) or email reply
                             → lands where the coach reads tomorrow
```

The loop: every morning the coach analyzes yesterday's answers + calendar +
goals, then writes tonight's check-in event with fresh, targeted questions and
2–3 sentences of coaching. Mondays add a weekly scorecard event and a draft
group email. Questions adapt daily to whatever the data says is weakest.

Every run also grows the coach's living memory: a new dated doc in the
[Accountability Coach Journal](https://drive.google.com/drive/folders/1NXZPY3FYb4iMdnykNVADmmNwf0WamwYF)
Drive folder — the full index per member and per goal (status, streaks,
insights, queued prompts and why) plus that day's history. The newest doc is
the current brain; the folder is the complete audit trail; one link shares it
with the whole group.

## Files

| File | Purpose |
|---|---|
| `COACH.md` | The playbook every run follows — voice, algorithm, question engine, guardrails |
| `config.yaml` | Times, timezone, sheet IDs, form link. No personal data (repo is public via Pages) |
| `frameworks.md` | OKRs, 12 Week Year, Systems, Identity… and how the coach applies each |
| `question-bank.md` | Seed phrasings + adaptive-question triggers |
| `SETUP.md` | What's live, the owner's 15-minute setup, how to change/pause |
| `templates/` | Goals-sheet CSV template, weekly report format |

The member roster and goals live in the
[Accountability – Goals & Group](https://docs.google.com/spreadsheets/d/1Fz_VtOFfYSVZgWe1ToW7SI5ZLpaS11jv_zvdKZGGebY/edit)
sheet — the humans own it; the coach only reads.
