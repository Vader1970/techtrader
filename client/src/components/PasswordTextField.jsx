// **Coded by Supriya Sharma**//

// This code exports a component called PasswordTextField that renders an input field for passwords, with a button to toggle the password's visibility.
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";
import { useState } from "react";
import { InputRightElement, Button, InputGroup } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Define the PasswordTextField component, which accepts label, type, name, and placeholder props
const PasswordTextField = ({ label, type, name, placeholder }) => {
  // Initialize the showPassword state to false
  const [showPassword, setShowPassword] = useState(false);
  // Use the useField hook from Formik to manage the input field's state and validation
  const [field, meta] = useField({ type, name, placeholder });

  // Render a FormControl component to wrap the input field, and display an error message if the input is invalid
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb='6'>
      {/* Render a label for the input field */}
      <FormLabel htmlFor={name} noOfLines={1}>{label}</FormLabel>
      {/* Render an InputGroup component to contain the input field and the toggle password visibility button */}
      <InputGroup>
        {/* Use the Field component from Formik to render the input field */}
        <Field 
          as={Input} 
          {...field} 
          type={showPassword ? "text" : type} 
          name={name} 
          id={name}
          placeholder={placeholder} 
          autoComplete="current-password"
        />
        {/* Render an InputRightElement component to contain the toggle password visibility button */}
        <InputRightElement h='full'>
          {/* Render a Button component to toggle the password's visibility */}
          <Button variant='ghost' onClick={() => setShowPassword((showPassword) => !showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {/* Display an error message if the input is invalid */}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

// Export the PasswordTextField component as the default export of this module
export default PasswordTextField;
