import { useState, useEffect } from "react";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTopButton = () => {
  const [showScrollToTop, setScrollToTop] = useState(false);
  const bgColor = useColorModeValue("gray.50", "gray.700");

  const updateScrollToTop = () => {
    if (window.pageYOffset > 300) {
      setScrollToTop(true);
    } else {
      setScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollToTop);

    return () => {
      window.removeEventListener("scroll", updateScrollToTop);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
          bg={bgColor}
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
