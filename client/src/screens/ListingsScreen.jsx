// **Coded by Daniel Wilkey** //

// Importing required modules from Chakra UI, Redux, and React Router DOM
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

// Defining ListingsScreen functional component
const ListingsScreen = () => {
  // Retrieving user information from the Redux store
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  // Retrieving current location from React Router DOM
  const location = useLocation();

  // If user information is available, display the listings page, otherwise redirect to login page
  return userInfo ? (
    // Rendering main container with background color
    <Box bg={mode("white", "blue.900")} minH='100vh'>
      <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
        <Stack p='20px' spacing={{ base: 8, md: 10 }} flex='1.5' nb={{ base: 12, md: "none" }}>
          <Heading fontFamily='archivo black' fontSize='2xl' fontWeight='extrabold'>
            Listings
          </Heading>
          {/* Creating tabs for product listing */}
          <Tabs size='md' variant='enclosed'>
            <TabList>
              <Tab color={mode("blue.600", "white")}>Products</Tab>
            </TabList>
            <TabPanels>
              {/* Rendering a tab panel with ProductTab component */}
              <TabPanel>
                <ProductTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    //Redirecting to login page with current location as state data
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

// Exporting ListingsScreen component as default
export default ListingsScreen;
