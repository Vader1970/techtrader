// Importing necessary modules from Chakra-UI and react-redux
import {
  Box,
  Table,
  Tbody,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing redux actions to retrieve and reset products data
import { getProducts, resetProductError } from "../redux/actions/productActions";

// Importing custom components
import ProductTableItem from "./ProductTableItem";
import AddNewProduct from "./AddNewProduct";

// Defining a functional component named ProductsTab
const ProductsTab = () => {
  // Initializing necessary hooks
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { error, loading } = user;

  const productInfo = useSelector((state) => state.products);
  const { products, productUpdate } = productInfo;
  const toast = useToast();

  // useEffect hook to retrieve products data and reset error message
  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (productUpdate) {
      toast({ description: "Product has been updated.", status: "success", isClosable: true });
    }
  }, [dispatch, toast, productUpdate]);

  // Returning the JSX
  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Opps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify='center'>
          <Stack direction='row' spacing='4'>
            <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Box>
                      <Text fontWeight='bold'>Add a new listing</Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb='4'>
                <Table>
                  <Tbody>
                    <AddNewProduct />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant='simple' size='lg'>
            <Tbody>
              {products.length > 0 &&
                products.map((product) => <ProductTableItem key={product._id} product={product} />)}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProductsTab;
