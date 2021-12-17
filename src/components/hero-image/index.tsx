import { Box, AspectRatio, Text, HStack, Flex } from '@chakra-ui/react';

import status from '@/data/status';

const HeroImage = () => {
  return (
    <Flex
      position='relative'
      pb={0}
      justifyContent='flex-end'
      sx={{
        '@media(hover: none)': {
          justifyContent: 'center',
          pb: 2,
        },
      }}
    >
      <AspectRatio flexShrink={0} ratio={1} w={56} h={56} as='figure'>
        <Box rounded='full' overflow='hidden'>
          <video autoPlay loop muted playsInline>
            <source
              src='/assets/videos/lazar-croissant.webm'
              type='video/webm'
            />
            <source src='/assets/videos/lazar-croissant.mp4' type='video/mp4' />
          </video>
        </Box>
      </AspectRatio>
      <HStack
        sx={{
          '@media(hover: none)': {
            width: 'full',
            maxWidth: 40,
          },
        }}
        position='absolute'
        bottom={0}
        overflow='hidden'
        borderWidth={1}
        borderColor='gray.300'
        borderStyle='solid'
        height={10}
        width={10}
        maxWidth={10}
        alignItems='center'
        justifyContent='center'
        bg='white'
        rounded='3xl'
        px={2}
        role='group'
        transitionProperty='all'
        transitionDuration='slow'
        transitionTimingFunction='ease-out'
        _hover={{
          width: 'full',
          maxWidth: 40,
        }}
      >
        <Text>{status.emoji}</Text>
        <Text
          isTruncated
          overflow='none'
          display='none'
          opacity={0}
          height={6}
          transitionProperty='opacity'
          transitionDuration='slow'
          transitionTimingFunction='ease-out'
          _groupHover={{
            opacity: 1,
            display: 'inline',
          }}
          sx={{
            '@media(hover: none)': {
              opacity: 1,
              display: 'inline',
            },
          }}
        >
          {status.text}
        </Text>
      </HStack>
    </Flex>
  );
};

export default HeroImage;
