# Victory Vintage Civil Engineering

This repository contains a TypeScript + Vite web app with an Express server component.

Quick start

1. Install dependencies (uses pnpm):

   pnpm install

2. Run the dev server:

   pnpm run dev

3. Build for production:

   pnpm run build

4. Start the production build (after build):

   pnpm start

Scripts

- dev: Start Vite dev server
- build: Build client and bundle server
- start: Start compiled server
- check: Type-check with tsc
- format: Prettier formatting
- lint: ESLint (optional — dev dependency not included by default)
- test: Run unit tests (vitest)
- test:ci: Run tests in CI mode with coverage
- ci: Runs checks, build and tests (used by CI)

Development notes

- This project uses pnpm as the package manager (see pnpm-lock.yaml).
- Prettier is already configured. ESLint is not installed by default — refer to the CONTRIBUTING.md for recommended dev dependencies and how to set up linting locally.

Docker

A Dockerfile is provided for building a production image. See the Dockerfile for details.

CI

A GitHub Actions workflow is included at .github/workflows/ci.yml that runs type checking, build and tests.

Vercel deployment

This project is ready to deploy to Vercel as a static site with a serverless contact form endpoint. The Vercel configuration is in vercel.json and uses the existing build script to produce static files in dist/public.

Steps to deploy:

1. Push your repository to GitHub (or connect your existing repository to Vercel).
2. In the Vercel dashboard create a new project and import the repository.
3. Set the Build Command to: pnpm run build
4. Set the Output Directory to: dist/public
5. Add the environment variables below in Vercel's Environment Variables settings:
   - SITE_URL=https://your-domain.vercel.app
   - RESEND_API_KEY=your_resend_api_key
   - RESEND_FROM_EMAIL=Victory Vintage <noreply@your-domain.com>
   - CONTACT_TO_EMAIL=info@victoryvintage.co.zw
6. Deploy — Vercel will run the build, serve the static output and expose the /api/contact endpoint.

The contact form posts to /api/contact and will optionally send a real email via Resend when RESEND_API_KEY is configured. Without that key, the app falls back to a demo-mode confirmation so the site still works locally and in preview deployments.

Contributing

See CONTRIBUTING.md for how to run the project locally and the preferred workflow for contributions.

License

This project is licensed under the MIT License — see LICENSE for details.
