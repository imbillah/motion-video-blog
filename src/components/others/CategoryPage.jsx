import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import videoStore from "../../store/videoStore";
import Video from "../video/Video";

const CategoryPage = () => {
  const { videos } = videoStore();
  const { catName } = useParams();
  const filteredVideos = videos.filter((video) => video.category === catName);

  return (
    <Box color={"white"} height={"100vh"} p={[3, 5]}>
      <Text fontSize={20} mb={3}>
        {filteredVideos.length} videos found in {catName}
      </Text>
      <Flex
        gap={3}
        direction={["column", "row"]}
        flexWrap={"wrap"}
        width={"auto"}
      >
        {filteredVideos &&
          filteredVideos.map((data) => <Video key={data.id} video={data} />)}
      </Flex>
    </Box>
  );
};

export default CategoryPage;
