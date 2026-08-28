# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`email-marker-client` ([npm](https://www.npmjs.com/package/email-marker-client)) is a small standalone TypeScript client library for the [Email Marker](https://www.emailmarker.com/) email-verification API, published for use in both Node.js and the browser. It is a sibling repo to `../emailmarker-shopify-app`, which depends on this package to validate customer emails through the same API — this repo is versioned and published to npm independently.

The entire public surface is three files re-exported from `src/index.ts`:
- `email-marker.client.ts` — `EmailMarkerClient`, constructed with an API key, exposes `verify(email)` which GETs `https://app.emailmarker.com/api/verify` and returns an `EmailMarkerResponse`.
- `email-marker.types.ts` — `EmailMarkerResponse` / `EmailMarkerResult` (`'valid' | 'invalid' | 'unknown'`).
- `email-marker.error.ts` — `EmailMarkerError`, thrown when the API responds non-OK, wrapping the raw `Response`.

Uses `cross-fetch` so the same code works in Node and browser environments.

## Commands

Package manager is **npm** (not Yarn, unlike the sibling Shopify app repo).

```bash
npm install

npm run build     # tsc -> lib/ (declarations + sourcemaps, per tsconfig.json)
npm run lint       # eslint --fix over src/ and test/
npm run format     # prettier --write over src/ and test/

npm run pub        # npm version patch && npm publish — cuts and publishes a new patch release
```

There is no configured test runner (no `test` script, no jest/mocha dependency) despite the `test/` directory and `*.test.ts` naming. `test/global.test.ts` is a manual smoke script, not an automated suite — it calls `EmailMarkerClient.verify` against the real API using `TEST_API_KEY` from `.env` (see `.env.sample`) and logs the result; run it ad hoc with `ts-node test/global.test.ts` if you need to exercise the client against the live API.

Husky git hooks (`package.json`'s `husky` field) run `npm run format && npm run lint` on `pre-commit` and `npm run build` on `pre-push`.

## Architecture notes

- `outDir` is `lib/`, and `package.json`'s `main`/`types`/`files` all point there — `lib/` is what gets published to npm (via the `prepare`/`prepublishOnly` script hooks), `src/` never ships.
- `tsconfig.eslint.json` extends the base `tsconfig.json` but swaps `include` to `test`, so linting can type-check the manual test script against the same compiler options without pulling it into the `lib/` build (`tsconfig.json` itself only `include`s `src`).
- Keep the client dependency-free beyond `cross-fetch`; this is a lightweight library consumed by other apps (currently the `emailmarker-shopify-app` server), not an application with its own runtime concerns.
