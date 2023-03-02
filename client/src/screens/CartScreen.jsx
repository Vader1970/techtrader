// Here is a step-by-step breakdown of what the component does:

// Import statements: The component imports various components from the Chakra UI library, including Box, Flex, Heading, HStack, Link, Stack, and Spinner. It also imports the useSelector hook from the react-redux library to access the state of the cart from the Redux store.

// The CartScreen component: The component is defined as a functional component that returns JSX to be rendered on the screen.

// cartInfo and destructuring: The component uses the useSelector hook to access the state of the cart from the Redux store, and stores it in the cartInfo variable. The cartInfo object is then destructured to get its properties - loading, error, and cart.

// getHeadingContent function: This function returns a string that indicates the number of items in the cart. If there is only one item, the string says "(1 Item)", otherwise it says (${cart.length} Items), where cart.length is the number of items in the cart.

// JSX return: The component returns JSX to be rendered on the screen. If the cart is still loading, a spinner is shown. If there was an error loading the cart, an error message is displayed. If the cart is empty, a warning message is displayed encouraging the user to continue shopping. If the cart has items, it displays a box with the heading "Shopping Cart" followed by the result of the getHeadingContent function. The items in the cart are displayed using the CartItem component, and the order summary is displayed using the CartOrderSummary component.

// Export default: The component is exported as the default export, making it available for use in other parts of the application.

import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartOrderSummary from "../components/CartOrderSummary";

// CartScreen is a functional component that renders the Shopping Cart page
const CartScreen = () => {
  // Use the useSelector hook to retrieve the cart state from the Redux store
  const cartInfo = useSelector((state) => state.cart);
  // Destructure the values from the cartInfo object
  const { loading, error, cart } = cartInfo;

  // getHeadingContent returns a string indicating the number of items in the cart
  const getHeadingContent = () => (cart.length === 1 ? "(1 Item)" : `(${cart.length} Items)`);

  // The component returns JSX that renders different content depending on the state of the cart
  return (
    <Wrap bg={mode("white", "blue.900")} fontFamily='roboto' spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        // If the cart is loading, render a spinner
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ) : error ? (
        // If there is an error loading the cart, render an error message
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : cart.length <= 0 ? (
        // If the cart is empty, render a warning message with a link to the products page
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle>Your cart is empty.</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to='/products'>
              Click here to see our products.
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        // If the cart is not empty, render the cart items and the order summary
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx='auto'
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex='2'>
              {/* Heading with the number of items in the cart */}
              <Heading fontSize='2xl' fontWeight='extrabold'>
                Shopping Cart {getHeadingContent()}
              </Heading>
              {/* Map through the items in the cart and show each one with a CartItem component */}
              <Stack spacing='6'>
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            {/* Show the order summary */}
            <Flex direction='column' align='center' flex='1'>
              <CartOrderSummary />
              {/* Link to continue shopping */}
              <HStack mt='6' fontWeight='semibold'>
                <p>or</p>
                <Link as={ReactLink} to='/products' color={mode("blue.600", "white")}>
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartScreen;
