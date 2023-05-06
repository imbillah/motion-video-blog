import React from "react";
import Logo from "../../assets/motionLogo.png";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { RiVideoUploadLine } from "react-icons/ri";
import userStore from "../../store/userStore";
import userAvatar from "../../assets/userAvatar.png";
const Navbar = () => {
  const { user, logout } = userStore();
  return (
    <Box border={"1px"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        py={4}
        px={["10px", "30px"]}
        bg={"black"}
        color={"white"}
      >
        {/* logo */}
        <Flex alignItems={"center"}>
          <Box>
            <Link to={"/"}>
              <Image src={Logo} width={45} height={45} />
            </Link>
          </Box>
          <Text
            marginStart={2}
            fontSize={"3xl"}
            color={"red"}
            fontWeight={"bold"}
            hideBelow="md"
          >
            Motion
          </Text>
        </Flex>
        {/* search box */}
        <Box border="2px" p={2} borderRadius="full" borderColor="gray.200">
          <Flex alignItems={"center"}>
            <IoSearch size={25} />
            <Input
              width={{ md: "50vw" }}
              variant="unstyled"
              _focus={{ outline: "none" }}
              placeholder="Search"
              height={"25px"}
              marginLeft={2}
              color={"gray.300"}
            />
          </Flex>
        </Box>
        {/* profile */}
        <Box>
          <Flex alignItems={"center"}>
            <Box marginRight={4}>
              <Link to={"/upload"}>
                <RiVideoUploadLine size={30} />
              </Link>
            </Box>
            {user ? (
              <Box
                bg={"white"}
                height={"40px"}
                width={"40px"}
                borderRadius={"full"}
                textColor={"black"}
              >
                <Menu>
                  <MenuButton>
                    <Image
                      src={user?.photoURL || userAvatar}
                      width={"40px"}
                      height={"40px"}
                      rounded={"full"}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logout}>Log Out</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              <Link to={"/login"}>
                <Button bg="red" colorScheme="red">
                  Log in
                </Button>
              </Link>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
