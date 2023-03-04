// Import necessary modules from Chakra-UI, React-Redux, and React-Router-DOM
import { Box, Heading, Stack, Flex, useColorModeValue as mode } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Import components required for the Checkout screen
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import ShippingInformation from "../components/ShippingInformation";

// Define the Checkout screen component
const CheckoutScreen = () => {
  const user = useSelector((state) => state.user);

  // Retrieve the user data from the Redux store
  const { userInfo } = user;

  // Retrieve the current location using the React-Router-DOM
  const location = useLocation();

  // If user is logged in, render the checkout screen, otherwise redirect to the login screen
  return userInfo ? (
    <Stack bg={mode("white", "blue.900")}>
      <Box
        bg={mode("white", "blue.900")}
        minH='100vh'
        maxW={{ base: "3xl", lg: "7xl" }}
        mx='auto'
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
          <Stack spacing={{ base: "8", md: "10" }} flex='1.5' mb={{ base: "12", md: "none" }}>
            <Heading fontSize='2xl' fontWeight='extrabold'>
              Shipping Information
            </Heading>
            <Stack spacing='6'>
              <ShippingInformation />
            </Stack>
          </Stack>
          <Flex direction='column' align='center' flex='1'>
            <CheckoutOrderSummary />
          </Flex>
        </Stack>
      </Box>
    </Stack>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

// Export the Checkout screen component as the default export
export default CheckoutScreen;
