import { Flex, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface ILoginPageTemplate {
  leftSection: ReactNode;
  rightSection: ReactNode;
  height: string;
}

const LoginPageTemplate = ({
  leftSection,
  rightSection,
  height,
}: ILoginPageTemplate) => {
  return (
    <Flex h="100vh" justify="space-between">
      <VStack h="full" w="full" bg={"#17BEBB"} justifyContent="center">
        {leftSection}
      </VStack>

      <VStack
        bg="white"
        h="full"
        maxW="450px"
        w="full"
        px="16"
        overflowY="auto"
        justifyContent={"center"}
      >
        <Flex
          width="full"
          height={height}
          direction={"column"}
          justify="space-between"
        >
          {rightSection}
        </Flex>
      </VStack>
    </Flex>
  );
};

export default LoginPageTemplate;
