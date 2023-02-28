// Need to comment

import { Box, Stack, Heading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ProductTab from "../components/ProductsTab";

const ListingsScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <Box p='20px' minH='100vh'>
      <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
        <Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' nb={{ base: 12, md: "none" }}>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            Listings
          </Heading>
          <Tabs size='md' variant='enclosed'>
            <TabList>
              <Tab>Products</Tab>
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
