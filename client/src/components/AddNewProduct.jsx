import {
  Tr,
  Td,
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

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const createNewProduct = () => {
    dispatch(uploadProduct({ brand, name, category, stock, price, image, productIsNew, description }));
  };
  return (
    <Wrap spacing='30px' justify='center'>
      <Stack direction={{ base: "column", lg: "row" }} align='center'>
        <Stack my='20px'>
          <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
            Image file name
          </Heading>
          <Tooltip label={"Set the name of your image e.g., iPhone.jpg"} fontSize='sm'>
            <Input
              size='sm'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              h='325px'
              placeholder='e.g., iPhone.jpg'
              sx={{
                position: "relative",
                "&::placeholder": {
                  textAlign: "left",
                  verticalAlign: "top",
                  position: "absolute",
                  top: 0,
                  left: 2,
                  transform: "translate(0, 40%)",
                },
              }}
            />
          </Tooltip>
        </Stack>
        <Stack>
          <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
            Description
          </Heading>
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
          <Flex direction='column' gap='2' h='350px'>
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Brand
            </Heading>
            <Input
              size='sm'
              w='200px'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder='Apple or Samsung etc.'
            />
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
            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Price
            </Heading>
            <Input size='sm' w='200px' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='$299.99' />

            <Heading fontSize='sm' fontWeight='extrabold' w='200px'>
              Stock
            </Heading>
            <Input size='sm' w='200px' value={stock} onChange={(e) => setStock(e.target.value)} />
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
          <Button variant='outline' w='160px' my='20px' colorScheme='orange' onClick={() => createNewProduct()}>
            <MdDriveFolderUpload />
            <Text ml='2'>Save Product</Text>
          </Button>
        </VStack>
      </Stack>
    </Wrap>
  );
};

export default AddNewProduct;
