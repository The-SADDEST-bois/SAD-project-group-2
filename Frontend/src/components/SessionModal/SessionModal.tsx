import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import {
  IAttendance,
  IAttendanceUser,
  ISessionModal,
} from "../../../types/types";
import { setStudentAttendance } from "../../../api/sessionApi/sessionApi";
import { useToasts } from "../../hooks/useToasts/useToasts";
import { useGetSessionAttendees } from "../../pages/TutorDashboard/hooks/useGetSessionAttendees/useGetSessionAttendees";
import { AxiosResponse } from "axios";

export const SessionModal = ({ isOpen, onClose, session }: ISessionModal) => {
  const { onSuccessToast, onErrorToast } = useToasts();

  const userSessionID: string = session._id;
  const { isLoading, isError, users, refetch } = useGetSessionAttendees(
    isOpen,
    userSessionID
  );

  const handleResponse = (response: AxiosResponse) => {
    if (response?.status === 400 || response?.status === 403) {
      onErrorToast("Error Updating Attendance", response.data.error.message);
      return;
    }

    onSuccessToast("Attendance updated", "Success");
    refetch();
  };

  const mutation = useMutation({
    mutationFn: setStudentAttendance,
  });

  const calculateSessionAttendanceReport = (item: IAttendance): number => {
    if (!item) return 0;
    const totalAttendees: number = item.attendance.length;
    const attended = item.attendance.filter(
      (attendees) => attendees.status === 1
    );
    const totalAttended: number = attended.length;

    const finalFormula = ((totalAttended / totalAttendees) * 100).toFixed(2);

    return +finalFormula;
  };

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
        onSuccess: (response) => {
          handleResponse(response);
        },
        onError: (error) => {
          onErrorToast("Error updating attendance");
          console.log(error);
        },
      }
    );
  };

  if (isError) return <div>error retriving data</div>;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Flex width={"full"} justifyContent="center" direction={"row"}>
          <Text paddingY="50px" fontSize={"xl"}>
            Session Code = {session.sessionCode}
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
                    key={user._id}
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
        <HStack width="full" justifyContent={"center"}>
          <Text fontSize={"4xl"}>
            Attendance percentage ={" "}
            {users && calculateSessionAttendanceReport(users)} / 100%
            <Progress
              value={calculateSessionAttendanceReport(users)}
              colorScheme="green"
              height="32px"
            />
          </Text>
        </HStack>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
