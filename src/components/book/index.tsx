import {
  HStack,
  Heading,
  Text,
  Box,
  VStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import Image from '@/components/image';
import { Book as BookType } from '@/types/book';
import Tag from './tag';

type Props = {
  book: BookType;
};

const Book = ({ book: { cover, title, author, state } }: Props) => {
  return (
    <HStack rounded='md' p={4} spacing={6} bg={mode('gray.50', 'gray.700')}>
      <Box position='relative' flexShrink={0}>
        <Image
          src={cover}
          alt={`${title} cover`}
          height={83}
          width={55}
          objectFit='cover'
          rounded='base'
        />
        <Tag state={state} top={-2.5} right={-2.5} position='absolute' />
      </Box>
      <VStack
        spacing={2}
        height='full'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Heading size='xs'>{title}</Heading>
        <Text fontSize='xs' color={mode('gray.600', 'gray.400')}>
          {author}
        </Text>
      </VStack>
    </HStack>
  );
};

export default Book;
