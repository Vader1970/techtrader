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
import { logout } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

const OrderSuccessScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: "You have been logged out.", status: "success", isClosable: true });
    navigate("/products");
  };
  return (
    <Wrap
      bg={mode("white", "blue.900")}
      justify='center'
      fontFamily='roboto'
      direction='column'
      align='center'
      minH='100vh'
    >
      <Alert
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

        <Stack mt='20px' minW='200px'>
          <Button colorScheme='teal' variant='outline' as={ReactLink} to='/your-orders'>
            Your Order
          </Button>
          <Button colorScheme='teal' variant='outline' as={ReactLink} to='/products'>
            Products
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={logoutHandler}>
            Logout
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};

export default OrderSuccessScreen;
