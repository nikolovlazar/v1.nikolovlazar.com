import { chakra, IconProps, ThemeTypings } from '@chakra-ui/react';

export { Zero } from './zero';
export { One } from './one';
export { Two } from './two';
export { Three } from './three';

export type LikeIconProps = IconProps & {
  mouthColor: ThemeTypings['colors'];
};

export const ChakraPath = chakra('path', {
  shouldForwardProp: (prop) =>
    ['d', 'fill', 'fillRule', 'clipRule'].includes(prop),
});
