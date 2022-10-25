import { Flex, Icon, FlexProps, type ThemeTypings } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { HiOutlineHeart, HiCheck } from 'react-icons/hi';
import { BiGlasses } from 'react-icons/bi';
import { FiShoppingBag } from 'react-icons/fi';

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
        icon: BiGlasses,
      };
      break;
    case 'Wish':
      tagProps = {
        color: 'green.400',
        icon: FiShoppingBag,
      };
      break;
    case 'Completed':
      tagProps = {
        color: 'blue.400',
        icon: HiCheck,
      };
      break;
    default:
      break;
  }

  if (state === '') return <></>;

  return (
    <Flex
      align='center'
      justify='center'
      w={5}
      h={5}
      bg={tagProps.color}
      rounded='full'
      {...flexProps}
    >
      <Icon as={tagProps.icon} boxSize={3} color='white' />
    </Flex>
  );
};
export default Tag;
