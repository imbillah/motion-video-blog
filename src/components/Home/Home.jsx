import {
  Navbar,
  Category,
  Feeds,
  Upload,
  Search,
  VideoPlayer,
  UserProfile,
} from "../../components";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { categories } from "../../data";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Flex bg={"black"} height={"100vh"}>
        <Flex
          direction={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          width={[14, 20]}
          gap={8}
          marginTop={8}
          borderRight={"1px"}
        >
          {categories &&
            categories.map((data) => <Category key={data.id} catData={data} />)}
        </Flex>
        <Flex width={"100vw"}>
          <Routes>
            <Route path="/" element={<Feeds />} />
            <Route path="/category/:catId" ele element={<Feeds />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/video/:vidId" element={<VideoPlayer />} />
            <Route path="/dashboard" element={<UserProfile />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
