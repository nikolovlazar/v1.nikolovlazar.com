import { IconType } from 'react-icons/lib';
import {
  SiTwitter,
  SiGithub,
  SiYoutube,
  SiPolywork,
  SiTwitch,
} from 'react-icons/si';
import { IoMoon } from 'react-icons/io5';

import {
  GITHUB_PROFILE,
  PLAUSIBLE_LINK,
  POLYWORK_PROFILE,
  TWITCH_CHANNEL,
  TWITTER_PROFILE,
  YOUTUBE_CHANNEL,
} from 'src/constants';

type BaseItem = {
  title: string;
};

export type PageItem = BaseItem & {
  href: string;
};

export type SocialItem = BaseItem & {
  href: string;
  icon: IconType;
};

export type ThemeItem = BaseItem & {
  id: 'theme';
  icon: IconType;
};

export type SearchItemsType = {
  pages: PageItem[];
  social: SocialItem[];
  theme: ThemeItem[];
};

export const searchItems: SearchItemsType = {
  pages: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Colophon',
      href: '/colophon',
    },
    {
      title: 'Talks',
      href: '/talks',
    },
    {
      title: 'Analytics',
      href: PLAUSIBLE_LINK,
    },
    {
      title: 'Uses',
      href: '/uses',
    },
    {
      title: 'Gear',
      href: '/gear',
    },
    {
      title: 'Bookmarks',
      href: '/bookmarks',
    },
    {
      title: 'Books',
      href: '/books',
    },
    {
      title: 'Newsletter',
      href: '/newsletter',
    },
  ],
  social: [
    {
      title: 'Twitter',
      icon: SiTwitter,
      href: TWITTER_PROFILE,
    },
    {
      title: 'GitHub',
      icon: SiGithub,
      href: GITHUB_PROFILE,
    },
    {
      title: 'YouTube',
      icon: SiYoutube,
      href: YOUTUBE_CHANNEL,
    },
    {
      title: 'Polywork',
      icon: SiPolywork,
      href: POLYWORK_PROFILE,
    },
    {
      title: 'Twitch',
      icon: SiTwitch,
      href: TWITCH_CHANNEL,
    },
  ],
  theme: [
    {
      id: 'theme',
      title: 'Change theme',
      icon: IoMoon,
    },
  ],
};
