// ** Coded by Tin Mariano **//

// This component takes in an object called product as its props. The code imports various components and utilities from the @chakra-ui/react library, react-icons/fi, react-router-dom, and redux.

// The Rating component is a child component of ProductCard. It takes in rating and numberOfReviews as props and displays them in the form of stars and text.

// The ProductCard component renders a card view of a product with its image, name, price, and rating. The addItem function is called when the user clicks the "Add to cart" button. It checks if the item is already in the cart and shows a toast message. Otherwise, it dispatches an action to add the item to the cart and shows a toast message.

// The code also uses the useSelector hook from react-redux to get the state of the cart from the store and display it accordingly.
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue as mode,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";

// A component for displaying the rating of a product
// rating - the average rating of the product
// numberOfReviews - the number of reviews the product has received
const Rating = ({ rating, numberOfReviews }) => {
  // state to keep track of the size of the star icons
  const { iconSize } = useState("14px");

  /* A Flex container to hold the star icons and the number of reviews */
  return (
    <Flex>
      {/* A horizontal stack to hold the StarIcons with a spacing of 2px */}
      <HStack spacing='2px'>
        {/* A StarIcon component with custom size, width and color */}
        <StarIcon size={iconSize} w='14px' color='orange.500' />

        {/* StarIcon components with dynamic color based on the rating */}
        <StarIcon size={iconSize} w='14px' color={rating >= 2 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 3 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 4 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 5 ? "orange.500" : "gray.200"} />
      </HStack>

      {/* A Text component to show the number of reviews */}
      <Text fontSize='md' fontWeight='bold' ml='4px'>
        {`${numberOfReviews} ${numberOfReviews === 1 ? "Review" : "Reviews"}`}
      </Text>
    </Flex>
  );
};

// A component for rendering a product card
const ProductCard = ({ product }) => {
  // hook to dispatch actions to Redux store
  const dispatch = useDispatch();

  // hook to show toast notifications
  const toast = useToast();

  // hook to get the cart from Redux store
  const cartInfo = useSelector((state) => state.cart);

  // extract cart from the cartInfo object
  const { cart } = cartInfo;

  // function to add an item to the cart
  // id - the id of the item to add
  const addItem = (id) => {
    // check if item is already in the cart
    if (cart.some((cartItem) => cartItem.id === id)) {
      toast({
        description: "This item is already in your cart. Go to your cart to change the amount.",
        status: "error",
        isClosable: true,
      });
    } else {
      // dispatch action to add item to cart
      dispatch(addCartItem(id, 1));
      // display success toast notification
      toast({ description: "Item has been added.", status: "success", isClosable: true });
    }
  };

  return (
    <Stack
      p='2'
      spacing='3px'
      bg={mode("white", "blue.900")}
      minW='240px'
      h='450px'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      position='relative'
    >
      {/* Show a "new" tag if the product is new */}
      {product.productIsNew && <Circle size='10px' position='absolute' top={2} right={2} bg='green.300' />}

      {/* Show a "sold out" tag if the product is out of stock */}
      {product.stock <= 0 && <Circle size='10px' position='absolute' top={2} right={2} bg='red.200' />}

      {/* Wrap the Image component in a Link component */}
      <Link as={ReactLink} to={`/product/${product._id}`} pt='2' cursor='pointer'>
        <Image p={4} src={product.image} alt={product.name} roundedTop='lg' />
      </Link>

      <Box flex='1' maxH='5' alignItems='baseline'>
        {product.stock <= 0 && (
          <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
            Sold out
          </Badge>
        )}
        {product.productIsNew && (
          <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
            New
          </Badge>
        )}
      </Box>

      {/* This Flex container aligns the product name and price at the top with the add to cart button at the bottom. */}
      <Flex mt='1' justifyContent='space-between' alignContent='center'>
        {/* This Link component is used to navigate to the product details page. */}
        <Link as={ReactLink} to={`/product/${product._id}`} pt='2' cursor='pointer'>
          {/* This Box component holds the product name and styles it with a large font and semibold weight. */}
          <Box fontSize='2xl' fontWeight='semibold' as='h4' lineHeight='tight'>
            {product.name}
          </Box>
        </Link>
      </Flex>

      {/* This Flex container holds the product rating and number of reviews */}
      <Flex justifyContent='space-between' alignContent='center' py='2'>
        <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
      </Flex>

      {/* This Flex container holds the product price and add to cart button. */}
      <Flex justify='space-between'>
        <Box fontSize='2xl' color={mode("gray.800", "white")}>
          {/* This Box component holds the currency symbol and styles it with a smaller font. */}
          <Box as='span' color={mode("gray.600", "white")} fontSize='lg'>
            $
          </Box>

          {/* This Box component displays the product price with 2 decimal places. */}
          {Number(product.price).toFixed(2)}
        </Box>

        {/* This Tooltip component displays a label when the mouse hovers over the add to cart button. */}
        <Tooltip label='Add to cart' bg='white' placement={"top"} color={"gray.800"} fontSize={"1.2em"}>
          {/* This Button component displays an add to cart icon and calls the addItem function when clicked. */}
          <Button variant='ghost' display={"flex"} isDisabled={product.stock <= 0} onClick={() => addItem(product._id)}>
            <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
