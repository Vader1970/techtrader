// This code defines a component called ProductsScreen, which displays a list of products. The component first initializes the dispatch function using the useDispatch hook from React Redux. It then uses the useSelector hook to get the product list from the Redux store, and extracts the loading, error, and products properties from it.

// The component also uses the useEffect hook to dispatch an action to get the products on component mount.

// The main rendering logic happens within a Wrap component. If the products are loading, a Spinner component is rendered. If there's an error, an Alert component is rendered. Otherwise, the products array is mapped over and a WrapItem component is rendered for each product. Each WrapItem contains a ProductCard component wrapped in a Center component.

// Import necessary components and functions from Chakra UI, React Redux, and React
import {
  Center,
  Wrap,
  WrapItem,
  Spinner,
  Stack,
  useColorModeValue as mode,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { useEffect } from "react";

// Define the ProductsScreen component
const ProductsScreen = () => {
  // Initialize the dispatch function
  const dispatch = useDispatch();

  // Use the useSelector hook to get the product list from the Redux store
  const productList = useSelector((state) => state.products);

  // Extract the loading, error, and products properties from the product list
  const { loading, error, products } = productList;

  // Use the useEffect hook to dispatch an action to get the products on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Render the component
  return (
    // Render a Wrap component with a background color that depends on the color mode
    <Wrap
      bg={mode("white", "blue.900")}
      spacing="30px"
      justify="center"
      minHeight="100vh"
    >
      {loading ? (
        // If the products are loading, render a Spinner component
        <Stack direction="row" spacing={4}>
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        </Stack>
      ) : // If there's an error, render an Alert component with an error status
      error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        // Otherwise, map over the products and render a WrapItem with a ProductCard component inside a Center component
        products.map((product) => (
          <WrapItem fontFamily="roboto" key={product._id}>
            <Center w="250px" h="550px">
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};

// Export the ProductsScreen component
export default ProductsScreen;
