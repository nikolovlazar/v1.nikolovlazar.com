import type { NextApiRequest, NextApiResponse } from 'next';

// ConvertKit subscription API
// NOT BEING USED IN THE APP!!
async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const existingSubscribers = await fetch(
    `https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CONVERTKIT_API_SECRET}`
  );
  const subscribers = (await existingSubscribers.json()).subscribers;

  if (subscribers.some((sub) => sub.email_address === email)) {
    return res
      .status(201)
      .json({ error: '', message: `You're already subscribed! 😊` });
  }

  const result = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, api_key: process.env.CONVERTKIT_API_KEY }),
    }
  );
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: data.error.email[0] });
  }

  return res.status(201).json({
    error: '',
    message:
      "A confirmation email was sent to your address. Please don't forget to confirm. Thank you for subscribing! 💜",
  });
};
