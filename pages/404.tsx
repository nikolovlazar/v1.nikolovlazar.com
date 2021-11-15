/* eslint-disable react/no-unknown-property */
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
          src='https://player.twitch.tv/?video=1168804058&parent=www.example.com'
          // @ts-ignore
          frameborder='0'
          allowfullscreen='true'
          scrolling='no'
          height='100%'
          width='100%'
        ></iframe>
      </AspectRatio>
    </VStack>
  );
};

export default NotFound;
