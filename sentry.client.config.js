// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { Replay } from '@sentry/replay';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  denyUrls: ['localhost'],
  ignoreErrors: [
    // ignore hydration issues
    'Minified React error #418;',
    'Minified React error #423;',
    'Minified React error #425;',
  ],
  integrations: [
    new Replay({
      // Capture 10% of all sessions
      sessionSampleRate: 0.1,

      // Of the remaining 90% of sessions, if an error happens start capturing
      errorSampleRate: 1.0,
    }),
  ],
});
