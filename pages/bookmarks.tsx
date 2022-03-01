import { useState } from "react";
import { GetStaticProps } from "next";
import {
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

import { Bookmark } from "@/types/bookmark";
import BookmarkCard from "@/components/bookmark-card";
import { fetchBookmarks } from "@/utils/bookmarks";

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
    <VStack w="full" spacing={8}>
      <VStack as="section" alignItems="flex-start" w="full" spacing={3}>
        <Heading size="md">Bookmarks.</Heading>
        <Text>
          A collection of interesting tools / frameworks / websites I stumble
          upon on the internet.
        </Text>
      </VStack>
      <HStack as="section" flexWrap="wrap" gridRowGap={2} w="full" spacing={3}>
        <Button
          textTransform="uppercase"
          colorScheme="purple"
          onClick={() => filterBookmarks()}
          size="xs"
          variant={!selectedTag ? "solid" : "ghost"}
        >
          All
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            textTransform="uppercase"
            colorScheme="purple"
            onClick={() => filterBookmarks(tag)}
            size="xs"
            variant={selectedTag === tag ? "solid" : "ghost"}
          >
            {tag}
          </Button>
        ))}
      </HStack>
      <SimpleGrid
        as="section"
        alignItems="stretch"
        gap={12}
        w="full"
        columns={{ base: 1, sm: 2, md: 3 }}
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
  const bookmarks = await fetchBookmarks();

  const tags = Array.from(new Set(bookmarks.flatMap(({ tags }) => tags)));

  const props: Props = { bookmarks, tags };

  return {
    props,
    revalidate: 60 * 60,
  };
};

export default Bookmarks;
