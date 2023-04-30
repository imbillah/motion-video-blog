import React from "react";
import {
  Navbar,
  Category,
  Feeds,
  Upload,
  Video,
  Search,
} from "../../components";
import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <>
      <Navbar user={user} />
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={20}
      >
        <Category />
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
    </>
  );
};

export default Home;
