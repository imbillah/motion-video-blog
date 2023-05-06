import { useEffect } from "react";
import Spinner from "../others/Spinner";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Video } from "../../components";
import videoStore from "../../store/videoStore";
const Feeds = () => {
  const { videos, fetchVideos } = videoStore();
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <>
      <Box width={"100%"} mt={"30px"} mx={[0, 5]}>
        {!videos ? (
          <Spinner text="Loading Videos..." />
        ) : (
          <SimpleGrid columns={[1, 3, 4]} spacing={5} p={2}>
            {videos &&
              videos.map((video) => <Video key={video.id} video={video} />)}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};

export default Feeds;
