import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import videoStore from "../../store/videoStore";
import Spinner from "../others/Spinner";
import { useEffect, useState } from "react";
import Video from "./Video";
const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState([]);
  const { vidId } = useParams();
  const { videos } = videoStore();
  const relatedVideos = videos.filter(
    (video) => video.category === selectedVideo.category && video.id !== vidId
  );
  useEffect(() => {
    const filtredVideo = videos.filter((video) => video.id === vidId);
    setSelectedVideo(filtredVideo[0]);
  }, [vidId]);
  const { description, title, videoUrl, userImage, userName, location } =
    selectedVideo ?? {};
  return (
    <>
      {selectedVideo ? (
        <Box color={"white"} p={[2, 5]} mt={5} width={"100%"}>
          <Text fontSize={25} fontWeight={"semibold"} mb={2}>
            {title}
          </Text>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={2}>
            <GridItem colSpan={2}>
              <video
                src={videoUrl}
                controls
                width={"100%"}
                height={"100%"}
                style={{ borderRadius: "10px" }}
              />
              {/* video details */}
              <Box mt={2} bg={"gray.900"} p={2} borderRadius={"5px"}>
                <Flex gap={2} alignItems={"center"}>
                  <Image
                    src={userImage}
                    h={["45px", "55px"]}
                    rounded={"full"}
                    bg={"white"}
                  />
                  <Box>
                    <Text fontSize={["14px", "18px"]} fontWeight={"semibold"}>
                      {userName}
                    </Text>
                    <Text fontSize={"13px"} color={"gray.300"}>
                      {location}
                    </Text>
                  </Box>
                </Flex>
                <Box mt={5}>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </Box>
              </Box>
            </GridItem>
            {/* related videos */}
            <GridItem
              borderLeft={[0, "1px"]}
              borderColor={[null, "gray.500"]}
              px={[1, 3]}
            >
              <Text fontSize={20} mb={1}>
                Related Videos
              </Text>
              {relatedVideos.length !== 0 &&
                relatedVideos.map((video) => (
                  <Video key={video.id} video={video} />
                ))}
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default VideoPlayer;
