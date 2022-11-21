import { Button, Flex, Input, FormLabel, FormControl } from "@chakra-ui/react";
import { useStore } from "../../contexts/storeProvider";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { useMutation } from "react-query";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const StudentDashboard = () => {
  const store = useStore();
  const toast = useToast();

  const [sessionCode, setSessionCode] = useState<string>("");

  const handleUseMutation = async (sessionCode: string) => {
    console.log("sessionCode ==> ", sessionCode);
    // handle api in here
  };

  const mutation = useMutation({
    mutationFn: handleUseMutation,
  });

  const handleSubmit = () => {
    mutation.mutate(sessionCode, {
      onSuccess: (response) => {
        toast({
          title: "Joined Session",
          description: `You have successfully joined session ${sessionCode}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error Joining Session",
          description: `Cannot join session ${sessionCode}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

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
              onClick={handleSubmit}
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
