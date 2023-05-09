import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import videoStore from "../../store/videoStore";
import Video from "../video/Video";

const CategoryPage = () => {
  const { videos } = videoStore();
  const { catName } = useParams();
  const filteredVideo = videos.filter((video) => video.category === catName);

  return (
    <Box color={"white"} height={["", "100vh"]} p={[3, 5]}>
      <Flex
        gap={3}
        direction={["column", "row"]}
        flexWrap={"wrap"}
        width={"auto"}
      >
        {filteredVideo && filteredVideo.map((data) => <Video video={data} />)}
      </Flex>
    </Box>
  );
};

export default CategoryPage;
