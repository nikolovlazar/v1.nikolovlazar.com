import { promises as fs } from 'fs';
import path from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';

import { BlogPost } from '@/types/blog-post';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const result: BlogPost[] = [];
  const dir = path.join(process.cwd(), './blog-posts');
  const blogPosts = await fs.readdir(dir);

  await Promise.all(
    blogPosts.map(async (post) => {
      const postPath = path.join(dir, post, 'index.mdx');
      const slug = post.replace('.mdx', '');

      const fileContent = await fs.readFile(postPath, 'utf8');

      const {
        content,
        data: { title, description, date },
      } = matter(fileContent);

      result.push({
        title,
        description,
        date,
        slug,
        readingTime: readingTime(content).text,
      });
    })
  );

  return result.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
};

export const getRecentBlogPosts = async (count: number): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();

  const recentPosts = posts
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, count);

  return recentPosts;
}