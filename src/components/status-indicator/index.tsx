import {
  HStack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import status from "@/data/status";

const StatusIndicator = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  let stackStyles: StackProps;

  if (isMobile) {
    stackStyles = {
      width: "fit-content",
      shadow: "lg",
      spacing: 3,
    };
  } else {
    stackStyles = {
      width: 10,
      shadow: "none",
      spacing: 0,
    };
  }

  return (
    <HStack
      position="absolute"
      bottom={0}
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      h={10}
      ml="auto"
      px={2}
      bg={mode("white", "gray.800")}
      borderWidth={1}
      borderStyle="solid"
      borderColor={mode("gray.300", "gray.600")}
      _hover={{
        width: "fit-content",
        shadow: "lg",
      }}
      role="group"
      rounded="3xl"
      transitionDuration="slow"
      transitionProperty="all"
      transitionTimingFunction="ease-out"
      {...stackStyles}
    >
      <Text>{status.emoji}</Text>
      <Text
        sx={{
          "@media(hover: none)": {
            opacity: 1,
            width: "fit-content",
            marginLeft: 3,
          },
        }}
        w={0}
        maxW="full"
        opacity={0}
        _groupHover={{
          opacity: 1,
          width: "fit-content",
          marginLeft: 3,
        }}
        isTruncated
        transitionDuration="slow"
        transitionProperty="opacity"
        transitionTimingFunction="ease-out"
      >
        {status.text}
      </Text>
    </HStack>
  );
};

export default StatusIndicator;
