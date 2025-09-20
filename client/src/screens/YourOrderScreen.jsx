// **Coded by Daniel Wilkey** //

// This component renders the user's orders on the "Your Orders" screen.
// It fetches the orders from the Redux store using the getUserOrders action.
// If the user is not authenticated, it redirects to the login screen.

// imports the following components and functions from Chakra UI and React:
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

  // Select the user's orders, loading state, error message, and user info from the Redux store
  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;

  // Get the current location using React Router's useLocation hook
  const location = useLocation();

  // Fetch the user's orders from the server if the user is authenticated
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [dispatch, userInfo]);

  // Render the user's orders or redirect to the login screen if the user is not authenticated
  return userInfo ? (
    <>
      <Wrap
        bg={mode("white", "blue.900")}
        spacing="10px"
        justify="center"
        minHeight="100vh"
      >
        {/* Show a spinner if the orders are still loading */}
        {loading ? (
          <Wrap
            justify="center"
            direction="column"
            align="center"
            mt="20px"
            minH="100vh"
          >
            <Stack direction="row">
              <Spinner
                mt={20}
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.200"
                color="orange.500"
                size="xl"
              />
            </Stack>
          </Wrap>
        ) : // Show an error message if there was an error loading the orders
        error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          // If there are orders to display, map over them and create a stack for each order
          orders && (
            <Stack>
              <Wrap>
                <Stack>
                  {orders.map((order) => (
                    <Stack key={order._id}>
                      <Stack
                        direction={{ base: "column", lg: "row" }}
                        spacing="20px"
                        justify="center"
                        border="1px"
                        borderColor="gray.600"
                        my="20px"
                        p="20px"
                        w="100vw"
                      >
                        {/* Display the order ID */}
                        <Box p="10px">
                          <Heading
                            fontSize="m"
                            mb="10px"
                            fontWeight="extrabold"
                            w="200px"
                          >
                            Oder ID
                          </Heading>
                          {order._id}
                        </Box>

                        {/* Display the order date */}
                        <Box p="10px">
                          <Heading
                            fontSize="m"
                            mb="10px"
                            fontWeight="extrabold"
                            w="100px"
                          >
                            Order Date
                          </Heading>
                          {new Date(order.createdAt).toDateString()}
                        </Box>

                        {/* Display the total price paid and the payment method */}
                        <Box p="10px">
                          <Heading
                            fontSize="m"
                            mb="10px"
                            fontWeight="extrabold"
                            w="100px"
                          >
                            Paid Total
                          </Heading>
                          ${order.totalPrice} via {order.paymentMethod}
                        </Box>

                        {/* Display a list of ordered items */}
                        <Box p="10px">
                          <Heading
                            fontSize="m"
                            mb="10px"
                            fontWeight="extrabold"
                          >
                            Items
                          </Heading>
                          {order.orderItems.map((item) => (
                            <UnorderedList key={item._id}>
                              <ListItem maxW="380px">
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
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default YourOrdersScreen;
