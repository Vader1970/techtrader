// Template of Footer copied from https://pro.chakra-ui.com/components/free . Template name 'Showcase on white background. I only made adjustments needed for this app.

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
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiTechnoHeart } from "react-icons/gi";
import MyIcon from "../icon/techtrader.png";

// Define Footer component
const Footer = () => (
  // Render a footer section with a gray background
  <Box w='100%' bg={mode("gray.100", "gray.900")}>
    <Container as='footer' role='contentinfo' maxW='7xl'>
      {/* Render a stack of content with two columns */}
      <Stack
        spacing='8'
        direction={{ base: "column", md: "row" }}
        justify='space-between'
        py={{ base: "12", md: "16" }}
      >
        {/* Render a stack with the app name and tagline */}
        <Stack spacing={{ base: "6", md: "8" }} align='start'>
          <Flex alignItems='center'>
            {/* Render an icon for the app */}
            <Box height={20} width={20}>
              <img src={MyIcon} alt='Tech Trader icon' />
            </Box>
            <Text fontSize='2xl' fontWeight='extrabold'>
              Tech Trader
            </Text>
          </Flex>
          <Text color='muted'>We love technology.</Text>
        </Stack>
        {/* Render two stacks with links to different pages and a newsletter sign-up form */}
        <Stack direction={{ base: "column-reverse", md: "column", lg: "row" }} spacing={{ base: "12", md: "8" }}>
          <Stack direction='row' spacing='8'>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Product
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link'>How it works</Button>
                <Button variant='link'>Pricing</Button>
              </Stack>
            </Stack>
            <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Legal
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link'>Privacy</Button>
                <Button variant='link'>Terms</Button>
                <Button variant='link'>License</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing='4'>
            <Text fontSize='sm' fontWeight='semibold' color='subtle'>
              Stay up to date
            </Text>
            <Stack spacing='4' direction={{ base: "column", sm: "row" }} maxW={{ lg: "360px" }}>
              <Input placeholder='Enter your email' type='email' required />
              <Button variant='primary' type='submit' flexShrink={0}>
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* Render a divider line */}
      <Divider />

      {/* This stack component includes the company copyright text and social media links */}
      <Stack pt='8' pb='12' justify='space-between' direction={{ base: "column-reverse", md: "row" }} align='center'>
        {/* This text component displays the copyright information */}
        <Text fontSize='sm' color='subtle'>
          &copy; {new Date().getFullYear()} Tech Trader, Inc. All rights reserved.
        </Text>

        {/* This button group contains the social media icons */}
        <ButtonGroup variant='ghost'>
          <IconButton as='a' href='#' aria-label='LinkedIn' icon={<FaLinkedin fontSize='1.25rem' />} />
          <IconButton as='a' href='#' aria-label='GitHub' icon={<FaGithub fontSize='1.25rem' />} />
          <IconButton as='a' href='#' aria-label='Twitter' icon={<FaTwitter fontSize='1.25rem' />} />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
