import React from "react";
import Logo from "../../assets/motionLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  Box,
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

const Navbar = ({ user }) => {
  return (
    <Box bg={"black"} color={"white"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100vw"}
        p={4}
      >
        {/* Logo item */}
        <Box>
          <Link to={"/"}>
            <Flex alignItems={"center"}>
              <Image src={Logo} width={"50px"} height={"50px"} />

              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
                color={"#FF0000"}
                marginLeft={2}
              >
                Motion
              </Text>
            </Flex>
          </Link>
        </Box>
        {/* serach box */}
        <Box border="2px" p={2} borderRadius="full" borderColor="gray.200">
          <Flex alignItems={"center"}>
            <IoSearch size={25} />
            <Input
              width={"60vw"}
              variant="unstyled"
              _focus={{ outline: "none" }}
              placeholder="Search"
              height={"25px"}
              marginLeft={2}
              color={"gray.300"}
            />
          </Flex>
        </Box>
        {/* userinfo */}
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box marginRight={4}>
            <Link to={"/upload"}>
              <RiVideoUploadLine size={30} color="red" />
            </Link>
          </Box>
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
                  src={user?.photoURL}
                  width={"40px"}
                  height={"40px"}
                  rounded={"full"}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuDivider />
                <MenuItem>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
