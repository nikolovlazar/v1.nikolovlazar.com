import db from '@/db';
import { createHash } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug.toString();
    const ipAddress =
      req.headers['x-forwarded-for'] ||
      // Fallback for localhost or non Vercel deployments
      '0.0.0.0';

    const currentUserId =
      // Since a users IP address is part of the sessionId in our database, we
      // hash it to protect their privacy. By combining it with a salt, we get
      // a unique id we can refer to, but we won't know what their ip
      // address was.
      createHash('md5')
        .update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
        .digest('hex');

    // Identify a specific users interactions with a specific post
    const sessionId = slug + '___' + currentUserId;

    if (req.method === 'GET') {
      const [post, user] = await Promise.all([
        db.postMeta.findUnique({
          where: {
            slug,
          },
        }),

        db.likesByUser.findUnique({
          where: {
            id: sessionId,
          },
        }),
      ]);

      return res.status(200).json({
        likes: post?.likes ?? 0,
        userLikes: user?.likes ?? 0,
      });
    }

    if (req.method === 'POST') {
      const [post, user] = await Promise.all([
        db.postMeta.update({
          data: {
            likes: {
              increment: 1,
            },
          },
          where: {
            slug,
          },
        }),

        db.likesByUser.upsert({
          where: { id: sessionId },
          create: {
            id: sessionId,
            likes: 1,
          },
          update: {
            likes: {
              increment: 1,
            },
          },
        }),
      ]);

      return res.status(200).json({
        likes: post?.likes ?? 0,
        userLikes: user?.likes ?? 0,
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
