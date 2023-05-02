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
  IoChevronDown,
  IoCloudUpload,
  IoLocation,
  IoTrash,
} from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { categories } from "../../data";
import { Spinner } from "../../components";
import initilizeFirebase from "../../firebase/Config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
const Upload = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [location, setLocation] = useState("");
  const [videoAsset, setVideoAseet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(1);

  const storage = getStorage(initilizeFirebase());

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
        });
      }
    );
  };
  const deleteVideo = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAseet(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box width={"full"}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"100vh"}
        bg={"white"}
      >
        <Flex
          bg={"black"}
          width={"90%"}
          border={"1px"}
          borderColor={"gray"}
          borderRadius={"md"}
          p={4}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          height={"95vh"}
        >
          <Input
            variant={"flushed"}
            placeholder="Title"
            focusBorderColor="gray.500"
            isRequired
            errorBorderColor="red"
            type={"text"}
            _placeholder={{ color: "gray.500" }}
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
                rightIcon={<IoChevronDown fontSize={25} />}
                width={"full"}
              >
                {category}
              </MenuButton>
              <MenuList zIndex={101} width={"md"} shadow={"xl"}>
                {categories &&
                  categories.map((item) => (
                    <MenuItem
                      key={item.id}
                      _hover={{ bg: "blackAlpha.300" }}
                      px={4}
                      fontSize={20}
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
                _placeholder={{ color: "gray.500" }}
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
                        <Text>Click to upload video</Text>
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default Upload;
