import { Flex, VStack } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface IPageWithSideBar {
  leftSection: ReactNode;
  rightSection: ReactNode;
}

export const PageWithSideBar = ({
  leftSection,
  rightSection,
}: IPageWithSideBar) => {
  return (
    <Flex h="100vh" justify="space-between">
      <VStack
        bg="#58edea"
        h="full"
        maxW="150"
        w="full"
        px="16"
        justifyContent={"center"}
      >
        <Flex direction="column">{leftSection}</Flex>
      </VStack>

      <VStack bg="white" h="full" w="full" px="16" justifyContent={"center"}>
        {rightSection}
      </VStack>
    </Flex>
  );
};
