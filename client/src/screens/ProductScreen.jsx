// This is a React component that renders a product page with details of a product. It uses the Chakra-UI library to style the page. Here are the key features of the code:

// It imports several modules from React, Chakra-UI, and other third-party libraries.

// It defines several states using the useState hook to store the user's input for rating, comments, and title.

// It retrieves the id parameter from the URL using the useParams hook.

// It uses the useEffect hook to dispatch an action to get the product details from the server. It also listens for changes in the cart, reviewSend, and questionSend states and displays appropriate notifications.

// It defines several helper functions that handle adding items to the cart, changing the amount, submitting reviews and questions, and checking if the user has already reviewed the product.

// It renders the product details, including the product image, name, price, stock status, and rating. It also renders a form to submit a review or question, and buttons to add the product to the cart or change the amount.
import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  useColorModeValue as mode,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Tooltip,
  Textarea,
  Input,
  Divider,
} from "@chakra-ui/react";
import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addCartItem } from "../redux/actions/cartActions";
import { useEffect, useState } from "react";
import {
  createProductReview,
  resetProductError,
  resetQuestionError,
  createQuestionReview,
} from "../redux/actions/productActions";

const ProductScreen = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [questionsComment, setQuestionsComment] = useState(" ");
  const [questionsTitle, setQuestionsTitle] = useState(" ");
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [questionBoxOpen, setQuestionBoxOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast();
  //redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product, reviewSend, questionSend } = products;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getProduct(id));

    if (reviewSend) {
      toast({ description: "Product review saved.", status: "success", isClosable: true });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }

    if (questionSend) {
      toast({ description: "Question sent.", status: "success", isClosable: true });
      dispatch(resetQuestionError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend, questionSend]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  const hasUserReviewed = () => product.reviews.some((item) => item.user === userInfo._id);

  const onSubmit = () => {
    dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
  };

  const onQuestionSubmit = () => {
    dispatch(createQuestionReview(product._id, userInfo._id, questionsComment, questionsTitle));
  };

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({ description: "Item has been added.", status: "success", isClosable: true });
  };

  return (
    <Wrap bg={mode("white", "blue.900")} spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx='auto'
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
              <Stack
                pr={{ base: "0", md: "12" }}
                spacing={{ base: "8", md: "4" }}
                flex='1.5'
                mb={{ base: "12", md: "none" }}
              >
                {product.productIsNew && (
                  <Badge rounded='full' w='40px' fontSize='0.8em' colorScheme='green'>
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge
                    fontFamily='roboto'
                    rounded='full'
                    w='70px'
                    fontSize='0.8em'
                    colorScheme='red'
                    alignSelf='center'
                  >
                    Sold out
                  </Badge>
                )}
                <Heading fontSize='2xl' fontWeight='extrabold'>
                  {product.name}
                </Heading>
                <Stack fontFamily='roboto' spacing='5'>
                  <Box>
                    <Text fontSize='xl'>${product.price}</Text>
                    <Flex>
                      <HStack spacing='2px'>
                        <StarIcon color='orange.500' />
                        <StarIcon color={product.rating >= 2 ? "orange.500" : "gray.200"} />
                        <StarIcon color={product.rating >= 3 ? "orange.500" : "gray.200"} />
                        <StarIcon color={product.rating >= 4 ? "orange.500" : "gray.200"} />
                        <StarIcon color={product.rating >= 5 ? "orange.500" : "gray.200"} />
                      </HStack>
                      <Text fontSize='md' fontWeight='bold' ml='4px'>
                        {product.numberOfReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight={"bold"}>Quantity</Text>
                  <Flex w='170px' p='5px' border='1px' borderColor='gray.200'>
                    <Button isDisabled={amount <= 1} onClick={() => changeAmount("minus")} align='center'>
                      <MinusIcon />
                    </Button>
                    <Text fontSize='30px' mx='30px' align='center'>
                      {amount}
                    </Text>
                    <Button isDisabled={amount >= product.stock} onClick={() => changeAmount("plus")} align='center'>
                      <SmallAddIcon w='20px' h='25px' />
                    </Button>
                  </Flex>
                  <Button isDisabled={product.stock === 0} colorScheme='orange' onClick={() => addItem()}>
                    Add to cart
                  </Button>
                  <Stack width='270px'>
                    <Flex alignItems='center'>
                      <BiPackage size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Free shipping if order is above $1000
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiCheckShield size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        2 year extended warranty
                      </Text>
                    </Flex>

                    <Flex alignItems='center'>
                      <BiSupport size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction='column' align='center' flex='1' _dark={{ bg: "blue.900" }}>
                <Image mb='30px' src={product.image} alt={product.name} />
              </Flex>
            </Stack>
            {userInfo && (
              <>
                <Tooltip label={hasUserReviewed() ? "You have already reviewed this product." : ""} fontSize='md'>
                  <Button
                    isDisabled={hasUserReviewed()}
                    my='20px'
                    w='140px'
                    colorScheme='orange'
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                  >
                    Write a review
                  </Button>
                </Tooltip>
                {reviewBoxOpen && (
                  <Stack mb='20px'>
                    <Wrap>
                      <HStack spacing='2px'>
                        <Button variant='outline' onClick={() => setRating(1)}>
                          <StarIcon color='orange.500' />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(2)}>
                          <StarIcon color={rating >= 2 ? "orange.500" : "gray.200"} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(3)}>
                          <StarIcon color={rating >= 3 ? "orange.500" : "gray.200"} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(4)}>
                          <StarIcon color={rating >= 4 ? "orange.500" : "gray.200"} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(5)}>
                          <StarIcon color={rating >= 5 ? "orange.500" : "gray.200"} />
                        </Button>
                      </HStack>
                    </Wrap>
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder='Review title (optional)'
                    />
                    <Textarea
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder={`The ${product.name} is...`}
                    />
                    <Button w='140px' colorScheme='orange' onClick={() => onSubmit()}>
                      Publish review
                    </Button>
                  </Stack>
                )}
              </>
            )}
            <Stack>
              <Text fontSize='xl' fontWeight='bold'>
                Reviews
              </Text>
              <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing='2px' alignItems='center'>
                      <StarIcon color='orange.500' />
                      <StarIcon color={review.rating >= 2 ? "orange.500" : "gray.200"} />
                      <StarIcon color={review.rating >= 3 ? "orange.500" : "gray.200"} />
                      <StarIcon color={review.rating >= 4 ? "orange.500" : "gray.200"} />
                      <StarIcon color={review.rating >= 5 ? "orange.500" : "gray.200"} />
                      <Text fontWeight='semibold' ml='4px'>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py='12px'>{review.comment}</Box>
                    <Text fontSize='sm' color='gray.400'>
                      by {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
            <Divider mt='40px' mb='20px' />
            {userInfo && (
              <>
                <Button my='20px' w='140px' colorScheme='orange' onClick={() => setQuestionBoxOpen(!questionBoxOpen)}>
                  Ask a question
                </Button>
                {questionBoxOpen && (
                  <Stack mb='20px'>
                    <Input
                      onChange={(e) => {
                        setQuestionsTitle(e.target.value);
                      }}
                      placeholder='Question title (optional)'
                    />
                    <Textarea
                      onChange={(e) => {
                        setQuestionsComment(e.target.value);
                      }}
                      placeholder='Ask question here...'
                    />
                    <Button w='140px' colorScheme='orange' onClick={() => onQuestionSubmit()}>
                      Send question
                    </Button>
                  </Stack>
                )}
                <Stack>
                  <Text fontSize='xl' fontWeight='bold'>
                    Questions
                  </Text>
                  <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                    {product.questions.map((question) => (
                      <Box key={question._id}>
                        <Flex spacing='2px' alignItems='center'>
                          <Text fontWeight='semibold'>{question.questionsTitle && question.questionsTitle}</Text>
                        </Flex>
                        <Box py='12px'>{question.questionsComment}</Box>
                        <Text fontSize='sm' color='gray.400'>
                          by {question.questionsName}, {new Date(question.createdAt).toDateString()}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Stack>
              </>
            )}
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
