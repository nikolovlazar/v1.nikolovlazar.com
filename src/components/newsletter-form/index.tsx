import { FormEvent, useState } from 'react';
import {
  chakra,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
  Heading,
  Text,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { Subscribers } from '@/types/subscribers';
import { Form, FormState } from '@/types/form-state';

const NewsletterForm = () => {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const { data } = useSWR<Subscribers>('/api/newsletter/subscribers', fetcher);

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch('/api/newsletter/subscribe', {
      body: JSON.stringify({
        email: e.currentTarget.elements['email'].value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error, message } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    setForm({
      state: Form.Success,
      message,
    });
  };

  return (
    <VStack
      alignItems="flex-start"
      w="full"
      p={{ base: 4, md: 6 }}
      bg="gray.50"
      _dark={{
        bg: 'gray.700',
      }}
      rounded="md"
      spacing={3}
    >
      <Heading size="md">Subscribe to my newsletter ✉️</Heading>
      <Text>
        Get emails from me about web development, content creation, and whenever
        I publish new content.
      </Text>
      {form.state !== Form.Success && form.state !== Form.Error && (
        <>
          <chakra.form
            name="subscribe-form"
            target="_blank"
            w="full"
            onSubmit={subscribe}
          >
            <InputGroup w="full">
              <Input
                disabled={form.state === Form.Loading}
                name="email"
                placeholder="email@example.com"
                type="email"
                variant="filled"
              />
              <InputRightElement>
                <IconButton
                  aria-label="Subscribe"
                  icon={<Icon as={HiOutlineMail} />}
                  isLoading={form.state === Form.Loading}
                  name="subscribe"
                  size="sm"
                  type="submit"
                />
              </InputRightElement>
            </InputGroup>
          </chakra.form>
          <Text color="gray.500" fontSize="sm" _dark={{ color: 'gray.400' }}>
            Join {data?.count}+ subscribers
          </Text>
        </>
      )}
      {form.state === Form.Success && (
        <Text color="green.500" size="sm">
          {form.message}
        </Text>
      )}
      {form.state === Form.Error && (
        <Text color="red.500" size="sm">
          {form.message} 😕
        </Text>
      )}
    </VStack>
  );
};

export default NewsletterForm;
