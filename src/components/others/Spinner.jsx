import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { CirclesWithBar } from "react-loader-spinner";
const Spinner = ({ text, progress }) => {
  useEffect(() => {}, [progress]);
  return (
    <Box bg={"black"} h={"100vh"}>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"full"}
        px={10}
      >
        <CirclesWithBar
          height={70}
          width={70}
          color="red"
          ariaLabel="circles-with-bar-loading"
        />
        <Text
          fontSize={18}
          px={2}
          mt={2}
          textAlign={"center"}
          color={"gray.300"}
        >
          {text}
        </Text>
        {progress && (
          <Progress
            mt={50}
            hasStripe
            isAnimated
            size={"sm"}
            value={Number.parseInt(progress)}
            width={"lg"}
            rounded={"sm"}
            colorScheme="gray"
          />
        )}
      </Flex>
    </Box>
  );
};

export default Spinner;
