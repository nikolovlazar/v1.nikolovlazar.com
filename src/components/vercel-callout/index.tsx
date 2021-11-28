import { Link } from '@chakra-ui/react';

const VercelCallout = () => {
  return (
    <Link
      href='https://vercel.com'
      isExternal
      fontSize='xs'
      fontWeight='semibold'
      display='inline-block'
      _hover={{ textDecoration: 'none' }}
    >
      Powered by{' '}
      <span role='img' aria-label='Vercel logo'>
        ▲
      </span>{' '}
      Vercel
    </Link>
  );
};

export default VercelCallout;
