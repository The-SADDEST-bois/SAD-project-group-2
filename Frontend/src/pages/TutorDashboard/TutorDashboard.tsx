import { Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQueries, UseQueryResult } from "react-query";
import {
  getAllSessionsApi,
  getSessionAttendees,
  setSessionOpen,
} from "../../../api/sessionApi/sessionApi";
import { ISession, IUser } from "../../../types/types";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { SessionModal } from "../../components/SessionModal/SessionModal";
import { useStore } from "../../contexts/storeProvider";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { formatDate } from "../../utils/formatDate/formatDate";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";


const TutorDashboard = () => {
  const store = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSuccessToast, onErrorToast } = useToasts();
  const [currentSession, setCurrentSession] = useState({} as ISession);
  
  const queries = {
    queries:[
      {queryKey: "allSessions", queryFn: () => getAllSessionsApi(store.auth.user._id as string), refetchOnWindowFocus: true},
      {queryKey: "attendees", queryFn: () => getSessionAttendees(currentSession._id as string), enabled: false}
    ]
  }
  
  const result = useQueries<any[]>(queries.queries);
  const session: ISession[] = result[0].data as ISession[];
  const queryResult: UseQueryResult<unknown, unknown> = result[1];
  
  useEffect(() => {
    queryResult.refetch();
  }, [currentSession]);
  
  const mutation = useMutation({
    mutationFn: setSessionOpen,
  });
  
  const handleSubmit = (session: ISession) => {
    mutation.mutate(
      { ...session, isOpen: !session.isOpen },
      {
        onSuccess: (response) => {
          onSuccessToast("Session Started");
          setCurrentSession(session);
          onOpen();
        },
        onError: (error) => {
          onErrorToast("Error Joining Session");
          console.log(error);
        },
      }
    );
  };



  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store?.auth?.user?.role as string} />}
      rightSection={
        <>
          {result[0].isLoading && (
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
              {(result[0].data &&
                !result[0].isLoading) &&
                session.map((item: ISession) => (
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
                      <b>Module: </b> {item.sessionType}
                    </Text>
                    <Text color="white">
                      <>
                        <b>Date: </b> {formatDate(item?.startTime.toString())}
                      </>
                    </Text>

                    <Button onClick={(e) => handleSubmit(item)}>
                      Start Session
                    </Button>
                  </VStack>
                ))}
            </>

            <SessionModal
              isOpen={isOpen}
              onClose={onClose}
              session={currentSession}
              queryResult={queryResult}
            />
          </Flex>
        </>
      }
    />
  );
};
export default TutorDashboard;
