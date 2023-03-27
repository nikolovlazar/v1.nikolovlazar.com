import { useState, useEffect } from 'react';
import {
  VStack,
  AspectRatio,
  Spinner,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Flex,
  Icon,
  Image,
} from '@chakra-ui/react';

import { Video } from '@/types/video';
import { HiPlay } from 'react-icons/hi';
import Link from '../link';

type Props = Video;

const VideoCard = ({ title, description, url }: Props) => {
  const [videoId, setVideoId] = useState<string>();

  useEffect(() => {
    const queryParams = url.split('?')[1];
    const params = new URLSearchParams(queryParams);
    setVideoId(params.get('v'));
  }, [url]);

  if (!videoId) return <Spinner />;
  return (
    <LinkBox zIndex='dropdown'>
      <VStack alignItems='flex-start' spacing={4}>
        <AspectRatio
          position='relative'
          overflow='hidden'
          w='full'
          ratio={16 / 9}
          role='group'
          rounded='lg'
        >
          <>
            <LinkOverlay href={url} target='_blank'>
              <Flex
                position='absolute'
                zIndex='docked'
                align='center'
                justify='center'
                bg='transparent'
                _groupHover={{ bg: 'blackAlpha.500' }}
                inset={0}
                transitionDuration='slow'
                transitionProperty='background'
                transitionTimingFunction='ease-out'
              >
                <Icon
                  as={HiPlay}
                  w={{ base: 12, md: 8 }}
                  h={{ base: 12, md: 8 }}
                  color='white'
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transitionDuration='slow'
                  transitionProperty='opacity'
                  transitionTimingFunction='ease-out'
                />
              </Flex>
            </LinkOverlay>
            <Image
              alt={`Thumbnail of ${title}`}
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              fallbackSrc={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              width={360}
              height={202}
              objectFit='cover'
            />
          </>
        </AspectRatio>
        <VStack alignItems='flex-start' spacing={2}>
          <Link href={url} isExternal>
            <Heading size='md'>{title}</Heading>
          </Link>
          <Text color='gray.500' fontSize='sm'>
            {description}
          </Text>
        </VStack>
      </VStack>
    </LinkBox>
  );
};

export default VideoCard;
