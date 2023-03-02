// Importing required modules and components
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
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { register } from "../redux/actions/userActions";

// Initializing required variables and hooks
const RegistrationScreen = () => {
  // navigation hook
  const navigate = useNavigate();

  // dispatch hook for redux actions
  const dispatch = useDispatch();

  // getting user state from redux store
  const user = useSelector((state) => state.user);

  // destructuring user state
  const { loading, error, userInfo } = user;

  // redirect URL after successful registration
  const redirect = "/products";

  // toast hook for showing messages
  const toast = useToast();

  // responsive heading size
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });

  // responsive background color
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  // useEffect hook to handle successful registration
  useEffect(() => {
    // if user info exists
    if (userInfo) {
      // redirect to the specified URL
      navigate(redirect);

      // show a success toast message
      toast({ description: "Account created. Welcome aboard.", status: "success", isClosable: true });
    }
    // dependencies for useEffect
  }, [userInfo, redirect, error, navigate, toast]);

  // Wrapping the form in a responsive container with a background color
  return (
    <Wrap bg={mode("white", "blue.900")} spacing='30px' justify='center' minHeight='100vh'>
      {/* using Formik library for form management and validation */}
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        // defining validation schema using Yup library
        validationSchema={Yup.object({
          // name field is required
          name: Yup.string().required("An name is required."),
          // email field is required and should be in the proper format
          email: Yup.string().email("Invalid email.").required("An email address is required."),
          // password field should contain at least one character
          password: Yup.string()
            .min(1, "Password is too short - must contain at least 1 character.")
            .required("Password is required."),
          // confirm password field should match password field
          confirmPassword: Yup.string()
            .min(1, "Password is too short - must contain at least 1 character.")
            .required("Password is required.")
            .oneOf([Yup.ref("password"), null], "Passwords must match."),
        })}
        // on form submission, dispatch a register action with the form data
        onSubmit={(values) => {
          dispatch(register(values.name, values.email, values.password));
        }}
      >
        {/* rendering the form inside the responsive container */}
        {(formik) => (
          <Container
            bg={mode("white", "blue.900")}
            fontFamily='roboto'
            maxW='lg'
            py={{ base: "12", md: "24" }}
            px={{ base: "0", md: "8" }}
            minH='4xl'
          >
            <Stack spacing='8'>
              <Stack spacing='6'>
                <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
                  <Heading size={headingBR}>Create an account.</Heading>
                  <HStack spacing='1' justify='center'>
                    <Text color='muted'>Already a user? </Text>
                    <Button as={ReactLink} to='/registration' variant='link' colorScheme='orange'>
                      Sign in
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
                {/* The Alert component is used to display an error message if there is an error during form submission. */}
                <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status='error'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      textAlign='center'
                    >
                      <AlertIcon />
                      <AlertTitle>We are sorry!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing='5'>
                    <FormControl>
                      <TextField type='text' name='name' placeholder='Your first and last name.' label='Full name' />
                      <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                      <PasswordTextField type='password' name='password' placeholder='your password' label='Password' />
                      <PasswordTextField
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm your password'
                        label='Confirm your password'
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing='6'>
                    <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                      Sign up
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

export default RegistrationScreen;
