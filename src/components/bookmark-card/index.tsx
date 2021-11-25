import {
  VStack,
  Heading,
  LinkBox,
  LinkOverlay,
  AspectRatio,
  Image,
  useColorModeValue,
  Tooltip,
  Text,
  Skeleton,
} from '@chakra-ui/react';

import { Bookmark } from '@/types/bookmark';

const BookmarkCard = ({ cover, title, link, tags }: Partial<Bookmark>) => {
  return (
    <LinkBox as='article'>
      <Tooltip label={title}>
        <VStack
          spacing={0}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          alignItems='center'
          rounded='md'
          bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
          overflow='hidden'
          transitionProperty='transform'
          transitionDuration='slow'
          transitionTimingFunction='ease-out'
          _hover={{ transform: 'scale(1.05, 1.05)' }}
        >
          <AspectRatio ratio={16 / 9} w='full'>
            <Image
              alt={`Thumbnail of ${title}`}
              src={cover}
              layout='fill'
              fallback={<Skeleton w='full' h='full' />}
            />
          </AspectRatio>
          <VStack p={3} spacing={1} alignItems='flex-start' flex={1} w='full'>
            <LinkOverlay href={link} isExternal w='full'>
              <Heading isTruncated size='xs'>
                {title}
              </Heading>
            </LinkOverlay>
            <Text fontSize='xs' color='gray.500' textTransform='capitalize'>
              {tags.join(', ')}
            </Text>
          </VStack>
        </VStack>
      </Tooltip>
    </LinkBox>
  );
};

export default BookmarkCard;
