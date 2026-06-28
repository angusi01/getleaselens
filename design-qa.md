# GetLeaseLens Stitch Fidelity QA

## Comparison target

- Source visual truth: [Stitch project 6932162944331897112](https://stitch.withgoogle.com/projects/6932162944331897112?pli=1), locally extracted during QA as `../.stitch-reference/{homepage,report,how-it-works,security}.png` plus the corresponding Stitch HTML exports.
- Implementation: `http://127.0.0.1:3000/`, `/result?mock=true&file=sample-commercial-lease.pdf`, `/how-it-works`, and `/security`.
- Desktop viewport: 1280 × 900, with full-page captures.
- Mobile viewport: 390 × 844, with full-page captures.
- Implementation screenshots: `/tmp/getleaselens-qa/{homepage,report,how-it-works,security}-{desktop,mobile}.png`.
- Side-by-side comparisons: `/tmp/getleaselens-qa/{homepage,report,how-it-works,security}-comparison.png`.

## Full-view comparison evidence

Each desktop Stitch export and its 1280px implementation capture were composed side by side and opened together with `view_image`. The mobile captures were also composed into `/tmp/getleaselens-qa/mobile-overview.png` and inspected together. Stitch's report and How It Works screenshot exports render black in the downloaded raster files, so their corresponding Stitch HTML exports were used as the detailed source truth for typography, layout, copy, tokens, icons, and spacing.

## Focused comparison ledger

| Fidelity surface | Source evidence | Render evidence | Result |
| --- | --- | --- | --- |
| First viewport and hierarchy | Compact white nav, split homepage hero, indigo upload card controls | 1280px homepage capture preserves the nav, 7/5 hero split, copy scale, trust row, and upload hierarchy | Passed |
| Typography | DM Sans display/headings and Inter body/UI from Stitch HTML | Browser-loaded fonts reproduce the display/body contrast and wrapping on desktop and mobile | Passed |
| Palette and surfaces | White and `#f6f9ff` surfaces, `#4f46e5` controls, fine slate borders | Render uses the same indigo, pale blue, white, amber warning, and border tokens across all routes | Passed |
| Spacing and container model | 1200–1440px outer frames; 850px editorial content; open bands rather than nested dashboard cards | Homepage bands, How It Works stack, Security rows, and report 2/3–1/3 layout align with the source model | Passed |
| Icons | Material Symbols outline family in the Stitch exports | Upload, lock, delete, shield, payment, report, warning, and navigation icons use the same family and optical scale | Passed |
| Copy and navigation | Stitch labels, section order, CTA labels, footer links | Above-the-fold copy diff found no unintended additions/removals; route titles and links are correct | Passed |
| Responsive behavior | Mobile continuation inferred from the Stitch component structure | 390px captures show no horizontal overflow, clipping, overlap, or unusable controls on any route | Passed |
| Interaction states | Mobile menu, pricing radios, upload selection, report actions | Playwright confirmed the menu opens, 5-pack selection updates CTA to `$35`, PDF selection renders, and report download actions invoke print | Passed |

## Findings and patches

- Fixed homepage section headings that initially inherited the legacy dark-theme color and rendered too light.
- Added route-specific document titles and an empty data favicon to eliminate browser identity/console errors.
- Dismissed the existing analytics consent banner before source comparison so the captured state matches Stitch; its Accept interaction remains functional.
- Verified all four routes return HTTP 200, contain meaningful content, have no Next.js overlay, report no console/page errors, and maintain `scrollWidth === clientWidth` at both viewports.

## Intentional constraints

- Report content remains driven by the existing `summary` and `red_flags` response contract, so the number and wording of report cards vary from Stitch's static sample. No API or AI-analysis schema was changed.
- The homepage submit CTA follows the Stitch HTML export and preserves the existing upload flow even though the downloaded homepage raster omits that control.
- No decorative raster imagery exists in the Stitch screens; all UI remains code-native with the Stitch Material Symbols icon family.

## Verification

- `npm test -- --reporter=dot`: 2 files, 5 tests passed.
- `npm run build`: production build passed; only the pre-existing Next.js middleware deprecation warning remains.
- Backend scope check: no changes under `pages/api`, `lib`, `middleware.js`, or `supabase`.
- Playwright: eight route/viewport captures passed plus the homepage interaction flow.

final result: passed
