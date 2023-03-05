// Import required libraries and components
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink, useLocation } from "react-router-dom";
import PasswordTextField from "../components/PasswordTextField";
import TextField from "../components/TextField";
import { login } from "../redux/actions/userActions";

// Define the LoginScreen component
const LoginScreen = () => {
  // Declare required variables and hooks
  // React router hook for navigating between screens
  const navigate = useNavigate();
  // React router hook for accessing the current location
  const location = useLocation();
  // Redux hook for dispatching actions
  const dispatch = useDispatch();
  // Redirect path after successful login
  const redirect = "/products";
  // Chakra UI hook for displaying toast messages
  const toast = useToast();

  // Select user state from the Redux store
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  // Set breakpoint-dependent values for the heading and box
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  // Handle the redirect and toast message after successful login
  useEffect(() => {
    // If there is user info in the Redux store
    if (userInfo) {
      // If the user was redirected from another screen
      if (location.state?.from) {
        // Navigate back to the previous screen
        navigate(location.state.from);
      } else {
        // Otherwise, navigate to the redirect path
        navigate(redirect);
      }
      // Display a success toast message
      toast({
        description: "Login successful.",
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, location.state, toast]);

  // Render the login screen UI using Formik and Chakra UI components
  return (
    <Wrap
      bg={mode("white", "blue.900")}
      spacing="30px"
      justify="center"
      minHeight="100vh"
    >
      {/*Define initial form values and validation schema using Yup */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email.")
            .required("An email address is required."),
          password: Yup.string()
            .min(
              1,
              "Password is too short - must contain at least 1 character."
            )
            .required("Password is required."),
        })}
        // Handle form submission using the login action from the userActions Redux module
        onSubmit={(values) => {
          dispatch(login(values.email, values.password));
        }}
      >
        {(formik) => (
          // Render the form using Chakra UI components
          <Container
            bg={mode("white", "blue.900")}
            maxW="lg"
            py={{ base: "12", md: "24" }}
            px={{ base: "0", md: "8" }}
            minH="4xl"
          >
            <Stack fontFamily="roboto" spacing="8">
              <Stack spacing="6">
                <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                  <Heading size={headingBR}>Log in to your account</Heading>
                  <HStack spacing="1" justify="center">
                    <Text color="muted">Don't have an account ?</Text>
                    <Button
                      as={ReactLink}
                      to="/registration"
                      variant="link"
                      colorScheme="orange"
                    >
                      Sign up
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: "0", md: "8" }}
                px={{ base: "4", md: "10" }}
                bg={{ boxBR }}
                boxShadow={{ base: "none", md: "xl" }}
              >
                <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status="error"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <AlertIcon />
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing="5">
                    <FormControl>
                      <TextField
                        type="text"
                        name="email"
                        placeholder="you@example.com"
                        label="Email"
                      />
                      <PasswordTextField
                        type="password"
                        name="password"
                        placeholder="your password"
                        label="Password"
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      colorScheme="orange"
                      size="lg"
                      fontSize="md"
                      isLoading={loading}
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        )}
      </Formik>
    </Wrap>
  );
};

export default LoginScreen;
