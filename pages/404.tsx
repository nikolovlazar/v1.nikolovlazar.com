import { VStack, Heading, Text, Link } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <VStack>
      <Heading>Coming soon...</Heading>
      <Text>
        If you want to keep up with the development, make sure to follow me on{' '}
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
  );
};

export default NotFound;
