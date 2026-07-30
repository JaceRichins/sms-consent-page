# Richins tools

Two things live in this repo:

1. **SMS consent page** (`index.html`) — the public A2P 10DLC opt-in policy page
   for Richins Construction, deployed to GitHub Pages. The Pages workflow
   publishes **only** `index.html`; everything else in the repo stays private to
   the repo.
2. **AI Accountability Coach** (`coach/`) — a daily scheduled Claude session that
   runs a goal-accountability group over Google Calendar, a Google Sheet, and
   Gmail. See [`coach/README.md`](coach/README.md) for the architecture and
   [`coach/SETUP.md`](coach/SETUP.md) for what's live and what's left to do.
