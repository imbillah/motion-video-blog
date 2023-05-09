import {
  Navbar,
  Category,
  Feeds,
  Upload,
  SearchResult,
  VideoPlayer,
  UserProfile,
  CategoryPage,
} from "../../components";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { iconArray } from "../../data";

const Home = () => {
  return (
    <Box bg={"black"} height={"full"}>
      <Navbar />
      <Box>
        <Flex>
          {/* sidebar area */}
          <Box borderRight={"1px"} minWidth={["50px", "70px"]}>
            <Flex
              direction={"column"}
              justifyContent={"start"}
              alignItems={"center"}
              gap={8}
              marginTop={8}
            >
              {iconArray &&
                iconArray.map(({ icon, label, id }) => (
                  <Category icon={icon} label={label} key={id} />
                ))}
            </Flex>
          </Box>
          {/* feeds area */}
          <Box width={"90vw"} mx={"auto"}>
            <Flex>
              <Routes>
                <Route path="/" element={<Feeds />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/video/:vidId" element={<VideoPlayer />} />
                <Route path="/dashboard" element={<UserProfile />} />
                <Route path="/category/:catName" element={<CategoryPage />} />
                <Route path="/search/:keyword" element={<SearchResult />} />
              </Routes>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
