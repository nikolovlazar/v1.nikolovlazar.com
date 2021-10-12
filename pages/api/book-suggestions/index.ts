import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
