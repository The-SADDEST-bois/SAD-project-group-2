import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getSessionAttendees } from "../../../api/sessionApi/sessionApi";
import { ISession } from "../../../types/types";

interface ISessionModal {
  isOpen: boolean;
  onClose: () => void;
  session: ISession;
}

export const SessionModal = ({ isOpen, onClose, session }: ISessionModal) => {
  const { isLoading, error, data, refetch } = useQuery<ISession[], Error>({
    queryFn: () => getSessionAttendees(session._id as string),
    refetchInterval: 10000,
  });

  console.log("data =", data);

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
          <Flex width={"full"} justifyContent="center" direction={"row"}>
            <Text>TEST</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
