import type { NextApiRequest, NextApiResponse } from 'next';

// ConvertKit subscription API
// NOT BEING USED IN THE APP!!
async (_: NextApiRequest, res: NextApiResponse) => {
  const result = await fetch(
    `https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CONVERTKIT_API_SECRET}`
  );
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: 'Error retrieving subscribers' });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({ count: data.total_subscribers });
};
