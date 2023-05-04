import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import loginBG from "../../assets/loginBG.jpeg";
import { FcGoogle } from "react-icons/fc";
import userStore from "../../store/userStore";
const Login = () => {
  const { login } = userStore();
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >
      <Image src={loginBG} objectFit={"cover"} width="full" height="full" />
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        width={"100vw"}
        height={"100vh"}
        position={"absolute"}
        top={0}
        left={0}
        bg={"blackAlpha.500"}
      >
        <HStack>
          <Button
            leftIcon={<FcGoogle size={25} />}
            shadow={"lg"}
            bg={"#FF0000"}
            onClick={() => login()}
          >
            Sign In with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
