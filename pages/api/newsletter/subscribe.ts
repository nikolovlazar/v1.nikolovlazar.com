import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry, init } from '@sentry/nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    denyUrls: ['localhost'],
  });

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const existingSubscribers = await fetch(
    'https://www.getrevue.co/api/v2/subscribers',
    {
      method: 'GET',
      headers: {
        Authorization: `Token ${process.env.REVUE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );
  const subscribers = await existingSubscribers.json();

  if (subscribers.some((sub) => sub.email === email)) {
    return res
      .status(201)
      .json({ error: '', message: `You're already subscribed! 😊` });
  }

  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: data.error.email[0] });
  }

  return res
    .status(201)
    .json({ error: '', message: 'Thank you for subscribing! 💜' });
};

export default withSentry(handler);
