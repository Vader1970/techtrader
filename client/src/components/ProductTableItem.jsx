import {
  Tr,
  Td,
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
  SimpleGrid,
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

const ProductTableItem = ({ product }) => {
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

  const onSaveProduct = () => {
    dispatch(updateProduct(brand, name, category, stock, price, product._id, productIsNew, description, image));
  };

  const openDeleteConfirmBox = () => {
    onOpen();
  };

  return (
    <>
      <Wrap spacing='30px' justify='center'>
        <Stack direction={{ base: "column", lg: "row" }} align='center'>
          <Stack my='20px'>
            <Heading fontSize='sm' fontWeight='extrabold' w='270px'>
              IMAGE
            </Heading>
            <Input size='sm' w='270px' value={image} onChange={(e) => setImage(e.target.value)} />
            <Tooltip label={product.image} fontSize='sm'>
              <Image src={product.image} boxSize='270px' h='285px' fit='contain' />
            </Tooltip>
          </Stack>
          <Stack>
            <Heading fontSize='sm' fontWeight='extrabold' w='270px'>
              DESCRIPTION
            </Heading>
            <Textarea
              w='270px'
              h='325px'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size='sm'
            />
          </Stack>
          <Stack>
            <Flex direction='column' gap='2' h='350px'>
              <Heading fontSize='sm' fontWeight='extrabold' w='270px'>
                BRAND
              </Heading>
              <Input size='sm' w='270px' value={brand} onChange={(e) => setBrand(e.target.value)} />
              <Heading fontSize='sm' fontWeight='extrabold' w='270px'>
                NAME
              </Heading>
              <Input size='sm' w='270px' value={name} onChange={(e) => setName(e.target.value)} />
              <Heading fontSize='sm' fontWeight='extrabold' w='270px'>
                CATEGORY
              </Heading>
              <Input size='sm' w='270px' value={category} onChange={(e) => setCategory(e.target.value)} />
              <Heading fontSize='sm' fontWeight='extrabold' w='270px'>
                PRICE
              </Heading>
              <Input size='sm' w='270px' value={price} onChange={(e) => setPrice(e.target.value)} />
              <Heading fontSize='sm' fontWeight='extrabold' w='270px'>
                STOCK
              </Heading>
              <Input size='sm' value={stock} onChange={(e) => setStock(e.target.value)} />
              <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
                  Enable
                  <Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
                    New
                  </Badge>
                  badge?
                </FormLabel>
                <Switch
                  id='productIsNewFlag'
                  onChange={() => setProductIsNew(!productIsNew)}
                  isChecked={productIsNew}
                />
              </FormControl>
            </Flex>
          </Stack>

          <Stack>
            <VStack>
              <Button colorScheme='red' my='20px' w='160px' variant='outline' onClick={openDeleteConfirmBox}>
                <DeleteIcon mr='5px' />
                Remove Product
              </Button>
              <Button colorScheme='orange' w='160px' variant='outline' onClick={onSaveProduct}>
                <MdOutlineDataSaverOn style={{ marginRight: "5px" }} />
                Save Changes
              </Button>
            </VStack>
          </Stack>
        </Stack>
      </Wrap>
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
