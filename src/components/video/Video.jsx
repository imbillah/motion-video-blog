import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import userAvatar from "../../assets/userAvatar.png";
import moment from "moment/moment";
const Video = ({ video: { videoUrl, title, userImage, id } }) => {
  return (
    <GridItem>
      <Link to={`/video/${id}`}>
        <Box borderRadius={5} cursor={"pointer"}>
          <video
            src={videoUrl}
            muted
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
            style={{
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              height: "195px",
              objectFit: "cover",
              width: "100%",
            }}
          />

          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            bg={"gray.900"}
            p={3}
            borderBottomRadius={"5px"}
            color={"white"}
          >
            <Box>
              <Text>{title}</Text>
              <Text fontSize={13} color={"gray.400"}>
                {moment(new Date(parseInt(id)).toISOString()).fromNow()}
              </Text>
            </Box>

            <Image
              src={userImage || userAvatar}
              h={"40px"}
              rounded={"full"}
              cursor={"pointer"}
              bg={"white"}
            />
          </Flex>
        </Box>
      </Link>
    </GridItem>
  );
};

export default Video;
