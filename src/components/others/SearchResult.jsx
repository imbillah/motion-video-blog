import { Box, Flex, Text } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import videoStore from "../../store/videoStore";
import Video from "../video/Video";

const SearchResult = () => {
  const { videos } = videoStore();
  const { keyword } = useParams();
  const filteredVideos = videos.filter((video) => video.category === keyword);
  console.log(filteredVideos);
  return (
    <Box color={"white"} height={"100vh"}>
      {filteredVideos.length === 0 && (
        <Text color={"gray.300"} fontSize={20} my={5}>
          No results found for your search !!
        </Text>
      )}
      {filteredVideos.length > 0 && (
        <Text my={3} fontSize={20}>
          Found {filteredVideos.length} search results for {keyword}
        </Text>
      )}
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

export default SearchResult;
