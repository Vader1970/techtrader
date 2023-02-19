// Import necessary Chakra UI components and hooks
import { CloseButton, Flex, Select, useColorModeValue as mode, Stack, Image, Box, Text } from "@chakra-ui/react";

// Import Redux's useDispatch hook to enable dispatching actions to the store
import { useDispatch } from "react-redux";

// Import addCartItem and removeCartItem action creator functions
import { addCartItem, removeCartItem } from "../redux/actions/cartActions";

// This component renders a single item in the cart.
const CartItem = ({ cartItem }) => {
  // Destructure cartItem props
  const { name, image, price, stock, qty, id } = cartItem;

  // Get reference to Redux store's dispatch function
  const dispatch = useDispatch();

  // Render the cart item with a responsive layout using Chakra UI Flex and Stack components.
  return (
    <Flex direction={{ base: "column", md: "row" }} justify='space-between' align='center'>
      <Stack direction='row' spacing='5' width='full'>
        {/* Display the item image using the Chakra UI Image component */}
        <Image rounded='lg' w='120px' h='120px' fit='cover' src={image} alt={name} draggable='false' loading='lazy' />
        <Box pt='4'>
          <Stack spacing='0.5'>
            {/* Display the item name using the Chakra UI Text component */}
            <Text fontWeight='medium'>{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w='full'
        mt={{ base: "4", md: "0" }}
        align={{ base: "center", md: "baseline" }}
        justify='space-between'
        display='flex'
      >
        {/* Allow the user to select the quantity of the item they want to purchase using the Chakra UI Select component */}
        <Select
          maxW='64px'
          // Use the Chakra UI useColorModeValue hook to dynamically set the focus border color based on the current color mode
          focusBorderColor={mode("orange.500", "orange.200")}
          value={qty}
          onChange={(e) => {
            // When the user selects a new quantity, dispatch the addCartItem action to update the cart in the store with the new quantity
            dispatch(addCartItem(id, e.target.value));
          }}
        >
          {/* Generate an option for each possible quantity of the item, up to the maximum stock level */}
          {[...Array(stock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Select>
        <Text fontWeight='bold'>${price}</Text>

        {/* Allow the user to remove the item from the cart using the Chakra UI CloseButton component */}
        <CloseButton onClick={() => dispatch(removeCartItem(id))} />
      </Flex>
    </Flex>
  );
};

// Export the CartItem component for use in other parts of the application
export default CartItem;
