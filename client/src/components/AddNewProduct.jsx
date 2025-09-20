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
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uploadProduct } from "../redux/actions/listingsActions";
import axios from "axios";

// Define a functional component named AddNewProduct
const AddNewProduct = () => {
  // Initialize state variables and a dispatch function using the useState and useDispatch hooks from Redux
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [brand, setBrand] = useState("");

  // These are the state variables for the form fields and the "New" badge toggle.
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Function to upload image to Cloudflare
  const uploadImageToCloudflare = async (file) => {
    setUploading(true);
    setUploadError("");
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              'Content-Type': 'application/json',
            },
          };
          
          const response = await axios.post('/api/images/upload', {
            imageData: base64Data,
            filename: file.name
          }, config);
          
          if (response.data.success) {
            setImageUrl(response.data.imageUrl);
            setUploadError("");
          } else {
            setUploadError("Failed to upload image");
          }
        } catch (error) {
          setUploadError("Failed to upload image: " + error.message);
        } finally {
          setUploading(false);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      setUploadError("Failed to process image: " + error.message);
      setUploading(false);
    }
  };

  // Define a function named createNewProduct which dispatches an action to upload the product details to the store
  // This function is called when the "Save Product" button is clicked.
  // It creates a new product object with the current form field values.
  const createNewProduct = () => {
    if (!imageUrl) {
      setUploadError("Please upload an image first");
      return;
    }
    
    dispatch(uploadProduct({ 
      brand, 
      name, 
      category, 
      stock, 
      price, 
      image: imageUrl, 
      productIsNew, 
      description 
    }));
  };

  // Render the component's UI
  return (
    <Wrap spacing='30px' justify='center'>
      <Stack direction={{ base: "column", lg: "row" }} align='center'>
        <Stack my='20px'>
          {/* A header for the image input field */}
          <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
            Upload Product Image
          </Heading>

          {/* A tooltip to guide the user in setting the image name */}
          <Tooltip label={"Choose image you wish to upload to Cloudflare."} fontSize='sm'>
            {/* Input element with given size, value and onChange function to set image state */}
            <Input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  uploadImageToCloudflare(file);
                }
              }}
              height='32px'
              disabled={uploading}
            />
          </Tooltip>

          {/* Upload status and error messages */}
          {uploading && (
            <Flex align="center" gap={2}>
              <Spinner size="sm" />
              <Text fontSize="sm">Uploading to Cloudflare...</Text>
            </Flex>
          )}

          {uploadError && (
            <Alert status="error" size="sm">
              <AlertIcon />
              {uploadError}
            </Alert>
          )}

          {/* Display uploaded image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt='uploaded product'
              style={{ maxWidth: "100%", height: "285px", marginTop: "10px" }}
            />
          )}

          {/* Fallback: Display selected image before upload */}
          {image && !imageUrl && !uploading && (
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
            id='productDescription'
            name='productDescription'
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
              id='productBrand'
              name='productBrand'
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
              id='productName'
              name='productName'
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
              id='productCategory'
              name='productCategory'
            />

            {/* This is the "Price" field */}
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Price
            </Heading>
            <Input size='sm' w='200px' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='299.99' id='productPrice' name='productPrice' />

            {/* This is the "Stock" field */}
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Stock
            </Heading>
            <Input size='sm' w='200px' value={stock} onChange={(e) => setStock(e.target.value)} id='productStock' name='productStock' />

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
          <Button 
            variant='outline' 
            w='160px' 
            my='20px' 
            colorScheme='orange' 
            onClick={() => createNewProduct()}
            disabled={uploading || !imageUrl}
            isLoading={uploading}
          >
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
