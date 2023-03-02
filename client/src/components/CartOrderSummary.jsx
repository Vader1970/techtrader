import { Button, Flex, Heading, Stack, Text, useColorModeValue as mode, Badge } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";

const CartOrderSummary = () => {
  // State hook to track whether checkout button is loading
  const [buttonLoading, setButtonLoading] = useState();

  // Fixed shipping cost for standard shipping
  const standardShipping = Number(4.99).toFixed(2);

  // Redux hook to get cart items
  const cartItems = useSelector((state) => state.cart);

  // Extract subtotal from cart items
  const { subtotal } = cartItems;

  // React router hook for navigation
  const navigate = useNavigate();

  // Handler function for checkout button
  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate("/checkout");
  };

  return (
    // Order summary container
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' w='full'>
      {/* Order summary heading */}
      <Heading size='md'>Order Summary</Heading>
      <Stack spacing='6'>
        {/* Subtotal row */}
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode("gray.600", "gray.400")}>
            Subtotal
          </Text>
          <Text fontWeight='medium'>${subtotal}</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode("gray.600", "gray.400")}>
            Shipping
          </Text>

          {/* Shipping cost varies based on subtotal */}
          <Text fontWeight='medium'>
            {subtotal <= 1000 ? (
              standardShipping
            ) : (
              // Display free shipping badge for subtotals over $1000
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                Free
              </Badge>
            )}
          </Text>
        </Flex>

        {/* Total row */}
        <Flex justify='space-between'>
          <Text fontSize='xl' fontWeight='extrabold'>
            Total
          </Text>

          {/* Total is subtotal plus shipping, unless subtotal is over $1000 */}
          <Text fontSize='xl' fontWeight='extrabold'>
            $ {subtotal <= 1000 ? Number(subtotal) + Number(standardShipping) : subtotal}
          </Text>
        </Flex>
      </Stack>

      {/* Checkout button */}
      <Button
        as={ReactLink}
        to='/checkout'
        colorScheme='orange'
        size='lg'
        fontSize='md'
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
