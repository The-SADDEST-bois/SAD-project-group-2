import { Text, Button, Flex } from "@chakra-ui/react";
import { useStore } from "../../contexts/storeProvider";

import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";

const StudentDashboard = () => {
  const store = useStore();

  console.log("TYPE =", store.auth.user);

  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store.auth.user.role.toString()} />}
      rightSection={
        <>
          <Flex
            height="300px"
            width="300px"
            justifyContent={"center"}
            direction={"column"}
          >
            {store.auth.user.role.toString() === "Student" && (
              <>
                <Text>Helloooo, {store.auth.user?.firstName}</Text>
                <Button colorScheme="blue" variant="outline" width="full">
                  Submit
                </Button>
              </>
            )}
          </Flex>
        </>
      }
    />
  );
};
export default StudentDashboard;
