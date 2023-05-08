import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  IoCheckmark,
  IoChevronDown,
  IoCloudUpload,
  IoLocation,
  IoTrash,
  IoWarning,
} from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import { categories } from "../../data";
import { Notify, Spinner } from "../../components";
import initilizeFirebase from "../../firebase/Config";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import userStore from "../../store/userStore";
const Upload = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [location, setLocation] = useState("");
  const [videoAsset, setVideoAseet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);
  const [description, setDescription] = useState("");
  const { user } = userStore();
  const storage = getStorage(initilizeFirebase());
  const firebaseDB = getFirestore(initilizeFirebase());
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else return;
  }, [user]);
  // uploading video to firestore
  const handleUpload = (e) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoAseet(downloadURL);
          setLoading(false);
          setAlert(true);
          setAlertText("Your video is uploaded successfully");
          setAlertStatus("success");
          setAlertIcon(<IoCheckmark fontSize={25} />);
          setTimeout(() => {
            setAlert(false);
          }, 3500);
        });
      }
    );
  };
  // deleting video
  const deleteVideo = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAseet(null);
        setAlert(true);
        setAlertText("Your video has been removed");
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setTimeout(() => {
          setAlert(false);
        }, 3500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // uploading details
  const uploadDetails = async () => {
    try {
      setLoading(true);
      const data = {
        id: `${Date.now()}`,
        userId: user?.uid,
        userName: user?.name,
        userImage: user?.photoURL,
        title,
        category,
        location,
        videoUrl: videoAsset,
        description,
      };
      await setDoc(doc(firebaseDB, "videos", `${Date.now()}`), data);
      setLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box width={"full"}>
      <Flex justifyContent={"center"} alignItems={"center"} minHeight={"100vh"}>
        <Flex
          bg={"black"}
          width={["95%", "90%"]}
          p={4}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          height={"95vh"}
        >
          {alert && (
            <Notify status={alertStatus} text={alertText} icon={alertIcon} />
          )}
          <Input
            variant={"flushed"}
            placeholder="Title"
            focusBorderColor="gray.500"
            isRequired
            errorBorderColor="red"
            type={"text"}
            _placeholder={{ color: "gray.300" }}
            fontSize={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            color={"white"}
          />
          <Flex
            justifyContent={"space-between"}
            width={"full"}
            alignItems={"center"}
            gap={6}
            my={4}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<IoChevronDown fontSize={20} />}
                width={"full"}
              >
                {category}
              </MenuButton>
              <MenuList zIndex={101} width={["100%", "md"]}>
                {categories &&
                  categories.map((item) => (
                    <MenuItem
                      key={item.id}
                      _hover={{ bg: "gray.300" }}
                      px={4}
                      fontSize={16}
                      onClick={() => setCategory(item.name)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                children={<IoLocation fontSize={20} color="white" />}
              />
              <Input
                variant={"flushed"}
                placeholder="Location"
                focusBorderColor="gray.500"
                isRequired
                errorBorderColor="red"
                type={"text"}
                _placeholder={{ color: "gray.300" }}
                fontSize={20}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                color={"white"}
              />
            </InputGroup>
          </Flex>
          {/* file upload */}
          <Flex
            border={"1px"}
            height={"500px"}
            borderStyle={"dashed"}
            position={"relative"}
            overflow={"hidden"}
            width={["full", "65vw"]}
            borderRadius={"md"}
            borderColor={"gray"}
            color={"white"}
          >
            {!videoAsset ? (
              <FormLabel width="full">
                <Flex
                  direction={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height="full"
                  width="full"
                >
                  <Flex
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height="full"
                    width="full"
                    cursor={"pointer"}
                  >
                    {loading ? (
                      <Spinner progress={progress} text="Uploading video..." />
                    ) : (
                      <>
                        <IoCloudUpload fontSize={30} color="white" />
                        <Text color={"gray.300"}>Click to upload video</Text>
                      </>
                    )}
                  </Flex>
                </Flex>
                {!loading && (
                  <input
                    type="file"
                    name="upload-video"
                    onChange={handleUpload}
                    style={{ width: 0, height: 0 }}
                    accept="video/mp4,video/xm4v,video/*"
                  />
                )}
              </FormLabel>
            ) : (
              <Box>
                <Flex
                  width={"full"}
                  height={"full"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"relative"}
                >
                  <Flex
                    width={"40px"}
                    height={"40px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    position={"absolute"}
                    rounded={"full"}
                    top={5}
                    right={5}
                    cursor={"pointer"}
                    zIndex={10}
                    bg={"red"}
                    onClick={deleteVideo}
                  >
                    <IoTrash fontSize={25} color="white" />
                  </Flex>
                  <video
                    src={videoAsset}
                    controls
                    style={{
                      width: "95vw",
                      height: "90%",
                    }}
                  />
                </Flex>
              </Box>
            )}
          </Flex>
          {/* Text editor */}
          <Text color={"gray.300"} textAlign={"left"} fontWeight={"semibold"}>
            Add Description:
          </Text>
          <Box
            bg={"whiteAlpha.800"}
            h="80%"
            w={["full", "65vw"]}
            borderRadius={"md"}
            color={"black"}
          >
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </Box>
          <Button
            colorScheme="red"
            px={16}
            py={6}
            mt={1}
            fontSize={18}
            isDisabled={!videoAsset}
            isLoading={loading}
            loadingText="Uploading..."
            onClick={uploadDetails}
          >
            Upload
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Upload;
