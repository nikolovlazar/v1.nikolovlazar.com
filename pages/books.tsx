import { GetStaticProps } from 'next';
import { Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import Airtable from 'airtable';

import { Book as BookType } from '@/types/book';
import Book from '@/components/book';
import Suggest from '@/components/book/suggest';

type Props = {
  reading: BookType[];
  favorites: BookType[];
  completed: BookType[];
  wishing: BookType[];
};

const Books = ({ reading, favorites, completed, wishing }: Props) => {
  return (
    <VStack alignItems='flex-start' spacing={8}>
      <VStack spacing={3} alignItems='flex-start' w='full' as='section'>
        <Heading size='md'>Books.</Heading>
        <Text>
          A collection of interesting books that I read or look forward to
          reading them.
        </Text>
        <Suggest />
      </VStack>

      <VStack spacing={4} alignItems='flex-start'>
        <Heading size='sm'>Currently reading</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} as='section'>
          {reading.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </SimpleGrid>
      </VStack>

      <VStack spacing={4} alignItems='flex-start'>
        <Heading size='sm'>Favorites</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} as='section'>
          {favorites.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </SimpleGrid>
      </VStack>

      <VStack spacing={4} alignItems='flex-start'>
        <Heading size='sm'>Wishlist</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} as='section'>
          {wishing.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </SimpleGrid>
      </VStack>

      <VStack spacing={4} alignItems='flex-start'>
        <Heading size='sm'>Read</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} as='section'>
          {completed.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const booksBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BOOKS_BASE_ID
  );

  const books = (
    await booksBase('Books')
      .select({
        view: 'Grid view',
      })
      .all()
  ).map(
    ({ fields, id }) =>
      ({
        id,
        title: fields['Title'],
        author: fields['Author'],
        state: fields['State'],
        cover: fields['Cover'][0]['thumbnails']['large']['url'],
        link: fields['Link'] ?? null,
      } as BookType)
  );

  return {
    props: {
      reading: books.filter(({ state }) => state === 'Reading'),
      completed: books.filter(({ state }) => state === 'Completed'),
      favorites: books.filter(({ state }) => state === 'Favorite'),
      wishing: books.filter(({ state }) => state === 'Wish'),
    },
    revalidate: 60 * 60,
  };
};

export default Books;
