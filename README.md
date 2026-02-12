# Visual Testing – Moises Live

Visual regression tests for [Moises Live](https://moises-live-ui-v3.vercel.app/v3) using [Playwright](https://playwright.dev/).

## Project architecture

The repo is a visual testing suite organized by **product**. Each product has its own folder under `tests/`, with isolated specs and snapshots.

```
visual-testing-desktop/
├── playwright.config.ts    # Global config (testDir, browsers, reporter, retries)
├── package.json
├── README.md
└── tests/
    ├── moises-live/        # Moises Live tests (web app v3)
    │   ├── moises-live-authenticated.spec.ts
    │   ├── moises-live-flow.spec.ts
    │   ├── moises-live-multilang.spec.ts
    │   └── moises-live-rating.spec.ts
    ├── fender-plugin/      # (planned) Fender plugin tests
    └── ableton-plugin/     # (planned) Ableton plugin tests
```

- **Config:** `playwright.config.ts` sets `testDir: './tests'`, so Playwright discovers all `.spec.ts` files in any subfolder of `tests/`.
- **Running by product:** use the scripts in `package.json` (e.g. `npm run moises:headless`) or run a subset with `npx playwright test tests/moises-live`.
- **Browsers:** Chromium (viewport 420×600, srgb profile), Firefox and WebKit; Chromatic uses Chromium only for snapshots.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm

## Installation

```bash
npm install
npx playwright install
```

The second command installs browser binaries (Chromium, Firefox, WebKit) for Playwright.

## Running tests

```bash
npx playwright test
```

Run all Moises Live tests:

```bash
npx playwright test tests/moises-live
```

Run a specific test file:

```bash
npx playwright test tests/moises-live/moises-live-multilang.spec.ts
npx playwright test tests/moises-live/moises-live-flow.spec.ts
npx playwright test tests/moises-live/moises-live-authenticated.spec.ts
npx playwright test tests/moises-live/moises-live-rating.spec.ts
```

## Updating snapshots

When the UI changes intentionally, update the baseline screenshots:

```bash
npx playwright test --update-snapshots
```

## Test suite (Moises Live)

| File | Description |
|------|-------------|
| `moises-live-multilang.spec.ts` | Layout and translations across 34 locales (welcome, main, loading, music tab). |
| `moises-live-flow.spec.ts` | Full UI flow: welcome → main → music tab (guest validation, mute blocked, slider limit) → speech tab. |
| `moises-live-authenticated.spec.ts` | Authenticated flow: token injection and mute behavior when logged in. |
| `moises-live-rating.spec.ts` | Rating screen validation (review modal with `moises:showReviewApp` in localStorage). |

## Configuration

- **Test directory:** `./tests` (subfolders per product: `moises-live/`, etc.)
- **Browsers:** Chromium, Firefox, WebKit (Chromium: `srgb` profile, viewport 420×600)
- **Reporter:** HTML report (`npx playwright show-report` after a run)
- **Retries:** 2 on CI, 0 locally

## Technical Highlights

- **Async handling:** Smart waits (e.g. `toBeVisible`) for AI loading states and network variations.
- **Robust selectors:** `getByRole` and text filters to avoid breakage from CSS class changes.
- **Auth bypass:** State injection for faster, stable testing without UI login flows.

## License

ISC
