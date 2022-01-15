import { useState } from 'react';
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
import { fetchBookmarks } from '@/utils/bookmarks';

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
      <VStack spacing={3} alignItems='flex-start' w='full' as='section'>
        <Heading size='md'>Bookmarks.</Heading>
        <Text>
          A collection of interesting tools / frameworks / websites I stumble
          upon on the internet.
        </Text>
      </VStack>
      <HStack w='full' spacing={3} as='section' flexWrap='wrap' gridRowGap={2}>
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
        as='section'
      >
        {displayBookmarks.map(({ cover, link, title, tags }) => (
          <BookmarkCard
            key={link}
            title={title}
            cover={cover}
            link={link}
            tags={tags}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const bookmarks: Bookmark[] = await fetchBookmarks();

  const tags = Array.from(new Set(bookmarks.flatMap(({ tags }) => tags)));

  const props: Props = { bookmarks, tags };

  return {
    props,
    revalidate: 60 * 60,
  };
};

export default Bookmarks;
