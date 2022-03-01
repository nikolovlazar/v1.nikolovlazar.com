import NextLink, { LinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type Props = LinkProps & ChakraLinkProps;

const Link = ({ href, children, ...rest }: Props) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...rest} color="purple.500">
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;
