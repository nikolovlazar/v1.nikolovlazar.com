import { GetStaticProps } from 'next';
import {
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';

import { Bookmark } from '@/types/bookmark';
import BookmarkCard from '@/components/bookmark-card';
import { useState } from 'react';

type Props = {
  bookmarks: Bookmark[];
  tags: string[];
};

const Bookmarks = ({ bookmarks, tags }: Props) => {
  const [displayBookmarks, setDisplayBookmarks] = useState(bookmarks);
  const [selectedTag, setSelectedTag] = useState<string>();
  const filterBookmarks = (tag?: string) => {
    if (tag) {
      setDisplayBookmarks(bookmarks.filter(({ tags }) => tags.includes(tag)));
    } else {
      setDisplayBookmarks(bookmarks);
    }
    setSelectedTag(tag);
  };

  return (
    <VStack spacing={8} w='full'>
      <VStack spacing={3} alignItems='flex-start' w='full'>
        <Heading size='md'>Bookmarks.</Heading>
        <Text>
          A collection of interesting tools / frameworks / websites I stumble
          upon on the internet.
        </Text>
      </VStack>
      <HStack w='full' spacing={3}>
        <Button
          textTransform='uppercase'
          onClick={() => filterBookmarks()}
          size='xs'
          colorScheme='purple'
          variant={!selectedTag ? 'solid' : 'ghost'}
        >
          All
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            textTransform='uppercase'
            onClick={() => filterBookmarks(tag)}
            size='xs'
            colorScheme='purple'
            variant={selectedTag === tag ? 'solid' : 'ghost'}
          >
            {tag}
          </Button>
        ))}
      </HStack>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        gap={12}
        alignItems='stretch'
        w='full'
      >
        {displayBookmarks.map(({ cover, link, title }) => (
          <BookmarkCard key={link} title={title} cover={cover} link={link} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const req = await fetch(
    `https://api.raindrop.io/rest/v1/raindrops/${process.env.RAINDROP_COLLECTION}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_TOKEN}`,
      },
    }
  );

  const data = await req.json();

  const bookmarks: Bookmark[] = data.items.map(
    ({ cover, title, link, tags }) => ({
      link,
      title,
      cover,
      tags,
    })
  );

  const tags = Array.from(new Set(bookmarks.flatMap(({ tags }) => tags)));

  const props: Props = { bookmarks, tags };

  return {
    props,
  };
};

export default Bookmarks;
