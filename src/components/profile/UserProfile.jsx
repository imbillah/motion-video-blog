import { useEffect, useState } from "react";
import userStore from "../../store/userStore";
import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import videoStore from "../../store/videoStore";
import { AiOutlineDelete, AiOutlineLogout } from "react-icons/ai";
import { IoCheckmark } from "react-icons/io5";
import Notify from "../others/Notify";

const UserProfile = () => {
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);
  const { user, logout } = userStore();
  const { videos, deleteVideo } = videoStore();
  const filteredVideo = videos.filter((video) => video.userId === user.uid);

  const hadnleDelete = (vId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmDelete) {
      deleteVideo(vId);
      setAlert(true);
      setAlertText("Your video is deleted successfully");
      setAlertStatus("success");
      setAlertIcon(<IoCheckmark fontSize={25} />);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  };

  return (
    <Box p={2} color={"white"} width={"100%"} height={"100vh"}>
      {/* user info */}
      <Box
        bg={"gray.900"}
        p={5}
        borderRadius={"10px"}
        width={["95%", "60%"]}
        mx={"auto"}
        mt={2}
      >
        <Flex alignItems={"center"} gap={2} justifyContent={"space-between"}>
          <Box>
            <Flex alignItems={"center"} gap={2}>
              <Image src={user?.photoURL} rounded={"full"} bg={"white"} />
              <Box>
                <Text fontSize={[18, 20]} fontWeight={"semibold"}>
                  Name: {user?.name}
                </Text>
                <Text color={"gray.300"} fontStyle={"italic"}>
                  Email: {user?.email}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Button
            display={["none", "block"]}
            bg={"red"}
            colorScheme="red"
            onClick={logout}
          >
            <AiOutlineLogout fontSize={25} />
          </Button>
        </Flex>
      </Box>
      {/* user videos */}
      <Box width={["95%", "60%"]} mx={"auto"} mt={4}>
        {alert && (
          <Notify status={alertStatus} text={alertText} icon={alertIcon} />
        )}

        <Text fontSize={20} fontWeight={"semibold"}>
          My Uploads
        </Text>
        {filteredVideo.length === 0 && (
          <Text color={"gray.300"} fontSize={18}>
            You didn't upload any video yet !!
          </Text>
        )}
        <Box width={"100%"} mt={5}>
          <Flex direction={"column"} gap={3}>
            {filteredVideo.map((video) => (
              <Box key={video.id} bg={"gray.900"} p={3} borderRadius={"10px"}>
                <Flex
                  alignItems={"center"}
                  gap={3}
                  justifyContent={"space-between"}
                >
                  <Flex gap={3} alignItems={"center"}>
                    <video
                      src={video.videoUrl}
                      style={{ width: "125px", borderRadius: "5px" }}
                    />
                    <Box>
                      <Text fontWeight={"semibold"}>{video.title}</Text>
                      <Text color={"gray.300"} fontSize={"14px"}>
                        {video.category}
                      </Text>
                    </Box>
                  </Flex>
                  <AiOutlineDelete
                    onClick={() => hadnleDelete(video.id)}
                    fontSize={25}
                    color="red"
                    cursor={"pointer"}
                  />
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
