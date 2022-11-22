import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ISession } from "../../../types/types";

interface ISessionModal {
  isOpen: boolean;
  onClose: () => void;
  session: ISession;
}

export const SessionModal = ({ isOpen, onClose, session }: ISessionModal) => {
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
