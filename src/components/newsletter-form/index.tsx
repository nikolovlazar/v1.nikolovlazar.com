import { VStack, Heading, Text, Icon, Button, Link } from '@chakra-ui/react';
import { SiSubstack } from 'react-icons/si';

const NewsletterForm = () => (
  <VStack
    alignItems='flex-start'
    w='full'
    p={{ base: 4, md: 6 }}
    bg='gray.50'
    _dark={{
      bg: 'gray.700',
    }}
    rounded='md'
    spacing={3}
  >
    <Heading size='md'>Subscribe to my newsletter ✉️</Heading>
    <Text>
      Get emails from me about web development, content creation, and whenever I
      publish new content.
    </Text>
    <Button
      as={Link}
      isExternal
      href='https://nikolovlazar.substack.com'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      leftIcon={<Icon fill='#FF6719' as={SiSubstack} />}
      variant='outline'
    >
      Subscribe on Substack
    </Button>
  </VStack>
);

export default NewsletterForm;
