import { Button, Flex, Input, FormLabel, FormControl } from "@chakra-ui/react";
import { useStore } from "../../contexts/storeProvider";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { useMutation } from "react-query";
import { useState } from "react";
import { useToasts } from "../../hooks/useToasts/useToasts";

const StudentDashboard = () => {
  const store = useStore();
  const { onSuccessToast, onErrorToast } = useToasts();

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
        onSuccessToast(
          "Joined Session",
          `You have successfully joined session ${sessionCode}`
        );
      },
      onError: (error) => {
        onErrorToast(
          "Error Joining Session",
          `Cannot join session ${sessionCode}`
        );
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
