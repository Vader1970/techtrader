import {
  Box,
  Stack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ProductTab from "../components/ProductsTab";

const ListingsScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <Box bg={mode("white", "blue.900")} minH='100vh'>
      <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
        <Stack p='20px' spacing={{ base: 8, md: 10 }} flex='1.5' nb={{ base: 12, md: "none" }}>
          <Heading fontFamily='archivo black' fontSize='2xl' fontWeight='extrabold'>
            Listings
          </Heading>
          <Tabs size='md' variant='enclosed'>
            <TabList>
              <Tab color={mode("blue.600", "white")}>Products</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProductTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default ListingsScreen;
