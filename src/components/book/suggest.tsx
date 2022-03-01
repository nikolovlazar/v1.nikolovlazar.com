import { useState } from "react";
import {
  chakra,
  Flex,
  Button,
  Collapse,
  SimpleGrid,
  GridItem,
  Input,
  Textarea,
  Icon,
  useColorModeValue as mode,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import useBookSuggestions from "src/hooks/use-book-suggestions";
import { FiSend } from "react-icons/fi";

const Suggest = () => {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [reason, setReason] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const toast = useToast();
  const { sendSuggestion } = useBookSuggestions();
  const { isOpen, onToggle, getButtonProps } = useDisclosure();

  const submit = async () => {
    if (title && author && reason) {
      setLoading(true);
      const res = await sendSuggestion(title, author, reason);
      if (res.success) {
        toast({
          status: "success",
          title: "Success!",
          description: "Thank you for sending me a book suggestion ❤️",
          isClosable: true,
        });
        setTitle("");
        setAuthor("");
        setReason("");
      } else {
        toast({
          status: "error",
          title: "Oops!",
          description: "Oh damn... Your suggestion didn't go through 😞",
          isClosable: true,
        });
      }
      setLoading(false);
    } else {
      toast({
        status: "warning",
        title: "Hey!",
        description: "All fields are required 😁",
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="flex-start" direction="column" w="full">
      <Button
        {...getButtonProps()}
        h={6}
        mb={3}
        color="purple.500"
        fontSize="sm"
        fontWeight="normal"
        onClick={onToggle}
        variant="unstyled"
      >
        Suggest me a book!
      </Button>
      <Collapse animateOpacity in={isOpen} style={{ width: "100%" }}>
        <SimpleGrid
          gap={3}
          w="full"
          p={3}
          bg={mode("gray.50", "gray.700")}
          columns={{ base: 1, md: 2 }}
          rounded="md"
        >
          <GridItem>
            <Input
              onChange={(e) => setTitle(e.currentTarget.value)}
              placeholder="Title"
              required
              value={title}
              variant="filled"
            />
          </GridItem>
          <GridItem>
            <Input
              onChange={(e) => setAuthor(e.currentTarget.value)}
              placeholder="Author"
              required
              value={author}
              variant="filled"
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Textarea
              onChange={(e) => setReason(e.currentTarget.value)}
              placeholder="Why would I like this book?"
              required
              value={reason}
              variant="filled"
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Button
              w={10}
              _hover={{ width: "186px" }}
              aria-label="Send Suggestion"
              isLoading={loading}
              onClick={submit}
              rightIcon={<Icon as={FiSend} ml={-2} _groupHover={{ ml: 0 }} />}
              role="group"
              transitionDuration="slower"
              transitionProperty="all"
              transitionTimingFunction="ease-out"
            >
              <chakra.span
                overflow="hidden"
                width={0}
                opacity={0}
                _groupHover={{ width: "auto", opacity: 1 }}
                transitionProperty="all"
                transitionDuration="slower"
                transitionTimingFunction="ease-out"
              >
                Send suggestion
              </chakra.span>
            </Button>
          </GridItem>
        </SimpleGrid>
      </Collapse>
    </Flex>
  );
};

export default Suggest;
