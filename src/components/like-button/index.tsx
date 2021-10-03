import { HStack, Icon, Text, Button } from '@chakra-ui/react';
import { HiHeart } from 'react-icons/hi';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

type Props = {
  onLike: (numberOfLikes: number) => void;
  likes: number;
};

const CONFETTI_BATCH_NUMBER = 10;

const LikeButton = ({ onLike, likes }: Props) => {
  const { width, height } = useWindowSize();
  const [pendingLikes, setPendingLikes] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState(CONFETTI_BATCH_NUMBER);
  const [clickCoordinates, setClickCoordinates] =
    useState<{ x: number; y: number }>();

  useEffect(() => {
    setPendingLikes(0);
  }, [likes]);

  return (
    <HStack
      as={Button}
      aria-label='Like blog post'
      variant='ghost'
      alignItems='center'
      spacing={2}
      onClick={(e) => {
        setClickCoordinates({ x: e.clientX, y: e.clientY });
        setConfettiPieces((oldPieces) =>
          Math.min(oldPieces + CONFETTI_BATCH_NUMBER, 50)
        );
        setPendingLikes((oldValue) => oldValue + 1);
      }}
    >
      <Icon as={HiHeart} color='red.400' boxSize={8} />
      <Text color='gray.500'>{likes + pendingLikes}</Text>

      {!!clickCoordinates && (
        <Confetti
          numberOfPieces={confettiPieces}
          onConfettiComplete={() => {
            setClickCoordinates(undefined);
            setConfettiPieces(CONFETTI_BATCH_NUMBER);
            onLike(pendingLikes);
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
