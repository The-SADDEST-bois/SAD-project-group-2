import { Button, Flex, Input, FormLabel, FormControl } from "@chakra-ui/react";
import { useStore } from "../../contexts/storeProvider";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { useMutation } from "react-query";
import { useState } from "react";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { registerAttendance } from "../../../api/studentApi/studentApi";
import { IData } from "../../../types/types";
import { AxiosResponse } from "axios";

const StudentDashboard = () => {
  const store = useStore();
  const { onSuccessToast, onErrorToast } = useToasts();

  const [sessionCode, setSessionCode] = useState<string>("");

  const handleResponse = (response: AxiosResponse) => {
    if (response.status === 200) {
      onSuccessToast(`Session: ${sessionCode}`, response.data.message);
      return;
    }

    onErrorToast(`Session: ${sessionCode}`, response.data.error);
  };

  const handleUseMutation = async (sessionCode: string) => {
    const data: IData = {
      sessionCode: sessionCode,
      userId: store.auth.user?._id as string,
    };
    return registerAttendance(data);
  };

  const mutation = useMutation({
    mutationFn: handleUseMutation,
  });

  const handleSubmit = () => {
    mutation.mutate(sessionCode, {
      onSuccess: (axiosResponse) => {
        handleResponse(axiosResponse);
      },
      onError: () => {
        onErrorToast(
          "Error Joining Session",
          `Cannot join session ${sessionCode}`
        );
      },
    });
  };

  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store?.auth?.user?.role as string} />}
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
