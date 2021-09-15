import { useState, useEffect } from 'react';
import {
  VStack,
  AspectRatio,
  Spinner,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';

import { Video } from '@/types/video';
import Image from '../image';

type Props = Video;

const VideoCard = ({ title, description, url }: Props) => {
  const [videoId, setVideoId] = useState<string>();

  useEffect(() => {
    const queryParams = url.split('?')[1];
    const params = new URLSearchParams(queryParams);
    setVideoId(params.get('v'));
  }, []);

  if (!videoId) return <Spinner />;
  return (
    <LinkBox>
      <VStack spacing={4} alignItems='flex-start'>
        <AspectRatio ratio={16 / 9} w='full'>
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            fallbackSrc={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            layout='fill'
            rounded='lg'
          />
        </AspectRatio>
        <VStack spacing={2} alignItems='flex-start'>
          <LinkOverlay href={url} target='_blank'>
            <Heading size='sm'>{title}</Heading>
          </LinkOverlay>
          <Text fontSize='sm' color='gray.500'>
            {description}
          </Text>
        </VStack>
      </VStack>
    </LinkBox>
  );
};

export default VideoCard;
