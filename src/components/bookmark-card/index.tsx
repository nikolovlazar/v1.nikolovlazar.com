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
    <LinkBox as="article">
      <Tooltip label={title}>
        <VStack
          alignItems="center"
          justifyContent={{ base: 'center', md: 'flex-start' }}
          overflow="hidden"
          bg="gray.50"
          _hover={{ transform: 'scale(1.05, 1.05)' }}
          _dark={{
            bg: 'whiteAlpha.100',
          }}
          rounded="md"
          spacing={0}
          transitionDuration="slow"
          transitionProperty="transform"
          transitionTimingFunction="ease-out"
        >
          <AspectRatio w="full" ratio={16 / 9}>
            <Image
              alt={`Thumbnail of ${title}`}
              fallback={<Skeleton w="full" h="full" />}
              src={cover}
            />
          </AspectRatio>
          <VStack alignItems="flex-start" flex={1} w="full" p={3} spacing={1}>
            <LinkOverlay w="full" href={link} isExternal>
              <Heading noOfLines={1} size="xs">
                {title}
              </Heading>
            </LinkOverlay>
            <Text color="gray.500" fontSize="xs" textTransform="capitalize">
              {tags.join(', ')}
            </Text>
          </VStack>
        </VStack>
      </Tooltip>
    </LinkBox>
  );
};

export default BookmarkCard;
