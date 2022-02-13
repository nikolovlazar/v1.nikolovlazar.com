import { GetStaticProps } from 'next';
import { VStack, Heading, Text, List, ListItem } from '@chakra-ui/react';

import { readData } from '@/utils/read-data';
import { Video } from '@/types/video';
import VideoCard from '@/components/video-card';

type Props = {
  talks: Video[];
};

const TalksPage = ({ talks }: Props) => {
  return (
    <>
      <VStack as='section' alignItems='flex-start' w='full' spacing={3}>
        <Heading size='md'>Talks.</Heading>
        <Text>A list of my talks and guest appearances.</Text>
      </VStack>
      <List w='full' spacing={12}>
        {talks.map((talk) => (
          <ListItem key={talk.url} as='article'>
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
    talks,
  };

  return {
    props,
  };
};

export default TalksPage;
