import { Button, Center, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useMutation, useQuery } from "react-query";
import {
  getAllSessionsApi,
  setSessionOpen,
} from "../../../api/sessionApi/sessionApi";
import { ISession } from "../../../types/types";

const TestUseQuery = () => {
  const { isLoading, error, data } = useQuery<ISession[], Error>({
    queryFn: getAllSessionsApi,
    refetchInterval: 1000,
  });

  const mutation = useMutation({
    mutationFn: setSessionOpen,
  });

  const [selectedSession, setSelectedSession] = useState<ISession>(
    {} as ISession
  );

  const selectSession = (session: ISession) => {
    setSelectedSession({...session, isOpen: !session.isOpen});
  };

  const handleSubmit = () => {
    mutation.mutate(selectedSession, {
      onSuccess: (response) => {
        console.log(response);
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
        <Button onClick={() => selectSession(session)}>
          {" id:" +
            session._id +
            " tutor:" +
            session.tutor.firstName +
            " isOpen:" +
            session.isOpen}
        </Button>
      ))}
      <Button onClick={handleSubmit}>
        setSession {selectedSession ? selectedSession._id : "null"}
      </Button>
    </VStack>
  );
};
export default TestUseQuery;
