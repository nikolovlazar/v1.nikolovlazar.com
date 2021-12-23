import {
  HStack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import status from '@/data/status';

const StatusIndicator = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  let stackStyles: StackProps;

  if (isMobile) {
    stackStyles = {
      width: 'fit-content',
      shadow: 'lg',
      spacing: 3,
    };
  } else {
    stackStyles = {
      width: 10,
      shadow: 'none',
      spacing: 0,
    };
  }

  return (
    <HStack
      _hover={{
        width: 'fit-content',
        shadow: 'lg',
      }}
      position='absolute'
      overflow='hidden'
      bottom={0}
      marginLeft='auto'
      borderWidth={1}
      borderColor={mode('gray.300', 'gray.600')}
      borderStyle='solid'
      height={10}
      alignItems='center'
      justifyContent='center'
      bg={mode('white', 'gray.800')}
      rounded='3xl'
      px={2}
      role='group'
      transitionProperty='all'
      transitionDuration='slow'
      transitionTimingFunction='ease-out'
      {...stackStyles}
    >
      <Text>{status.emoji}</Text>
      <Text
        isTruncated
        width={0}
        maxWidth='full'
        opacity={0}
        transitionProperty='opacity'
        transitionDuration='slow'
        transitionTimingFunction='ease-out'
        _groupHover={{
          opacity: 1,
          width: 'fit-content',
          marginLeft: 3,
        }}
        sx={{
          '@media(hover: none)': {
            opacity: 1,
            width: 'fit-content',
            marginLeft: 3,
          },
        }}
      >
        {status.text}
      </Text>
    </HStack>
  );
};

export default StatusIndicator;
