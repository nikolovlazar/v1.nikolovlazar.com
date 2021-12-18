import { promises as fs } from 'fs';
import path from 'path';

export const readBlogPost = async (slug: string) => {
  const postPath = path.join(process.cwd(), './blog-posts', slug, 'index.mdx');

  return await fs.readFile(postPath, 'utf8');
};
