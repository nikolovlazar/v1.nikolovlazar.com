import { IconButton, Icon } from '@chakra-ui/react';
import { HiPlay, HiPause } from 'react-icons/hi';

const HeroPlay = () => {
  return (
    <>
      <IconButton
        aria-label='Play pronunciation track'
        icon={<Icon color='purple.500' as={HiPlay} w={6} h={6} />}
        variant='unstyled'
        size='xs'
        rounded='full'
      />
    </>
  );
};

export default HeroPlay;
