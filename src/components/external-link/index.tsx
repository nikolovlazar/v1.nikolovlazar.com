import {
  Link,
  LinkProps,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

const ExternalLink = ({ children, ...linkProps }: LinkProps) => {
  return (
    <Link
      {...linkProps}
      color={mode('purple.500', 'purple.300')}
      display='inline-flex'
      alignItems='center'
      isExternal
      target='_blank'
    >
      {children}
      <Icon
        as={FiArrowUpRight}
        color={mode('gray.700', 'white')}
        display='inline'
      />
    </Link>
  );
};

export default ExternalLink;
