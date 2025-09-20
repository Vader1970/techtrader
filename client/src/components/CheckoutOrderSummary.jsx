// **Coded by Daniel Wilkey** //

// Importing components from Chakra UI
import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useToast,
} from "@chakra-ui/react";
// Importing components and hooks from React and react-router-dom
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { PhoneIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
// Importing action creators from our Redux store
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import { useEffect, useState, useCallback } from "react";
import CheckoutItem from "./CheckoutItem";
import PayPalButton from "./PayPalButton";
import { resetCart } from "../redux/actions/cartActions";

const CheckoutOrderSummary = () => {
  // Using Chakra UI's mode function to determine the text color based on color mode
  const colorMode = mode("gray.600", "gray.400");
  // Using Redux hooks to access data in our store
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;
  // Using state to manage the disabled state of the PayPal button
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // Using Redux's dispatch function to dispatch our action creators
  const dispatch = useDispatch();
  // Using react-router-dom's navigate function to navigate to another page
  const navigate = useNavigate();
  // Using Chakra UI's toast function to display error messages
  const toast = useToast();

  // A callback function that determines the shipping cost based on cart subtotal and whether express shipping was selected
  const shipping = useCallback(
    () => (expressShipping === "true" ? 14.99 : subtotal <= 1000 ? 4.99 : 0),
    [expressShipping, subtotal]
  );

  // A callback function that calculates the total price of the order, including shipping cost
  const total = useCallback(
    () => Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2),
    [shipping, subtotal]
  );

  // An effect hook that sets the disabled state of the PayPal button based on whether there is an error with the shipping information or the total price is less than or equal to 0
  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  // A function that is called when the payment is successful, dispatches an action to create the order, reset the order state, and reset the cart state, and then navigates to the order success page
  const onPaymentSuccess = async (data) => {
    try {
      // Wait for the order to be created successfully
      await dispatch(
        createOrder({
          orderItems: cart,
          shippingAddress,
          paymentMethod: data.paymentSource,
          paymentDetails: data,
          shippingPrice: shipping(),
          totalPrice: total(),
          userInfo,
        })
      );
      
      // Only reset and navigate if order creation was successful
      dispatch(resetOrder());
      dispatch(resetCart());
      navigate("/your-orders");
    } catch (error) {
      // Handle order creation errors
      toast({
        description: "Failed to create order. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // A function that is called when the payment fails, displays an error message
  const onPaymentError = () => {
    toast({
      description:
        "Something went wrong during the payment process. Please try again or make sure that your PayPal account balance is enough for this purchase.",
      status: "error",
      duration: "60000",
      isClosable: true,
    });
  };

  return (
    // A Stack component that displays the order summary.
    <Stack spacing='8' rounded='xl' padding='8' width='full'>
      {/* A Heading component that displays the text "Order Summary". */}
      <Heading size='md'>Order Summary</Heading>
      {/* A map function that iterates over each item in the cart and displays it using the CheckoutItem component. */}
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      {/* A Stack component that displays the subtotal, shipping, and total cost of the order. */}
      <Stack spacing='6'>
        {/* A Flex component that displays the subtotal. */}
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        {/* A Flex component that displays the shipping cost. */}
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {/* A Badge component that displays "Free" if the shipping cost is 0, or displays the shipping cost with a dollar sign if it's greater than 0. */}
            {shipping() === 0 ? (
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>

        {/* A Flex component that displays the total cost of the order. */}
        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            Total
          </Text>
          {/* The total cost of the order, displayed with a dollar sign. */}
          <Text fontSize='xl' fontWeight='extrabold'>
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>

      {/* A PayPalButton component that allows the user to pay for the order using PayPal. */}
      <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      />

      {/* A Box component that displays contact information for customer support. */}
      <Box align='center'>
        <Text fontSize='sm'>Have questions? or need help to complete your order?</Text>

        {/* A Flex component that displays three contact options (Live Chat, Phone, and Email) using icons and text. */}
        <Flex justifyContent='center' color={mode("orange.500", "orange.100")}>
          <Flex align='center'>
            <ChatIcon />
            <Text m='2'>Live Chat</Text>
          </Flex>
          <Flex align='center'>
            <PhoneIcon />
            <Text m='2'>Phone</Text>
          </Flex>
          <Flex align='center'>
            <EmailIcon />
            <Text m='2'>Email</Text>
          </Flex>
        </Flex>
      </Box>

      {/* A Divider component that separates the checkout summary from the "Continue Shopping" button. */}
      <Divider bg={mode("gray.400", "gray.800")} />

      {/* A Flex component that displays the text "or" and a link to the product page, which allows the user to continue shopping. */}
      <Flex justifyContent='center' my='6' fontWeight='semibold'>
        {/* Display a "Continue Shopping" link that takes the user back to the products page */}
        <p>or</p>
        <Link as={ReactLink} to='/products' ml='1'>
          Continue Shopping
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
