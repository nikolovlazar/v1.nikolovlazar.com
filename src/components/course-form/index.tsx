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
import { Course } from '@/types/course';
import Link from '../link';
import { TWITTER_PROFILE } from 'src/constants';

type Props = {
  course: Course;
};

const CourseForm = ({ course: { formId, title } }: Props) => {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const { data } = useSWR<Subscribers>(
    `/api/courses/subscribers/${formId}`,
    fetcher
  );

  const subscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch(`/api/courses/subscribe/${formId}`, {
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
      <Heading size="md">Subscribe to my course 🤓</Heading>
      <Text>
        Get notified when I publish my &quot;{title}&quot; course! I will just
        send out one email when the course launches, and then delete your email
        from the list. No further bothering, no spam. I promise.
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
          {form.message} 😕 Reach out to me on{' '}
          <Link href={TWITTER_PROFILE} isExternal>
            Twitter
          </Link>{' '}
          about this.
        </Text>
      )}
    </VStack>
  );
};

export default CourseForm;
