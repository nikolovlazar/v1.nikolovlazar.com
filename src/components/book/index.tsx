import {
  HStack,
  Heading,
  Text,
  Box,
  VStack,
  LinkOverlay,
  LinkBox,
  useColorModeValue as mode,
  Image,
} from '@chakra-ui/react';

import { Book as BookType } from '@/types/book';
import Tag from './tag';

type Props = {
  book: BookType;
};

const Book = ({ book: { cover, title, author, state, link } }: Props) => {
  return (
    <LinkBox as='article'>
      <HStack
        p={4}
        bg={mode('gray.50', 'gray.700')}
        _hover={{ transform: 'scale(1.05, 1.05)' }}
        rounded='md'
        spacing={6}
        transitionDuration='slow'
        transitionProperty='transform'
        transitionTimingFunction='ease-out'
      >
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
          alignItems='flex-start'
          justifyContent='center'
          h='full'
          spacing={2}
        >
          <LinkOverlay href={link} isExternal>
            <Heading size='xs'>{title}</Heading>
          </LinkOverlay>
          <Text color={mode('gray.600', 'gray.400')} fontSize='xs'>
            {author}
          </Text>
        </VStack>
      </HStack>
    </LinkBox>
  );
};

export default Book;
