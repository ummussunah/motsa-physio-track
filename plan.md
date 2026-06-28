# PhysioTrack Naija Implementation Plan

A bilingual (English/Hausa) physiotherapy exercise tracking application for home rehabilitation.

## Scope Summary
- **Bilingual Interface:** Full support for English and Hausa toggling.
- **Exercise Library:** Categorized exercises (Lower Back, Women's Health, etc.) with instructions and visual placeholders.
- **Tracking:** Completion marking, 0-10 pain scale recording, and symptom notes.
- **Dashboard:** Progress visualization (charts) for pain, mobility, and adherence.
- **Reminders:** Mock daily reminder system.
- **Condition Support:** Specific tracks for low back pain, pelvic floor, pregnancy/postpartum, and general MSK.
- **Tech Stack:** React, Tailwind CSS, Lucide icons, Recharts for visualization, and client-side state management (no database).

## Assumptions & Open Questions
- **Data Persistence:** Using `localStorage` since no database is available in this session.
- **Language Assets:** Will provide basic Hausa translations for UI elements and sample exercises.
- **Visuals:** Will use placeholder images/icons for exercises.

## Affected Areas
- **`src/components`**: Custom UI components for tracking, charts, and language selection.
- **`src/hooks`**: Custom hook for state management and local storage.
- **`src/i18n`**: Configuration for bilingual support.
- **`src/data`**: Static exercise library and initial program templates.
- **`src/pages`**: Dashboard, Exercise List, Logging, and Profile/Settings.

## Ordered Phases

### Phase 1: Foundation & Bilingual Setup
- Set up internationalization (i18n) structure for English and Hausa.
- Create core data structures for exercises and user progress logs.
- **Owner:** `frontend_engineer`

### Phase 2: Core Exercise & Tracking UI
- Build the exercise listing and detail pages with bilingual content.
- Implement the "Log Exercise" form (Pain 0-10, completion status, notes).
- **Owner:** `frontend_engineer`

### Phase 3: Dashboard & Visualization
- Implement the progress dashboard using `Recharts`.
- Create weekly/monthly summary views for pain levels and exercise adherence.
- **Owner:** `frontend_engineer`

### Phase 4: Program Selection & Personalization
- Implement condition-specific program selection (e.g., "Postpartum Recovery").
- Add goal-setting functionality.
- **Owner:** `frontend_engineer`

### Phase 5: Reminders & Refinement
- Add mock reminder notifications and mobile-responsive polish.
- Final CSS/translation checks.
- **Owner:** `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup architecture, i18n, and core tracking UI (Phases 1-4)
2. quick_fix_engineer — Final refinements, CSS polish, and translation checks (Phase 5)

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** 
    - Initialize i18n using a simple context-based approach (or similar) to handle English/Hausa.
    - Create a static library of exercises for the requested conditions (Low back, Women's Health, etc.) in both languages.
    - Implement a `localStorage` wrapper to persist user logs (pain scores, completions).
    - Build the Dashboard with Recharts to show trends.
    - Ensure the layout is "Mobile-First" as per the "Naija" context (accessibility for rural/urban users).
- **Files:** `src/App.tsx`, `src/components/*`, `src/hooks/use-storage.ts`, `src/data/exercises.ts`
- **Depends on:** none
- **Acceptance criteria:** App toggles between English/Hausa; User can log an exercise and see the result on a chart; Exercises are filtered by condition.

### 2. quick_fix_engineer
- **Phases:** 5
- **Scope:** 
    - Review all UI text to ensure English and Hausa consistency.
    - Adjust spacing/padding for mobile-friendly "big button" accessibility.
    - Add a mock notification toast for "Daily Reminders".
- **Files:** `src/components/*`, `src/index.css`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** UI is polished, no broken layouts on small screens, bilingual labels are correct.
