import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry, init } from '@sentry/nextjs';

import db from '@/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    denyUrls: ['localhost'],
  });

  try {
    const slug = req.query.slug.toString();

    if (req.method === 'GET') {
      const postMeta = await db.postMeta.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json({ views: postMeta?.views ?? 0 });
    }

    if (req.method === 'POST') {
      const postMeta = await db.postMeta.upsert({
        create: {
          slug,
          likes: 0,
          views: 1,
        },
        update: {
          views: {
            increment: 1,
          },
        },
        where: {
          slug,
        },
      });

      return res.status(200).json({ views: postMeta?.views ?? 0 });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default withSentry(handler);
