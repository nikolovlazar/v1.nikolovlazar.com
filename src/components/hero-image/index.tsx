import { Box, AspectRatio, Flex } from "@chakra-ui/react";

import StatusIndicator from "../status-indicator";

const HeroImage = () => {
  return (
    <Flex position="relative" justify="center" pb={4}>
      <AspectRatio as="figure" flexShrink={0} w={56} h={56} ratio={1}>
        <Box overflow="hidden" rounded="full">
          <video autoPlay loop muted playsInline>
            <source
              src="/assets/videos/lazar-croissant.webm"
              type="video/webm"
            />
            <source src="/assets/videos/lazar-croissant.mp4" type="video/mp4" />
          </video>
        </Box>
      </AspectRatio>
      <StatusIndicator />
    </Flex>
  );
};

export default HeroImage;
