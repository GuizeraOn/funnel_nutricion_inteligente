# Digital Nutritionist Web App

This project was generated based on the `copy-site.txt` requirements.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure
- `src/app/page.tsx`: Main Funnel Controller (Calculadora -> Menu -> Rutina -> Oferta)
- `src/app/planos/page.tsx`: Plans / Checkout Page
- `src/components/funnel/`: Funnel step components
- `src/lib/constants.ts`: Content source of truth (from copy-site.txt)

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Mobile Preview
The layout is optimized for mobile devices. On desktop, it will appear as a centered mobile app container (max-width: 28rem).
