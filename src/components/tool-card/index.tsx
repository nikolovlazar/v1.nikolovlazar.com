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
} from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";

import { Tool } from "@/types/tool";
import Image from "../image";

const ToolCard = ({ image, title, description, url }: Partial<Tool>) => {
  return (
    <LinkBox as="article" role="group">
      <Stack
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
        direction={{ base: "column", md: "row" }}
        w="full"
        p={3}
        spacing={6}
      >
        <AspectRatio w={18} h={18} ratio={1}>
          <Image alt={`Thumbnail of ${title}`} src={image} layout="fill" />
        </AspectRatio>
        <VStack alignItems="flex-start" flex={1} w="full" spacing={0}>
          <LinkOverlay href={url} isExternal>
            <Heading size="sm">{title}</Heading>
          </LinkOverlay>
          <Text color="gray.500" fontSize="sm">
            {description}
          </Text>
        </VStack>
        <HStack
          justifyContent="flex-start"
          w={12}
          hidden={useBreakpointValue({ base: true, md: false })}
        >
          <Icon
            as={FiArrowUpRight}
            boxSize={6}
            color="purple.500"
            opacity={0}
            _groupHover={{ ml: 6, opacity: 1 }}
            transitionDuration="slow"
            transitionProperty="all"
            transitionTimingFunction="ease-out"
          />
        </HStack>
      </Stack>
    </LinkBox>
  );
};

export default ToolCard;
