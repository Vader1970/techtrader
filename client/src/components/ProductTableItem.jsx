// **Coded by Daniel Wilkey**//

// Importing required dependencies and components from Chakra UI and React
import {
  Button,
  Image,
  VStack,
  Textarea,
  Tooltip,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Badge,
  useDisclosure,
  Heading,
  Stack,
  Wrap,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { updateProduct, deleteProduct } from "../redux/actions/listingsActions";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert";

// Component to render each product in the table
const ProductTableItem = ({ product }) => {
  // Declaring variables and state hooks
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [brand, setBrand] = useState(product.brand);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const [productIsNew, setProductIsNew] = useState(product.productIsNew);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image.substring(8));
  const dispatch = useDispatch();

  // Function to dispatch an action to update the product in the store
  const onSaveProduct = () => {
    dispatch(updateProduct(brand, name, category, stock, price, product._id, productIsNew, description, image));
  };

  // Function to open the delete confirmation box
  const openDeleteConfirmBox = () => {
    onOpen();
  };

  // Rendering the component
  return (
    <>
      {/* This is a container for the form inputs */}
      <Wrap spacing='30px' justify='center' border='1px' borderColor='gray.600' my='20px'>
        <Stack direction={{ base: "column", lg: "row" }} align='center'>
          {/* Section for the product image */}
          <Stack my='20px'>
            <Heading fontSize='sm' fontWeight='extrabold' w='250px'>
              IMAGE
            </Heading>

            {/* This is an input field for the product image, with a callback to update the "image" state variable */}
            <Input size='sm' w='250px' value={image} onChange={(e) => setImage(e.target.value)} id={`image-${product._id}`} name={`image-${product._id}`} />

            {/* Tooltip to show the full image url  */}
            <Tooltip label={product.image} fontSize='sm'>
              <Image src={product.image} boxSize='250px' h='285px' fit='contain' />
            </Tooltip>
          </Stack>

          {/* Section for the product description */}
          <Stack>
            <Heading fontSize='sm' fontWeight='extrabold' w='250px'>
              DESCRIPTION
            </Heading>

            {/* This is an input field for the product description, with a callback to update the "description" state variable */}
            <Textarea
              w='250px'
              h='325px'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size='sm'
              id={`description-${product._id}`}
              name={`description-${product._id}`}
            />
          </Stack>

          {/* Section for the brand details */}
          <Stack>
            <Flex direction='column' gap='2' h='350px'>
              <Heading fontSize='sm' fontWeight='extrabold' w='250px'>
                BRAND
              </Heading>

              {/* This is an input field for the product brand, with a callback to update the "brand" state variable */}
              <Input size='sm' w='250px' value={brand} onChange={(e) => setBrand(e.target.value)} id={`brand-${product._id}`} name={`brand-${product._id}`} />
              <Heading fontSize='sm' fontWeight='extrabold' w='250px'>
                NAME
              </Heading>

              {/* This is an input field for the product name, with a callback to update the "name" state variable */}
              <Input size='sm' w='250px' value={name} onChange={(e) => setName(e.target.value)} id={`name-${product._id}`} name={`name-${product._id}`} />
              <Heading fontSize='sm' fontWeight='extrabold' w='250px'>
                CATEGORY
              </Heading>

              {/* This is an input field for the product category, with a callback to update the "category" state variable */}
              <Input size='sm' w='250px' value={category} onChange={(e) => setCategory(e.target.value)} id={`category-${product._id}`} name={`category-${product._id}`} />
              <Heading fontSize='sm' fontWeight='extrabold' w='250px'>
                PRICE
              </Heading>

              {/* This is an input field for the product price, with a callback to update the "price" state variable */}
              <Input size='sm' w='250px' value={price} onChange={(e) => setPrice(e.target.value)} id={`price-${product._id}`} name={`price-${product._id}`} />
              <Heading fontSize='sm' fontWeight='extrabold' w='250px'>
                STOCK
              </Heading>

              {/* This is an input field for the product stock, with a callback to update the "stock" state variable */}
              <Input size='sm' value={stock} onChange={(e) => setStock(e.target.value)} id={`stock-${product._id}`} name={`stock-${product._id}`} />

              {/* This is a container for the "New" badge toggle */}
              <FormControl display='flex' alignItems='center'>
                {/* This is a label for the "New" badge toggle */}
                <FormLabel htmlFor={`productIsNewFlag-${product._id}`} mb='0' fontSize='sm'>
                  Enable
                  {/* This is a badge for the "New" flag */}
                  <Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
                    New
                  </Badge>
                  badge?
                </FormLabel>

                {/* This is a toggle switch for the "New" badge */}
                <Switch
                  id={`productIsNewFlag-${product._id}`}
                  onChange={() => setProductIsNew(!productIsNew)}
                  isChecked={productIsNew}
                />
              </FormControl>
            </Flex>
          </Stack>

          <Stack>
            <VStack mb='20px'>
              {/* This is a button to remove the product */}
              <Button mb='20px' colorScheme='red' my='20px' w='160px' variant='outline' onClick={openDeleteConfirmBox}>
                <DeleteIcon mr='5px' />
                Remove Product
              </Button>

              {/* This is a button to save the changes made to the product */}
              <Button colorScheme='orange' w='160px' variant='outline' onClick={onSaveProduct}>
                <MdOutlineDataSaverOn style={{ marginRight: "5px" }} />
                Save Changes
              </Button>
            </VStack>
          </Stack>
        </Stack>
      </Wrap>

      {/* This is a confirmation dialog for deleting a product */}
      <ConfirmRemovalAlert
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={product}
        deleteAction={deleteProduct}
      />
    </>
  );
};

export default ProductTableItem;
