import { Button, Flex, Input, FormLabel, FormControl } from "@chakra-ui/react";
import { useStore } from "../../contexts/storeProvider";

import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { useMutation } from "react-query";
import { useState } from "react";

const StudentDashboard = () => {
  const store = useStore();

  const [sessionCode, setSessionCode] = useState<string>("");

  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store.auth.user.role.toString()} />}
      rightSection={
        <>
          <Flex
            height="500px"
            width="300px"
            justifyContent={"center"}
            direction={"column"}
            gap={4}
          >
            <FormLabel>Enter Your Session Code</FormLabel>
            <Input
              placeholder="Enter Session Code"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              minLength={6}
              maxLength={6}
            />

            <Button
              width="full"
              background="#17BEBB"
              _hover={{ bg: "#58edea" }}
              isDisabled={sessionCode.length < 6}
            >
              Submit
            </Button>
          </Flex>
        </>
      }
    />
  );
};
export default StudentDashboard;
