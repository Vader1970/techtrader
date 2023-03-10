// **Coded by Supriya Sharma**//

// Import the necessary dependencies from Chakra UI and Formik
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

// Define a reusable text input field component
const TextField = ({ label, type, name, placeholder }) => {
  // Get the field and meta properties from Formik using the `useField` hook
  const [field, meta] = useField({ type, name, placeholder });

  // Return the input field wrapped in a FormControl component
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb="6">
      {/* Display the label for the input field */}
      <FormLabel noOfLines={1}>{label}</FormLabel>
      {/* Render the input field using the `Field` component from Formik */}
      <Field
        as={Input}
        {...field}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {/* Display an error message if the input is invalid */}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
// Export the TextField component as the default export of this module
export default TextField;
