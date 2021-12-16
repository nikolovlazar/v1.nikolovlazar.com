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
} from '@chakra-ui/react';

import { Video } from '@/types/video';
import Image from '../image';
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
      <VStack spacing={4} alignItems='flex-start'>
        <AspectRatio
          ratio={16 / 9}
          w='full'
          role='group'
          position='relative'
          rounded='lg'
          overflow='hidden'
        >
          <>
            <LinkOverlay href={url} target='_blank'>
              <Flex
                position='absolute'
                _groupHover={{ bg: 'blackAlpha.500' }}
                transitionProperty='background'
                transitionDuration='slow'
                transitionTimingFunction='ease-out'
                alignItems='center'
                justifyContent='center'
                bg='transparent'
                inset={0}
                zIndex='docked'
              >
                <Icon
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transitionProperty='opacity'
                  transitionDuration='slow'
                  transitionTimingFunction='ease-out'
                  color='white'
                  as={HiPlay}
                  w={{ base: 12, md: 8 }}
                  h={{ base: 12, md: 8 }}
                />
              </Flex>
            </LinkOverlay>
            <Image
              alt={`Thumbnail of ${title}`}
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              fallbackSrc={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              layout='fill'
              objectFit='cover'
            />
          </>
        </AspectRatio>
        <VStack spacing={2} alignItems='flex-start'>
          <Link href={url} isExternal>
            <Heading size='sm'>{title}</Heading>
          </Link>
          <Text fontSize='sm' color='gray.500'>
            {description}
          </Text>
        </VStack>
      </VStack>
    </LinkBox>
  );
};

export default VideoCard;
