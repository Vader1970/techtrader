// Importing necessary components from Chakra UI and React Router DOM
import {
  Button,
  Alert,
  AlertTitle,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";

// Importing actions and hook from Redux
import { logout } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

// Defining a functional component for the order success screen
const OrderSuccessScreen = () => {
  // Using hooks to access the current navigation and dispatch functions as well as the toast notification system
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  // Function to handle logout by dispatching the logout action, showing a success toast, and navigating back to the products page
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: "You have been logged out.", status: "success", isClosable: true });
    navigate("/products");
  };

  // Returning the JSX for the order success screen wrapped in a responsive wrapper with Chakra UI styles
  return (
    <Wrap
      bg={mode("white", "blue.900")}
      justify='center'
      fontFamily='roboto'
      direction='column'
      align='center'
      minH='100vh'
    >
      {/* Rendering an alert with a success message and icon */}
      <Alert
        bg={mode("white", "blue.900")}
        pt='4'
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='auto'
      >
        <AlertIcon boxSize='55px' />
        <AlertTitle pt='8px' fontSize='xl'>
          Payment Successful!
        </AlertTitle>

        {/* Rendering a stack of buttons with different functionalities */}
        <Stack mt='20px' minW='200px'>
          <Button colorScheme='blue' variant='outline' as={ReactLink} to='/your-orders'>
            Your Order
          </Button>
          <Button colorScheme='blue' variant='outline' as={ReactLink} to='/products'>
            Products
          </Button>
          <Button colorScheme='blue' variant='outline' onClick={logoutHandler}>
            Logout
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};

// Exporting the OrderSuccessScreen component as the default export
export default OrderSuccessScreen;
