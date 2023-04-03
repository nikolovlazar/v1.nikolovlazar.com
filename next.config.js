const { withSentryConfig } = require('@sentry/nextjs');

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

const moduleExports = {
  swcMinify: true,
  hideSourceMaps: true,
  images: {
    domains: [
      'img.youtube.com',
      'dl.airtable.com',
      'v5.airtableusercontent.com',
      'hn.nikolovlazar.com',
      'opengraph.githubassets.com',
    ],
  },
  async redirects() {
    return [
      ...oldBlogPosts.map((post) => ({
        source: post,
        destination: `${OLD_BLOG_URL}${post}`,
        permanent: true,
      })),
      {
        source: '/zagjs-demo',
        destination:
          'https://codesandbox.io/s/react-slider-example-vn855h?file=/src/slider.tsx',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/qCPwSQdtPu',
        permanent: true,
      },
      {
        source: '/twitch',
        destination: 'https://twitch.tv/nikolovlazar',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/NikolovLazar',
        permanent: true,
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  token: process.env.SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
