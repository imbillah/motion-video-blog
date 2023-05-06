import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import userAvatar from "../../assets/userAvatar.png";
const Video = ({
  video: { videoUrl, description, title, userImage, userName, id },
}) => {
  return (
    <Box borderRadius={5} cursor={"pointer"} position={"relative"}>
      <Link to={`/video/${id}`}>
        <video
          src={videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
          style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
        />
      </Link>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        bg={"gray.900"}
        p={3}
        borderBottomRadius={"5px"}
        color={"white"}
      >
        <Text>{title}</Text>
        <Image
          src={userImage || userAvatar}
          h={"40px"}
          rounded={"full"}
          cursor={"pointer"}
          bg={"white"}
        />
      </Flex>
    </Box>
  );
};

export default Video;
