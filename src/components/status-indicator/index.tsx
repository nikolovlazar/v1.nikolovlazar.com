import { HStack, Text, useColorModeValue as mode } from '@chakra-ui/react';

import status from '@/data/status';

const StatusIndicator = () => {
  return (
    <HStack
      sx={{
        '@media(hover: none)': {
          width: 'full',
          maxWidth: 40,
        },
      }}
      _hover={{
        width: 'full',
        maxWidth: 40,
        shadow: 'lg',
      }}
      position='absolute'
      bottom={0}
      overflow='hidden'
      borderWidth={1}
      borderColor={mode('gray.300', 'gray.600')}
      borderStyle='solid'
      height={10}
      width={10}
      maxWidth={10}
      alignItems='center'
      justifyContent='center'
      bg={mode('white', 'gray.800')}
      rounded='3xl'
      px={2}
      role='group'
      transitionProperty='all'
      transitionDuration='slow'
      transitionTimingFunction='ease-out'
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
  );
};

export default StatusIndicator;
