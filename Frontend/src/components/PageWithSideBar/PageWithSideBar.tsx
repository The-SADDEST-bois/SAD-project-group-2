import { Flex, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";

export const PageWithSideBar = (leftSection: any, rightSection: any) => {
  return (
    <Flex h="100vh" justify="space-between">
      <VStack
        bg="blue"
        h="full"
        maxW="450px"
        w="full"
        px="16"
        overflowY="auto"
        justifyContent={"center"}
      >
        {leftSection}
      </VStack>

      <VStack bg="red" h="full" w="full" px="16">
        <Flex
          width="full"
          height="350px"
          direction={"column"}
          justify="space-between"
        >
          {rightSection}
        </Flex>
      </VStack>
    </Flex>
  );
};
