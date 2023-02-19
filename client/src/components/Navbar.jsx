// Import necessary modules from Chakra UI, React Router DOM, and React Icons
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue as mode,
  useColorMode,
  useToast,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { BsList } from "react-icons/bs";
import { MdLocalShipping, MdLogout } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { GiTechnoHeart } from "react-icons/gi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

// Define a ShoppingCartIcon component that displays the number of items in the shopping cart
const ShoppingCartIcon = () => {
  // Get cart information from Redux store
  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;
  // Display the number of items in the shopping cart and a shopping cart icon
  return (
    <Flex>
      <Text fontStyle='italic' as='sub' fontSize='xs'>
        {cart.length}
      </Text>
      <Icon ml='-1.5' as={FiShoppingCart} h='4' w='7' alignSelf='center' />
      Cart
    </Flex>
  );
};

// Define an array of navigation links
const links = [
  { linkName: "Products", path: "/products" },
  { linkName: <ShoppingCartIcon />, path: "/cart" },
];

// Define a NavLink component that renders a navigation link using React Router DOM
const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded='md'
    _hover={{ textDecoration: "none", bg: mode("gray.200", "gray.700") }}
  >
    {children}
  </Link>
);

// Define a Navbar component that displays a responsive navigation bar
const Navbar = () => {
  // Set up state and hooks for the navigation bar
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHovering, setIsHovering] = useState(false);

  // Get user information and dispatch function from Redux store
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const toast = useToast();

  // Define a function to handle user logout
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: "You have been logged out.", status: "success", isClosable: true });
  };

  // Render the navigation bar using Chakra UI components
  return (
    <Box bg={mode("gray.100", "gray.900")} px={4}>
      {/* Navbar header */}
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        {/* Hamburger icon for mobile view */}
        <IconButton
          size='md'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack>
          {/* Navbar brand */}
          <Link
            as={ReactLink}
            to='/'
            style={{ textDecoration: "none" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Flex alignItems='center'>
              <Icon as={GiTechnoHeart} h={6} w={6} color={isHovering ? "cyan.400" : "orange.400"} />
              <Text fontWeight='extrabold'>Tech Trader</Text>
            </Flex>
          </Link>

          {/* Navbar links */}
          <HStack as='nav' spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        {/* Navbar user menu and color mode toggle */}
        <Flex alignItems='center'>
          {/* Color mode toggle */}
          <Icon as={colorMode === "light" ? MoonIcon : SunIcon} alignSelf='center' onClick={() => toggleColorMode()} />

          {/* User menu */}
          {userInfo ? (
            <Menu>
              <MenuButton ml='4' px='4' py='2' transition='all 0.3s' as={Button}>
                {userInfo.name} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactLink} to='/profile'>
                  <CgProfile />
                  <Text ml='2'>Profile</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to='/your-orders'>
                  <MdLocalShipping />
                  <Text ml='2'>Your Orders</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to='/listings'>
                  <BsList />
                  <Text ml='2'>Listings</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>
                  <MdLogout />
                  <Text ml='2'>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              {/* Sign in button */}
              <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link'>
                Sign In
              </Button>

              {/* Sign up button */}
              <Button
                as={ReactLink}
                to='/registration'
                m={2}
                display={{ base: "none", md: "inline-flex" }}
                fontSize='sm'
                fontWeight={600}
                _hover={{ bg: "orange.400" }}
                bg='orange.500'
                color='white'
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {/* Navbar menu for mobile view */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as='nav' spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key='sign up' path='/registration'>
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
