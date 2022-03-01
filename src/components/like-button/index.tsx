import React, { useState } from "react";
import { HStack, Text, useColorModeValue as mode } from "@chakra-ui/react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import { Zero, One, Two, Three, LikeIconProps } from "./icons";

type Props = {
  onLike: () => void;
  likes: number;
  userLikes: number;
};

const LikeButton = ({ onLike, likes, userLikes }: Props) => {
  const { width, height } = useWindowSize();
  const [currentLikes, setCurrentLikes] = useState(userLikes);
  const [initialLikes] = useState(likes - userLikes);
  const [clickCoordinates, setClickCoordinates] =
    useState<{ x: number; y: number }>();

  const iconProps: LikeIconProps = {
    color: mode("gray.700", "white"),
    mouthColor: mode("white", "gray.800"),
    w: 18,
    h: 28,
  };

  const icons = [
    <Zero {...iconProps} mouthColor={mode("gray.800", "white")} key={0} />,
    <One {...iconProps} key={1} />,
    <Two {...iconProps} key={2} />,
    <Three {...iconProps} key={3} />,
  ];

  return (
    <HStack
      as="button"
      alignItems="center"
      aria-label="Like blog post"
      onClick={(e) => {
        if (currentLikes < 3 && userLikes <= 3) {
          setCurrentLikes((oldValue) => oldValue + 1);
          onLike();

          if (currentLikes === 2) {
            setClickCoordinates({ x: e.clientX, y: e.clientY });
          }
        }
      }}
      spacing={2}
    >
      {icons[currentLikes]}
      <Text color={mode("gray.700", "white")}>
        {initialLikes + currentLikes} likes
      </Text>

      {!!clickCoordinates && (
        <Confetti
          numberOfPieces={100}
          recycle={false}
          width={width}
          height={height}
          style={{ position: "fixed", inset: 0 }}
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
