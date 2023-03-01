import {
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  ListItem,
  UnorderedList,
  AlertTitle,
  Wrap,
  useColorModeValue as mode,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../redux/actions/userActions";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const YourOrdersScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, []);

  return userInfo ? (
    <>
      <Wrap bg={mode("white", "blue.900")} spacing='10px' justify='center' minHeight='100vh'>
        {loading ? (
          <Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh'>
            <Stack direction='row'>
              <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
            </Stack>
          </Wrap>
        ) : error ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          orders && (
            <Stack>
              <Wrap>
                <Stack>
                  {orders.map((order) => (
                    <Stack key={order._id}>
                      <Stack
                        direction={{ base: "column", lg: "row" }}
                        spacing='20px'
                        justify='center'
                        border='1px'
                        borderColor='gray.600'
                        my='20px'
                        p='20px'
                        w='100vw'
                      >
                        <Box p='10px'>
                          <Heading fontSize='m' mb='10px' fontWeight='extrabold' w='200px'>
                            Oder ID
                          </Heading>
                          {order._id}
                        </Box>

                        <Box p='10px'>
                          <Heading fontSize='m' mb='10px' fontWeight='extrabold' w='100px'>
                            Order Date
                          </Heading>
                          {new Date(order.createdAt).toDateString()}
                        </Box>

                        <Box p='10px'>
                          <Heading fontSize='m' mb='10px' fontWeight='extrabold' w='100px'>
                            Paid Total
                          </Heading>
                          ${order.totalPrice} via {order.paymentMethod}
                        </Box>
                        <Box p='10px'>
                          <Heading fontSize='m' mb='10px' fontWeight='extrabold'>
                            Items
                          </Heading>
                          {order.orderItems.map((item) => (
                            <UnorderedList key={item._id}>
                              <ListItem maxW='380px'>
                                {item.qty} x {item.name} (${item.price} ech)
                              </ListItem>
                            </UnorderedList>
                          ))}
                        </Box>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Wrap>
            </Stack>
          )
        )}
      </Wrap>
    </>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default YourOrdersScreen;
