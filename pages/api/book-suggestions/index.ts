import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';
import { withSentry, init } from '@sentry/nextjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    denyUrls: ['localhost'],
  });

  if (req.method === 'POST') {
    const booksBase = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BOOKS_BASE_ID);

    const { title, author, reason } = req.body;

    try {
      await booksBase('Suggestions').create([
        {
          fields: {
            Title: title,
            Author: author,
            Reason: reason,
          },
        },
      ]);

      res.status(200).send({});
      return;
    } catch (e) {
      res.status(500).send({});
      return;
    }
  }

  res.status(405).send({});
};

export default withSentry(handler);
