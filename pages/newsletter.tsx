import { VStack, Heading, Text } from "@chakra-ui/react";

import NewsletterForm from "@/components/newsletter-form";

const Newsletter = () => {
  return (
    <>
      <VStack as="section" alignItems="flex-start" w="full" spacing={3}>
        <Heading size="md">Newsletter.</Heading>
        <Text>
          Occasionally I&apos;ll be sharing my thoughts on web development,
          content creation, and updates whenever I publish new content.
        </Text>
      </VStack>
      <NewsletterForm />
    </>
  );
};

export default Newsletter;
