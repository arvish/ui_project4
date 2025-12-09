# HeatSafe SvelteKit Prototype

HeatSafe is a quick SvelteKit + TypeScript prototype exploring how neighbors could coordinate during
a dangerous heat wave. The goal is to make it easy for block captains or mutual-aid volunteers to
prioritize high-risk residents, log check-ins, and keep track of requested resources.

## Running the app

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev -- --open
   ```

   The dashboard will be available at `http://localhost:5173` (default Vite port).

3. Build for production:

   ```bash
   npm run build
   ```

> Note: If npm registry access is restricted, dependency installation may need to be run in an
environment with internet access.

## What the UI demonstrates

- **Roster filters** for risk level, requested support, and free-text search to quickly locate a
  neighbor.
- **Check-in logging** that records recent activity and updates the roster’s last-contact info.
- **Resource summary** that tallies requested help (cooling supplies, water, rides, visits, medical
  follow-ups).
- **Quick intake form** for adding a new neighbor with needs, notes, and next check-in time.

All data is stored in-memory on the client for demonstration and resets on refresh.

## Project structure

- `src/routes/+page.svelte` — the main dashboard UI and interactions.
- `src/lib/types.ts` — shared TypeScript types for neighbors, check-ins, and support needs.
- `svelte.config.js`, `vite.config.ts`, `tsconfig*.json` — SvelteKit build and tooling configs.

## Why this direction

Extreme heat events are increasing and disproportionately harm seniors, people without air
conditioning, and those who live alone. A lightweight, mobile-friendly dashboard can lower the
activation energy for volunteers to identify who needs help, coordinate rides to cooling centers,
and log wellness checks without juggling multiple tools.
