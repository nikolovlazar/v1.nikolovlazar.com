import { VStack, Heading, Text, Link, AspectRatio } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <VStack w='full' spacing={12}>
      <VStack>
        <Heading>Coming soon...</Heading>
        <Text>
          I&apos;m live streaming the development, so make sure to follow me on{' '}
          <Link
            color='purple.500'
            href='https://twitch.tv/nikolovlazar'
            target='_blank'
          >
            Twitch
          </Link>
          .
        </Text>
      </VStack>
      <AspectRatio w='full' ratio={16 / 9}>
        <iframe
          src='https://player.twitch.tv/?video=1168804058&parent=nikolovlazar.com'
          frameBorder='0'
          allowFullScreen
          scrolling='no'
          height='100%'
          width='100%'
        ></iframe>
      </AspectRatio>
    </VStack>
  );
};

export default NotFound;
