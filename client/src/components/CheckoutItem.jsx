import { Flex, Select, useColorModeValue as mode, Image, Box, Text, Spacer, Divider } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";

const CheckoutItem = ({ cartItem }) => {
  // Destructure cartItem to extract required properties
  const { name, image, price, stock, qty, id } = cartItem;

  // Get access to the dispatch function from the redux store
  const dispatch = useDispatch();
  return (
    <>
      <Flex>
        {/* Display the image of the item */}
        <Image
          rounded='lg'
          width='120px'
          height='120px'
          fit='cover'
          src={image}
          alt={name}
          draggable='false'
          loading='lazy'
        />
        <Flex direction='column' align='stretch' flex='1' mx='2' spacing='4'>
          {/* Display the name of the item */}
          <Text noOfLines='2' maxW='150px'>
            {name}
          </Text>
          <Spacer />

          {/* Create a dropdown list of available quantity options for the item */}
          <Select
            maxW='64px'
            focusBorderColor={mode("orange.500", "orange.200")}
            value={qty}
            onChange={(e) => {
              // Dispatch an action to add the item to the cart with the new quantity
              dispatch(addCartItem(id, e.target.value));
            }}
          >
            {/* Map over an array of available stock and display each as an option */}
            {[...Array(stock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Select>
        </Flex>

        {/* Display the price of the item */}
        <Box>
          <Text fontWeight='bold'>${price}</Text>
        </Box>
      </Flex>

      {/* Create a divider line to separate each item */}
      <Divider bg={mode("gray.400", "gray.800")} />
    </>
  );
};

export default CheckoutItem;
