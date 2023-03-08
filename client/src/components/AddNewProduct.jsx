// **Coded by Daniel Wilkey** //

// Import necessary dependencies from Chakra UI and React
import {
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
  Stack,
  Wrap,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../redux/actions/listingsActions";

// Define a functional component named AddNewProduct
const AddNewProduct = () => {
  // Initialize state variables and a dispatch function using the useState and useDispatch hooks from Redux
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");

  // These are the state variables for the form fields and the "New" badge toggle.
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Define a function named createNewProduct which dispatches an action to upload the product details to the store
  // This function is called when the "Save Product" button is clicked.
  // It creates a new product object with the current form field values.
  const createNewProduct = () => {
    dispatch(uploadProduct({ brand, name, category, stock, price, image: image.name, productIsNew, description }));
  };

  // Render the component's UI
  return (
    <Wrap spacing='30px' justify='center'>
      <Stack direction={{ base: "column", lg: "row" }} align='center'>
        <Stack my='20px'>
          {/* A header for the image input field */}
          <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
            Image file name
          </Heading>

          {/* A tooltip to guide the user in setting the image name */}
          <Tooltip label={"Set the name of your image e.g., iPhone.jpg"} fontSize='sm'>
            {/* Input element with given size, value and onChange function to set image state */}
            <Input
              type='file'
              accept='image/*'
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              height='32px'
            />
          </Tooltip>
          {/* Add an image tag to display the selected image */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt='selected file'
              style={{ maxWidth: "100%", height: "285px", marginTop: "10px" }}
            />
          )}
        </Stack>
        <Stack>
          {/* A header for the product description input field */}
          <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
            Description
          </Heading>

          {/* A textarea element to input product description */}
          <Textarea
            value={description}
            w='200px'
            h='325px'
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder='Description'
            size='sm'
          />
        </Stack>
        <Stack>
          {/* A column of input fields to set product details */}
          <Flex direction='column' gap='2' h='350px'>
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Brand
            </Heading>

            {/* An input field to set product brand */}
            <Input
              size='sm'
              w='200px'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder='Apple or Samsung etc.'
            />

            {/* This is the "Name" field */}
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Name
            </Heading>
            <Input
              size='sm'
              w='200px'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Samsung S30'
            />

            {/* This is the "Category" field */}
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Category
            </Heading>
            <Input
              size='sm'
              w='200px'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder='Electronics'
            />

            {/* This is the "Price" field */}
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Price
            </Heading>
            <Input size='sm' w='200px' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='$299.99' />

            {/* This is the "Stock" field */}
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Stock
            </Heading>
            <Input size='sm' w='200px' value={stock} onChange={(e) => setStock(e.target.value)} />

            {/* This is the "New" badge toggle */}
            <Text fontSize='sm'>New Badge shown on product card</Text>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
                Enable
                <Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
                  New
                </Badge>
                badge?
              </FormLabel>
              <Switch id='productIsNewFlag' onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
            </FormControl>
          </Flex>
        </Stack>

        <VStack>
          {/* When button is clicked, it triggers the createNewProduct function. */}
          <Button variant='outline' w='160px' my='20px' colorScheme='orange' onClick={() => createNewProduct()}>
            {/* This icon component is added to the button, representing a drive folder upload. */}
            <MdDriveFolderUpload />

            {/* This text component is added to the button, indicating the action that will be performed when the button is clicked. */}
            <Text ml='2'>Save Product</Text>
          </Button>
        </VStack>
      </Stack>
    </Wrap>
  );
};

export default AddNewProduct;
