import { Box, AspectRatio, Flex, Image } from '@chakra-ui/react';

import StatusIndicator from '../status-indicator';

const HeroImage = () => {
  return (
    <Flex position='relative' justify='center' pb={4}>
      <AspectRatio as='figure' flexShrink={0} w={56} h={56} ratio={1}>
        <Box overflow='hidden' rounded='full'>
          <Image
            alt='A photo of Lazar Nikolov'
            src='/assets/images/lazar.jpg'
            width={224}
            height={224}
            objectFit='contain'
          />
        </Box>
      </AspectRatio>
      <StatusIndicator />
    </Flex>
  );
};

export default HeroImage;
