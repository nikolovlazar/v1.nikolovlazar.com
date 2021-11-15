import { VStack, Heading, Text, Link, AspectRatio } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <VStack spacing={12} w='full'>
      <VStack>
        <Heading>Coming soon...</Heading>
        <Text>
          I&apos;m live streaming the development, so make sure to follow me on{' '}
          <Link
            href='https://twitch.tv/nikolovlazar'
            color='purple.500'
            target='_blank'
          >
            Twitch
          </Link>
          .
        </Text>
      </VStack>
      <AspectRatio ratio={16 / 9} w='full'>
        <iframe
          src='https://player.twitch.tv/?video=v1168804058&parent=nikolovlazar.com&autoplay=false'
          height='100%'
          width='100%'
          allowfullscreen='true'
        ></iframe>
      </AspectRatio>
    </VStack>
  );
};

export default NotFound;
