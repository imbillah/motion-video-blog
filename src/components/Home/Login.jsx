import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initilizeFirebase from "../../firebase/Config";
import loginBG from "../../assets/loginBG.jpeg";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { getFirestore, setDoc, doc } from "firebase/firestore";
const Login = () => {
  const auth = getAuth(initilizeFirebase());
  const provider = new GoogleAuthProvider();
  const firebaseDB = getFirestore(initilizeFirebase());
  const navigate = useNavigate();
  const handleLogin = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const { refreshToken, providerData } = user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));
    await setDoc(
      doc(firebaseDB, "users", providerData[0].uid),
      providerData[0]
    );
    navigate("/", { replace: true });
  };

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
            onClick={() => handleLogin()}
          >
            Sign In with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
