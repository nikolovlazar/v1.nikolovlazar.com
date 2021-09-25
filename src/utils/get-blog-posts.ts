import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { BlogPost } from '@/types/blog-post';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const result: BlogPost[] = [];
  const dir = path.join(process.cwd(), './blog-posts');
  const blogPosts = await fs.readdir(dir);

  await Promise.all(
    blogPosts.map(async (post) => {
      const postPath = path.join(dir, post);
      const slug = post.replace('.mdx', '');

      const fileContent = await fs.readFile(postPath, 'utf8');

      const {
        data: { title, description, date },
      } = matter(fileContent);

      result.push({
        title,
        description,
        date,
        slug,
      });
    })
  );

  return result;
};
