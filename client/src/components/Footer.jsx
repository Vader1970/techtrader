// **Coded by Tin Mariano**//

// Import required Chakra UI components and React icons
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
  Box,
  Flex,
} from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import MyIcon from "../icon/techtrader.png";

import MyIcon1 from "../icon/techtrader-white.png";

// Define Footer component
const Footer = () => (
  // Render a footer section with a gray background
  <Box
    w="100%"
    bg={mode("gray.100", "blue.600")}
    borderTop="1px"
    borderColor={mode("white", "blue.100")}
    fontFamily="roboto"
  >
    <Container as="footer" role="contentinfo" maxW="7xl">
      {/* Render a stack of content with two columns */}
      <Stack
        spacing="8"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        py={{ base: "12", md: "16" }}
      >
        {/* Render a stack with the app name and tagline */}
        <Stack spacing={{ base: "6", md: "8" }} align="start">
          <Flex alignItems="center">
            {/* Render an icon for the app */}
            <Box height={20} width={20}>
              <img src={mode(MyIcon, MyIcon1)} alt="Tech Trader icon" />
            </Box>
            <Text
              color={mode("blue.700", "white")}
              fontFamily="archivo black"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              Tech Trader
            </Text>
          </Flex>
          <Text color="muted">We love technology.</Text>
        </Stack>
        {/* Render two stacks with links to different pages and a newsletter sign-up form */}
        <Stack
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "12", md: "8" }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="md" fontWeight="bold" color="subtle">
                Product
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">How it works</Button>
                <Button variant="link">Pricing</Button>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="md" fontWeight="semibold" color="subtle">
                Legal
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">Privacy</Button>
                <Button variant="link">Terms</Button>
                <Button variant="link">License</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Text fontSize="md" fontWeight="semibold" color="subtle">
              Stay up to date
            </Text>
            <Stack
              spacing="4"
              direction={{ base: "column", sm: "row" }}
              maxW={{ lg: "360px" }}
            >
              <Input placeholder="Enter your email" type="email" required />
              <Button
                bg={mode("blue.600", "white")}
                color={mode("white", "blue.600")}
                variant="primary"
                type="submit"
                flexShrink={0}
              >
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* Render a divider line */}
      <Divider />
    </Container>
    {/* This stack component includes the company copyright text and social media links */}
    <Stack
      bg={mode("blue.600", "blue.800")}
      borderTop="1px"
      borderColor={mode("white", "blue.100")}
      pt="4"
      pr="12"
      pl="12"
      pb="4"
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      align="center"
    >
      {/* This text component displays the copyright information */}
      <Text fontSize="sm" color="white">
        &copy; {new Date().getFullYear()} Tech Trader, Inc. All rights reserved.
      </Text>
      {/* This button group contains the social media icons */}
      <ButtonGroup>
        <IconButton
          colorScheme="white"
          color="white"
          as="a"
          href="#"
          aria-label="LinkedIn"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton
          colorScheme="white"
          color="white"
          as="a"
          href="#"
          aria-label="GitHub"
          icon={<FaGithub fontSize="1.25rem" />}
        />
        <IconButton
          colorScheme="white"
          color="white"
          as="a"
          href="#"
          aria-label="Twitter"
          icon={<FaTwitter fontSize="1.25rem" />}
        />
        <IconButton
          colorScheme="white"
          color="white"
          as="a"
          href="#"
          aria-label="Instagram"
          icon={<FaInstagram fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  </Box>
);

export default Footer;
