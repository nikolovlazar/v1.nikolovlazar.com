import { Link } from '@chakra-ui/react';

const VercelCallout = () => {
  return (
    <Link
      display="inline-block"
      fontSize="xs"
      fontWeight="semibold"
      _hover={{ textDecoration: 'none' }}
      href="https://vercel.com"
      isExternal
    >
      Powered by{' '}
      <span role="img" aria-label="Vercel logo">
        ▲
      </span>{' '}
      Vercel
    </Link>
  );
};

export default VercelCallout;
