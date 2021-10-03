import db from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug.toString();

    if (req.method === 'GET') {
      const postMeta = await db.postMeta.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json({ likes: postMeta?.likes ?? 0 });
    }

    if (req.method === 'POST') {
      const { numberOfLikes } = req.body;
      const postMeta = await db.postMeta.update({
        data: {
          likes: {
            increment: numberOfLikes,
          },
        },
        where: {
          slug,
        },
      });

      return res.status(200).json({ likes: postMeta?.likes ?? 0 });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
