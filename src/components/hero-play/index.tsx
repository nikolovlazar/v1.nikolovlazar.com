import { IconButton, Icon } from '@chakra-ui/react';
import { HiPlay, HiStop } from 'react-icons/hi';
import { useAudio } from 'react-use';

const HeroPlay = () => {
  const [audio, state, controls] = useAudio({
    src: '/assets/pronunciation.mp3',
    autoPlay: false,
  });

  const play = () => {
    controls.play();
  };

  const stop = () => {
    controls.pause();
    controls.seek(0);
  };

  const toggle = () => {
    if (state.playing) {
      stop();
    } else {
      play();
    }
  };

  return (
    <>
      {audio}
      <IconButton
        display="flex"
        aria-label="Play pronunciation track"
        icon={
          <Icon
            as={state.playing ? HiStop : HiPlay}
            w={{ base: 12, md: 8 }}
            h={{ base: 12, md: 8 }}
            color="purple.500"
          />
        }
        onClick={toggle}
        rounded="full"
        size="lg"
        variant="unstyled"
      />
    </>
  );
};

export default HeroPlay;
