import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react";
//import { FaArrowRight } from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";
// import { GiTechnoHeart } from "react-icons/gi";

const LandingScreen = () => (
  <Box bg={mode("white", "blue.900")} maxW='8xl' mx='auto' px={{ base: "0", lg: "12" }} py={{ base: "0", lg: "12" }} minH='6xl'>
    <Stack direction={{ base: "column-reverse", lg: "row" }} spacing={{ base: "0", lg: "20" }}>
      <Box
        width={{ lg: "sm" }}
        transform={{ base: "translateY(-50%)", lg: "none" }}
        bg={{ base: mode("blue.50", "blue.600"), lg: "transparent" }}
        mx={{ base: "6", md: "8", lg: "0" }}
        px={{ base: "6", md: "8", lg: "0" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack spacing={{ base: "8", lg: "10" }}>
          <Stack spacing={{ base: "2", lg: "4" }}>
            <Flex alignItems='center'>
              {/* <Icon as={GiTechnoHeart} h={12} w={12} color={mode("orange.500", "orange.300")} /> */}
              <Text fontFamily='archivo black' color={mode("blue.700", "white")} fontSize='5xl' fontWeight='bold'>
                TECH TRADER
              </Text>
            </Flex>
            <Heading fontFamily='roboto' size='lg' fontWeight='normal' color={mode("blue.700", "white")}>
              Refresh your equipment
            </Heading>
          </Stack>
          <HStack spacing='3'>
            <Link
              as={ReactLink}
              to='/products'
              fontWeight='bold'
              fontSize='lg'
               fontFamily='roboto'
            >
              Discover now
            </Link>
            <Image src='images/arrow.png' maxH='24px'
          minW='24px'/>
          </HStack>
        </Stack>
      </Box>
      <Flex flex='1' overflow='hidden'>
        <Image
          src='images/landing.jpg'
          alt='Picture of a black sphere'
          fallback={<Skeleton />}
          border='1px' borderColor={mode("grey.50", "white")}
          maxH='550px'
          minW='300px'
          objectFit='cover'
          flex='1'
        />
      </Flex>
    </Stack>
  </Box>
);

export default LandingScreen;
