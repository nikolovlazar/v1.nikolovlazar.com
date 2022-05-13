import { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { BiArrowToTop } from 'react-icons/bi';

const ScrollToTopButton = () => {
  const [showScrollToTop, setScrollToTop] = useState(false);

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
          position="fixed"
          zIndex="tooltip"
          right={{ base: 5, md: 20 }}
          bottom={{ base: 5, md: 20 }}
          bg="gray.50"
          _dark={{ bg: 'gray.700' }}
          aria-label="Back to the top"
          icon={<BiArrowToTop />}
          onClick={scrollTop}
          rounded="full"
          size="lg"
        />
      )}
    </>
  );
};

export default ScrollToTopButton;
