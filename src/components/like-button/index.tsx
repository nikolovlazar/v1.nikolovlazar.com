import { HStack, Icon, Text, Button } from '@chakra-ui/react';
import { HiHeart } from 'react-icons/hi';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useState } from 'react';

type Props = {
  onLike: () => void;
};

const CONFETTI_BATCH_NUMBER = 10;

const LikeButton = ({ onLike }: Props) => {
  const { width, height } = useWindowSize();
  const [confettiPieces, setConfettiPieces] = useState(CONFETTI_BATCH_NUMBER);
  const [clickCoordinates, setClickCoordinates] =
    useState<{ x: number; y: number }>();

  return (
    <HStack
      as={Button}
      variant='ghost'
      alignItems='center'
      spacing={2}
      onClick={(e) => {
        setClickCoordinates({ x: e.clientX, y: e.clientY });
        setConfettiPieces((oldPieces) =>
          Math.min(oldPieces + CONFETTI_BATCH_NUMBER, 50)
        );
      }}
    >
      <Icon as={HiHeart} color='red.400' boxSize={8} />
      <Text color='gray.500'>56</Text>

      {!!clickCoordinates && (
        <Confetti
          numberOfPieces={confettiPieces}
          onConfettiComplete={() => {
            setClickCoordinates(undefined);
            setConfettiPieces(CONFETTI_BATCH_NUMBER);
          }}
          recycle={false}
          width={width}
          height={height}
          style={{ position: 'fixed', inset: 0 }}
          gravity={0.8}
          confettiSource={{
            x: clickCoordinates.x,
            y: clickCoordinates.y,
            w: 10,
            h: 10,
          }}
        />
      )}
    </HStack>
  );
};

export default LikeButton;
