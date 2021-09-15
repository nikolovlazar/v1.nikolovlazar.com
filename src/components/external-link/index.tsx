import {
  Link,
  LinkProps,
  Icon,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

const ExternalLink = ({ children, ...linkProps }: LinkProps) => {
  return (
    <span>
      <Link
        {...linkProps}
        color={mode('purple.500', 'purple.300')}
        display='inline-flex'
        alignItems='center'
        isExternal
        target='_blank'
      >
        {children}
      </Link>
      <Icon
        as={FiArrowUpRight}
        color={mode('gray.700', 'white')}
        display='inline'
      />
    </span>
  );
};

export default ExternalLink;
