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
import { useEffect } from "react";
import { UseQueryResult } from "react-query";
import { ISession, IUser } from "../../../types/types";

interface ISessionModal {
  isOpen: boolean;
  onClose: () => void;
  session: ISession;
  queryResult: UseQueryResult<unknown, unknown>;
}

export const SessionModal = ({ isOpen, onClose, session, queryResult }: ISessionModal) => {

  //this needs a type
  const users: any[] = queryResult.data as any[];

  if (queryResult.isError) return <div>error retriving data</div>;

  if (queryResult.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Flex width={"full"} justifyContent="center" direction={"row"}>
          <Text paddingY="50px" fontSize={"xl"}>
            Session Code = {session._id}
          </Text>
        </Flex>
        <ModalBody>
          <Flex width={"full"} justifyContent="center" direction={"column"}>
            {(users && users.length && !queryResult.isLoading) && users.map((user: any) => (
              <Text paddingY="5px" fontSize={"xl"}>
                {user.firstName} {user.lastName} - {user.attended}
              </Text>
            ),)}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
