import { Box, Stack, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, useColorModeValue as mode } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import OrdersTab from "../components/OrdersTab";

const ListingsScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (userInfo) {
  //       dispatch(getUserListings());
  //     }
  //   }, [userInfo, dispatch]);

  return userInfo ? (
    <Box bg={mode("white", "blue.900")} p='20px' minH='100vh'>
      <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
        <Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' nb={{ base: 12, md: "none" }}>
          <Heading fontFamily='archivo black' fontSize='2xl' fontWeight='extrabold'>
            Listings
          </Heading>
          <Tabs size='md' variant='enclosed'>
            <TabList>
              {/* <Tab>Products</Tab>
              <Tab>Reviews</Tab> */}
              <Tab color={mode("blue.600", "white")}>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{/* <ProductTab /> */}</TabPanel>
            </TabPanels>
            <TabPanels>
              <TabPanel>
                <OrdersTab />
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
