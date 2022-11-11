import NextLink, { LinkProps } from 'next/link';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

type Props = LinkProps & ChakraLinkProps;

const Link = ({ href, children, ...rest }: Props) => {
  return (
    <ChakraLink as={NextLink} href={href} {...rest} color='purple.500'>
      {children}
    </ChakraLink>
  );
};

export default Link;
