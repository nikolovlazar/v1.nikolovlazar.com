import { Flex, Icon, FlexProps } from '@chakra-ui/react';
import { ThemeTypings } from '@chakra-ui/styled-system';
import { IconType } from 'react-icons';
import { HiOutlineHeart } from 'react-icons/hi';
import { RiBookLine, RiCoinsLine } from 'react-icons/ri';

import { BookState } from '@/types/book';

type Props = FlexProps & {
  state: BookState;
};

const Tag = ({ state, ...flexProps }: Props) => {
  let tagProps: {
    color?: ThemeTypings['colors'];
    icon?: IconType;
  } = {};

  switch (state) {
    case 'Favorite':
      tagProps = {
        color: 'red.400',
        icon: HiOutlineHeart,
      };
      break;
    case 'Reading':
      tagProps = {
        color: 'purple.400',
        icon: RiBookLine,
      };
      break;
    case 'Wish':
      tagProps = {
        color: 'green.400',
        icon: RiCoinsLine,
      };
      break;
    default:
      break;
  }

  if (state === '') return <></>;

  return (
    <Flex
      w={5}
      h={5}
      rounded='full'
      alignItems='center'
      justifyContent='center'
      bg={tagProps.color}
      {...flexProps}
    >
      <Icon boxSize={3} color='white' as={tagProps.icon} />
    </Flex>
  );
};
export default Tag;
