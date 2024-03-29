import { Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { setSessionOpen } from "../../../api/sessionApi/sessionApi";
import { ISession } from "../../../types/types";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { SessionModal } from "../../components/SessionModal/SessionModal";
import { useStore } from "../../contexts/storeProvider";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { formatDate } from "../../utils/formatDate/formatDate";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useGetAllSessions } from "./hooks/useGetAllSessions/useGetAllSessions";
import { AxiosResponse } from "axios";

const TutorDashboard = () => {
  const store = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSuccessToast, onErrorToast } = useToasts();
  const [currentSession, setCurrentSession] = useState({} as ISession);

  const { isLoading, isError, data } = useGetAllSessions();

  const allSessions = data as ISession[];

  const handleResponse = (session: ISession, response?: AxiosResponse) => {
    if (response?.status === 500 || response?.status === 400) {
      onErrorToast(`Error Starting Session`, response.data.message);
      return;
    }

    onSuccessToast("Session Started");
    setCurrentSession(session);
    onOpen();
  };
  
  const setSessionClosed = () => {
    mutation.mutate(
      { ...currentSession, isOpen: false },
      {
        onSuccess: (response) => {
          if (response.status === 500 || response.status === 400) {
            onErrorToast(`Error Closing Session`, response.data.message);
            return;
          }
          onClose();
        },
        onError: (error) => {
          onErrorToast("Error Starting Session");
          console.log(error);
        },
      }
    );
  }

  const mutation = useMutation({
    mutationFn: setSessionOpen,
  });

  const handleSubmit = (session: ISession) => {
    mutation.mutate(
      { ...session, isOpen: true },
      {
        onSuccess: (response) => {
          handleResponse(session, response);
        },
        onError: (error) => {
          onErrorToast("Error Starting Session");
          console.log(error);
        },
      }
    );
  };

  if (isError) return <Text>Something went wrong</Text>;

  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store?.auth?.user?.role as string} />}
      rightSection={
        <>
          {isLoading && (
            <Spinner
              size="lg"
              justifySelf={"center"}
              marginTop={"300px"}
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#58edea"
            />
          )}
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
              {allSessions &&
                !isLoading &&
                allSessions.map((item: ISession) => (
                  <VStack
                    width="300px"
                    height="200px"
                    background={"#17BEBB"}
                    paddingY="30px"
                    borderRadius={"10px"}
                  >
                    <Text color="white">
                      <b>Session Type: </b>
                      {item?.sessionType}
                    </Text>
                    <Text color="white">
                      <b>Module: </b> {item?.moduleName}
                    </Text>
                    <Text color="white">
                      <>
                        <b>Date: </b> {formatDate(item?.startTime.toString())}
                      </>
                    </Text>

                    <Button
                      data-cy="joinSessionButton"
                      onClick={(e) => handleSubmit(item)}
                    >
                      Start Session
                    </Button>
                  </VStack>
                ))}
            </>

            <SessionModal
              isOpen={isOpen}
              onClose={setSessionClosed}
              session={currentSession}
            />
          </Flex>
        </>
      }
    />
  );
};
export default TutorDashboard;
