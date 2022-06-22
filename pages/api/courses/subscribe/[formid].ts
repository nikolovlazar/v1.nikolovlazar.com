import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry, init } from '@sentry/nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    denyUrls: ['localhost'],
  });

  const { email } = req.body;
  const formId = req.query.formid as string;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const existingSubscribers = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscriptions?api_secret=${process.env.CONVERTKIT_API_SECRET}`,
    {
      method: 'GET',
    },
  );
  const subscribers = await existingSubscribers.json();

  if (
    subscribers.subscriptions.some(
      (sub) => sub.subscriber.email_address === email,
    )
  ) {
    return res
      .status(201)
      .json({ error: '', message: `You're already subscribed! 😊` });
  }

  const result = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, api_key: process.env.CONVERTKIT_API_KEY }),
    },
  );

  if (!result.ok) {
    return res.status(500).json({
      error: `Uh oh! Something happened and I couldn't subscribe you...`,
    });
  }

  return res
    .status(201)
    .json({ error: '', message: 'Thank you for subscribing! 💜' });
};

export default withSentry(handler);
