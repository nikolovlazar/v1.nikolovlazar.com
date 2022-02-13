import { VStack, Heading, Text, Box } from '@chakra-ui/react';

const NotFound = () => {
  const videoVersion = Math.floor(Math.random() * 3 + 1);
  return (
    <VStack w='full' spacing={12}>
      <VStack spacing={4}>
        <Box overflow='hidden' rounded='lg'>
          <video autoPlay loop muted playsInline>
            <source
              src={`/assets/videos/404-${videoVersion}.webm`}
              type='video/webm'
            />
            <source
              src={`/assets/videos/404-${videoVersion}.mp4`}
              type='video/mp4'
            />
          </video>
        </Box>
        <Heading>Say what? 🤨</Heading>
        <Text>I&apos;m afraid this page doesn&apos;t exist.</Text>
      </VStack>
    </VStack>
  );
};

export default NotFound;
