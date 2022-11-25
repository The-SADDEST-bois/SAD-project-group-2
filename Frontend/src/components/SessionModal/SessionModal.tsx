import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { IAttendance, IAttendanceUser, ISession } from "../../../types/types";
import {
  setStudentAttendance,
  getSessionAttendees,
} from "../../../api/sessionApi/sessionApi";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { useState } from "react";

interface ISessionModal {
  isOpen: boolean;
  onClose: () => void;
  session: ISession;
}

export const SessionModal = ({ isOpen, onClose, session }: ISessionModal) => {
  const { onSuccessToast } = useToasts();

  //this needs a type
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "attendees",
    queryFn: () => getSessionAttendees(session._id as string),
    refetchInterval: 5000,
    enabled: isOpen,
    refetchOnWindowFocus: true,
  });
  const users: IAttendance = data as IAttendance;
  const userSessionID: string = session._id;

  const mutation = useMutation({
    mutationFn: setStudentAttendance,
  });

  const handleChangeAttendance = (
    user: IAttendanceUser,
    value: string
  ): void => {
    mutation.mutate(
      {
        ...user,
        status: +value,
        sessionId: userSessionID,
        sessionCode: session.sessionCode,
      },
      {
        onSuccess: () => {
          onSuccessToast("Attendance updated", "Success");
          refetch();
        },
      }
    );
  };

  if (isError) return <div>error retriving data</div>;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Flex width={"full"} justifyContent="center" direction={"row"}>
          <Text paddingY="50px" fontSize={"xl"}>
            Session Code = {userSessionID} // {session.sessionCode}
          </Text>
        </Flex>
        <ModalBody>
          <VStack width="full">
            {users &&
              !isLoading &&
              users.attendance.map((user: IAttendanceUser) => (
                <>
                  <Flex
                    width={"full"}
                    justifyContent="space-evenly"
                    direction={"row"}
                  >
                    <HStack
                      width="400px"
                      justifyContent={"space-between"}
                      spacing={10}
                      padding="10px"
                    >
                      <Text paddingY="5px" align={"left"} fontSize={"xl"}>
                        {user.firstName} {user.lastName}
                      </Text>
                      <Select
                        width={"70px"}
                        value={user.status}
                        onChange={(e) =>
                          handleChangeAttendance(user, e.target.value)
                        }
                      >
                        <option value={0}>❌</option>
                        <option value={1}>✅</option>
                      </Select>
                    </HStack>
                  </Flex>
                </>
              ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
