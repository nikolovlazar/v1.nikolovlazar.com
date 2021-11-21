import { GetStaticProps } from 'next';
import {
  VStack,
  Heading,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

import { readData } from '@/utils/read-data';
import { Video } from '@/types/video';
import VideoCard from '@/components/video-card';

type Props = {
  talks: Video[];
};

const TalksPage = ({ talks }: Props) => {
  return (
    <>
      <VStack spacing={3} alignItems='flex-start' w='full'>
        <Heading size='md'>Talks.</Heading>
        <Text>
          A list of my talks and guest appearances.
        </Text>
      </VStack>
      <List spacing={12} w='full'>
        {talks.map((talk) => (
          <ListItem key={talk.url}>
            <VideoCard {...talk} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { talks } = await readData<{ talks: Video[] }>('data/talks.json');

  const props: Props = {
    talks
  };

  return {
    props,
  };
};

export default TalksPage;
