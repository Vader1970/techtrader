// **Coded by Tin Mariano**//

// Importing required modules from Chakra UI, Redux, and React Router DOM
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  // import useColorModeValue hook as mode alias
  useColorModeValue as mode,
  Text,
  Wrap,
} from "@chakra-ui/react";

// import ReactLink as alias for Chakra's Link component
import { Link as ReactLink } from "react-router-dom";

// define functional component LandingScreen
const LandingScreen = () => (
  // Wrap component from Chakra with background color set based on the color mode and other props
  <Wrap bg={mode("white", "blue.900")} spacing='30px' justify='center' minHeight='100vh'>
    <Box
      // Box component from Chakra with background color set based on the color mode
      bg={mode("white", "blue.900")}
      maxW='8xl'
      mx='auto'
      px={{ base: "0", lg: "12" }}
      py={{ base: "0", lg: "12" }}
      minH='6xl'
    >
      {/* Stack component from Chakra that arranges its children in a stack */}
      <Stack direction={{ base: "column-reverse", lg: "row" }} spacing={{ base: "0", lg: "20" }}>
        <Box
          width={{ lg: "sm" }}
          transform={{ base: "translateY(-30%)", lg: "none" }}
          bg={{ base: mode("blue.50", "blue.600"), lg: "transparent" }}
          mx={{ base: "6", md: "8", lg: "0" }}
          px={{ base: "6", md: "8", lg: "0" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack spacing={{ base: "8", lg: "10" }}>
            <Stack spacing={{ base: "2", lg: "4" }}>
              <Flex alignItems='center'>
                {/*Text component with font and color set, based on the color mode */}
                <Text fontFamily='archivo black' color={mode("blue.700", "white")} fontSize='5xl' fontWeight='bold'>
                  TECH TRADER
                </Text>
              </Flex>

              {/* Heading component with font and color set, based on the color mode and screen size */}
              <Heading fontFamily='roboto' size='lg' fontWeight='normal' color={mode("blue.700", "white")}>
                Refresh your equipment
              </Heading>
            </Stack>

            <HStack spacing='3'>
              {/* Link component to navigate to the products page */}
              <Link as={ReactLink} to='/products' fontWeight='bold' fontSize='lg'>
                Discover now
              </Link>

              {/* Image component to show the arrow icon */}
              <Image src='images/arrow.png' maxH='24px' />
            </HStack>
          </Stack>
        </Box>
        <Flex flex='1' overflow='hidden'>
          {/* Image component to show the landing page background image
            alt='Picture of a black sphere' */}
          <Image
            src='images/landing.jpg'
            alt='Picture of a black sphere'
            // Skeleton component used as fallback in case the image is still loading
            fallback={<Skeleton />}
            border='1px'
            borderColor={mode("grey.50", "white")}
            maxH='550px'
            minW='300px'
            objectFit='cover'
            flex='1'
          />
        </Flex>
      </Stack>
    </Box>
  </Wrap>
);

export default LandingScreen;
