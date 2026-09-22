# DR-Assist Pro

Build the initial frontend and application shell for a medical AI screening prototype called DR-Assist — Explainable AI for Diabetic Retinopathy Screening.

This is an academic/SIH prototype. The application will eventually analyze retinal fundus photographs for diabetic retinopathy, but the real AI models will be integrated later. Do NOT invent or claim real medical predictions, diagnostic accuracy, sensitivity, specificity, or clinical validation at this stage.

Core purpose

DR-Assist is designed as a rural/PHC screening workflow where a trained health worker can:

Create a screening record.

Upload a retinal fundus image.

Check image quality.

Run AI analysis.

View DR severity and visual evidence.

Review explainability information.

Generate a screening report.

Refer uncertain or referable cases to an ophthalmologist.

Design direction

Create a professional, modern medical-AI interface.

Avoid:

Generic hospital website appearance

Cartoonish medical graphics

Excessive gradients

Gaming-style UI

E-commerce styling

Fake medical claims

Use:

Clean dark/light medical dashboard aesthetic

Deep navy/charcoal foundation with restrained cyan/blue accents

Glass/soft-card surfaces where appropriate

Excellent typography and spacing

Clear clinical information hierarchy

Accessible contrast

Subtle animations

Responsive desktop/tablet layout

Professional data visualization

The application should feel like a serious AI-assisted clinical screening tool rather than a generic dashboard template.

Navigation

Create the following main navigation:

Dashboard

New Screening

Patients

Reports

Analytics

System

Dashboard

Create a dashboard containing:

Total screenings

Screenings today

Referable cases

Cases requiring manual review

Recent screenings

Screening trend chart

DR severity distribution

Large "Start New Screening" CTA

Do not use fake clinical statistics as if they were real. Clearly mark demo/sample data where necessary.

New Screening page

Create a screening workflow containing:

Patient information:

Patient ID

Age

Sex

Diabetes duration

Eye selection: Left / Right

Optional notes

Fundus image section:

Drag-and-drop upload

Browse file button

Image preview

Replace/remove image

Image metadata area

Primary button:

"Analyze Image"

Initially the AI result can be represented by a clearly labeled placeholder/demo state because the real AI engine will be integrated later.

Analysis page

Create a professional analysis layout with:

Left:

Original fundus image

Zoom controls

Fullscreen control

Right:

Image quality status

DR severity

Referable status

Confidence

Analysis status

Below:

Detected evidence

Explanation

Review status

Use placeholder/demo values only and clearly identify them as prototype/demo values.

Explainability section

Create a dedicated explainability area showing placeholders for:

Original image

Enhanced image

Grad-CAM attention map

Lesion evidence overlay

Vessel/retinal structure overlay

Include an explanation panel containing:

"Why this result?"

with structured evidence cards.

The interface must be designed so that real Grad-CAM and lesion masks can later replace these placeholders.

Report page

Create a professional screening report containing:

Patient information

Image quality

DR severity

Referable status

Detected evidence

AI confidence

Explainability summary

Reviewer status

Date/time

Screening ID

Include:

"AI screening support — not a definitive diagnosis."

Provide buttons for:

Generate Report

Print

Download PDF

The PDF generation can initially be a placeholder if necessary.

Patients page

Create a patient list with:

Patient ID

Screening date

Eye

Latest DR level

Referable status

Review status

Include search and filtering.

Reports page

Create a report history table with:

Screening ID

Patient ID

Date

DR level

Referable status

Review status

View report button

Analytics page

Create prototype analytics components for:

DR severity distribution

Screening volume

Referable cases

Manual review cases

Image quality outcomes

Clearly label sample/demo data until the real dataset is connected.

System page

Create a system status page showing:

AI engine: Not connected

Dataset: Not connected

Image quality model: Not connected

DR classifier: Not connected

Explainability engine: Not connected

This will later become the integration/monitoring page.

Technical requirements

Use a clean component-based architecture.

Keep the code modular so that the frontend can later communicate with an external AI backend/API.

Create clear service interfaces/placeholders for:

image upload

image quality assessment

DR prediction

lesion detection

Grad-CAM generation

report generation

Do not implement fake AI logic disguised as real functionality.

Use TypeScript and a maintainable React architecture.

Make the application responsive and polished.

The final result should be a strong frontend foundation for the DR-Assist SIH prototype, ready for us to integrate the actual retinal image datasets and AI models later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/03b7789e-1de7-4413-9e30-a35c501fa8e2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
