import { useCallback, useContext } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  Flex,
  FlexProps,
  Input,
  List,
  ListItem,
  Portal,
  StackProps,
  Text,
  useColorMode,
  useMenu,
  VStack,
} from '@chakra-ui/react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { createDescendantContext } from '@chakra-ui/descendant';
import { CgArrowRight } from 'react-icons/cg';
import { useKeyPressEvent } from 'react-use';

import { PageItem, SocialItem, ThemeItem } from '@/data/cmd-palette';
import CommandItem from './command-item';
import { CmdPaletteContext } from 'src/providers/cmd-palette-provider';

export const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<HTMLElement>();

const backdropVariants: Variants = {
  initial: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  enter: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
};

const commandPaletteVariants: Variants = {
  initial: {
    scale: 0.9,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  enter: {
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
  exit: {
    scale: 0.9,
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    },
  },
};

const MotionFlex = motion<FlexProps>(Flex);
const MotionVStack = motion<StackProps>(VStack);

const CmdPalette = () => {
  const {
    isOpened,
    open,
    close,
    focusedIndex,
    setFocusedIndex,
    commands,
    filterCommands,
  } = useContext(CmdPaletteContext);
  const { descendants } = useMenu();
  const { colorMode, toggleColorMode } = useColorMode();

  const hidePalette = useCallback(() => {
    close();
    setFocusedIndex(0);
  }, [close, setFocusedIndex]);

  useKeyPressEvent((e) => {
    if (!isOpened && e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.stopPropagation();
      e.preventDefault();
      open();
    }
    return true;
  });

  useKeyPressEvent('Escape', hidePalette);

  useKeyPressEvent('ArrowDown', () => {
    const next = descendants.nextEnabled(focusedIndex);
    if (next) {
      setFocusedIndex(next.index);
      next.node.focus();
      next.node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  useKeyPressEvent('ArrowUp', () => {
    const prev = descendants.prevEnabled(focusedIndex);
    if (prev) {
      setFocusedIndex(prev.index);
      prev.node.focus();
      prev.node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpened && (
        <Portal>
          <MotionFlex
            onClick={close}
            variants={backdropVariants}
            initial='initial'
            animate='enter'
            exit='exit'
            position='fixed'
            inset={0}
            bg='whiteAlpha.800'
            _dark={{
              bg: 'blackAlpha.800',
            }}
            zIndex='tooltip'
            alignItems='flex-start'
            justifyContent='center'
          >
            <MotionVStack
              variants={commandPaletteVariants}
              initial='initial'
              animate='enter'
              exit='exit'
              mt={{ base: 12, md: 24 }}
              mx={2}
              onClick={(e) => e.stopPropagation()}
              bg='white'
              _dark={{
                bg: 'gray.900',
              }}
              shadow='2xl'
              maxW='3xl'
              maxH={{ base: '40vh', md: 'md' }}
              overflow='hidden'
              w='full'
              rounded='md'
              borderWidth='1px'
              borderStyle='solid'
            >
              <Input
                px={3}
                py={4}
                borderBottomWidth='1px'
                borderBottomStyle='solid'
                autoFocus
                onChange={(e) => filterCommands(e.currentTarget.value)}
                placeholder='Search commands (ex. Change theme)'
                rounded='none'
                variant='unstyled'
              />
              <List overflow='auto' w='full' pb={2} px={2}>
                <MenuDescendantsProvider value={descendants}>
                  {Object.keys(commands).map((section) => (
                    <>
                      {commands[section].length > 0 && (
                        <ListItem key={section}>
                          <Text
                            my={2}
                            color='gray.500'
                            fontSize='xs'
                            textTransform='capitalize'
                          >
                            {section}
                          </Text>
                        </ListItem>
                      )}
                      {commands[section].map((command) => {
                        if (section === 'pages') {
                          const { title, href } = command as PageItem;

                          return (
                            <CommandItem
                              key={title}
                              title={title}
                              icon={CgArrowRight}
                              href={href}
                            />
                          );
                        } else if (section === 'social') {
                          const { title, href, icon } = command as SocialItem;

                          return (
                            <CommandItem
                              key={title}
                              title={title}
                              icon={icon}
                              href={href}
                            />
                          );
                        } else if (section === 'theme') {
                          const { title, id } = command as ThemeItem;

                          const icon = colorMode === 'dark' ? IoSunny : IoMoon;

                          return (
                            <CommandItem
                              key={id}
                              title={title}
                              icon={icon}
                              onClick={toggleColorMode}
                            />
                          );
                        }
                      })}
                    </>
                  ))}
                </MenuDescendantsProvider>
              </List>
            </MotionVStack>
          </MotionFlex>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default CmdPalette;
