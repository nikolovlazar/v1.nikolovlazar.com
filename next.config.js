const OLD_BLOG_URL = 'https://hn.nikolovlazar.com';
const oldBlogPosts = [
  '/portfolio-beef-1-free-designs-for-beginner-front-end-developers',
  '/my-2020-retrospective',
  '/living-with-a-migraine-as-a-software-developer',
  '/an-easy-react-17-typescript-tailwind-css-nextjs-setup',
  '/debugging-nextjs',
  '/improve-your-design-handoff',
  '/uxcel-ux-ui-for-developers-and-designers',
  '/how-to-render-your-website',
];

module.exports = {
  swcMinify: true,
  images: {
    domains: [
      'img.youtube.com',
      'dl.airtable.com',
      'hn.nikolovlazar.com',
      'opengraph.githubassets.com',
    ],
  },
  async redirects() {
    return oldBlogPosts.map((post) => ({
      source: post,
      destination: `${OLD_BLOG_URL}${post}`,
      permanent: true,
    }));
  },
};
