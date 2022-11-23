import { Button, Flex, Input, FormLabel, FormControl } from "@chakra-ui/react";
import { useStore } from "../../contexts/storeProvider";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { useMutation } from "react-query";
import { useState } from "react";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { registerAttendance } from "../../../api/studentApi/studentApi";

interface IData {
  sessionCode: string;
  userId: string;
}

const StudentDashboard = () => {
  const store = useStore();
  const { onSuccessToast, onErrorToast } = useToasts();

  const [sessionCode, setSessionCode] = useState<string>("");

  const handleResponse = (status: Number) => {
    if (status === 200) {
      onSuccessToast(
        "Joined Session",
        `You have successfully joined session ${sessionCode}` );
    } else {
      onErrorToast(
        "Unable to proceed with - Joining Session",
        `Cannot join session ${sessionCode}`);
    }
  };

  const handleUseMutation = async (sessionCode: string) => {
    console.log("sessionCode ==> ", sessionCode);
    const data: IData = { sessionCode: sessionCode, userId: store.auth.user?._id as string };
    return registerAttendance(data);
  };

  const mutation = useMutation({
    mutationFn: handleUseMutation,
  });

  const handleSubmit = () => {
    mutation.mutate(sessionCode, {
      onSuccess: (response) => {
        handleResponse(response.status);
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
