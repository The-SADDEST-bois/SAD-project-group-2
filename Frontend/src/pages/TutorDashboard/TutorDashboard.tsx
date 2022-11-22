import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";

const TutorDashboard = () => {
  const store = useStore();

  const sessions = [
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
    {
      sessionName: "Name of Session",
      sessionCode: "123445",
    },
  ];

  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store.auth.user.role.toString()} />}
      rightSection={
        <>
          <Flex
            height="full"
            width="full"
            justifyContent={"flex-start"}
            direction={"row"}
            gap={4}
            padding="200px"
            wrap={"wrap"}
          >
            <>
              {sessions &&
                sessions.map((item) => (
                  <VStack
                    width="200px"
                    height="200px"
                    background={"#17BEBB"}
                    paddingY="50px"
                    borderRadius={"10px"}
                  >
                    <Text color="white">{item.sessionName}</Text>
                    <Text color="white">{item.sessionCode}</Text>
                    <Button>Start Session</Button>
                  </VStack>
                ))}
            </>
          </Flex>
        </>
      }
    />
  );
};
export default TutorDashboard;
