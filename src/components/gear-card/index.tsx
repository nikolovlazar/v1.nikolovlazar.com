import {
  Stack,
  HStack,
  VStack,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  AspectRatio,
  Icon,
  useBreakpointValue,
  SkeletonCircle,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

import { Gear } from '@/types/gear';
import Image from '../image';

const GearCard = ({ image, title, description, url }: Gear) => {
  return (
    <LinkBox as="article" role="group">
      <Stack
        alignItems="center"
        justifyContent={{ base: 'center', md: 'flex-start' }}
        direction={{ base: 'column', md: 'row' }}
        w="full"
        p={3}
        spacing={6}
      >
        <AspectRatio w={36} h={36} ratio={1}>
          <Image alt={title} src={image} layout="fill" objectFit="contain" />
        </AspectRatio>
        <VStack alignItems="flex-start" flex={1} w="full" spacing={4}>
          <LinkOverlay href={url} isExternal>
            <Heading size="md">{title}</Heading>
          </LinkOverlay>
          <Text color="gray.500" fontSize="md">
            {description}
          </Text>
        </VStack>
        <HStack
          justifyContent="flex-start"
          w={12}
          hidden={useBreakpointValue({ base: true, md: false })}
        >
          <Icon
            as={FiArrowUpRight}
            boxSize={6}
            color="purple.500"
            opacity={0}
            _groupHover={{ ml: 6, opacity: 1 }}
            transitionDuration="slow"
            transitionProperty="all"
            transitionTimingFunction="ease-out"
          />
        </HStack>
      </Stack>
    </LinkBox>
  );
};

export default GearCard;
