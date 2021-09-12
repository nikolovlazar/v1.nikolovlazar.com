import { Box, AspectRatio } from '@chakra-ui/react';

import Lazar from './lazar-croissant.gif';
import Image from '@/components/image';

const HeroImage = () => {
  return (
    <AspectRatio flexShrink={0} ratio={1} w={56} h={56}>
      <Box>
        <Image src={Lazar} rounded='full' />
      </Box>
    </AspectRatio>
  );
};

export default HeroImage;
