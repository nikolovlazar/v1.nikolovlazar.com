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
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

import { Tool } from '@/types/tool';
import Image from '../image';

const ToolCard = ({ image, title, description, url }: Partial<Tool>) => {
  return (
    <LinkBox role='group'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        p={3}
        spacing={6}
        justifyContent={{ base: 'center', md: 'flex-start' }}
        alignItems='center'
      >
        <AspectRatio ratio={1} w={18} h={18}>
          <Image alt={`Thumbnail of ${title}`} src={image} layout='fill' />
        </AspectRatio>
        <VStack spacing={0} alignItems='flex-start' flex={1}>
          <LinkOverlay href={url} isExternal>
            <Heading size='sm'>{title}</Heading>
          </LinkOverlay>
          <Text fontSize='sm' color='gray.500'>
            {description}
          </Text>
        </VStack>
        <HStack
          w={12}
          justifyContent='flex-start'
          hidden={useBreakpointValue({ base: true, md: false })}
        >
          <Icon
            boxSize={6}
            as={FiArrowUpRight}
            color='purple.500'
            opacity={0}
            _groupHover={{ ml: 6, opacity: 1 }}
            transitionProperty='all'
            transitionDuration='slow'
            transitionTimingFunction='ease-out'
          />
        </HStack>
      </Stack>
    </LinkBox>
  );
};

export default ToolCard;
