import { useEffect } from "react";
import Spinner from "../others/Spinner";
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Video } from "../../components";
import videoStore from "../../store/videoStore";
const Feeds = () => {
  const { videos, fetchVideos } = videoStore();
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <Box width={"100%"} mt={"30px"} mx={[0, 5]} height={"100vh"}>
      {!videos ? (
        <Spinner text="Loading Videos..." />
      ) : (
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
          gap={3}
          p={2}
          overflowY={"hidden"}
        >
          {videos &&
            videos.map((video) => <Video key={video.id} video={video} />)}
        </Grid>
      )}
    </Box>
  );
};

export default Feeds;
