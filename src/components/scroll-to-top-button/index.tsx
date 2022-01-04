import { useState, useEffect } from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { BiArrowToTop } from 'react-icons/bi';

const ScrollToTopButton = () => {
  const [showScrollToTop, setScrollToTop] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const updateScrollToTop = () => {
    if (window.pageYOffset > 300) {
      setScrollToTop(true);
    } else {
      setScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollToTop);

    return () => {
      window.removeEventListener('scroll', updateScrollToTop);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showScrollToTop && (
        <IconButton
          position='fixed'
          bg={bgColor}
          bottom={{ base: 5, md: 20 }}
          right={{ base: 5, md: 20 }}
          rounded='full'
          aria-label='Back to the top'
          size='lg'
          zIndex='tooltip'
          onClick={scrollTop}
          icon={<BiArrowToTop />}
        />
      )}
    </>
  );
};

export default ScrollToTopButton;
