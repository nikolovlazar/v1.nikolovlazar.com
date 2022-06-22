import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry, init } from '@sentry/nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    denyUrls: ['localhost'],
  });

  const formId = req.query.formid as string;
  const result = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscriptions?api_secret=${process.env.CONVERTKIT_API_SECRET}`,
    {
      method: 'GET',
    },
  );
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: 'Error retrieving subscribers' });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );

  return res.status(200).json({ count: data.subscriptions.length });
};

export default withSentry(handler);
