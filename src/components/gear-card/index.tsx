import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Image,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

import { Gear } from '@/types/gear';

const GearCard = ({ image, title, description, url }: Gear) => {
  return (
    <LinkBox as='article' role='group'>
      <Stack
        alignItems='center'
        justifyContent={{ base: 'center', md: 'flex-start' }}
        direction={{ base: 'column', md: 'row' }}
        w='full'
        p={3}
        spacing={6}
      >
        <Image
          alt={title}
          src={image}
          width={144}
          height={144}
          objectFit='contain'
        />
        <VStack alignItems='flex-start' flex={1} w='full' spacing={4}>
          <LinkOverlay href={url} isExternal>
            <Heading size='md'>{title}</Heading>
          </LinkOverlay>
          <Text color='gray.500' fontSize='md'>
            {description}
          </Text>
        </VStack>
        <HStack
          justifyContent='flex-start'
          w={12}
          hidden={useBreakpointValue({ base: true, md: false })}
        >
          <Icon
            as={FiArrowUpRight}
            boxSize={6}
            color='purple.500'
            opacity={0}
            _groupHover={{ ml: 6, opacity: 1 }}
            transitionDuration='slow'
            transitionProperty='all'
            transitionTimingFunction='ease-out'
          />
        </HStack>
      </Stack>
    </LinkBox>
  );
};

export default GearCard;
