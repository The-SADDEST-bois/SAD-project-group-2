import { Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import {
  getAllSessionsApi,
  getSessionAttendees,
  setSessionOpen,
} from "../../../api/sessionApi/sessionApi";
import { ISession } from "../../../types/types";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { SessionModal } from "../../components/SessionModal/SessionModal";
import { useStore } from "../../contexts/storeProvider";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { formatDate } from "../../utils/formatDate/formatDate";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface newQueryResponse {
  tester: ISession[];
  tester2: any[];
}

const TutorDashboard = () => {
  const store = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSuccessToast, onErrorToast } = useToasts();

  const [currentSession, setCurrentSession] = useState({} as ISession);

  const { isLoading, error, data, refetch } = useQuery({
    queryFn: () => handleMultipleQueries(),
  });

  console.log("Data = ", data);

  const mutation = useMutation({
    mutationFn: setSessionOpen,
  });

  const handleMultipleQueries = async () => {
    const tester = await getAllSessionsApi(store.auth.user._id as string);
    console.log("tester = ", tester);

    if (!currentSession) return;
    const tester2 = await getSessionAttendees(currentSession._id as string);
    console.log("tester2 = ", tester2);

    return { tester, tester2 };
  };

  const handleSubmit = (session: ISession) => {
    mutation.mutate(
      { ...session, isOpen: !session.isOpen },
      {
        onSuccess: (response) => {
          onSuccessToast("Session Started");
          setCurrentSession(session);
          refetch();
          onOpen();
        },
        onError: (error) => {
          onErrorToast("Error Joining Session");
          console.log(error);
        },
      }
    );
  };

  useEffect(() => {
    console.log("Ping");
    refetch;
  }, [currentSession]);

  console.log("data = ", data);

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
              {!isOpen &&
                !isLoading &&
                data?.tester.map((item: ISession) => (
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
            />
          </Flex>
        </>
      }
    />
  );
};
export default TutorDashboard;
