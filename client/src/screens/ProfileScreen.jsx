// **Coded by Supriya Sharma**//

// importing Chakra UI components
import {
  Box,
  Button,
  FormControl,
  Heading,
  Stack,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
  // renaming 'useColorModeValue' as 'mode'
  useColorModeValue as mode,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";

// importing 'useEffect' from React
import { useEffect } from "react";

// importing 'Formik' from the 'formik' library
import { Formik } from "formik";

// importing 'Yup' library for form validation
import * as Yup from "yup";

// importing 'useDispatch' and 'useSelector' from Redux
import { useDispatch, useSelector } from "react-redux";

// importing Redux actions
import {
  updateProfile,
  resetUpdateSuccess,
} from "../redux/actions/userActions";

// importing 'useLocation' from React Router
import { useLocation } from "react-router";

// importing 'Navigate' from React Router DOM
import { Navigate } from "react-router-dom";

const ProfileScreen = () => {
  // creating a reference to 'dispatch' function from Redux
  const dispatch = useDispatch();

  // creating a reference to the 'user' state from Redux store
  const user = useSelector((state) => state.user);

  // destructuring 'user' object into separate variables
  const { userInfo, error, loading, updateSuccess } = user;

  // creating a reference to the current location using 'useLocation' from React Router
  const location = useLocation();

  // creating a reference to 'toast' function from Chakra UI
  const toast = useToast();

  // using the 'useEffect' hook to run side-effect logic after component render
  useEffect(() => {
    // if 'updateSuccess' variable is true
    if (updateSuccess) {
      // show a success message using 'toast' function from Chakra UI
      toast({
        description: "Profile saved.",
        status: "success",
        isClosable: true,
      });
      // reset 'updateSuccess' state in Redux using the 'resetUpdateSuccess' action
      dispatch(resetUpdateSuccess());
    }
    // rerun the side-effect logic only when 'toast' or 'updateSuccess' variable changes
  }, [toast, updateSuccess]);

  // if 'userInfo' variable exists and is truthy
  return userInfo ? (
    // create a Chakra UI Box component with dynamic background color
    <Box bg={mode("white", "blue.900")}>
      {/* use the 'Formik' component from the 'formik' library to handle form values, validation, and submission */}
      <Formik
        // set initial form values using 'userInfo' object from Redux state
        initialValues={{
          email: userInfo.email,
          password: "",
          name: userInfo.name,
          confirmPassword: "",
        }}
        // set form validation rules using 'Yup' library
        validationSchema={Yup.object({
          // name field is required
          name: Yup.string().required("An name is required."),

          // email field is required and must be a valid email format
          email: Yup.string()
            .email("Invalid email.")
            .required("An email address is required."),
          // password field must be at least 1 character long
          password: Yup.string()
            .min(
              1,
              "Password is too short - must contain at least 1 character."
            )
            .required("Password is required."),
          // confirm password field must match the password field and be at least 1 character long
          confirmPassword: Yup.string()
            .min(
              1,
              "Password is too short - must contain at least 1 character."
            )
            .required("Password is required.")
            .oneOf([Yup.ref("password"), null], "Passwords must match."),
        })}
        // This is the form submission function for updating user profile information
        // It takes the user ID and new information as arguments and dispatches an action to update the profile
        // It is triggered when the form is submitted with the updated information
        onSubmit={(values) => {
          dispatch(
            updateProfile(
              userInfo._id,
              values.name,
              values.email,
              values.password
            )
          );
        }}
      >
        {/* // This is the form JSX that is rendered with the Formik library
            // It contains form inputs for the user to update their name, email, and password
            // It also renders an error message if there is an error with updating the profile */}
        {(formik) => (
          <Box
            bg={mode("white", "blue.900")}
            fontFamily="roboto"
            minH="100vh"
            maxW={{ base: "3xl", lg: "7xl" }}
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            {/* This is a stack of elements for the user to update their profile information */}
            <Stack
              spacing="10"
              direction={{ base: "column", lg: "row" }}
              align={{ lg: "flex-start" }}
            >
              <Stack flex="1.5" mb={{ base: "2xl", md: "none" }}>
                <Heading fontSize="2xl" fontWeight="extrabold">
                  Profile
                </Heading>
                {/* this is a stack of elements for the user to input their profile information */}
                <Stack spacing="6">
                  <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                    {/* This is an error message component that is only displayed if there is an error */}
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
                    {/* This is a stack of form inputs for the user to update their profile information */}
                    <Stack spacing="5">
                      <FormControl>
                        <TextField
                          type="text"
                          name="name"
                          placeholder="Your first and last name."
                          label="Full name"
                        />
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
                        <PasswordTextField
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          label="Confirm your password"
                        />
                      </FormControl>
                    </Stack>
                    <Stack spacing="6">
                      {/* This is the save button for the form */}
                      <Button
                        colorScheme="orange"
                        size="lg"
                        fontSize="md"
                        isLoading={loading}
                        type="submit"
                      >
                        Save
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              {/*This is a flex container for displaying the user's profile information */}
              <Flex
                direction="column"
                align="center"
                flex="1"
                bg={mode("white", "blue.900")}
              >
                <Card bg={mode("white", "blue.600")}>
                  <CardHeader>
                    <Heading size="md"> User Report</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box pt="2" fontSize="sm">
                        Registered on{" "}
                        {new Date(userInfo.createdAt).toDateString()}
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </Flex>
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  ) : (
    //Redirecting to login page with current location as state data
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
