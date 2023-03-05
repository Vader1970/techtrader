// Import required dependencies and components
import { Box, Heading, VStack, FormControl, Flex, Stack, Text, Radio, RadioGroup, Tooltip} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useDispatch } from "react-redux";
import { setExpress } from "../redux/actions/cartActions";
import { useState } from "react";
import { setShippingAddress, setShippingAddressError } from "../redux/actions/orderActions";
import { model } from "mongoose";

const ShippingInformation = () => {
  // Initialize required state variables
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);

  // Define function to handle input error states
  const setErrorState = (input, data) => {
    // If the input is not present, update the shipping address
    if (!input) {
      dispatch(setShippingAddress(data));
    }

    // If the input and form states have not changed, return
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      // Otherwise, set the form state and update shipping address error
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  // Initialize Formik component with initial values and validation schema
  return (
    <Formik
      initialValues={{ address: "", postalCode: "", city: "", country: "" }}
      validationSchema={Yup.object({
        address: Yup.string().required("This field is required.").min(2, "This address is too short."),
        postalCode: Yup.string().required("This field is required.").min(2, "This postal code is too short."),
        city: Yup.string().required("This field is required.").min(2, "This city is too short."),
        country: Yup.string().required("This field is required.").min(2, "This country is too short."),
      })}
    >
      {(formik) => (
        // Render a form using VStack and FormControl Chakra UI components
        <VStack as='form'>
          <FormControl
            // Update error state based on form validation and input states
            onChange={
              Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }
          >
            {/* Render address field using TextField component */}
            <TextField name='address' placeholder='Street Address' label='Street Address' />
            <Flex>
              <Box flex='1' mr='10'>
                {/* Render postal code field using TextField component */}
                <TextField name='postalCode' placeholder='Postal Code' label='Postal Code' type='number' />
              </Box>
              <Box flex='2'>
                {/* Render city field using TextField component */}
                <TextField name='city' placeholder='City' label='City' />
              </Box>
            </Flex>

            {/* Render country field using TextField component */}
            <TextField name='country' placeholder='Country' label='Country' />
          </FormControl>
          <Box w='100%' h='180px' pr='5'>
            {/* Render shipping method section using Heading, RadioGroup, and Stack components */}
            <Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
              Shipping Method
            </Heading>
            <RadioGroup
              defaultValue='false'
              // Update express delivery state using setExpress action
              onChange={(e) => {
                dispatch(setExpress(e));
              }}
            >
              {/* A Stack is used to align the radio buttons horizontally on larger screens, but stacked on smaller screens.  */}
              {/* The first stack is given a flex value of 1.5 to take up more space on larger screens. */}
              <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
                {/* The first stack contains the Express option.  */}
                {/* A Box is used to wrap the Radio component to add some margin around it. */}
                <Stack pr='10' spacing={{ base: "8", md: "10" }} flex='1.5'>
                  <Box>
                    <Radio value='true'>
                      <Text fontWeight='bold'>Express 14.99</Text>
                      <Text>Dispatched in 24 hours.</Text>
                    </Radio>
                  </Box>

                  {/* A Stack is used to display "Express" below the Express radio button.  */}
                  <Stack spacing='6'>Express</Stack>
                </Stack>

                {/* The second radio button is for the Standard option.  */}
                {/* A Tooltip is used to display a message when the user hovers over the radio button.  */}
                {/* A Box is used to wrap the Radio component to add some margin around it. */}
                <Radio value='false'>
                  <Tooltip label='Free shipping for orders of $1000 or more!'>
                    <Box>
                      <Text fontWeight='bold'>Standard $4.99</Text>
                      <Text>Dispatched in 2 - 3 days</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInformation;
