import { useEffect, useState } from "react";

import { getAllFeeds } from "../../utils/getData";
import Spinner from "../others/Spinner";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Video from "./Video";
import videoStore from "../../store/videoStore";
const Feeds = () => {
  const [feeds, setFeeds] = useState();
  const [loading, setLoading] = useState(false);
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
