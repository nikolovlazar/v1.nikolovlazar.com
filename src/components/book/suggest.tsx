import { useState } from 'react';
import {
  Button,
  Collapse,
  SimpleGrid,
  GridItem,
  Input,
  Textarea,
  IconButton,
  Icon,
  useColorModeValue as mode,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import useBookSuggestions from 'src/hooks/use-book-suggestions';
import { FiSend } from 'react-icons/fi';

const Suggest = () => {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [reason, setReason] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const toast = useToast();
  const { sendSuggestion } = useBookSuggestions();
  const { isOpen, onToggle, getButtonProps, getDisclosureProps } =
    useDisclosure();

  const submit = async () => {
    if (title && author && reason) {
      setLoading(true);
      const res = await sendSuggestion(title, author, reason);
      if (res.success) {
        toast({
          status: 'success',
          title: 'Success!',
          description: 'Thank you for sending me a book suggestion ❤️',
          isClosable: true,
        });
        setTitle('');
        setAuthor('');
        setReason('');
      } else {
        toast({
          status: 'error',
          title: 'Oops!',
          description: "Oh damn... Your suggestion didn't go through 😞",
          isClosable: true,
        });
      }
      setLoading(false);
    } else {
      toast({
        status: 'warning',
        title: 'Hey!',
        description: 'All fields are required 😁',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        {...getButtonProps()}
        variant='unstyled'
        color='purple.500'
        fontSize='sm'
        fontWeight='normal'
        onClick={onToggle}
        h={6}
      >
        Suggest me a book!
      </Button>
      <Collapse in={isOpen} animateOpacity {...getDisclosureProps()}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          w='full'
          bg={mode('gray.50', 'gray.700')}
          rounded='md'
          p={3}
          gap={3}
        >
          <GridItem>
            <Input
              required
              placeholder='Title'
              variant='filled'
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </GridItem>
          <GridItem>
            <Input
              required
              placeholder='Author'
              variant='filled'
              value={author}
              onChange={(e) => setAuthor(e.currentTarget.value)}
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Textarea
              required
              variant='filled'
              placeholder='Why would I like this book?'
              value={reason}
              onChange={(e) => setReason(e.currentTarget.value)}
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <IconButton
              isLoading={loading}
              aria-label='Send Suggestion'
              icon={<Icon as={FiSend} />}
              onClick={submit}
            />
          </GridItem>
        </SimpleGrid>
      </Collapse>
    </>
  );
};

export default Suggest;
