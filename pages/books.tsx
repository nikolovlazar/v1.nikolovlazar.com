import { GetStaticProps } from 'next';
import { Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import Airtable from 'airtable';

import { Book as BookType } from '@/types/book';
import Book from '@/components/book';
import Suggest from '@/components/book/suggest';

type Props = {
  books: BookType[];
};

const Books = ({ books }: Props) => {
  return (
    <>
      <VStack spacing={3} alignItems='flex-start' w='full' as='section'>
        <Heading size='md'>Books.</Heading>
        <Text>
          A collection of interesting books that I read or look forward to
          reading them.
        </Text>
        <Suggest />
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3} as='section'>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </>
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
      books,
    },
    revalidate: 60 * 60,
  };
};

export default Books;
