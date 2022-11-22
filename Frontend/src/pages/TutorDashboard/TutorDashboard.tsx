import { Button, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import {
  getAllSessionsApi,
  setSessionOpen,
} from "../../../api/sessionApi/sessionApi";
import { ISession } from "../../../types/types";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { formatDate } from "../../utils/formatDate/formatDate";

const TutorDashboard = () => {
  const store = useStore();
  const { onSuccessToast, onErrorToast } = useToasts();
  const { isLoading, error, data, refetch } = useQuery<ISession[], Error>({
    queryFn: () => getAllSessionsApi(store.auth.user?._id as string),
    refetchInterval: 10000,
  });

  const mutation = useMutation({
    mutationFn: setSessionOpen,
  });

  const handleSubmit = (session: ISession) => {
    mutation.mutate(
      { ...session, isOpen: !session.isOpen },
      {
        onSuccess: (response) => {
          onSuccessToast("Session Started");
          refetch();
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
      leftSection={<DynamicNavBar role={store.auth.user.role.toString()} />}
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
              {data &&
                data.map((item: ISession) => (
                  <VStack
                    width="300px"
                    height="200px"
                    background={"#17BEBB"}
                    paddingY="30px"
                    borderRadius={"10px"}
                  >
                    <Text color="white">
                      <b>Session Type: </b>
                      {item.sessionType}
                    </Text>
                    <Text color="white">
                      <b>Module: </b> {item.moduleName}
                    </Text>
                    <Text color="white">
                      <>
                        <b>Date: </b> {formatDate(item.startTime.toString())}
                      </>
                    </Text>

                    <Button onClick={(e) => handleSubmit(item)}>
                      Start Session
                    </Button>
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
