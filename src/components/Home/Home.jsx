import React from "react";
import {
  Navbar,
  Category,
  Feeds,
  Upload,
  Video,
  Search,
} from "../../components";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { categories } from "../../data";
const Home = ({ user }) => {
  return (
    <Box>
      <Navbar user={user} />
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={[14, 20]}
        gap={8}
      >
        {categories &&
          categories.map((data) => <Category key={data.id} catData={data} />)}
      </Flex>
      <Flex
        width={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
      >
        <Routes>
          <Route path="/" element={<Feeds />} />
          <Route path="/category/:catId" ele element={<Feeds />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/video/:vidId" element={<Video />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Flex>
    </Box>
  );
};

export default Home;
