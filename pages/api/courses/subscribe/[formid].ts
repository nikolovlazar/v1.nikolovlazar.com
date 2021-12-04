import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;
  const formId = req.query.formid as string;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const existingSubscribers = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscriptions?api_secret=${process.env.CONVERTKIT_API_SECRET}`, {
    method: 'GET',
  });
  const subscribers = await existingSubscribers.json();

  if (subscribers.subscriptions.some((sub) => sub.subscriber.email_address === email)) {
    return res
      .status(201)
      .json({ error: '', message: `You're already subscribed! 😊` });
  }

  const result = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, 'api_key': process.env.CONVERTKIT_API_KEY }),
  });
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: data.error.email[0] });
  }

  return res
    .status(201)
    .json({ error: '', message: 'Thank you for subscribing! 💜' });
}
