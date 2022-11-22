import { Button, Center, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useMutation, useQuery } from "react-query";
import {
  getAllSessionsApi,
  setSessionOpen,
} from "../../../api/sessionApi/sessionApi";
import { ISession } from "../../../types/types";
import { useStore } from "../../contexts/storeProvider";

const TestUseQuery = () => {

  const store = useStore();

  const { isLoading, error, data, refetch } = useQuery<ISession[], Error>({

    queryFn: () => getAllSessionsApi(store.auth.user?._id as string),
    refetchInterval: 100000,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: setSessionOpen,
  });

  const handleSubmit = (session: ISession) => {
    mutation.mutate({...session, isOpen: !session.isOpen}, {
      onSuccess: (response) => {
        console.log(response);
        refetch();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  if (isLoading)
    return (
      <Center h="100vh">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </Center>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <VStack>
      {data?.map((session) => (
        <Button onClick={() => handleSubmit(session)}>
          {" id:" +
            session._id +
            " tutor:" +
            session.tutor.firstName +
            " isOpen:" +
            session.isOpen}
        </Button>
      ))}
    </VStack>
  );
};
export default TestUseQuery;
