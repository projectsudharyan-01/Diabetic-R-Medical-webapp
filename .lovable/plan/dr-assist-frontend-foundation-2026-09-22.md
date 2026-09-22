# DR-Assist frontend foundation

## Goal
Build a polished, responsive academic screening prototype that supports the complete rural/PHC workflow without implying that any real medical AI is connected or validated. This is Phase 1 only: complete the frontend foundation in one pass, keep it easy to extend in VS Code, and stop before backend or AI integration.

## Pages and navigation
- Create a shared application shell with a collapsible desktop sidebar, tablet/mobile navigation, page header, prototype badge, and clear “AI not connected” status.
- Add dedicated routes for Dashboard, New Screening, Analysis, Patients, Reports, Analytics, System, and a printable screening report.
- Give every page unique, app-specific page metadata.

## Clinical workflow
- Build the New Screening form with patient fields, eye selection, notes, drag-and-drop image upload, local preview, metadata, replace/remove controls, and a disabled-until-ready Analyze Image action.
- Keep uploaded images in temporary browser memory/local component state only; do not add persistence or permanent storage.
- Show an explicit demo analysis state with original-image viewing tools, quality/severity/referability/confidence placeholders, review state, and explainability views prepared for future Grad-CAM and lesion-mask imagery.
- Build a professional report view with the required disclaimer and working print action; report generation and PDF download remain clearly labeled prototype actions.
- Make the full prototype usable while disconnected, with prominent exact labels: “PROTOTYPE MODE”, “AI ENGINE NOT CONNECTED”, and “DEMO DATA”.

## Dashboard and records
- Add clearly labeled sample-data summaries, recent screenings, trend visualization, severity distribution, and the primary screening action.
- Add searchable/filterable patient and report tables with believable but explicitly fictional sample records.
- Add sample analytics for screening volume, severity, referable/manual-review counts, and image-quality outcomes.
- Add a system integration page showing every AI/data service as not connected.

## Architecture and visual system
- Define a restrained charcoal/deep-navy medical palette with cyan/blue accents, semantic status colors, compact radii, soft translucent surfaces, strong contrast, and typography tokens.
- Create reusable shell, page-header, status, metric, chart, table, image-viewer, and empty/demo-state components.
- Add typed domain models, centralized configuration/sample data, and service contracts for image upload, quality assessment, DR prediction, lesion detection, Grad-CAM, and report generation; every implementation throws or returns an explicit not-connected state rather than fabricated output.
- Avoid duplicate pages or components and do not add authentication, databases, external APIs, integrations, or backend services in Phase 1.
- Use accessible labels, keyboard-operable controls, responsive table/card fallbacks, reduced-motion handling, and restrained transitions.

## Validation
- Verify route rendering and navigation, upload/preview/remove behavior, filters, analysis controls, report actions, desktop layout, and tablet layout in the running preview.
- Confirm all visible clinical outputs are labeled sample/demo and all required pages remain explicit about disconnected AI services.
